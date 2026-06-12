import type { Locale } from './config'

export interface Dictionary {
  meta: { title: string; description: string }
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
    statementHeading: string
    statementBody: string
    stack: string[]
    eyebrow: string
    headingTop: string
    headingAccent: string
    intro: string
    items: { title: string; description: string }[]
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
    eyebrow: string
    headingTop: string
    headingAccent: string
    ctaText: string
    ctaLink: string
    viewProject: string
    scroll: string
    all: string
  }
  about: {
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
    backHome: string
    intro: string
    minRead: string
    comingSoon: string
    backToBlog: string
    cta: string
  }
  legal: {
    backHome: string
    lastUpdated: string
    moreDocuments: string
  }
}

const en: Dictionary = {
  meta: {
    title: 'V13 Studio | Software Product Studio',
    description:
      'A digital product studio crafting software from strategy to deployment. Mobile, web, and backend engineering based in Catalonia, Spain.',
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
    subtitle: 'Next-Generation Software & Digital Products',
    ctaWork: 'View Work',
    ctaContact: 'Start Project',
    scroll: 'Scroll to Explore',
  },
  services: {
    statementHeading: 'What we do.',
    statementBody:
      'Full-stack software development. Capabilities: Frontend, Backend, Cloud, DevOps. Robust architecture and cutting-edge digital products.',
    stack: ['React', 'Node.js', 'Python', 'AWS', 'Azure', 'Docker', 'Kubernetes'],
    eyebrow: 'Capabilities',
    headingTop: 'Full-stack',
    headingAccent: 'capabilities',
    intro:
      'From concept to launch, we handle every aspect of your digital product.',
    items: [
      {
        title: 'Product Strategy',
        description:
          'We dive deep into your vision, market, and users to craft a roadmap that makes sense.',
      },
      {
        title: 'UX/UI Design',
        description:
          'Interfaces that feel intuitive and look stunning. Every pixel serves a purpose.',
      },
      {
        title: 'Mobile Development',
        description:
          'Native-feeling apps built with React Native. One codebase, all platforms.',
      },
      {
        title: 'Web Development',
        description:
          'Fast, accessible, and beautiful web experiences with modern frameworks.',
      },
      {
        title: 'Backend Engineering',
        description:
          'Scalable APIs and infrastructure that grow with your business.',
      },
      {
        title: 'AI Integration',
        description:
          'Intelligent features powered by cutting-edge AI and machine learning.',
      },
    ],
  },
  process: {
    eyebrow: 'How we work',
    headingTop: 'Our',
    headingAccent: 'process',
    intro:
      'A proven methodology honed over years of building successful products.',
    durationLabel: 'Duration',
    steps: [
      {
        title: 'Concept',
        tagline: 'Blueprint & Strategy',
        description:
          'We dive deep into your vision, users, and market. Research, interviews, and strategic planning.',
        duration: '1-2 weeks',
      },
      {
        title: 'Architecture',
        tagline: 'Technical Design',
        description:
          'From wireframes to high-fidelity prototypes. Interfaces that are intuitive and beautiful.',
        duration: '2-4 weeks',
      },
      {
        title: 'Development Sprint',
        tagline: 'Iterative Building',
        description:
          'Clean, scalable code across web, mobile, and backend. Continuous delivery in sprints.',
        duration: '6-12 weeks',
      },
      {
        title: 'Launch',
        tagline: 'Deployment & Growth',
        description:
          'Deployment, monitoring, and iteration. We ensure your product succeeds post-launch.',
        duration: 'Ongoing',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Selected Work',
    headingTop: 'Projects',
    headingAccent: 'push boundaries',
    ctaText: 'Want to see more?',
    ctaLink: "Let's talk",
    viewProject: 'View Project',
    scroll: 'Scroll to Explore',
    all: 'All',
  },
  about: {
    eyebrow: 'About us',
    title: 'About',
    statement: 'Redefining the impossible. Innovation & exclusivity.',
    intro:
      'At V13 Studio we fuse art and technology to craft digital experiences that defy limits. Our pursuit of excellence drives us to build next-generation software and products for demanding clients.',
    pillars: [
      {
        title: 'Strategy',
        description: 'Tailored strategy and solutions that turn a vision into a product with purpose.',
      },
      {
        title: 'Design',
        description: 'Visual and experience design (UI/UX) that makes every interaction intuitive and memorable.',
      },
      {
        title: 'Engineering',
        description: 'Robust development and architecture to build scalable, next-generation software.',
      },
    ],
    headingTop: 'Small team.',
    headingAccent: 'Big impact.',
    p1: "We're a 4-person studio based in Catalonia, Spain. We build digital products with the precision of an agency and the soul of a startup.",
    p2: 'No bloated teams. No endless meetings. Just focused execution from people who genuinely care about the outcome.',
    location: 'CATALONIA, SPAIN',
    founded: 'Founded',
  },
  contact: {
    eyebrow: 'Contact',
    headingTop: "Let's build",
    headingAccent: 'something great',
    intro:
      'Have a project in mind? We would love to hear about it. Drop us a line and we will get back to you within 24 hours.',
    location: 'Catalonia, Spain',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    ctaProject: 'Start a Project',
    phoneLabel: 'Tel',
    phoneValue: '+34 600 000 000',
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
      'Software product studio crafting exceptional digital experiences for everyone and everywhere.',
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
    backHome: '← V13 STUDIO',
    intro:
      'Notes on product strategy, design, and software engineering from our studio in Catalonia.',
    minRead: 'min read',
    comingSoon: 'New articles coming soon.',
    backToBlog: '← BLOG',
    cta: 'Start a project with V13 Studio →',
  },
  legal: {
    backHome: '← V13 STUDIO',
    lastUpdated: 'Last updated',
    moreDocuments: 'More documents',
  },
}

const es: Dictionary = {
  meta: {
    title: 'V13 Studio | Estudio de Producto de Software',
    description:
      'Estudio de producto digital que crea software de la estrategia al despliegue. Ingeniería móvil, web y backend con base en Cataluña, España.',
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
    subtitle: 'Software y Productos Digitales de Nueva Generación',
    ctaWork: 'Ver Trabajo',
    ctaContact: 'Iniciar Proyecto',
    scroll: 'Desliza para Explorar',
  },
  services: {
    statementHeading: 'Qué hacemos.',
    statementBody:
      'Desarrollo de Software Full-Stack. Capacidades: Frontend, Backend, Cloud, DevOps. Arquitectura robusta y productos digitales de vanguardia.',
    stack: ['React', 'Node.js', 'Python', 'AWS', 'Azure', 'Docker', 'Kubernetes'],
    eyebrow: 'Capacidades',
    headingTop: 'Capacidades',
    headingAccent: 'full-stack',
    intro:
      'Del concepto al lanzamiento, gestionamos cada aspecto de tu producto digital.',
    items: [
      {
        title: 'Estrategia de Producto',
        description:
          'Profundizamos en tu visión, mercado y usuarios para crear una hoja de ruta con sentido.',
      },
      {
        title: 'Diseño UX/UI',
        description:
          'Interfaces intuitivas y espectaculares. Cada píxel tiene un propósito.',
      },
      {
        title: 'Desarrollo Móvil',
        description:
          'Apps con sensación nativa hechas con React Native. Un solo código, todas las plataformas.',
      },
      {
        title: 'Desarrollo Web',
        description:
          'Experiencias web rápidas, accesibles y atractivas con frameworks modernos.',
      },
      {
        title: 'Ingeniería Backend',
        description:
          'APIs e infraestructura escalables que crecen con tu negocio.',
      },
      {
        title: 'Integración de IA',
        description:
          'Funciones inteligentes impulsadas por IA y machine learning de vanguardia.',
      },
    ],
  },
  process: {
    eyebrow: 'Cómo trabajamos',
    headingTop: 'Nuestro',
    headingAccent: 'proceso',
    intro:
      'Una metodología probada y perfeccionada durante años construyendo productos de éxito.',
    durationLabel: 'Duración',
    steps: [
      {
        title: 'Concepto',
        tagline: 'Blueprint y Estrategia',
        description:
          'Profundizamos en tu visión, usuarios y mercado. Investigación, entrevistas y planificación estratégica.',
        duration: '1-2 semanas',
      },
      {
        title: 'Arquitectura',
        tagline: 'Diseño Técnico',
        description:
          'De wireframes a prototipos de alta fidelidad. Interfaces intuitivas y atractivas.',
        duration: '2-4 semanas',
      },
      {
        title: 'Desarrollo Sprint',
        tagline: 'Construcción Iterativa',
        description:
          'Código limpio y escalable en web, móvil y backend. Entrega continua en sprints.',
        duration: '6-12 semanas',
      },
      {
        title: 'Lanzamiento',
        tagline: 'Despliegue y Crecimiento',
        description:
          'Despliegue, monitorización e iteración. Aseguramos que tu producto triunfe tras el lanzamiento.',
        duration: 'Continuo',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Trabajo Seleccionado',
    headingTop: 'Proyectos',
    headingAccent: 'rompen límites',
    ctaText: '¿Quieres ver más?',
    ctaLink: 'Hablemos',
    viewProject: 'Ver Proyecto',
    scroll: 'Desliza para Explorar',
    all: 'Todo',
  },
  about: {
    eyebrow: 'Sobre nosotros',
    title: 'Nosotros',
    statement: 'Redefiniendo lo imposible. Innovación y exclusividad.',
    intro:
      'En V13 Studio fusionamos arte y tecnología para crear experiencias digitales que desafían los límites. Nuestra pasión por la excelencia nos impulsa a desarrollar software y productos de nueva generación para clientes exigentes.',
    pillars: [
      {
        title: 'Estrategia',
        description: 'Estrategia y soluciones a medida para convertir una visión en un producto con propósito.',
      },
      {
        title: 'Diseño',
        description: 'Diseño visual y de experiencia (UI/UX) que hace cada interacción intuitiva y memorable.',
      },
      {
        title: 'Ingeniería',
        description: 'Desarrollo y arquitectura robusta para construir software escalable de nueva generación.',
      },
    ],
    headingTop: 'Equipo pequeño.',
    headingAccent: 'Gran impacto.',
    p1: 'Somos un estudio de 4 personas con base en Cataluña, España. Construimos productos digitales con la precisión de una agencia y el alma de una startup.',
    p2: 'Sin equipos inflados. Sin reuniones interminables. Solo ejecución enfocada de gente que se preocupa de verdad por el resultado.',
    location: 'CATALUÑA, ESPAÑA',
    founded: 'Fundado',
  },
  contact: {
    eyebrow: 'Contacto',
    headingTop: 'Construyamos',
    headingAccent: 'algo grande',
    intro:
      '¿Tienes un proyecto en mente? Nos encantaría conocerlo. Escríbenos y te responderemos en 24 horas.',
    location: 'Cataluña, España',
    nameLabel: 'Nombre',
    emailLabel: 'Email',
    messageLabel: 'Mensaje',
    ctaProject: 'Iniciar Proyecto',
    phoneLabel: 'Tel',
    phoneValue: '+34 600 000 000',
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
      'Estudio de producto de software que crea experiencias digitales excepcionales para todos y en todas partes.',
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
    backHome: '← V13 STUDIO',
    intro:
      'Notas sobre estrategia de producto, diseño e ingeniería de software desde nuestro estudio en Cataluña.',
    minRead: 'min de lectura',
    comingSoon: 'Próximamente nuevos artículos.',
    backToBlog: '← BLOG',
    cta: 'Inicia un proyecto con V13 Studio →',
  },
  legal: {
    backHome: '← V13 STUDIO',
    lastUpdated: 'Última actualización',
    moreDocuments: 'Más documentos',
  },
}

const ca: Dictionary = {
  meta: {
    title: 'V13 Studio | Estudi de Producte de Programari',
    description:
      'Estudi de producte digital que crea programari de l’estratègia al desplegament. Enginyeria mòbil, web i backend amb base a Catalunya, Espanya.',
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
    subtitle: 'Programari i Productes Digitals de Nova Generació',
    ctaWork: 'Veure Treball',
    ctaContact: 'Iniciar Projecte',
    scroll: 'Desplaça per Explorar',
  },
  services: {
    statementHeading: 'Què fem.',
    statementBody:
      'Desenvolupament de Software Full-Stack. Capacitats: Frontend, Backend, Cloud, DevOps. Arquitectura robusta i productes digitals d’avantguarda.',
    stack: ['React', 'Node.js', 'Python', 'AWS', 'Azure', 'Docker', 'Kubernetes'],
    eyebrow: 'Capacitats',
    headingTop: 'Capacitats',
    headingAccent: 'full-stack',
    intro:
      'Del concepte al llançament, gestionem cada aspecte del teu producte digital.',
    items: [
      {
        title: 'Estratègia de Producte',
        description:
          'Aprofundim en la teva visió, mercat i usuaris per crear un full de ruta amb sentit.',
      },
      {
        title: 'Disseny UX/UI',
        description:
          'Interfícies intuïtives i espectaculars. Cada píxel té un propòsit.',
      },
      {
        title: 'Desenvolupament Mòbil',
        description:
          'Apps amb sensació nativa fetes amb React Native. Un sol codi, totes les plataformes.',
      },
      {
        title: 'Desenvolupament Web',
        description:
          'Experiències web ràpides, accessibles i atractives amb frameworks moderns.',
      },
      {
        title: 'Enginyeria Backend',
        description:
          'APIs i infraestructura escalables que creixen amb el teu negoci.',
      },
      {
        title: 'Integració d’IA',
        description:
          'Funcions intel·ligents impulsades per IA i machine learning d’avantguarda.',
      },
    ],
  },
  process: {
    eyebrow: 'Com treballem',
    headingTop: 'El nostre',
    headingAccent: 'procés',
    intro:
      'Una metodologia provada i perfeccionada durant anys construint productes d’èxit.',
    durationLabel: 'Durada',
    steps: [
      {
        title: 'Concepte',
        tagline: 'Blueprint i Estratègia',
        description:
          'Aprofundim en la teva visió, usuaris i mercat. Recerca, entrevistes i planificació estratègica.',
        duration: '1-2 setmanes',
      },
      {
        title: 'Arquitectura',
        tagline: 'Disseny Tècnic',
        description:
          'De wireframes a prototips d’alta fidelitat. Interfícies intuïtives i atractives.',
        duration: '2-4 setmanes',
      },
      {
        title: 'Desenvolupament Sprint',
        tagline: 'Construcció Iterativa',
        description:
          'Codi net i escalable en web, mòbil i backend. Lliurament continu en sprints.',
        duration: '6-12 setmanes',
      },
      {
        title: 'Llançament',
        tagline: 'Desplegament i Creixement',
        description:
          'Desplegament, monitoratge i iteració. Assegurem que el teu producte triomfi després del llançament.',
        duration: 'Continu',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Treball Seleccionat',
    headingTop: 'Projectes',
    headingAccent: 'trenquen límits',
    ctaText: 'Vols veure’n més?',
    ctaLink: 'Parlem-ne',
    viewProject: 'Veure Projecte',
    scroll: 'Desplaça per Explorar',
    all: 'Tot',
  },
  about: {
    eyebrow: 'Sobre nosaltres',
    title: 'Nosaltres',
    statement: 'Redefinint l’impossible. Innovació i exclusivitat.',
    intro:
      'A V13 Studio fusionem art i tecnologia per crear experiències digitals que desafien els límits. La nostra passió per l’excel·lència ens impulsa a desenvolupar programari i productes de nova generació per a clients exigents.',
    pillars: [
      {
        title: 'Estratègia',
        description: 'Estratègia i solucions a mida per convertir una visió en un producte amb propòsit.',
      },
      {
        title: 'Disseny',
        description: 'Disseny visual i d’experiència (UI/UX) que fa cada interacció intuïtiva i memorable.',
      },
      {
        title: 'Enginyeria',
        description: 'Desenvolupament i arquitectura robusta per construir programari escalable de nova generació.',
      },
    ],
    headingTop: 'Equip petit.',
    headingAccent: 'Gran impacte.',
    p1: 'Som un estudi de 4 persones amb base a Catalunya, Espanya. Construïm productes digitals amb la precisió d’una agència i l’ànima d’una startup.',
    p2: 'Sense equips inflats. Sense reunions interminables. Només execució enfocada de gent que es preocupa de debò pel resultat.',
    location: 'CATALUNYA, ESPANYA',
    founded: 'Fundat',
  },
  contact: {
    eyebrow: 'Contacte',
    headingTop: 'Construïm',
    headingAccent: 'alguna cosa gran',
    intro:
      'Tens un projecte en ment? Ens encantaria conèixer-lo. Escriu-nos i et respondrem en 24 hores.',
    location: 'Catalunya, Espanya',
    nameLabel: 'Nom',
    emailLabel: 'Email',
    messageLabel: 'Missatge',
    ctaProject: 'Iniciar Projecte',
    phoneLabel: 'Tel',
    phoneValue: '+34 600 000 000',
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
      'Estudi de producte de programari que crea experiències digitals excepcionals per a tothom i a tot arreu.',
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
    backHome: '← V13 STUDIO',
    intro:
      'Notes sobre estratègia de producte, disseny i enginyeria de programari des del nostre estudi a Catalunya.',
    minRead: 'min de lectura',
    comingSoon: 'Nous articles ben aviat.',
    backToBlog: '← BLOG',
    cta: 'Inicia un projecte amb V13 Studio →',
  },
  legal: {
    backHome: '← V13 STUDIO',
    lastUpdated: 'Última actualització',
    moreDocuments: 'Més documents',
  },
}

const dictionaries: Record<Locale, Dictionary> = { en, es, ca }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
