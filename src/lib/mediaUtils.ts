import { VideoItem, Model3D } from './types';

/**
 * Normalizes any YouTube URL (watch, shorts, share youtu.be, or embed)
 * into a clean standard embed URL: https://www.youtube.com/embed/{id}.
 * If empty or whitespace, returns undefined so it can be cleanly deleted.
 */
export function formatYouTubeEmbedUrl(url?: string): string | undefined {
  if (!url || !url.trim()) return undefined;
  const trimmed = url.trim();

  // If already embed URL with or without parameters:
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`;
  }

  // Standard watch URL or youtu.be short URL or shorts URL:
  const watchMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?.*v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  return trimmed;
}

/**
 * Parses multiline string or array of video URLs (with optional "Title | URL" syntax)
 * into a clean list of VideoItem objects with normalized embed URLs.
 */
export function parseVideoList(raw?: (string | VideoItem)[] | string): VideoItem[] {
  if (!raw) return [];
  const list: VideoItem[] = [];

  if (typeof raw === 'string') {
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    lines.forEach((line, idx) => {
      let title = `Video ${idx + 1}`;
      let url = line;
      if (line.includes('|')) {
        const parts = line.split('|');
        title = parts[0].trim() || `Video ${idx + 1}`;
        url = parts.slice(1).join('|').trim();
      }
      const formatted = formatYouTubeEmbedUrl(url);
      if (formatted) {
        list.push({ title, url: formatted });
      }
    });
    return list;
  }

  if (Array.isArray(raw)) {
    raw.forEach((item, idx) => {
      if (typeof item === 'string') {
        let title = `Video ${idx + 1}`;
        let url = item.trim();
        if (url.includes('|')) {
          const parts = url.split('|');
          title = parts[0].trim() || `Video ${idx + 1}`;
          url = parts.slice(1).join('|').trim();
        }
        const formatted = formatYouTubeEmbedUrl(url);
        if (formatted) list.push({ title, url: formatted });
      } else if (item && typeof item === 'object' && item.url) {
        const formatted = formatYouTubeEmbedUrl(item.url);
        if (formatted) list.push({ title: item.title || `Video ${idx + 1}`, url: formatted });
      }
    });
  }

  return list;
}

/**
 * Parses multiline string or array of 3D CAD models (with optional "Part Label | Embed URL" syntax)
 * into a clean list of Model3D objects.
 */
export function parse3DModelsList(raw?: (string | Model3D)[] | string, defaultTitle: string = '3D Part'): Model3D[] {
  if (!raw) return [];
  const list: Model3D[] = [];

  if (typeof raw === 'string') {
    const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
    lines.forEach((line, idx) => {
      let title = lines.length === 1 ? defaultTitle : `${defaultTitle} ${idx + 1}`;
      let url = line;
      if (line.includes('|')) {
        const parts = line.split('|');
        title = parts[0].trim() || `${defaultTitle} ${idx + 1}`;
        url = parts.slice(1).join('|').trim();
      }
      if (url) {
        list.push({ title, url, type: 'sketchfab' });
      }
    });
    return list;
  }

  if (Array.isArray(raw)) {
    raw.forEach((item, idx) => {
      if (typeof item === 'string' && item.trim()) {
        let title = `${defaultTitle} ${idx + 1}`;
        let url = item.trim();
        if (url.includes('|')) {
          const parts = url.split('|');
          title = parts[0].trim() || `${defaultTitle} ${idx + 1}`;
          url = parts.slice(1).join('|').trim();
        }
        if (url) list.push({ title, url, type: 'sketchfab' });
      } else if (item && typeof item === 'object' && item.url) {
        list.push({
          title: item.title || `${defaultTitle} ${idx + 1}`,
          url: item.url.trim(),
          type: item.type || 'sketchfab',
        });
      }
    });
  }

  return list;
}

export function formatVideosToText(videoUrls?: (string | { title?: string; url: string })[], singleUrl?: string): string {
  if (videoUrls && videoUrls.length > 0) {
    return videoUrls
      .map((v) => {
        if (typeof v === 'string') return v;
        if (v && v.url) {
          return v.title ? `${v.title} | ${v.url}` : v.url;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  }
  return singleUrl || '';
}

export function formatModelsToText(models3d?: { title?: string; url?: string }[], singleModel?: { title?: string; url?: string }): string {
  if (models3d && models3d.length > 0) {
    return models3d
      .map((m) => {
        if (m && m.url) {
          return m.title ? `${m.title} | ${m.url}` : m.url;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  }
  if (singleModel && singleModel.url) {
    return singleModel.title ? `${singleModel.title} | ${singleModel.url}` : singleModel.url;
  }
  return '';
}
