# Footer & Lateral Menu Restyle — Design

**Date:** 2026-06-12
**Branch:** restyle/web-redesign
**Scope:** Restyle `components/sections/footer.tsx` and the lateral menu in `components/sections/header.tsx` to match the redesigned (dark, cinematic, neon-V13) site. Dark-only.

## Goal

The page sections (hero, services, work, contact) were restyled to a dark, cinematic look with blue/cyan neon accents, mono uppercase micro-labels, numbered items, and a neon-traced V13. The footer and the lateral dropdown menu still use the old theme-token system (`border-border`, `bg-card`, `muted-foreground`, light/dark toggle). This work brings both in line with the new language.

## Shared design language (dark-only)

- **Backgrounds:** pure/near black — `#000` / `#050505`.
- **Borders:** hairline `rgba(255,255,255,0.10)` (replace `border-border`).
- **Accents:** blue ramp `#5AA2FF → #7ca8ff → #dce8ff` (same neon as the Contact V13), cyan `#22d3ee` sparingly.
- **Micro-labels:** mono, uppercase, tracking `0.2–0.3em`, muted tone (`white/40`, `#5b6b8c`, `#3f4d6e`).
- **Numbering:** `01/02…` where lists appear (nav already uses this — keep).
- **Hovers:** text → neon, animated growing underline, small `translate-x`.
- **Theme:** dark-only. Remove the light/dark toggle and `useTheme` usage from the menu. Do NOT rip out the global next-themes provider (out of scope); it simply defaults to dark. `ThemeLogo` may stay (resolves to the dark logo).

## 1 · Lateral menu (pattern B — restyled side panel)

Keep the existing structure and behavior in `header.tsx`; restyle only.

- **Hamburger button:** border `white/15`, bg `black/80` + blur, hover → neon border/glow. Keep the animated open/close icon.
- **Side panel:** right slide-in (unchanged motion). Background `#050505`, left border `white/10`. Add a **faint static V13 neon watermark** behind the content (reuse the traced V13 path at very low opacity, e.g. `~0.05`, blue stroke) — subtle, non-interactive, `pointer-events-none`, `overflow-hidden`.
- **Header area:** V13 mark + mono `STUDIO` label.
- **Nav links:** numbered `01..`, larger type, gradient/neon hover, animated underline; keep the staggered entrance (opacity + translate on open). Same nav items and `handleNav` logic (in-page anchors, internal routes, external).
- **Panel footer:** language switcher (ES·EN·CA) restyled to neon (active = neon border/text/bg tint; inactive = hairline, hover neon). Contact email mono with neon hover. **Remove the theme toggle button.**
- **Backdrop overlay:** `black/70` + blur.
- **Preserved:** Escape-to-close, body scroll lock, scroll-to-top button (restyled to the neon/hairline style).

## 2 · Footer (pattern B — editorial split)

Rewrite `footer.tsx`.

- **No tech-stack marquee** (removed). Remove the `Marquee` import and `techStack` array.
- **No giant background "V13 STUDIO" parallax text** (removed). Remove the `Parallax` usage for it.
- **Main block** — responsive: stacked on mobile, two-part on `lg` (`~1.2fr / 1fr`):
  - **Left:** V13 mark + `t.footer.tagline` + **email CTA** `v13studio@v13studio.com` (underlined, trailing arrow, neon hover).
  - **Right:** three columns, each with a mono uppercase heading:
    - **NAVEGACIÓN:** Inicio, Servicios, Proyectos, Proceso, Contacto, Blog, Tools (anchors `#hero/#services/#work/#process/#contact`, `/{locale}/blog`, external Tools).
    - **SOCIAL:** LinkedIn, GitHub, Twitter, Dribbble (placeholder `#` until real URLs — see pending owner setup).
    - **LEGAL:** Aviso legal, Privacidad, Cookies, Términos (`/{locale}/legal/...`).
- **Bottom bar** (hairline top): `© {year} {t.footer.rights}` · **live Barcelona clock** (mono, `Europe/Madrid`, existing logic) · language `ES·EN·CA` links.
- **Borders/accents:** neon + hairline. Keep `ScrollReveal` for entrance. Drop `Parallax`.

## i18n

Add minimal keys to `lib/i18n/dictionaries.ts` `footer` (EN/ES/CA — and CA file follows existing pattern):

- `navHeading` — "Navigation" / "Navegación" / "Navegació"
- `socialHeading` — "Social" / "Social" / "Social"
- `legalHeading` — "Legal" / "Legal" / "Legal"

Reuse existing: `tagline`, `barcelonaTime`, `rights`, `privacy`, `terms`, `legalNotice`, `cookies`, and `t.nav.*` for nav labels.

## Components touched

- `components/sections/header.tsx` — restyle menu, remove theme toggle + `useTheme`, add V13 watermark.
- `components/sections/footer.tsx` — full rewrite to editorial split; remove marquee + giant text.
- `lib/i18n/dictionaries.ts` — 3 new footer keys × 3 locales, plus the `Footer.barcelonaTime` type already exists.
- Possibly a small shared `V13 watermark` snippet (inline in header; the existing `V13Outline` is animated/centered — use a simpler static faint path inline rather than reusing it, to avoid the draw animation in the panel).

## Out of scope

- Real social URLs (placeholders remain).
- Removing the global theme provider / light-mode styles on blog/legal pages.
- Any change to the page sections themselves.

## Success criteria

- Menu and footer visually match the dark/neon language; no `border-border`/`bg-card`/`muted-foreground` theme tokens left in these two files.
- No light/dark toggle in the menu; menu still opens/closes, navigates, locks scroll, closes on Esc.
- Footer shows left identity block + 3 link columns + bottom bar with live clock; no marquee, no giant text.
- `npx tsc --noEmit` clean (aside from the pre-existing `preloader.tsx` error).
