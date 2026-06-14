# Side Menu Restyle — Fullscreen + Brand-Card Peek — Design

**Date:** 2026-06-14
**Branch:** master
**Scope:** Restyle the dropdown side menu (`<nav>` panel in `components/sections/header.tsx`) from the current right slide-in panel to a fullscreen overlay with a brand-card preview pane. Dark-only. No new image assets.

## Goal

The current menu is a `40vw` right slide-in panel with mono-heavy, numbered nav items — it reads "too tech" against the rest of the site, whose big type is Space Grotesk and which reserves mono for tiny eyebrow micro-labels only (see `hero.tsx`). This restyle moves the menu to a fullscreen, gallery-style overlay with editorial Display typography, keeping it consonant with the page while feeling more premium and less code-like.

Confirmed via visual brainstorming:
- **Layout:** B — fullscreen overlay + right peek pane.
- **Typography:** Display/Gallery — Space Grotesk bold, no numbering, dot accent.
- **Peek content:** brand card (pure CSS, no image assets).

## Shared design language (reuse, dark-only)

- **Background:** `#050505`. **Borders:** hairline `rgba(255,255,255,0.10)`. **Sharp corners** (radius 0).
- **Accent:** purple `#9268F6` (primary, hardcoded site-wide). Blue `#7CB2FF` used sparingly.
- **Mono usage:** ONLY the tiny eyebrow + any micro-caption — JetBrains Mono, uppercase, tracking `0.35em`, `white/55`, mirroring the hero tagline. No mono on nav items, no mono numbering.
- **Display type:** Space Grotesk for nav items and peek titles.
- **Motion:** entrance via opacity + translate, `cubic-bezier(0.16,1,0.3,1)`. Keep the existing staggered item entrance.

## Preserved behavior (do NOT change)

- Hamburger button (animated open/close icon), `z-[60]`, top-right.
- `handleNav` logic: in-page anchors (Lenis scroll), internal routes (`/{locale}/blog`), external (`https://tools.v13studio.com`, new tab).
- Escape-to-close, body scroll lock on open, backdrop click-to-close, scroll-to-top button.
- Same nav items + `hasProjects` filtering: Home, Services, Work, Process, About, Contact, Blog, Tools.

## 1 · Overlay container

- Replace the right slide-in panel (`w-[85vw] … lg:w-[40vw]`, `translate-x`) with a **full-viewport overlay**: `fixed inset-0 z-[58] bg-[#050505]`, fade in/out via opacity (+ optional subtle scale), `pointer-events-none` when closed.
- Faint traced **V13** watermark behind everything (reuse `V13_PATH`, low opacity ~0.05, purple stroke, `pointer-events-none`, `overflow-hidden`) — as today.
- Top-left **eyebrow:** `MENU — V13 STUDIO` (mono micro-label, tracking `0.35em`, `white/55`). Hamburger-X stays top-right at `z-[60]` (already above the panel).

## 2 · Nav column (left) — Display/Gallery type

- Desktop grid: two columns — left nav `~1.1fr`, right peek `~0.9fr`, hairline divider between.
- Items: Space Grotesk **bold (700)**, `clamp(28px, 4.5vw, 44px)`, negative letter-spacing (~`-0.02em`), comfortable vertical rhythm. **No `01/02` numbers.**
- Each row: a small **dot** (6px, hairline border) before the label. On hover/focus/active: dot fills `#9268F6`, label color → `#9268F6`, label gets a small `translate-x`.
- **Staggered entrance** preserved: per-item opacity + `translateY`, `transitionDelay` based on index, same easing.
- Item types keep current handling: Blog (internal route), Tools (external → keep external `↗` arrow affordance), anchors (Lenis). External/route affordance can be a trailing arrow that appears on hover.

## 3 · Peek pane (right) — brand card, pure CSS

- **Default state** (no item hovered): faint traced V13 + a soft purple radial glow. Acts as a calm resting state.
- **Hover/focus state:** crossfade the pane to the hovered item's brand card:
  - Large **name** (Space Grotesk, e.g. the nav label or a fuller title).
  - **One-line description** (i18n, see below).
  - Purple radial glow + a small V13 corner motif (`◢` / traced mark).
  - Route/external items show a `→` / `↗` hint.
- Implementation: a single peek component driven by the currently-hovered item key (React state, e.g. `hovered`). Crossfade via opacity transition keyed on `hovered`.
- **Hidden on mobile** (`<md`).

## 4 · Bottom bar

- Full-width, hairline top border, pinned to the bottom of the overlay.
- **Language switcher** `ES · EN · CA` — keep current neon treatment (active = purple border/text/bg tint; inactive = hairline, hover purple). Same locale-swap href logic already in `header.tsx`.
- **Email** `v13studio@v13studio.com` — mono, purple hover (as today).

## 5 · Responsive

- **`<md`:** single centered column. Nav type scales down via the clamp. **Peek pane and eyebrow hidden.** Bottom bar stacks (language row + email).
- **`>=md`:** two-column layout as in §2–3.

## i18n

Add to `lib/i18n/dictionaries.ts` (EN/ES/CA — CA file follows existing pattern):

- `menu.eyebrow` — "Menu" framing label (e.g. "Menu — V13 Studio" / "Menú — V13 Studio" / "Menú — V13 Studio"). Exact copy follows the human-voice rules.
- A short one-line **peek description per nav item** (Home, Services, Work, Process, About, Contact, Blog, Tools) × 3 locales. Concrete, human voice — no AI slop. Reuse existing `t.nav.*` for the labels themselves.

## Components touched

- `components/sections/header.tsx` — restructure the `<nav>` panel to the fullscreen overlay + peek; add `hovered` state and the brand-card peek; bottom bar; eyebrow. Keep all preserved behavior above.
- `lib/i18n/dictionaries.ts` — `menu.eyebrow` + per-item peek descriptions × 3 locales (+ type additions).
- Possibly a small local sub-component for the peek card (inline in `header.tsx` unless it grows large enough to warrant its own file).

## Out of scope

- Real images / screenshots in the peek (brand card only).
- Footer, page sections, the global theme provider.
- Any new accent-color token (purple stays hardcoded `#9268F6`, consistent with the rest of the codebase).

## Success criteria

- Menu opens as a fullscreen `#050505` overlay; nav items are Space Grotesk bold, no numbering, dot accent, purple hover.
- Only mono left in the menu is the tiny eyebrow/caption (tracking `0.35em`, faint white).
- Hovering a nav item crossfades the right peek to that item's brand card; default state shows the V13 glow; peek hidden on mobile.
- Bottom bar shows language switcher + email.
- Escape-close, scroll lock, backdrop close, `handleNav` (anchors/routes/external), scroll-to-top all still work.
- `npx tsc --noEmit` clean (aside from any pre-existing unrelated errors).
