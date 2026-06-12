import type { Locale } from './config'

export interface Dictionary {
  meta: { title: string; description: string; keywords: string[] }
  nav: {
    home: string
    services: string
    work: string
    process: string
    about: string
    contact: string
    blog: string
    tools: string
  }
  hero: {
    eyebrow: string
    line1: string
    line2: string
    line3: string
    subtitle: string
    ctaWork: string
    ctaContact: string
    scroll: string
  }
  services: {
    metaTitle: string
    metaDescription: string
    statementHeading: string
    statementBody: string
    stack: string[]
    eyebrow: string
    headingTop: string
    headingAccent: string
    intro: string
    items: { title: string; description: string }[]
    howWeWorkHeading: string
    faqHeading: string
    faq: { q: string; a: string }[]
    techHeading: string
    techGroups: { category: string; items: string[] }[]
  }
  process: {
    eyebrow: string
    headingTop: string
    headingAccent: string
    intro: string
    durationLabel: string
    steps: { title: string; tagline: string; description: string; duration: string }[]
  }
  portfolio: {
    metaTitle: string
    metaDescription: string
    eyebrow: string
    headingTop: string
    headingAccent: string
    ctaText: string
    ctaLink: string
    viewProject: string
    scroll: string
    all: string
    detailHeading: string
    clientLabel: string
    roleLabel: string
    challengeLabel: string
    resultLabel: string
  }
  about: {
    metaTitle: string
    metaDescription: string
    eyebrow: string
    title: string
    statement: string
    intro: string
    pillars: { title: string; description: string }[]
    headingTop: string
    headingAccent: string
    p1: string
    p2: string
    location: string
    founded: string
    teamHeading: string
    valuesHeading: string
    values: { title: string; description: string }[]
  }
  contact: {
    eyebrow: string
    headingTop: string
    headingAccent: string
    intro: string
    location: string
    nameLabel: string
    emailLabel: string
    messageLabel: string
    ctaProject: string
    phoneLabel: string
    phoneValue: string
    addressLabel: string
    send: string
    sending: string
    errorTitle: string
    errorText: string
    errorMailto: string
    successTitle: string
    successText: string
    consentText: string
    consentLink: string
  }
  footer: {
    tagline: string
    barcelonaTime: string
    rights: string
    privacy: string
    terms: string
    legalNotice: string
    cookies: string
    navHeading: string
    socialHeading: string
    legalHeading: string
  }
  blog: {
    title: string
    backHome: string
    intro: string
    aiDisclosure: string
    minRead: string
    comingSoon: string
    backToBlog: string
    cta: string
    sources: string
    featured: string
    readArticle: string
  }
  legal: {
    backHome: string
    lastUpdated: string
    moreDocuments: string
  }
  stats: { heading: string }
  viewMore: string
}

