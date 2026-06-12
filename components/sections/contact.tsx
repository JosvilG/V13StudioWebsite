"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useT, useLocale } from "@/components/i18n-provider"
import { V13Outline } from "./v13-outline"

export function Contact() {
  const t = useT()
  const locale = useLocale()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "sending") return
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, consent, website: honeypot }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  const field = (
    key: "name" | "email" | "message",
    label: string,
    type: "text" | "email" | "textarea"
  ) => {
    const active = focused === key || formState[key]
    const common = {
      value: formState[key],
      onFocus: () => setFocused(key),
      onBlur: () => setFocused(null),
      required: true,
      className:
        "w-full bg-transparent border-b border-white/15 focus:border-primary py-3 outline-none transition-colors text-white",
    }
    return (
      <div className="relative">
        <label
          className={cn(
            "absolute left-0 pointer-events-none transition-all duration-300 uppercase tracking-[0.2em]",
            active ? "-top-4 text-[10px] text-primary" : "top-3 text-xs text-white/40"
          )}
        >
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            {...common}
            rows={3}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            className={cn(common.className, "resize-none")}
          />
        ) : (
          <input
            {...common}
            type={type}
            onChange={(e) => setFormState({ ...formState, [key]: e.target.value })}
          />
        )}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-px bg-primary transition-all duration-300",
            focused === key ? "w-full" : "w-0"
          )}
        />
      </div>
    )
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden bg-black py-16 lg:py-0"
    >
      {/* Flat V13 — self-drawing glowing outline, centred behind the columns */}
      <div className="pointer-events-none absolute inset-0 z-[2] hidden items-center justify-center lg:flex">
        <V13Outline />
      </div>

      {/* Legibility overlay — darken the column gutters, keep the V13 readable */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.6) 24%, transparent 42%, transparent 58%, rgba(5,5,5,0.6) 76%, rgba(5,5,5,0.94) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-[#050505] via-transparent to-[#050505] lg:from-transparent lg:to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,0.7fr)] lg:gap-8">
        {/* Left — form */}
        <div>
          <h2 className="mb-10 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            {t.contact.eyebrow}
          </h2>
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4 border-l-2 border-primary pl-6 py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary">
                <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">{t.contact.successTitle}</h3>
              <p className="text-white/60">{t.contact.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-9">
              {/* Honeypot — hidden from humans */}
              <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              {field("name", t.contact.nameLabel, "text")}
              {field("email", t.contact.emailLabel, "email")}
              {field("message", t.contact.messageLabel, "textarea")}

              {/* GDPR consent */}
              <label className="flex items-start gap-3 text-xs text-white/50">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                />
                <span>
                  {t.contact.consentText}{" "}
                  <a
                    href={`/${locale}/legal/privacy`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    {t.contact.consentLink}
                  </a>
                </span>
              </label>

              {status === "error" && (
                <div className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-white" role="alert">
                  <p className="font-medium">{t.contact.errorTitle}</p>
                  <p className="text-white/60">
                    {t.contact.errorText}{" "}
                    <a href={`mailto:${t.contact.errorMailto}`} className="text-primary underline underline-offset-2">
                      {t.contact.errorMailto}
                    </a>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative w-full overflow-hidden border border-white/20 bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === "sending" ? t.contact.sending : t.contact.ctaProject}
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Center — kept empty so the V13 in the video reads through */}
        <div className="hidden lg:block" aria-hidden="true" />

        {/* Right — contact info */}
        <div className="space-y-8 lg:justify-self-end">
          <InfoRow
            label={t.contact.emailLabel}
            value={t.contact.errorMailto}
            href={`mailto:${t.contact.errorMailto}`}
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            }
          />
          <InfoRow
            label={t.contact.phoneLabel}
            value={t.contact.phoneValue}
            href={`tel:${t.contact.phoneValue.replace(/\s+/g, "")}`}
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            }
          />
          <InfoRow
            label={t.contact.addressLabel}
            value={t.contact.location}
            icon={
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </>
            }
          />
        </div>
      </div>
    </section>
  )
}

function InfoRow({
  label,
  value,
  href,
  icon,
}: {
  label: string
  value: string
  href?: string
  icon: React.ReactNode
}) {
  const body = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-primary">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </span>
      <span className="flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
          {label}
        </span>
        <span className="text-sm text-white/80">{value}</span>
      </span>
    </div>
  )

  return href ? (
    <a href={href} className="group block transition-opacity hover:opacity-80">
      {body}
    </a>
  ) : (
    body
  )
}
