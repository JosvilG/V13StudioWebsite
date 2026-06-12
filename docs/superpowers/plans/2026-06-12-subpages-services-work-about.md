# Subpáginas Services / Work / About — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three dedicated detail subpages — `/[locale]/services`, `/[locale]/work`, `/[locale]/about` — that expand the homepage's compressed scroll-cinema sections, plus "Ver más" CTAs on the homepage that link to them.

**Architecture:** Each route is an async **server component** (mirrors `app/[locale]/blog/page.tsx`): validates locale, reads `getDictionary(locale)` + Sheets data (`getProjects`/`getTeam`/`getStats`), composes sections from small shared presentational pieces in `components/subpage/`, renders the reused `Footer`. Client interactivity (project filter, the homepage "Ver más" button) lives in small `"use client"` components. The `I18nProvider` in `app/[locale]/layout.tsx` wraps the whole subtree, so client pieces can use `useT()`/`useLocale()`.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, TypeScript, Tailwind v4. **No test runner exists** (`package.json` scripts are only `dev`/`build`/`lint`). Per the repo's existing pattern (the blog pages ship with zero unit tests), verification gates are **`npm run lint` + `npx tsc --noEmit`** plus a manual render check, not test-first TDD.

**Accent color:** `#9268F6` is hardcoded across the codebase (no token). Match that literal.

---

## File Structure

### New files
| File | Responsibility | Type |
|---|---|---|
| `components/subpage/page-hero.tsx` | Back-link + eyebrow + serif title + intro | server |
| `components/subpage/cta-band.tsx` | Closing CTA → `/[locale]#contact` | server |
| `components/subpage/section-heading.tsx` | Small reusable section title (eyebrow + heading) | server |
| `components/subpage/work-grid.tsx` | Project grid + category/year filter | `"use client"` |
| `components/section-more-link.tsx` | "Ver más" button used inside homepage sections | `"use client"` |
| `app/[locale]/services/page.tsx` | Services subpage composition + metadata | server |
| `app/[locale]/work/page.tsx` | Work subpage composition + metadata | server |
| `app/[locale]/about/page.tsx` | About subpage composition + metadata | server |

### Modified files
| File | Change |
|---|---|
| `lib/i18n/dictionaries.ts` | New keys: `viewMore`, `stats.heading`, `services.{howWeWorkHeading,faqHeading,faq}`, `about.{teamHeading,valuesHeading,values}` — interface + en/es/ca |
| `components/sections/services.tsx` | Insert `<SectionMoreLink>` in capabilities view |
| `components/sections/work.tsx` | Insert `<SectionMoreLink>` in projects phase + nosotros phase |
| `components/sections/work-mobile.tsx` | Insert `<SectionMoreLink>` in proyectos + nosotros blocks |

### Reused as-is
`components/sections/footer.tsx`, `components/marquee.tsx`, `components/scroll-reveal.tsx` (used directly — no wrapper), `lib/content.ts`, `lib/i18n/{config,dictionaries}.ts`.

---

## Task 1: i18n — add new dictionary keys

**Files:**
- Modify: `lib/i18n/dictionaries.ts`

- [ ] **Step 1: Extend the `Dictionary` interface**

In the `services` block of the interface (after `items: { title: string; description: string }[]`), add:

```ts
    howWeWorkHeading: string
    faqHeading: string
    faq: { q: string; a: string }[]
```

In the `about` block of the interface (after `founded: string`), add:

```ts
    teamHeading: string
    valuesHeading: string
    values: { title: string; description: string }[]
```

After the `footer` block in the interface (top level, sibling of `footer`), add:

```ts
  stats: { heading: string }
  viewMore: string
```

- [ ] **Step 2: Add the EN values**

In the `en` object's `services` block (after its `items: [...]` array), add:

```ts
    howWeWorkHeading: 'How we work',
    faqHeading: 'Frequently asked questions',
    faq: [
      {
        q: 'How long does a typical project take?',
        a: 'It depends on scope, but most products run 8–16 weeks from concept to launch: 1–2 weeks of strategy, 2–4 weeks of design and architecture, then iterative build sprints. We agree a timeline before we start.',
      },
      {
        q: 'How do you price engagements?',
        a: 'Fixed scope for well-defined projects, or a monthly rate for ongoing product work. We share an estimate after the first strategy conversation — no surprises later.',
      },
      {
        q: 'Can you work with our existing team or codebase?',
        a: 'Yes. We regularly join in-house teams or pick up existing codebases, review the architecture, and ship alongside your engineers.',
      },
      {
        q: 'What happens after launch?',
        a: 'We stay on for monitoring, iteration, and growth work. A launch is a starting point, not a hand-off.',
      },
    ],
```

