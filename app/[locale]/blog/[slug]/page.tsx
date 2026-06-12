import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs, sourceHost } from '@/lib/blog'
import { locales, isLocale, localeHtmlLang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

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
    <main className="min-h-screen bg-background text-foreground px-6 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <article className="max-w-3xl mx-auto">
        <Link
          href={`/${locale}/blog`}
          className="text-xs font-mono tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
        >
          {dict.blog.backToBlog}
        </Link>

        <div className="mt-8 flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>
            {post.readingTime} {dict.blog.minRead}
          </span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          {post.body.map((block, i) =>
            block.type === 'h2' ? (
              <h2
                key={i}
                className="text-2xl sm:text-3xl font-bold tracking-tight pt-4"
              >
                {block.text}
              </h2>
            ) : (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            ),
          )}
        </div>

        {post.sources.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground">
              {dict.blog.sources}
            </h2>
            <ul className="mt-4 space-y-2">
              {post.sources.map((src) => (
                <li key={src}>
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    {sourceHost(src)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-3 text-primary hover:underline"
          >
            {dict.blog.cta}
          </Link>
        </div>
      </article>
    </main>
  )
}
