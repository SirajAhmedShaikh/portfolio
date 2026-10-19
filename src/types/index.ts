export interface SiteConfig {
  name: string;
  headline: string;
  email: string;
  socials: {
    linkedin: string;
    github: string;
    instagram: string;
  };
  roles: string[];
  valueProposition: string;
}

export type SkillLevel = 'Using' | 'Learning';

export interface SkillItem {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  status: 'Building' | 'Completed' | 'Concept';
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  alt?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  category: 'AI & ML' | 'Cloud & DevOps' | 'Core CS' | 'Professional Skills' | 'Cybersecurity';
  filePath: string;
  pages?: string[];
  description?: string;
}

export interface ExperienceItem {
  id: string;
  type: 'Internship' | 'Virtual Internship';
  role: string;
  organization: string;
  dates: string;
  duration?: string;
  bullets: string[];
  certificateFile?: string;
  verificationCode?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}
