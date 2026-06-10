"use client"

import { useState, useRef, useEffect } from "react"
import { Parallax, ScrollReveal } from "@/components/parallax"
import { cn } from "@/lib/utils"
import { useT } from "@/components/i18n-provider"

const serviceMeta = [
  { number: "01", tags: ["Research", "Roadmapping", "Validation"] },
  { number: "02", tags: ["Figma", "Prototyping", "Design Systems"] },
  { number: "03", tags: ["React Native", "iOS", "Android"] },
  { number: "04", tags: ["Next.js", "React", "TypeScript"] },
  { number: "05", tags: ["NestJS", "PostgreSQL", "AWS"] },
  { number: "06", tags: ["OpenAI", "LangChain", "RAG"] },
]

export function Services() {
  const t = useT()
  const services = serviceMeta.map((meta, i) => ({
    ...meta,
    title: t.services.items[i].title,
    description: t.services.items[i].description,
  }))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
    <section id="services" ref={sectionRef} className="relative min-h-screen py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background text with parallax */}
      <Parallax speed={-0.2} className="absolute top-0 left-0 right-0 pointer-events-none">
        <div
          className="text-[18vw] font-bold text-foreground/[0.04] tracking-tighter whitespace-nowrap"
          style={{ transform: `translateX(${-sectionScrollY * 0.1}px)` }}
        >
          SERVICES & CAPABILITIES
        </div>
      </Parallax>

      {/* Decorative gradient orb */}
      <Parallax speed={-0.15} className="absolute top-1/4 right-0 pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, var(--glow-purple) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-24">
          <ScrollReveal>
            <span className="text-xs tracking-[0.3em] text-primary uppercase mb-4 block font-mono">
              {t.services.eyebrow}
            </span>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                {t.services.headingTop}
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(to right, var(--gradient-accent-1), var(--gradient-accent-3))` }}
                >
                  {t.services.headingAccent}
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-muted-foreground max-w-sm md:text-right">
                {t.services.intro}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Services list - no per-item parallax to prevent overlap */}
        <div className="relative">
          {services.map((service, index) => (
            <ScrollReveal key={service.number} delay={index * 80}>
              <div
                className={cn(
                  "group relative py-6 sm:py-8 border-t border-border transition-all duration-500 cursor-pointer",
                  hoveredIndex !== null && hoveredIndex !== index && "opacity-30"
                )}
                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-start justify-between gap-4 sm:gap-8">
                  <span className="text-xs sm:text-sm font-mono text-primary/60 w-8 sm:w-12 pt-2">
                    {service.number}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-2 transition-transform duration-500 group-hover:translate-x-4">
                      {service.title}
                    </h3>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500",
                        hoveredIndex === index ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-muted-foreground mb-4 max-w-xl">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono bg-primary/10 border border-primary/20 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center w-16 h-16 border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
                    <svg
                      className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>

                <div
                  className={cn(
                    "absolute left-0 bottom-0 h-px transition-all duration-500",
                    hoveredIndex === index ? "w-full" : "w-0"
                  )}
                  style={{ backgroundImage: `linear-gradient(to right, var(--gradient-accent-1), var(--gradient-accent-3))` }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Floating number */}
        <Parallax speed={-0.3} className="absolute bottom-0 right-8 pointer-events-none hidden lg:block">
          <div className="text-[20vw] font-bold text-foreground/[0.04] leading-none">
            06
          </div>
        </Parallax>
      </div>
    </section>
  )
}
