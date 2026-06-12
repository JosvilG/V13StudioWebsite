'use client'

/**
 * Re-mounted by Next.js on every navigation within the [locale] segment, so the
 * fade replays on each route change. Opacity-only — never wraps the homepage in a
 * transform (which would break its fixed header + scroll-scrubbed choreography).
 */
export default function LocaleTemplate({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>
}
