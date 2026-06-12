import type { MetadataRoute } from 'next'
import { getPostSlugs } from '@/lib/blog'
import { locales } from '@/lib/i18n/config'

const baseUrl = 'https://v13studio.com'

function languagesFor(path: string): Record<string, string> {
  const langs: Record<string, string> = {}
  for (const locale of locales) {
    langs[locale] = `${baseUrl}/${locale}${path}`
  }
  langs['x-default'] = `${baseUrl}/en${path}`
  return langs
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  const slugs = await getPostSlugs()

  const staticPages: { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
    { path: '', changeFrequency: 'monthly', priority: 1 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/work', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    // Legal docs are noindex — keep them out of the sitemap.
  ]

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: languagesFor(page.path) },
      })
    }
    for (const slug of slugs) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: { languages: languagesFor(`/blog/${slug}`) },
      })
    }
  }

  return entries
}
