"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { useT } from "@/components/i18n-provider"
import { can3D } from "@/lib/can-3d"
import { ServicesBackdrop } from "./services-backdrop"

const V13Feature = dynamic(() => import("@/components/hero-3d/v13-feature"), {
  ssr: false,
})

const clamp = (x: number) => Math.max(0, Math.min(1, x))

export function Services() {
  const t = useT()
  const sectionRef = useRef<HTMLDivElement>(null)
  const stmtRef = useRef<HTMLDivElement>(null)
  const capRef = useRef<HTMLDivElement>(null)
  const [use3D, setUse3D] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setUse3D(can3D())
    const id = requestAnimationFrame(() => setMounted(true))

    // Drive the statement -> capabilities text crossfade from scroll WITHIN this
    // section (the V13 + backdrop stay constant; only the text swaps).
    const el = sectionRef.current
    const slot = el?.closest("[data-stack-index]") as HTMLElement | null
    const container = el?.closest("[data-section-stack]") as HTMLElement | null
    let raf = 0

    if (slot && container) {
      const spanStart = parseFloat(slot.dataset.spanStart || "1")
      const span = parseFloat(slot.dataset.span || "2")
      const tick = () => {
        // position in viewport units, then 0..1 across this (2-viewport) section
        const p = (window.scrollY - container.offsetTop) / window.innerHeight
        const local = Math.min(1, Math.max(0, (p - spanStart) / span))
        // sequential swap with dwell: statement (held) -> gap -> capabilities (held)
        const out = clamp((local - 0.4) / 0.13) // statement leaves 0.40..0.53
        const inn = clamp((local - 0.58) / 0.13) // capabilities arrives 0.58..0.71
        if (stmtRef.current) {
          stmtRef.current.style.opacity = String(1 - out)
          stmtRef.current.style.transform = `translateY(${out * -28}px)`
        }
        if (capRef.current) {
          capRef.current.style.opacity = String(inn)
          capRef.current.style.transform = `translateY(${(1 - inn) * 28}px)`
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(id)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const stackList = (
    <ul className="mt-8 space-y-1.5">
      {t.services.stack.map((tech) => (
        <li
          key={tech}
          className="font-mono text-xs uppercase tracking-[0.15em] text-gray-500 transition-colors hover:text-primary"
        >
          {tech}
        </li>
      ))}
    </ul>
  )

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#070a0e]/80 py-20"
    >
      <ServicesBackdrop />

      {/* Constant chrome V13 — full-screen canvas, never fades during the swap */}
      {use3D && (
        <div
          className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 2.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <V13Feature />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4">
        <div className="relative w-full max-w-md lg:h-[64vh]">
          {/* Statement */}
          <div
            ref={stmtRef}
            className="lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center"
            style={{ willChange: "opacity, transform" }}
          >
            <h2 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              {t.services.statementHeading}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.services.statementBody}
            </p>
            {stackList}
          </div>

          {/* Capabilities (crossfades in on scroll) */}
          <div
            ref={capRef}
            className="mt-16 opacity-100 lg:absolute lg:inset-0 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:opacity-0"
            style={{ willChange: "opacity, transform" }}
          >
            <h2 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              {t.services.headingTop} {t.services.headingAccent}
            </h2>
            <ul className="mt-8 space-y-4">
              {t.services.items.map((item, i) => (
                <li
                  key={item.title}
                  className="group border-l-2 border-white/10 pl-4 transition-colors duration-300 hover:border-[#22d3ee]"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-[#7c9fd6]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
