import { getProjectBySlug, getProjects } from '@/lib/projectsService';
import { defaultProjects } from '@/lib/defaultData';
import ProjectDetailView from '@/components/ProjectDetailView';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Ravi Teja Chevuri`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center glass-panel bg-white rounded-3xl mt-12 border border-slate-200 shadow-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Not Found</h2>
        <p className="text-slate-500 mb-6">The requested case study could not be located or has been archived.</p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-sm hover:bg-blue-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return <ProjectDetailView project={project} />;
}
