# Footer & Lateral Menu Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the footer and the lateral dropdown menu to match the dark/cinematic neon-V13 redesign, dark-only.

**Architecture:** Two focused file rewrites/edits (`footer.tsx`, `header.tsx`) plus 3 i18n keys. No new runtime deps. Verification is `npx tsc --noEmit` clean (ignoring the pre-existing `preloader.tsx` error) + headless screenshots via the existing `.tmp_specs2/shot.mjs` harness.

**Tech Stack:** Next.js (App Router), React client components, Tailwind, existing i18n provider (`useT`/`useLocale`), CDP screenshot harness.

**Spec:** `docs/superpowers/specs/2026-06-12-footer-menu-redesign-design.md`

**Verification note:** No unit tests exist for visual components. Each task is verified by (a) `npx tsc --noEmit` and (b) a headless screenshot reviewed against the spec. The dev server runs at `http://localhost:3000`. Footer/menu live at the bottom of `/es`; the contact offset (~`#contact` top) was ~8064 at last check — recompute with `.tmp_specs2/contact_off.mjs` if needed, and screenshot near max scroll for the footer.

---

### Task 1: i18n — footer column headings

**Files:**
- Modify: `lib/i18n/dictionaries.ts` (type `Dictionary.footer`, and the EN/ES/CA `footer` objects)

- [ ] **Step 1: Add keys to the `footer` type**

In the `footer: { ... }` type block, add:

```ts
    navHeading: string
    socialHeading: string
    legalHeading: string
```

- [ ] **Step 2: Add EN values** (in the English `footer` object)

```ts
    navHeading: 'Navigation',
    socialHeading: 'Social',
    legalHeading: 'Legal',
```

- [ ] **Step 3: Add ES values**

```ts
    navHeading: 'Navegación',
    socialHeading: 'Social',
    legalHeading: 'Legal',
```

- [ ] **Step 4: Add CA values**

```ts
    navHeading: 'Navegació',
    socialHeading: 'Social',
    legalHeading: 'Legal',
```

- [ ] **Step 5: Verify types**

Run: `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"`
Expected: no output (the only allowed error is the pre-existing `preloader.tsx` one, filtered out).

- [ ] **Step 6: Commit**

```bash
git add lib/i18n/dictionaries.ts
git commit -m "i18n: add footer column headings (nav/social/legal)"
```

---

### Task 2: Footer rewrite (editorial split, dark/neon)

**Files:**
- Rewrite: `components/sections/footer.tsx`

Removes: `Marquee` import + `techStack` array, the giant `Parallax` "V13 STUDIO" text. Keeps: live Barcelona clock logic, `ScrollReveal`, `ThemeLogo`, `useT`/`useLocale`.

- [ ] **Step 1: Replace the file with the editorial-split footer**

