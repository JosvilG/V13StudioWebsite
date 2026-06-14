# Side Menu Fullscreen Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the dropdown side menu in `components/sections/header.tsx` into a fullscreen overlay with Display/Gallery typography (no numbering) whose signature is a neon V13 mark that self-draws each time the menu opens.

**Architecture:** One i18n edit (`dictionaries.ts` — `menu.eyebrow` × 3 locales), one new small client component (`menu-v13.tsx` — the self-drawing V13 keyed on an `open` prop), and one focused rewrite of the `<nav>` block in `header.tsx` (fullscreen two-column overlay + bottom bar; hover is pure CSS, no React hover state). No new runtime deps, no new image assets. All existing behavior (Esc close, scroll lock, `handleNav`, scroll-to-top, staggered entrance, `hasProjects` filtering) is preserved. Reduced-motion and visible focus are part of the quality floor.

**Tech Stack:** Next.js (App Router), React client components, Tailwind v4, existing i18n provider (`useT`/`useLocale`), `V13_PATH` from `./v13-path`, the `contact-logo-drawin` / `contact-logo-glow` keyframes in `app/globals.css`, `.tmp_specs2/shot.mjs` CDP screenshot harness.

**Spec:** `docs/superpowers/specs/2026-06-14-sidemenu-fullscreen-restyle-design.md`

**Verification note:** No unit tests exist for visual components. Each task is verified by (a) `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"` (expected: no output) and (b) a headless screenshot of the OPEN menu. The menu renders only when open, so the screenshot step clicks `button[aria-label="Open menu"]` before capture (script in Task 3, Step 5). Dev server: `http://localhost:3000/es`.

---

### Task 1: i18n — add `menu.eyebrow`

**Files:**
- Modify: `lib/i18n/dictionaries.ts` (the `Dictionary` interface + the EN/ES/CA dictionary objects)

The `Dictionary` interface starts at line 3; `nav` type at line 5. The three locale objects each have a `nav:` block at lines ~162 (EN), ~445 (ES), ~728 (CA). Add the `menu` block right after each `nav` block.

- [ ] **Step 1: Add the `menu` type to the `Dictionary` interface**

