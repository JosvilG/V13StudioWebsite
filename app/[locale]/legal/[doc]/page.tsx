import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locales, isLocale, localeHtmlLang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import {
  legalSlugs,
  isLegalSlug,
  getLegalDoc,
  getLegalDocs,
  legalLastUpdated,
} from '@/lib/i18n/legal'

const siteUrl = 'https://v13studio.com'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    legalSlugs.map((doc) => ({ locale, doc })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>
}): Promise<Metadata> {
  const { locale, doc } = await params
  if (!isLocale(locale) || !isLegalSlug(doc)) return {}
  const legal = getLegalDoc(locale, doc)

  return {
    title: legal.title,
    description: legal.description,
    alternates: {
      canonical: `/${locale}/legal/${doc}`,
      languages: {
        en: `/en/legal/${doc}`,
        es: `/es/legal/${doc}`,
        ca: `/ca/legal/${doc}`,
        'x-default': `/en/legal/${doc}`,
      },
    },
    openGraph: {
      title: legal.title,
      description: legal.description,
      url: `${siteUrl}/${locale}/legal/${doc}`,
      type: 'website',
    },
    // Legal pages add little SEO value and can dilute crawl budget.
    robots: { index: false, follow: true },
  }
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(
    localeHtmlLang[locale as 'en'] ?? 'en',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>
}) {
  const { locale, doc } = await params
  if (!isLocale(locale) || !isLegalSlug(doc)) notFound()

  const dict = getDictionary(locale)
  const legal = getLegalDoc(locale, doc)
  const otherDocs = getLegalDocs(locale).filter((d) => d.slug !== doc)

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${locale}`}
          className="text-xs font-mono tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
        >
          {dict.legal.backHome}
        </Link>

        <h1 className="mt-8 text-4xl sm:text-6xl font-bold tracking-tight">
          {legal.title}
        </h1>

        <p className="mt-4 text-xs font-mono tracking-[0.15em] text-muted-foreground uppercase">
          {dict.legal.lastUpdated}: {formatDate(legalLastUpdated, locale)}
        </p>

        <p className="mt-8 text-lg text-muted-foreground">{legal.intro}</p>

        <div className="mt-12 space-y-10">
          {legal.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Cross-links to the other legal documents */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase mb-4">
            {dict.legal.moreDocuments}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {otherDocs.map((d) => (
              <Link
                key={d.slug}
                href={`/${locale}/legal/${d.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {d.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
