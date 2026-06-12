"use client"

import { useT } from "@/components/i18n-provider"
import type { SheetProject } from "@/lib/content"

/**
 * Static, stacked mobile layout for the Work section. The desktop version is a
 * scroll-choreographed Projects → Process → Nosotros sequence that can't render
 * on a phone; here the same content is laid out plainly: project cards, a
 * numbered process timeline, and the Nosotros statement + pillars.
 */
export function WorkMobile({ projects }: { projects: SheetProject[] }) {
  const t = useT()
  const steps = t.process.steps.slice(0, 4)
  const pillars = t.about.pillars.slice(0, 3)

  return (
    <section id="work" className="relative overflow-hidden bg-[#04060a] px-6 py-20">
      {/* in-page anchors used by the menu */}
      <div id="process" aria-hidden className="pointer-events-none absolute" />
      <div id="about" aria-hidden className="pointer-events-none absolute" />

      {/* ── PROYECTOS ── */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7ca8ff]">
          {t.portfolio.eyebrow}
        </p>
        <h2
          className="mt-3 text-4xl font-medium text-white"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {t.portfolio.headingTop}
        </h2>

        {projects.length > 0 ? (
          <div className="mt-8 space-y-4">
            {projects.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl border border-white/12 bg-white/[0.04] p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className="text-xl leading-tight text-white"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {p.title}
                  </h3>
                  {p.year ? (
                    <span className="shrink-0 font-mono text-[11px] text-white/35">
                      {p.year}
                    </span>
                  ) : null}
                </div>
                {p.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {p.description}
                  </p>
                ) : null}
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#7ca8ff] transition-opacity hover:opacity-80"
                  >
                    {t.portfolio.viewProject}
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[0.03] p-6">
            <p className="text-sm text-white/55">{t.portfolio.ctaText}</p>
            <a
              href="#contact"
              className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#7ca8ff]"
            >
              {t.portfolio.ctaLink}
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* ── PROCESO ── */}
      <div className="mt-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7ca8ff]">
          {t.process.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[0.3em] text-white">
          {t.process.headingAccent}
        </h2>

        <ol className="mt-8 space-y-7">
          {steps.map((s, i) => (
            <li key={s.title} className="border-l-2 border-white/10 pl-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-[#7ca8ff]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-bold uppercase tracking-[0.18em] text-white">
                  {s.title}
                </h3>
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7c9fd6]">
                {s.tagline}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.description}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                {t.process.durationLabel}: {s.duration}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── NOSOTROS (over a full-bleed static frame of the background video) ── */}
      <div className="relative mt-24 -mx-6 overflow-hidden">
        {/* static video frame — not animated, just a poster frame */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/background.mp4#t=3"
          muted
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          style={{ filter: "grayscale(0.35) brightness(0.5) contrast(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,6,10,0.84) 0%, rgba(4,6,10,0.7) 40%, rgba(4,6,10,0.9) 100%)",
          }}
        />

        <div className="relative z-10 px-6 py-14">
          <h2 className="text-3xl font-bold uppercase tracking-[0.16em] text-white">
            {t.about.title}
          </h2>
          <p className="mt-5 text-lg font-semibold uppercase leading-snug tracking-[0.12em] text-white/90">
            {t.about.statement}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-white/65">{t.about.intro}</p>

          <div className="mt-10 space-y-8">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <span className="mb-3 block h-px w-10 bg-[#7ca8ff]/70" />
                <h3 className="text-base font-bold uppercase tracking-[0.2em] text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
