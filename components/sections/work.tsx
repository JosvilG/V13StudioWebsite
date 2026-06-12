"use client"

import { useMemo, useState, useEffect, useRef, type CSSProperties } from "react"
import { useT } from "@/components/i18n-provider"
import type { SheetProject } from "@/lib/content"
import { WorkMobile } from "./work-mobile"

const isYear = (s: string) => /^\d{4}$/.test(s)
const clamp = (x: number) => Math.max(0, Math.min(1, x))

/** Normalize an angle to [-180, 180]. */
function normalizeAngle(a: number) {
  a = ((a % 360) + 360) % 360
  return a > 180 ? a - 360 : a
}

// Process timeline node positions (0..1 along the central line) + label side.
const NODES = [
  { f: 0.07, side: "right" as const },
  { f: 0.37, side: "left" as const },
  { f: 0.63, side: "right" as const },
  { f: 0.93, side: "left" as const },
]

/**
 * Projects → Process → Nosotros as ONE pinned section (no crossfades, fully
 * choreographed). Sequence over the section's scroll span:
 *  1. Projects carousel, fading out into a persistent central glow.
 *  2. A blue seed point grows, stretches into the central rail.
 *  3. PROCESO title, then the pulse descends revealing each item, then the V13.
 *  4. The rail stretches to full screen height and OPENS sideways like curtains,
 *     revealing the scroll-scrubbed "Nosotros" video underneath.
 */
