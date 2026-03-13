"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Header() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Theme toggle - fixed top right */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center border border-border bg-background/80 backdrop-blur-xl hover:border-primary hover:bg-primary/10 transition-all duration-300"
        aria-label="Toggle theme"
      >
        {mounted && (
          theme === "dark" ? (
            /* Sun icon */
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            /* Moon icon */
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )
        )}
      </button>

      {/* Scroll to top - fixed bottom right */}
      <button
        onClick={() => {
          const lenis = (window as unknown as Record<string, unknown>).__lenis as {
            scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void
          } | undefined
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        }}
        className={cn(
          "fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center",
          "border border-border bg-background/80 backdrop-blur-xl",
          "hover:border-primary hover:bg-primary/10 transition-all duration-300",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}
