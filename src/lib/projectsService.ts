import { db, isFirebaseConfigured } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Project, SubProject, VideoItem, Model3D } from './types';
import { defaultProjects } from './defaultData';

const LOCAL_STORAGE_KEY = 'raviteja_portfolio_projects_v18';
const DELETED_PROJECTS_KEY = 'raviteja_portfolio_deleted_v18';

function getDeletedProjectIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_PROJECTS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function markProjectDeleted(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const set = getDeletedProjectIds();
    set.add(id);
    localStorage.setItem(DELETED_PROJECTS_KEY, JSON.stringify(Array.from(set)));
  } catch {}
}

function unmarkProjectDeleted(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const set = getDeletedProjectIds();
    set.delete(id);
    localStorage.setItem(DELETED_PROJECTS_KEY, JSON.stringify(Array.from(set)));
  } catch {}
}

// IDs of projects that strictly belong inside the single 3D CAD & Printing card collection
const SUB_PROJECT_IDS = new Set([
  'agricultural-rover',
  'smart-health-watch',
  'smart-watch',
  'lathe-3-jaw-chuck',
  '3-jaw-chuck',
  'rotating-display-bed',
  'cnc-z-axis-upgrade',
  'cnc-z-axis',
  'custom-stepper-motors',
  'stepper-motors',
]);

// Old template placeholders to purge
const OBSOLETE_PROJECT_IDS = new Set([
  'aerospace-bracket-generative-design',
  'planetary-gearbox-reduction-drive',
  'hydraulic-linear-actuator',
  'sheet-metal-industrial-chassis',
]);

/**
 * Normalizes any YouTube URL (watch, shorts, share youtu.be, or embed)
 * into a clean standard embed URL: https://www.youtube.com/embed/{id}.
 * If empty or whitespace, returns undefined so it can be cleanly deleted.
 */
