import { db, isFirebaseConfigured } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Project, SubProject } from './types';
import { defaultProjects } from './defaultData';

const LOCAL_STORAGE_KEY = 'raviteja_portfolio_projects_v10';

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

function normalizeProject(p: any): Project {
  const category = p.category === '3D CAD & Printing' ? '3D CAD & Printing' : 'Engineering Projects';
  return {
    ...p,
    category,
  };
}

// Helper to get projects from localStorage fallback with auto-sync of default projects
function getLocalProjects(): Project[] {
  if (typeof window === 'undefined') return defaultProjects.map(normalizeProject);
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    const initialized = defaultProjects.map(normalizeProject);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialized));
    return initialized;
  }
  try {
    const parsed: Project[] = JSON.parse(stored)
      .filter((p: Project) => !SUB_PROJECT_IDS.has(p.id) && !SUB_PROJECT_IDS.has(p.slug))
      .map(normalizeProject);
    // Ensure all default projects exist in stored data (merge missing ones)
    let updated = false;
    const merged = [...parsed];
    for (const def of defaultProjects) {
      const existingIndex = merged.findIndex((p) => p.id === def.id || p.slug === def.slug);
      if (existingIndex === -1) {
        merged.push(normalizeProject(def));
        updated = true;
      }
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
    const filtered = projects
      .filter((p) => !SUB_PROJECT_IDS.has(p.id) && !SUB_PROJECT_IDS.has(p.slug))
      .map(normalizeProject);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  }
}

export async function getProjects(): Promise<Project[]> {
  if (isFirebaseConfigured && db) {
    try {
      const colRef = collection(db, 'projects');
      const fetchPromise = getDocs(colRef);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 1500)
      );
      const snapshot = await Promise.race([fetchPromise, timeoutPromise]);
      if (!snapshot.empty) {
        const fetched: Project[] = [];
        snapshot.forEach((docSnap) => {
          const id = docSnap.id;
          const data = docSnap.data();
          // If a standalone CAD subproject was previously saved, purge it from top-level
          if (SUB_PROJECT_IDS.has(id) || SUB_PROJECT_IDS.has(data.slug)) {
            deleteDoc(doc(db, 'projects', id)).catch(() => {});
            return;
          }
          fetched.push(normalizeProject({ id: docSnap.id, ...data }));
        });

        // Ensure 3d-printing-modeling is present and pinned to order: 1 (Top of list)
        const p3d = fetched.find((p) => p.slug === '3d-printing-modeling' || p.id === '3d-printing-modeling');
        if (!p3d) {
          const def3D = defaultProjects.find((p) => p.slug === '3d-printing-modeling');
          if (def3D) {
            const normalized3D = normalizeProject({ ...def3D, order: 1 });
            fetched.push(normalized3D);
            setDoc(doc(db, 'projects', '3d-printing-modeling'), normalized3D).catch(() => {});
          }
        } else if (p3d.order !== 1) {
          p3d.order = 1;
          setDoc(doc(db, 'projects', p3d.id), p3d, { merge: true }).catch(() => {});
        }

        // Shift any non-3D project that claims order <= 1 so 3D card stays #1
        fetched.forEach((p) => {
          if (p.id !== '3d-printing-modeling' && p.slug !== '3d-printing-modeling' && p.order <= 1) {
            p.order = 2;
          }
        });

        fetched.sort((a, b) => a.order - b.order);
        return fetched;
      } else {
        // First-time seed into Firestore
        console.log('Seeding initial projects to Firestore...');
        for (const proj of defaultProjects) {
          await setDoc(doc(db, 'projects', proj.id), normalizeProject(proj));
        }
        return defaultProjects.map(normalizeProject);
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
  const all = await getProjects();
  const found = all.find((p) => p.slug === decoded || p.id === decoded || p.slug === slug || p.id === slug);
  if (found) return found;

  // Direct fallback to defaultProjects so no project is ever missed
  const fallback = defaultProjects.find(
    (p) => p.slug === decoded || p.id === decoded || p.slug === slug || p.id === slug
  );
  return fallback || null;
}

export async function saveProject(project: Project): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'projects', project.id);
      await setDoc(docRef, project);
    } catch (err) {
      console.error('Error saving to Firestore:', err);
    }
  }

  // Always keep local copy synchronized
  const local = getLocalProjects();
  const index = local.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    local[index] = project;
  } else {
    local.push(project);
  }
  saveLocalProjects(local);
}

export async function deleteProject(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.error('Error deleting from Firestore:', err);
    }
  }

  const local = getLocalProjects().filter((p) => p.id !== id);
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProjects));
  }
  if (isFirebaseConfigured && db) {
    for (const p of defaultProjects) {
      await setDoc(doc(db, 'projects', p.id), p);
    }
  }
}