In the `en` object's `about` block (after `founded: 'Founded',`), add:

```ts
    teamHeading: 'The team',
    valuesHeading: 'What we value',
    values: [
      { title: 'Craft', description: 'PLACEHOLDER — describe the value the studio places on craftsmanship.' },
      { title: 'Ownership', description: 'PLACEHOLDER — describe how the team takes ownership of outcomes.' },
      { title: 'Honesty', description: 'PLACEHOLDER — describe the studio’s commitment to straight talk.' },
    ],
```

In the `en` object, after the `footer: { ... }` block, add these two top-level keys:

```ts
  stats: { heading: 'By the numbers' },
  viewMore: 'View more',
```

- [ ] **Step 3: Add the ES values**

In the `es` object's `services` block (after its `items`), add:

```ts
    howWeWorkHeading: 'Cómo trabajamos',
    faqHeading: 'Preguntas frecuentes',
    faq: [
      {
        q: '¿Cuánto dura un proyecto típico?',
        a: 'Depende del alcance, pero la mayoría de productos van de 8 a 16 semanas del concepto al lanzamiento: 1–2 semanas de estrategia, 2–4 de diseño y arquitectura, y luego sprints iterativos de desarrollo. Acordamos un calendario antes de empezar.',
      },
      {
        q: '¿Cómo calculáis el precio?',
        a: 'Alcance cerrado para proyectos bien definidos, o una tarifa mensual para trabajo de producto continuo. Compartimos una estimación tras la primera conversación de estrategia, sin sorpresas después.',
      },
      {
        q: '¿Podéis trabajar con nuestro equipo o código existente?',
        a: 'Sí. Nos integramos con equipos internos o retomamos bases de código existentes, revisamos la arquitectura y entregamos junto a vuestros ingenieros.',
      },
      {
        q: '¿Qué pasa tras el lanzamiento?',
        a: 'Seguimos con monitorización, iteración y crecimiento. Un lanzamiento es un punto de partida, no una despedida.',
      },
    ],
```

In the `es` object's `about` block (after `founded: 'Fundado',`), add:

```ts
    teamHeading: 'El equipo',
    valuesHeading: 'Lo que valoramos',
    values: [
      { title: 'Oficio', description: 'PLACEHOLDER — describe el valor que el estudio da al oficio y la artesanía.' },
      { title: 'Compromiso', description: 'PLACEHOLDER — describe cómo el equipo se responsabiliza de los resultados.' },
      { title: 'Honestidad', description: 'PLACEHOLDER — describe el compromiso del estudio con hablar claro.' },
    ],
```

In the `es` object, after its `footer` block, add:

```ts
  stats: { heading: 'En cifras' },
  viewMore: 'Ver más',
```

- [ ] **Step 4: Add the CA values**

In the `ca` object's `services` block (after its `items`), add:

```ts
    howWeWorkHeading: 'Com treballem',
    faqHeading: 'Preguntes freqüents',
    faq: [
      {
        q: 'Quant dura un projecte típic?',
        a: 'Depèn de l’abast, però la majoria de productes van de 8 a 16 setmanes del concepte al llançament: 1–2 setmanes d’estratègia, 2–4 de disseny i arquitectura, i després sprints iteratius de desenvolupament. Acordem un calendari abans de començar.',
      },
      {
        q: 'Com calculeu el preu?',
        a: 'Abast tancat per a projectes ben definits, o una tarifa mensual per a feina de producte contínua. Compartim una estimació després de la primera conversa d’estratègia, sense sorpreses després.',
      },
      {
        q: 'Podeu treballar amb el nostre equip o codi existent?',
        a: 'Sí. Ens integrem amb equips interns o reprenem bases de codi existents, revisem l’arquitectura i lliurem al costat dels vostres enginyers.',
      },
      {
        q: 'Què passa després del llançament?',
        a: 'Continuem amb monitoratge, iteració i creixement. Un llançament és un punt de partida, no un comiat.',
      },
    ],
```

In the `ca` object's `about` block (after `founded: 'Fundat',`), add:

