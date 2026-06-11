"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useT } from "@/components/i18n-provider"

const LogoCanvas = dynamic(() => import("@/components/hero-3d/logo-canvas"), {
  ssr: false,
})

/** Desktop + WebGL + motion-allowed gate for the heavier 3D hero. */
function can3D(): boolean {
  if (typeof window === "undefined") return false
  if (window.innerWidth < 1024) return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  try {
    const canvas = document.createElement("canvas")
    return !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    )
  } catch {
    return false
  }
}

export function Hero({ hasProjects: _hasProjects }: { hasProjects: boolean }) {
  const t = useT()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [use3D, setUse3D] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    setUse3D(can3D())
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // stay bright while the logo rushes in, then fade as the camera passes through it
  const fade = Math.max(0, Math.min(1, 1 - (scrollY - 250) / 650))

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-6"
    >
      {/* Smoke / fog drifting layers */}
      <div className="pointer-events-none absolute inset-0 hero-smoke-1" />
      <div className="pointer-events-none absolute inset-0 hero-smoke-2" />

      {/* Soft light source behind the logo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 44%, rgba(196,210,238,0.14) 0%, rgba(120,135,170,0.05) 35%, transparent 70%)",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, transparent 22%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.96) 100%)",
        }}
      />

      {/* 3D: full-viewport canvas so the logo can fly in / through without box edges */}
      {use3D && (
        <div
          className="hero-3d-stage"
          style={{
            opacity: loaded ? fade : 0,
            transition: "opacity 1.6s cubic-bezier(0.16,1,0.3,1)",
          }}
          role="img"
          aria-label="V13 Studio"
        >
          <LogoCanvas />
        </div>
      )}

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ opacity: fade, marginTop: "-4vh" }}
      >
        {/* CSS chrome logo (fallback path only; 3D uses the full-viewport stage above) */}
        {!use3D && (
          <div
            className="hero-logo-wrap"
            style={{
              opacity: loaded ? 1 : 0,
              transform: `scale(${loaded ? 1 : 0.94})`,
              transition: "opacity 1.6s cubic-bezier(0.16,1,0.3,1), transform 1.8s cubic-bezier(0.16,1,0.3,1)",
            }}
            role="img"
            aria-label="V13 Studio"
          >
            <span className="hero-metallic-depth" />
            <span className="hero-metallic-face" />
          </div>
        )}

        {/* Tagline (under the CSS logo; for 3D it is pinned near the bottom instead) */}
        {!use3D && (
          <p
            className="mt-12 text-center text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{t.hero.eyebrow}</span>
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 0.5rem" }}>—</span>
            {t.hero.subtitle}
          </p>
        )}
      </div>

      {/* 3D tagline pinned near the bottom (kept clear of the centered mesh) */}
      {use3D && (
        <p
          className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em]"
          style={{ color: "rgba(255,255,255,0.55)", opacity: fade }}
        >
          <span style={{ color: "rgba(255,255,255,0.85)" }}>{t.hero.eyebrow}</span>
          <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 0.5rem" }}>—</span>
          {t.hero.subtitle}
        </p>
      )}

      {/* Scroll to explore */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: Math.max(0, 1 - scrollY / 200) * 0.7 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
          {t.hero.scroll}
        </span>
        <svg
          className="h-4 w-4 animate-bounce text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
