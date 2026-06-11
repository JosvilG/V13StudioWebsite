"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { useT } from "@/components/i18n-provider"
import type { SheetProject } from "@/lib/content"

const isYear = (s: string) => /^\d{4}$/.test(s)
const clamp = (x: number) => Math.max(0, Math.min(1, x))

/** Normalize an angle to [-180, 180]. */
function normalizeAngle(a: number) {
  a = ((a % 360) + 360) % 360
  return a > 180 ? a - 360 : a
}

export function Portfolio({ projects }: { projects: SheetProject[] }) {
  const t = useT()

  const allLabel = t.portfolio.all

  // Filter tabs: All, then years (desc), then categories
  const tabs = useMemo(() => {
    const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort((a, b) =>
      b.localeCompare(a)
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
        : p.category === activeTab || p.tags.includes(activeTab)
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

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length])

  const N = filtered.length
  // shallow fixed arc → side cards stay more face-on, and the arc rotates
  const step = 20
  const radius = N <= 1 ? 0 : Math.round(190 / Math.tan(((step / 2) * Math.PI) / 180))

  // Reveal the section only after the white-out is total (big-bang hand-off)
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = sectionRef.current
    const slot = el?.closest("[data-stack-index]") as HTMLElement | null
    const container = el?.closest("[data-section-stack]") as HTMLElement | null
    if (!el || !slot || !container) return
    const spanStart = parseFloat(slot.dataset.spanStart || "3")
    let raf = 0
    const tick = () => {
      const scrollable = container.offsetHeight - window.innerHeight
      const totalSpan = parseFloat(container.dataset.totalSpan || "7")
      const pos =
        scrollable > 0 ? ((window.scrollY - container.offsetTop) / scrollable) * (totalSpan - 1) : 0
      el.style.opacity = String(clamp((pos - (spanStart + 0.34)) / 0.2)) // 3.34 -> 3.54
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#040507] py-16"
    >
      {/* Volumetric smoke behind the carousel — full-bleed */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* large, diffuse, bright light source (fills the centre — no dark hole) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 54% at 50% 47%, rgba(224,235,255,0.82) 0%, rgba(186,205,242,0.4) 30%, rgba(130,152,196,0.12) 58%, transparent 84%)",
            filter: "blur(58px)",
          }}
        />
        {/* brighter luminous core */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(20% 22% at 50% 47%, rgba(235,243,255,0.7) 0%, rgba(200,218,250,0.28) 45%, transparent 72%)",
            filter: "blur(34px)",
          }}
        />
        {/* big, textured smoke clouds (screen-blended, present through the centre) */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "radial-gradient(60% 64% at 50% 47%, #000 0%, #000 34%, rgba(0,0,0,0.55) 64%, transparent 86%)",
            maskImage:
              "radial-gradient(60% 64% at 50% 47%, #000 0%, #000 34%, rgba(0,0,0,0.55) 64%, transparent 86%)",
            mixBlendMode: "screen",
          }}
        >
          <div
            className="absolute inset-[-18%]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='760'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0042 0.0065' numOctaves='6' seed='9'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.7 0 0 0 0 0.75 0 0 0 0 0.86 0 0 0 1.25 -0.58'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)'/%3E%3C/svg%3E\")",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "blur(4px)",
              opacity: 0.6,
              animation: "hero-fog-drift-1 95s ease-in-out infinite",
            }}
          />
          <div
            className="absolute inset-[-18%]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='760'%3E%3Cfilter id='s2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0072 0.011' numOctaves='6' seed='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.62 0 0 0 0 0.68 0 0 0 0 0.82 0 0 0 1.2 -0.62'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s2)'/%3E%3C/svg%3E\")",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "blur(7px)",
              opacity: 0.38,
              animation: "hero-fog-drift-2 130s ease-in-out infinite reverse",
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h2
        className="relative z-10 mb-2 text-center text-5xl font-medium text-white sm:text-6xl md:text-7xl"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {t.portfolio.headingTop}
      </h2>

      {/* Rotating cylindrical carousel */}
      <div
        className="relative z-10 flex w-full flex-1 items-center justify-center"
        style={{ perspective: "1600px" }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${-active * step}deg)`,
            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
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
                  transition: "opacity 0.6s ease",
                  pointerEvents: abs < 30 ? "auto" : "none",
                  backfaceVisibility: "hidden",
                }}
              >
                <article className="w-[360px] rounded-[22px] border border-white/20 bg-white/[0.08] p-7 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl">
                  <h3
                    className="text-[26px] leading-tight text-white"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    {project.description}
                  </p>
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-6 inline-flex rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
                    >
                      {t.portfolio.viewProject}
                    </a>
                  ) : (
                    <span className="mt-6 inline-flex rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90">
                      {t.portfolio.viewProject}
                    </span>
                  )}
                </article>
              </div>
            )
          })}
        </div>

        {/* Card nav arrows */}
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

      {/* Filter tabs */}
      {tabs.length > 0 && (
        <div className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-center gap-3 border-t border-white/10 px-4 pt-5">
          <button
            aria-label="Previous category"
            onClick={() => goTab(-1)}
            className="shrink-0 text-white/40 transition-colors hover:text-white"
          >
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
                style={{
                  fontFamily: "var(--font-serif)",
                  color: activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.35)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            aria-label="Next category"
            onClick={() => goTab(1)}
            className="shrink-0 text-white/40 transition-colors hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Scroll hint */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-2">
        <svg className="h-4 w-4 animate-bounce text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/45">
          {t.portfolio.scroll}
        </span>
      </div>
    </section>
  )
}
