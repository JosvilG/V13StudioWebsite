import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import Link from 'next/link'
import { getProjects, getStats } from '@/lib/content'
import { SectionHeading } from '@/components/subpage/section-heading'
import { CtaBand } from '@/components/subpage/cta-band'
import { ProjectsCarousel } from '@/components/subpage/projects-carousel'
import { ProjectDetailList } from '@/components/subpage/project-detail-list'
import { Reveal } from '@/components/subpage/reveal'
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
        <div className="subpage-enter relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16 sm:pt-28">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#9268f6]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            V13 Studio
          </Link>

          {projects.length > 0 ? (
            <ProjectsCarousel
              projects={projects}
              heading={dict.portfolio.headingTop}
              allLabel={dict.portfolio.all}
              viewProject={dict.portfolio.viewProject}
            />
          ) : (
            <p className="mt-20 font-mono text-sm uppercase tracking-[0.2em] text-white/45">
              {dict.portfolio.ctaText}
            </p>
          )}

          {/* Detailed breakdown of every project */}
          {projects.length > 0 && (
            <Reveal className="mt-24">
              <SectionHeading eyebrow={dict.portfolio.eyebrow} title={dict.portfolio.detailHeading} />
              <ProjectDetailList
                projects={projects}
                labels={{
                  client: dict.portfolio.clientLabel,
                  role: dict.portfolio.roleLabel,
                  challenge: dict.portfolio.challengeLabel,
                  result: dict.portfolio.resultLabel,
                  viewProject: dict.portfolio.viewProject,
                }}
              />
            </Reveal>
          )}

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
