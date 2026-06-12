import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { PageHero } from '@/components/subpage/page-hero'
import { SectionHeading } from '@/components/subpage/section-heading'
import { CtaBand } from '@/components/subpage/cta-band'
import { Reveal } from '@/components/subpage/reveal'
import { TechBento } from '@/components/subpage/tech-bento'
import { ServicesBackdrop } from '@/components/sections/services-backdrop'
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
    title: dict.nav.services,
    description: dict.services.intro,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: '/en/services', es: '/es/services', ca: '/ca/services', 'x-default': '/en/services' },
    },
    openGraph: {
      title: `${dict.nav.services} | V13 Studio`,
      description: dict.services.intro,
      url: `${siteUrl}/${locale}/services`,
      type: 'website',
    },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const s = dict.services

  return (
    <>
      <main className="relative min-h-screen bg-[#070a0e] text-white">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <ServicesBackdrop />
        </div>
        <div className="subpage-enter relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <PageHero
            locale={locale}
            eyebrow={s.eyebrow}
            title={`${s.headingTop} ${s.headingAccent}`}
            intro={s.statementBody}
          />

          {/* Capabilities */}
          <Reveal className="mt-20">
            <SectionHeading title={s.headingAccent} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.map((item, i) => (
                <article
                  key={item.title}
                  className="h-full border-l-2 border-white/10 pl-5 transition-colors duration-300 hover:border-[#9268f6]"
                >
                  <span className="font-mono text-[11px] text-[#9a82d6]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-base font-bold uppercase tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
                </article>
              ))}
            </div>
          </Reveal>

          {/* Tech stack bento */}
          <Reveal className="mt-24">
            <SectionHeading title={s.techHeading} />
            <TechBento groups={s.techGroups} />
          </Reveal>

          {/* How we work */}
          <Reveal className="mt-24">
            <SectionHeading eyebrow={dict.process.eyebrow} title={s.howWeWorkHeading} />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {dict.process.steps.map((step, i) => (
                <li key={step.title} className="border-t-2 border-white/10 pt-5">
                  <span className="font-mono text-[11px] text-[#9268f6]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-base font-bold uppercase tracking-[0.16em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9a82d6]">
                    {step.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{step.description}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {dict.process.durationLabel}: {step.duration}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* FAQ */}
          <Reveal className="mt-24">
            <SectionHeading title={s.faqHeading} />
            <div className="divide-y divide-white/10 border-y border-white/10">
              {s.faq.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="text-base font-semibold text-white sm:text-lg">{item.q}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">{item.a}</p>
                </div>
              ))}
            </div>
          </Reveal>

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
