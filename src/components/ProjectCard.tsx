'use client';

import Link from 'next/link';
import { Box, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const has3D = Boolean(project.model3d?.url);

  return (
    <div className="group glass-panel rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between glass-panel-hover relative bg-white">
      {/* Top Media Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute('src', '/static/3dModel.jpeg');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-blue-700 shadow-sm">
            {project.category}
          </span>
        </div>

        {/* 3D Model Indicator */}
        {has3D && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-600 text-white shadow-md">
            <Box className="w-3 h-3 animate-spin text-white" style={{ animationDuration: '6s' }} />
            <span>
              {(project.models3d?.length || 0) > 1
                ? `${project.models3d!.length} Interactive 3D Models`
                : 'Interactive 3D'}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Tools / Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-500 font-medium">
                +{project.tools.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Card Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-xs font-mono font-medium text-slate-500">{project.date}</span>
          <div className="flex items-center gap-3">
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800 bg-cyan-50 px-2 py-1 rounded border border-cyan-200 transition-colors"
              >
                <span>Live Site</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Case Study</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
