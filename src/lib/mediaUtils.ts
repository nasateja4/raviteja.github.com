import { VideoItem, Model3D, Project, SubProject } from './types';

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

export interface SpotlightModelItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  tools: string[];
  slug: string;
  subProjectId?: string;
  type?: 'sketchfab' | 'glb' | 'iframe';
}

export function cleanTextSnippet(text?: string, maxLength: number = 240): string {
  if (!text) return '';
  const cleaned = text
    .replace(/#+\s*/g, '')
    .replace(/[*_`]/g, '')
    .replace(/\r?\n+/g, ' ')
    .trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).trim() + '...';
}

export const defaultSpotlightModels: SpotlightModelItem[] = [
  {
    id: 'rower-full',
    title: 'Autonomous Agricultural Rover (Rower)',
    subtitle: 'Agricultural Tool & High-Incline Towing Drivetrain',
    description: 'Custom autonomous agricultural rover assembly designed for K.I.T.E. Engineering College students. Engineered with mechanical calculations for heavy drawbar payload pulling and steep hill climb gradeability.',
    url: 'https://sketchfab.com/models/fd99e5beff4b4b15a7503bdb507d2df2/embed?autospin=1&autostart=1',
    tools: ['SolidWorks', 'Calculations', 'Chassis Design', '3D Printing'],
    slug: '3d-printing-modeling',
    subProjectId: 'agricultural-rover',
  },
  {
    id: 'rower-chassis',
    title: 'Agricultural Rover Structural Chassis',
    subtitle: 'Lightweight Terrain Clearance Frame',
    description: 'Chassis frame geometry engineered with mechanical stress analysis to ensure structural integrity and terrain clearance across irregular agricultural soil.',
    url: 'https://sketchfab.com/models/f9d694f2260c42a490f925d8bae35d0e/embed?autospin=1&autostart=1',
    tools: ['SolidWorks', 'FEA Structural', 'Sheet Metal'],
    slug: '3d-printing-modeling',
    subProjectId: 'agricultural-rover',
  },
  {
    id: 'smart-watch',
    title: 'Smart Health Tracking Watch (watch_2)',
    subtitle: 'Wearable ESP32-S3 Snap-Fit Housing',
    description: 'Compact wearable IoT watch enclosure designed with snap-fit joints, integrating ESP32-S3, MAX30102 pulse oximeter, and MPU6050 accelerometer.',
    url: 'https://sketchfab.com/models/462b5d8ede60480c998d240b1384288c/embed?autostart=1',
    tools: ['Fusion 360', 'UltiMaker Cura', 'Snap-Fit Enclosure', 'IoT Wearable'],
    slug: '3d-printing-modeling',
    subProjectId: 'smart-watch',
  },
  {
    id: 'cnc-z-axis',
    title: 'CNC Laser Z-Axis Upgrade Assembly',
    subtitle: 'Precision Depth Wood & Aluminum Milling',
    description: 'Rigid Z-axis gantry carriage accommodating a high-RPM spindle motor for 1mm per pass depth milling in hardwoods and soft aluminum.',
    url: 'https://sketchfab.com/models/ce1bf2b9e3c340c9a85c28e2003a8a75/embed?autospin=1&autostart=1',
    tools: ['Fusion 360', 'CNC Machining', 'Lead Screw Drive', 'GRBL'],
    slug: '3d-printing-modeling',
    subProjectId: 'cnc-laser-z-axis',
  },
  {
    id: 'rotating-bed',
    title: '3D Printed Concentric Rotating Display Bed',
    subtitle: '360° Motorized Turntable for Video & CAD',
    description: 'Concentric 360-degree rotating turntable bed designed in Fusion 360 for dynamic CAD model inspection and video recording.',
    url: 'https://sketchfab.com/models/f9a45683183e4bc3a382eedf9c332771/embed?autospin=1&autostart=1',
    tools: ['Fusion 360', 'FDM 3D Printing', 'Product Presentation'],
    slug: '3d-printing-modeling',
    subProjectId: 'rotating-display-bed',
  },
  {
    id: 'stepper-v7',
    title: 'Custom Stepper Motor v7 Robotic Housing',
    subtitle: '6-Axis Robotic Arm Joint Actuator',
    description: 'Tailored stepper motor outer housing and mounting flange designed in SolidWorks to guarantee structural alignment with robotic joint reducers.',
    url: 'https://sketchfab.com/models/099d6834458b4f1487ff29ad16225d22/embed?autospin=1&autostart=1',
    tools: ['SolidWorks', 'Robotics Kinematics', 'Actuator Enclosures'],
    slug: '3d-printing-modeling',
    subProjectId: 'custom-stepper-motor',
  },
];

export function extractSpotlightModels(projects: Project[]): SpotlightModelItem[] {
  if (!projects || projects.length === 0) {
    return defaultSpotlightModels;
  }

  const items: SpotlightModelItem[] = [];
  const seenUrls = new Set<string>();

  const normalizeUrlKey = (u: string) => {
    try {
      const parsed = new URL(u);
      return (parsed.origin + parsed.pathname).toLowerCase();
    } catch {
      return u.trim().toLowerCase();
    }
  };

  // Find 3D CAD & Printing container project (if exists)
  const cadContainer = projects.find(
    (p) => p.category === '3D CAD & Printing' || p.slug === '3d-printing-modeling'
  );

  // 1. Process 3D CAD container subprojects
  if (cadContainer && cadContainer.subProjects && cadContainer.subProjects.length > 0) {
    for (const sub of cadContainer.subProjects) {
      const subModels: Model3D[] = [];
      if (sub.models3d && sub.models3d.length > 0) {
        subModels.push(...sub.models3d);
      } else if (sub.model3d && sub.model3d.url) {
        subModels.push(sub.model3d);
      }

      subModels.forEach((m, idx) => {
        if (!m.url || !m.url.trim()) return;
        const key = normalizeUrlKey(m.url);
        if (seenUrls.has(key)) return;
        seenUrls.add(key);

        const subTitleClean = sub.title.replace(/^\d+[\.\)]\s*/, '').trim();
        const modelTitleClean = (m.title || '').replace(/^\d+[\.\)]\s*/, '').trim();
        const displayTitle =
          modelTitleClean && !modelTitleClean.startsWith('3D Part') && !modelTitleClean.startsWith('3D CAD')
            ? modelTitleClean
            : subTitleClean;

        const displaySubtitle =
          sub.shortDescription && sub.shortDescription.length < 80
            ? sub.shortDescription
            : subTitleClean !== displayTitle
            ? subTitleClean
            : 'Interactive 3D CAD Assembly';

        const displayDescription =
          cleanTextSnippet(sub.shortDescription) ||
          cleanTextSnippet(sub.description) ||
          'Detailed parametric CAD design, engineering analysis, and 3D printing specification.';

        const tools =
          sub.tools && sub.tools.length > 0
            ? sub.tools
            : cadContainer.tools || ['SolidWorks', 'Fusion 360', '3D Printing'];

        items.push({
          id: `sub-${sub.id}-${idx}`,
          title: displayTitle,
          subtitle: displaySubtitle,
          description: displayDescription,
          url: m.url,
          type: m.type || 'sketchfab',
          tools,
          slug: cadContainer.slug,
          subProjectId: sub.id,
        });
      });
    }
  }

  // 2. Process all projects (including Engineering Projects or any standalone/container-level models)
  for (const proj of projects) {
    const projModels: Model3D[] = [];
    if (proj.models3d && proj.models3d.length > 0) {
      projModels.push(...proj.models3d);
    } else if (proj.model3d && proj.model3d.url) {
      projModels.push(proj.model3d);
    }

    projModels.forEach((m, idx) => {
      if (!m.url || !m.url.trim()) return;
      const key = normalizeUrlKey(m.url);
      if (seenUrls.has(key)) return;
      seenUrls.add(key);

      const projTitleClean = proj.title.replace(/^\d+[\.\)]\s*/, '').trim();
      const modelTitleClean = (m.title || '').replace(/^\d+[\.\)]\s*/, '').trim();
      const displayTitle =
        modelTitleClean && !modelTitleClean.startsWith('3D Part')
          ? modelTitleClean
          : projTitleClean;

      const displaySubtitle =
        proj.shortDescription && proj.shortDescription.length < 80
          ? proj.shortDescription
          : proj.category;

      const displayDescription =
        cleanTextSnippet(proj.shortDescription) ||
        cleanTextSnippet(proj.fullDescription) ||
        'Interactive 3D CAD visualization inspectable in real-time WebGL.';

      items.push({
        id: `proj-${proj.id}-${idx}`,
        title: displayTitle,
        subtitle: displaySubtitle,
        description: displayDescription,
        url: m.url,
        type: m.type || 'sketchfab',
        tools: proj.tools && proj.tools.length > 0 ? proj.tools : ['CAD', 'Engineering'],
        slug: proj.slug,
      });
    });

    // Also check if any other project has subProjects with 3D models
    if (proj.id !== cadContainer?.id && proj.subProjects && proj.subProjects.length > 0) {
      for (const sub of proj.subProjects) {
        const subModels: Model3D[] = [];
        if (sub.models3d && sub.models3d.length > 0) {
          subModels.push(...sub.models3d);
        } else if (sub.model3d && sub.model3d.url) {
          subModels.push(sub.model3d);
        }

        subModels.forEach((m, idx) => {
          if (!m.url || !m.url.trim()) return;
          const key = normalizeUrlKey(m.url);
          if (seenUrls.has(key)) return;
          seenUrls.add(key);

          const subTitleClean = sub.title.replace(/^\d+[\.\)]\s*/, '').trim();
          const modelTitleClean = (m.title || '').replace(/^\d+[\.\)]\s*/, '').trim();
          const displayTitle =
            modelTitleClean && !modelTitleClean.startsWith('3D Part')
              ? modelTitleClean
              : subTitleClean;

          items.push({
            id: `sub-${sub.id}-${idx}`,
            title: displayTitle,
            subtitle: sub.shortDescription || proj.title,
            description: cleanTextSnippet(sub.description || sub.shortDescription || proj.shortDescription || ''),
            url: m.url,
            type: m.type || 'sketchfab',
            tools: sub.tools && sub.tools.length > 0 ? sub.tools : proj.tools || ['CAD'],
            slug: proj.slug,
            subProjectId: sub.id,
          });
        });
      }
    }
  }

  // If no models were found dynamically, return curated defaults
  if (items.length === 0) {
    return defaultSpotlightModels;
  }

  // Ensure Agricultural Rover (Rower) is at index 0 if present (matching user's preferred default)
  const roverIndex = items.findIndex(
    (item) =>
      item.title.toLowerCase().includes('rover') ||
      item.title.toLowerCase().includes('rower') ||
      item.id.toLowerCase().includes('rower') ||
      item.url.includes('fd99e5beff4b4b15a7503bdb507d2df2')
  );

  if (roverIndex > 0) {
    const [rover] = items.splice(roverIndex, 1);
    items.unshift(rover);
  }

  return items;
}
