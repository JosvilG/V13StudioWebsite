"use client"

import React, { ReactNode, Children, useEffect, useState, useRef } from "react"

interface SectionStackProps {
  children: ReactNode
  /** Per-section scroll weight in viewports (default 1). A section with span 2
   *  stays pinned for two viewports of scroll, useful for in-section transitions. */
  spans?: number[]
}

/**
 * Full-screen crossfade stack (desktop). Each section occupies `span` viewports
 * of scroll; adjacent sections crossfade at their shared boundary, while a single
 * section holds (no fade) across its whole span — so a section can drive its own
 * scroll-linked content (e.g. a text swap) with the scene staying constant.
 *
 * On mobile (< 768px) renders children in normal document flow.
 */
export function SectionStack({ children, spans }: SectionStackProps) {
  const items = Children.toArray(children)
  const total = items.length
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0) // scroll position in viewport units
  const [isMobile, setIsMobile] = useState(false)

  // span layout
  const spanArr = items.map((_, i) => spans?.[i] ?? 1)
  const starts: number[] = []
  let acc = 0
  for (const s of spanArr) {
    starts.push(acc)
    acc += s
  }
  const totalSpan = acc

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollable = containerRef.current.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const scrolled = -rect.top
      // position in viewport units (0 .. totalSpan-1)
      const p = Math.max(0, Math.min(totalSpan - 1, (scrolled / scrollable) * (totalSpan - 1)))
      setPos(p)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile, totalSpan])

  if (isMobile) {
    return (
      <div data-section-stack data-section-count={total} data-total-span={totalSpan}>
        {items.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    )
  }

  const H = 0.42 // crossfade half-width (viewport units)

  return (
    <div
      ref={containerRef}
      data-section-stack
      data-section-count={total}
      data-total-span={totalSpan}
      style={{ height: `${totalSpan * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {items.map((child, index) => {
          const start = starts[index]
          const end = start + spanArr[index]
          // fade in at the left boundary (from previous), fade out at the right (to next)
          const fadeIn = index === 0 ? 1 : clamp01((pos - (start - H)) / (2 * H))
          const fadeOut = index === total - 1 ? 1 : 1 - clamp01((pos - (end - H)) / (2 * H))
          const opacity = Math.max(0, Math.min(fadeIn, fadeOut))
          const isVisible = opacity > 0.005

          return (
            <div
              key={index}
              data-stack-index={index}
              data-span-start={start}
              data-span={spanArr[index]}
              className="absolute inset-0 overflow-y-auto will-change-[opacity]"
              style={{
                zIndex: index + 1,
                opacity: isVisible ? opacity : 0,
                visibility: isVisible ? "visible" : "hidden",
                pointerEvents: opacity > 0.5 ? "auto" : "none",
                transition: "opacity 120ms ease-out",
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

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x))
}
