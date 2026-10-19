import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Full-Stack Web (MERN)',
    description: 'Modern, accessible, performant frontend architectures paired with scalable backend services.',
    skills: [
      { name: 'React', level: 'Using' },
      { name: 'JavaScript (ES6+)', level: 'Using' },
      { name: 'TypeScript', level: 'Learning' },
      { name: 'Node.js', level: 'Using' },
      { name: 'Express.js', level: 'Using' },
      { name: 'MongoDB', level: 'Using' },
      { name: 'HTML5 Semantic', level: 'Using' },
      { name: 'Modern CSS3', level: 'Using' },
    ],
  },
  {
    title: 'Artificial Intelligence & Automation',
    description: 'Prompt engineering, intelligent agent workflows, and practical LLM integration for business tasks.',
    skills: [
      { name: 'Python', level: 'Using' },
      { name: 'AI Automation', level: 'Using' },
      { name: 'Prompt Engineering', level: 'Using' },
      { name: 'LLM APIs', level: 'Using' },
      { name: 'Generative AI', level: 'Using' },
      { name: 'Llama Models', level: 'Learning' },
      { name: 'Pandas', level: 'Using' },
      { name: 'Data Analytics with AI', level: 'Using' },
    ],
  },
  {
    title: 'Core CS',
    description: 'Production deployments, secure cloud architectures, and fundamental computer science discipline.',
    skills: [
      { name: 'Git & GitHub', level: 'Using' },
      { name: 'Operating Systems', level: 'Using' },
      { name: 'Computer Networking', level: 'Using' },
      { name: 'IAM Security & Auth', level: 'Using' },
      { name: 'AWS Cloud', level: 'Learning' },
      { name: 'Production Deployment', level: 'Learning' },
      { name: 'System Design', level: 'Learning' },
      { name: 'Linux CLI', level: 'Using' },
    ],
  },
];
