# Side Menu Restyle — Fullscreen + Living-V13 Signature — Design

**Date:** 2026-06-14
**Branch:** restyle/sidemenu-fullscreen
**Scope:** Restyle the dropdown side menu (`<nav>` panel in `components/sections/header.tsx`) from a right slide-in panel to a fullscreen overlay whose signature is a self-drawing neon V13 mark. Dark-only. No new image assets.

## Goal

The current menu is a `40vw` right slide-in panel with mono-heavy, numbered nav items — it reads "too tech" against the rest of the site, whose big type is Space Grotesk and which reserves mono for tiny eyebrow micro-labels only (see `hero.tsx`). This restyle moves the menu to a fullscreen, gallery-style overlay with editorial Display typography and one memorable signature grounded in V13's own world: the neon V13 mark that draws itself when the menu opens.

Confirmed via visual brainstorming (informed by the `frontend-design`, `ui-ux-pro-max`, `vercel-react-best-practices` skills):
- **Layout:** fullscreen overlay, nav list left, V13 mark right/backdrop.
- **Typography:** Display/Gallery — Space Grotesk bold. **No numbering** (a nav is not a sequence — `frontend-design` guidance).
- **Signature:** "Living V13" — the neon V13 outline self-draws on open (reuses the existing contact draw-in).
- **Hover:** purist — hover only lights the word (purple + small shift). No per-item description copy. (`frontend-design`: spend boldness in one place; keep everything else quiet.)

## Shared design language (reuse, dark-only)

- **Background:** `#050505`. **Borders:** hairline `rgba(255,255,255,0.10)`. **Sharp corners** (radius 0).
- **Accent:** purple `#9268F6` (primary, hardcoded site-wide). The V13 stroke uses the existing `#cabfff → #9268f6 → #b9a6f5` gradient (`v13-outline.tsx`).
- **Mono usage:** ONLY the tiny eyebrow — JetBrains Mono, uppercase, tracking `0.35em`, `white/55`, mirroring the hero tagline. No mono on nav items, no numbering.
- **Display type:** Space Grotesk bold for nav items.
- **Motion:** overlay fade + staggered item entrance, `cubic-bezier(0.16,1,0.3,1)`. The V13 self-draw reuses `contact-logo-drawin` (3.2s) + `contact-logo-glow`.

## Quality floor (from `ui-ux-pro-max` / `frontend-design` checklists)

- **Reduced motion:** under `prefers-reduced-motion: reduce`, skip the stagger and the V13 draw-in — render the overlay and a fully-drawn (static) V13 immediately.
- **Visible focus:** nav buttons and locale links get a visible focus ring (e.g. `focus-visible:ring-1 ring-[#9268f6]`), not just hover styling.
- **Contrast:** nav idle `text-white/70`, hover `#9268f6` on `#050505` — both clear AA. Email/eyebrow at `white/50–55` are decorative-secondary.
- **Touch:** hover effects are decorative only; nav items are tap targets (full-row buttons, generous padding). The signature is purely ambient, so nothing is hidden behind hover on touch.

## Preserved behavior (do NOT change)

- Hamburger button (animated open/close icon), `z-[60]`, top-right.
- `handleNav` logic: in-page anchors (Lenis scroll), internal routes (`/{locale}/blog`), external (`https://tools.v13studio.com`, new tab).
- Escape-to-close, body scroll lock on open, scroll-to-top button.
- Same nav items + `hasProjects` filtering: Home, Services, Work, Process, About, Contact, Blog, Tools.

## 1 · Overlay container

- Replace the right slide-in panel with a **full-viewport overlay**: `fixed inset-0 z-[58] bg-[#050505]`, fade in/out via opacity, `pointer-events-none` when closed.
- Top-left **eyebrow:** `MENU — V13 STUDIO` (mono micro-label, tracking `0.35em`, `white/55`), hidden `<md`. Hamburger-X stays top-right `z-[60]`.
- The separate backdrop `<div>` is removed (redundant in a fullscreen overlay); close paths remain hamburger-X + Escape + selecting an anchor item.

