import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'

/**
 * Closing call-to-action. Links to the homepage contact anchor (the contact
 * form lives on the homepage as `#contact`).
 */
export function CtaBand({
  locale,
  heading,
  cta,
}: {
  locale: Locale
  heading: string
  cta: string
}) {
  return (
    <section className="mt-24 border-t border-white/10 pt-16 text-center">
      <h2
        className="mx-auto max-w-2xl text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {heading}
      </h2>
      <Link
        href={`/${locale}#contact`}
        className="mt-8 inline-flex items-center gap-2 border border-[#9268f6] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#9268f6] transition-colors hover:bg-[#9268f6]/10"
      >
        {cta}
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </section>
  )
}
