import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import Link from 'next/link'
import { SectionHeading } from '@/components/subpage/section-heading'
import { CtaBand } from '@/components/subpage/cta-band'
import { ServicesHero } from '@/components/subpage/services-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Marquee } from '@/components/marquee'
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
        <ServicesBackdrop />
        <div className="subpage-enter relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#9268f6]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            V13 Studio
          </Link>

          {/* Scroll crossfade hero — echoes the homepage Services section */}
          <ServicesHero
            statementHeading={s.statementHeading}
            statementBody={s.statementBody}
            stack={s.stack}
            capHeading={`${s.headingTop} ${s.headingAccent}`}
          />

          {/* Capabilities */}
          <section className="mt-8">
            <SectionHeading eyebrow={s.eyebrow} title={s.headingAccent} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <article className="h-full border-l-2 border-white/10 pl-5 transition-colors duration-300 hover:border-[#9268f6]">
                    <span className="font-mono text-[11px] text-[#9a82d6]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-base font-bold uppercase tracking-wide text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Stack marquee */}
          <section className="mt-24">
            <Marquee items={s.stack} />
          </section>

          {/* How we work */}
          <ScrollReveal className="mt-24">
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
          </ScrollReveal>

          {/* FAQ */}
          <ScrollReveal className="mt-24">
            <SectionHeading title={s.faqHeading} />
            <div className="divide-y divide-white/10 border-y border-white/10">
              {s.faq.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="text-base font-semibold text-white sm:text-lg">{item.q}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">{item.a}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

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
