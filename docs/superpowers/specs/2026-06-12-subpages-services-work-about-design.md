# Subpáginas: Services / Work / About — Design

**Date:** 2026-06-12
**Branch:** restyle/web-redesign
**Status:** Approved (design), pending implementation plan

## Goal

Add three dedicated subpages that expand the homepage's compressed scroll-cinema
sections into fuller, browsable detail pages:

- `/[locale]/services` — Servicios
- `/[locale]/work` — Trabajos
- `/[locale]/about` — Nosotros

The homepage keeps its single-page choreographed experience. The subpages are
where a visitor goes to read more about each apartado.

## Decisions (locked)

| Topic | Decision |
|---|---|
| Visual style | **Híbrido** — static base + light scroll-reveal / glow touches. Reuse the dark/neon language. Model: the existing blog pages. NOT the heavy homepage choreography. |
| Content | Reuse existing dict + Sheets content, **add new sections**. Some new copy proposed real (services FAQ); some placeholder for the user to fill later (about "valores"). |
| URL scheme | Single English slug, like `/[locale]/blog`: `/[locale]/services`, `/[locale]/work`, `/[locale]/about`. |
| Navigation | Header menu **keeps in-page anchors unchanged**. Each relevant homepage section gains a "Ver más" CTA that links to its subpage. Subpages are NOT added to the menu. |

## Architecture

Approach A — server composition + small client pieces (chosen over a monolithic
`"use client"` page for SEO, focused files, and consistency with the blog pattern).

- Each route `app/[locale]/<slug>/page.tsx` is an **async server component** (like
  `app/[locale]/blog/page.tsx`): validates locale, reads `getDictionary(locale)`
  and any Sheets data, composes sections, renders `Footer`.
- Each exports `generateMetadata` with `title`, `description`, and `alternates`
  (canonical + `languages` for en/es/ca + `x-default`), mirroring the blog page.
- `export const dynamicParams = true` to match blog.
- Shared presentational pieces live in `components/subpage/`. Client-only
  interactivity (project filter, reveal-on-scroll) lives in small client
  components so the page shells stay server-rendered.

### New files

```
app/[locale]/services/page.tsx        server: composes services subpage
app/[locale]/work/page.tsx            server: composes work subpage
app/[locale]/about/page.tsx           server: composes about subpage

components/subpage/page-hero.tsx      back-link + eyebrow + serif title + intro
components/subpage/cta-band.tsx       closing CTA → contact (link to /[locale]#contact)
components/subpage/section-heading.tsx small reusable section title
components/subpage/reveal.tsx         thin client wrapper over existing scroll-reveal (or reuse components/scroll-reveal.tsx directly if it fits)
components/subpage/work-grid.tsx      "use client": project grid + category/year filter
components/subpage/section-more-link.tsx "use client": the "Ver más" button used inside homepage sections
```

(If `components/scroll-reveal.tsx` already exposes a usable wrapper, `reveal.tsx`
is dropped and we reuse it directly — confirm during implementation.)

### Shared shell

All three pages render:

1. `PageHero` — back-link to `/[locale]` (arrow + "V13 Studio", like blog),
   eyebrow (mono, accent `#9268f6`), big serif/uppercase title, intro paragraph.
2. Page-specific sections (below).
3. `CtaBand` — closing call-to-action linking to the homepage contact anchor.
4. `Footer` (reused).

Container: `min-h-screen bg-black text-white`, `mx-auto max-w-6xl px-6 py-24`,
matching the blog page.

## Page content

### /services — reuses `dict.services` + `dict.process`

1. **Hero** — eyebrow `services.eyebrow`, title from `services.headingTop` +
   `services.headingAccent`, intro `services.statementBody`.
2. **Capabilities grid** — the 6 `services.items` as numbered cards
   (`01`–`06`, title, description), border-left accent on hover (same idiom as
   the homepage services list).
3. **Stack marquee** — `services.stack` tech names as a marquee row
   (reuse `components/marquee.tsx`).
4. **How we work strip** — the 4 `process.steps` (title, tagline, description,
   duration) as a compact horizontal/stacked strip. Copy already exists in dict.
