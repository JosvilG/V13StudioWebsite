# Side Menu Fullscreen Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the dropdown side menu in `components/sections/header.tsx` from a right slide-in panel into a fullscreen overlay with Display/Gallery typography and a pure-CSS brand-card "peek" pane.

**Architecture:** One i18n edit (`dictionaries.ts` — new `menu` block × 3 locales) and one focused rewrite of the `<nav>` overlay block in `header.tsx` (add `hovered` state + `key` on each nav item; replace the panel + backdrop with a fullscreen two-column overlay + bottom bar). No new runtime deps, no new image assets. All existing behavior (Esc close, scroll lock, `handleNav`, scroll-to-top, staggered entrance, `hasProjects` filtering) is preserved.

**Tech Stack:** Next.js (App Router), React client component, Tailwind v4, existing i18n provider (`useT`/`useLocale`), `V13_PATH` from `./v13-path`, `.tmp_specs2/shot.mjs` CDP screenshot harness.

**Spec:** `docs/superpowers/specs/2026-06-14-sidemenu-fullscreen-restyle-design.md`

**Verification note:** No unit tests exist for visual components. Each task is verified by (a) `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"` (expected: no output) and (b) a headless screenshot of the OPEN menu reviewed against the spec. The menu only renders when open, so the screenshot step clicks `button[aria-label="Open menu"]` before capture (script provided in Task 2, Step 6). Dev server: `http://localhost:3000/es`.

---

### Task 1: i18n — add the `menu` block (eyebrow + per-item peek copy)

**Files:**
- Modify: `lib/i18n/dictionaries.ts` (the `Dictionary` interface, and the EN/ES/CA dictionary objects)

The `Dictionary` interface starts at line 3; `nav` type at line 5. The three locale objects each have a `nav:` block at lines ~162 (EN), ~445 (ES), ~728 (CA). Add the `menu` block right after each `nav` block (type and values) so it stays adjacent and easy to diff.

- [ ] **Step 1: Add the `menu` type to the `Dictionary` interface**

