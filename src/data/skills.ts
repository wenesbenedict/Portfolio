export type ArsenalDomainId =
  | 'ai-ml'
  | 'computer-vision'
  | 'agentic-ai'
  | 'full-stack'
  | 'backend-systems'
  | 'iot-embedded'

export interface ArsenalDomain {
  id: ArsenalDomainId
  index: string
  label: string
  shortLabel: string
}

export interface TechItem {
  id: string
  name: string
  domain: ArsenalDomainId
  role: string
  projectIds: string[]
}

export const arsenalDomains: ArsenalDomain[] = [
  { id: 'ai-ml', index: '01', label: 'AI & Machine Learning', shortLabel: 'AI & ML' },
  {
    id: 'computer-vision',
    index: '02',
    label: 'Computer Vision Engineering',
    shortLabel: 'Computer Vision',
  },
  { id: 'agentic-ai', index: '03', label: 'Agentic AI Engineering', shortLabel: 'Agentic AI' },
  { id: 'full-stack', index: '04', label: 'Full-Stack Engineering', shortLabel: 'Full-Stack' },
  {
    id: 'backend-systems',
    index: '05',
    label: 'Backend & Systems Engineering',
    shortLabel: 'Backend & Systems',
  },
  {
    id: 'iot-embedded',
    index: '06',
    label: 'IoT & Embedded Systems',
    shortLabel: 'IoT & Embedded',
  },
]

export const techItems: TechItem[] = [
  // 01 — AI & Machine Learning
  {
    id: 'python',
    name: 'Python',
    domain: 'ai-ml',
    role: 'Primary language for ML pipelines, computer vision inference, and FastAPI services.',
    projectIds: ['visionguard-ai', 'polargrid-ai', 'agricell-ai'],
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    domain: 'ai-ml',
    role: 'Deep learning execution and inference runtime behind VisionGuard detection.',
    projectIds: ['visionguard-ai'],
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    domain: 'ai-ml',
    role: 'Applied neural network experimentation in agricultural ML workflows.',
    projectIds: ['agricell-ai'],
  },
  {
    id: 'scikit-xgboost',
    name: 'Scikit-learn & XGBoost',
    domain: 'ai-ml',
    role: 'Tabular demand forecasting and predictive modeling for PolarGrid AI.',
    projectIds: ['polargrid-ai'],
  },
  {
    id: 'pandas',
    name: 'Pandas',
    domain: 'ai-ml',
    role: 'Time-series preprocessing and telemetry feature preparation.',
    projectIds: ['polargrid-ai'],
  },

  // 02 — Computer Vision Engineering
  {
    id: 'opencv',
    name: 'OpenCV',
    domain: 'computer-vision',
    role: 'Video frame ingestion, stream processing, and visual region overlays.',
    projectIds: ['visionguard-ai'],
  },
  {
    id: 'yolo',
    name: 'YOLO (Ultralytics)',
    domain: 'computer-vision',
    role: 'Object and PPE safety violation detection on uploaded and CCTV feeds.',
    projectIds: ['visionguard-ai'],
  },
  {
    id: 'bytetrack',
    name: 'ByteTrack',
    domain: 'computer-vision',
    role: 'Multi-object tracking across sequential video frames.',
    projectIds: ['visionguard-ai'],
  },

  // 03 — Agentic AI Engineering
  {
    id: 'llm-summarization',
    name: 'LLM Incident Summarization',
    domain: 'agentic-ai',
    role: 'Automated incident summary generation designed for VisionGuard AI Phase 3.',
    projectIds: ['visionguard-ai'],
  },
  {
    id: 'or-tools-cpsat',
    name: 'Constraint & Decision Orchestration (OR-Tools)',
    domain: 'agentic-ai',
    role: 'Coupling ML forecasts with CP-SAT constraint solvers for autonomous energy scheduling.',
    projectIds: ['polargrid-ai'],
  },

  // 04 — Full-Stack Engineering
  {
    id: 'react',
    name: 'React',
    domain: 'full-stack',
    role: 'Component-based dashboards, analytics views, and interactive web applications.',
    projectIds: ['visionguard-ai', 'task-tracker', 'polargrid-ai'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    domain: 'full-stack',
    role: 'Type-safe frontend state and API contract modeling.',
    projectIds: ['visionguard-ai'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    domain: 'full-stack',
    role: 'MERN application logic, DOM state, and interactive web interfaces.',
    projectIds: ['task-tracker', 'student-wellbeing'],
  },
  {
    id: 'nodejs-express',
    name: 'Node.js & Express',
    domain: 'full-stack',
    role: 'REST APIs, JWT authentication middleware, and server-side routing.',
    projectIds: ['task-tracker'],
  },
  {
    id: 'vite-tailwind',
    name: 'Vite & Tailwind CSS',
    domain: 'full-stack',
    role: 'Rapid frontend bundling and utility-driven responsive UI systems.',
    projectIds: ['visionguard-ai', 'task-tracker', 'polargrid-ai'],
  },

  // 05 — Backend & Systems Engineering
  {
    id: 'fastapi',
    name: 'FastAPI',
    domain: 'backend-systems',
    role: 'High-throughput Python REST APIs, Pydantic validation, and WebSocket streams.',
    projectIds: ['visionguard-ai', 'polargrid-ai'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    domain: 'backend-systems',
    role: 'Relational persistence for incident logs, station telemetry, and schedules.',
    projectIds: ['visionguard-ai', 'polargrid-ai'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB & Mongoose',
    domain: 'backend-systems',
    role: 'Document storage and schema modeling for authenticated task tracking.',
    projectIds: ['task-tracker'],
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    domain: 'backend-systems',
    role: 'Lightweight relational storage for internship prototypes.',
    projectIds: ['student-wellbeing'],
  },
  {
    id: 'docker',
    name: 'Docker Compose',
    domain: 'backend-systems',
    role: 'Multi-container orchestration across frontend, API, and database services.',
    projectIds: ['visionguard-ai', 'polargrid-ai'],
  },
  {
    id: 'websockets-rest',
    name: 'WebSockets & REST APIs',
    domain: 'backend-systems',
    role: 'Real-time alert delivery and structured client-server communication.',
    projectIds: ['visionguard-ai', 'task-tracker'],
  },

  // 06 — IoT & Embedded Systems
  {
    id: 'arduino',
    name: 'Arduino',
    domain: 'iot-embedded',
    role: 'Microcontroller prototyping and hardware I/O experimentation.',
    projectIds: ['iot-embedded'],
  },
  {
    id: 'c-cpp',
    name: 'C / C++',
    domain: 'iot-embedded',
    role: 'Embedded microcontroller firmware and low-level systems programming.',
    projectIds: ['iot-embedded'],
  },
  {
    id: 'sensors',
    name: 'Hardware Sensors & Serial',
    domain: 'iot-embedded',
    role: 'Analog/digital sensor reading, threshold checks, and serial monitoring.',
    projectIds: ['iot-embedded'],
  },
]

export const devEnvironmentTools = ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook']
