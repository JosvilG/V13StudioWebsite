import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import { SmoothScrollProvider } from '@/components/smooth-scroll'
import { I18nProvider } from '@/components/i18n-provider'
import { locales, isLocale, localeHtmlLang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import '../globals.css'

const siteUrl = 'https://v13studio.com'

const ogLocale: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  ca: 'ca_ES',
}

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: '%s | V13 Studio',
    },
    description: dict.meta.description,
    keywords: [
      'product studio',
      'software development',
      'mobile development',
      'web development',
      'UX/UI design',
      'React Native',
      'NestJS',
      'Catalonia',
      'Spain',
    ],
    authors: [{ name: 'V13 Studio' }],
    creator: 'V13 Studio',
    publisher: 'V13 Studio',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
        ca: '/ca',
        'x-default': '/en',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${siteUrl}/${locale}`,
      siteName: 'V13 Studio',
      locale: ogLocale[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#0D1B2A',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'V13 Studio',
        url: siteUrl,
        logo: `${siteUrl}/logo-light.png`,
        email: 'v13studio@v13studio.com',
        description: dict.meta.description,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Catalonia',
          addressCountry: 'ES',
        },
        areaServed: 'Worldwide',
        knowsAbout: [
          'Software development',
          'Mobile app development',
          'Web development',
          'UX/UI design',
          'React Native',
          'NestJS',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'V13 Studio',
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: locale,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: 'V13 Studio',
        url: siteUrl,
        image: `${siteUrl}/logo-light.png`,
        email: 'v13studio@v13studio.com',
        priceRange: '$$',
        parentOrganization: { '@id': `${siteUrl}/#organization` },
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Catalonia',
          addressCountry: 'ES',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Software product services',
          itemListElement: dict.services.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title },
          })),
        },
      },
    ],
  }

  return (
    <html lang={localeHtmlLang[locale]} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <I18nProvider locale={locale} dict={dict}>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