In `interface Dictionary`, immediately after the `nav: { … }` block (after line 14's closing `}`), add:

```ts
  menu: {
    eyebrow: string
    peek: {
      home: string
      services: string
      work: string
      process: string
      about: string
      contact: string
      blog: string
      tools: string
    }
  }
```

- [ ] **Step 2: Add EN values** (immediately after the EN `nav: { … }` object, the one whose `home: 'Home'`)

```ts
  menu: {
    eyebrow: 'Menu — V13 Studio',
    peek: {
      home: 'Back to the top — the studio in one screen.',
      services: 'What we build: web, product, AI integration.',
      work: 'Selected projects we have shipped.',
      process: 'How we go from idea to launch.',
      about: 'Who we are and how we work.',
      contact: 'Start a project — tell us what you need.',
      blog: 'AI and software news, updated daily.',
      tools: 'Free tools we built — opens in a new tab.',
    },
  },
```

- [ ] **Step 3: Add ES values** (after the ES `nav` object, `home: 'Inicio'` / similar)

```ts
  menu: {
    eyebrow: 'Menú — V13 Studio',
    peek: {
      home: 'Volver arriba — el estudio en una pantalla.',
      services: 'Lo que construimos: web, producto, integración de IA.',
      work: 'Proyectos seleccionados que hemos lanzado.',
      process: 'Cómo pasamos de la idea al lanzamiento.',
      about: 'Quiénes somos y cómo trabajamos.',
      contact: 'Empieza un proyecto — cuéntanos qué necesitas.',
      blog: 'Noticias de IA y software, cada día.',
      tools: 'Herramientas gratuitas que hemos creado — abre en otra pestaña.',
    },
  },
```

- [ ] **Step 4: Add CA values** (after the CA `nav` object)

```ts
  menu: {
    eyebrow: 'Menú — V13 Studio',
    peek: {
      home: 'Tornar a dalt — l’estudi en una pantalla.',
      services: 'El que construïm: web, producte, integració d’IA.',
      work: 'Projectes seleccionats que hem llançat.',
      process: 'Com passem de la idea al llançament.',
      about: 'Qui som i com treballem.',
      contact: 'Comença un projecte — explica’ns què necessites.',
      blog: 'Notícies d’IA i programari, cada dia.',
      tools: 'Eines gratuïtes que hem creat — s’obre en una pestanya nova.',
    },
  },
```

- [ ] **Step 5: Verify types**

Run: `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"`
Expected: no output (TypeScript will flag any locale object missing `menu` — so this also proves all three were added).

- [ ] **Step 6: Commit**

```bash
git add lib/i18n/dictionaries.ts
git commit -m "i18n(menu): add menu eyebrow + per-item peek copy (en/es/ca)"
```

---

### Task 2: header.tsx — fullscreen overlay + brand-card peek

**Files:**
- Modify: `components/sections/header.tsx`

Reuses the already-imported `V13_PATH` (line 10), `cn`, `useT`, `useLocale`, `locales`, `localeNames`, `usePathname`. Preserves `handleNav`, `scrollToTop`, the hamburger button, the Escape/scroll-lock effects, and the scroll-to-top button. Only the `navItems` array, a new `hovered` state, and the backdrop + `<nav>` block change.

- [ ] **Step 1: Add `key` to each nav item**

Replace the `navItems` array (lines 16–25) with a keyed version (the `key` maps each item to its peek copy):

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

- [ ] **Step 2: Add the `hovered` state**

Next to `const [isOpen, setIsOpen] = useState(false)` (line 26), add:

```tsx
  const [hovered, setHovered] = useState<string | null>(null)
```

And reset it whenever the menu closes — inside the existing scroll-lock effect (the `useEffect` at lines 47–54), in the `else` branch add `setHovered(null)`:

```tsx
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setHovered(null)
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])
```

- [ ] **Step 3: Delete the old backdrop overlay**

Remove the entire backdrop block (lines 138–145, the `{/* ── Backdrop overlay ── */}` `<div … onClick={() => setIsOpen(false)} />`). In a fullscreen overlay it is redundant — the opaque overlay covers the viewport, and the menu still closes via the hamburger-X and Escape.

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
        {/* faint V13 watermark */}
        <svg
          viewBox="232 348 560 312"
          className="pointer-events-none absolute -left-16 bottom-0 w-[70%] opacity-[0.04]"
          fill="none"
          aria-hidden="true"
        >
          <path d={V13_PATH} fill="none" stroke="#9268f6" strokeWidth={3} strokeLinejoin="round" />
        </svg>

        {/* eyebrow — top left (desktop) */}
        <p className="absolute top-7 left-6 sm:left-10 md:left-16 z-10 hidden md:block text-[10px] font-mono uppercase tracking-[0.35em] text-white/55">
          {t.menu.eyebrow}
        </p>

        {/* two-column body */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col md:flex-row">
          {/* LEFT — nav */}
          <div className="flex flex-[1.1] flex-col justify-center px-6 sm:px-10 md:px-16 py-24 md:py-0">
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item, i) => {
                const isExternal = item.href.startsWith("http")
                const active = hovered === item.key
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNav(item.href)}
                      onMouseEnter={() => setHovered(item.key)}
                      onFocus={() => setHovered(item.key)}
                      onMouseLeave={() => setHovered(null)}
                      onBlur={() => setHovered(null)}
                      className="group flex w-full items-center gap-4 py-1.5 text-left transition-transform duration-300 hover:translate-x-2"
                      style={{
                        transitionDelay: isOpen ? `${i * 50 + 120}ms` : "0ms",
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? undefined : "translateY(24px)",
                      }}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full border transition-colors duration-300",
                          active
                            ? "border-[#9268f6] bg-[#9268f6]"
                            : "border-white/40 bg-transparent group-hover:border-[#9268f6] group-hover:bg-[#9268f6]"
                        )}
                      />
                      <span className="font-sans font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(1.9rem,5vw,2.9rem)] text-white/70 transition-colors duration-300 group-hover:text-[#9268f6]">
                        {item.label}
                      </span>
                      {isExternal && (
                        <svg
                          aria-hidden="true"
                          className="ml-1 h-5 w-5 -translate-x-2 text-white/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
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

          {/* RIGHT — brand-card peek (desktop only) */}
          <div className="relative hidden flex-[0.9] overflow-hidden border-l border-white/10 md:block">
            {/* default purple glow */}
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(60% 50% at 60% 40%, rgba(146,104,246,0.16), transparent 70%)" }}
            />
            {/* V13 corner motif */}
            <svg
              viewBox="232 348 560 312"
              className="pointer-events-none absolute -right-10 -bottom-10 w-[55%] opacity-[0.06]"
              fill="none"
              aria-hidden="true"
            >
              <path d={V13_PATH} fill="none" stroke="#9268f6" strokeWidth={3} strokeLinejoin="round" />
            </svg>
            {/* crossfading brand cards */}
            {navItems.map((item, i) => (
              <div
                key={item.key}
                className={cn(
                  "absolute inset-0 flex flex-col justify-center px-12 transition-opacity duration-300",
                  hovered === item.key ? "opacity-100" : "opacity-0"
                )}
              >
                <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.35em] text-[#9268f6]/80">
                  {String(i + 1).padStart(2, "0")} — V13
                </p>
                <h2 className="font-sans text-4xl font-bold tracking-[-0.02em] text-white">
                  {item.label}
                </h2>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
                  {t.menu.peek[item.key as keyof typeof t.menu.peek]}
                </p>
              </div>
            ))}
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
                    "px-4 py-2 text-xs font-mono tracking-[0.2em] border transition-all duration-300",
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
            className="text-xs font-mono text-white/50 transition-colors hover:text-[#9268f6]"
          >
            v13studio@v13studio.com
          </a>
        </div>
      </nav>
```

- [ ] **Step 5: Verify types**

Run: `npx tsc --noEmit 2>&1 | grep -v preloader | grep "error TS"`
Expected: no output. (Confirms `t.menu.peek[item.key]` indexing and the new state are type-correct.)

- [ ] **Step 6: Screenshot the OPEN menu**

The menu renders only when open, so click the hamburger before capturing. Create `.tmp_specs2/shot-menu.mjs`:

```js
import { chromium } from "playwright"
const url = process.argv[2] || "http://localhost:3000/es"
const out = process.argv[3] || ".tmp_specs2/menu_open.png"
const b = await chromium.launch()
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
await p.goto(url, { waitUntil: "networkidle" })
await p.click('button[aria-label="Open menu"]')
await p.waitForTimeout(900)            // let the stagger + fade settle
await p.mouse.move(360, 430)           // hover a nav item to trigger the peek
await p.waitForTimeout(500)
await p.screenshot({ path: out })
await b.close()
console.log("wrote", out)
```

Run (dev server must be up at `http://localhost:3000`):
`node .tmp_specs2/shot-menu.mjs "http://localhost:3000/es" .tmp_specs2/menu_open.png`
Then Read `.tmp_specs2/menu_open.png`.
Expected: fullscreen `#050505` overlay; large Space Grotesk bold nav items (no `01/02` numbers) with a dot before each; one item hovered shows purple label + filled dot; right pane shows a brand card (mono `0X — V13` eyebrow, big white title, one-line description) over a purple glow + faint V13; bottom bar with `ES · EN · CA` + email; faint V13 watermark bottom-left.

> If Playwright is not installed, fall back to the repo's existing `.tmp_specs2/shot.mjs` harness used by prior plans, adding the same `click('button[aria-label="Open menu"]')` + `mouse.move` before capture.

- [ ] **Step 7: Commit**

```bash
git add components/sections/header.tsx
git commit -m "feat(menu): fullscreen overlay + brand-card peek; Display-type nav"
```

---

## Self-Review

- **Spec coverage:**
  - Fullscreen `#050505` overlay (§1) → Task 2 Step 4 (`fixed inset-0 bg-[#050505]`, opacity transition).
  - Eyebrow mono micro-label (§1) → Step 4 (`t.menu.eyebrow`, tracking `0.35em`, white/55).
  - Display/Gallery nav: Space Grotesk bold, no numbers, dot accent, purple hover, translate-x, staggered entrance (§2) → Step 4 nav `<ul>` + preserved `transitionDelay`/opacity/transform stagger.
  - Item types preserved (anchors/route/external + external arrow), `hasProjects` filter (§2, Preserved) → Step 1 keyed array + Step 4 `isExternal` arrow + `handleNav`.
  - Brand-card peek: default glow + V13, crossfade to name+desc on hover, hidden mobile (§3) → Step 4 right column (`hidden md:block`, default glow div, crossfading cards keyed on `hovered`).
  - Bottom bar: language switcher + email (§4) → Step 4 bottom bar.
  - Responsive: single column `<md`, peek + eyebrow hidden, bottom bar stacks (§5) → `flex-col md:flex-row`, `hidden md:block`, `hidden md:block` eyebrow, `flex-col sm:flex-row` bottom bar.
  - i18n `menu.eyebrow` + per-item peek × 3 locales (§i18n) → Task 1.
  - Preserved behavior (Esc, scroll lock, backdrop→removed as redundant, handleNav, scroll-to-top) → Tasks note; backdrop removal is intentional and documented (Step 3).
- **Placeholder scan:** none — all code is concrete; the V13 path reuses the existing imported `V13_PATH`.
- **Type consistency:** `menu.peek` keys (`home/services/work/process/about/contact/blog/tools`) defined in Task 1 Step 1 match the `navItems` `key` values in Task 2 Step 1 and the `t.menu.peek[item.key]` access in Step 4. `hovered: string | null` set/cleared consistently (`setHovered`).
- **Behavior note:** the separate backdrop div is deliberately removed (fullscreen overlay makes it redundant); close paths remain hamburger-X + Escape + selecting an anchor item.
