"use client"

import { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { navigateToSection } from "@/lib/navigate-stack"
import { ThemeLogo } from "@/components/theme-logo"

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
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

  // Close menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const handleNav = useCallback((href: string) => {
    setIsOpen(false)
    // Small delay so menu closing animation starts before scroll
    setTimeout(() => {
      if (href === "#hero") {
        const lenis = (window as unknown as Record<string, unknown>).__lenis as {
          scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void
        } | undefined
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      } else {
        navigateToSection(href)
      }
    }, 150)
  }, [])

  const scrollToTop = useCallback(() => {
    const lenis = (window as unknown as Record<string, unknown>).__lenis as {
      scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void
    } | undefined
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  return (
    <>
      {/* ── Hamburger button — fixed top right ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-6 right-6 z-[60] w-10 h-10",
          "border border-border bg-background/80 backdrop-blur-xl",
          "hover:border-primary hover:bg-primary/10 transition-all duration-300",
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative w-4 h-4 mx-auto">
          <span
            className={cn(
              "absolute left-0 w-4 h-px bg-foreground transition-all duration-300 origin-center",
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-foreground transition-all duration-300",
              isOpen && "opacity-0 scale-x-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-4 h-px bg-foreground transition-all duration-300 origin-center",
              isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
            )}
          />
        </div>
      </button>

      {/* ── Backdrop overlay ── */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-background/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Side panel ── */}
      <nav
        className={cn(
          "fixed top-0 right-0 z-[58] h-full w-[50vw]",
          "bg-card/95 backdrop-blur-xl border-l border-border",
          "flex flex-col",
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Logo area */}
        <div className="px-8 pt-8 pb-4 border-b border-border">
          <ThemeLogo size={64} />
          <p className="text-xs text-muted-foreground font-mono mt-2 tracking-[0.3em]">STUDIO</p>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className={cn(
                    "w-full text-left py-3 flex items-center gap-4 group transition-all duration-300",
                    "hover:translate-x-2"
                  )}
                  style={{
                    transitionDelay: isOpen ? `${i * 50 + 100}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? undefined : "translateX(20px)",
                  }}
                >
                  <span className="text-xs font-mono text-primary/60 w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <span className="ml-auto w-0 group-hover:w-6 h-px bg-primary transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom section — theme toggle + info */}
        <div className="px-8 py-6 border-t border-border space-y-4">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "w-full flex items-center gap-3 py-3 px-4",
              "border border-border hover:border-primary/50 hover:bg-primary/5",
              "transition-all duration-300"
            )}
          >
            {mounted && (
              theme === "dark" ? (
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )
            )}
            <span className="text-sm font-medium">
              {mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Toggle theme"}
            </span>
          </button>

          {/* Contact info */}
          <a
            href="mailto:hello@v13studio.com"
            className="block text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            hello@v13studio.com
          </a>
        </div>
      </nav>

      {/* ── Scroll to top — fixed bottom right ── */}
      <button
        onClick={scrollToTop}
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
