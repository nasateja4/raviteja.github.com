'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Project, SubProject } from '@/lib/types';
import { saveProject, getProjectBySlug, saveSubProject, getSubProjectById } from '@/lib/projectsService';
import { Box, Save, ArrowLeft, Cpu, Sparkles, CheckSquare, Layers } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mode: 'cad' for 3D CAD & Printing, 'engineering' for all other engineering projects
  const queryType = searchParams?.get('type');
  const subIdParam = searchParams?.get('subId');

  const [projectMode, setProjectMode] = useState<'cad' | 'engineering'>(
    initialData
      ? initialData.category === '3D CAD & Printing'
        ? 'cad'
        : 'engineering'
      : queryType === 'engineering'
      ? 'engineering'
      : 'cad'
  );

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState<Project['category']>(
    initialData?.category || (projectMode === 'cad' ? '3D CAD & Printing' : 'Engineering Projects')
  );
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialData?.fullDescription || '');
  const [externalUrl, setExternalUrl] = useState(initialData?.externalUrl || '');
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || '');
  const [galleryText, setGalleryText] = useState(
    initialData?.galleryImages?.join('\n') || ''
  );
  const [modelUrl, setModelUrl] = useState(initialData?.model3d?.url || '');
  const [modelTitle, setModelTitle] = useState(initialData?.model3d?.title || '');
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
  const [toolsText, setToolsText] = useState(
    initialData?.tools?.join(', ') ||
      (projectMode === 'cad'
        ? 'SolidWorks, Fusion 360, Ultimaker Cura, 3D Printing'
        : 'SolidWorks, ANSYS FEA, Python')
  );
  const [specsText, setSpecsText] = useState(
    initialData?.specs?.map((s) => `${s.label}: ${s.value}`).join('\n') || ''
  );
  const [date, setDate] = useState(initialData?.date || new Date().getFullYear().toString());
  const [featured, setFeatured] = useState(initialData?.featured ?? true);
  const [order, setOrder] = useState(initialData?.order || 1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If editing an existing 3D CAD subproject, populate its data
  useEffect(() => {
    if (subIdParam && projectMode === 'cad') {
      getSubProjectById(subIdParam).then((sub) => {
        if (sub) {
          setTitle(sub.title);
          setSlug(sub.id);
          setShortDescription(sub.shortDescription || '');
          setFullDescription(sub.description);
          setModelUrl(sub.model3d?.url || '');
          setModelTitle(sub.model3d?.title || '');
          setVideoUrl(sub.videoUrl || '');
          setHeroImage(sub.heroImage || (sub.galleryImages?.[0] || ''));
          setGalleryText(sub.galleryImages?.join('\n') || '');
          setToolsText(sub.tools?.join(', ') || '');
          setSpecsText(sub.specs?.map((s) => `${s.label}: ${s.value}`).join('\n') || '');
        }
      });
    }
  }, [subIdParam, projectMode]);

  // Update category when switching mode
  const handleModeChange = (mode: 'cad' | 'engineering') => {
    setProjectMode(mode);
    setCategory(mode === 'cad' ? '3D CAD & Printing' : 'Engineering Projects');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing && !subIdParam && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title || !slug) {
      setError('Please provide a title and slug.');
      return;
    }

    setLoading(true);

    try {
      const galleryImages = galleryText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const tools = toolsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const specs = specsText
        .split('\n')
        .map((line) => {
          const parts = line.split(':');
          if (parts.length >= 2) {
            return {
              label: parts[0].trim(),
              value: parts.slice(1).join(':').trim(),
            };
          }
          return null;
        })
        .filter(Boolean) as { label: string; value: string }[];

      if (projectMode === 'cad') {
        // Save directly into the single 3D CAD & Printing card collection
        const subData: SubProject = {
          id: slug,
          title,
          shortDescription,
          description: fullDescription,
          model3d: modelUrl ? { type: 'sketchfab', url: modelUrl, title: modelTitle || title } : undefined,
          videoUrl: videoUrl || undefined,
          heroImage: heroImage || (galleryImages.length > 0 ? galleryImages[0] : undefined),
          galleryImages: galleryImages.length > 0 ? galleryImages : heroImage ? [heroImage] : [],
          tools,
          specs,
        };

        await saveSubProject(subData);
      } else {
        // Save as independent Engineering Project card
        const projectData: Project = {
          id: initialData?.id || slug,
          slug,
          title,
          category: 'Engineering Projects',
          shortDescription,
          fullDescription,
          heroImage,
          galleryImages: galleryImages.length > 0 ? galleryImages : heroImage ? [heroImage] : [],
          tools,
          model3d: modelUrl ? { type: 'sketchfab', url: modelUrl, title: modelTitle || title } : undefined,
          videoUrl: videoUrl || undefined,
          externalUrl: externalUrl || undefined,
          specs,
          featured,
          date,
          order: Number(order) || 1,
        };

        await saveProject(projectData);
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to save project.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <span className="text-xs font-mono font-bold text-blue-700 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
          {isEditing ? 'Edit Mode' : projectMode === 'cad' ? 'New 3D CAD & Printing' : 'New Engineering Project'}
        </span>
      </div>

      <div className="glass-panel bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
        {/* Mode Selector Buttons (Two Distinct Buttons as Requested) */}
        {!isEditing && (
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Project Type to Create:
            </label>
            <div className="p-1.5 bg-slate-100 rounded-2xl flex items-center gap-2 border border-slate-200">
              <button
                type="button"
                onClick={() => handleModeChange('cad')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  projectMode === 'cad'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>3D CAD & Printing Project</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('engineering')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  projectMode === 'engineering'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Engineering Project</span>
              </button>
            </div>
          </div>
        )}

        {/* Mode Banner Indicator */}
        {projectMode === 'cad' ? (
          <div className="p-4 mb-6 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>3D CAD & Printing Category:</strong> Add 3D CAD assemblies, Sketchfab models, and additive prototyping projects.
              </span>
            </div>
            <span className="font-mono font-bold text-[10px] bg-blue-200/60 px-2 py-0.5 rounded text-blue-800 shrink-0">
              Category: 3D CAD & Printing
            </span>
          </div>
        ) : (
          <div className="p-4 mb-6 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-700 shrink-0" />
              <span>
                <strong>Engineering Projects:</strong> Unique engineering projects, prototyping, research, EV, robotics, or software tools.
              </span>
            </div>
            <span className="font-mono font-bold text-[10px] bg-slate-200 px-2.5 py-1 rounded-full text-slate-700 shrink-0">
              Category: Engineering Projects
            </span>
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title & Slug */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {projectMode === 'cad' ? '3D CAD Model / Project Title *' : 'Project Title *'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder={
                  projectMode === 'cad'
                    ? 'e.g. Autonomous Agricultural Rover (Rower)'
                    : 'e.g. Electric Vehicle Conversion – Maruti 800'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder={
                  projectMode === 'cad' ? 'e.g. agricultural-rover' : 'e.g. ev-conversion-maruti-800'
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Row 2: Year / Date & Display Order */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Year / Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 2024"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Display Order</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Short Summary */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Summary *</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={2}
              placeholder="Brief 1-2 sentence mechanical summary of the project..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              required
            />
          </div>

          {/* Full Engineering Case Studies */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Engineering Case Studies & Details (Markdown) *
            </label>
            <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              rows={6}
              placeholder="Detailed engineering breakdown: calculations, kinematics, CAD challenges, tolerances, and outcomes..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
              required
            />
          </div>

          {/* 3D CAD Model Section (Highlighted in CAD mode, optional in Engineering mode) */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              projectMode === 'cad'
                ? 'bg-blue-50/80 border-blue-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  3D CAD Model Embed (Sketchfab / GLB)
                </h3>
              </div>
              {projectMode === 'cad' && (
                <span className="text-xs font-mono font-bold text-blue-600">Featured in 3D Canvas</span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  3D Model Embed URL {projectMode === 'cad' && '(Sketchfab)'}
                </label>
                <input
                  type="text"
                  value={modelUrl}
                  onChange={(e) => setModelUrl(e.target.value)}
                  placeholder="https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Paste a Sketchfab embed URL or 3D model link</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">3D Model Part Label</label>
                <input
                  type="text"
                  value={modelTitle}
                  onChange={(e) => setModelTitle(e.target.value)}
                  placeholder="e.g. Agricultural Rover Full Assembly"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* In 3D CAD mode: Clear notification that this saves into the single 3D card collection */}
            {projectMode === 'cad' && (
              <div className="pt-2 border-t border-blue-200/60 flex items-center gap-2 text-xs text-blue-900 font-medium">
                <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Automatically adds this project inside the single <strong>3D Modeling & Prototyping Projects</strong> card on your portfolio (interactive via arrows on <code className="text-blue-700 font-mono">/projects/3d-printing-modeling</code>).
                </span>
              </div>
            )}
          </div>

          {/* External Live Website URL (For tools like FastenersStandards.com) */}
          {projectMode === 'engineering' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Live Website / External Tool URL (Optional)
              </label>
              <input
                type="text"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://fastenersstandards.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <p className="text-[11px] text-slate-500 mt-1">If this project is a live web tool, add its link here.</p>
            </div>
          )}

          {/* Media: Hero Image & YouTube */}
          <div className="grid sm:grid-cols-2 gap-4">
            {projectMode === 'engineering' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Hero Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="/static/EV_vehical/EV_car.JPG (Leave blank for blueprint graphic banner)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            )}

            <div className={projectMode === 'cad' ? 'sm:col-span-2' : ''}>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                YouTube Video Embed URL (Optional)
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Images URL (one per line) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Images URL (one per line)
            </label>
            <textarea
              value={galleryText}
              onChange={(e) => setGalleryText(e.target.value)}
              rows={3}
              placeholder={
                projectMode === 'cad'
                  ? '/static/rower/3dModel.jpeg&#10;/static/rower/IMG_20241119_221533.jpg&#10;/static/rower/car_3d.gif'
                  : '/static/EV_vehical/EV_car.JPG&#10;/static/EV_vehical/award.png&#10;/static/EV_vehical/IMG_3262.JPG'
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Tools & Software */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tools & Software (comma-separated)
            </label>
            <input
              type="text"
              value={toolsText}
              onChange={(e) => setToolsText(e.target.value)}
              placeholder="SolidWorks, Fusion 360, ANSYS FEA, 3D Printing, Python"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Technical Specs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technical Specs (Format: Label : Value, one per line)
            </label>
            <textarea
              value={specsText}
              onChange={(e) => setSpecsText(e.target.value)}
              rows={3}
              placeholder="Application : Autonomous Agricultural Towing&#10;CAD Software : SolidWorks Parametric Assembly&#10;Manufacturing : FDM Additive Prototyping"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>
                {loading
                  ? 'Saving Project...'
                  : isEditing
                  ? 'Update Project'
                  : projectMode === 'cad'
                  ? 'Publish 3D CAD Project'
                  : 'Publish Engineering Project'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
