import type { Locale } from '@/lib/i18n/config'

export interface SheetProject {
  id: string
  title: string
  year: string
  color: string
  tags: string[]
  url?: string
  category: string
  description: string
}

export interface SheetTeamMember {
  initials: string
  color: string
  role: string
}

export interface SheetStat {
  value: string
  label: string
}

const REVALIDATE_SECONDS = 600
const DEFAULT_COLOR = '#8B5CF6'

/**
 * Minimal CSV parser handling quoted fields, escaped quotes ("") and
 * newlines inside quotes (Google Sheets "publish to web" CSV format).
 * Returns one record per row keyed by the header row.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (ch !== '\r') {
      field += ch
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  const [header, ...data] = rows
  if (!header) return []

  return data
    .filter((r) => r.some((cell) => cell.trim() !== ''))
    .map((r) =>
      Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? '').trim()])),
    )
}

async function fetchSheet(url: string | undefined): Promise<Record<string, string>[]> {
  if (!url) return []
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) {
      console.error(`[content] Sheet fetch failed: ${res.status} ${url}`)
      return []
    }
    return parseCsv(await res.text())
  } catch (error) {
    console.error('[content] Sheet fetch error:', error)
    return []
  }
}

/**
 * Read `<base>_<locale>` column, falling back to English.
 * An empty cell is treated as missing — it falls through to the `_en` column.
 */
function localized(row: Record<string, string>, base: string, locale: Locale): string {
  return row[`${base}_${locale}`] || row[`${base}_en`] || ''
}

export async function getProjects(locale: Locale): Promise<SheetProject[]> {
  const rows = await fetchSheet(process.env.SHEETS_PROJECTS_CSV_URL)
  return rows
    .filter((row) => row.id && row.title)
    .map((row) => ({
      id: row.id,
      title: row.title,
      year: row.year || '',
      color: row.color || DEFAULT_COLOR,
      tags: (row.tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      // Rendered as <a href>; safe only because the sheet is owner-controlled.
      url: row.url || undefined,
      category: localized(row, 'category', locale),
      description: localized(row, 'description', locale),
    }))
}

export async function getTeam(locale: Locale): Promise<SheetTeamMember[]> {
  const rows = await fetchSheet(process.env.SHEETS_TEAM_CSV_URL)
  return rows
    .filter((row) => row.initials)
    .map((row) => ({
      initials: row.initials,
      color: row.color || DEFAULT_COLOR,
      role: localized(row, 'role', locale),
    }))
}

export async function getStats(locale: Locale): Promise<SheetStat[]> {
  const rows = await fetchSheet(process.env.SHEETS_STATS_CSV_URL)
  return rows
    .filter((row) => row.value)
    .map((row) => ({
      value: row.value,
      label: localized(row, 'label', locale),
    }))
}
