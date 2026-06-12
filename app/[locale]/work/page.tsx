import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getProjects, getStats } from '@/lib/content'
import { PageHero } from '@/components/subpage/page-hero'
import { SectionHeading } from '@/components/subpage/section-heading'
import { CtaBand } from '@/components/subpage/cta-band'
import { WorkGrid } from '@/components/subpage/work-grid'
import { WorkBackdrop } from '@/components/subpage/backdrops'
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
    title: dict.nav.work,
    description: dict.portfolio.eyebrow,
    alternates: {
      canonical: `/${locale}/work`,
      languages: { en: '/en/work', es: '/es/work', ca: '/ca/work', 'x-default': '/en/work' },
    },
    openGraph: {
      title: `${dict.nav.work} | V13 Studio`,
      description: dict.portfolio.eyebrow,
      url: `${siteUrl}/${locale}/work`,
      type: 'website',
    },
  }
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const [projects, stats] = await Promise.all([getProjects(locale), getStats(locale)])

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#04060a] text-white">
        <WorkBackdrop />
        <div className="subpage-enter relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <PageHero
            locale={locale}
            eyebrow={dict.portfolio.eyebrow}
            title={`${dict.portfolio.headingTop} ${dict.portfolio.headingAccent}`}
            intro={dict.portfolio.ctaText}
          />

          <section className="mt-20">
            <WorkGrid
              projects={projects}
              allLabel={dict.portfolio.all}
              viewProject={dict.portfolio.viewProject}
              emptyText={dict.portfolio.ctaText}
            />
          </section>

          {stats.length > 0 && (
            <section className="mt-24">
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
            </section>
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
