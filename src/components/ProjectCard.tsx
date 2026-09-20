'use client';

import Link from 'next/link';
import { Box, ArrowUpRight, Cpu } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const has3D = Boolean(project.model3d?.url);

  return (
    <div className="group glass-panel rounded-2xl overflow-hidden border border-slate-200 flex flex-col justify-between glass-panel-hover relative bg-white">
      {/* Top Media Preview or Engineering Software Banner */}
      {project.heroImage ? (
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
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
      ) : (
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-5 flex flex-col justify-between border-b border-slate-100">
          {/* Blueprint grid effect */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Row: Category Badge & Window Controls */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-cyan-300 shadow-sm">
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          {/* Center Graphic Emblem */}
          <div className="relative z-10 flex items-center justify-center my-auto py-1">
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner group-hover:border-blue-400/40 transition-colors">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <div className="text-left">
                <span className="font-mono text-xs font-bold text-slate-100 tracking-wider block">
                  {project.slug === 'fasteners-standards' ? 'fastenersstandards.com' : 'SOLIDWORKS ADD-IN'}
                </span>
                <span className="font-mono text-[10px] text-cyan-400">
                  {project.slug === 'fasteners-standards' ? 'Online Standards Reference' : 'C# / .NET COM API'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom subtle status */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{project.slug === 'fasteners-standards' ? 'Live Platform' : 'CAD Automation'}</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified
            </span>
          </div>
        </div>
      )}

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