5. **FAQ (NEW copy)** — 3–4 Q&A. Real copy proposed by implementer in all three
   locales, stored under a new `services.faq: { q: string; a: string }[]` key in
   the dictionary. User reviews wording.
6. **CtaBand** → contact.

### /work — reuses `getProjects(locale)` + `getStats(locale)`

1. **Hero** — `portfolio.eyebrow`, title `portfolio.headingTop` +
   `portfolio.headingAccent`.
2. **Project grid + filter** (`work-grid.tsx`, client) — all projects as cards
   (title, year, category, tags, description, `View Project` link when `url`).
   Filter tabs by `All` + years + categories, reusing the filter logic from
   `components/sections/work.tsx` (extracted/simplified, static grid — no 3D
   carousel). Graceful empty state when no projects.
3. **Stats band** — `getStats(locale)` value/label pairs. Hidden entirely if the
   Sheet returns none (no empty band).
4. **CtaBand** → contact.

### /about — reuses `dict.about` + `getTeam(locale)` + `getStats(locale)`

1. **Hero** — `about.title`, `about.statement`, `about.intro`.
2. **Pillars** — the 3 `about.pillars` (divider idiom from the homepage about
   block).
3. **Story** — `about.headingTop`/`headingAccent`, `about.p1`, `about.p2`,
   `about.location`, `about.founded`.
4. **Team** — `getTeam(locale)` initials/role cards. Section hidden if the Sheet
   returns none.
5. **Stats band** — `getStats(locale)`, hidden if empty (shared with /work
   treatment).
6. **Values (NEW, placeholder)** — a values/“why us” block with provisional copy
   the user fills in later. Stored under a new `about.values` dictionary key with
   placeholder strings clearly marked.
7. **CtaBand** → contact.

## "Ver más" CTAs on the homepage

A small client component `section-more-link.tsx` (styled like the existing
neon outline buttons) is inserted into:

- `components/sections/services.tsx` — capabilities view (`capRef` block) →
  `/[locale]/services`.
- `components/sections/work.tsx` — projects phase (`pfRef` block) →
  `/[locale]/work`.
- `components/sections/work.tsx` — nosotros phase (`aboutContentRef` block) →
  `/[locale]/about`.
- `components/sections/work-mobile.tsx` — equivalent placements for mobile.

Because these blocks are opacity-driven by scroll, the CTA inherits its phase's
visibility automatically. The link uses the current locale (`useLocale()`).

New dictionary key: `nav.more` (or `common.viewMore`) — e.g. EN "View more" /
ES "Ver más" / CA "Veure'n més".

## i18n additions

New dictionary keys (en/es/ca), added to the `Dictionary` interface:

- `services.faq: { q: string; a: string }[]` — real copy.
- `about.values` — shape TBD during implementation (likely
  `{ heading: string; items: { title: string; description: string }[] }`),
  placeholder copy.
- `viewMore: string` — for the "Ver más" CTA label (top-level or under `nav`).
- Any subpage-specific labels (e.g. `services.faqHeading`, `work.filterAll`
  already covered by `portfolio.all`, section headings) added as needed and
  translated for all three locales.

## Reused components / data

- `components/sections/footer.tsx` — Footer.
- `components/marquee.tsx` — stack marquee.
- `components/scroll-reveal.tsx` / `animated-section.tsx` — light reveal touches.
- `components/theme-logo.tsx` — optional in PageHero.
- `lib/i18n/dictionaries.ts`, `lib/i18n/config.ts`.
- `lib/content.ts` — `getProjects`, `getTeam`, `getStats`.

## Out of scope

- No new Sheets columns (team/stats already supported; projects already
  supported). FAQ and values are dictionary-driven, not Sheets.
- No `/process` subpage (user requested only services/work/about).
- No change to the homepage choreography beyond inserting the CTA buttons.
- No change to the header menu structure.

## Testing / verification

- Routes build and render for all three locales (`/en|es|ca` × services/work/about).
- Invalid locale → `notFound()`.
- Sheets-backed sections (projects/team/stats) degrade gracefully when empty.
- `generateMetadata` emits canonical + language alternates.
- "Ver más" buttons appear in the correct homepage phases (desktop + mobile) and
  navigate to the locale-correct subpage.
- Lint/build pass.
