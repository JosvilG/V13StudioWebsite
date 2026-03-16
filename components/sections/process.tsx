"use client"

import { useRef, useState, useEffect } from "react"
import { Parallax, ScrollReveal } from "@/components/parallax"
import { cn } from "@/lib/utils"
import Magnetic from "@/components/magnetic"

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your vision, users, and market. Research, interviews, and strategic planning.",
    duration: "1-2 weeks",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    number: "02",
    title: "Design",
    description: "From wireframes to high-fidelity prototypes. Interfaces that are intuitive and beautiful.",
    duration: "2-4 weeks",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z",
  },
  {
    number: "03",
    title: "Development",
    description: "Clean, scalable code across web, mobile, and backend. Continuous delivery in sprints.",
    duration: "6-12 weeks",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deployment, monitoring, and iteration. We ensure your product succeeds post-launch.",
    duration: "Ongoing",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
]

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = sectionRef.current.offsetHeight

      const scrolled = windowHeight - rect.top

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.8)))
        setLineHeight(progress * 100)
        setActiveStep(Math.min(Math.floor(progress * steps.length), steps.length - 1))
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="process" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      {/* Background pattern */}
      <Parallax speed={-0.1} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-[size:80px_80px]"
          style={{
            backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          }}
        />
      </Parallax>

      {/* Big background number */}
      <Parallax speed={-0.2} className="absolute top-1/4 right-0 pointer-events-none hidden lg:block">
        <div className="text-[30vw] font-bold text-foreground/[0.04] leading-none">
          04
        </div>
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <ScrollReveal>
                <span className="text-xs tracking-[0.3em] text-primary uppercase mb-4 block font-mono">
                  How we work
                </span>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                  Our
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: `linear-gradient(to right, var(--gradient-accent-1), var(--gradient-accent-3))` }}
                  >
                    process
                  </span>
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={200}>
              <p className="text-muted-foreground max-w-md md:text-right">
                A proven methodology honed over years of building successful products.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Process steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 100}>
              <div
                className={cn(
                  "flex gap-6 md:gap-10 py-12 transition-all duration-500",
                  index !== steps.length - 1 && "border-b border-border"
                )}
              >
                {/* Step indicator - flex item, not absolute */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={cn(
                      "w-14 h-14 md:w-20 md:h-20 flex items-center justify-center border-2 transition-all duration-500 bg-card",
                      activeStep >= index
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                    )}
                  >
                    <svg
                      className={cn(
                        "w-5 h-5 md:w-6 md:h-6 transition-transform duration-500",
                        activeStep === index && "scale-110"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                    </svg>
                  </div>
                  {/* Vertical line connecting steps */}
                  {index !== steps.length - 1 && (
                    <div className="w-px flex-1 mt-2 bg-gradient-to-b from-primary/20 to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={cn(
                        "text-sm font-mono transition-colors duration-500",
                        activeStep >= index ? "text-primary" : "text-muted-foreground"
                      )}>
                        {step.number}
                      </span>
                      <h3 className={cn(
                        "text-3xl md:text-4xl font-bold tracking-tight transition-all duration-500",
                        activeStep === index && "translate-x-2"
                      )}>
                        {step.title}
                      </h3>
                    </div>

                    <p className={cn(
                      "text-muted-foreground max-w-xl transition-opacity duration-500",
                      activeStep >= index ? "opacity-100" : "opacity-50"
                    )}>
                      {step.description}
                    </p>
                  </div>

                  {/* Duration badge */}
                  <div
                    className={cn(
                      "px-6 py-3 border transition-all duration-500 whitespace-nowrap shrink-0",
                      activeStep >= index
                        ? "border-primary/50 bg-primary/5"
                        : "border-border"
                    )}
                  >
                    <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase block mb-1">
                      Duration
                    </span>
                    <span className="font-mono font-medium">{step.duration}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={400}>
          <div className="mt-24 p-12 border border-border text-center relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-2xl font-medium mb-4">Ready to start your project?</p>
              <p className="text-muted-foreground mb-8">
                {"Let's discuss how we can help bring your vision to life."}
              </p>
              <Magnetic strength={0.2}>
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 font-medium text-primary-foreground overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--gradient-accent-1), var(--gradient-accent-3))`,
                  }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10">Get in touch</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
