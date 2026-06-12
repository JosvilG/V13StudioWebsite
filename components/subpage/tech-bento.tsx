import type { ComponentType, SVGProps } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiPostgresql,
  SiVercel,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
} from 'react-icons/si'
import { Cloud } from 'lucide-react'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

/**
 * Tech → logo. Brand glyphs come from simple-icons (react-icons/si). AWS, Azure
 * and React Native have no simple-icons brand mark (trademark removal / none), so
 * they fall back to a neutral cloud / the React mark. Anything unmapped uses Cloud.
 */
const ICONS: Record<string, Icon> = {
  React: SiReact,
  'React Native': SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  Python: SiPython,
  PostgreSQL: SiPostgresql,
  AWS: Cloud,
  Azure: Cloud,
  Vercel: SiVercel,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  'CI/CD': SiGithubactions,
}

// Per-index spans: a 4×2 bento — Frontend fills the tall-wide block, Backend a
// wide tile, Cloud + DevOps the two remaining cells.
const SPANS = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
]

export function TechBento({
  groups,
}: {
  groups: { category: string; items: string[] }[]
}) {
  return (
    <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, i) => (
        <div
          key={group.category}
          className={`flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-[#9268f6]/40 ${SPANS[i] ?? ''}`}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#9268f6]/70" />
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#9a82d6]">
              {group.category}
            </h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-7">
            {group.items.map((tech) => {
              const TechIcon = ICONS[tech] ?? Cloud
              return (
                <div
                  key={tech}
                  className="group/tech flex w-16 flex-col items-center gap-2.5 text-center"
                >
                  <TechIcon
                    className="h-9 w-9 text-white/85 transition-colors group-hover/tech:text-[#9268f6]"
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.08em] text-white/60">
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
