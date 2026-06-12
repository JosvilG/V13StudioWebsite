import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs, sourceHost } from '@/lib/blog'
import { locales, isLocale, localeHtmlLang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Footer } from '@/components/sections/footer'

const siteUrl = 'https://v13studio.com'

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = await getPostBySlug(locale, slug)
  if (!post) return {}

  const url = `${siteUrl}/${locale}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
      languages: {
        en: `/en/blog/${post.slug}`,
        es: `/es/blog/${post.slug}`,
        ca: `/ca/blog/${post.slug}`,
        'x-default': `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(
    localeHtmlLang[locale as 'en'] ?? 'en',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const post = await getPostBySlug(locale, slug)
  if (!post) notFound()
  const dict = getDictionary(locale)

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author, url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'V13 Studio',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo-light.png` },
    },
    mainEntityOfPage: `${siteUrl}/${locale}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    inLanguage: locale,
  }

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        <article className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#9268f6]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {dict.blog.backToBlog}
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>
              {post.readingTime} {dict.blog.minRead}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#9268f6]/60" />
            <span className="text-white/35">{dict.blog.aiDisclosure}</span>
          </div>

          <h1
            className="mt-5 text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-12 space-y-6 border-t border-white/10 pt-12">
            {post.body.map((block, i) =>
              block.type === 'h2' ? (
                <h2
                  key={i}
                  className="pt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {block.text}
                </h2>
              ) : (
                <p key={i} className="text-lg leading-relaxed text-white/70">
                  {block.text}
                </p>
              ),
            )}
          </div>

          {post.sources.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                {dict.blog.sources}
              </h2>
              <ul className="mt-4 space-y-2">
                {post.sources.map((src) => (
                  <li key={src}>
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all font-mono text-sm text-white/55 transition-colors hover:text-[#9268f6]"
                    >
                      {sourceHost(src)}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-16 border-t border-white/10 pt-8">
            <Link
              href={`/${locale}#contact`}
              className="group inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.15em] text-[#9268f6] transition-opacity hover:opacity-80"
            >
              {dict.blog.cta}
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
