import type { Locale } from './i18n/config'
import { fetchSheet, localized } from './content'
import { parseMarkdownToBlocks } from './markdown'

export type BlogBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }

export interface BlogPost {
  slug: string
  title: string
  description: string
  /** ISO date, e.g. 2026-06-10 */
  date: string
  author: string
  tags: string[]
  /** Estimated reading time in minutes */
  readingTime: number
  body: BlogBlock[]
  /** Source URLs the post was researched from (column `sources`). */
  sources: string[]
}

/** Display label for a source link: bare host without the `www.` prefix, or the raw string if unparseable. */
export function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/** Map one CSV row to a BlogPost for a locale, or null if not a published post. */
export function rowToPost(row: Record<string, string>, locale: Locale): BlogPost | null {
  if (!row.slug || row.status !== 'published') return null
  const rt = parseInt(row.readingTime, 10)
  return {
    slug: row.slug,
    date: row.date || '',
    author: row.author || 'V13 Studio',
    tags: (row.tags || '').split(',').map((t) => t.trim()).filter(Boolean),
    readingTime: Number.isFinite(rt) && rt > 0 ? rt : 1,
    title: localized(row, 'title', locale),
    description: localized(row, 'description', locale),
    body: parseMarkdownToBlocks(localized(row, 'body', locale)),
    sources: (row.sources || '').split(',').map((s) => s.trim()).filter(Boolean),
  }
}

export async function getAllPosts(locale: Locale): Promise<BlogPost[]> {
  const rows = await fetchSheet(process.env.SHEETS_POSTS_CSV_URL)
  return rows
    .map((r) => rowToPost(r, locale))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<BlogPost | undefined> {
  return (await getAllPosts(locale)).find((p) => p.slug === slug)
}

/** Locale-independent published slugs, for generateStaticParams + sitemap. */
export async function getPostSlugs(): Promise<string[]> {
  const rows = await fetchSheet(process.env.SHEETS_POSTS_CSV_URL)
  return rows.filter((r) => r.slug && r.status === 'published').map((r) => r.slug)
}
