import type { ComponentType, SVGProps } from 'react'
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiAngular,
  SiNextdotjs,
  SiExpo,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiFirebase,
  SiSupabase,
  SiPrisma,
  SiDrizzle,
  SiMobx,
  SiReactquery,
  SiZod,
  SiTailwindcss,
  SiMui,
  SiAstro,
  SiRailway,
  SiVercel,
  SiCloudflare,
  SiExpress,
  SiSentry,
  SiPosthog,
  SiGrafana,
  SiPino,
  SiJest,
  SiVitest,
  SiFramer,
  SiReactrouter,
  SiSwagger,
  SiEslint,
  SiPrettier,
  SiGithubactions,
  SiResend,
  SiRedis,
  SiAnthropic,
  SiClaude,
  SiOpenai,
} from 'react-icons/si'
import { Box, Database, FlaskConical, Languages } from 'lucide-react'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

/**
 * Tech → logo. Brand glyphs come from simple-icons (react-icons/si). Techs with no
 * simple-icons mark fall back to a contextual lucide glyph (storage, testing, i18n…).
 */
const ICONS: Record<string, Icon> = {
  // Core
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  React: SiReact,
  'React Native': SiReact,
  Angular: SiAngular,
  'Next.js': SiNextdotjs,
  Expo: SiExpo,
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  // Frontend / architecture
  Prisma: SiPrisma,
  'Drizzle ORM': SiDrizzle,
  Zustand: Box,
  MobX: SiMobx,
  'TanStack Query': SiReactquery,
  Zod: SiZod,
  'Tailwind CSS': SiTailwindcss,
  'Material UI': SiMui,
  Astro: SiAstro,
  Railway: SiRailway,
  Vercel: SiVercel,
  'AWS S3': Database,
  'Cloudflare DNS': SiCloudflare,
  Express: SiExpress,
  Sentry: SiSentry,
  PostHog: SiPosthog,
  'Grafana Cloud': SiGrafana,
  Pino: SiPino,
  Jest: SiJest,
  Vitest: SiVitest,
  Playwright: FlaskConical,
  'Framer Motion': SiFramer,
  i18next: Languages,
  'react-router-dom': SiReactrouter,
  Swagger: SiSwagger,
  ESLint: SiEslint,
  Prettier: SiPrettier,
  'GitHub Actions': SiGithubactions,
  Resend: SiResend,
  Redis: SiRedis,
  // AI
  'Anthropic API': SiAnthropic,
  'Claude Agent SDK': SiClaude,
  'OpenAI API': SiOpenai,
}

// Bento mosaic on a 4-column grid: two large 2×2 anchors (Frontend, Data) with
// wide and small tiles packed around them via grid-flow-dense. Indexed to the
// dictionary order (Languages, Frontend, Mobile, Backend, Data, DevOps, Testing,
// Observability, AI) so it stays correct across locales.
const SPANS = [
  '', // Languages
  'lg:col-span-2 lg:row-span-2', // Frontend
  '', // Mobile
  'lg:col-span-2', // Backend
  'lg:col-span-2 lg:row-span-2', // Data & Storage
  'lg:col-span-2', // DevOps & CI/CD
  '', // Testing
  'lg:col-span-2', // Observability & APIs
  '', // AI
]

export function TechBento({
  groups,
}: {
  groups: { category: string; items: string[] }[]
}) {
  return (
    <div className="grid auto-rows-[minmax(170px,auto)] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, i) => (
        <div
          key={group.category}
          className={`flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[#9268f6]/40 sm:p-7 ${SPANS[i] ?? ''}`}
        >
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[11px] text-[#9a82d6]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-white">
              {group.category}
            </h3>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-7">
            {group.items.map((tech) => {
              const TechIcon = ICONS[tech] ?? Box
              return (
                <div
                  key={tech}
                  className="group/tech flex w-16 flex-col items-center gap-2.5 text-center"
                >
                  <TechIcon
                    className="h-9 w-9 text-white/85 transition-colors group-hover/tech:text-[#9268f6]"
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.06em] text-white/60">
                    {tech}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
