export interface CertificationItem {
  id: string
  index: string
  code: string
  issuer: string
  title: string
  date: string
  accent: 'red' | 'cyan' | 'violet'
  verificationUrl?: string
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'html-essentials',
    index: '01',
    code: '<H>',
    issuer: 'Cisco Networking Academy',
    title: 'HTML Essentials',
    date: 'Completed 2026',
    accent: 'red',
  },
  {
    id: 'css-essentials',
    index: '02',
    code: '{CSS}',
    issuer: 'Cisco Networking Academy',
    title: 'CSS Essentials',
    date: 'Completed 2026',
    accent: 'cyan',
  },
  {
    id: 'cloud-digital-leader',
    index: '03',
    code: 'GCP',
    issuer: 'Google Cloud',
    title: 'Cloud Digital Leader',
    date: 'Completed 2026',
    accent: 'violet',
  },
]
