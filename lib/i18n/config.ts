export const locales = ['en', 'es', 'ca'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  ca: 'CA',
}

// BCP-47 tags for <html lang> / hreflang
export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  es: 'es-ES',
  ca: 'ca-ES',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