```ts
    teamHeading: 'L’equip',
    valuesHeading: 'El que valorem',
    values: [
      { title: 'Ofici', description: 'PLACEHOLDER — descriu el valor que l’estudi dona a l’ofici i l’artesania.' },
      { title: 'Compromís', description: 'PLACEHOLDER — descriu com l’equip es responsabilitza dels resultats.' },
      { title: 'Honestedat', description: 'PLACEHOLDER — descriu el compromís de l’estudi amb parlar clar.' },
    ],
```

In the `ca` object, after its `footer` block, add:

```ts
  stats: { heading: 'En xifres' },
  viewMore: 'Veure’n més',
```

- [ ] **Step 5: Verify lint + types pass**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. (If `tsc` reports a missing property on any locale, a key was added to the interface but not to all three of `en`/`es`/`ca` — add it.)

- [ ] **Step 6: Commit**

```bash
git add lib/i18n/dictionaries.ts
git commit -m "i18n: add subpage keys (viewMore, stats, services.faq, about.values)"
```

---

## Task 2: Shared subpage components

**Files:**
- Create: `components/subpage/page-hero.tsx`
- Create: `components/subpage/section-heading.tsx`
- Create: `components/subpage/cta-band.tsx`

- [ ] **Step 1: Create `page-hero.tsx`**

```tsx
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
}: {
  locale: Locale
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <header className="border-b border-white/10 pb-12">
      <Link
        href={`/${locale}`}
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
```

- [ ] **Step 2: Create `section-heading.tsx`**

```tsx
/** Small section heading: mono eyebrow over an uppercase title. */
export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string
  title: string
}) {
  return (
    <div className="mb-10">
      {eyebrow ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#9268f6]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-2xl font-bold uppercase tracking-[0.18em] text-white sm:text-3xl">
        {title}
      </h2>
    </div>
  )
}
```

- [ ] **Step 3: Create `cta-band.tsx`**

```tsx
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
      <h2 className="mx-auto max-w-2xl text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl"
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
```

- [ ] **Step 4: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/subpage/page-hero.tsx components/subpage/section-heading.tsx components/subpage/cta-band.tsx
git commit -m "feat(subpage): shared page-hero, section-heading, cta-band"
```

---

## Task 3: /services subpage

**Files:**
- Create: `app/[locale]/services/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { PageHero } from '@/components/subpage/page-hero'
import { SectionHeading } from '@/components/subpage/section-heading'
import { CtaBand } from '@/components/subpage/cta-band'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Marquee } from '@/components/marquee'
import { Footer } from '@/components/sections/footer'

