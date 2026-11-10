// ─────────────────────────────────────────────────────────────────────────────
// skills.js — edit your skills here
// ─────────────────────────────────────────────────────────────────────────────

// icon: key maps to react-icons in SkillOrb component
export const skillCategories = [
  {
    id:    'frontend',
    label: 'Frontend',
    color: '#06B6D4',
    skills: [
      { name: 'HTML5',      icon: 'html',       level: 95, color: '#E34F26' },
      { name: 'CSS3',       icon: 'css',        level: 90, color: '#1572B6' },
      { name: 'JavaScript', icon: 'js',         level: 85, color: '#F7DF1E' },
      { name: 'React',      icon: 'react',      level: 82, color: '#61DAFB' },
      { name: 'Tailwind',   icon: 'tailwind',   level: 88, color: '#06B6D4' },
      { name: 'Bootstrap',  icon: 'bootstrap',  level: 80, color: '#7952B3' },
    ],
  },
  {
    id:    'backend',
    label: 'Backend & CMS',
    color: '#A855F7',
    skills: [
      { name: 'C#',         icon: 'csharp',     level: 72, color: '#9B4F96' },
      { name: 'WordPress',  icon: 'wordpress',  level: 85, color: '#21759B' },
      { name: 'Shopify',    icon: 'shopify',    level: 78, color: '#96BF48' },
      { name: 'Node.js',    icon: 'node',       level: 70, color: '#339933' },
    ],
  },
  {
    id:    'tools',
    label: 'Tools & Others',
    color: '#6366F1',
    skills: [
      { name: 'Git',        icon: 'git',        level: 80, color: '#F05032' },
      { name: 'Figma',      icon: 'figma',      level: 75, color: '#F24E1E' },
      { name: 'VS Code',    icon: 'vscode',     level: 95, color: '#007ACC' },
      { name: 'AI/ML',      icon: 'ai',         level: 65, color: '#818CF8' },
    ],
  },
]

// flat list for the constellation view
export const allSkills = skillCategories.flatMap(c =>
  c.skills.map(s => ({ ...s, category: c.id, catColor: c.color }))
)
