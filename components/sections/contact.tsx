"use client"

import { useState, useRef, useEffect } from "react"
import { Parallax, ScrollReveal, FloatingElement } from "@/components/parallax"
import { cn } from "@/lib/utils"

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden">
      {/* Background gradient */}
      <Parallax speed={-0.2} className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <div
          className="w-[1200px] h-[1200px] rounded-full"
          style={{
            background: `radial-gradient(circle, var(--glow-cyan-strong) 0%, transparent 60%)`,
            filter: "blur(60px)",
          }}
        />
      </Parallax>

      {/* Floating decorative lines */}
      <Parallax speed={-0.15} className="absolute top-1/4 left-8 pointer-events-none hidden lg:block">
        <FloatingElement amplitude={30} frequency={0.4}>
          <div className="w-2 h-32 bg-gradient-to-b from-primary/30 to-transparent" />
        </FloatingElement>
      </Parallax>

      <Parallax speed={-0.25} className="absolute bottom-1/4 right-8 pointer-events-none hidden lg:block">
        <FloatingElement amplitude={25} frequency={0.3}>
          <div className="w-2 h-48" style={{ background: `linear-gradient(to top, var(--glow-cyan) , transparent)` }} />
        </FloatingElement>
      </Parallax>

      {/* Moving background text */}
      <Parallax speed={-0.1} className="absolute bottom-20 left-0 right-0 pointer-events-none overflow-hidden">
        <div
          className="text-[10vw] font-bold text-foreground/[0.04] tracking-tighter whitespace-nowrap"
          style={{ transform: `translateX(${-sectionScrollY * 0.1}px)` }}
        >
          GET IN TOUCH LETS TALK CONTACT US
        </div>
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-24">
          <ScrollReveal>
            <span className="text-xs tracking-[0.3em] text-primary uppercase mb-4 block font-mono">
              Contact
            </span>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight">
              {"Let's build"}
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, var(--gradient-accent-1), var(--gradient-accent-2), var(--gradient-accent-3))` }}
              >
                something great
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <ScrollReveal>
            <div className="space-y-12">
              <p className="text-xl text-muted-foreground">
                Have a project in mind? We would love to hear about it.
                Drop us a line and we will get back to you within 24 hours.
              </p>

              {/* Contact info */}
              <div className="space-y-6">
                <a
                  href="mailto:hello@v13.studio"
                  className="group flex items-center gap-4 text-2xl font-medium hover:text-primary transition-colors"
                >
                  <span className="w-12 h-12 flex items-center justify-center border border-border group-hover:border-primary group-hover:bg-primary/10 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  hello@v13studio.com
                </a>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="w-12 h-12 flex items-center justify-center border border-border">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span className="text-lg">Catalonia, Spain</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
                  <ScrollReveal key={social} delay={i * 100 + 200}>
                    <a
                      href="#"
                      className="px-4 py-2 text-sm border border-border hover:border-primary hover:bg-primary/10 transition-all"
                    >
                      {social}
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Form */}
          <ScrollReveal delay={200}>
            {submitted ? (
              <div className="h-full flex items-center justify-center p-12 border border-primary/30 bg-primary/5">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 border-2 border-primary rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
                  <p className="text-muted-foreground">
                    {"We'll get back to you within 24 hours."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name field */}
                <div className="relative">
                  <label
                    className={cn(
                      "absolute left-0 transition-all duration-300 pointer-events-none",
                      focused === "name" || formState.name
                        ? "text-xs text-primary -top-6"
                        : "text-muted-foreground top-4"
                    )}
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-primary py-4 outline-none transition-colors"
                  />
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-primary transition-all duration-300",
                      focused === "name" ? "w-full" : "w-0"
                    )}
                  />
                </div>

                {/* Email field */}
                <div className="relative">
                  <label
                    className={cn(
                      "absolute left-0 transition-all duration-300 pointer-events-none",
                      focused === "email" || formState.email
                        ? "text-xs text-primary -top-6"
                        : "text-muted-foreground top-4"
                    )}
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-primary py-4 outline-none transition-colors"
                  />
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-primary transition-all duration-300",
                      focused === "email" ? "w-full" : "w-0"
                    )}
                  />
                </div>

                {/* Message field */}
                <div className="relative">
                  <label
                    className={cn(
                      "absolute left-0 transition-all duration-300 pointer-events-none",
                      focused === "message" || formState.message
                        ? "text-xs text-primary -top-6"
                        : "text-muted-foreground top-4"
                    )}
                  >
                    Tell us about your project
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-border focus:border-primary py-4 outline-none transition-colors resize-none"
                  />
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-primary transition-all duration-300",
                      focused === "message" ? "w-full" : "w-0"
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full py-4 bg-primary text-primary-foreground font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
