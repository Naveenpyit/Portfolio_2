export const PROFILE = {
  name: 'Naveenkumar M',
  email: 'naveenpyit@gmail.com',
  headline:
    'Full-Stack Developer specializing in React.js, Redux Toolkit, Tailwind CSS, and Django REST Framework — building scalable, secure, and user-friendly web applications.',
  roles: [
    'Full Stack Developer.',
    'Backend Developer.',
    'Web Developer.',
    'Frontend Developer.',
  ] as const,
  stats: [
    { label: 'Experience', value: '1.5+', suffix: ' yrs' },
    { label: 'Projects', value: '6+', suffix: '' },
    { label: 'Technologies', value: '6+', suffix: '' },
    { label: 'Frameworks', value: '2+', suffix: '' },
  ],
  about: `I am a passionate Full-stack developer with 1 year of experience building web applications using React.js and Redux for dynamic, scalable frontends. On the backend, I work with Django REST Framework and PostgreSQL to create robust APIs and manage data efficiently. I am proficient with Git and GitHub for collaboration. I enjoy transforming ideas into functional applications with clean, maintainable code and continuously explore new technologies.`,
}

export const NAV: { id: string, label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const SKILLS: { title: string; items: string[] }[] = [
  {
    title: 'Frontend',
    items: [
      'React (JS & TS)',
      'Redux / RTK / AsyncThunk',
      'Axios & RTK Query',
      'HTML, CSS, JavaScript',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Python',
      'Django & DRF',
      'JWT authentication',
      'FastAPI basics',
    ],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'MySQL (RDBMS)'],
  },
]

export const EXPERIENCE = [
  {
    title: 'Full Stack Developer',
    company: 'AV7 SCM',
    duration: '1.5+ years',
    role: 'Junior Associate',
    body: 'Worked as a Full Stack Developer, specialized in React.js and Django.',
  },
  {
    title: 'Frontend — React',
    company: '',
    duration: '',
    role: '',
    body: 'Dedicated Frontend Developer with React.js, Redux Toolkit, and Tailwind CSS. I build reusable components, manage complex state, and craft sleek interfaces with a focus on performance and pixel-perfect UI.',
  },
  {
    title: 'Backend — Python',
    company: '',
    duration: '',
    role: '',
    body: 'Backend developer building scalable REST APIs with Django REST Framework. Database design, secure auth, PostgreSQL & ORM, JWT, RBAC, and third-party integrations for production-ready systems.',
  },
] as const

export type ProjectItem = {
  title: string
  bullets: string[]
  stack: string
  url?: string
  status?: string
  image: string
}

export const PROJECTS: ProjectItem[] = [
  {
    title: 'Timechat Application',
    bullets: [
      'Visitor pass & appointment management: scheduling, invites, secure passes, smooth check-ins.',
      'Email confirmations and reminders for visitors and hosts.',
      'WhatsApp updates for confirmations, reminders, and real-time info.',
      'Microsoft Teams notifications for visits, cancellations, and updates.',
    ],
    stack: 'React, Tailwind CSS, Django, Python, REST API',
    url: 'https://timechat.theprocess.in/',
    image: '/projects/1.jpg',
  },
  {
    title: 'Bullion Application',
    bullets: [
      'Live Gold, Silver, and INR rates via Django REST API; React + Tailwind dashboard.',
      'Reusable UI for metals and forex; role-based access and auth.',
      'Responsive, mobile-friendly layouts.',
    ],
    stack: 'React, Tailwind CSS, Django, Python, REST API',
    url: 'http://www.shivamtraders.online/',
    image: '/projects/2.jpg',
  },
  {
    title: 'FootCourt Application',
    bullets: [
      'Food court management: ordering, billing, vendors, real-time updates.',
      'Scalable DRF APIs with PostgreSQL; menu, orders, and auth endpoints.',
      'Optimized queries for faster responses; integrates with React frontend.',
    ],
    stack: 'Django, Python, REST API',
    url: 'https://foodcourt.theprocess.in/',
    status: "Backend API's",
    image: '/projects/3.png',
  },
  {
    title: 'The Process',
    bullets: [
      'Internal hierarchy & products platform.',
      'DRF + PostgreSQL; role management and user authentication APIs.',
      'Optimized queries for performance.',
    ],
    stack: 'Django, Python, REST API',
    status: "API's only — no public URL",
    image: '/projects/4.png',
  },
  {
    title: 'PrimeStore Application',
    bullets: [
      'Marketplace with internal product hierarchy.',
      'DRF with Oracle; Redux state and RTK Query on the frontend.',
    ],
    stack: 'React, Tailwind CSS, Django, Python, REST API',
    url: 'http://marketplace.thescmsilk.com/',
    status: 'Internal project',
    image: '/projects/5.jpg',
  },
  {
    title: 'IHP — I Human Power',
    bullets: [
      'Full-stack job portal: React 19 + TS (Vite, Tailwind, Ant Design) and DRF + PostgreSQL.',
      'JWT cookie auth, FTP storage; Job Providers vs Job Seekers workflows.',
      'RTK Query, Zod + react-hook-form, field-map-driven forms; AI & KYC planned.',
    ],
    stack: 'React, Tailwind CSS, Django, Python, REST API',
    status: 'Currently under development',
    image: '/projects/6.jpg',
  },
]

export const socialUrls = () => ({
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/naveennk-fullstack-dev',
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Naveenpyit',
  whatsappE164: import.meta.env.VITE_WHATSAPP_E164 || '',
})
