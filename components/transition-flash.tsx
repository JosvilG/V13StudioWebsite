"use client"

import { useEffect, useRef } from "react"

const clamp = (x: number) => Math.max(0, Math.min(1, x))

/**
 * Full-screen white-out overlay (above everything) centred on the Services→Projects
 * boundary, driving the "big bang" flash: ramps to a total white, holds, then fades
 * to reveal the next section. Lives outside SectionStack so it covers the crossfade.
 */
export function TransitionFlash() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = document.querySelector("[data-section-stack]") as HTMLElement | null
    if (!container) return
    let raf = 0
    const tick = () => {
      const scrollable = container.offsetHeight - window.innerHeight
      const totalSpan = parseFloat(container.dataset.totalSpan || "7")
      const scrolled = window.scrollY - container.offsetTop
      const pos = scrollable > 0 ? (scrolled / scrollable) * (totalSpan - 1) : 0
      // Services spans [1,3] → boundary to Projects at pos = 3. White starts only
      // after the V13 has collapsed, reaches TOTAL white, holds, then fades.
      const up = clamp((pos - 2.92) / 0.16) // 2.92 -> 3.08 (full white, after the burst)
      const down = clamp((pos - 3.34) / 0.3) // 3.34 -> 3.64 (reveal Projects)
      if (ref.current) ref.current.style.opacity = String(up * (1 - down))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] hidden bg-white lg:block"
      style={{ opacity: 0 }}
    />
  )
}
