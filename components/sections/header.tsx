"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigateToSection } from "@/lib/navigate-stack"
import { ThemeLogo } from "@/components/theme-logo"
import { useT, useLocale } from "@/components/i18n-provider"
import { locales, localeNames } from "@/lib/i18n/config"
import { MenuV13 } from "./menu-v13"

export function Header({ hasProjects }: { hasProjects: boolean }) {
  const t = useT()
  const locale = useLocale()
  const pathname = usePathname()
  const navItems = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
    { label: t.nav.blog, href: `/${locale}/blog` },
    { label: t.nav.tools, href: "https://tools.v13studio.com" },
  ].filter((item) => hasProjects || item.href !== "#work")
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

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
    if (href.startsWith("http")) {
      setIsOpen(false)
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }
    // Internal route (e.g. /blog) — full navigation, not in-page anchor
    if (href.startsWith("/")) {
      setIsOpen(false)
      window.location.href = href
      return
    }
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
      {/* ── Logo — fixed top left ── */}
      <button
        onClick={() => handleNav("#hero")}
        className="fixed top-5 left-6 z-[60] flex items-center gap-2"
        aria-label="Go to home"
      >
        <ThemeLogo size={44} />
      </button>

      {/* ── Hamburger button — fixed top right ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-6 right-6 z-[60] w-10 h-10",
          "border border-white/15 bg-black/80 backdrop-blur-xl",
          "hover:border-[#9268f6] hover:bg-[#9268f6]/10 transition-all duration-300",
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="main-menu"
      >
        <div className="relative w-4 h-4 mx-auto">
          <span
            className={cn(
              "absolute left-0 w-4 h-px bg-white transition-all duration-300 origin-center",
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-white transition-all duration-300",
              isOpen && "opacity-0 scale-x-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-4 h-px bg-white transition-all duration-300 origin-center",
              isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
            )}
          />
        </div>
      </button>

      {/* ── Fullscreen overlay menu ── */}
      <nav
        id="main-menu"
        className={cn(
          "fixed inset-0 z-[58] bg-[#050505] overflow-hidden flex flex-col",
          "transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
      >
        {/* eyebrow — top left (desktop) */}
        <p className="absolute top-7 left-6 sm:left-10 md:left-16 z-20 hidden md:block text-[10px] font-mono uppercase tracking-[0.35em] text-white/55">
          {t.menu.eyebrow}
        </p>

        {/* two-column body */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col md:flex-row">
          {/* LEFT — nav */}
          <div className="flex flex-[1.05] flex-col justify-center px-6 sm:px-10 md:px-16 py-24 md:py-0">
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item, i) => {
                const isExternal = item.href.startsWith("http")
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNav(item.href)}
                      className="group flex w-full items-center gap-3 py-1.5 text-left transition-[opacity,transform] duration-300 hover:translate-x-2 focus-visible:translate-x-2 focus-visible:outline-none"
                      style={{
                        transitionDelay: isOpen ? `${i * 50 + 120}ms` : "0ms",
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? undefined : "translateY(24px)",
                      }}
                    >
                      <span className="font-sans font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,5vw,2.9rem)] text-white/70 transition-colors duration-300 group-hover:text-[#9268f6] group-focus-visible:text-[#9268f6]">
                        {item.label}
                      </span>
                      {isExternal && (
                        <svg
                          aria-hidden="true"
                          className="ml-1 h-5 w-5 -translate-x-2 text-white/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* RIGHT — living V13 signature */}
          <div className="pointer-events-none relative hidden flex-[0.95] items-center justify-center overflow-hidden md:flex md:border-l md:border-white/10">
            {/* purple ambient glow */}
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 55% at 55% 45%, rgba(146,104,246,0.16), transparent 70%)" }}
            />
            <MenuV13
              key={isOpen ? "open" : "closed"}
              open={isOpen}
              className="h-auto w-[min(85%,520px)] opacity-90 md:opacity-100"
            />
          </div>
        </div>

        {/* bottom bar */}
        <div className="relative z-10 flex flex-col gap-4 border-t border-white/10 px-6 sm:px-10 md:px-16 py-5 sm:flex-row sm:items-center sm:justify-between">
          {/* language switcher */}
          <div className="flex gap-2" role="group" aria-label="Language">
            {locales.map((lng) => {
              const segments = pathname.split("/")
              segments[1] = lng
              const href = segments.join("/") || `/${lng}`
              return (
                <a
                  key={lng}
                  href={href}
                  hrefLang={lng}
                  aria-current={lng === locale ? "page" : undefined}
                  className={cn(
                    "px-4 py-2 text-xs font-mono tracking-[0.2em] border transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9268f6]",
                    lng === locale
                      ? "border-[#9268f6] text-[#9268f6] bg-[#9268f6]/5"
                      : "border-white/15 text-white/50 hover:border-[#9268f6]/50 hover:text-white"
                  )}
                >
                  {localeNames[lng]}
                </a>
              )
            })}
          </div>
          {/* contact email */}
          <a
            href="mailto:v13studio@v13studio.com"
            className="text-xs font-mono text-white/50 transition-colors hover:text-[#9268f6] focus-visible:outline-none focus-visible:text-[#9268f6] focus-visible:underline"
          >
            v13studio@v13studio.com
          </a>
        </div>
      </nav>

      {/* ── Scroll to top — fixed bottom right ── */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center",
          "border border-white/15 bg-black/80 backdrop-blur-xl",
          "hover:border-[#9268f6] hover:bg-[#9268f6]/10 transition-all duration-300",
          showScrollTop && !isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}
