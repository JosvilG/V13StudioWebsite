"use client"

import { useRef, useState, useEffect } from "react"
import { Parallax, ScrollReveal, FloatingElement } from "@/components/parallax"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    title: "FinanceFlow",
    category: "Fintech App",
    year: "2024",
    description: "A modern banking experience for the digital generation. Complete redesign of mobile banking with AI-powered insights.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    color: "#8B5CF6",
  },
  {
    id: 2,
    title: "HealthPulse",
    category: "Healthcare Platform",
    year: "2024",
    description: "AI-powered health monitoring and telemedicine platform connecting patients with healthcare providers.",
    tags: ["Next.js", "OpenAI", "AWS"],
    color: "#06B6D4",
  },
  {
    id: 3,
    title: "EcoTrack",
    category: "Sustainability",
    year: "2023",
    description: "Carbon footprint tracking and sustainability reporting for enterprise businesses.",
    tags: ["React", "NestJS", "GraphQL"],
    color: "#10B981",
  },
  {
    id: 4,
    title: "CreatorHub",
    category: "Creator Economy",
    year: "2023",
    description: "All-in-one platform for content creators to manage their business, audience, and monetization.",
    tags: ["Next.js", "Stripe", "Supabase"],
    color: "#F59E0B",
  },
]

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
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
    <section id="work" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      {/* Background decorative layers */}
      <Parallax speed={-0.1} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full">
          <div
            className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, var(--glow-purple) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </div>
      </Parallax>

      <Parallax speed={-0.2} className="absolute inset-0 pointer-events-none">
        <FloatingElement amplitude={15} frequency={0.4}>
          <div
            className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, var(--glow-cyan) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />
        </FloatingElement>
      </Parallax>

      {/* Moving background text */}
      <Parallax speed={-0.15} className="absolute top-20 left-0 right-0 pointer-events-none overflow-hidden">
        <div
          className="text-[12vw] font-bold text-foreground/[0.04] tracking-tighter whitespace-nowrap"
          style={{ transform: `translateX(${sectionScrollY * 0.15}px)` }}
        >
          WORK PROJECTS PORTFOLIO
        </div>
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-24">
          <ScrollReveal>
            <span className="text-xs tracking-[0.3em] text-primary uppercase mb-4 block font-mono">
              Selected Work
            </span>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight">
              Projects that
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, var(--gradient-accent-1), var(--gradient-accent-2), var(--gradient-accent-3))` }}
              >
                push boundaries
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Projects list - no per-item parallax */}
        <div className="space-y-2">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <div
                className={cn(
                  "group relative border-b border-border cursor-pointer transition-all duration-500",
                  activeIndex !== null && activeIndex !== index && "opacity-30"
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="py-10 flex flex-col lg:flex-row lg:items-center gap-8">
                  {/* Number */}
                  <span
                    className="text-6xl md:text-8xl font-bold transition-all duration-500"
                    style={{
                      color: activeIndex === index ? project.color : "transparent",
                      WebkitTextStroke: activeIndex === index ? "none" : `1px var(--stroke-muted)`,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-4">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-muted-foreground">{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">{project.year}</span>
                    </div>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500",
                        activeIndex === index ? "max-h-40 opacity-100 mt-6" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-muted-foreground max-w-xl mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Preview box */}
                  <div
                    className={cn(
                      "relative w-28 h-28 flex items-center justify-center border transition-all duration-500",
                      activeIndex === index ? "border-border" : "border-border"
                    )}
                    style={{
                      backgroundColor: activeIndex === index ? `${project.color}15` : undefined,
                    }}
                  >
                    <span
                      className="text-3xl font-bold transition-all duration-500"
                      style={{ color: activeIndex === index ? project.color : "var(--stroke-muted)" }}
                    >
                      {project.title.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "absolute left-0 bottom-0 h-px transition-all duration-700",
                    activeIndex === index ? "w-full" : "w-0"
                  )}
                  style={{
                    background: `linear-gradient(90deg, ${project.color}, transparent)`
                  }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={400}>
          <div className="mt-24 text-center">
            <a href="#contact" className="inline-flex items-center gap-4 text-lg group">
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                Want to see more?
              </span>
              <span className="text-primary group-hover:underline">{"Let's talk"}</span>
              <svg
                className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
