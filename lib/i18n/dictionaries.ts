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
    steps: { title: string; description: string; duration: string }[]
    ctaTitle: string
    ctaText: string
    ctaButton: string
  }
  portfolio: {
    eyebrow: string
    headingTop: string
    headingAccent: string
    ctaText: string
    ctaLink: string
  }
  about: {
    eyebrow: string
    headingTop: string
    headingAccent: string
    p1: string
    p2: string
    location: string
    founded: string
    stats: { value: string; label: string }[]
    teamRoles: string[]
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
    eyebrow: 'Software Product Studio',
    line1: 'WE BUILD',
    line2: 'PRODUCTS',
    line3: 'THAT MATTER',
    subtitle:
      'Software product studio crafting exceptional digital experiences for everyone and everywhere.',
    ctaWork: 'View Our Work',
    ctaContact: 'Start a Project',
    scroll: 'Scroll',
  },
  services: {
    eyebrow: 'What we do',
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
        title: 'Discovery',
        description:
          'We dive deep into your vision, users, and market. Research, interviews, and strategic planning.',
        duration: '1-2 weeks',
      },
      {
        title: 'Design',
        description:
          'From wireframes to high-fidelity prototypes. Interfaces that are intuitive and beautiful.',
        duration: '2-4 weeks',
      },
      {
        title: 'Development',
        description:
          'Clean, scalable code across web, mobile, and backend. Continuous delivery in sprints.',
        duration: '6-12 weeks',
      },
      {
        title: 'Launch',
        description:
          'Deployment, monitoring, and iteration. We ensure your product succeeds post-launch.',
        duration: 'Ongoing',
      },
    ],
    ctaTitle: 'Ready to start your project?',
    ctaText: "Let's discuss how we can help bring your vision to life.",
    ctaButton: 'Get in touch',
  },
  portfolio: {
    eyebrow: 'Selected Work',
    headingTop: 'Projects that',
    headingAccent: 'push boundaries',
    ctaText: 'Want to see more?',
    ctaLink: "Let's talk",
  },
  about: {
    eyebrow: 'About us',
    headingTop: 'Small team.',
    headingAccent: 'Big impact.',
    p1: "We're a 4-person studio based in Catalonia, Spain. We build digital products with the precision of an agency and the soul of a startup.",
    p2: 'No bloated teams. No endless meetings. Just focused execution from people who genuinely care about the outcome.',
    location: 'CATALONIA, SPAIN',
    founded: 'Founded',
    stats: [
      { value: '100%', label: 'Senior Engineers' },
      { value: '0', label: 'Account Managers' },
      { value: '2wk', label: 'Sprint Cycles' },
      { value: '24h', label: 'Response Time' },
    ],
    teamRoles: ['Product Lead', 'Lead Engineer', 'Full-Stack Dev', 'UX Designer'],
  },
  contact: {
    eyebrow: 'Contact',
    headingTop: "Let's build",
    headingAccent: 'something great',
    intro:
      'Have a project in mind? We would love to hear about it. Drop us a line and we will get back to you within 24 hours.',
    location: 'Catalonia, Spain',
    nameLabel: 'Your name',
    emailLabel: 'Your email',
    messageLabel: 'Tell us about your project',
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
    eyebrow: 'Estudio de Producto de Software',
    line1: 'CREAMOS',
    line2: 'PRODUCTOS',
    line3: 'QUE IMPORTAN',
    subtitle:
      'Estudio de producto de software que crea experiencias digitales excepcionales para todos y en todas partes.',
    ctaWork: 'Ver Nuestro Trabajo',
    ctaContact: 'Iniciar un Proyecto',
    scroll: 'Desliza',
  },
  services: {
    eyebrow: 'Qué hacemos',
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
        title: 'Descubrimiento',
        description:
          'Profundizamos en tu visión, usuarios y mercado. Investigación, entrevistas y planificación estratégica.',
        duration: '1-2 semanas',
      },
      {
        title: 'Diseño',
        description:
          'De wireframes a prototipos de alta fidelidad. Interfaces intuitivas y atractivas.',
        duration: '2-4 semanas',
      },
      {
        title: 'Desarrollo',
        description:
          'Código limpio y escalable en web, móvil y backend. Entrega continua en sprints.',
        duration: '6-12 semanas',
      },
      {
        title: 'Lanzamiento',
        description:
          'Despliegue, monitorización e iteración. Aseguramos que tu producto triunfe tras el lanzamiento.',
        duration: 'Continuo',
      },
    ],
    ctaTitle: '¿Listo para empezar tu proyecto?',
    ctaText: 'Hablemos de cómo podemos ayudarte a hacer realidad tu visión.',
    ctaButton: 'Contacta',
  },
  portfolio: {
    eyebrow: 'Trabajo Seleccionado',
    headingTop: 'Proyectos que',
    headingAccent: 'rompen límites',
    ctaText: '¿Quieres ver más?',
    ctaLink: 'Hablemos',
  },
  about: {
    eyebrow: 'Sobre nosotros',
    headingTop: 'Equipo pequeño.',
    headingAccent: 'Gran impacto.',
    p1: 'Somos un estudio de 4 personas con base en Cataluña, España. Construimos productos digitales con la precisión de una agencia y el alma de una startup.',
    p2: 'Sin equipos inflados. Sin reuniones interminables. Solo ejecución enfocada de gente que se preocupa de verdad por el resultado.',
    location: 'CATALUÑA, ESPAÑA',
    founded: 'Fundado',
    stats: [
      { value: '100%', label: 'Ingenieros Senior' },
      { value: '0', label: 'Gestores de Cuenta' },
      { value: '2sem', label: 'Ciclos de Sprint' },
      { value: '24h', label: 'Tiempo de Respuesta' },
    ],
    teamRoles: [
      'Líder de Producto',
      'Ingeniero Principal',
      'Dev Full-Stack',
      'Diseñador UX',
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    headingTop: 'Construyamos',
    headingAccent: 'algo grande',
    intro:
      '¿Tienes un proyecto en mente? Nos encantaría conocerlo. Escríbenos y te responderemos en 24 horas.',
    location: 'Cataluña, España',
    nameLabel: 'Tu nombre',
    emailLabel: 'Tu email',
    messageLabel: 'Cuéntanos sobre tu proyecto',
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
    eyebrow: 'Estudi de Producte de Programari',
    line1: 'CREEM',
    line2: 'PRODUCTES',
    line3: 'QUE IMPORTEN',
    subtitle:
      'Estudi de producte de programari que crea experiències digitals excepcionals per a tothom i a tot arreu.',
    ctaWork: 'Veure el Nostre Treball',
    ctaContact: 'Iniciar un Projecte',
    scroll: 'Desplaça',
  },
  services: {
    eyebrow: 'Què fem',
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
        title: 'Descobriment',
        description:
          'Aprofundim en la teva visió, usuaris i mercat. Recerca, entrevistes i planificació estratègica.',
        duration: '1-2 setmanes',
      },
      {
        title: 'Disseny',
        description:
          'De wireframes a prototips d’alta fidelitat. Interfícies intuïtives i atractives.',
        duration: '2-4 setmanes',
      },
      {
        title: 'Desenvolupament',
        description:
          'Codi net i escalable en web, mòbil i backend. Lliurament continu en sprints.',
        duration: '6-12 setmanes',
      },
      {
        title: 'Llançament',
        description:
          'Desplegament, monitoratge i iteració. Assegurem que el teu producte triomfi després del llançament.',
        duration: 'Continu',
      },
    ],
    ctaTitle: 'A punt per començar el teu projecte?',
    ctaText: 'Parlem de com podem ajudar-te a fer realitat la teva visió.',
    ctaButton: 'Contacta',
  },
  portfolio: {
    eyebrow: 'Treball Seleccionat',
    headingTop: 'Projectes que',
    headingAccent: 'trenquen límits',
    ctaText: 'Vols veure’n més?',
    ctaLink: 'Parlem-ne',
  },
  about: {
    eyebrow: 'Sobre nosaltres',
    headingTop: 'Equip petit.',
    headingAccent: 'Gran impacte.',
    p1: 'Som un estudi de 4 persones amb base a Catalunya, Espanya. Construïm productes digitals amb la precisió d’una agència i l’ànima d’una startup.',
    p2: 'Sense equips inflats. Sense reunions interminables. Només execució enfocada de gent que es preocupa de debò pel resultat.',
    location: 'CATALUNYA, ESPANYA',
    founded: 'Fundat',
    stats: [
      { value: '100%', label: 'Enginyers Sènior' },
      { value: '0', label: 'Gestors de Compte' },
      { value: '2set', label: 'Cicles de Sprint' },
      { value: '24h', label: 'Temps de Resposta' },
    ],
    teamRoles: [
      'Líder de Producte',
      'Enginyer Principal',
      'Dev Full-Stack',
      'Dissenyador UX',
    ],
  },
  contact: {
    eyebrow: 'Contacte',
    headingTop: 'Construïm',
    headingAccent: 'alguna cosa gran',
    intro:
      'Tens un projecte en ment? Ens encantaria conèixer-lo. Escriu-nos i et respondrem en 24 hores.',
    location: 'Catalunya, Espanya',
    nameLabel: 'El teu nom',
    emailLabel: 'El teu correu',
    messageLabel: 'Explica’ns el teu projecte',
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
