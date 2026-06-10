"use client"

import { useEffect, useState, useRef } from "react"
import { Parallax, ScrollReveal } from "@/components/parallax"
import { ThemeLogo } from "@/components/theme-logo"
import { Marquee } from "@/components/marquee"
import { useT, useLocale } from "@/components/i18n-provider"

const techStack = [
  "React Native", "Next.js", "TypeScript", "NestJS", "PostgreSQL",
  "AWS", "OpenAI", "Figma", "React", "Node.js", "GraphQL", "Supabase",
]

export function Footer() {
  const t = useT()
  const locale = useLocale()
  const [time, setTime] = useState("")
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionScrollY, setSectionScrollY] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Europe/Madrid",
      }
      setTime(now.toLocaleTimeString("en-US", options))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrolled = windowHeight - rect.top
      setSectionScrollY(Math.max(0, scrolled))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer ref={sectionRef} className="relative border-t border-border overflow-hidden">
      {/* Tech stack marquee */}
      <Marquee items={techStack} speed={25} />

      {/* Giant background text */}
      <Parallax speed={-0.15} className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div
          className="text-[18vw] font-bold text-foreground/[0.04] tracking-tighter whitespace-nowrap"
          style={{ transform: `translateX(${sectionScrollY * 0.1}px)` }}
        >
          V13 STUDIO
        </div>
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-24 md:pb-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 sm:gap-12">
          {/* Left */}
          <ScrollReveal>
            <div>
              <ThemeLogo size={80} />
              <p className="text-muted-foreground mt-4 max-w-sm">
                {t.footer.tagline}
              </p>
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal delay={100}>
            <div className="flex flex-col items-start lg:items-end gap-6">
              {/* Time */}
              <div className="text-right">
                <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase block mb-1 font-mono">
                  {t.footer.barcelonaTime}
                </span>
                <span className="font-mono text-2xl tabular-nums">{time}</span>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 sm:gap-8">
                {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                ))}
                <a
                  href={`/${locale}/blog`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.blog}
                </a>
                <a
                  href="https://tools.v13studio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Tools
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom */}
        <ScrollReveal delay={200}>
          <div className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} {t.footer.rights}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              <a href={`/${locale}/legal/legal-notice`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.legalNotice}
              </a>
              <a href={`/${locale}/legal/privacy`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.privacy}
              </a>
              <a href={`/${locale}/legal/cookies`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.cookies}
              </a>
              <a href={`/${locale}/legal/terms`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.footer.terms}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}
