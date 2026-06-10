import type { Locale } from './i18n/config'

export type BlogBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }

/** A post resolved for a single locale. */
export interface BlogPost {
  slug: string
  title: string
  description: string
  /** ISO date, e.g. 2026-06-10 */
  date: string
  author: string
  tags: string[]
  /** Estimated reading time in minutes */
  readingTime: number
  body: BlogBlock[]
}

interface LocalizedPost {
  slug: string
  date: string
  author: string
  tags: string[]
  readingTime: number
  title: Record<Locale, string>
  description: Record<Locale, string>
  body: Record<Locale, BlogBlock[]>
}

/**
 * Blog posts with per-locale content. Add new entries here
 * (or migrate to MDX/CMS later). Each post becomes an indexable
 * /[locale]/blog/[slug] route and a sitemap entry.
 */
const localizedPosts: LocalizedPost[] = [
  {
    slug: 'how-we-build-digital-products',
    date: '2026-06-10',
    author: 'V13 Studio',
    tags: ['Product Strategy', 'Software Development', 'Process'],
    readingTime: 4,
    title: {
      en: 'How We Build Digital Products, From Strategy to Deployment',
      es: 'Cómo Construimos Productos Digitales, de la Estrategia al Despliegue',
      ca: 'Com Construïm Productes Digitals, de l’Estratègia al Desplegament',
    },
    description: {
      en: 'Inside the V13 Studio process: how a small, senior team takes a product from idea to launch — strategy, design, engineering, and AI.',
      es: 'Dentro del proceso de V13 Studio: cómo un equipo pequeño y senior lleva un producto de la idea al lanzamiento — estrategia, diseño, ingeniería e IA.',
      ca: 'Dins del procés de V13 Studio: com un equip petit i sènior porta un producte de la idea al llançament — estratègia, disseny, enginyeria i IA.',
    },
    body: {
      en: [
        {
          type: 'p',
          text: 'V13 Studio is a digital product studio based in Catalonia, Spain. We design and build software end to end — mobile, web, and backend — for founders and teams who want senior people on their product, not a handoff to juniors.',
        },
        { type: 'h2', text: 'Start with strategy, not screens' },
        {
          type: 'p',
          text: 'Before any pixel or line of code, we dive into your vision, market, and users to craft a roadmap that makes sense. Validating the right problem early is the cheapest way to avoid building the wrong product.',
        },
        { type: 'h2', text: 'Design that earns its pixels' },
        {
          type: 'p',
          text: 'Interfaces should feel intuitive and look stunning, with every pixel serving a purpose. We work in design systems so the product stays consistent as it grows.',
        },
        { type: 'h2', text: 'Engineering built to scale' },
        {
          type: 'p',
          text: 'We ship native-feeling apps with React Native, fast and accessible web experiences with Next.js, and scalable APIs with NestJS. One senior team owns the whole stack, so nothing gets lost between strategy and deployment.',
        },
        { type: 'h2', text: 'AI where it actually helps' },
        {
          type: 'p',
          text: 'We integrate intelligent features powered by modern AI — not as a buzzword, but where it removes real friction for your users. Want to build something together? Get in touch at hello@v13studio.com.',
        },
      ],
      es: [
        {
          type: 'p',
          text: 'V13 Studio es un estudio de producto digital con base en Cataluña, España. Diseñamos y construimos software de principio a fin — móvil, web y backend — para fundadores y equipos que quieren gente senior en su producto, no una delegación a juniors.',
        },
        { type: 'h2', text: 'Empieza por la estrategia, no por las pantallas' },
        {
          type: 'p',
          text: 'Antes de un solo píxel o línea de código, profundizamos en tu visión, mercado y usuarios para crear una hoja de ruta con sentido. Validar pronto el problema correcto es la forma más barata de evitar construir el producto equivocado.',
        },
        { type: 'h2', text: 'Diseño que justifica cada píxel' },
        {
          type: 'p',
          text: 'Las interfaces deben sentirse intuitivas y verse espectaculares, con cada píxel cumpliendo un propósito. Trabajamos con sistemas de diseño para que el producto se mantenga coherente mientras crece.',
        },
        { type: 'h2', text: 'Ingeniería pensada para escalar' },
        {
          type: 'p',
          text: 'Lanzamos apps con sensación nativa con React Native, experiencias web rápidas y accesibles con Next.js, y APIs escalables con NestJS. Un único equipo senior gestiona todo el stack, así nada se pierde entre la estrategia y el despliegue.',
        },
        { type: 'h2', text: 'IA donde realmente ayuda' },
        {
          type: 'p',
          text: 'Integramos funciones inteligentes impulsadas por IA moderna — no como reclamo, sino donde elimina fricción real para tus usuarios. ¿Quieres construir algo juntos? Escríbenos a hello@v13studio.com.',
        },
      ],
      ca: [
        {
          type: 'p',
          text: 'V13 Studio és un estudi de producte digital amb base a Catalunya, Espanya. Dissenyem i construïm programari de principi a fi — mòbil, web i backend — per a fundadors i equips que volen gent sènior al seu producte, no una delegació a juniors.',
        },
        { type: 'h2', text: 'Comença per l’estratègia, no per les pantalles' },
        {
          type: 'p',
          text: 'Abans d’un sol píxel o línia de codi, aprofundim en la teva visió, mercat i usuaris per crear un full de ruta amb sentit. Validar aviat el problema correcte és la manera més barata d’evitar construir el producte equivocat.',
        },
        { type: 'h2', text: 'Disseny que justifica cada píxel' },
        {
          type: 'p',
          text: 'Les interfícies han de sentir-se intuïtives i veure’s espectaculars, amb cada píxel complint un propòsit. Treballem amb sistemes de disseny perquè el producte es mantingui coherent mentre creix.',
        },
        { type: 'h2', text: 'Enginyeria pensada per escalar' },
        {
          type: 'p',
          text: 'Llancem apps amb sensació nativa amb React Native, experiències web ràpides i accessibles amb Next.js, i APIs escalables amb NestJS. Un únic equip sènior gestiona tot l’stack, així res no es perd entre l’estratègia i el desplegament.',
        },
        { type: 'h2', text: 'IA on realment ajuda' },
        {
          type: 'p',
          text: 'Integrem funcions intel·ligents impulsades per IA moderna — no com a reclam, sinó on elimina fricció real per als teus usuaris. Vols construir alguna cosa junts? Escriu-nos a hello@v13studio.com.',
        },
      ],
    },
  },
]

function resolve(post: LocalizedPost, locale: Locale): BlogPost {
  return {
    slug: post.slug,
    date: post.date,
    author: post.author,
    tags: post.tags,
    readingTime: post.readingTime,
    title: post.title[locale] ?? post.title.en,
    description: post.description[locale] ?? post.description.en,
    body: post.body[locale] ?? post.body.en,
  }
}

export function getAllPosts(locale: Locale): BlogPost[] {
  return localizedPosts
    .map((p) => resolve(p, locale))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | undefined {
  const post = localizedPosts.find((p) => p.slug === slug)
  return post ? resolve(post, locale) : undefined
}

/** Locale-independent list of slugs, for generateStaticParams. */
export function getPostSlugs(): string[] {
  return localizedPosts.map((p) => p.slug)
}
