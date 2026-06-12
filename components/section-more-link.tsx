'use client'

import Link from 'next/link'
import { useLocale, useT } from '@/components/i18n-provider'

/**
 * "View more" link shown inside a homepage section, pointing at its subpage.
 * Uses the active locale so it lands on the correct localized route.
 * `to` is the subpage slug, e.g. "services" | "work" | "about".
 */
export function SectionMoreLink({ to, className = '' }: { to: string; className?: string }) {
  const locale = useLocale()
  const t = useT()
  return (
    <Link
      href={`/${locale}/${to}`}
      className={`inline-flex items-center gap-2 border border-[#9268f6]/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9268f6] transition-colors hover:bg-[#9268f6]/10 ${className}`}
    >
      {t.viewMore}
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  )
}
