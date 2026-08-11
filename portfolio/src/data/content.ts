export const PROFILE = {
  name: 'Naveenkumar M',
  email: 'naveenpyit@gmail.com',
  headline:
    'Product Engineer and AI-Native Web & Mobile App Developer specializing in React.js, React Native, Flutter, TypeScript, Django REST Framework, and modern state management with Redux Toolkit, RTK Query, and Riverpod. I build scalable, secure, and user-friendly applications from product requirements to production-ready solutions. Experienced with PostgreSQL and Supabase for reliable data management, along with Tailwind CSS for modern responsive interfaces. Passionate about Spec-Driven Development, AI-assisted workflows, clean architecture, and building products that solve real-world problems.',
  roles: [
    'AI Native Web & Mobile Developer.',
    'Full Stack Developer.',
    'Backend Developer.',
    'Web Developer.',
    'Frontend Developer.',
  ] as const,
  stats: [
    { label: 'Experience', value: '2', suffix: ' yrs' },
    { label: 'Projects', value: '6+', suffix: '' },
    { label: 'Technologies', value: '20+', suffix: '' },
    { label: 'Frameworks', value: '7+', suffix: '' },
  ],
  about: `I am a passionate Product Engineer and Full-Stack Web & Mobile Developer with hands-on experience building scalable, responsive, and production-ready applications. I specialize in React.js, React Native, Flutter, TypeScript, Django, Node.js, and modern state management solutions to develop high-quality web and mobile experiences.

On the backend, I work with Django REST Framework and Node.js to build robust APIs, business logic, authentication, and real-time application features. I have experience working with PostgreSQL, MySQL, and Supabase for database management, along with Supabase Realtime and WebSockets for real-time communication and chat applications.

I follow Spec-Driven Development (SDD) and Test-Driven Development (TDD) to build applications with clear requirements, maintainable architecture, reliable functionality, and better code quality. I use Git and GitHub for version control and collaborative development.

I enjoy transforming ideas and product requirements into functional, scalable applications while continuously exploring modern technologies, AI-native development workflows, and better engineering practices.
`,
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
      'React 19 (JS & TS)',
      'React Native',
      'Flutter (Dart)',
      'Redux Toolkit / AsyncThunk',
      'Riverpod',
      'RTK Query & Axios',
      'React Hook Form + Zod',
      'Tailwind CSS & Ant Design',
      'HTML, CSS, JavaScript',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Python',
      'Django & DRF',
      'REST API design',
      'JWT auth (cookie-based) & RBAC',
      'Email, WhatsApp & MS Teams integrations',
      'FTP file storage',
      'FastAPI basics',
    ],
  },
  {
    title: 'Database',
    items: [
      'PostgreSQL',
      'MySQL (RDBMS)',
      'Oracle',
      'Django ORM & schema design',
      'Query optimization',
    ],
  },
  {
    title: 'Tools & Practices',
    items: [
      'Git & GitHub',
      'Vite',
      'Reusable component architecture',
      'Responsive, mobile-first UI',
    ],
  },
]

export type ExperienceItem = {
  title: string
  company?: string
  duration?: string
  role?: string
  stack?: string
  domains?: string[]
  body: string
}

export type ExperienceGroup = {
  category: string
  summary: string
  items: ExperienceItem[]
}

