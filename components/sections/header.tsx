"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigateToSection } from "@/lib/navigate-stack"
import { ThemeLogo } from "@/components/theme-logo"
import { useT, useLocale } from "@/components/i18n-provider"
import { locales, localeNames } from "@/lib/i18n/config"

const V13_WATERMARK_PATH =
  "M 243 359.383 C 243 360.157, 245.183 365.224, 247.851 370.645 C 250.519 376.065, 254.187 383.650, 256.002 387.500 C 257.817 391.350, 263.284 402.772, 268.151 412.882 C 273.018 422.993, 277 431.406, 277 431.579 C 277 431.752, 280.186 438.555, 284.080 446.697 C 287.974 454.839, 292.089 463.525, 293.223 466 C 294.357 468.475, 297.645 475.450, 300.528 481.500 C 303.412 487.550, 307.465 496.100, 309.535 500.500 C 311.605 504.900, 317.056 516.314, 321.649 525.865 C 326.242 535.416, 330 543.368, 330 543.537 C 330 543.705, 333.600 551.339, 338 560.500 C 342.400 569.661, 346 577.292, 346 577.458 C 346 577.623, 348.205 582.425, 350.900 588.129 C 353.596 593.833, 360.125 607.725, 365.411 619 C 370.696 630.275, 375.661 640.625, 376.444 642 L 377.868 644.500 386.941 644.788 L 396.015 645.075 403.120 630.288 C 424.109 586.608, 425.183 584.156, 424.410 581.689 C 423.697 579.413, 421.137 573.613, 415.380 561.228 C 413.521 557.229, 412 553.792, 412 553.592 C 412 553.391, 409.942 548.788, 407.427 543.364 C 404.912 537.939, 402.164 531.925, 401.320 530 C 400.476 528.075, 398.708 524.138, 397.393 521.250 C 396.077 518.362, 393.923 513.638, 392.607 510.750 C 391.292 507.863, 389.445 503.700, 388.503 501.500 C 385.422 494.297, 380.896 484.304, 374.098 469.691 C 371.844 464.846, 370 460.659, 370 460.386 C 370 459.849, 367.723 454.745, 362.245 443 C 360.321 438.875, 357.290 432.350, 355.509 428.500 C 353.728 424.650, 350.683 418.125, 348.742 414 C 346.801 409.875, 344.288 404.475, 343.158 402 C 342.029 399.525, 337.081 388.725, 332.165 378 L 323.226 358.500 283.113 358.239 L 243 357.977 243 359.383 M 333.580 358.871 C 333.284 359.349, 335.673 365.087, 338.888 371.621 C 342.103 378.154, 345.654 385.525, 346.780 388 C 347.905 390.475, 352.964 401.050, 358.021 411.500 C 363.079 421.950, 369.902 436.125, 373.184 443 C 392.585 483.651, 392.032 482.704, 394.179 478.940 C 395.035 477.438, 413.891 438.471, 421.731 422 C 424.218 416.775, 429.732 405.300, 433.984 396.500 C 449.806 363.754, 451.769 359.483, 451.331 358.750 C 450.697 357.691, 334.235 357.811, 333.580 358.871 M 457.981 370.539 C 454.692 377.448, 452 383.267, 452 383.470 C 452 383.673, 449.471 389.163, 446.380 395.670 C 440.665 407.698, 436.459 416.714, 431.530 427.500 C 427.238 436.891, 417.113 458.581, 410.990 471.500 C 397.230 500.531, 397.646 498.851, 402 507.839 C 403.650 511.245, 405 514.223, 405 514.457 C 405 514.691, 406.749 518.621, 408.886 523.191 C 412.618 531.170, 415.479 537.509, 418.730 545 C 419.566 546.925, 421.543 551.284, 423.125 554.687 C 424.706 558.090, 426 561.132, 426 561.448 C 426 562.791, 430.288 571, 430.989 571 C 431.412 571, 432.346 569.538, 433.065 567.750 C 433.784 565.962, 437.833 557.300, 442.064 548.500 C 446.295 539.700, 451.566 528.675, 453.777 524 C 455.988 519.325, 460.987 508.820, 464.885 500.655 C 468.784 492.490, 473.186 483.040, 474.667 479.655 C 476.149 476.270, 477.843 472.868, 478.431 472.096 C 479.194 471.095, 479.643 495.602, 480 557.596 L 480.500 644.500 513 644.500 L 545.500 644.500 545.500 501.500 L 545.500 358.500 504.731 358.239 L 463.963 357.978 457.981 370.539 M 570.454 359.260 C 570.186 359.957, 570.087 372.897, 570.233 388.014 L 570.500 415.500 625.211 415.759 L 679.923 416.017 654.961 453.217 L 630 490.417 630 500.208 L 630 510 649.837 510 C 687.409 510, 702.307 514.411, 711.920 528.383 C 723.493 545.205, 719.702 571.141, 704.021 582.417 C 686.631 594.921, 655.553 595.212, 620.500 583.200 C 613.722 580.877, 599.430 575.223, 597.063 573.928 C 594.953 572.774, 586.707 569, 586.295 569 C 585.945 569, 575 591.685, 575 592.410 C 575 592.916, 563.389 617.724, 561.976 620.236 C 560.094 623.584, 561.081 624.599, 571.250 629.762 C 600.499 644.613, 630.081 651.401, 665.500 651.388 C 685.685 651.381, 695.677 650.158, 711 645.818 C 745.616 636.014, 770.275 612.579, 780.439 579.826 C 786.682 559.707, 786.643 534.152, 780.344 517.073 C 772.195 494.983, 746.070 471.982, 723.500 467.028 C 721.774 466.650, 720.548 465.760, 720.613 464.935 C 720.675 464.146, 730.352 450, 742.118 433.500 C 753.883 417, 764.407 402.199, 765.505 400.609 C 766.602 399.020, 768.400 396.490, 769.500 394.988 C 770.600 393.486, 773.428 389.501, 775.784 386.133 L 780.068 380.010 779.784 369.255 L 779.500 358.500 675.220 358.245 L 570.941 357.991 570.454 359.260"

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
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }
    // Internal route (e.g. /blog) — full navigation, not in-page anchor
    if (href.startsWith("/")) {
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
          "hover:border-[#7ca8ff] hover:bg-[#7ca8ff]/10 transition-all duration-300",
        )}
        aria-label={isOpen ? "Close menu" : "Open menu"}
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

      {/* ── Backdrop overlay ── */}
      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Side panel ── */}
      <nav
        className={cn(
          "fixed top-0 right-0 z-[58] h-full w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]",
          "bg-[#050505] backdrop-blur-xl border-l border-white/10",
          "flex flex-col overflow-hidden",
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* V13 watermark — behind all panel content */}
        <svg
          viewBox="232 348 560 312"
          className="pointer-events-none absolute -right-10 bottom-24 w-[110%] opacity-[0.05]"
          fill="none"
          aria-hidden="true"
        >
          <path d={V13_WATERMARK_PATH} fill="none" stroke="#7ca8ff" strokeWidth={3} strokeLinejoin="round" />
        </svg>

        {/* Panel content above watermark */}
        <div className="relative z-10 flex flex-1 flex-col">
          {/* Logo area */}
          <div className="px-6 sm:px-8 pt-8 pb-4 border-b border-white/10">
            <ThemeLogo size={48} className="sm:hidden" />
            <ThemeLogo size={64} className="hidden sm:block" />
            <p className="text-xs text-white/40 font-mono mt-2 tracking-[0.3em]">STUDIO</p>
          </div>

          {/* Nav links */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
            <ul className="space-y-1">
              {navItems.map((item, i) => {
                const isExternal = item.href.startsWith("http")
                return (
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
                      <span className="text-xs font-mono text-[#7ca8ff]/70 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-medium text-white group-hover:text-[#7ca8ff] transition-colors">
                        {item.label}
                      </span>
                      {isExternal ? (
                        <svg className="ml-auto w-4 h-4 text-white/45 group-hover:text-[#7ca8ff] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      ) : (
                        <span className="ml-auto w-0 group-hover:w-6 h-px bg-[#7ca8ff] transition-all duration-300" />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Bottom section — language switcher + info */}
          <div className="px-6 sm:px-8 py-6 border-t border-white/10 space-y-4">
            {/* Language switcher */}
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
                    aria-current={lng === locale ? "true" : undefined}
                    className={cn(
                      "flex-1 text-center py-2 text-xs font-mono tracking-[0.2em] border transition-all duration-300",
                      lng === locale
                        ? "border-[#7ca8ff] text-[#7ca8ff] bg-[#7ca8ff]/5"
                        : "border-white/15 text-white/50 hover:border-[#7ca8ff]/50 hover:text-white"
                    )}
                  >
                    {localeNames[lng]}
                  </a>
                )
              })}
            </div>

            {/* Contact info */}
            <a
              href="mailto:v13studio@v13studio.com"
              className="block text-xs text-white/50 hover:text-[#7ca8ff] transition-colors font-mono"
            >
              v13studio@v13studio.com
            </a>
          </div>
        </div>
      </nav>

      {/* ── Scroll to top — fixed bottom right ── */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center",
          "border border-white/15 bg-black/80 backdrop-blur-xl",
          "hover:border-[#7ca8ff] hover:bg-[#7ca8ff]/10 transition-all duration-300",
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
