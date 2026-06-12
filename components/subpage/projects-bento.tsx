'use client'

import { useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { cn } from '@/lib/utils'
import type { SheetProject } from '@/lib/content'

/**
 * Toggle state inside a View Transition so the browser animates the card's box
 * resize (and the surrounding reflow) — not just the inner content. Falls back to
 * an instant state change where the API is unsupported.
 */
function withViewTransition(update: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void
  }
  if (doc.startViewTransition) {
    doc.startViewTransition(() => flushSync(update))
  } else {
    update()
  }
}

interface Labels {
  client: string
  role: string
  challenge: string
  result: string
  viewProject: string
}

// Repeating bento rhythm for collapsed tiles. `grid-flow-dense` backfills gaps.
const SPANS = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
  'lg:col-span-1',
]

/**
 * Bento grid of project cards (homepage Work-section glass styling). Clicking a
 * card expands it full-width to reveal the project's details; clicking again
 * collapses it back to the basics. One card open at a time.
 */
export function ProjectsBento({
  projects,
  labels,
}: {
  projects: SheetProject[]
  labels: Labels
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="grid auto-rows-[minmax(210px,auto)] grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {projects.map((p, i) => {
        const open = openId === p.id
        return (
          <article
            key={p.id}
            role="button"
            tabIndex={0}
            aria-expanded={open}
            onClick={() => withViewTransition(() => setOpenId(open ? null : p.id))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                withViewTransition(() => setOpenId(open ? null : p.id))
              }
            }}
            style={{ viewTransitionName: `proj-${i}` } as CSSProperties}
            className={cn(
              'flex h-full cursor-pointer flex-col rounded-[22px] border border-white/20 bg-white/[0.08] p-7 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-colors duration-300 hover:border-[#9268f6]/40',
              open ? 'col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-1' : SPANS[i % SPANS.length],
            )}
          >
            {/* header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[26px] leading-tight text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                  {p.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a82d6]">
                  {p.year ? <span className="text-white/40">{p.year}</span> : null}
                  {p.category ? <span>{p.category}</span> : null}
                </div>
              </div>
              <span
                className={cn(
                  'mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/60 transition-transform duration-300',
                  open && 'rotate-45',
                )}
                aria-hidden
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </div>

            {/* collapsed: basic info — collapses away (grid-rows 1fr→0fr) when open */}
            <div
              className={cn(
                'grid transition-all duration-500 ease-out',
                open ? 'mt-0 grid-rows-[0fr] opacity-0' : 'mt-4 flex-1 grid-rows-[1fr] opacity-100',
              )}
            >
              <div className="overflow-hidden">
                {p.description ? (
                  <p className="line-clamp-3 text-sm leading-relaxed text-white/55">{p.description}</p>
                ) : null}
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
              </div>
            </div>

            {/* expanded: full details — reveals (grid-rows 0fr→1fr) when open */}
            <div
              className={cn(
                'grid transition-all duration-500 ease-out',
                open ? 'mt-6 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="grid gap-8 border-t border-white/10 pt-6 lg:grid-cols-[0.8fr_1.2fr]">
                {/* meta column */}
                <div>
                  {p.client || p.role ? (
                    <dl className="space-y-3">
                      {p.client ? (
                        <div>
                          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{labels.client}</dt>
                          <dd className="mt-0.5 text-sm text-white/75">{p.client}</dd>
                        </div>
                      ) : null}
                      {p.role ? (
                        <div>
                          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{labels.role}</dt>
                          <dd className="mt-0.5 text-sm text-white/75">{p.role}</dd>
                        </div>
                      ) : null}
                    </dl>
                  ) : null}

                  {p.tags.length > 0 ? (
                    <div className={cn('flex flex-wrap gap-2', (p.client || p.role) && 'mt-6')}>
                      {p.tags.map((tag) => (
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
                      onClick={(e) => e.stopPropagation()}
                      className="mt-7 inline-flex w-fit rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
                    >
                      {labels.viewProject}
                    </a>
                  ) : null}
                </div>

                {/* content column */}
                <div>
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.title}
                      className="mb-5 aspect-[16/9] w-full rounded-2xl border border-white/10 object-cover"
                    />
                  ) : null}
                  {p.description ? (
                    <p className="text-base leading-relaxed text-white/70">{p.description}</p>
                  ) : null}
                  {p.challenge ? (
                    <div className="mt-6 border-l-2 border-[#9268f6]/50 pl-5">
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9a82d6]">{labels.challenge}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{p.challenge}</p>
                    </div>
                  ) : null}
                  {p.result ? (
                    <div className="mt-5 border-l-2 border-white/15 pl-5">
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{labels.result}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{p.result}</p>
                    </div>
                  ) : null}
                </div>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
