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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: languagesFor('') },
    })
    entries.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: languagesFor('/blog') },
    })
    for (const slug of getPostSlugs()) {
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
