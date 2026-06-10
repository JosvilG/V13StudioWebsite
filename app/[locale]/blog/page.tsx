import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/blog'
import { isLocale, localeHtmlLang } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

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

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const posts = getAllPosts(locale)

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${locale}`}
          className="text-xs font-mono tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
        >
          {dict.blog.backHome}
        </Link>

        <h1 className="mt-8 text-4xl sm:text-6xl font-bold tracking-tight">
          Blog
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl">{dict.blog.intro}</p>

        <ul className="mt-16 space-y-px">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group block border-b border-border py-8 transition-colors hover:bg-primary/5"
              >
                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>
                    {post.readingTime} {dict.blog.minRead}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>

        {posts.length === 0 && (
          <p className="mt-16 text-muted-foreground">{dict.blog.comingSoon}</p>
        )}
      </div>
    </main>
  )
}
