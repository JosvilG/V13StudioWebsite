'use client'

import { useMemo, useState } from 'react'
import type { SheetProject } from '@/lib/content'

const isYear = (s: string) => /^\d{4}$/.test(s)

/**
 * Static project grid with category/year filter tabs. Filter logic mirrors
 * components/sections/work.tsx but renders a plain responsive grid (no 3D
 * carousel). `allLabel` and `viewProject` come from the dictionary.
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
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-mono text-xs uppercase tracking-[0.16em] transition-colors"
              style={{ color: activeTab === tab ? '#9268f6' : 'rgba(255,255,255,0.4)' }}
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
            className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-colors duration-300 hover:border-[#9268f6]/40"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl leading-tight text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                {p.title}
              </h3>
              {p.year ? <span className="shrink-0 font-mono text-[11px] text-white/35">{p.year}</span> : null}
            </div>
            {p.category ? (
              <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a82d6]">
                {p.category}
              </span>
            ) : null}
            {p.description ? (
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{p.description}</p>
            ) : null}
            {p.tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">
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
                className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#9268f6] transition-opacity hover:opacity-80"
              >
                {viewProject}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
