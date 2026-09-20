import { db, isFirebaseConfigured } from './firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Project } from './types';
import { defaultProjects } from './defaultData';

const LOCAL_STORAGE_KEY = 'raviteja_portfolio_projects_v7';

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
    const parsed: Project[] = JSON.parse(stored).map(normalizeProject);
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
          fetched.push(normalizeProject({ id: docSnap.id, ...docSnap.data() }));
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
