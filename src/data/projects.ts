export interface ArchitectureNode {
  id: string
  label: string
  sublabel: string
  accent: 'red' | 'cyan' | 'violet'
}

export interface ProjectScreenshot {
  title: string
  url: string
}

export interface ProjectItem {
  id: string
  index: string
  title: string
  category: string
  status: string
  statusTone: 'paused' | 'completed' | 'active' | 'prototype'
  featured?: boolean
  accent: 'red' | 'cyan' | 'violet'
  summary: string
  problemStatement: string
  overview: string
  stack: string[]
  features: string[]
  architecture: ArchitectureNode[]
  screenshots?: ProjectScreenshot[]
  githubUrl?: string
}

export const projectsData: ProjectItem[] = [
  {
    id: 'visionguard-ai',
    index: '01',
    title: 'VisionGuard AI',
    category: 'Computer Vision & Safety Platform',
    status: 'Paused — MVP Architecture',
    statusTone: 'paused',
    featured: true,
    accent: 'red',
    summary:
      'AI-powered computer vision platform designed to monitor workplace video feeds and identify potential safety violations and hazardous incidents.',
    problemStatement:
      'Manual CCTV monitoring across industrial or workplace environments misses real-time PPE violations and hazardous events, creating delayed incident response.',
    overview:
      'Built as a multi-service platform combining YOLO-based object detection and ByteTrack tracking in Python with a FastAPI backend, PostgreSQL incident storage, WebSocket alerts, and a React + TypeScript dashboard. Currently paused after MVP and Phase 2/3 architectural work.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'FastAPI',
      'YOLO (Ultralytics)',
      'OpenCV',
      'PyTorch',
      'ByteTrack',
      'PostgreSQL',
      'WebSockets',
      'Docker Compose',
    ],
    features: [
      'Video upload and frame-by-frame YOLO detection pipeline',
      'PPE compliance violation detection and incident logging',
      'Multi-object tracking with ByteTrack and restricted zone checks',
      'Real-time WebSocket alert streaming to a React analytics dashboard',
      'Containerized multi-service setup with Docker Compose',
    ],
    architecture: [
      { id: 'input', label: 'Video / CCTV Feed', sublabel: 'OpenCV Stream', accent: 'cyan' },
      { id: 'cv', label: 'Detection Engine', sublabel: 'YOLO + ByteTrack', accent: 'red' },
      { id: 'api', label: 'FastAPI Service', sublabel: 'REST + WebSockets', accent: 'violet' },
      { id: 'db', label: 'PostgreSQL', sublabel: 'Incident Store', accent: 'cyan' },
      { id: 'ui', label: 'React Dashboard', sublabel: 'Alerts & Analytics', accent: 'red' },
    ],
    githubUrl: 'https://github.com/wenesbenedict/VisionGuard',
  },
  {
    id: 'task-tracker',
    index: '02',
    title: 'Task-Tracker',
    category: 'Full-Stack MERN Internship Project',
    status: 'Completed — Internship',
    statusTone: 'completed',
    featured: true,
    accent: 'cyan',
    summary:
      'MERN stack task management application with JWT authentication, task lifecycle states, history tracking, and MongoDB Atlas persistence.',
    problemStatement:
      'Teams and individuals need a straightforward, authenticated workspace to create, track, and audit completed or failed tasks across sessions.',
    overview:
      'Developed as an internship project using React + Vite on the frontend and Node.js + Express + MongoDB Atlas on the backend, featuring JWT-secured routes, task status transitions, history logs, and user profile settings.',
    stack: ['React', 'Vite', 'CSS', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'JWT'],
    features: [
      'JWT-based user registration, login, and protected routes',
      'Create, edit, delete, and mark tasks as completed or failed',
      'Dedicated Task History view for tracking past activity',
      'User Profile Settings page backed by MongoDB Atlas',
    ],
    architecture: [
      { id: 'client', label: 'React + Vite UI', sublabel: 'Dashboard & History', accent: 'cyan' },
      { id: 'auth', label: 'JWT Middleware', sublabel: 'Token Auth', accent: 'red' },
      { id: 'server', label: 'Express.js API', sublabel: 'Node.js REST', accent: 'violet' },
      { id: 'mongo', label: 'MongoDB Atlas', sublabel: 'Mongoose ODM', accent: 'cyan' },
    ],
    screenshots: [
      {
        title: 'Dashboard',
        url: 'https://raw.githubusercontent.com/wenesbenedict/Task-Tracker/main/assets/Dashboard.png',
      },
      {
        title: 'Login Page',
        url: 'https://raw.githubusercontent.com/wenesbenedict/Task-Tracker/main/assets/LoginPage.png',
      },
      {
        title: 'History Page',
        url: 'https://raw.githubusercontent.com/wenesbenedict/Task-Tracker/main/assets/HistoryPage.png',
      },
      {
        title: 'Settings Page',
        url: 'https://raw.githubusercontent.com/wenesbenedict/Task-Tracker/main/assets/SettingsPage.png',
      },
    ],
    githubUrl: 'https://github.com/wenesbenedict/Task-Tracker',
  },
  {
    id: 'polargrid-ai',
    index: '03',
    title: 'PolarGrid AI',
    category: 'AI & Optimization System',
    status: 'Prototype',
    statusTone: 'active',
    accent: 'violet',
    summary:
      'AI-driven smart energy management system for polar research stations combining ML forecasting with constraint optimization.',
    problemStatement:
      'Remote polar research stations operate under extreme weather and limited energy budgets, requiring accurate demand forecasting and optimal power scheduling.',
    overview:
      'Combines Pandas, Scikit-learn, and XGBoost for predictive modeling with Google OR-Tools (CP-SAT) for constraint-based energy scheduling, served via FastAPI and PostgreSQL to a React + Vite interface.',
    stack: [
      'React',
      'Vite',
      'Python',
      'FastAPI',
      'Pandas',
      'Scikit-learn',
      'XGBoost',
      'Google OR-Tools',
      'PostgreSQL',
      'Docker Compose',
    ],
    features: [
      'ML load and generation forecasting with Scikit-learn and XGBoost',
      'Constraint-based energy scheduling via Google OR-Tools (CP-SAT)',
      'FastAPI backend with interactive Swagger/OpenAPI docs',
      'Docker Compose orchestration with PostgreSQL persistence',
    ],
    architecture: [
      { id: 'data', label: 'Station Telemetry', sublabel: 'Pandas Pipeline', accent: 'cyan' },
      { id: 'ml', label: 'ML Forecaster', sublabel: 'XGBoost / Sklearn', accent: 'violet' },
      { id: 'opt', label: 'CP-SAT Solver', sublabel: 'Google OR-Tools', accent: 'red' },
      { id: 'api', label: 'FastAPI + UI', sublabel: 'React + PostgreSQL', accent: 'cyan' },
    ],
    githubUrl: 'https://github.com/wenesbenedict/PolarGridAI',
  },
  {
    id: 'agricell-ai',
    index: '04',
    title: 'AgriCell AI',
    category: 'Smart India Hackathon (SIH)',
    status: 'SIH Project',
    statusTone: 'prototype',
    accent: 'cyan',
    summary:
      'AI-powered agricultural support project developed for Smart India Hackathon (SIH) to assist decision-making with applied machine learning.',
    problemStatement:
      'Agricultural workflows often lack accessible, data-backed diagnostic and decision-support tools tailored for practical field constraints.',
    overview:
      'Developed as part of Smart India Hackathon (SIH) participation, focusing on applying Python and ML techniques to agricultural problem statements.',
    stack: ['Python', 'TensorFlow', 'AI / Machine Learning'],
    features: [
      'Developed collaboratively for Smart India Hackathon (SIH)',
      'Applied machine learning workflow for agricultural analysis',
    ],
    architecture: [
      { id: 'input', label: 'Field Inputs', sublabel: 'Agricultural Data', accent: 'cyan' },
      { id: 'model', label: 'ML Inference', sublabel: 'Python / TensorFlow', accent: 'violet' },
      { id: 'output', label: 'Actionable Output', sublabel: 'Decision Support', accent: 'red' },
    ],
  },
  {
    id: 'student-wellbeing',
    index: '05',
    title: 'Student Wellbeing & Performance Tracker',
    category: 'Internship Project',
    status: 'Internship',
    statusTone: 'completed',
    accent: 'red',
    summary:
      'Internship software project focused on monitoring student wellbeing indicators alongside academic performance.',
    problemStatement:
      'Academic institutions need unified ways to observe student wellbeing trends alongside performance metrics rather than treating them in isolation.',
    overview:
      'Built during an internship to track and organize student wellbeing and performance records with a structured web interface and local/relational persistence.',
    stack: ['JavaScript', 'HTML', 'CSS', 'SQLite'],
    features: [
      'Structured tracking of student wellbeing and performance inputs',
      'Clean web interface built for clarity and usability',
    ],
    architecture: [
      { id: 'form', label: 'Student Inputs', sublabel: 'Wellbeing & Metrics', accent: 'red' },
      { id: 'logic', label: 'Application Logic', sublabel: 'JavaScript', accent: 'cyan' },
      { id: 'store', label: 'Data Store', sublabel: 'SQLite', accent: 'violet' },
    ],
  },
  {
    id: 'iot-embedded',
    index: '06',
    title: 'IoT & Embedded Systems',
    category: 'Hardware & Sensor Experiments',
    status: 'Ongoing Experiments',
    statusTone: 'prototype',
    accent: 'violet',
    summary:
      'Hands-on Arduino-based sensor interfacing and hardware monitoring experiments exploring physical computing.',
    problemStatement:
      'Bridging software logic with physical environments requires understanding microcontroller I/O, sensor calibration, and reliable serial telemetry.',
    overview:
      'A collection of Arduino-based embedded experiments focused on reading environmental sensors, processing signals in C/C++, and monitoring hardware states.',
    stack: ['Arduino', 'C / C++', 'Sensors', 'Serial Monitoring'],
    features: [
      'Microcontroller sensor reading and threshold monitoring',
      'Hands-on hardware prototyping and serial data observation',
    ],
    architecture: [
      { id: 'sensors', label: 'Physical Sensors', sublabel: 'Analog / Digital I/O', accent: 'violet' },
      { id: 'mcu', label: 'Arduino MCU', sublabel: 'Embedded C/C++', accent: 'red' },
      { id: 'mon', label: 'Serial Telemetry', sublabel: 'Monitoring Output', accent: 'cyan' },
    ],
  },
]