export function Work({ projects }: { projects: SheetProject[] }) {
  const t = useT()
  const allLabel = t.portfolio.all
  const steps = t.process.steps.slice(0, 4)
  const pillars = t.about.pillars.slice(0, 3)

  const tabs = useMemo(() => {
    const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort((a, b) =>
      b.localeCompare(a)
    )
    const cats = [...new Set(projects.map((p) => p.category).filter(Boolean))]
    return [allLabel, ...years, ...cats]
  }, [projects, allLabel])

  const [activeTab, setActiveTab] = useState(allLabel)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])

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
  const step = 20
  const radius = N <= 1 ? 0 : Math.round(190 / Math.tan(((step / 2) * Math.PI) / 180))

  // ── choreography refs ──
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const smokeRef = useRef<HTMLDivElement>(null)
  const pfRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const lineWrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])
  const seamRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const aboutOverlayRef = useRef<HTMLDivElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    const video = videoRef.current
    const slot = el?.closest("[data-stack-index]") as HTMLElement | null
    const container = el?.closest("[data-section-stack]") as HTMLElement | null
    let raf = 0
    let duration = 0

    if (video) {
      const onMeta = () => {
        duration = video.duration || 0
      }
      video.addEventListener("loadedmetadata", onMeta)
      if (video.readyState >= 1) onMeta()
    }

    const spanStart = slot ? parseFloat(slot.dataset.spanStart || "3") : 3
    const span = slot ? parseFloat(slot.dataset.span || "6") : 6

    const apply = (local: number) => {
      // ── PROJECTS ──
      const pfIn = clamp((local - 0.055) / 0.04)
      const pfOut = clamp((local - 0.21) / 0.05)
      const smokeIn = clamp((local - 0.055) / 0.05)
      // ── PROCESS ──
      const introP = clamp((local - 0.25) / 0.03) // seed point
      const drawP = clamp((local - 0.29) / 0.07) // rail draws centre-out
      const titleP = clamp((local - 0.38) / 0.03) // PROCESO title, alone
      const moveP = clamp((local - 0.41) / 0.13) // pulse descends, items appear
      const gridP = clamp((local - 0.41) / 0.1)
      const logoP = clamp((local - 0.55) / 0.03) // ghost V13, last
      // ── PROCESS → NOSOTROS transition ──
      const stretchP = clamp((local - 0.66) / 0.06) // rail → full-screen height
      const openP = clamp((local - 0.73) / 0.07) // curtains open sideways
      // ── NOSOTROS ──
      const aboutReveal = clamp((local - 0.8) / 0.05)
      const videoLocal = clamp((local - 0.74) / 0.26)
      const pFade = 1 - stretchP // process scene dissolves as the rail stretches

      if (pfRef.current) {
        pfRef.current.style.opacity = String(pfIn * (1 - pfOut))
        pfRef.current.style.pointerEvents = local > 0.21 || local < 0.06 ? "none" : "auto"
      }
      if (smokeRef.current) {
        const smokeBase = smokeIn * (1 - 0.5 * clamp((local - 0.38) / 0.2))
        smokeRef.current.style.opacity = String(smokeBase * pFade)
      }
      if (gridRef.current) gridRef.current.style.opacity = String(gridP * pFade)
      if (ghostRef.current) ghostRef.current.style.opacity = String(logoP * pFade)
      if (titleRef.current) titleRef.current.style.opacity = String(titleP * pFade)
      if (footerRef.current) footerRef.current.style.opacity = String(logoP * pFade)
      if (lineWrapRef.current) lineWrapRef.current.style.opacity = String(introP * pFade)

      if (railRef.current) {
        railRef.current.style.transform = `scaleY(${drawP})`
        railRef.current.style.opacity = String(0.4 + drawP * 0.6)
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = String(introP * (1 - clamp((drawP - 0.5) / 0.5)))
        dotRef.current.style.transform = `translate(-50%, -50%) scale(${0.6 + introP * 0.7})`
      }
      if (fillRef.current) fillRef.current.style.height = `${moveP * 100}%`
      if (headRef.current) {
        headRef.current.style.top = `${Math.min(moveP, 0.985) * 100}%`
        headRef.current.style.opacity = String(clamp(moveP * 8) * (moveP < 0.99 ? 1 : 0))
      }
      NODES.forEach((n, i) => {
        const a = clamp((moveP - (n.f - 0.04)) / 0.08)
        const node = nodeRefs.current[i]
        const label = labelRefs.current[i]
        if (node) {
          node.style.setProperty("--on", String(a))
          node.style.opacity = String(a * pFade)
          node.style.transform = `translate(-50%, -50%) scale(${0.7 + a * 0.55})`
        }
        if (label) {
          label.style.opacity = String(a * pFade)
          label.style.transform = `translateY(-50%) translateX(${n.side === "right" ? (1 - a) * 14 : (1 - a) * -14}px)`
        }
      })

      // full-screen seam line: grows in during stretch, then vanishes the instant
      // the curtains begin to part (fully gone by ~6% open).
      if (seamRef.current) {
        seamRef.current.style.opacity = String(openP > 0 ? stretchP * (1 - clamp(openP / 0.06)) : stretchP)
        seamRef.current.style.transform = `scaleY(${0.52 + 0.48 * stretchP})`
      }
      // curtains open sideways
      if (leftPanelRef.current) leftPanelRef.current.style.transform = `translateX(${-100 * openP}%)`
      if (rightPanelRef.current) rightPanelRef.current.style.transform = `translateX(${100 * openP}%)`

      // about content + video
      if (aboutOverlayRef.current) aboutOverlayRef.current.style.opacity = String(openP)
      if (aboutContentRef.current) aboutContentRef.current.style.opacity = String(aboutReveal)
      if (video && duration > 0) {
        const target = videoLocal * (duration - 0.05)
        if (Math.abs(video.currentTime - target) > 0.03) video.currentTime = target
      }
    }

    if (slot && container) {
      const tick = () => {
        const p = (window.scrollY - container.offsetTop) / window.innerHeight
        apply(clamp((p - spanStart) / span))
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    } else {
      apply(1)
      if (video) {
        video.loop = true
        video.muted = true
        video.play().catch(() => {})
      }
    }
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  if (isMobile) return <WorkMobile projects={projects} />

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04060a]"
    >
      <div id="process" className="pointer-events-none absolute" aria-hidden />
      <div id="about" className="pointer-events-none absolute" aria-hidden />

      {/* ── Nosotros video (revealed when the curtains open) ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/background.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
        style={{ filter: "grayscale(0.35) brightness(0.55) contrast(1.05)" }}
      />
      <div
        ref={aboutOverlayRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          opacity: 0,
          background:
            "linear-gradient(180deg, rgba(5,7,12,0.78) 0%, rgba(5,7,12,0.6) 40%, rgba(5,7,12,0.8) 100%), radial-gradient(120% 90% at 50% 45%, transparent 42%, rgba(3,5,9,0.85) 100%)",
        }}
      />

      {/* ── Curtains: two dark panels covering the video; they slide apart ── */}
      <div ref={leftPanelRef} className="absolute inset-y-0 left-0 z-10 w-1/2 bg-[#04060a]" />
      <div ref={rightPanelRef} className="absolute inset-y-0 right-0 z-10 w-1/2 bg-[#04060a]" />

      {/* ── Shared persistent glow (Projects + Process) ── */}
      <div ref={smokeRef} className="pointer-events-none absolute inset-0 z-20 overflow-hidden" style={{ opacity: 0 }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 54% at 50% 47%, rgba(224,235,255,0.82) 0%, rgba(186,205,242,0.4) 30%, rgba(130,152,196,0.12) 58%, transparent 84%)",
            filter: "blur(58px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(20% 22% at 50% 47%, rgba(235,243,255,0.7) 0%, rgba(200,218,250,0.28) 45%, transparent 72%)",
            filter: "blur(34px)",
          }}
        />
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

      {/* ── Process blueprint grid ── */}
      <div ref={gridRef} className="pointer-events-none absolute inset-0 z-20" style={{ opacity: 0 }}>
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(90,130,190,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90,130,190,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(120% 90% at 50% 50%, #000 30%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(120% 90% at 50% 50%, #000 30%, transparent 85%)",
          }}
        />
      </div>

      {/* ── Ghost V13 wordmark (appears last in Process) ── */}
      <div ref={ghostRef} className="pointer-events-none absolute inset-0 z-20" style={{ opacity: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-light.png"
          alt=""
          aria-hidden
          className="absolute left-1/2 top-1/2 w-[42vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07]"
          style={{ filter: "blur(0.5px)" }}
        />
      </div>

      {/* ── PROJECTS foreground ── */}
      <div ref={pfRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center py-16" style={{ opacity: 0 }}>
        <h2
          className="relative z-10 mb-2 text-center text-5xl font-medium text-white sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {t.portfolio.headingTop}
        </h2>

        <div className="relative z-10 flex w-full flex-1 items-center justify-center" style={{ perspective: "1600px" }}>
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
                    <h3 className="text-[26px] leading-tight text-white" style={{ fontFamily: "var(--font-serif)" }}>
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
                  style={{ fontFamily: "var(--font-serif)", color: activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.35)" }}
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

        <div className="relative z-10 mt-8 flex flex-col items-center gap-2">
          <svg className="h-4 w-4 animate-bounce text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/45">{t.portfolio.scroll}</span>
        </div>
      </div>

      {/* ── PROCESS title ── */}
      <div ref={titleRef} className="absolute inset-x-0 top-[8vh] z-30 text-center" style={{ opacity: 0 }}>
        <h2 className="text-3xl font-semibold uppercase tracking-[0.4em] text-white sm:text-4xl md:text-5xl">
          {t.process.headingAccent}
        </h2>
      </div>

      {/* ── PROCESS central timeline ── */}
      <div ref={lineWrapRef} className="absolute left-1/2 top-[27%] z-30 h-[52%] w-0" style={{ opacity: 0 }}>
        <div
          ref={railRef}
          className="absolute left-[-1.5px] top-0 h-full w-[3px]"
          style={{
            transformOrigin: "50% 50%",
            transform: "scaleY(0)",
            background:
              "linear-gradient(to bottom, rgba(176,150,250,0.55), rgba(146,104,246,0.7) 50%, rgba(176,150,250,0.55))",
            boxShadow: "0 0 12px 1px rgba(146,104,246,0.55)",
          }}
        />
        <div
          ref={fillRef}
          className="absolute left-[-1.5px] top-0 w-[3px]"
          style={{
            height: "0%",
            background:
              "linear-gradient(to bottom, rgba(176,150,250,0) 0%, rgba(176,150,250,1) 24%, rgba(202,191,255,1) 100%)",
            boxShadow: "0 0 18px 4px rgba(176,150,250,0.9), 0 0 40px 8px rgba(146,104,246,0.45)",
          }}
        />
        <div
          ref={dotRef}
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-white"
          style={{
            opacity: 0,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 24px 10px rgba(146,104,246,0.9), 0 0 60px 18px rgba(146,104,246,0.4)",
          }}
        />
        <div
          ref={headRef}
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ top: "0%", opacity: 0, boxShadow: "0 0 16px 5px rgba(176,150,250,0.95)" }}
        />

        {NODES.map((n, i) => {
          const stepItem = steps[i]
          if (!stepItem) return null
          return (
            <div key={i}>
              <div
                ref={(r) => {
                  nodeRefs.current[i] = r
                }}
                className="bp-node absolute left-1/2 top-0 h-3 w-3 rounded-full"
                style={{ top: `${n.f * 100}%`, opacity: 0 } as CSSProperties}
              />
              <div
                ref={(r) => {
                  labelRefs.current[i] = r
                }}
                className="bp-label absolute top-0 w-[40vw] max-w-[260px]"
                style={
                  {
                    top: `${n.f * 100}%`,
                    [n.side === "right" ? "left" : "right"]: "28px",
                    textAlign: n.side === "right" ? "left" : "right",
                    opacity: 0,
                  } as CSSProperties
                }
              >
                {i === 0 && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/logo-light.png" alt="" aria-hidden className="mb-1 inline-block h-3 w-auto opacity-70" />
                )}
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white sm:text-base">{stepItem.title}</h3>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-[#9a82d6] sm:text-xs">{stepItem.tagline}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── PROCESS footer ── */}
      <div ref={footerRef} className="absolute inset-x-0 bottom-[6vh] z-30 text-center" style={{ opacity: 0 }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35 sm:text-[11px]">
          V13 Studio — Next-Generation Software &amp; Digital Products
        </p>
      </div>

      {/* ── Full-screen seam line (the rail stretched to the whole screen) ── */}
      <div
        ref={seamRef}
        className="pointer-events-none absolute left-1/2 top-0 z-40 h-full w-[3px]"
        style={{
          opacity: 0,
          transformOrigin: "50% 50%",
          transform: "scaleY(0.52)",
          marginLeft: "-1.5px",
          background:
            "linear-gradient(to bottom, rgba(176,150,250,0.2), rgba(176,150,250,0.95) 50%, rgba(176,150,250,0.2))",
          boxShadow: "0 0 22px 5px rgba(176,150,250,0.9), 0 0 60px 12px rgba(146,104,246,0.4)",
        }}
      />

      {/* ── NOSOTROS content (over the revealed video) ── */}
      <div
        ref={aboutContentRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: 0 }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <h2 className="text-5xl font-bold uppercase tracking-[0.16em] text-white sm:text-6xl md:text-7xl">
            {t.about.title}
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-xl md:text-2xl">
            {t.about.statement}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">{t.about.intro}</p>

          <div className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/12">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex flex-col items-center px-6">
                <span className="mb-3 block h-px w-10 bg-[#9a82d6]/70" />
                <h3 className="text-base font-bold uppercase tracking-[0.22em] text-white sm:text-lg">{pillar.title}</h3>
                <p className="mt-2 max-w-[17rem] text-sm leading-relaxed text-white/60">{pillar.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40 sm:text-[11px]">
            V13 Studio — Next-Generation Software &amp; Digital Products
          </p>
        </div>
      </div>
    </section>
  )
}
