import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, type BlogPost } from '@/lib/blog'
import { isLocale, localeHtmlLang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
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
  const title = `Blog | V13 Studio`

  return {
    title: 'Blog',
    description: dict.blog.intro,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: '/en/blog',
        es: '/es/blog',
        ca: '/ca/blog',
        'x-default': '/en/blog',
      },
    },
    openGraph: {
      title,
      description: dict.blog.intro,
      url: `${siteUrl}/${locale}/blog`,
      type: 'website',
    },
  }
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(localeHtmlLang[locale as 'en'] ?? 'en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function Meta({
  post,
  minRead,
}: {
  post: BlogPost & { dateLabel: string }
  minRead: string
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
      <time dateTime={post.date}>{post.dateLabel}</time>
      <span className="h-1 w-1 rounded-full bg-white/30" />
      <span>
        {post.readingTime} {minRead}
      </span>
    </div>
  )
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.slice(0, 4).map((tag) => (
        <span
          key={tag}
          className="border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const raw = await getAllPosts(locale)
  const posts = raw.map((p) => ({ ...p, dateLabel: formatDate(p.date, locale) }))
  const [featured, ...rest] = posts

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          {/* top bar */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#7ca8ff]"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {dict.blog.backHome}
          </Link>

          {/* header */}
          <header className="mt-12 border-b border-white/10 pb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#7ca8ff]">
              V13 Studio
            </p>
            <h1
              className="mt-4 text-6xl font-light tracking-tight text-white sm:text-7xl md:text-8xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Journal
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
              {dict.blog.intro}
            </p>
          </header>

          {posts.length === 0 && (
            <p className="mt-16 font-mono text-sm uppercase tracking-[0.2em] text-white/45">
              {dict.blog.comingSoon}
            </p>
          )}

          {/* featured */}
          {featured && (
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="group relative mt-16 block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 transition-all duration-300 hover:border-[#7ca8ff]/40 sm:p-12"
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-90"
                style={{ background: 'radial-gradient(circle, rgba(124,168,255,0.22), transparent 70%)' }}
              />
              <div className="relative">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7ca8ff]">
                  {dict.blog.featured}
                </span>
                <div className="mt-4">
                  <Meta post={featured} minRead={dict.blog.minRead} />
                </div>
                <h2
                  className="mt-4 max-w-3xl text-3xl font-medium leading-tight text-white transition-colors group-hover:text-[#dce8ff] sm:text-4xl md:text-5xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
                  {featured.description}
                </p>
                <Tags tags={featured.tags} />
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#7ca8ff]">
                  {dict.blog.readArticle}
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          {/* grid */}
          {rest.length > 0 && (
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition-all duration-300 hover:border-[#7ca8ff]/40"
                >
                  <Meta post={post} minRead={dict.blog.minRead} />
                  <h3
                    className="mt-4 text-2xl font-medium leading-tight text-white transition-colors group-hover:text-[#dce8ff]"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">
                    {post.description}
                  </p>
                  <Tags tags={post.tags} />
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45 transition-colors group-hover:text-[#7ca8ff]">
                    {dict.blog.readArticle}
                    <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
