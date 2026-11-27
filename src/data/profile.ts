export interface NavItem {
  id: string
  index: string
  label: string
}

export interface StoryPanel {
  index: string
  title: string
  description: string
  accent: 'red' | 'cyan' | 'violet'
}

export const navItems: NavItem[] = [
  { id: 'home', index: '01', label: 'Home' },
  { id: 'about', index: '02', label: 'About' },
  { id: 'arsenal', index: '03', label: 'Arsenal' },
  { id: 'projects', index: '04', label: 'Projects' },
  { id: 'journey', index: '05', label: 'Journey' },
  { id: 'contact', index: '06', label: 'Contact' },
]

export const profileData = {
  name: 'Wenes Benedict AC',
  monogram: 'WB',
  eyebrow: 'Computer Science • AI/ML • Computer Vision',
  roles: [
    'AI/ML & Computer Vision',
    'Full-Stack Engineering',
    'Practical Software Systems',
  ],
  heroIntro:
    'B.Tech Computer Science Engineering student building practical software across computer vision, machine learning, and full-stack web systems.',
  availability: 'Open to internships & engineering collaborations',
  location: 'India',
  education: 'B.Tech Computer Science Engineering (AI & ML)',
  email: 'wenesbenedict@gmail.com',
  githubUrl: 'https://github.com/wenesbenedict',
  githubHandle: 'github.com/wenesbenedict',
  linkedinUrl: 'https://www.linkedin.com/in/wenes-benedict/',
  linkedinHandle: 'linkedin.com/in/wenes-benedict',
}

export const aboutData = {
  statementLabel: 'Engineering Mindset',
  statementLead: 'Curiosity first.',
  statementHighlight: 'Build with purpose.',
  paragraphs: [
    "I'm a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning, focused on building practical software that bridges intelligent models and usable systems.",
    'My work spans computer vision pipelines, full-stack web applications, and embedded hardware experiments—driven by a preference for solving real problems over building isolated demos.',
  ],
  facts: [
    { label: 'Education', value: 'B.Tech CSE (AI & ML)' },
    { label: 'Location', value: 'India' },
    { label: 'Status', value: 'Open to internships & collaborations' },
  ],
  panels: [
    {
      index: 'A / BACKGROUND',
      title: 'Grounded in computer science',
      description:
        'Studying Computer Science Engineering with an AI/ML specialization, combining algorithmic fundamentals with modern software engineering.',
      accent: 'red',
    },
    {
      index: 'B / ENGINEERING APPROACH',
      title: 'Systems end-to-end',
      description:
        'From training and running YOLO/OpenCV inference to designing FastAPI backends, PostgreSQL schemas, and responsive React interfaces.',
      accent: 'cyan',
    },
    {
      index: 'C / TECHNICAL INTERESTS',
      title: 'Applied AI & Computer Vision',
      description:
        'Exploring real-time video analysis, predictive modeling, and practical full-stack tools that solve concrete everyday or industrial problems.',
      accent: 'violet',
    },
  ] satisfies StoryPanel[],
}
