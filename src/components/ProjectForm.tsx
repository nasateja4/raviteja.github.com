'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/types';
import { saveProject } from '@/lib/projectsService';
import { Box, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState<Project['category']>(
    initialData?.category || '3D CAD & Printing'
  );
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialData?.fullDescription || '');
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || '/static/3dModel.jpeg');
  const [galleryText, setGalleryText] = useState(
    initialData?.galleryImages?.join('\n') || '/static/3dModel.jpeg'
  );
  const [modelUrl, setModelUrl] = useState(initialData?.model3d?.url || '');
  const [modelTitle, setModelTitle] = useState(initialData?.model3d?.title || '');
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '');
  const [toolsText, setToolsText] = useState(initialData?.tools?.join(', ') || 'SolidWorks, 3D Printing');
  const [specsText, setSpecsText] = useState(
    initialData?.specs?.map((s) => `${s.label}: ${s.value}`).join('\n') || ''
  );
  const [date, setDate] = useState(initialData?.date || new Date().getFullYear().toString());
  const [featured, setFeatured] = useState(initialData?.featured ?? true);
  const [order, setOrder] = useState(initialData?.order || 1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing && !slug) {
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

      const projectData: Project = {
        id: initialData?.id || slug,
        slug,
        title,
        category,
        shortDescription,
        fullDescription,
        heroImage,
        galleryImages: galleryImages.length > 0 ? galleryImages : [heroImage],
        tools,
        model3d: modelUrl ? { type: 'sketchfab', url: modelUrl, title: modelTitle || title } : undefined,
        videoUrl: videoUrl || undefined,
        specs,
        featured,
        date,
        order: Number(order) || 1,
      };

      await saveProject(projectData);
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
          {isEditing ? 'Edit Mode' : 'New Project'}
        </span>
      </div>

      <div className="glass-panel bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <h1 className="text-2xl font-display font-bold text-slate-900 mb-6">
          {isEditing ? `Edit: ${initialData?.title}` : 'Add New Engineering Project'}
        </h1>

        {error && (
          <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title & Slug */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. 6-Axis Articulated Robotic Arm"
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
                placeholder="e.g. 6-axis-robotic-arm"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Row 2: Category & Date */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              >
                <option value="3D CAD & Printing">3D CAD & Printing</option>
                <option value="EV & Automotive">EV & Automotive</option>
                <option value="Robotics & Automation">Robotics & Automation</option>
                <option value="Software & Scripting">Software & Scripting</option>
              </select>
            </div>

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

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Summary (for Card Grid)</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={2}
              placeholder="Brief 1-2 sentence overview of the project and mechanical significance..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Full Markdown Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Engineering Case Study (Markdown)</label>
            <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              rows={6}
              placeholder="In-depth breakdown of the project, CAD challenges, simulations, and outcomes..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* 3D Model Settings */}
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-4">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wide">
                Interactive 3D CAD Model (Sketchfab / GLB)
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  3D Model Embed URL
                </label>
                <input
                  type="text"
                  value={modelUrl}
                  onChange={(e) => setModelUrl(e.target.value)}
                  placeholder="https://sketchfab.com/models/.../embed"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Paste a Sketchfab embed URL or 3D model link</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">3D Model Label</label>
                <input
                  type="text"
                  value={modelTitle}
                  onChange={(e) => setModelTitle(e.target.value)}
                  placeholder="e.g. Smart Watch Enclosure Assembly"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Video & Media */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Hero Image URL</label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="/static/3dModel.jpeg or https://..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">YouTube Video Embed URL (Optional)</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Gallery Images (one per line)
            </label>
            <textarea
              value={galleryText}
              onChange={(e) => setGalleryText(e.target.value)}
              rows={3}
              placeholder="/static/watch.jpeg&#10;/static/watch_explore.jpeg"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Tools & Tech Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tools & Software (comma-separated)
            </label>
            <input
              type="text"
              value={toolsText}
              onChange={(e) => setToolsText(e.target.value)}
              placeholder="SolidWorks, ANSYS FEA, 3D Printing, Python"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Technical Specifications */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technical Specs (Format: Label : Value, one per line)
            </label>
            <textarea
              value={specsText}
              onChange={(e) => setSpecsText(e.target.value)}
              rows={3}
              placeholder="CAD Software : SolidWorks 2024&#10;Tolerance : ±0.05 mm&#10;Process : FDM Additive"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <Link
              href="/admin"
              className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving Project...' : isEditing ? 'Update Project' : 'Publish Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
