import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'

/**
 * Subpage header: back-link to the homepage, mono eyebrow, big serif title,
 * and an intro paragraph. Mirrors the blog index header idiom.
 */
export function PageHero({
  locale,
  eyebrow,
  title,
  intro,
  section,
}: {
  locale: Locale
  eyebrow: string
  title: string
  intro: string
  /** Homepage anchor to return to (e.g. "about"); defaults to the top. */
  section?: string
}) {
  return (
    <header className="border-b border-white/10 pb-12">
      <Link
        href={section ? `/${locale}#${section}` : `/${locale}`}
        scroll={false}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#9268f6]"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        V13 Studio
      </Link>

      <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-[#9268f6]">
        {eyebrow}
      </p>
      <h1
        className="mt-4 text-6xl font-light tracking-tight text-white sm:text-7xl md:text-8xl"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55">{intro}</p>
    </header>
  )
}
