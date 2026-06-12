"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ScrollReveal } from "@/components/parallax"
import { ThemeLogo } from "@/components/theme-logo"
import { useT, useLocale } from "@/components/i18n-provider"
import { locales, localeNames } from "@/lib/i18n/config"

const linkCls =
  "text-sm text-white/55 hover:text-[#9268f6] transition-colors duration-300"
const headingCls =
  "mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35"

function Column({
  heading,
  links,
}: {
  heading: string
  links: { label: string; href: string; external?: boolean }[]
}) {
  return (
    <div>
      <p className={headingCls}>{heading}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              aria-label={l.label}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={linkCls}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const t = useT()
  const locale = useLocale()
  const pathname = usePathname()
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Europe/Madrid",
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.contact, href: "#contact" },
    { label: t.nav.blog, href: `/${locale}/blog` },
    { label: t.nav.tools, href: "https://tools.v13studio.com", external: true },
  ]
  // TODO: replace "#" with real social URLs (pending owner setup)
  const socialLinks = ["LinkedIn", "GitHub", "Twitter", "Dribbble"].map((l) => ({
    label: l,
    href: "#",
  }))
  const legalLinks = [
    { label: t.footer.legalNotice, href: `/${locale}/legal/legal-notice` },
    { label: t.footer.privacy, href: `/${locale}/legal/privacy` },
    { label: t.footer.cookies, href: `/${locale}/legal/cookies` },
    { label: t.footer.terms, href: `/${locale}/legal/terms` },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Identity */}
          <ScrollReveal>
            <div>
              <ThemeLogo size={72} />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
                {t.footer.tagline}
              </p>
              <a
                href="mailto:v13studio@v13studio.com"
                className="group mt-6 inline-flex items-center gap-2 border-b border-white/20 pb-1 font-mono text-sm text-white/80 transition-colors hover:border-[#9268f6] hover:text-[#9268f6]"
              >
                v13studio@v13studio.com
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>

          {/* Link columns */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <Column heading={t.footer.navHeading} links={navLinks} />
              <Column heading={t.footer.socialHeading} links={socialLinks} />
              <Column heading={t.footer.legalHeading} links={legalLinks} />
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar — extra right padding clears the fixed scroll-to-top button */}
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pr-16">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-white/55">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
              {t.footer.barcelonaTime}
            </span>
            <span className="tabular-nums text-white/80">{time}</span>
          </div>
          <div className="flex gap-3 font-mono text-xs">
            {locales.map((lng) => {
              const segments = pathname.split("/")
              segments[1] = lng
              const href = segments.join("/") || `/${lng}`
              return (
                <a
                  key={lng}
                  href={href}
                  hrefLang={lng}
                  className={
                    lng === locale
                      ? "text-[#9268f6]"
                      : "text-white/45 transition-colors hover:text-white/80"
                  }
                >
                  {localeNames[lng]}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
