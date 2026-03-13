"use client"

import React, { ReactNode, Children, useEffect, useState, useRef } from "react"

interface SectionStackProps {
  children: ReactNode
}

/**
 * Full-screen parallax stack with fade transitions.
 *
 * All sections are stacked in the same position. A tall scroll container
 * creates scroll space. Each section stays fully visible for a "hold" period,
 * then quickly cross-fades to the next one.
 *
 * During fast scrolling (programmatic navigation or quick wheel), intermediate
 * sections are skipped to avoid an ugly flash-through effect.
 */
export function SectionStack({ children }: SectionStackProps) {
  const items = Children.toArray(children)
  const total = items.length
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const prevProgressRef = useRef(0)
  const prevTimeRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRef.current.offsetHeight
      const scrollableDistance = containerHeight - window.innerHeight

      if (scrollableDistance <= 0) return

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(total - 1, (scrolled / scrollableDistance) * (total - 1)))

      const now = performance.now()
      const dt = now - prevTimeRef.current
      if (dt > 0) {
        const velocity = Math.abs(progress - prevProgressRef.current) / (dt / 1000)
        setScrollVelocity(velocity)
      }
      prevProgressRef.current = progress
      prevTimeRef.current = now

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [total])

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
          const opacity = getSectionOpacity(scrollProgress, index, total, scrollVelocity)
          const isVisible = opacity > 0.01

          return (
            <div
              key={index}
              data-stack-index={index}
              className="absolute inset-0 will-change-transform overflow-y-auto"
              style={{
                zIndex: index + 1,
                opacity: isVisible ? opacity : 0,
                visibility: isVisible ? "visible" : "hidden",
                pointerEvents: opacity > 0.5 ? "auto" : "none",
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
 * Each section "slot" goes from index to index+1 in scrollProgress.
 *
 * Within that slot:
 * - First 55%: section is fully visible (hold)
 * - Last 45%: section fades out while next fades in (crossfade)
 *
 * When scrolling fast (velocity > threshold), we only show the section
 * nearest to the current progress, hiding intermediate ones to prevent
 * the ugly flash-through effect.
 */
function getSectionOpacity(
  progress: number,
  index: number,
  total: number,
  velocity: number
): number {
  // When scrolling very fast, snap to nearest section instead of crossfading
  // This prevents the "flash through all sections" effect
  const fastThreshold = 2.5 // sections per second
  if (velocity > fastThreshold) {
    const nearest = Math.round(progress)
    // Only show the nearest section at full opacity
    if (index === nearest) return 1
    // Also slightly show the section we're moving towards for a smoother feel
    const direction = progress - Math.floor(progress)
    const target = direction > 0.5 ? Math.ceil(progress) : Math.floor(progress)
    if (index === target && index !== nearest) return 0.3
    return 0
  }

  // Normal slow-scroll crossfade behavior
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
