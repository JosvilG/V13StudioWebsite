"use client"

import { useState, useRef, useEffect, useMemo, type CSSProperties } from "react"
import dynamic from "next/dynamic"
import { useT } from "@/components/i18n-provider"
import { can3D } from "@/lib/can-3d"
import { transition } from "@/lib/transition-store"
import { ServicesBackdrop } from "./services-backdrop"

const V13Feature = dynamic(() => import("@/components/hero-3d/v13-feature"), {
  ssr: false,
})

const clamp = (x: number) => Math.max(0, Math.min(1, x))
const BURST_COUNT = 28

export function Services() {
  const t = useT()
  const sectionRef = useRef<HTMLDivElement>(null)
  const stmtRef = useRef<HTMLDivElement>(null)
  const capRef = useRef<HTMLDivElement>(null)
  const v13Ref = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const smokeRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(false)
  const [use3D, setUse3D] = useState(false)

  const burst = useMemo(
    () =>
      Array.from({ length: BURST_COUNT }, () => ({
        a: Math.random() * 360,
        d: 180 + Math.random() * 560,
        s: 2 + Math.random() * 4,
        delay: Math.random() * 0.25,
      })),
    []
  )

  useEffect(() => {
    setUse3D(can3D())
    const id = requestAnimationFrame(() => {
      mountedRef.current = true
    })

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
        // big bang. PHASE 1: the V13 slowly collapses to a point (0.72..0.92).
        // PHASE 2: only after it's gone do smoke + particles burst (0.90..0.99).
        const collapseP = clamp((local - 0.72) / 0.2)
        const burstP = clamp((local - 0.9) / 0.09)
        if (stmtRef.current) {
          stmtRef.current.style.opacity = String(1 - out)
          stmtRef.current.style.transform = `translateY(${out * -28}px)`
        }
        if (capRef.current) {
          capRef.current.style.opacity = String(inn * (1 - clamp((local - 0.7) / 0.14)))
          capRef.current.style.transform = `translateY(${(1 - inn) * 28 - collapseP * 24}px)`
        }
        transition.collapse = collapseP
        if (v13Ref.current) {
          v13Ref.current.style.opacity = String(
            (mountedRef.current ? 1 : 0) * (1 - clamp((local - 0.74) / 0.16))
          )
        }
        if (smokeRef.current) {
          smokeRef.current.style.opacity = String(clamp((local - 0.9) / 0.05) * (1 - clamp((local - 0.99) / 0.05)))
          smokeRef.current.style.transform = `scale(${0.6 + burstP * 0.8})`
        }
        if (particlesRef.current) {
          particlesRef.current.style.setProperty("--burst", String(burstP))
          particlesRef.current.style.opacity = String(clamp((local - 0.9) / 0.04) * (1 - clamp((local - 0.99) / 0.04)))
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

      {/* Chrome V13 — shrinks to a point on exit (big-bang) */}
      {use3D && (
        <>
          <div
            ref={v13Ref}
            className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
            style={{ opacity: 0, willChange: "opacity" }}
          >
            <V13Feature />
          </div>

          {/* Smoke bloom (after the collapse) */}
          <div
            ref={smokeRef}
            className="pointer-events-none absolute inset-0 z-[3] hidden overflow-hidden lg:block"
            style={{ opacity: 0, transformOrigin: "50% 47%" }}
          >
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage: "radial-gradient(56% 60% at 50% 47%, #000 0%, #000 34%, transparent 84%)",
                maskImage: "radial-gradient(56% 60% at 50% 47%, #000 0%, #000 34%, transparent 84%)",
                mixBlendMode: "screen",
              }}
            >
              <div
                className="absolute inset-[-18%]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='760'%3E%3Cfilter id='ds'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0045 0.007' numOctaves='6' seed='12'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.72 0 0 0 0 0.77 0 0 0 0 0.88 0 0 0 1.3 -0.5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ds)'/%3E%3C/svg%3E\")",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  filter: "blur(5px)",
                  opacity: 0.8,
                }}
              />
            </div>
          </div>

          {/* Particle burst */}
          <div
            ref={particlesRef}
            className="pointer-events-none absolute inset-0 z-[3] hidden lg:block"
            style={{ opacity: 0 }}
          >
            {burst.map((b, i) => (
              <span
                key={i}
                className="bigbang-particle"
                style={
                  {
                    "--a": `${b.a}deg`,
                    "--d": `${b.d}px`,
                    width: `${b.s}px`,
                    height: `${b.s}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

        </>
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
