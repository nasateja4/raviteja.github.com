'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectForm from '@/components/ProjectForm';
import { getProjectBySlug } from '@/lib/projectsService';
import { Project } from '@/lib/types';

export default function EditProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (id) {
        const found = await getProjectBySlug(id);
        setProject(found);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-24 text-center text-slate-400">
        <p>Project not found.</p>
      </div>
    );
  }

  return <ProjectForm initialData={project} isEditing={true} />;
}