export const dynamicParams = true
const siteUrl = 'https://v13studio.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.nav.services,
    description: dict.services.intro,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { en: '/en/services', es: '/es/services', ca: '/ca/services', 'x-default': '/en/services' },
    },
    openGraph: {
      title: `${dict.nav.services} | V13 Studio`,
      description: dict.services.intro,
      url: `${siteUrl}/${locale}/services`,
      type: 'website',
    },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const s = dict.services

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <PageHero
            locale={locale}
            eyebrow={s.eyebrow}
            title={`${s.headingTop} ${s.headingAccent}`}
            intro={s.statementBody}
          />

          {/* Capabilities */}
          <section className="mt-20">
            <SectionHeading title={s.headingAccent} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 60}>
                  <article className="h-full border-l-2 border-white/10 pl-5 transition-colors duration-300 hover:border-[#9268f6]">
                    <span className="font-mono text-[11px] text-[#9a82d6]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-base font-bold uppercase tracking-wide text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Stack marquee */}
          <section className="mt-24">
            <Marquee items={s.stack} />
          </section>

          {/* How we work */}
          <section className="mt-24">
            <SectionHeading eyebrow={dict.process.eyebrow} title={s.howWeWorkHeading} />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {dict.process.steps.map((step, i) => (
                <li key={step.title} className="border-t-2 border-white/10 pt-5">
                  <span className="font-mono text-[11px] text-[#9268f6]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-base font-bold uppercase tracking-[0.16em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9a82d6]">
                    {step.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{step.description}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {dict.process.durationLabel}: {step.duration}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="mt-24">
            <SectionHeading title={s.faqHeading} />
            <div className="divide-y divide-white/10 border-y border-white/10">
              {s.faq.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="text-base font-semibold text-white sm:text-lg">{item.q}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <CtaBand
            locale={locale}
            heading={`${dict.contact.headingTop} ${dict.contact.headingAccent}`}
            cta={dict.contact.ctaProject}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual render check**

Run: `npm run dev`, open `http://localhost:3000/en/services`, `…/es/services`, `…/ca/services`.
Expected: hero, capabilities grid, stack marquee, how-we-work strip, FAQ, CTA band, footer all render; back-link returns to homepage. Visit `http://localhost:3000/zz/services` → 404.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/services/page.tsx
git commit -m "feat(services): add /[locale]/services subpage"
```

---

## Task 4: /work subpage + project grid filter

**Files:**
- Create: `components/subpage/work-grid.tsx`
- Create: `app/[locale]/work/page.tsx`

- [ ] **Step 1: Create `work-grid.tsx` (client filter)**

```tsx
'use client'

import { useMemo, useState } from 'react'
import type { SheetProject } from '@/lib/content'

const isYear = (s: string) => /^\d{4}$/.test(s)

/**
 * Static project grid with category/year filter tabs. Filter logic mirrors
 * components/sections/work.tsx but renders a plain responsive grid (no 3D
 * carousel). `allLabel` and `viewProject` come from the dictionary.
 */
export function WorkGrid({
  projects,
  allLabel,
  viewProject,
  emptyText,
}: {
  projects: SheetProject[]
  allLabel: string
  viewProject: string
  emptyText: string
}) {
  const tabs = useMemo(() => {
    const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort((a, b) =>
      b.localeCompare(a),
    )
    const cats = [...new Set(projects.map((p) => p.category).filter(Boolean))]
    return [allLabel, ...years, ...cats]
  }, [projects, allLabel])

  const [activeTab, setActiveTab] = useState(allLabel)

  const filtered = useMemo(() => {
    if (activeTab === allLabel) return projects
    return projects.filter((p) =>
      isYear(activeTab)
        ? p.year === activeTab
        : p.category === activeTab || p.tags.includes(activeTab),
    )
  }, [projects, activeTab, allLabel])

  if (projects.length === 0) {
    return (
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/45">{emptyText}</p>
    )
  }

  return (
    <div>
      {tabs.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-mono text-xs uppercase tracking-[0.16em] transition-colors"
              style={{ color: activeTab === tab ? '#9268f6' : 'rgba(255,255,255,0.4)' }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-colors duration-300 hover:border-[#9268f6]/40"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-xl leading-tight text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                {p.title}
              </h3>
              {p.year ? <span className="shrink-0 font-mono text-[11px] text-white/35">{p.year}</span> : null}
            </div>
            {p.category ? (
              <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9a82d6]">
                {p.category}
              </span>
            ) : null}
            {p.description ? (
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{p.description}</p>
            ) : null}
            {p.tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[#9268f6] transition-opacity hover:opacity-80"
              >
                {viewProject}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/[locale]/work/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getProjects, getStats } from '@/lib/content'
import { PageHero } from '@/components/subpage/page-hero'
import { SectionHeading } from '@/components/subpage/section-heading'
import { CtaBand } from '@/components/subpage/cta-band'
import { WorkGrid } from '@/components/subpage/work-grid'
import { Footer } from '@/components/sections/footer'

export const dynamicParams = true
const siteUrl = 'https://v13studio.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.nav.work,
    description: dict.portfolio.eyebrow,
    alternates: {
      canonical: `/${locale}/work`,
      languages: { en: '/en/work', es: '/es/work', ca: '/ca/work', 'x-default': '/en/work' },
    },
    openGraph: {
      title: `${dict.nav.work} | V13 Studio`,
      description: dict.portfolio.eyebrow,
      url: `${siteUrl}/${locale}/work`,
      type: 'website',
    },
  }
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const [projects, stats] = await Promise.all([getProjects(locale), getStats(locale)])

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <PageHero
            locale={locale}
            eyebrow={dict.portfolio.eyebrow}
            title={`${dict.portfolio.headingTop} ${dict.portfolio.headingAccent}`}
            intro={dict.portfolio.ctaText}
          />

          <section className="mt-20">
            <WorkGrid
              projects={projects}
              allLabel={dict.portfolio.all}
              viewProject={dict.portfolio.viewProject}
              emptyText={dict.portfolio.ctaText}
            />
          </section>

          {stats.length > 0 && (
            <section className="mt-24">
              <SectionHeading title={dict.stats.heading} />
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-t-2 border-white/10 pt-5">
                    <div className="text-4xl font-light text-white sm:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
                      {stat.value}
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <CtaBand
            locale={locale}
            heading={`${dict.contact.headingTop} ${dict.contact.headingAccent}`}
            cta={dict.contact.ctaProject}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Manual render check**

Run: `npm run dev`, open `http://localhost:3000/en/work`. Expected: hero, filter tabs (if any projects), project grid, stats band (only if the Sheet returns stats), CTA, footer. With no `SHEETS_PROJECTS_CSV_URL` configured locally, `getProjects` returns `[]` → the grid shows the empty text (no crash). `…/zz/work` → 404.

- [ ] **Step 5: Commit**

```bash
git add components/subpage/work-grid.tsx app/[locale]/work/page.tsx
git commit -m "feat(work): add /[locale]/work subpage with filterable project grid"
```

---

## Task 5: /about subpage

**Files:**
- Create: `app/[locale]/about/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { getTeam, getStats } from '@/lib/content'
import { PageHero } from '@/components/subpage/page-hero'
import { SectionHeading } from '@/components/subpage/section-heading'
import { CtaBand } from '@/components/subpage/cta-band'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Footer } from '@/components/sections/footer'

export const dynamicParams = true
const siteUrl = 'https://v13studio.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    title: dict.nav.about,
    description: dict.about.intro,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: '/en/about', es: '/es/about', ca: '/ca/about', 'x-default': '/en/about' },
    },
    openGraph: {
      title: `${dict.nav.about} | V13 Studio`,
      description: dict.about.intro,
      url: `${siteUrl}/${locale}/about`,
      type: 'website',
    },
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const a = dict.about
  const [team, stats] = await Promise.all([getTeam(locale), getStats(locale)])

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <PageHero locale={locale} eyebrow={a.eyebrow} title={a.title} intro={a.statement} />

          {/* Pillars */}
          <section className="mt-20 grid gap-10 sm:grid-cols-3">
            {a.pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 60}>
                <div>
                  <span className="mb-3 block h-px w-10 bg-[#9268f6]/70" />
                  <h3 className="text-base font-bold uppercase tracking-[0.2em] text-white sm:text-lg">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{pillar.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </section>

          {/* Story */}
          <section className="mt-24 max-w-3xl">
            <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>
              {a.headingTop} {a.headingAccent}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/65">{a.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-white/65">{a.p2}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              {a.location} · {a.founded}
            </p>
          </section>

          {/* Team (Sheets-backed; hidden if empty) */}
          {team.length > 0 && (
            <section className="mt-24">
              <SectionHeading title={a.teamHeading} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {team.map((member) => (
                  <div key={member.initials} className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.initials}
                    </span>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Values (placeholder copy — to be filled by owner) */}
          <section className="mt-24">
            <SectionHeading title={a.valuesHeading} />
            <div className="grid gap-8 sm:grid-cols-3">
              {a.values.map((value) => (
                <div key={value.title} className="border-l-2 border-white/10 pl-5">
                  <h3 className="text-base font-bold uppercase tracking-wide text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats (Sheets-backed; hidden if empty) */}
          {stats.length > 0 && (
            <section className="mt-24">
              <SectionHeading title={dict.stats.heading} />
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-t-2 border-white/10 pt-5">
                    <div className="text-4xl font-light text-white sm:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
                      {stat.value}
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <CtaBand
            locale={locale}
            heading={`${dict.contact.headingTop} ${dict.contact.headingAccent}`}
            cta={dict.contact.ctaProject}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Manual render check**

Run: `npm run dev`, open `http://localhost:3000/en/about`. Expected: hero, pillars, story, values (placeholder copy visible), CTA, footer. Team + stats sections appear only when their Sheets return data (absent locally → hidden, no crash). `…/zz/about` → 404.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/about/page.tsx
git commit -m "feat(about): add /[locale]/about subpage"
```

---

## Task 6: "Ver más" CTA on the homepage sections

**Files:**
- Create: `components/section-more-link.tsx`
- Modify: `components/sections/services.tsx`
- Modify: `components/sections/work.tsx`
- Modify: `components/sections/work-mobile.tsx`

- [ ] **Step 1: Create `section-more-link.tsx`**

```tsx
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
```

- [ ] **Step 2: Insert into `services.tsx` capabilities view**

In `components/sections/services.tsx`, add the import near the other component imports (after line 8 `import { ServicesBackdrop } from "./services-backdrop"`):

```tsx
import { SectionMoreLink } from "@/components/section-more-link"
```

Then, inside the capabilities `<div ref={capRef} …>`, immediately after the closing `</ul>` of the items list (the `</ul>` on line 230) and before the closing `</div>` on line 231, add:

```tsx
            <div className="mt-10">
              <SectionMoreLink to="services" />
            </div>
```

- [ ] **Step 3: Insert into `work.tsx` projects phase and nosotros phase**

In `components/sections/work.tsx`, add the import after line 6 (`import { WorkMobile } from "./work-mobile"`):

```tsx
import { SectionMoreLink } from "@/components/section-more-link"
```

**Projects phase** — inside the `<div ref={pfRef} …>` block, replace the scroll-hint block (lines 470-475):

```tsx
        <div className="relative z-10 mt-8 flex flex-col items-center gap-2">
          <svg className="h-4 w-4 animate-bounce text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/45">{t.portfolio.scroll}</span>
        </div>
```

with:

```tsx
        <div className="relative z-10 mt-8 flex flex-col items-center gap-4">
          <SectionMoreLink to="work" />
          <div className="flex flex-col items-center gap-2">
            <svg className="h-4 w-4 animate-bounce text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/45">{t.portfolio.scroll}</span>
          </div>
        </div>
```

**Nosotros phase** — inside `<div ref={aboutContentRef} …>`, immediately after the pillars grid `</div>` (the closing div of the `grid … sm:grid-cols-3` block, line 606) and before the closing `<p>` tagline on line 608, add:

```tsx
          <div className="mt-12">
            <SectionMoreLink to="about" />
          </div>
```

- [ ] **Step 4: Insert into `work-mobile.tsx`**

In `components/sections/work-mobile.tsx`, add the import after line 4 (`import type { SheetProject } …`):

```tsx
import { SectionMoreLink } from "@/components/section-more-link"
```

**Proyectos block** — after the projects conditional block closes (the `)}` on line 85, closing the `projects.length > 0 ? … : …` expression) and before the closing `</div>` on line 86, add:

```tsx
        <div className="mt-8">
          <SectionMoreLink to="work" />
        </div>
```

**Nosotros block** — inside the `<div className="relative z-10 px-6 py-14">`, after the pillars `</div>` (closing the `space-y-8` block, line 160) and before its closing `</div>` on line 161, add:

```tsx
          <div className="mt-10">
            <SectionMoreLink to="about" />
          </div>
```

(No "Ver más" for Services on mobile is required — the homepage mobile Services view is covered by the same `services.tsx` change in Step 2, which renders on mobile too.)

- [ ] **Step 5: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Manual render check**

Run: `npm run dev`, open `http://localhost:3000/es`. Scroll to the Services capabilities view → "Ver más" appears → click → lands on `/es/services`. Scroll through Work: projects phase shows "Ver más" → `/es/work`; nosotros phase shows "Ver más" → `/es/about`. Resize to mobile width and confirm the mobile Work section shows both "Ver más" links.

- [ ] **Step 7: Commit**

```bash
git add components/section-more-link.tsx components/sections/services.tsx components/sections/work.tsx components/sections/work-mobile.tsx
git commit -m "feat(home): add 'Ver más' CTAs linking sections to their subpages"
```

---

## Final verification

- [ ] **Full build passes**

Run: `npm run build`
Expected: build succeeds; `/[locale]/services`, `/[locale]/work`, `/[locale]/about` appear in the route list for the prerendered locales.

- [ ] **Cross-check spec coverage** — services/work/about pages exist with the agreed sections; "Ver más" CTAs wired on desktop + mobile; single English slugs under `/[locale]`; menu unchanged; Sheets sections degrade gracefully when empty; new copy real (FAQ) vs placeholder (about values) as agreed.

## Notes for the owner (post-implementation)

- Fill the real copy for `about.values` (currently marked `PLACEHOLDER`) in `lib/i18n/dictionaries.ts` for en/es/ca.
- Review the proposed `services.faq` wording.
- Team and stats sections on /about and the stats band on /work only show when `SHEETS_TEAM_CSV_URL` / `SHEETS_STATS_CSV_URL` return rows.
