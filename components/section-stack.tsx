"use client"

import React, { ReactNode, Children, useEffect, useState, useRef } from "react"

interface SectionStackProps {
  children: ReactNode
}

/**
 * Full-screen parallax stack with fade transitions (desktop only).
 *
 * On mobile (< 768px) renders children in normal document flow — standard scroll.
 * On desktop, all sections are stacked in the same position with fade transitions.
 */
export function SectionStack({ children }: SectionStackProps) {
  const items = Children.toArray(children)
  const total = items.length
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const smoothVelocityRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (isMobile) return // No stack logic on mobile

    let prevProgress = 0
    let prevTime = performance.now()

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRef.current.offsetHeight
      const scrollableDistance = containerHeight - window.innerHeight

      if (scrollableDistance <= 0) return

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(total - 1, (scrolled / scrollableDistance) * (total - 1)))

      // Smoothed velocity (exponential moving average)
      const now = performance.now()
      const dt = now - prevTime
      if (dt > 0) {
        const instantVelocity = Math.abs(progress - prevProgress) / (dt / 1000)
        smoothVelocityRef.current = smoothVelocityRef.current * 0.7 + instantVelocity * 0.3
      }
      prevProgress = progress
      prevTime = now

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [total, isMobile])

  // ── Mobile: normal flow, no stack ──
  if (isMobile) {
    return (
      <div data-section-stack data-section-count={total}>
        {items.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    )
  }

  // ── Desktop: stacked with fade transitions ──
  const velocity = smoothVelocityRef.current

  return (
    <div
      ref={containerRef}
      data-section-stack
      data-section-count={total}
      style={{ height: `${total * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {items.map((child, index) => {
          const opacity = getSectionOpacity(scrollProgress, index, total, velocity)
          const isVisible = opacity > 0.005

          // Faster CSS transition when scrolling fast → snappier switch
          // Slower CSS transition on slow scroll → imperceptible (scroll drives it)
          const isFast = velocity > 1.5
          const transitionMs = isFast ? 350 : 150

          return (
            <div
              key={index}
              data-stack-index={index}
              className="absolute inset-0 will-change-[opacity] overflow-y-auto"
              style={{
                zIndex: index + 1,
                opacity: isVisible ? opacity : 0,
                visibility: isVisible ? "visible" : "hidden",
                pointerEvents: opacity > 0.5 ? "auto" : "none",
                transition: `opacity ${transitionMs}ms ease-out, visibility 0ms ${isVisible ? "0ms" : `${transitionMs}ms`}`,
              }}
            >
              {child}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Compute per-section opacity based on scroll progress.
 *
 * Slow scroll  → smooth crossfade (hold 55%, fade 45%)
 * Fast scroll  → only show nearest section (CSS transition smooths the switch)
 * Medium speed → blend between both modes for a seamless feel
 */
function getSectionOpacity(
  progress: number,
  index: number,
  total: number,
  velocity: number
): number {
  // --- Crossfade opacity (normal slow scroll) ---
  const crossfade = getCrossfadeOpacity(progress, index, total)

  // --- Snap opacity (fast scroll — only nearest section) ---
  const nearest = Math.round(progress)
  const snap = index === nearest ? 1 : 0

  // --- Blend between crossfade and snap based on speed ---
  // Below 1.0 s/s → pure crossfade
  // Above 3.0 s/s → pure snap
  const blendFactor = Math.min(1, Math.max(0, (velocity - 1.0) / 2.0))

  return crossfade * (1 - blendFactor) + snap * blendFactor
}

/** Standard crossfade: hold for 55% of each slot, then fade over 45%. */
function getCrossfadeOpacity(progress: number, index: number, total: number): number {
  const local = progress - index
  const holdEnd = 0.55
  const fadeRange = 1 - holdEnd

  // Fade OUT
  let fadeOut = 1
  if (index < total - 1) {
    if (local > holdEnd) {
      fadeOut = 1 - Math.min(1, (local - holdEnd) / fadeRange)
    } else if (local < 0) {
      fadeOut = 0
    }
  }

  // Fade IN
  let fadeIn = 1
  if (index > 0) {
    const prevLocal = progress - (index - 1)
    if (prevLocal < holdEnd) {
      fadeIn = 0
    } else if (prevLocal < 1) {
      fadeIn = Math.min(1, (prevLocal - holdEnd) / fadeRange)
    } else {
      fadeIn = 1
    }
  }

  return Math.max(0, Math.min(1, fadeOut * fadeIn))
}
