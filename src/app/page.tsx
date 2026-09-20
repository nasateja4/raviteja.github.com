'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ModelViewer from '@/components/ModelViewer';
import SkillsSection from '@/components/SkillsSection';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { getProjects } from '@/lib/projectsService';
import { defaultProfile, defaultExperiences, defaultEducation, defaultSkillCategories, defaultProjects } from '@/lib/defaultData';
import { Project } from '@/lib/types';
import { Sparkles, ChevronLeft, ChevronRight, Box, Layers } from 'lucide-react';

// Curated list of all interactive 3D CAD models for the homepage spotlight
// Default is set to the Agricultural Rover (Rower) as requested!
const spotlightModels = [
  {
    id: 'rower-full',
    title: 'Autonomous Agricultural Rover (Rower)',
    subtitle: 'Agricultural Tool & High-Incline Towing Drivetrain',
    description: 'Custom autonomous agricultural rover assembly designed for K.I.T.E. Engineering College students. Engineered with mechanical calculations for heavy drawbar payload pulling and steep hill climb gradeability.',
    url: 'https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1',
    tools: ['SolidWorks', 'Calculations', 'Chassis Design', '3D Printing'],
    slug: 'agricultural-rover',
  },
  {
    id: 'rower-chassis',
    title: 'Agricultural Rover Structural Chassis',
    subtitle: 'Lightweight Terrain Clearance Frame',
    description: 'Chassis frame geometry engineered with mechanical stress analysis to ensure structural integrity and terrain clearance across irregular agricultural soil.',
    url: 'https://sketchfab.com/models/f9d694f2260c42a490f925d8bae35d0e/embed?autospin=1&autostart=1',
    tools: ['SolidWorks', 'FEA Structural', 'Sheet Metal'],
    slug: 'agricultural-rover',
  },
  {
    id: 'smart-watch',
    title: 'Smart Health Tracking Watch (watch_2)',
    subtitle: 'Wearable ESP32-S3 Snap-Fit Housing',
    description: 'Compact wearable IoT watch enclosure designed with snap-fit joints, integrating ESP32-S3, MAX30102 pulse oximeter, and MPU6050 accelerometer.',
    url: 'https://sketchfab.com/models/462b5d8ede60480c998d240b1384288c/embed?autostart=1',
    tools: ['Fusion 360', 'UltiMaker Cura', 'Snap-Fit Enclosure', 'IoT Wearable'],
    slug: 'smart-health-watch',
  },
  {
    id: 'cnc-z-axis',
    title: 'CNC Laser Z-Axis Upgrade Assembly',
    subtitle: 'Precision Depth Wood & Aluminum Milling',
    description: 'Rigid Z-axis gantry carriage accommodating a high-RPM spindle motor for 1mm per pass depth milling in hardwoods and soft aluminum.',
    url: 'https://sketchfab.com/models/ce1bf2b9e3c340c9a85c28e2003a8a75/embed?autospin=1&autostart=1',
    tools: ['Fusion 360', 'CNC Machining', 'Lead Screw Drive', 'GRBL'],
    slug: 'cnc-z-axis-upgrade',
  },
  {
    id: 'rotating-bed',
    title: '3D Printed Concentric Rotating Display Bed',
    subtitle: '360° Motorized Turntable for Video & CAD',
    description: 'Concentric 360-degree rotating turntable bed designed in Fusion 360 for dynamic CAD model inspection and video recording.',
    url: 'https://sketchfab.com/models/f9a45683183e4bc3a382eedf9c332771/embed?autospin=1&autostart=1',
    tools: ['Fusion 360', 'FDM 3D Printing', 'Product Presentation'],
    slug: 'rotating-display-bed',
  },
  {
    id: 'stepper-v7',
    title: 'Custom Stepper Motor v7 Robotic Housing',
    subtitle: '6-Axis Robotic Arm Joint Actuator',
    description: 'Tailored stepper motor outer housing and mounting flange designed in SolidWorks to guarantee structural alignment with robotic joint reducers.',
    url: 'https://sketchfab.com/models/099d6834458b4f1487ff29ad16225d22/embed?autospin=1&autostart=1',
    tools: ['SolidWorks', 'Robotics Kinematics', 'Actuator Enclosures'],
    slug: 'custom-stepper-motors',
  },
];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(false);

  // Default to index 0: Rower (Agricultural Rover) as requested!
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

  const categories = ['All', '3D CAD & Printing', 'Engineering Projects'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const currentSpotlight = spotlightModels[activeSpotlightIndex];

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
      <section className="max-w-7xl mx-auto px-6">
        <div className="glass-panel bg-white p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Dynamic Model Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Featured Interactive 3D CAD</span>
                </div>

                {/* Model Counter Indicator */}
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800">
                  Model {activeSpotlightIndex + 1} of {spotlightModels.length}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 transition-all">
                {currentSpotlight.title}
              </h2>

              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {currentSpotlight.subtitle}
              </p>

              <p className="text-slate-600 text-sm leading-relaxed min-h-[60px]">
                {currentSpotlight.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {currentSpotlight.tools.map((t) => (
                  <span key={t} className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-3">
                <a
                  href={`/projects/${currentSpotlight.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg"
                >
                  <span>Full Case Study & Specs</span>
                </a>

                {/* Mobile-friendly Arrow Controls under text */}
                <div className="flex lg:hidden items-center gap-2">
                  <button
                    onClick={handlePrevSpotlight}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
                    title="Previous 3D Model"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSpotlight}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
                    title="Next 3D Model"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Model Viewport with Left/Right Arrow Marks directly beside canvas */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 sm:gap-3.5 w-full">
                {/* Left Arrow Button */}
                <button
                  onClick={handlePrevSpotlight}
                  className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95"
                  title="Previous 3D Model"
                  aria-label="Previous 3D Model"
                  id="prev-spotlight-btn"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
                </button>

                {/* 3D Model Canvas */}
                <div className="flex-1 min-w-0 transition-all">
                  <ModelViewer
                    key={currentSpotlight.url}
                    url={currentSpotlight.url}
                    title={currentSpotlight.title}
                    type="sketchfab"
                  />
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNextSpotlight}
                  className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center cursor-pointer group active:scale-95"
                  title="Next 3D Model"
                  aria-label="Next 3D Model"
                  id="next-spotlight-btn"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Model selection quick indicators */}
              <div className="flex items-center justify-center gap-2 mt-3.5">
                {spotlightModels.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveSpotlightIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSpotlightIndex === idx
                        ? 'w-8 bg-blue-600 shadow-sm'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
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
