export interface Model3D {
  type: 'sketchfab' | 'glb' | 'iframe';
  url: string;
  title: string;
}

export interface SubProject {
  id: string;
  title: string;
  shortDescription?: string;
  description: string;
  model3d?: Model3D;
  models3d?: Model3D[];
  videoUrl?: string;
  galleryImages: string[];
  specs?: { label: string; value: string }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: '3D CAD & Printing' | 'Engineering Projects';
  heroImage: string;
  galleryImages: string[];
  tools: string[];
  model3d?: Model3D;
  models3d?: Model3D[];
  subProjects?: SubProject[]; // Sub-projects carousel with independent heading, 3D model, video & photos
  videoUrl?: string;
  videoUrls?: { title: string; url: string }[];
  externalUrl?: string;
  specs?: { label: string; value: string }[];
  featured: boolean;
  date: string;
  order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level?: string }[];
}

export interface ProfileData {
  name: string;
  title: string;
  subTitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  naukri: string;
  instagram: string;
  github: string;
  website?: string;
}
