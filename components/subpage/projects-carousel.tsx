'use client'

import { useEffect, useMemo, useState } from 'react'
import type { SheetProject } from '@/lib/content'

const isYear = (s: string) => /^\d{4}$/.test(s)

/** Normalize an angle to [-180, 180]. */
function normalizeAngle(a: number) {
  a = ((a % 360) + 360) % 360
  return a > 180 ? a - 360 : a
}

/**
 * Faithful copy of the homepage Work section's Projects view: the 3D cylinder
 * carousel of glass cards, prev/next controls, keyboard nav and the serif
 * category tabs. The scroll choreography (Process → Nosotros) is dropped — here
 * it's a standalone, always-interactive carousel for the /work subpage.
 */
export function ProjectsCarousel({
  projects,
  heading,
  allLabel,
  viewProject,
}: {
  projects: SheetProject[]
  heading: string
  allLabel: string
  viewProject: string
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
    const byTab = projects.filter((p) =>
      isYear(activeTab)
        ? p.year === activeTab
        : p.category === activeTab || p.tags.includes(activeTab),
    )
    return byTab.length ? byTab : projects
  }, [projects, activeTab, allLabel])

  const [active, setActive] = useState(0)
  useEffect(() => {
    setActive(Math.floor(filtered.length / 2))
  }, [activeTab, filtered.length])

  const go = (d: number) =>
    setActive((a) => Math.max(0, Math.min(filtered.length - 1, a + d)))
  const goTab = (d: number) => {
    const idx = tabs.indexOf(activeTab)
    setActiveTab(tabs[(idx + d + tabs.length) % tabs.length])
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length])

  const N = filtered.length
  const step = 20
  const radius = N <= 1 ? 0 : Math.round(190 / Math.tan(((step / 2) * Math.PI) / 180))

  return (
    <div className="flex min-h-[88vh] flex-col items-center justify-center py-10">
      <h2
        className="relative z-10 mb-2 text-center text-5xl font-medium text-white sm:text-6xl md:text-7xl"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {heading}
      </h2>

      <div className="relative z-10 flex w-full flex-1 items-center justify-center" style={{ perspective: '1600px' }}>
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${radius}px) rotateY(${-active * step}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {filtered.map((project, i) => {
            const eff = normalizeAngle((i - active) * step)
            const abs = Math.abs(eff)
            const visible = abs < 66
            return (
              <div
                key={project.id}
                onClick={() => setActive(i)}
                className="absolute left-0 top-0 cursor-pointer"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                  opacity: visible ? Math.max(0, 1 - (abs / 66) * 0.62) : 0,
                  zIndex: Math.round(Math.cos((eff * Math.PI) / 180) * 100),
                  transition: 'opacity 0.6s ease',
                  pointerEvents: abs < 30 ? 'auto' : 'none',
                  backfaceVisibility: 'hidden',
                }}
              >
                <article className="w-[360px] rounded-[22px] border border-white/20 bg-white/[0.08] p-7 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
                  <h3 className="text-[26px] leading-tight text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{project.description}</p>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-6 inline-flex rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
                    >
                      {viewProject}
                    </a>
                  ) : (
                    <span className="mt-6 inline-flex rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90">
                      {viewProject}
                    </span>
                  )}
                </article>
              </div>
            )
          })}
        </div>

        {filtered.length > 1 && (
          <>
            <button
              aria-label="Previous project"
              onClick={() => go(-1)}
              disabled={active === 0}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition-all hover:border-white/40 hover:text-white disabled:opacity-25 sm:left-10"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              aria-label="Next project"
              onClick={() => go(1)}
              disabled={active === filtered.length - 1}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition-all hover:border-white/40 hover:text-white disabled:opacity-25 sm:right-10"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {tabs.length > 0 && (
        <div className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-center gap-3 border-t border-white/10 px-4 pt-5">
          <button aria-label="Previous category" onClick={() => goTab(-1)} className="shrink-0 text-white/40 transition-colors hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-x-7 gap-y-2 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="whitespace-nowrap text-lg transition-colors duration-300 sm:text-xl"
                style={{ fontFamily: 'var(--font-serif)', color: activeTab === tab ? '#ffffff' : 'rgba(255,255,255,0.35)' }}
              >
                {tab}
              </button>
            ))}
          </div>
          <button aria-label="Next category" onClick={() => goTab(1)} className="shrink-0 text-white/40 transition-colors hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