const en: Dictionary = {
  meta: {
    title: 'V13 Studio | Software Development & Digital Product Studio',
    description:
      'Independent software studio in Catalonia, Spain. We design and build web apps, mobile apps and backends, from the first idea to production.',
    keywords: [
      'software development studio',
      'web development',
      'mobile app development',
      'React Native development',
      'Next.js development',
      'UX/UI design',
      'product strategy',
      'backend engineering',
      'AI integration',
      'software studio Spain',
      'Catalonia',
      'Tarragona',
    ],
  },
  nav: {
    home: 'Home',
    services: 'Services',
    work: 'Work',
    process: 'Process',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
    tools: 'Tools',
  },
  hero: {
    eyebrow: 'V13 Studio',
    line1: 'BUILD',
    line2: 'BEYOND',
    line3: 'ORDINARY',
    subtitle: 'Software products designed, built and shipped end to end',
    ctaWork: 'View Work',
    ctaContact: 'Start Project',
    scroll: 'Scroll to Explore',
  },
  services: {
    metaTitle: 'Software Development Services',
    metaDescription:
      'Product strategy, UX/UI design, web and mobile development, backend engineering and AI integration. One senior team from first sketch to production.',
    statementHeading: 'What we do.',
    statementBody:
      'We design and build software end to end: frontend, backend, cloud and DevOps. Solid architecture underneath, careful product work on top.',
    stack: ['React', 'Node.js', 'Python', 'AWS', 'Azure', 'Docker', 'Kubernetes'],
    eyebrow: 'Capabilities',
    headingTop: 'Full-stack',
    headingAccent: 'capabilities',
    intro:
      'From first sketch to production: strategy, design, web and mobile development, backend and AI. This is what we do every day.',
    items: [
      {
        title: 'Product Strategy',
        description:
          'We start with questions, not code: who is this for, what should it do first, what can wait. You leave with a roadmap you can actually follow.',
      },
      {
        title: 'UX/UI Design',
        description:
          'Interfaces people understand the first time they open them. We prototype early and test real flows, so what you approve is what ships.',
      },
      {
        title: 'Mobile Development',
        description:
          'iOS and Android apps from one React Native codebase. Faster releases and less maintenance, without giving up the native feel.',
      },
      {
        title: 'Web Development',
        description:
          'Websites and web apps built with React and Next.js. Quick to load, accessible by default and easy to maintain once we hand over the keys.',
      },
      {
        title: 'Backend Engineering',
        description:
          'APIs, data models and infrastructure with Node.js and PostgreSQL. Built to hold up when traffic grows, and instrumented so you know what is going on.',
      },
      {
        title: 'AI Integration',
        description:
          'Assistants, search and automation built on Claude and OpenAI models. We pick the reliable option over the demo that breaks on Monday.',
      },
    ],
    howWeWorkHeading: 'How we work',
    faqHeading: 'Frequently asked questions',
    faq: [
      {
        q: 'How long does a typical project take?',
        a: 'It depends on scope, but most products run 8–16 weeks from concept to launch: 1–2 weeks of strategy, 2–4 weeks of design and architecture, then iterative build sprints. We agree a timeline before we start.',
      },
      {
        q: 'How do you price engagements?',
        a: 'Fixed scope for well-defined projects, or a monthly rate for ongoing product work. We share an estimate after the first strategy conversation — no surprises later.',
      },
      {
        q: 'Can you work with our existing team or codebase?',
        a: 'Yes. We regularly join in-house teams or pick up existing codebases, review the architecture, and ship alongside your engineers.',
      },
      {
        q: 'What happens after launch?',
        a: 'We stay on for monitoring, iteration, and growth work. A launch is a starting point, not a hand-off.',
      },
    ],
    techHeading: 'Technologies we use',
    techGroups: [
      { category: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
      { category: 'Frontend', items: ['React', 'Angular', 'Next.js', 'Astro', 'Tailwind CSS', 'Material UI', 'react-router-dom', 'TanStack Query', 'Zustand', 'MobX', 'Framer Motion', 'i18next'] },
      { category: 'Mobile', items: ['React Native', 'Expo'] },
      { category: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Zod', 'Swagger'] },
      { category: 'Data & Storage', items: ['PostgreSQL', 'Redis', 'Prisma', 'Drizzle ORM', 'Supabase', 'Firebase', 'AWS S3'] },
      { category: 'DevOps & CI/CD', items: ['Vercel', 'Railway', 'Cloudflare DNS', 'GitHub Actions', 'ESLint', 'Prettier'] },
      { category: 'Testing', items: ['Jest', 'Vitest', 'Playwright'] },
      { category: 'Observability & APIs', items: ['Sentry', 'PostHog', 'Grafana Cloud', 'Pino', 'Resend'] },
      { category: 'AI', items: ['Anthropic API', 'Claude Agent SDK', 'OpenAI API'] },
    ],
  },
  process: {
    eyebrow: 'How we work',
    headingTop: 'Our',
    headingAccent: 'process',
    intro:
      'Four phases with clear deliverables. This is how a project moves from idea to production, and what you get at each step.',
    durationLabel: 'Duration',
    steps: [
      {
        title: 'Concept',
        tagline: 'Blueprint & Strategy',
        description:
          'We map what you want to build and why: users, market, scope. One or two intense weeks that save months later.',
        duration: '1-2 weeks',
      },
      {
        title: 'Architecture',
        tagline: 'Technical Design',
        description:
          'We decide how it will work before building it: data model, APIs, screens. Wireframes turn into prototypes, decisions into a build plan.',
        duration: '2-4 weeks',
      },
      {
        title: 'Development Sprint',
        tagline: 'Iterative Building',
        description:
          'We build in short sprints, and every sprint ends with something you can click. Web, mobile and backend move forward together.',
        duration: '6-12 weeks',
      },
      {
        title: 'Launch',
        tagline: 'Deployment & Growth',
        description:
          'We ship, watch the numbers and keep iterating. Launch is the start of the conversation, not the end of the project.',
        duration: 'Ongoing',
      },
    ],
  },
  portfolio: {
    metaTitle: 'Projects & Selected Work',
    metaDescription:
      'Selected software projects by V13 Studio: web platforms, mobile apps and backend systems, with the challenge and the result behind each one.',
    eyebrow: 'Selected Work',
    headingTop: 'Projects',
    headingAccent: 'push boundaries',
    ctaText: 'Want to see more?',
    ctaLink: "Let's talk",
    viewProject: 'View Project',
    scroll: 'Scroll to Explore',
    all: 'All',
    detailHeading: 'Project details',
    clientLabel: 'Client',
    roleLabel: 'Role',
    challengeLabel: 'Challenge',
    resultLabel: 'Result',
  },
  about: {
    metaTitle: 'About the Studio',
    metaDescription:
      'V13 Studio is a four-person software studio in Catalonia, Spain. Strategy, design, development and launch, all under one roof.',
    eyebrow: 'About us',
    title: 'About',
    statement: 'Four people, one studio. We design, build and ship software products end to end.',
    intro:
      'V13 Studio is a four-person software studio in Catalonia, Spain. We take products from idea to production: strategy, design, development and launch, all under one roof.',
    pillars: [
      {
        title: 'Strategy',
        description: 'We help you decide what to build and in what order, so the budget goes to the features that matter.',
      },
      {
        title: 'Design',
        description: 'Interface and experience design that makes complex things feel simple, on the first use and on the hundredth.',
      },
      {
        title: 'Engineering',
        description: 'Architecture and code meant to last: tested, documented and ready to grow when your product does.',
      },
    ],
    headingTop: 'Small team.',
    headingAccent: 'Big impact.',
    p1: "We're a 4-person studio based in Catalonia, Spain. We build digital products with the precision of an agency and the soul of a startup.",
    p2: 'No bloated teams. No endless meetings. Just focused execution from people who genuinely care about the outcome.',
    location: 'CATALONIA, SPAIN',
    founded: 'Founded',
    teamHeading: 'The team',
    valuesHeading: 'What we value',
    values: [
      {
        title: 'Craft',
        description:
          'The details people feel but rarely name: type that breathes, screens that respond instantly, code that is still readable a year later. That is where we spend the extra hour.',
      },
      {
        title: 'Ownership',
        description:
          'Your product is not a ticket queue to us. We flag risks early, suggest cheaper paths when they exist, and answer for what we ship.',
      },
      {
        title: 'Honesty',
        description:
          'If something will not work, we say so before it costs you money. Straight answers about scope, deadlines and trade-offs, even when they are not what you hoped to hear.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    headingTop: "Let's build",
    headingAccent: 'something great',
    intro:
      'Have a project in mind? Tell us about it. A person, not a bot, reads every message and gets back to you within 24 hours.',
    location: 'Roquetes 43520, Tarragona, Spain',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    ctaProject: 'Start a Project',
    phoneLabel: 'Tel',
    phoneValue: '+34 650 851 990',
    addressLabel: 'Address',
    send: 'Send Message',
    sending: 'Sending…',
    errorTitle: 'Something went wrong',
    errorText: 'Your message could not be sent. Please try again, or email us directly at',
    errorMailto: 'v13studio@v13studio.com',
    successTitle: 'Message sent!',
    successText: "We'll get back to you within 24 hours.",
    consentText: 'I have read and accept the',
    consentLink: 'Privacy Policy',
  },
  footer: {
    tagline:
      'Software product studio in Catalonia, Spain. We design, build and ship web, mobile and backend products.',
    barcelonaTime: 'Barcelona Time',
    rights: 'V13 Studio. All rights reserved.',
    privacy: 'Privacy',
    terms: 'Terms',
    legalNotice: 'Legal Notice',
    cookies: 'Cookies',
    navHeading: 'Navigation',
    socialHeading: 'Social',
    legalHeading: 'Legal',
  },
  blog: {
    title: 'Journal',
    backHome: 'V13 Studio',
    intro:
      'Daily news on software and AI: releases, models and tools that change how products get built.',
    aiDisclosure: 'AI-generated, reviewed by the V13 Studio team',
    minRead: 'min read',
    comingSoon: 'New articles coming soon.',
    backToBlog: 'Blog',
    cta: 'Start a project with V13 Studio',
    sources: 'Sources',
    featured: 'Featured',
    readArticle: 'Read article',
  },
  legal: {
    backHome: '← V13 STUDIO',
    lastUpdated: 'Last updated',
    moreDocuments: 'More documents',
  },
  stats: { heading: 'By the numbers' },
  viewMore: 'View more',
}

const es: Dictionary = {
  meta: {
    title: 'V13 Studio | Desarrollo de Software y Producto Digital',
    description:
      'Estudio de software independiente en Cataluña. Diseñamos y desarrollamos aplicaciones web, apps móviles y backends, de la primera idea a producción.',
    keywords: [
      'desarrollo de software',
      'desarrollo web',
      'desarrollo de aplicaciones móviles',
      'React Native',
      'Next.js',
      'diseño UX/UI',
      'estrategia de producto',
      'desarrollo backend',
      'integración de IA',
      'estudio de software España',
      'Cataluña',
      'Tarragona',
    ],
  },
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    work: 'Trabajo',
    process: 'Proceso',
    about: 'Nosotros',
    contact: 'Contacto',
    blog: 'Blog',
    tools: 'Herramientas',
  },
  hero: {
    eyebrow: 'V13 Studio',
    line1: 'CREAMOS',
    line2: 'MÁS ALLÁ',
    line3: 'DE LO COMÚN',
    subtitle: 'Productos de software diseñados, construidos y lanzados de principio a fin',
    ctaWork: 'Ver Trabajo',
    ctaContact: 'Iniciar Proyecto',
    scroll: 'Desliza para Explorar',
  },
  services: {
    metaTitle: 'Servicios de Desarrollo de Software',
    metaDescription:
      'Estrategia de producto, diseño UX/UI, desarrollo web y móvil, ingeniería backend e integración de IA. Un mismo equipo del primer boceto a producción.',
    statementHeading: 'Qué hacemos.',
    statementBody:
      'Diseñamos y construimos software de principio a fin: frontend, backend, cloud y DevOps. Arquitectura sólida por debajo, trabajo de producto cuidado por encima.',
    stack: ['React', 'Node.js', 'Python', 'AWS', 'Azure', 'Docker', 'Kubernetes'],
    eyebrow: 'Capacidades',
    headingTop: 'Capacidades',
    headingAccent: 'full-stack',
    intro:
      'Del primer boceto a producción: estrategia, diseño, desarrollo web y móvil, backend e IA. Esto es lo que hacemos cada día.',
    items: [
      {
        title: 'Estrategia de Producto',
        description:
          'Empezamos con preguntas, no con código: para quién es, qué debe hacer primero, qué puede esperar. Sales con una hoja de ruta que se puede seguir de verdad.',
      },
      {
        title: 'Diseño UX/UI',
        description:
          'Interfaces que la gente entiende la primera vez que las abre. Prototipamos pronto y probamos flujos reales, así lo que apruebas es lo que se publica.',
      },
      {
        title: 'Desarrollo Móvil',
        description:
          'Apps para iOS y Android desde un solo código con React Native. Publicaciones más rápidas y menos mantenimiento, sin renunciar a la sensación nativa.',
      },
      {
        title: 'Desarrollo Web',
        description:
          'Webs y aplicaciones web con React y Next.js. Cargan rápido, son accesibles por defecto y fáciles de mantener cuando te entregamos las llaves.',
      },
      {
        title: 'Ingeniería Backend',
        description:
          'APIs, modelos de datos e infraestructura con Node.js y PostgreSQL. Aguantan cuando crece el tráfico y están instrumentadas para que sepas qué está pasando.',
      },
      {
        title: 'Integración de IA',
        description:
          'Asistentes, búsqueda y automatización sobre modelos de Claude y OpenAI. Elegimos la opción fiable antes que la demo que falla el lunes.',
      },
    ],
    howWeWorkHeading: 'Cómo trabajamos',
    faqHeading: 'Preguntas frecuentes',
    faq: [
      {
        q: '¿Cuánto dura un proyecto típico?',
        a: 'Depende del alcance, pero la mayoría de productos van de 8 a 16 semanas del concepto al lanzamiento: 1–2 semanas de estrategia, 2–4 de diseño y arquitectura, y luego sprints iterativos de desarrollo. Acordamos un calendario antes de empezar.',
      },
      {
        q: '¿Cómo calculáis el precio?',
        a: 'Alcance cerrado para proyectos bien definidos, o una tarifa mensual para trabajo de producto continuo. Compartimos una estimación tras la primera conversación de estrategia, sin sorpresas después.',
      },
      {
        q: '¿Podéis trabajar con nuestro equipo o código existente?',
        a: 'Sí. Nos integramos con equipos internos o retomamos bases de código existentes, revisamos la arquitectura y entregamos junto a vuestros ingenieros.',
      },
      {
        q: '¿Qué pasa tras el lanzamiento?',
        a: 'Seguimos con monitorización, iteración y crecimiento. Un lanzamiento es un punto de partida, no una despedida.',
      },
    ],
    techHeading: 'Tecnologías que usamos',
    techGroups: [
      { category: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
      { category: 'Frontend', items: ['React', 'Angular', 'Next.js', 'Astro', 'Tailwind CSS', 'Material UI', 'react-router-dom', 'TanStack Query', 'Zustand', 'MobX', 'Framer Motion', 'i18next'] },
      { category: 'Móvil', items: ['React Native', 'Expo'] },
      { category: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Zod', 'Swagger'] },
      { category: 'Datos y almacenamiento', items: ['PostgreSQL', 'Redis', 'Prisma', 'Drizzle ORM', 'Supabase', 'Firebase', 'AWS S3'] },
      { category: 'DevOps y CI/CD', items: ['Vercel', 'Railway', 'Cloudflare DNS', 'GitHub Actions', 'ESLint', 'Prettier'] },
      { category: 'Testing', items: ['Jest', 'Vitest', 'Playwright'] },
      { category: 'Observabilidad y APIs', items: ['Sentry', 'PostHog', 'Grafana Cloud', 'Pino', 'Resend'] },
      { category: 'IA', items: ['Anthropic API', 'Claude Agent SDK', 'OpenAI API'] },
    ],
  },
  process: {
    eyebrow: 'Cómo trabajamos',
    headingTop: 'Nuestro',
    headingAccent: 'proceso',
    intro:
      'Cuatro fases con entregables claros. Así avanza un proyecto de la idea a producción, y esto es lo que recibes en cada paso.',
    durationLabel: 'Duración',
    steps: [
      {
        title: 'Concepto',
        tagline: 'Blueprint y Estrategia',
        description:
          'Aclaramos qué quieres construir y por qué: usuarios, mercado, alcance. Una o dos semanas intensas que ahorran meses después.',
        duration: '1-2 semanas',
      },
      {
        title: 'Arquitectura',
        tagline: 'Diseño Técnico',
        description:
          'Decidimos cómo funcionará antes de construirlo: modelo de datos, APIs, pantallas. Los wireframes se vuelven prototipos y las decisiones, un plan de construcción.',
        duration: '2-4 semanas',
      },
      {
        title: 'Desarrollo Sprint',
        tagline: 'Construcción Iterativa',
        description:
          'Construimos en sprints cortos, y cada sprint termina con algo que puedes probar. Web, móvil y backend avanzan a la vez.',
        duration: '6-12 semanas',
      },
      {
        title: 'Lanzamiento',
        tagline: 'Despliegue y Crecimiento',
        description:
          'Publicamos, miramos los números y seguimos iterando. El lanzamiento es el principio de la conversación, no el final del proyecto.',
        duration: 'Continuo',
      },
    ],
  },
  portfolio: {
    metaTitle: 'Proyectos y Trabajo Seleccionado',
    metaDescription:
      'Proyectos de software de V13 Studio: plataformas web, apps móviles y sistemas backend, con el reto y el resultado detrás de cada uno.',
    eyebrow: 'Trabajo Seleccionado',
    headingTop: 'Proyectos',
    headingAccent: 'rompen límites',
    ctaText: '¿Quieres ver más?',
    ctaLink: 'Hablemos',
    viewProject: 'Ver Proyecto',
    scroll: 'Desliza para Explorar',
    all: 'Todo',
    detailHeading: 'Detalle de proyectos',
    clientLabel: 'Cliente',
    roleLabel: 'Rol',
    challengeLabel: 'Reto',
    resultLabel: 'Resultado',
  },
  about: {
    metaTitle: 'Sobre el Estudio',
    metaDescription:
      'V13 Studio es un estudio de software de cuatro personas en Cataluña. Estrategia, diseño, desarrollo y lanzamiento, todo bajo el mismo techo.',
    eyebrow: 'Sobre nosotros',
    title: 'Nosotros',
    statement: 'Cuatro personas, un estudio. Diseñamos, construimos y lanzamos productos de software de principio a fin.',
    intro:
      'V13 Studio es un estudio de software de cuatro personas en Cataluña. Llevamos productos de la idea a producción: estrategia, diseño, desarrollo y lanzamiento, todo bajo el mismo techo.',
    pillars: [
      {
        title: 'Estrategia',
        description: 'Te ayudamos a decidir qué construir y en qué orden, para que el presupuesto vaya a lo que de verdad importa.',
      },
      {
        title: 'Diseño',
        description: 'Diseño de interfaz y experiencia que hace simple lo complejo, en el primer uso y en el número cien.',
      },
      {
        title: 'Ingeniería',
        description: 'Arquitectura y código pensados para durar: probados, documentados y listos para crecer cuando tu producto lo haga.',
      },
    ],
    headingTop: 'Equipo pequeño.',
    headingAccent: 'Gran impacto.',
    p1: 'Somos un estudio de 4 personas con base en Cataluña, España. Construimos productos digitales con la precisión de una agencia y el alma de una startup.',
    p2: 'Sin equipos inflados. Sin reuniones interminables. Solo ejecución enfocada de gente que se preocupa de verdad por el resultado.',
    location: 'CATALUÑA, ESPAÑA',
    founded: 'Fundado',
    teamHeading: 'El equipo',
    valuesHeading: 'Lo que valoramos',
    values: [
      {
        title: 'Oficio',
        description:
          'Los detalles que la gente nota aunque no sepa nombrarlos: tipografía que respira, pantallas que responden al instante, código legible un año después. Ahí es donde invertimos la hora extra.',
      },
      {
        title: 'Compromiso',
        description:
          'Tu producto no es una cola de tickets para nosotros. Avisamos de los riesgos pronto, proponemos caminos más baratos cuando existen y respondemos por lo que entregamos.',
      },
      {
        title: 'Honestidad',
        description:
          'Si algo no va a funcionar, lo decimos antes de que te cueste dinero. Respuestas claras sobre alcance, plazos y renuncias, aunque no sean lo que esperabas oír.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    headingTop: 'Construyamos',
    headingAccent: 'algo grande',
    intro:
      '¿Tienes un proyecto en mente? Cuéntanoslo. Lo lee una persona, no un bot, y te responde en menos de 24 horas.',
    location: 'Roquetes 43520, Tarragona, España',
    nameLabel: 'Nombre',
    emailLabel: 'Email',
    messageLabel: 'Mensaje',
    ctaProject: 'Iniciar Proyecto',
    phoneLabel: 'Tel',
    phoneValue: '+34 650 851 990',
    addressLabel: 'Dirección',
    send: 'Enviar Mensaje',
    sending: 'Enviando…',
    errorTitle: 'Algo ha fallado',
    errorText: 'No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbenos directamente a',
    errorMailto: 'v13studio@v13studio.com',
    successTitle: '¡Mensaje enviado!',
    successText: 'Te responderemos en 24 horas.',
    consentText: 'He leído y acepto la',
    consentLink: 'Política de Privacidad',
  },
  footer: {
    tagline:
      'Estudio de producto de software en Cataluña. Diseñamos, construimos y lanzamos productos web, móviles y backend.',
    barcelonaTime: 'Hora de Barcelona',
    rights: 'V13 Studio. Todos los derechos reservados.',
    privacy: 'Privacidad',
    terms: 'Términos',
    legalNotice: 'Aviso Legal',
    cookies: 'Cookies',
    navHeading: 'Navegación',
    socialHeading: 'Social',
    legalHeading: 'Legal',
  },
  blog: {
    title: 'Diario',
    backHome: 'V13 Studio',
    intro:
      'Noticias diarias de software e IA: lanzamientos, modelos y herramientas que cambian cómo se construye producto.',
    aiDisclosure: 'Generado con IA y revisado por el equipo de V13 Studio',
    minRead: 'min de lectura',
    comingSoon: 'Próximamente nuevos artículos.',
    backToBlog: 'Blog',
    cta: 'Inicia un proyecto con V13 Studio',
    sources: 'Fuentes',
    featured: 'Destacado',
    readArticle: 'Leer artículo',
  },
  legal: {
    backHome: '← V13 STUDIO',
    lastUpdated: 'Última actualización',
    moreDocuments: 'Más documentos',
  },
  stats: { heading: 'En cifras' },
  viewMore: 'Ver más',
}

const ca: Dictionary = {
  meta: {
    title: 'V13 Studio | Desenvolupament de Programari i Producte Digital',
    description:
      'Estudi de programari independent a Catalunya. Dissenyem i desenvolupem aplicacions web, apps mòbils i backends, de la primera idea a producció.',
    keywords: [
      'desenvolupament de programari',
      'desenvolupament web',
      'aplicacions mòbils',
      'React Native',
      'Next.js',
      'disseny UX/UI',
      'estratègia de producte',
      'desenvolupament backend',
      "integració d'IA",
      'estudi de programari',
      'Catalunya',
      'Tarragona',
    ],
  },
  nav: {
    home: 'Inici',
    services: 'Serveis',
    work: 'Treball',
    process: 'Procés',
    about: 'Nosaltres',
    contact: 'Contacte',
    blog: 'Blog',
    tools: 'Eines',
  },
  hero: {
    eyebrow: 'V13 Studio',
    line1: 'CREEM',
    line2: 'MÉS ENLLÀ',
    line3: 'DEL COMÚ',
    subtitle: 'Productes de programari dissenyats, construïts i llançats de principi a fi',
    ctaWork: 'Veure Treball',
    ctaContact: 'Iniciar Projecte',
    scroll: 'Desplaça per Explorar',
  },
  services: {
    metaTitle: 'Serveis de Desenvolupament de Programari',
    metaDescription:
      "Estratègia de producte, disseny UX/UI, desenvolupament web i mòbil, enginyeria backend i integració d'IA. Un mateix equip del primer esbós a producció.",
    statementHeading: 'Què fem.',
    statementBody:
      'Dissenyem i construïm programari de principi a fi: frontend, backend, cloud i DevOps. Arquitectura sòlida per sota, treball de producte acurat per sobre.',
    stack: ['React', 'Node.js', 'Python', 'AWS', 'Azure', 'Docker', 'Kubernetes'],
    eyebrow: 'Capacitats',
    headingTop: 'Capacitats',
    headingAccent: 'full-stack',
    intro:
      "Del primer esbós a producció: estratègia, disseny, desenvolupament web i mòbil, backend i IA. Això és el que fem cada dia.",
    items: [
      {
        title: 'Estratègia de Producte',
        description:
          'Comencem amb preguntes, no amb codi: per a qui és, què ha de fer primer, què pot esperar. En surts amb un full de ruta que es pot seguir de debò.',
      },
      {
        title: 'Disseny UX/UI',
        description:
          'Interfícies que la gent entén el primer cop que les obre. Prototipem aviat i provem fluxos reals, així el que aproves és el que es publica.',
      },
      {
        title: 'Desenvolupament Mòbil',
        description:
          "Apps per a iOS i Android des d'un sol codi amb React Native. Publicacions més ràpides i menys manteniment, sense renunciar a la sensació nativa.",
      },
      {
        title: 'Desenvolupament Web',
        description:
          'Webs i aplicacions web amb React i Next.js. Carreguen ràpid, són accessibles per defecte i fàcils de mantenir quan et donem les claus.',
      },
      {
        title: 'Enginyeria Backend',
        description:
          'APIs, models de dades i infraestructura amb Node.js i PostgreSQL. Aguanten quan creix el trànsit i estan instrumentades perquè sàpigues què està passant.',
      },
      {
        title: "Integració d'IA",
        description:
          "Assistents, cerca i automatització sobre models de Claude i OpenAI. Triem l'opció fiable abans que la demo que falla dilluns.",
      },
    ],
    howWeWorkHeading: 'Com treballem',
    faqHeading: 'Preguntes freqüents',
    faq: [
      {
        q: 'Quant dura un projecte típic?',
        a: "Depèn de l'abast, però la majoria de productes van de 8 a 16 setmanes del concepte al llançament: 1–2 setmanes d'estratègia, 2–4 de disseny i arquitectura, i després sprints iteratius de desenvolupament. Acordem un calendari abans de començar.",
      },
      {
        q: 'Com calculeu el preu?',
        a: "Abast tancat per a projectes ben definits, o una tarifa mensual per a feina de producte contínua. Compartim una estimació després de la primera conversa d'estratègia, sense sorpreses després.",
      },
      {
        q: 'Podeu treballar amb el nostre equip o codi existent?',
        a: "Sí. Ens integrem amb equips interns o reprenem bases de codi existents, revisem l'arquitectura i lliurem al costat dels vostres enginyers.",
      },
      {
        q: 'Què passa després del llançament?',
        a: 'Continuem amb monitoratge, iteració i creixement. Un llançament és un punt de partida, no un comiat.',
      },
    ],
    techHeading: 'Tecnologies que fem servir',
    techGroups: [
      { category: 'Llenguatges', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
      { category: 'Frontend', items: ['React', 'Angular', 'Next.js', 'Astro', 'Tailwind CSS', 'Material UI', 'react-router-dom', 'TanStack Query', 'Zustand', 'MobX', 'Framer Motion', 'i18next'] },
      { category: 'Mòbil', items: ['React Native', 'Expo'] },
      { category: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Zod', 'Swagger'] },
      { category: 'Dades i emmagatzematge', items: ['PostgreSQL', 'Redis', 'Prisma', 'Drizzle ORM', 'Supabase', 'Firebase', 'AWS S3'] },
      { category: 'DevOps i CI/CD', items: ['Vercel', 'Railway', 'Cloudflare DNS', 'GitHub Actions', 'ESLint', 'Prettier'] },
      { category: 'Testing', items: ['Jest', 'Vitest', 'Playwright'] },
      { category: 'Observabilitat i APIs', items: ['Sentry', 'PostHog', 'Grafana Cloud', 'Pino', 'Resend'] },
      { category: 'IA', items: ['Anthropic API', 'Claude Agent SDK', 'OpenAI API'] },
    ],
  },
  process: {
    eyebrow: 'Com treballem',
    headingTop: 'El nostre',
    headingAccent: 'procés',
    intro:
      'Quatre fases amb lliurables clars. Així avança un projecte de la idea a producció, i això és el que reps a cada pas.',
    durationLabel: 'Durada',
    steps: [
      {
        title: 'Concepte',
        tagline: 'Blueprint i Estratègia',
        description:
          'Aclarim què vols construir i per què: usuaris, mercat, abast. Una o dues setmanes intenses que estalvien mesos després.',
        duration: '1-2 setmanes',
      },
      {
        title: 'Arquitectura',
        tagline: 'Disseny Tècnic',
        description:
          'Decidim com funcionarà abans de construir-ho: model de dades, APIs, pantalles. Els wireframes es tornen prototips i les decisions, un pla de construcció.',
        duration: '2-4 setmanes',
      },
      {
        title: 'Desenvolupament Sprint',
        tagline: 'Construcció Iterativa',
        description:
          'Construïm en sprints curts, i cada sprint acaba amb alguna cosa que pots provar. Web, mòbil i backend avancen alhora.',
        duration: '6-12 setmanes',
      },
      {
        title: 'Llançament',
        tagline: 'Desplegament i Creixement',
        description:
          'Publiquem, mirem els números i seguim iterant. El llançament és el principi de la conversa, no el final del projecte.',
        duration: 'Continu',
      },
    ],
  },
  portfolio: {
    metaTitle: 'Projectes i Treball Seleccionat',
    metaDescription:
      'Projectes de programari de V13 Studio: plataformes web, apps mòbils i sistemes backend, amb el repte i el resultat darrere de cadascun.',
    eyebrow: 'Treball Seleccionat',
    headingTop: 'Projectes',
    headingAccent: 'trenquen límits',
    ctaText: 'Vols veure’n més?',
    ctaLink: 'Parlem-ne',
    viewProject: 'Veure Projecte',
    scroll: 'Desplaça per Explorar',
    all: 'Tot',
    detailHeading: 'Detall de projectes',
    clientLabel: 'Client',
    roleLabel: 'Rol',
    challengeLabel: 'Repte',
    resultLabel: 'Resultat',
  },
  about: {
    metaTitle: "Sobre l'Estudi",
    metaDescription:
      'V13 Studio és un estudi de programari de quatre persones a Catalunya. Estratègia, disseny, desenvolupament i llançament, tot sota el mateix sostre.',
    eyebrow: 'Sobre nosaltres',
    title: 'Nosaltres',
    statement: 'Quatre persones, un estudi. Dissenyem, construïm i llancem productes de programari de principi a fi.',
    intro:
      'V13 Studio és un estudi de programari de quatre persones a Catalunya. Portem productes de la idea a producció: estratègia, disseny, desenvolupament i llançament, tot sota el mateix sostre.',
    pillars: [
      {
        title: 'Estratègia',
        description: "T'ajudem a decidir què construir i en quin ordre, perquè el pressupost vagi al que de debò importa.",
      },
      {
        title: 'Disseny',
        description: "Disseny d'interfície i experiència que fa simple allò complex, en el primer ús i en el número cent.",
      },
      {
        title: 'Enginyeria',
        description: 'Arquitectura i codi pensats per durar: provats, documentats i a punt per créixer quan el teu producte ho faci.',
      },
    ],
    headingTop: 'Equip petit.',
    headingAccent: 'Gran impacte.',
    p1: "Som un estudi de 4 persones amb base a Catalunya, Espanya. Construïm productes digitals amb la precisió d'una agència i l'ànima d'una startup.",
    p2: 'Sense equips inflats. Sense reunions interminables. Només execució enfocada de gent que es preocupa de debò pel resultat.',
    location: 'CATALUNYA, ESPANYA',
    founded: 'Fundat',
    teamHeading: "L'equip",
    valuesHeading: 'El que valorem',
    values: [
      {
        title: 'Ofici',
        description:
          'Els detalls que la gent nota encara que no els sàpiga anomenar: tipografia que respira, pantalles que responen a l’instant, codi llegible un any després. És on invertim l’hora extra.',
      },
      {
        title: 'Compromís',
        description:
          'El teu producte no és una cua de tiquets per a nosaltres. Avisem dels riscos aviat, proposem camins més barats quan existeixen i responem pel que lliurem.',
      },
      {
        title: 'Honestedat',
        description:
          'Si alguna cosa no funcionarà, ho diem abans que et costi diners. Respostes clares sobre abast, terminis i renúncies, encara que no siguin el que esperaves sentir.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contacte',
    headingTop: 'Construïm',
    headingAccent: 'alguna cosa gran',
    intro:
      "Tens un projecte en ment? Explica'ns-el. El llegeix una persona, no un bot, i et respon en menys de 24 hores.",
    location: 'Roquetes 43520, Tarragona, Espanya',
    nameLabel: 'Nom',
    emailLabel: 'Email',
    messageLabel: 'Missatge',
    ctaProject: 'Iniciar Projecte',
    phoneLabel: 'Tel',
    phoneValue: '+34 650 851 990',
    addressLabel: 'Direcció',
    send: 'Envia el Missatge',
    sending: 'Enviant…',
    errorTitle: 'Alguna cosa ha fallat',
    errorText: "No s'ha pogut enviar el missatge. Torna-ho a provar o escriu-nos directament a",
    errorMailto: 'v13studio@v13studio.com',
    successTitle: 'Missatge enviat!',
    successText: 'Et respondrem en 24 hores.',
    consentText: 'He llegit i accepto la',
    consentLink: 'Política de Privacitat',
  },
  footer: {
    tagline:
      'Estudi de producte de programari a Catalunya. Dissenyem, construïm i llancem productes web, mòbils i backend.',
    barcelonaTime: 'Hora de Barcelona',
    rights: 'V13 Studio. Tots els drets reservats.',
    privacy: 'Privacitat',
    terms: 'Termes',
    legalNotice: 'Avís Legal',
    cookies: 'Cookies',
    navHeading: 'Navegació',
    socialHeading: 'Social',
    legalHeading: 'Legal',
  },
  blog: {
    title: 'Diari',
    backHome: 'V13 Studio',
    intro:
      'Notícies diàries de programari i IA: llançaments, models i eines que canvien com es construeix producte.',
    aiDisclosure: "Generat amb IA i revisat per l'equip de V13 Studio",
    minRead: 'min de lectura',
    comingSoon: 'Nous articles ben aviat.',
    backToBlog: 'Blog',
    cta: 'Inicia un projecte amb V13 Studio',
    sources: 'Fonts',
    featured: 'Destacat',
    readArticle: 'Llegir article',
  },
  legal: {
    backHome: '← V13 STUDIO',
    lastUpdated: 'Última actualització',
    moreDocuments: 'Més documents',
  },
  stats: { heading: 'En xifres' },
  viewMore: "Veure'n més",
}

const dictionaries: Record<Locale, Dictionary> = { en, es, ca }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
