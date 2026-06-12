/**
 * Bento grid of the studio's tech stack, grouped by class (Frontend, Backend,
 * Cloud, DevOps…). Cells vary in size for the bento look; each cell lists its
 * technologies as chips. Static markup — no carousel.
 */

// Per-index span overrides give the asymmetric bento rhythm on large screens.
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
    <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-5 flex flex-wrap gap-2">
            {group.items.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
