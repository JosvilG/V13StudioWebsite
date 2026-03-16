"use client"

import { useEffect, useRef, useState } from "react"
import { Parallax, FloatingElement } from "@/components/parallax"
import { navigateToSection } from "@/lib/navigate-stack"
import { ThemeLogo } from "@/components/theme-logo"
import { TextScramble } from "@/components/text-scramble"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const opacity = Math.max(0, 1 - scrollY / 800)

  return (
    <section id="hero" ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1 - Far background grid */}
      <Parallax speed={-0.3} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[size:120px_120px]"
          style={{
            backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          }}
        />
      </Parallax>

      {/* Layer 2 - Floating orbs */}
      <Parallax speed={-0.2} className="absolute inset-0 pointer-events-none">
        <FloatingElement amplitude={30} frequency={0.3} className="absolute top-[10%] left-[10%]">
          <div
            className="w-[500px] h-[500px] rounded-full opacity-40"
            style={{
              background: "radial-gradient(circle, var(--glow-purple-strong) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </FloatingElement>
      </Parallax>

      <Parallax speed={-0.15} className="absolute inset-0 pointer-events-none">
        <FloatingElement amplitude={20} frequency={0.5} className="absolute bottom-[20%] right-[5%]">
          <div
            className="w-[400px] h-[400px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, var(--glow-cyan-strong) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </FloatingElement>
      </Parallax>

      {/* Layer 3 - Big background logo */}
      <Parallax speed={0.3} className="absolute inset-0 pointer-events-none flex items-end justify-center pb-32">
        <ThemeLogo size={500} ghost className="select-none" />
      </Parallax>

      {/* Layer 4 - Main content */}
      <div
        className="relative z-10 text-center px-4 max-w-7xl mx-auto"
        style={{ opacity }}
      >
        {/* Pre-title */}
        <div
          className="mb-8 overflow-hidden"
          style={{
            transform: `translateY(${loaded ? 0 : 30}px)`,
            opacity: loaded ? 1 : 0,
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="text-xs tracking-[0.4em] text-primary/80 uppercase font-mono">
              Software Product Studio
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-[clamp(2.5rem,11vw,9rem)] font-bold leading-[0.9] tracking-tighter mb-8">
          <span className="block overflow-hidden">
            <span
              className="block"
              style={{
                transform: `translateY(${loaded ? 0 : 100}px)`,
                opacity: loaded ? 1 : 0,
                transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
            >
              <TextScramble text="WE BUILD" trigger={loaded} speed={120} />
            </span>
          </span>

          <span className="block overflow-hidden">
            <span
              className="block text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(to right, var(--gradient-accent-1), var(--gradient-accent-2), var(--gradient-accent-3))`,
                transform: `translateY(${loaded ? 0 : 100}px)`,
                opacity: loaded ? 1 : 0,
                transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            >
              <TextScramble text="PRODUCTS" trigger={loaded} speed={130} />
            </span>
          </span>

          <span className="block overflow-hidden">
            <span
              className="block"
              style={{
                transform: `translateY(${loaded ? 0 : 100}px)`,
                opacity: loaded ? 1 : 0,
                transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
              }}
            >
              <TextScramble text="THAT MATTER" trigger={loaded} speed={100} />
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12"
          style={{
            transform: `translateY(${loaded ? 0 : 40}px)`,
            opacity: loaded ? 0.8 : 0,
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
          }}
        >
          Software product studio crafting exceptional digital experiences for everyone and everywhere.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            transform: `translateY(${loaded ? 0 : 40}px)`,
            opacity: loaded ? 1 : 0,
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s",
          }}
        >
          <button
              onClick={() => navigateToSection("#work")}
              className="group relative px-10 py-4 font-medium overflow-hidden text-primary-foreground"
              style={{
                background: `linear-gradient(135deg, var(--gradient-accent-1), var(--gradient-accent-3))`,
              }}
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10 flex items-center gap-3">
                View Our Work
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          <button
              onClick={() => navigateToSection("#contact")}
              className="group relative px-10 py-4 font-medium overflow-hidden bg-transparent"
            >
              {/* Animated border */}
              <span
                className="absolute inset-0 border border-border group-hover:border-primary/60 transition-colors duration-500"
              />
              {/* Fill on hover */}
              <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                Start a Project
                <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
      >
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-4 font-mono">
          Scroll
        </span>
        <div className="w-6 h-10 border border-border rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Decorative lines */}
      <Parallax speed={-0.1} className="absolute top-1/4 left-8 hidden lg:block">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      </Parallax>

      <Parallax speed={-0.15} className="absolute top-1/3 right-8 hidden lg:block">
        <div className="w-px h-48" style={{ background: `linear-gradient(to bottom, transparent, var(--glow-cyan), transparent)` }} />
      </Parallax>
    </section>
  )
}
