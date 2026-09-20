'use client';

import { useState } from 'react';
import { Box, Maximize2 } from 'lucide-react';

interface ModelViewerProps {
  url?: string;
  title?: string;
  type?: 'sketchfab' | 'glb' | 'iframe';
}

export default function ModelViewer({ url, title = '3D CAD Model', type = 'sketchfab' }: ModelViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!url) {
    return (
      <div className="w-full h-80 rounded-2xl glass-panel bg-white flex flex-col items-center justify-center p-6 text-center border border-slate-200 shadow-sm">
        <Box className="w-12 h-12 text-slate-400 mb-3 animate-pulse" />
        <p className="text-slate-700 font-semibold">No 3D Model Attached</p>
        <p className="text-xs text-slate-500 mt-1">Upload or embed a 3D CAD model via the Admin CMS</p>
      </div>
    );
  }

  // Ensure Sketchfab embeds have proper parameters
  let embedUrl = url;
  if (url.includes('sketchfab.com') && !url.includes('/embed')) {
    embedUrl = url.replace('/3d-models/', '/models/') + '/embed?autostart=1&ui_controls=1&ui_infos=0';
  } else if (url.includes('sketchfab.com') && !url.includes('autostart=1')) {
    embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'autostart=1&ui_controls=1&ui_infos=0';
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden glass-panel bg-white border border-slate-300 shadow-xl transition-all ${isFullscreen ? 'fixed inset-4 z-50 bg-white/95 flex flex-col' : 'w-full'}`}>
      {/* 3D Model Header Bar */}
      <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping shrink-0" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 font-mono flex items-center gap-1.5 shrink-0">
            <Box className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Interactive </span>3D CAD
          </span>
          <span className="text-[11px] sm:text-xs text-slate-500 font-medium truncate max-w-[110px] sm:max-w-xs">({title})</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen 3D View"}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Model Viewport with generous mobile height */}
      <div className={`relative w-full bg-slate-900 ${
        isFullscreen ? 'flex-grow min-h-[80vh]' : 'aspect-[4/3] sm:aspect-video lg:aspect-[16/10] min-h-[270px] sm:min-h-[340px]'
      }`}>
        <iframe
          title={title}
          src={embedUrl}
          className="w-full h-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
        />
      </div>

      {/* Interaction Hint */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-600 font-medium">
        <span className="truncate">💡 Touch & drag to rotate | Pinch to zoom</span>
        <span className="hidden sm:inline-block text-blue-700 font-semibold shrink-0 ml-2">Real-time WebGL CAD</span>
      </div>
    </div>
  );
}
