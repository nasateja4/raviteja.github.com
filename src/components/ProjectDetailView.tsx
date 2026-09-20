'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Project, Model3D, SubProject } from '@/lib/types';
import ModelViewer from '@/components/ModelViewer';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Box, Video, Image as ImageIcon, Calendar, Cpu, Layers } from 'lucide-react';

function parseInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="font-mono text-xs bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderMarkdownContent(content: string) {
  if (!content) return null;
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading 3 or 2
        if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
          const text = trimmed.replace(/^#{2,3}\s+/, '');
          return (
            <h4
              key={bIdx}
              className="text-lg sm:text-xl font-display font-bold text-blue-700 mt-6 first:mt-0 pt-2 border-b border-slate-100 pb-2"
            >
              {text}
            </h4>
          );
        }

        // Heading 4
        if (trimmed.startsWith('#### ')) {
          const text = trimmed.replace(/^####\s+/, '');
          return (
            <h5 key={bIdx} className="text-base sm:text-lg font-display font-bold text-slate-900 mt-4">
              {text}
            </h5>
          );
        }

        // Lines in block
        const lines = trimmed.split('\n');
        const hasBullets = lines.some((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '));

        if (hasBullets) {
          return (
            <div key={bIdx} className="space-y-2">
              {lines.map((line, lIdx) => {
                const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
                if (isBullet) {
                  const itemText = line.trim().replace(/^[-*]\s+/, '');
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 my-2 pl-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span className="text-slate-700 leading-relaxed">{parseInlineMarkdown(itemText)}</span>
                    </div>
                  );
                }
                return (
                  <p key={lIdx} className="mb-2 leading-relaxed">
                    {parseInlineMarkdown(line)}
                  </p>
                );
              })}
            </div>
          );
        }

        return (
          <p key={bIdx} className="leading-relaxed">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

interface ProjectDetailViewProps {
  project: Project;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const hasSubProjects = Boolean(project.subProjects && project.subProjects.length > 0);
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  // Active sub-project (or the main project if no sub-projects)
  const currentSub: SubProject | null = hasSubProjects
    ? project.subProjects![activeSubIndex]
    : null;

  // Active title and description
  const activeTitle = currentSub ? currentSub.title : project.title;
  const activeShortDescription = currentSub?.shortDescription || project.shortDescription;
  const activeFullDescription = currentSub ? currentSub.description : project.fullDescription;
  const activeSpecs = (currentSub?.specs && currentSub.specs.length > 0)
    ? currentSub.specs
    : project.specs || [];

  // Active 3D Models
  const all3DModels: Model3D[] = currentSub
    ? currentSub.models3d && currentSub.models3d.length > 0
      ? currentSub.models3d
      : currentSub.model3d
      ? [currentSub.model3d]
      : []
    : project.models3d && project.models3d.length > 0
    ? project.models3d
    : project.model3d
    ? [project.model3d]
    : [];

  const [activeModelIndex, setActiveModelIndex] = useState(0);

  // Active Videos
  const activeVideoUrl = currentSub?.videoUrl || project.videoUrl;

  // Active Gallery Images
  const gallery = currentSub?.galleryImages && currentSub.galleryImages.length > 0
    ? currentSub.galleryImages
    : project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : project.heroImage
    ? [project.heroImage]
    : [];

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Determine initial active media tab
  const [activeMediaTab, setActiveMediaTab] = useState<'3d' | 'video' | 'gallery' | null>(
    all3DModels.length > 0 ? '3d' : activeVideoUrl ? 'video' : gallery.length > 0 ? 'gallery' : null
  );

  // Handlers for switching sub-projects
  const handlePrevSub = () => {
    if (!hasSubProjects) return;
    const nextIdx = activeSubIndex > 0 ? activeSubIndex - 1 : project.subProjects!.length - 1;
    setActiveSubIndex(nextIdx);
    setActiveModelIndex(0);
    setActiveGalleryIndex(0);
    const nextSub = project.subProjects![nextIdx];
    if (nextSub.model3d || (nextSub.models3d && nextSub.models3d.length > 0)) {
      setActiveMediaTab('3d');
    } else if (nextSub.videoUrl) {
      setActiveMediaTab('video');
    } else {
      setActiveMediaTab('gallery');
    }
  };

  const handleNextSub = () => {
    if (!hasSubProjects) return;
    const nextIdx = activeSubIndex < project.subProjects!.length - 1 ? activeSubIndex + 1 : 0;
    setActiveSubIndex(nextIdx);
    setActiveModelIndex(0);
    setActiveGalleryIndex(0);
    const nextSub = project.subProjects![nextIdx];
    if (nextSub.model3d || (nextSub.models3d && nextSub.models3d.length > 0)) {
      setActiveMediaTab('3d');
    } else if (nextSub.videoUrl) {
      setActiveMediaTab('video');
    } else {
      setActiveMediaTab('gallery');
    }
  };

  const handleSelectSub = (idx: number) => {
    setActiveSubIndex(idx);
    setActiveModelIndex(0);
    setActiveGalleryIndex(0);
    const nextSub = project.subProjects![idx];
    if (nextSub.model3d || (nextSub.models3d && nextSub.models3d.length > 0)) {
      setActiveMediaTab('3d');
    } else if (nextSub.videoUrl) {
      setActiveMediaTab('video');
    } else {
      setActiveMediaTab('gallery');
    }
  };

  const current3DModel = all3DModels[activeModelIndex] || all3DModels[0];

  return (
    <div className="py-12 max-w-5xl mx-auto px-6 space-y-8">
      {/* Back Navigation */}
      <div>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Main Category & Date Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-200 text-blue-700 shadow-sm">
            {project.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono font-medium text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            {project.date}
          </span>
        </div>

        {hasSubProjects && (
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800">
            Project {activeSubIndex + 1} of {project.subProjects!.length}
          </span>
        )}
      </div>

      {/* DYNAMIC SUB-PROJECT HEADER */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
          {activeTitle}
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {activeShortDescription}
        </p>

        {/* Tools Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
            >
              {tool}
            </span>
          ))}

          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 font-bold text-xs shadow-sm transition-all"
            >
              <span>Visit Live Website ↗</span>
            </a>
          )}
        </div>
      </div>

      {/* DYNAMIC MEDIA SWITCHER TABS (3D Model / Video / Photos of THIS sub-project) */}
      {Boolean(activeMediaTab) && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            {all3DModels.length > 0 && (
              <button
                onClick={() => setActiveMediaTab('3d')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeMediaTab === '3d'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>Interactive 3D Model {all3DModels.length > 1 ? `(${all3DModels.length})` : ''}</span>
              </button>
            )}

            {activeVideoUrl && (
              <button
                onClick={() => setActiveMediaTab('video')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeMediaTab === 'video'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video Demonstration</span>
              </button>
            )}

            {gallery.length > 0 && (
              <button
                onClick={() => setActiveMediaTab('gallery')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeMediaTab === 'gallery'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photos & CAD ({gallery.length})</span>
              </button>
            )}
          </div>

        {/* Media Viewport */}
        <div className="w-full">
          {activeMediaTab === '3d' && current3DModel && (
            <div className="space-y-3">
              {/* If this subproject has multiple 3D models (like Agricultural Rover), show sub-model selector */}
              {all3DModels.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-slate-100 border border-slate-200">
                  <span className="text-xs font-bold text-slate-500 px-2 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    Select 3D Part:
                  </span>
                  {all3DModels.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveModelIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeModelIndex === idx
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      {m.title}
                    </button>
                  ))}
                </div>
              )}

              {/* 3D Model Canvas flanked by Left and Right Arrow Buttons */}
              <div className="flex items-center gap-2 sm:gap-4 w-full">
                {hasSubProjects && (
                  <button
                    onClick={handlePrevSub}
                    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95"
                    title="Previous 3D Model / Sub-Project"
                    aria-label="Previous 3D Model"
                    id="prev-subproject-canvas-btn"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
                  </button>
                )}

                <div className="flex-1 min-w-0 transition-all">
                  <ModelViewer
                    key={current3DModel.url}
                    url={current3DModel.url}
                    title={current3DModel.title}
                    type={current3DModel.type}
                  />
                </div>

                {hasSubProjects && (
                  <button
                    onClick={handleNextSub}
                    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95"
                    title="Next 3D Model / Sub-Project"
                    aria-label="Next 3D Model"
                    id="next-subproject-canvas-btn"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>

              {/* Quick dot indicator below canvas */}
              {hasSubProjects && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  {project.subProjects!.map((sp, idx) => (
                    <button
                      key={sp.id}
                      onClick={() => handleSelectSub(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeSubIndex === idx
                          ? 'w-8 bg-blue-600 shadow-sm'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      title={sp.title}
                      aria-label={`Jump to ${sp.title}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeMediaTab === 'video' && activeVideoUrl && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 sm:gap-4 w-full">
                {hasSubProjects && (
                  <button
                    onClick={handlePrevSub}
                    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95"
                    title="Previous Sub-Project"
                    aria-label="Previous Project"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
                  </button>
                )}

                <div className="flex-1 min-w-0 aspect-video rounded-2xl overflow-hidden glass-panel bg-black border border-slate-200 shadow-xl">
                  <iframe
                    src={activeVideoUrl}
                    title="Video Demonstration"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                {hasSubProjects && (
                  <button
                    onClick={handleNextSub}
                    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95"
                    title="Next Sub-Project"
                    aria-label="Next Project"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>

              {/* Quick dot indicator */}
              {hasSubProjects && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  {project.subProjects!.map((sp, idx) => (
                    <button
                      key={sp.id}
                      onClick={() => handleSelectSub(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeSubIndex === idx
                          ? 'w-8 bg-blue-600 shadow-sm'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      title={sp.title}
                      aria-label={`Jump to ${sp.title}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeMediaTab === 'gallery' && (
            <div className="space-y-4">
              {/* Main Display Image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-panel border border-slate-200 bg-slate-950 flex items-center justify-center shadow-md">
                <img
                  src={gallery[activeGalleryIndex]}
                  alt="Gallery View"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', project.heroImage);
                  }}
                />

                {/* Slider Arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveGalleryIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 border border-slate-200 text-slate-800 hover:bg-blue-600 hover:text-white transition-all shadow-md"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveGalleryIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 border border-slate-200 text-slate-800 hover:bg-blue-600 hover:text-white transition-all shadow-md"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeGalleryIndex === idx
                          ? 'border-blue-600 scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      )}

      {/* DYNAMIC TECHNICAL SPECS FOR THIS SUB-PROJECT */}
      {activeSpecs.length > 0 && (
        <div className="glass-panel bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h3 className="font-display font-bold text-xl text-slate-900">Technical Specifications & Parameters</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {activeSpecs.map((spec, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wide">{spec.label}</span>
                <span className="text-sm font-bold text-blue-700 mt-1 block">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DYNAMIC ENGINEERING DESCRIPTION FOR THIS SUB-PROJECT */}
      <div className="glass-panel bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-display font-bold text-2xl text-slate-900 border-b border-slate-100 pb-3">Engineering Overview & Implementation</h3>
        <div className="pt-2">
          {renderMarkdownContent(activeFullDescription)}
        </div>
      </div>

      {/* DEDICATED PROJECT VIDEO DEMO SECTION (Matching original HTML project pages) */}
      {Boolean(activeVideoUrl) && (
        <div className="glass-panel bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-600" />
            <h3 className="font-display font-bold text-2xl text-slate-900">Project Demonstration Video</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Watch the video below to see the project demo in action.
          </p>
          <div className="aspect-video w-full rounded-2xl overflow-hidden glass-panel bg-black border border-slate-200 shadow-xl">
            <iframe
              src={activeVideoUrl}
              title={`${activeTitle} Video Demo`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Bottom Sub-Project Shift & CTA */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {hasSubProjects ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevSub}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4 text-blue-600" />
              <span>Previous Project</span>
            </button>
            <button
              onClick={handleNextSub}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>Next Project</span>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        ) : (
          <Link
            href="/#projects"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            ← Back to Projects
          </Link>
        )}

        <a
          href="/#contact"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
        >
          Discuss Engineering Collaboration
        </a>
      </div>
    </div>
  );
}