```tsx
"use client"

import { useEffect, useState } from "react"
import { ScrollReveal } from "@/components/parallax"
import { ThemeLogo } from "@/components/theme-logo"
import { useT, useLocale } from "@/components/i18n-provider"

const HAIR = "border-white/10"

export function Footer() {
  const t = useT()
  const locale = useLocale()
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Europe/Madrid",
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.contact, href: "#contact" },
    { label: t.nav.blog, href: `/${locale}/blog` },
    { label: t.nav.tools, href: "https://tools.v13studio.com", external: true },
  ]
  const socialLinks = ["LinkedIn", "GitHub", "Twitter", "Dribbble"].map((l) => ({
    label: l,
    href: "#",
  }))
  const legalLinks = [
    { label: t.footer.legalNotice, href: `/${locale}/legal/legal-notice` },
    { label: t.footer.privacy, href: `/${locale}/legal/privacy` },
    { label: t.footer.cookies, href: `/${locale}/legal/cookies` },
    { label: t.footer.terms, href: `/${locale}/legal/terms` },
  ]

  const linkCls =
    "text-sm text-white/55 hover:text-[#7ca8ff] transition-colors duration-300"
  const headingCls =
    "text-[10px] font-mono uppercase tracking-[0.25em] text-white/35 mb-4"

  const Column = ({
    heading,
    links,
  }: {
    heading: string
    links: { label: string; href: string; external?: boolean }[]
  }) => (
    <div>
      <p className={headingCls}>{heading}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={linkCls}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className={`relative overflow-hidden bg-black border-t ${HAIR}`}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Identity */}
          <ScrollReveal>
            <div>
              <ThemeLogo size={72} />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
                {t.footer.tagline}
              </p>
              <a
                href="mailto:v13studio@v13studio.com"
                className="group mt-6 inline-flex items-center gap-2 border-b border-white/20 pb-1 font-mono text-sm text-white/80 transition-colors hover:border-[#7ca8ff] hover:text-[#7ca8ff]"
              >
                v13studio@v13studio.com
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>

          {/* Link columns */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <Column heading={t.footer.navHeading} links={navLinks} />
              <Column heading={t.footer.socialHeading} links={socialLinks} />
              <Column heading={t.footer.legalHeading} links={legalLinks} />
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className={`mt-14 flex flex-col items-start gap-4 border-t ${HAIR} pt-6 sm:flex-row sm:items-center sm:justify-between`}>
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-white/55">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
              {t.footer.barcelonaTime}
            </span>
            <span className="tabular-nums text-white/80">{time}</span>
          </div>
          <div className="flex gap-3 font-mono text-xs">
            {locales.map((lng) => {
              const segments = pathname.split("/")
              segments[1] = lng
              const href = segments.join("/") || `/${lng}`
              return (
                <a
                  key={lng}
                  href={href}
                  hrefLang={lng}
                  className={
                    lng === locale
                      ? "text-[#7ca8ff]"
                      : "text-white/45 hover:text-white/80 transition-colors"
                  }
                >
                  {localeNames[lng]}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

> Note: the bottom-bar language switcher uses `locales`, `localeNames`, and `pathname`. Add the imports in Step 2.

- [ ] **Step 2: Add the missing imports for the language switcher**

At the top of the file add:

```tsx
import { usePathname } from "next/navigation"
import { locales, localeNames } from "@/lib/i18n/config"
```

And inside the component (after `const locale = useLocale()`):

```tsx
  const pathname = usePathname()
```

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"`
Expected: no output.

- [ ] **Step 4: Screenshot the footer**

Run: `node .tmp_specs2/contact_off.mjs` to get current `#contact` top, then screenshot near max scroll, e.g.:
`node .tmp_specs2/shot.mjs "http://localhost:3000/es" 99999 .tmp_specs2/footer_new.png`
Read `.tmp_specs2/footer_new.png`. Expected: black footer, left V13 + tagline + email CTA, right 3 columns (Navegación/Social/Legal), bottom bar with © + live clock + ES·EN·CA. No marquee, no giant text.

- [ ] **Step 5: Commit**

```bash
git add components/sections/footer.tsx
git commit -m "feat(footer): editorial dark/neon footer; drop marquee + giant text"
```

---

### Task 3: Lateral menu restyle (dark/neon, remove theme toggle, V13 watermark)

**Files:**
- Modify: `components/sections/header.tsx`

Behavior unchanged (`handleNav`, `scrollToTop`, Esc close, scroll lock, stagger). Restyle only + remove the theme toggle + `useTheme`, add a faint static V13 watermark inside the panel.

- [ ] **Step 1: Remove theme machinery**

Delete the import `import { useTheme } from "next-themes"`, the `const { theme, setTheme } = useTheme()` line, and the `mounted` state + its `useEffect` (only used by the toggle). Keep all other state/effects.

- [ ] **Step 2: Restyle hamburger button**

Replace the hamburger button `className` with:

```tsx
        className={cn(
          "fixed top-6 right-6 z-[60] w-10 h-10",
          "border border-white/15 bg-black/80 backdrop-blur-xl",
          "hover:border-[#7ca8ff] hover:bg-[#7ca8ff]/10 transition-all duration-300",
        )}
```

And the three bars `bg-foreground` → `bg-white`.

- [ ] **Step 3: Restyle backdrop + panel shell**

Backdrop className → `"fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm transition-opacity duration-300"` (keep the open/closed opacity logic).

Panel `<nav>` className: replace `bg-card/95 backdrop-blur-xl border-l border-border` with `bg-[#050505] backdrop-blur-xl border-l border-white/10`. Keep sizing/transform.

- [ ] **Step 4: Add the faint V13 watermark inside the panel**

