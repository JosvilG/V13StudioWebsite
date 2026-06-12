'use client'

import { useEffect, useRef } from 'react'

const clamp = (x: number) => Math.max(0, Math.min(1, x))

/**
 * Self-contained scroll crossfade echoing the homepage Services section: the
 * "statement" (what we do + stack) holds, then as you scroll it crossfades into
 * the "capabilities" heading. A tall wrapper with a sticky inner gives the scroll
 * room; progress is read from the wrapper's own position (no SectionStack needed).
 */
export function ServicesHero({
  statementHeading,
  statementBody,
  stack,
  capHeading,
}: {
  statementHeading: string
  statementBody: string
  stack: string[]
  capHeading: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stmtRef = useRef<HTMLDivElement>(null)
  const capRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let raf = 0
    const tick = () => {
      const dist = wrap.offsetHeight - window.innerHeight
      const p = dist > 0 ? clamp((window.scrollY - wrap.offsetTop) / dist) : 0
      const out = clamp((p - 0.15) / 0.35) // statement leaves 0.15..0.50
      const inn = clamp((p - 0.45) / 0.35) // capabilities arrives 0.45..0.80
      if (stmtRef.current) {
        stmtRef.current.style.opacity = String(1 - out)
        stmtRef.current.style.transform = `translateY(${out * -24}px)`
      }
      if (capRef.current) {
        capRef.current.style.opacity = String(inn)
        capRef.current.style.transform = `translateY(${(1 - inn) * 24}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={wrapRef} className="relative h-[160vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="relative w-full max-w-2xl">
          {/* Statement */}
          <div ref={stmtRef} className="absolute inset-x-0" style={{ willChange: 'opacity, transform' }}>
            <h2 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              {statementHeading}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              {statementBody}
            </p>
            <ul className="mt-8 space-y-1.5">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-[#9268f6]"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities heading (crossfades in) */}
          <div
            ref={capRef}
            className="absolute inset-x-0"
            style={{ opacity: 0, willChange: 'opacity, transform' }}
          >
            <h2 className="text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
              {capHeading}
            </h2>
            <p className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#9268f6]">
              <span className="h-px w-8 bg-[#9268f6]/70" />
              Scroll
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
