"use client"

import { useRef, useEffect, useState } from "react"
import { Parallax, ScrollReveal, FloatingElement } from "@/components/parallax"
import { ThemeLogo } from "@/components/theme-logo"
import { useT } from "@/components/i18n-provider"

const teamMeta = [
  { initials: "AL", color: "#8B5CF6" },
  { initials: "MR", color: "#06B6D4" },
  { initials: "JS", color: "#10B981" },
  { initials: "ER", color: "#F59E0B" },
]

export function About() {
  const t = useT()
  const team = teamMeta.map((meta, i) => ({
    ...meta,
    role: t.about.teamRoles[i],
  }))
  const stats = t.about.stats
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionScrollY, setSectionScrollY] = useState(0)

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
    <section id="about" ref={sectionRef} className="relative min-h-screen py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Giant background logo */}
      <Parallax speed={-0.2} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
        <ThemeLogo size={600} ghost className="select-none" />
      </Parallax>

      {/* Floating gradient orbs */}
      <Parallax speed={-0.15} className="absolute top-0 left-0 pointer-events-none">
        <FloatingElement amplitude={25} frequency={0.3}>
          <div
            className="w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, var(--glow-purple-strong) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </FloatingElement>
      </Parallax>

      <Parallax speed={-0.2} className="absolute bottom-0 right-0 pointer-events-none">
        <FloatingElement amplitude={20} frequency={0.5}>
          <div
            className="w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, var(--glow-cyan-strong) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </FloatingElement>
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <ScrollReveal>
            <div className="relative">
              <div className="aspect-square relative border border-border p-4 sm:p-8 md:p-12">
                {/* Corner decorations (static, no parallax) */}
                <div
                  className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary"
                  style={{ transform: `scale(${1 + sectionScrollY * 0.0003})` }}
                />
                <div
                  className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary"
                  style={{ transform: `scale(${1 + sectionScrollY * 0.0003})` }}
                />
                <div
                  className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary"
                  style={{ transform: `scale(${1 + sectionScrollY * 0.0003})` }}
                />
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary"
                  style={{ transform: `scale(${1 + sectionScrollY * 0.0003})` }}
                />

                <div className="h-full flex flex-col justify-between">
                  {/* Logo */}
                  <div>
                    <ThemeLogo size={60} className="sm:hidden" />
                    <ThemeLogo size={120} className="hidden sm:block" />
                    <p className="text-xs tracking-[0.3em] text-muted-foreground mt-2 font-mono">STUDIO</p>
                  </div>

                  {/* Team grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    {team.map((member, i) => (
                      <ScrollReveal key={member.role} delay={i * 100 + 200}>
                        <div className="group p-2 sm:p-4 border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer">
                          <div
                            className="text-lg sm:text-2xl font-bold mb-1 transition-all duration-300"
                            style={{ color: member.color }}
                          >
                            {member.initials}
                          </div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs tracking-[0.2em] text-muted-foreground font-mono">
                      {t.about.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <ScrollReveal delay={400}>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 px-4 py-3 sm:px-6 sm:py-4 bg-background border border-border">
                  <div className="text-3xl font-bold text-primary">2026</div>
                  <div className="text-xs text-muted-foreground">{t.about.founded}</div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Right - Text */}
          <div className="lg:pl-8">
            <ScrollReveal>
              <span className="text-xs tracking-[0.3em] text-primary uppercase mb-4 block font-mono">
                {t.about.eyebrow}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 sm:mb-8">
                {t.about.headingTop}
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(to right, var(--gradient-accent-1), var(--gradient-accent-3))` }}
                >
                  {t.about.headingAccent}
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={300}>
              <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-border pl-4 hover:border-primary transition-colors duration-300">
                    <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
