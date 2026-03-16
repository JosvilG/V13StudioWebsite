"use client"

import { useEffect, useState, useCallback } from "react"
import { navigateToSection } from "@/lib/navigate-stack"

const sections = ["Home", "Services", "Work", "Process", "About", "Contact"]

// Map labels to navigation targets (section ids used by navigateToSection)
const sectionHrefs = ["#hero", "#services", "#work", "#process", "#about", "#contact"]

export function ScrollProgress() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const stack = document.querySelector("[data-section-stack]") as HTMLElement | null
      if (!stack) return

      const total = Number(stack.dataset.sectionCount) || 1
      const rect = stack.getBoundingClientRect()
      const containerHeight = stack.offsetHeight
      const scrollableDistance = containerHeight - window.innerHeight

      if (scrollableDistance <= 0) return

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(total - 1, (scrolled / scrollableDistance) * (total - 1)))
      setActiveIndex(Math.round(progress))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = useCallback((index: number) => {
    if (index === 0) {
      // For hero, scroll to top via Lenis
      const lenis = (window as unknown as Record<string, unknown>).__lenis as {
        scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void
      } | undefined

      if (lenis) {
        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        })
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      navigateToSection(sectionHrefs[index])
    }
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
      {/* Vertical connecting line */}
      <div
        className="absolute w-px bg-border"
        style={{
          top: 4,
          bottom: 4,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Dots */}
      <div className="relative flex flex-col items-center" style={{ gap: 24 }}>
        {sections.map((label, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={label}
              onClick={() => handleClick(index)}
              className="relative flex items-center group"
              aria-label={`Navigate to ${label}`}
            >
              {/* Label (left of dot) */}
              <span
                className="absolute right-full mr-3 text-[10px] font-mono text-primary tracking-wider whitespace-nowrap transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(4px)",
                  pointerEvents: "none",
                }}
              >
                {label}
              </span>

              {/* Dot */}
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary scale-125"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                style={
                  isActive
                    ? { boxShadow: "0 0 8px var(--glow-purple-strong)" }
                    : undefined
                }
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