As the FIRST child of `<nav>` (before the logo area), add a non-interactive faint V13 (static, no animation):

```tsx
        {/* faint V13 watermark */}
        <svg
          viewBox="232 348 560 312"
          className="pointer-events-none absolute -right-10 bottom-24 w-[110%] opacity-[0.05]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={V13_WATERMARK_PATH}
            fill="none"
            stroke="#7ca8ff"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </svg>
```

And add the path constant near the top of the file (above the component). Copy the exact `d` string from `components/sections/v13-outline.tsx` (`V13_PATH`):

```tsx
const V13_WATERMARK_PATH = "<paste the exact V13_PATH d string from v13-outline.tsx>"
```

- [ ] **Step 5: Restyle the panel header, nav links, and locale switcher**

- Header area border: `border-b border-border` → `border-b border-white/10`. `STUDIO` label stays (it's already mono/muted; set color `text-white/40`).
- Nav `<button>`: number span `text-primary/60` → `text-[#7ca8ff]/70`; label `text-foreground group-hover:text-primary` → `text-white group-hover:text-[#7ca8ff]`; the trailing line `bg-primary` → `bg-[#7ca8ff]`; external svg `text-muted-foreground group-hover:text-primary` → `text-white/45 group-hover:text-[#7ca8ff]`. Wrap the panel content area so it sits above the watermark: ensure the logo area + nav list + bottom section are inside a `relative z-10` wrapper (add a `<div className="relative z-10 flex flex-1 flex-col">` around them, or add `relative z-10` to each block).
- Bottom section border `border-t border-border` → `border-t border-white/10`.
- Locale buttons: active `border-primary text-primary bg-primary/5` → `border-[#7ca8ff] text-[#7ca8ff] bg-[#7ca8ff]/5`; inactive `border-border text-muted-foreground hover:border-primary/50 hover:text-foreground` → `border-white/15 text-white/50 hover:border-[#7ca8ff]/50 hover:text-white`.

- [ ] **Step 6: Remove the theme toggle button block**

Delete the entire `{/* Theme toggle */}` `<button>...</button>` block (the one calling `setTheme`). Keep the language switcher and the contact email link. Email link: `text-muted-foreground hover:text-primary` → `text-white/50 hover:text-[#7ca8ff]`.

- [ ] **Step 7: Restyle the scroll-to-top button**

className: `border border-border bg-background/80` → `border border-white/15 bg-black/80`; `hover:border-primary hover:bg-primary/10` → `hover:border-[#7ca8ff] hover:bg-[#7ca8ff]/10`.

- [ ] **Step 8: Verify types**

Run: `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"`
Expected: no output. (Confirm no leftover references to `theme`, `setTheme`, `mounted`, `useTheme`.)

- [ ] **Step 9: Screenshot the open menu**

The menu opens via the hamburger. Use a CDP click before capture. Add a temporary screenshot by extending the harness or run:
`node .tmp_specs2/shot.mjs "http://localhost:3000/es" 0 .tmp_specs2/menu_closed.png` to confirm the page renders, then open the menu by evaluating a click in a small custom script (click `button[aria-label="Open menu"]`). Read the resulting PNG. Expected: black panel from the right, faint V13 watermark, numbered neon nav, ES·EN·CA switcher, email — NO theme toggle button.

- [ ] **Step 10: Commit**

```bash
git add components/sections/header.tsx
git commit -m "feat(menu): dark/neon lateral menu; remove theme toggle; V13 watermark"
```

---

## Self-Review

- **Spec coverage:** shared language (Tasks 2–3 classes), menu pattern B incl. watermark + locale + removed toggle (Task 3), footer editorial split incl. clock + 3 columns + bottom bar, no marquee/giant text (Task 2), i18n keys (Task 1). All covered.
- **Placeholders:** the only intentional copy-paste is `V13_WATERMARK_PATH` (Task 3 Step 4) — the engineer must paste the exact `d` from `v13-outline.tsx`; called out explicitly.
- **Type consistency:** new i18n keys (`navHeading`/`socialHeading`/`legalHeading`) defined in Task 1 and consumed in Task 2. Footer imports (`usePathname`, `locales`, `localeNames`) added in Task 2 Step 2.
- **Behavior preserved:** menu nav/lock/Esc/scroll-top untouched logic-wise.
