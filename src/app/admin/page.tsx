'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProjects, deleteProject, resetProjectsToDefault } from '@/lib/projectsService';
import { Project } from '@/lib/types';
import { isFirebaseConfigured, auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Plus, Trash2, Edit, ExternalLink, Box, LogOut, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('portfolio_admin_logged_in');
      if (!loggedIn && !auth?.currentUser) {
        router.push('/admin/login');
      }
    }
  };

  const loadData = async () => {
    setLoading(true);
    const list = await getProjects();
    setProjects(list);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const handleLogout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem('portfolio_admin_logged_in');
    router.push('/admin/login');
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteProject(id);
      setActionMessage(`Deleted "${title}" successfully.`);
      setTimeout(() => setActionMessage(''), 3000);
      loadData();
    }
  };

  const handleResetDefaults = async () => {
    if (confirm('Restore all 6 default original projects? Any unsaved modifications will be replaced.')) {
      await resetProjectsToDefault();
      setActionMessage('Restored default projects successfully.');
      setTimeout(() => setActionMessage(''), 3000);
      loadData();
    }
  };

  const modelCount = projects.filter((p) => p.model3d?.url).length;

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700">Content Management</span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
            Projects & 3D Model Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Live database sync: {isFirebaseConfigured ? 'Connected to Firebase Firestore' : 'Running in Local CMS Mode'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/project/new"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-600 transition-colors shadow-sm"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-mono font-semibold">Total Projects</span>
          <p className="text-3xl font-display font-extrabold text-slate-900 mt-1">{projects.length}</p>
        </div>
        <div className="glass-panel bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-mono font-semibold">Interactive 3D Models</span>
          <p className="text-3xl font-display font-extrabold text-blue-600 mt-1">{modelCount}</p>
        </div>
        <div className="glass-panel bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-mono font-semibold">Restore Data</span>
            <p className="text-xs text-slate-500 mt-1">Reset to standard projects</p>
          </div>
          <button
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold border border-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="glass-panel bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h2 className="font-display font-bold text-lg text-slate-900">All Portfolio Projects</h2>
          <span className="text-xs text-slate-500 font-mono font-medium">{projects.length} Items</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            No projects found. Click "Add New Project" or "Reset" to seed default data.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/75 transition-colors"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    className="w-16 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', '/static/3dModel.jpeg');
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-slate-900 text-base">{proj.title}</h3>
                      {proj.model3d?.url && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                          <Box className="w-2.5 h-2.5" /> 3D
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      <span className="text-blue-700 font-semibold">{proj.category}</span> • {proj.date}
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    href={`/projects/${proj.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-blue-600 transition-colors"
                    title="View Live Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/project/${proj.id}`}
                    className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
