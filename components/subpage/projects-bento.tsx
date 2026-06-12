import type { SheetProject } from '@/lib/content'

// Repeating bento rhythm: a couple of large tiles among smaller ones. `grid-flow-dense`
// backfills gaps, so the pattern stays tidy for any project count.
const SPANS = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
]

/**
 * Bento grid of project cards, reusing the homepage Work section's glass card
 * styling (rounded, blurred, light border, serif title). Replaces the 3D
 * carousel with a static, full-width-of-content bento layout.
 */
export function ProjectsBento({
  projects,
  viewProject,
}: {
  projects: SheetProject[]
  viewProject: string
}) {
  return (
    <div className="grid auto-rows-[minmax(210px,auto)] grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {projects.map((p, i) => (
        <article
          key={p.id}
          className={`flex h-full flex-col rounded-[22px] border border-white/20 bg-white/[0.08] p-7 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-colors duration-300 hover:border-[#9268f6]/40 ${SPANS[i % SPANS.length]}`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[26px] leading-tight text-white" style={{ fontFamily: 'var(--font-serif)' }}>
              {p.title}
            </h3>
            {p.year ? <span className="shrink-0 font-mono text-[11px] text-white/40">{p.year}</span> : null}
          </div>
          {p.category ? (
            <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a82d6]">
              {p.category}
            </span>
          ) : null}
          {p.description ? (
            <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">{p.description}</p>
          ) : (
            <div className="flex-1" />
          )}
          {p.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
            >
              {viewProject}
            </a>
          ) : (
            <span className="mt-6 inline-flex w-fit rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90">
              {viewProject}
            </span>
          )}
        </article>
      ))}
    </div>
  )
}
