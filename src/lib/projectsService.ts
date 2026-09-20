import { db, isFirebaseConfigured } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Project } from './types';
import { defaultProjects } from './defaultData';

const LOCAL_STORAGE_KEY = 'raviteja_portfolio_projects_v8';

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
      .filter((p: any) => p.id !== '3d-printing-modeling' && p.slug !== '3d-printing-modeling')
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects.map(normalizeProject)));
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
          if (docSnap.id !== '3d-printing-modeling') {
            fetched.push(normalizeProject({ id: docSnap.id, ...docSnap.data() }));
          }
        });

        // Ensure all newly separated default projects exist in Firestore data:
        for (const def of defaultProjects) {
          const exists = fetched.some((p) => p.id === def.id || p.slug === def.slug);
          if (!exists) {
            const normalizedDef = normalizeProject(def);
            fetched.push(normalizedDef);
            // Write to Firestore so it is stored permanently
            setDoc(doc(db, 'projects', def.id), normalizedDef).catch((e) =>
              console.warn('Sync def to Firestore err:', e)
            );
          }
        }

        // Delete old bundled container from Firestore
        deleteDoc(doc(db, 'projects', '3d-printing-modeling')).catch(() => {});

        fetched.sort((a, b) => a.order - b.order);
        saveLocalProjects(fetched);
        return fetched;
      } else {
        // First-time seed into Firestore
        console.log('Seeding initial projects to Firestore...');
        const normalized = defaultProjects.map(normalizeProject);
        for (const proj of normalized) {
          await setDoc(doc(db, 'projects', proj.id), proj);
        }
        return normalized;
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

  // Fallback for previous 3d-printing-modeling link
  if (decoded === '3d-printing-modeling' || slug === '3d-printing-modeling') {
    return all.find((p) => p.slug === 'agricultural-rover') || all[0] || null;
  }

  // Direct fallback to defaultProjects so no project is ever missed
  const fallback = defaultProjects.find(
    (p) => p.slug === decoded || p.id === decoded || p.slug === slug || p.id === slug
  );
  return fallback ? normalizeProject(fallback) : null;
}

export async function saveProject(project: Project): Promise<void> {
  const normalized = normalizeProject(project);
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'projects', normalized.id);
      await setDoc(docRef, normalized);
    } catch (err) {
      console.error('Error saving to Firestore:', err);
    }
  }

  // Always keep local copy synchronized
  const local = getLocalProjects();
  const index = local.findIndex((p) => p.id === normalized.id);
  if (index >= 0) {
    local[index] = normalized;
  } else {
    local.push(normalized);
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

export async function resetProjectsToDefault(): Promise<void> {
  const normalized = defaultProjects.map(normalizeProject);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalized));
  }
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', '3d-printing-modeling'));
    } catch (e) {}
    for (const p of normalized) {
      await setDoc(doc(db, 'projects', p.id), p);
    }
  }
}
