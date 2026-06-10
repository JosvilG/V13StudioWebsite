import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/config'

function detectLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language')
  if (header) {
    const preferred = header
      .split(',')
      .map((part) => part.split(';')[0].trim().slice(0, 2).toLowerCase())
    for (const lang of preferred) {
      if ((locales as readonly string[]).includes(lang)) return lang
    }
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  const locale = detectLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals, API, and static/SEO files (robots, sitemap, manifest, icons, images)
  matcher: [
    '/((?!_next|api|.*\\..*|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image).*)',
  ],
}
