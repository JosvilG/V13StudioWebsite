'use client'

import { useMemo, useState } from 'react'
import type { SheetProject } from '@/lib/content'

const isYear = (s: string) => /^\d{4}$/.test(s)

/**
 * Project grid for the /work subpage, styled to match the homepage Work section:
 * glassmorphic cards (rounded, blurred, light border), serif titles, and serif
 * category tabs. Static responsive grid + category/year filter (no 3D carousel).
 */
export function WorkGrid({
  projects,
  allLabel,
  viewProject,
  emptyText,
}: {
  projects: SheetProject[]
  allLabel: string
  viewProject: string
  emptyText: string
}) {
  const tabs = useMemo(() => {
    const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort((a, b) =>
      b.localeCompare(a),
    )
    const cats = [...new Set(projects.map((p) => p.category).filter(Boolean))]
    return [allLabel, ...years, ...cats]
  }, [projects, allLabel])

  const [activeTab, setActiveTab] = useState(allLabel)

  const filtered = useMemo(() => {
    if (activeTab === allLabel) return projects
    return projects.filter((p) =>
      isYear(activeTab)
        ? p.year === activeTab
        : p.category === activeTab || p.tags.includes(activeTab),
    )
  }, [projects, activeTab, allLabel])

  if (projects.length === 0) {
    return (
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/45">{emptyText}</p>
    )
  }

  return (
    <div>
      {tabs.length > 1 && (
        <div className="mb-12 flex flex-wrap items-center gap-x-7 gap-y-2 border-b border-white/10 pb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="whitespace-nowrap text-lg transition-colors duration-300 sm:text-xl"
              style={{
                fontFamily: 'var(--font-serif)',
                color: activeTab === tab ? '#ffffff' : 'rgba(255,255,255,0.35)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-[22px] border border-white/20 bg-white/[0.08] p-7 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-colors duration-300 hover:border-[#9268f6]/40"
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
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-fit rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
              >
                {viewProject}
              </a>
            ) : (
              <span className="mt-7 inline-flex w-fit rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90">
                {viewProject}
              </span>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