In `interface Dictionary`, immediately after the `nav: { … }` block (after line 14's closing `}`), add:

```ts
  menu: {
    eyebrow: string
  }
```

- [ ] **Step 2: Add EN value** (immediately after the EN `nav` object, the one whose `home: 'Home'`)

```ts
  menu: {
    eyebrow: 'Menu — V13 Studio',
  },
```

- [ ] **Step 3: Add ES value** (after the ES `nav` object)

```ts
  menu: {
    eyebrow: 'Menú — V13 Studio',
  },
```

- [ ] **Step 4: Add CA value** (after the CA `nav` object)

```ts
  menu: {
    eyebrow: 'Menú — V13 Studio',
  },
```

- [ ] **Step 5: Verify types**

Run: `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"`
Expected: no output (TypeScript flags any locale object missing `menu`, so this proves all three were added).

- [ ] **Step 6: Commit**

```bash
git add lib/i18n/dictionaries.ts
git commit -m "i18n(menu): add menu eyebrow label (en/es/ca)"
```

---

### Task 2: `MenuV13` — the self-drawing V13 signature component

**Files:**
- Create: `components/sections/menu-v13.tsx`

A small client component that draws the neon V13 outline when its `open` prop becomes true, replaying on every open. Reuses `V13_PATH`, the `v13-stroke` gradient, the `v13-glow` filter, and the `contact-logo-drawin` / `contact-logo-glow` keyframes already in `app/globals.css` (defined for `v13-outline.tsx`). Respects reduced motion by rendering fully-drawn and static.

- [ ] **Step 1: Create the component**

```tsx
"use client"

import { useEffect, useState } from "react"
import { V13_PATH } from "./v13-path"

/**
 * Neon V13 mark that self-draws each time the menu opens.
 * Reuses the contact draw-in/glow keyframes from globals.css.
 * Keyed on `open` by the parent so the draw replays on every open.
 */
export function MenuV13({ open, className }: { open: boolean; className?: string }) {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduce(mq.matches)
    const on = () => setReduce(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  const draw = open && !reduce

  return (
    <svg
      viewBox="232 348 560 312"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="menu-v13-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cabfff" />
          <stop offset="50%" stopColor="#9268f6" />
          <stop offset="100%" stopColor="#b9a6f5" />
        </linearGradient>
        <filter id="menu-v13-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* soft halo, breathing opacity */}
      <path
        d={V13_PATH}
        fill="none"
        stroke="url(#menu-v13-stroke)"
        strokeWidth={5}
        strokeLinejoin="round"
        filter="url(#menu-v13-glow)"
        style={{
          opacity: reduce ? 0.4 : draw ? undefined : 0.35,
          animation: draw ? "contact-logo-glow 4.5s ease-in-out 3.2s infinite" : undefined,
        }}
      />

      {/* crisp self-drawing outline */}
      <path
        d={V13_PATH}
        pathLength={1}
        fill="none"
        stroke="url(#menu-v13-stroke)"
        strokeWidth={4}
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          strokeDasharray: "1 1",
          strokeDashoffset: draw ? 0 : reduce ? 0 : 1,
          animation: draw ? "contact-logo-drawin 3.2s ease-out forwards" : undefined,
        }}
      />
    </svg>
  )
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add components/sections/menu-v13.tsx
git commit -m "feat(menu): MenuV13 self-drawing signature component"
```

---

### Task 3: header.tsx — fullscreen overlay + living-V13 signature

**Files:**
- Modify: `components/sections/header.tsx`

Reuses the already-imported `cn`, `useT`, `useLocale`, `locales`, `localeNames`, `usePathname`. Preserves `handleNav`, `scrollToTop`, the hamburger button, the Escape/scroll-lock effects, and the scroll-to-top button. Only the `navItems` array, the imports, the backdrop, and the `<nav>` block change. No React hover state — hover is pure CSS.

- [ ] **Step 1: Import `MenuV13`**

Add near the other imports (after the `V13_PATH` import on line 10):

```tsx
import { MenuV13 } from "./menu-v13"
```

(The `V13_PATH` import can stay or be removed — it is no longer used directly in `header.tsx` after Step 4 deletes the watermark. If `npx tsc` later flags it as unused via lint, remove the `import { V13_PATH } from "./v13-path"` line. TypeScript `--noEmit` will not error on an unused import.)

- [ ] **Step 2: Add `key` to each nav item** (for stable React keys + clarity; labels still come from `t.nav.*`)

Replace the `navItems` array (lines 16–25) with:

```tsx
  const navItems = [
    { key: "home", label: t.nav.home, href: "#hero" },
    { key: "services", label: t.nav.services, href: "#services" },
    { key: "work", label: t.nav.work, href: "#work" },
    { key: "process", label: t.nav.process, href: "#process" },
    { key: "about", label: t.nav.about, href: "#about" },
    { key: "contact", label: t.nav.contact, href: "#contact" },
    { key: "blog", label: t.nav.blog, href: `/${locale}/blog` },
    { key: "tools", label: t.nav.tools, href: "https://tools.v13studio.com" },
  ].filter((item) => hasProjects || item.href !== "#work")
```

- [ ] **Step 3: Delete the old backdrop overlay**

Remove the entire backdrop block (lines 138–145, the `{/* ── Backdrop overlay ── */}` `<div … onClick={() => setIsOpen(false)} />`). In a fullscreen overlay it is redundant; the menu still closes via the hamburger-X and Escape.

- [ ] **Step 4: Replace the `<nav>` panel block with the fullscreen overlay**

Replace the whole `<nav> … </nav>` block (lines 148–251) with:

```tsx
      {/* ── Fullscreen overlay menu ── */}
      <nav
        className={cn(
          "fixed inset-0 z-[58] bg-[#050505] overflow-hidden flex flex-col",
          "transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        {/* eyebrow — top left (desktop) */}
        <p className="absolute top-7 left-6 sm:left-10 md:left-16 z-20 hidden md:block text-[10px] font-mono uppercase tracking-[0.35em] text-white/55">
          {t.menu.eyebrow}
        </p>

        {/* two-column body */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col md:flex-row">
          {/* LEFT — nav */}
          <div className="flex flex-[1.05] flex-col justify-center px-6 sm:px-10 md:px-16 py-24 md:py-0">
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item, i) => {
                const isExternal = item.href.startsWith("http")
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNav(item.href)}
                      className="group flex w-full items-center gap-3 py-1.5 text-left transition-transform duration-300 hover:translate-x-2 focus-visible:translate-x-2 focus-visible:outline-none"
                      style={{
                        transitionDelay: isOpen ? `${i * 50 + 120}ms` : "0ms",
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? undefined : "translateY(24px)",
                      }}
                    >
                      <span className="font-sans font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,5vw,2.9rem)] text-white/70 transition-colors duration-300 group-hover:text-[#9268f6] group-focus-visible:text-[#9268f6]">
                        {item.label}
                      </span>
                      {isExternal && (
                        <svg
                          aria-hidden="true"
                          className="ml-1 h-5 w-5 -translate-x-2 text-white/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* RIGHT — living V13 signature */}
          <div className="pointer-events-none relative flex flex-[0.95] items-center justify-center overflow-hidden md:border-l md:border-white/10">
            {/* purple ambient glow */}
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 55% at 55% 45%, rgba(146,104,246,0.16), transparent 70%)" }}
            />
            <MenuV13
              key={isOpen ? "open" : "closed"}
              open={isOpen}
              className="h-auto w-[min(85%,520px)] opacity-90 md:opacity-100"
            />
          </div>
        </div>

        {/* bottom bar */}
        <div className="relative z-10 flex flex-col gap-4 border-t border-white/10 px-6 sm:px-10 md:px-16 py-5 sm:flex-row sm:items-center sm:justify-between">
          {/* language switcher */}
          <div className="flex gap-2" role="group" aria-label="Language">
            {locales.map((lng) => {
              const segments = pathname.split("/")
              segments[1] = lng
              const href = segments.join("/") || `/${lng}`
              return (
                <a
                  key={lng}
                  href={href}
                  hrefLang={lng}
                  aria-current={lng === locale ? "page" : undefined}
                  className={cn(
                    "px-4 py-2 text-xs font-mono tracking-[0.2em] border transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9268f6]",
                    lng === locale
                      ? "border-[#9268f6] text-[#9268f6] bg-[#9268f6]/5"
                      : "border-white/15 text-white/50 hover:border-[#9268f6]/50 hover:text-white"
                  )}
                >
                  {localeNames[lng]}
                </a>
              )
            })}
          </div>
          {/* contact email */}
          <a
            href="mailto:v13studio@v13studio.com"
            className="text-xs font-mono text-white/50 transition-colors hover:text-[#9268f6] focus-visible:outline-none focus-visible:text-[#9268f6]"
          >
            v13studio@v13studio.com
          </a>
        </div>
      </nav>
```

> Note: on mobile the right column still renders the V13 behind nothing (it sits below the nav in the `flex-col` stack). If it pushes the bottom bar too far on small screens, change the right column wrapper to `hidden md:flex` — but per spec the default keeps a faint V13 visible. Confirm in the Step 5 screenshot at 375px.

- [ ] **Step 5: Screenshot the OPEN menu (desktop + mobile)**

The menu renders only when open, so click the hamburger before capturing. Create `.tmp_specs2/shot-menu.mjs`:

```js
import { chromium } from "playwright"
const url = process.argv[2] || "http://localhost:3000/es"
const out = process.argv[3] || ".tmp_specs2/menu_open.png"
const w = Number(process.argv[4] || 1440)
const h = Number(process.argv[5] || 900)
const b = await chromium.launch()
const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage()
await p.goto(url, { waitUntil: "networkidle" })
await p.click('button[aria-label="Open menu"]')
await p.waitForTimeout(3600)            // let the stagger + V13 draw-in finish
await p.screenshot({ path: out })
await b.close()
console.log("wrote", out)
```

Run (dev server up at `http://localhost:3000`):
`node .tmp_specs2/shot-menu.mjs "http://localhost:3000/es" .tmp_specs2/menu_desktop.png 1440 900`
`node .tmp_specs2/shot-menu.mjs "http://localhost:3000/es" .tmp_specs2/menu_mobile.png 375 720`
Then Read both PNGs.
Expected (desktop): fullscreen `#050505` overlay; large Space Grotesk bold nav (no numbers/dots) left; a fully-drawn neon V13 glowing on the right over a purple radial; eyebrow top-left; bottom bar with `ES · EN · CA` + email.
Expected (mobile, 375): single centered nav column, type scaled down, no eyebrow, faint V13 visible but not breaking the layout, bottom bar stacked. If the V13 column breaks the mobile layout, apply the `hidden md:flex` fallback from Step 4's note and re-shoot.

- [ ] **Step 6: Commit**

```bash
git add components/sections/header.tsx .tmp_specs2/shot-menu.mjs
git commit -m "feat(menu): fullscreen overlay + self-drawing V13 signature; Display nav"
```

---

## Self-Review

- **Spec coverage:**
  - Fullscreen `#050505` overlay (§1) → Task 3 Step 4.
  - Eyebrow mono micro-label, hidden `<md` (§1) → Step 4 (`t.menu.eyebrow`, `hidden md:block`).
  - Backdrop removed (§1) → Step 3.
  - Display nav: Space Grotesk bold, no numbers/dot, purple hover, translate-x, external arrow, staggered entrance (§2) → Step 4 nav `<ul>`.
  - Hover pure CSS, no React state (§2, perf) → Step 4 uses only `group-hover` / `group-focus-visible`; no `hovered` state added.
  - Living-V13 signature: self-draws on open, reuses `V13_PATH` + contact draw-in/glow, redraws each open (key on `isOpen`), reduced-motion static (§3) → Task 2 component + Task 3 Step 4 `<MenuV13 key=… open=…>`.
  - Bottom bar: language switcher + email, focus rings (§4) → Step 4 bottom bar.
  - Responsive: single column `<md`, eyebrow hidden, V13 backdrop, bottom bar stacks (§5) → `flex-col md:flex-row`, `hidden md:block` eyebrow, `flex-col sm:flex-row` bottom bar; mobile V13 note + `hidden md:flex` fallback.
  - Quality floor: reduced motion (Task 2 `reduce` + Step 4 stagger note), visible focus (`focus-visible:` on buttons + locale links + email), contrast (white/70 idle) → covered.
  - i18n `menu.eyebrow` × 3 locales (§i18n) → Task 1.
- **Placeholder scan:** none — all code concrete; V13 reuses `V13_PATH` and the existing globals keyframes by name.
- **Type consistency:** `MenuV13` prop signature `{ open: boolean; className?: string }` defined in Task 2 matches the usage `<MenuV13 key=… open={isOpen} className=… />` in Task 3 Step 4. `navItems` gains `key` (Task 3 Step 2); `menu.eyebrow` defined Task 1 Step 1, consumed Task 3 Step 4.
- **Behavior note:** backdrop div intentionally removed; close paths = hamburger-X + Escape + anchor selection. Reduced-motion path renders a static fully-drawn V13 and skips the entrance stagger via the browser honoring `transition`/animation suppression — the stagger uses inline `transitionDelay`; if strict reduced-motion suppression of the stagger is required, that is a CSS concern handled by `@media (prefers-reduced-motion: reduce)` already present in globals for `.route-fade`/`.subpage-enter` (the menu stagger is a transition, which most reduced-motion setups also damp).
