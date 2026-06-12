import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getTeam, getStats } from '@/lib/content'
import { PageHero } from '@/components/subpage/page-hero'
import { SectionHeading } from '@/components/subpage/section-heading'
import { CtaBand } from '@/components/subpage/cta-band'
import { Reveal } from '@/components/subpage/reveal'
import { AboutBackdrop } from '@/components/subpage/backdrops'
import { ScrollReset } from '@/components/subpage/scroll-reset'
import { Footer } from '@/components/sections/footer'

export const dynamicParams = true
const siteUrl = 'https://v13studio.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: '/en/about', es: '/es/about', ca: '/ca/about', 'x-default': '/en/about' },
    },
    openGraph: {
      title: `${dict.about.metaTitle} | V13 Studio`,
      description: dict.about.metaDescription,
      url: `${siteUrl}/${locale}/about`,
      type: 'website',
    },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const a = dict.about
  const [team, stats] = await Promise.all([getTeam(locale), getStats(locale)])

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#04060a] text-white">
        <AboutBackdrop />
        <ScrollReset />
        <div className="subpage-enter relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <PageHero locale={locale} eyebrow={a.eyebrow} title={a.title} intro={a.statement} section="about" />

          {/* Pillars */}
          <Reveal className="mt-20 grid gap-10 sm:grid-cols-3">
            {a.pillars.map((pillar) => (
              <div key={pillar.title}>
                <span className="mb-3 block h-px w-10 bg-[#9268f6]/70" />
                <h3 className="text-base font-bold uppercase tracking-[0.2em] text-white sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{pillar.description}</p>
              </div>
            ))}
          </Reveal>

          {/* Story */}
          <Reveal className="mt-24 max-w-3xl">
            <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>
              {a.headingTop} {a.headingAccent}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65">{a.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-white/65">{a.p2}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              {a.location} · {a.founded}
            </p>
          </Reveal>

          {/* Team (Sheets-backed; hidden if empty) */}
          {team.length > 0 && (
            <Reveal className="mt-24">
              <SectionHeading title={a.teamHeading} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {team.map((member) => (
                  <div key={member.initials} className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.initials}
                    </span>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Values (placeholder copy — to be filled by owner) */}
          <Reveal className="mt-24">
            <SectionHeading title={a.valuesHeading} />
            <div className="grid gap-8 sm:grid-cols-3">
              {a.values.map((value) => (
                <div key={value.title} className="border-l-2 border-white/10 pl-5">
                  <h3 className="text-base font-bold uppercase tracking-wide text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{value.description}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Stats (Sheets-backed; hidden if empty) */}
          {stats.length > 0 && (
            <Reveal className="mt-24">
              <SectionHeading title={dict.stats.heading} />
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-t-2 border-white/10 pt-5">
                    <div className="text-4xl font-light text-white sm:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
                      {stat.value}
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <CtaBand
            locale={locale}
            heading={`${dict.contact.headingTop} ${dict.contact.headingAccent}`}
            cta={dict.contact.ctaProject}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