export function formatYouTubeEmbedUrl(url?: string): string | undefined {
  if (!url || !url.trim()) return undefined;
  const trimmed = url.trim();

  // If already embed URL with or without parameters:
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`;
  }

  // Standard watch URL or youtu.be short URL or shorts URL:
  const watchMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?.*v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  return trimmed;
}

/**
 * Parses multiline string or array of video URLs (with optional "Title | URL" syntax)
 * into a clean list of VideoItem objects with normalized embed URLs.
 */
export function parseVideoList(raw?: (string | VideoItem)[] | string): VideoItem[] {
  if (!raw) return [];
  const list: VideoItem[] = [];

  if (typeof raw === 'string') {
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    lines.forEach((line, idx) => {
      let title = `Video ${idx + 1}`;
      let url = line;
      if (line.includes('|')) {
        const parts = line.split('|');
        title = parts[0].trim() || `Video ${idx + 1}`;
        url = parts.slice(1).join('|').trim();
      }
      const formatted = formatYouTubeEmbedUrl(url);
      if (formatted) {
        list.push({ title, url: formatted });
      }
    });
    return list;
  }

  if (Array.isArray(raw)) {
    raw.forEach((item, idx) => {
      if (typeof item === 'string') {
        let title = `Video ${idx + 1}`;
        let url = item.trim();
        if (url.includes('|')) {
          const parts = url.split('|');
          title = parts[0].trim() || `Video ${idx + 1}`;
          url = parts.slice(1).join('|').trim();
        }
        const formatted = formatYouTubeEmbedUrl(url);
        if (formatted) list.push({ title, url: formatted });
      } else if (item && typeof item === 'object' && item.url) {
        const formatted = formatYouTubeEmbedUrl(item.url);
        if (formatted) list.push({ title: item.title || `Video ${idx + 1}`, url: formatted });
      }
    });
  }

  return list;
}

/**
 * Parses multiline string or array of 3D CAD models (with optional "Part Label | Embed URL" syntax)
 * into a clean list of Model3D objects.
 */
export function parse3DModelsList(raw?: (string | Model3D)[] | string, defaultTitle: string = '3D Part'): Model3D[] {
  if (!raw) return [];
  const list: Model3D[] = [];

  if (typeof raw === 'string') {
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    lines.forEach((line, idx) => {
      let title = lines.length === 1 ? defaultTitle : `${defaultTitle} ${idx + 1}`;
      let url = line;
      if (line.includes('|')) {
        const parts = line.split('|');
        title = parts[0].trim() || `${defaultTitle} ${idx + 1}`;
        url = parts.slice(1).join('|').trim();
      }
      if (url) {
        list.push({ title, url, type: 'sketchfab' });
      }
    });
    return list;
  }

  if (Array.isArray(raw)) {
    raw.forEach((item, idx) => {
      if (typeof item === 'string' && item.trim()) {
        let title = `${defaultTitle} ${idx + 1}`;
        let url = item.trim();
        if (url.includes('|')) {
          const parts = url.split('|');
          title = parts[0].trim() || `${defaultTitle} ${idx + 1}`;
          url = parts.slice(1).join('|').trim();
        }
        if (url) list.push({ title, url, type: 'sketchfab' });
      } else if (item && typeof item === 'object' && item.url) {
        list.push({
          title: item.title || `${defaultTitle} ${idx + 1}`,
          url: item.url.trim(),
          type: item.type || 'sketchfab',
        });
      }
    });
  }

  return list;
}

/**
 * Recursively strips any `undefined` values and empty plain objects from data
 * so Firestore setDoc does not throw "Unsupported field value: undefined",
 * and allows clean field updates and field deletions.
 */
export function sanitizeForFirestore<T = any>(obj: T): T {
  if (obj === null || obj === undefined) return null as any;
  if (Array.isArray(obj)) {
    return obj
      .filter((item) => item !== undefined)
      .map((item) => (typeof item === 'object' && item !== null ? sanitizeForFirestore(item) : item)) as any;
  }
  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        if (typeof value === 'object' && value !== null) {
          const res = sanitizeForFirestore(value);
          if (res !== undefined && res !== null) {
            if (!Array.isArray(res) && Object.keys(res).length === 0) {
              // skip empty plain object
            } else {
              cleaned[key] = res;
            }
          }
        } else {
          cleaned[key] = value;
        }
      }
    }
    return cleaned as any;
  }
  return obj;
}

function normalizeProject(p: any): Project {
  const category = p.category === '3D CAD & Printing' ? '3D CAD & Printing' : 'Engineering Projects';
  return {
    ...p,
    category,
  };
}

// Helper to get projects from localStorage fallback without destructive overwrites
function getLocalProjects(): Project[] {
  if (typeof window === 'undefined') return defaultProjects.map(normalizeProject);
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const deletedIds = getDeletedProjectIds();

  if (!stored) {
    const initialized = defaultProjects
      .filter((p) => !deletedIds.has(p.id) && !deletedIds.has(p.slug))
      .map(normalizeProject);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialized));
    return initialized;
  }

  try {
    const parsed: Project[] = JSON.parse(stored)
      .filter(
        (p: Project) =>
          !deletedIds.has(p.id) &&
          !deletedIds.has(p.slug) &&
          !SUB_PROJECT_IDS.has(p.id) &&
          !SUB_PROJECT_IDS.has(p.slug) &&
          !OBSOLETE_PROJECT_IDS.has(p.id) &&
          !OBSOLETE_PROJECT_IDS.has(p.slug)
      )
      .map(normalizeProject);

    // If new default project was added in code and not deleted by user, seed it
    let updated = false;
    const merged = [...parsed];
    for (const def of defaultProjects) {
      if (deletedIds.has(def.id) || deletedIds.has(def.slug)) continue;
      const existingIndex = merged.findIndex((p) => p.id === def.id || p.slug === def.slug);
      if (existingIndex === -1) {
        merged.push(normalizeProject(def));
        updated = true;
      }
      // Note: Do NOT overwrite user-modified fields with static defaults
    }

    // Explicitly guarantee 3D Modeling card is order: 1 (Top position)
    const p3d = merged.find((p) => p.id === '3d-printing-modeling' || p.slug === '3d-printing-modeling');
    if (p3d && p3d.order !== 1) {
      p3d.order = 1;
      updated = true;
    }
    merged.forEach((p) => {
      if (p.id !== '3d-printing-modeling' && p.slug !== '3d-printing-modeling' && p.order <= 1) {
        p.order = 2;
        updated = true;
      }
    });

    merged.sort((a, b) => a.order - b.order);
    if (updated) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch (e) {
    return defaultProjects.map(normalizeProject);
  }
}

function saveLocalProjects(projects: Project[]) {
  if (typeof window !== 'undefined') {
    const deletedIds = getDeletedProjectIds();
    const filtered = projects
      .filter(
        (p) =>
          !deletedIds.has(p.id) &&
          !deletedIds.has(p.slug) &&
          !SUB_PROJECT_IDS.has(p.id) &&
          !SUB_PROJECT_IDS.has(p.slug) &&
          !OBSOLETE_PROJECT_IDS.has(p.id) &&
          !OBSOLETE_PROJECT_IDS.has(p.slug)
      )
      .map(normalizeProject);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  }
}

export async function getProjects(): Promise<Project[]> {
  const deletedIds = getDeletedProjectIds();

  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'projects');
      const fetchPromise = getDocs(colRef);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 2500)
      );
      const snapshot = await Promise.race([fetchPromise, timeoutPromise]);
      if (!snapshot.empty) {
        const fetched: Project[] = [];
        snapshot.forEach((docSnap) => {
          const id = docSnap.id;
          const data = docSnap.data();
          if (deletedIds.has(id) || deletedIds.has(data.slug)) {
            return;
          }
          if (SUB_PROJECT_IDS.has(id) || SUB_PROJECT_IDS.has(data.slug)) {
            deleteDoc(doc(db, 'projects', id)).catch(() => {});
            return;
          }
          if (OBSOLETE_PROJECT_IDS.has(id) || OBSOLETE_PROJECT_IDS.has(data.slug)) {
            deleteDoc(doc(db, 'projects', id)).catch(() => {});
            return;
          }
          fetched.push(normalizeProject({ id: docSnap.id, ...data }));
        });

        // Ensure default projects exist if not deleted by user
        for (const def of defaultProjects) {
          if (deletedIds.has(def.id) || deletedIds.has(def.slug)) continue;
          const index = fetched.findIndex((p) => p.id === def.id || p.slug === def.slug);
          if (index === -1) {
            const normalizedDef = normalizeProject(def);
            fetched.push(normalizedDef);
            setDoc(doc(db, 'projects', def.id), sanitizeForFirestore(normalizedDef)).catch(() => {});
          }
          // Do NOT overwrite user modifications stored in Firestore with default data
        }

        // Ensure 3d-printing-modeling is present and pinned to order: 1 (Top of list)
        const p3d = fetched.find((p) => p.slug === '3d-printing-modeling' || p.id === '3d-printing-modeling');
        if (p3d && p3d.order !== 1) {
          p3d.order = 1;
          setDoc(doc(db, 'projects', p3d.id), sanitizeForFirestore(p3d), { merge: true }).catch(() => {});
        }

        // Shift any non-3D project that claims order <= 1 so 3D card stays #1
        fetched.forEach((p) => {
          if (p.id !== '3d-printing-modeling' && p.slug !== '3d-printing-modeling' && p.order <= 1) {
            p.order = 2;
          }
        });

        fetched.sort((a, b) => a.order - b.order);
        saveLocalProjects(fetched);
        return fetched;
      } else {
        // First-time seed into Firestore
        console.log('Seeding initial projects to Firestore...');
        const seeded: Project[] = [];
        for (const proj of defaultProjects) {
          const norm = normalizeProject(proj);
          seeded.push(norm);
          await setDoc(doc(db, 'projects', proj.id), sanitizeForFirestore(norm));
        }
        saveLocalProjects(seeded);
        return seeded;
      }
    } catch (err) {
      console.warn('Firestore fetch failed or timed out, falling back to local storage:', err);
      return getLocalProjects();
    }
  }
  return getLocalProjects();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const decoded = decodeURIComponent(slug);
  const deletedIds = getDeletedProjectIds();
  if (deletedIds.has(decoded) || deletedIds.has(slug)) {
    return null;
  }

  const all = await getProjects();
  const found = all.find((p) => p.slug === decoded || p.id === decoded || p.slug === slug || p.id === slug);
  if (found) return found;

  // Direct fallback to defaultProjects only if not deleted
  const fallback = defaultProjects.find(
    (p) => p.slug === decoded || p.id === decoded || p.slug === slug || p.id === slug
  );
  if (fallback && !deletedIds.has(fallback.id) && !deletedIds.has(fallback.slug)) {
    return normalizeProject(fallback);
  }
  return null;
}

export async function saveProject(project: Project): Promise<void> {
  unmarkProjectDeleted(project.id);
  if (project.slug) unmarkProjectDeleted(project.slug);

  // Normalize multi-videos if present
  if (project.videoUrls && project.videoUrls.length > 0) {
    const parsedVideos = parseVideoList(project.videoUrls);
    project.videoUrls = parsedVideos.length > 0 ? parsedVideos : undefined;
    project.videoUrl = parsedVideos.length > 0 ? parsedVideos[0].url : undefined;
  } else if (project.videoUrl !== undefined) {
    const formatted = formatYouTubeEmbedUrl(project.videoUrl);
    project.videoUrl = formatted;
    project.videoUrls = formatted ? [{ title: 'Main Demo Video', url: formatted }] : undefined;
  } else {
    project.videoUrl = undefined;
    project.videoUrls = undefined;
  }

  // Normalize multi-3D models if present
  if (project.models3d && project.models3d.length > 0) {
    const parsedModels = parse3DModelsList(project.models3d, project.title);
    project.models3d = parsedModels.length > 0 ? parsedModels : undefined;
    project.model3d = parsedModels.length > 0 ? parsedModels[0] : undefined;
  } else if (project.model3d !== undefined && project.model3d.url) {
    project.models3d = [project.model3d];
  } else {
    project.model3d = undefined;
    project.models3d = undefined;
  }

  // Ensure heroImage, externalUrl, etc. are properly trimmed or undefined if empty
  if (project.heroImage !== undefined) {
    project.heroImage = project.heroImage.trim();
  }
  if (project.externalUrl !== undefined) {
    project.externalUrl = project.externalUrl.trim() || undefined;
  }

  // Sanitize payload recursively so NO undefined fields are sent to Firestore (preventing Firestore invalid-argument crashes)
  const sanitized = sanitizeForFirestore(project) as Project;

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'projects', project.id);
      await setDoc(docRef, sanitized);
    } catch (err) {
      console.error('Error saving to Firestore:', err);
      throw err;
    }
  }

  // Always keep local copy synchronized with exact sanitized document
  const local = getLocalProjects();
  const index = local.findIndex((p) => p.id === project.id || p.slug === project.slug);
  if (index >= 0) {
    local[index] = sanitized;
  } else {
    local.push(sanitized);
  }
  saveLocalProjects(local);
}

export async function deleteProject(id: string): Promise<void> {
  markProjectDeleted(id);

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.error('Error deleting from Firestore:', err);
    }
  }

  const local = getLocalProjects().filter((p) => p.id !== id && p.slug !== id);
  saveLocalProjects(local);
}

// -------------------------------------------------------------
// Sub-Projects Management (All 3D CAD Projects reside here!)
// -------------------------------------------------------------
export async function get3DContainerProject(): Promise<Project> {
  const main = await getProjectBySlug('3d-printing-modeling');
  if (main) return main;
  const def = defaultProjects.find((p) => p.slug === '3d-printing-modeling')!;
  return def;
}

export async function getSubProjectById(subId: string): Promise<SubProject | null> {
  const container = await get3DContainerProject();
  if (!container.subProjects) return null;
  return container.subProjects.find((s) => s.id === subId) || null;
}

export async function saveSubProject(sub: SubProject): Promise<void> {
  // Normalize multi-videos if present
  if (sub.videoUrls && sub.videoUrls.length > 0) {
    const parsedVideos = parseVideoList(sub.videoUrls);
    sub.videoUrls = parsedVideos.length > 0 ? parsedVideos : undefined;
    sub.videoUrl = parsedVideos.length > 0 ? parsedVideos[0].url : undefined;
  } else if (sub.videoUrl !== undefined) {
    const formatted = formatYouTubeEmbedUrl(sub.videoUrl);
    sub.videoUrl = formatted;
    sub.videoUrls = formatted ? [{ title: 'Demo Video', url: formatted }] : undefined;
  } else {
    sub.videoUrl = undefined;
    sub.videoUrls = undefined;
  }

  // Normalize multi-3D models if present
  if (sub.models3d && sub.models3d.length > 0) {
    const parsedModels = parse3DModelsList(sub.models3d, sub.title);
    sub.models3d = parsedModels.length > 0 ? parsedModels : undefined;
    sub.model3d = parsedModels.length > 0 ? parsedModels[0] : undefined;
  } else if (sub.model3d !== undefined && sub.model3d.url) {
    sub.models3d = [sub.model3d];
  } else {
    sub.model3d = undefined;
    sub.models3d = undefined;
  }

  if (sub.heroImage !== undefined) {
    sub.heroImage = sub.heroImage.trim() || undefined;
  }

  const container = await get3DContainerProject();
  const currentSubs = container.subProjects ? [...container.subProjects] : [];
  const idx = currentSubs.findIndex((s) => s.id === sub.id);
  if (idx >= 0) {
    currentSubs[idx] = sub;
  } else {
    currentSubs.push(sub);
  }
  container.subProjects = currentSubs;
  await saveProject(container);
}

export async function deleteSubProject(subId: string): Promise<void> {
  const container = await get3DContainerProject();
  if (!container.subProjects) return;
  container.subProjects = container.subProjects.filter((s) => s.id !== subId);
  await saveProject(container);
}

export async function resetProjectsToDefault(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(DELETED_PROJECTS_KEY);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProjects.map(normalizeProject)));
  }
  if (isFirebaseConfigured && db) {
    for (const p of defaultProjects) {
      await setDoc(doc(db, 'projects', p.id), sanitizeForFirestore(normalizeProject(p)));
    }
  }
}