export const EXPERIENCE: ExperienceGroup[] = [
  {
    category: 'Work Experience',
    summary: 'Full Stack Developer and Product Engineer — shipping across six business domains.',
    items: [
      {
        title: 'Product Engineer & Full Stack Developer',
        company: 'LINGAASYS TECHNOLOGY PRIVATE LIMITED',
        duration: '2+ years',
        role: 'Junior Associate',
        stack: 'React · TypeScript · Django · DRF · PostgreSQL',
        body: 'Own features end to end — requirements and specification, REST API and database design, frontend implementation, and release — across internal platforms and client-facing products. Full stack on the build, product engineer on the decisions: scope, edge cases, and trade-offs get settled against what the user is actually trying to do, not just against the ticket.',
        domains: [
          'Visitor & Appointment Management',
          'Bullion & Commodity Trading',
          'Food & Beverage POS',
          'Internal Ops & Hierarchy',
          'E-Commerce Marketplace',
          'HR Tech / Job Portal',
        ],
      },
    ],
  },
  {
    category: 'Frontend',
    summary: 'Web and mobile interfaces, shared state patterns, one design language.',
    items: [
      {
        title: 'React & TypeScript',
        stack: 'React 19 · TypeScript · Redux Toolkit · RTK Query',
        body: 'Build production React 19 applications in TypeScript with Redux Toolkit and RTK Query. Focus on reusable component architecture, predictable state, and typed API layers — field-map-driven forms with React Hook Form and Zod, Ant Design and Tailwind CSS for responsive, mobile-first interfaces, and performance-conscious rendering.',
      },
      {
        title: 'React Native',
        stack: 'React Native · Redux Toolkit · AsyncThunk',
        body: 'Ship cross-platform mobile apps from a single React Native codebase, sharing state patterns and API contracts with the web. Redux Toolkit and AsyncThunk for state and side effects, with navigation, secure token storage, and data flows that hold up on unreliable networks.',
      },
      {
        title: 'Flutter (Dart)',
        stack: 'Flutter · Dart · Riverpod',
        body: 'Build Flutter applications using Riverpod for state management — scoped providers, async data handling, and clean separation between UI, domain, and data layers. Widget composition keeps the design system consistent across Android and iOS.',
      },
    ],
  },
  {
    category: 'Backend',
    summary: 'APIs, authentication, and integrations built to survive production.',
    items: [
      {
        title: 'Django & Django REST Framework',
        stack: 'Python · Django · DRF · JWT · RBAC',
        body: 'Design and build REST APIs with Django REST Framework: model and schema design, serializers, viewsets, permission classes, and cookie-based JWT authentication with role-based access control. Integrations for Email, WhatsApp, and Microsoft Teams, FTP file storage, and query optimization for production traffic.',
      },
      {
        title: 'Node.js, TypeScript & Deno',
        stack: 'Node.js · TypeScript · Deno · WebSockets',
        body: 'Build typed backend services in TypeScript across Node.js and Deno — REST endpoints, authentication middleware, and real-time features over WebSockets. Deno for its secure-by-default runtime, first-class TypeScript, and built-in tooling on lightweight services.',
      },
    ],
  },
  {
    category: 'Database',
    summary: 'Schema design first, query optimization second, guesswork never.',
    items: [
      {
        title: 'PostgreSQL, MySQL & Oracle',
        stack: 'PostgreSQL · MySQL · Oracle · Django ORM',
        body: 'Model and operate relational data: schema design, indexing, constraints, and migrations across PostgreSQL, MySQL, and Oracle. Query optimization through the Django ORM, and raw SQL where it earns its place.',
      },
      {
        title: 'Supabase',
        stack: 'Supabase · Postgres · Realtime · Row Level Security',
        body: 'Managed Postgres with authentication, storage, and Realtime subscriptions — the backbone for live chat and presence features, with row-level security policies keeping data access scoped to the right user.',
      },
    ],
  },
  {
    category: 'Engineering Practice',
    summary: 'How the work gets decided before a single line is written.',
    items: [
      {
        title: 'Spec-Driven Development (SDD)',
        stack: 'Specification-first · AI-assisted workflows',
        body: 'Work specification-first: turn product requirements into a written spec before any code, then use AI-assisted workflows to implement against it. The spec stays the source of truth, so scope, edge cases, and acceptance criteria are settled before implementation starts.',
      },
      {
        title: 'Test-Driven Development (TDD)',
        stack: 'Tests first · Safe refactors · Regression cover',
        body: 'Write the tests that define behaviour before the code that satisfies them. This locks intent in early, keeps refactors safe, and catches regressions before release rather than after.',
      },
      {
        title: 'Product Thinking',
        stack: 'User perspective · Scalable · Secure',
        body: "Every decision gets judged from the user's perspective — what they are actually trying to do, and what gets in their way. The goal is applications that are scalable, secure, and genuinely good to use, not just feature-complete.",
      },
    ],
  },
]

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

export type CodeToken = { text: string; kind?: 'kw' | 'prop' | 'str' | 'punc' }

/** Hero code card. Every value restates something already claimed above — the
    stack from SKILLS, the practice from EXPERIENCE — so it stays decorative
    without asserting anything new.

    Keep every line under ~27 characters. The card renders `whitespace-pre` to
    hold the code shape, so a longer line does not wrap — it runs past the card
    border and over the portrait behind it. */
export const CODE_LINES: CodeToken[][] = [
  [
    { text: 'class ', kind: 'kw' },
    { text: 'Developer' },
    { text: ' {', kind: 'punc' },
  ],
  [
    { text: '  frontend', kind: 'prop' },
    { text: ' = ', kind: 'punc' },
    { text: "'React · TS '", kind: 'str' },
  ],
  [
    { text: '  backend', kind: 'prop' },
    { text: '  = ', kind: 'punc' },
    { text: "'Django · DRF'", kind: 'str' },
  ],
  [
    { text: '  practice', kind: 'prop' },
    { text: ' = ', kind: 'punc' },
    { text: "'Spec-Driven'", kind: 'str' },
  ],
  [{ text: '}', kind: 'punc' }],
]

export const socialUrls = () => ({
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/naveennk-fullstack-dev',
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Naveenpyit',
  whatsappE164: import.meta.env.VITE_WHATSAPP_E164 || '',
})
