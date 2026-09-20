'use client';

import { useEffect, useState, useMemo } from 'react';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ModelViewer from '@/components/ModelViewer';
import SkillsSection from '@/components/SkillsSection';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { getProjects } from '@/lib/projectsService';
import { defaultProfile, defaultExperiences, defaultEducation, defaultSkillCategories, defaultProjects } from '@/lib/defaultData';
import { Project } from '@/lib/types';
import { extractSpotlightModels, SpotlightModelItem } from '@/lib/mediaUtils';
import { Sparkles, ChevronLeft, ChevronRight, Box, Layers } from 'lucide-react';

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(false);

  // Active spotlight index (defaults to index 0: Autonomous Agricultural Rover Rower)
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      try {
        const projs = await getProjects();
        if (projs && projs.length > 0) {
          setProjects(projs);
        }
      } catch (err) {
        console.error('Failed to load projects', err);
      }
    }
    loadData();
  }, []);

  // Dynamically extract every 3D model uploaded across all projects and subprojects!
  const spotlightModels: SpotlightModelItem[] = useMemo(() => {
    return extractSpotlightModels(projects);
  }, [projects]);

  // Ensure index stays safely bounded if list expands or contracts dynamically
  const safeSpotlightIndex = activeSpotlightIndex < spotlightModels.length ? activeSpotlightIndex : 0;
  const currentSpotlight = spotlightModels[safeSpotlightIndex] || spotlightModels[0];

  const categories = ['All', '3D CAD & Printing', 'Engineering Projects'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handlePrevSpotlight = () => {
    setActiveSpotlightIndex((prev) =>
      prev > 0 ? prev - 1 : spotlightModels.length - 1
    );
  };

  const handleNextSpotlight = () => {
    setActiveSpotlightIndex((prev) =>
      prev < spotlightModels.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <Hero profile={defaultProfile} />

      {/* 2. Interactive 3D Model Spotlight with Left/Right Navigation Arrows */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="glass-panel bg-white p-4 sm:p-8 rounded-3xl border border-blue-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Dynamic Model Details */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Featured Interactive 3D CAD</span>
                </div>

                {/* Model Counter Indicator */}
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800">
                  Model {safeSpotlightIndex + 1} of {spotlightModels.length}
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-display font-extrabold text-slate-950 transition-all leading-tight">
                {currentSpotlight.title}
              </h2>

              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {currentSpotlight.subtitle}
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed min-h-[48px] sm:min-h-[60px]">
                {currentSpotlight.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                {currentSpotlight.tools.map((t) => (
                  <span key={t} className="text-[11px] sm:text-xs font-mono font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2 sm:pt-3">
                <a
                  href={`/projects/${currentSpotlight.slug}${
                    currentSpotlight.subProjectId ? `?sub=${encodeURIComponent(currentSpotlight.subProjectId)}` : ''
                  }`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg"
                >
                  <span>Full Case Study & Specs</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Model Viewport with Responsive Controls */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 sm:gap-3.5 w-full">
                {/* Desktop Left Arrow Button (visible on tablet/desktop) */}
                <button
                  onClick={handlePrevSpotlight}
                  className="hidden sm:flex shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 items-center justify-center cursor-pointer group active:scale-95"
                  title="Previous 3D Model"
                  aria-label="Previous 3D Model"
                  id="prev-spotlight-btn"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
                </button>

                {/* 3D Model Canvas (takes 100% full width on mobile) */}
                <div className="flex-1 min-w-0 transition-all w-full">
                  <ModelViewer
                    key={currentSpotlight.url}
                    url={currentSpotlight.url}
                    title={currentSpotlight.title}
                    type={currentSpotlight.type || 'sketchfab'}
                  />
                </div>

                {/* Desktop Right Arrow Button (visible on tablet/desktop) */}
                <button
                  onClick={handleNextSpotlight}
                  className="hidden sm:flex shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 items-center justify-center cursor-pointer group active:scale-95"
                  title="Next 3D Model"
                  aria-label="Next 3D Model"
                  id="next-spotlight-btn"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Mobile Dedicated Touch Navigation Controls Bar (visible on mobile screens) */}
              <div className="flex sm:hidden items-center justify-between gap-2 px-1 pt-1">
                <button
                  onClick={handlePrevSpotlight}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold text-xs shadow-sm active:scale-95 transition-all"
                  title="Previous 3D Model"
                  aria-label="Previous 3D Model"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev Model</span>
                </button>

                <span className="text-[11px] font-mono font-bold px-2 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 shrink-0">
                  {safeSpotlightIndex + 1} / {spotlightModels.length}
                </span>

                <button
                  onClick={handleNextSpotlight}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
                  title="Next 3D Model"
                  aria-label="Next 3D Model"
                >
                  <span>Next Model</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Model selection quick indicator dots */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3.5 max-w-full px-1">
                {spotlightModels.map((m, idx) => (
                  <button
                    key={m.id || idx}
                    onClick={() => setActiveSpotlightIndex(idx)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      safeSpotlightIndex === idx
                        ? 'w-6 sm:w-8 bg-blue-600 shadow-sm'
                        : 'w-1.5 sm:w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={m.title}
                    aria-label={`Jump to ${m.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects Grid Section */}
      <section id="projects" className="py-12 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-950 mt-4">
              Engineering Projects & Prototyping
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              From electric vehicle conversion and custom CNC machines to automated Python BOM pipelines and parametric CAD models.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-white border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Technical Skills Section */}
      <SkillsSection categories={defaultSkillCategories} />

      {/* 5. Career & Education Timeline */}
      <ExperienceTimeline experiences={defaultExperiences} education={defaultEducation} />
    </div>
  );
}
