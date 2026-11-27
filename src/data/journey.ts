export interface JourneyEntry {
  id: string
  type: string
  period?: string
  title: string
  description: string
  accent: 'red' | 'cyan' | 'violet'
}

export const journeyData: JourneyEntry[] = [
  {
    id: 'education',
    type: 'EDUCATION',
    title: 'B.Tech Computer Science Engineering (AI & ML)',
    description:
      'Pursuing undergraduate studies in Computer Science Engineering with an Artificial Intelligence and Machine Learning specialization.',
    accent: 'red',
  },
  {
    id: 'internship',
    type: 'INTERNSHIP EXPERIENCE',
    title: 'Full-Stack & Application Development',
    description:
      'Built the MERN Stack Task-Tracker application with JWT authentication and MongoDB Atlas, as well as the Student Wellbeing and Performance Tracker.',
    accent: 'cyan',
  },
  {
    id: 'hackathon',
    type: 'HACKATHON // SIH',
    title: 'Smart India Hackathon — AgriCell AI',
    description:
      'Collaborated on AgriCell AI, an AI-powered agricultural solution developed for Smart India Hackathon (SIH).',
    accent: 'violet',
  },
  {
    id: 'certifications-2026',
    type: 'CERTIFICATIONS',
    period: '2026',
    title: 'Web & Cloud Foundations',
    description:
      'Completed HTML Essentials and CSS Essentials from Cisco Networking Academy, and Cloud Digital Leader from Google Cloud.',
    accent: 'cyan',
  },
]