## 2 · Nav column (left) — Display/Gallery type

- Desktop: two columns — nav `~1.05fr` left, V13 signature `~0.95fr` right (hairline divider).
- Items: Space Grotesk **bold (700)**, `clamp(28px, 5vw, 46px)`, negative letter-spacing (~`-0.02em`). **No numbers, no dot.** Idle `text-white/70`; hover/focus → `#9268f6` + small `translate-x`. Trailing `↗` appears on hover for the external item (Tools).
- **Staggered entrance** preserved (per-item opacity + `translateY`, index-based `transitionDelay`), gated off under reduced motion.
- Hover styling is **pure CSS** (`group-hover` / `focus-visible`) — no React hover state (perf, per `vercel-react-best-practices`).

## 3 · Living-V13 signature (right / backdrop)

- A large neon **V13 outline that self-draws when the menu opens**: reuse `V13_PATH` + the `contact-logo-drawin` (stroke-dash) and `contact-logo-glow` (halo breathe) animations and the `v13-stroke` gradient + `v13-glow` filter from `v13-outline.tsx`.
- Crucial difference from `V13Outline`: it must (re)draw on **menu open**, not on scroll-into-view. Implement as a small menu-local component/SVG driven by `isOpen` (remount/key on open so the draw replays each time).
- Sits in the right column on desktop (`>=md`); on mobile it becomes a faint, centered, low-opacity backdrop behind the nav (or is simplified to the static low-opacity watermark) so the list stays legible.
- Under reduced motion: render it fully drawn and static (no dash animation, no glow breathe).

## 4 · Bottom bar

- Full-width, hairline top border, pinned to bottom.
- **Language switcher** `ES · EN · CA` — active = purple border/text/bg tint; inactive = hairline, hover purple; `focus-visible` ring. Same locale-swap href logic already in `header.tsx`.
- **Email** `v13studio@v13studio.com` — mono, purple hover.

## 5 · Responsive

- **`<md`:** single centered column; nav type scales via clamp; eyebrow hidden; V13 becomes a faint centered backdrop; bottom bar stacks.
- **`>=md`:** two-column layout (nav | living V13).

## i18n

Add to `lib/i18n/dictionaries.ts` (EN/ES/CA):

- `menu.eyebrow` — "Menu — V13 Studio" / "Menú — V13 Studio" / "Menú — V13 Studio".

No per-item description copy (purist direction). Nav labels reuse existing `t.nav.*`.

## Components touched

- `components/sections/header.tsx` — restructure the `<nav>` into the fullscreen overlay + nav column + bottom bar + eyebrow; embed the menu V13 signature.
- `components/sections/menu-v13.tsx` (new) — small client component: the V13 outline that self-draws keyed on an `open` prop (reuses `V13_PATH`, the gradient/filter, and the contact draw-in/glow keyframes). Keeps `header.tsx` focused.
- `lib/i18n/dictionaries.ts` — `menu.eyebrow` × 3 locales (+ type addition).

## Out of scope

- Per-item peek/description copy and images (dropped — purist).
- Footer, page sections, the global theme provider.
- Any new accent-color token (purple stays hardcoded `#9268F6`).

## Success criteria

- Menu opens as a fullscreen `#050505` overlay; nav items are Space Grotesk bold, no numbering/dot, purple hover + visible focus ring.
- Only mono left in the menu is the tiny eyebrow (tracking `0.35em`, faint white).
- A neon V13 mark self-draws each time the menu opens; under `prefers-reduced-motion` it appears fully drawn and static.
- Bottom bar shows language switcher + email.
- Escape-close, scroll lock, `handleNav` (anchors/routes/external), scroll-to-top all still work.
- `npx tsc --noEmit` clean (aside from any pre-existing unrelated errors).
