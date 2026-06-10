"use client"

import { useState, useRef, useEffect } from "react"
import { Parallax, ScrollReveal, FloatingElement } from "@/components/parallax"
import { cn } from "@/lib/utils"
import { useT } from "@/components/i18n-provider"

export function Contact() {
  const t = useT()
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
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-16 sm:py-24 md:py-32 overflow-hidden">
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
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <ScrollReveal>
            <span className="text-xs tracking-[0.3em] text-primary uppercase mb-4 block font-mono">
              {t.contact.eyebrow}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tight">
              {t.contact.headingTop}
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, var(--gradient-accent-1), var(--gradient-accent-2), var(--gradient-accent-3))` }}
              >
                {t.contact.headingAccent}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Left - Info */}
          <ScrollReveal>
            <div className="space-y-12">
              <p className="text-base sm:text-xl text-muted-foreground">
                {t.contact.intro}
              </p>

              {/* Contact info */}
              <div className="space-y-6">
                <a
                  href="mailto:hello@v13studio.com"
                  className="group flex items-center gap-3 sm:gap-4 text-lg sm:text-2xl font-medium hover:text-primary transition-colors"
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
                  <span className="text-lg">{t.contact.location}</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {[
                  {
                    name: "Twitter",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    name: "GitHub",
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    ),
                  },
                ].map((social, i) => (
                  <ScrollReveal key={social.name} delay={i * 100 + 200}>
                    <a
                      href="#"
                      className="group w-12 h-12 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.icon}
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
                  <h3 className="text-2xl font-bold mb-2">{t.contact.successTitle}</h3>
                  <p className="text-muted-foreground">
                    {t.contact.successText}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
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
                    {t.contact.nameLabel}
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
                    {t.contact.emailLabel}
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
                    {t.contact.messageLabel}
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
                    className="group relative w-full px-8 py-4 font-medium text-primary-foreground overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/20"
                    style={{
                      background: `linear-gradient(135deg, var(--gradient-accent-1), var(--gradient-accent-3))`,
                    }}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {t.contact.send}
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
