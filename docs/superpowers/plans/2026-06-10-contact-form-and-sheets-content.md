# Contact Form (IONOS SMTP) + Google Sheets Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the contact form actually send email through IONOS SMTP, and drive projects/team/stats from a Google Sheets document (published CSV) so the owner can edit content without deploying.

**Architecture:** A Next.js route handler (`app/api/contact/route.ts`) validates with zod and sends mail via nodemailer. A server-side loader (`lib/content.ts`) fetches published-to-web CSVs with ISR (`revalidate: 600`), parses them, and maps per-locale columns. The home page becomes an async server component that passes data down as props; the Portfolio section (and its nav/CTA links) disappear entirely when there are no projects.

**Tech Stack:** Next.js 16 App Router, React 19, zod (already installed), nodemailer (new), TypeScript, Tailwind 4.

**Spec:** `docs/superpowers/specs/2026-06-10-contact-form-and-sheets-content-design.md`

**Note on testing:** The repo has no test framework and the approved spec keeps it out of scope. Verification is: `npm run build` must succeed (note `next.config.mjs` sets `ignoreBuildErrors: true`, so ALSO run `npx tsc --noEmit` for type safety), plus manual curl/browser checks described in each task. Intermediate tasks (5–7) leave the page→section prop wiring temporarily inconsistent; Task 8 closes the loop and Task 10 verifies everything.

---

### Task 1: Content loader `lib/content.ts`

**Files:**
- Create: `lib/content.ts`

- [ ] **Step 1: Create `lib/content.ts` with this exact content**

```ts
import type { Locale } from '@/lib/i18n/config'

export interface SheetProject {
  id: string
  title: string
  year: string
  color: string
  tags: string[]
  url?: string
  category: string
  description: string
}

export interface SheetTeamMember {
  initials: string
  color: string
  role: string
}

export interface SheetStat {
  value: string
  label: string
}

const REVALIDATE_SECONDS = 600

/**
 * Minimal CSV parser handling quoted fields, escaped quotes ("") and
 * newlines inside quotes (Google Sheets "publish to web" CSV format).
 * Returns one record per row keyed by the header row.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(field)
      field = ''
    } else if (ch === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (ch !== '\r') {
      field += ch
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  const [header, ...data] = rows
  if (!header) return []

  return data
    .filter((r) => r.some((cell) => cell.trim() !== ''))
    .map((r) =>
      Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? '').trim()])),
    )
}

async function fetchSheet(url: string | undefined): Promise<Record<string, string>[]> {
  if (!url) return []
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) {
      console.error(`[content] Sheet fetch failed: ${res.status} ${url}`)
      return []
    }
    return parseCsv(await res.text())
  } catch (error) {
    console.error('[content] Sheet fetch error:', error)
    return []
  }
}

/** Read `<base>_<locale>` column, falling back to English. */
function localized(row: Record<string, string>, base: string, locale: Locale): string {
  return row[`${base}_${locale}`] || row[`${base}_en`] || ''
}

export async function getProjects(locale: Locale): Promise<SheetProject[]> {
  const rows = await fetchSheet(process.env.SHEETS_PROJECTS_CSV_URL)
  return rows
    .filter((row) => row.id && row.title)
    .map((row) => ({
      id: row.id,
      title: row.title,
      year: row.year || '',
      color: row.color || '#8B5CF6',
      tags: (row.tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      url: row.url || undefined,
      category: localized(row, 'category', locale),
      description: localized(row, 'description', locale),
    }))
}

export async function getTeam(locale: Locale): Promise<SheetTeamMember[]> {
  const rows = await fetchSheet(process.env.SHEETS_TEAM_CSV_URL)
  return rows
    .filter((row) => row.initials)
    .map((row) => ({
      initials: row.initials,
      color: row.color || '#8B5CF6',
      role: localized(row, 'role', locale),
    }))
}

export async function getStats(locale: Locale): Promise<SheetStat[]> {
  const rows = await fetchSheet(process.env.SHEETS_STATS_CSV_URL)
  return rows
    .filter((row) => row.value)
    .map((row) => ({
      value: row.value,
      label: localized(row, 'label', locale),
    }))
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (pre-existing errors unrelated to `lib/content.ts` are out of scope — there should be none).

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "feat: add Google Sheets CSV content loader with ISR"
```

---

### Task 2: Contact API route (IONOS SMTP)

**Files:**
- Create: `app/api/contact/route.ts`
- Modify: `package.json` (nodemailer dependency)

- [ ] **Step 1: Install nodemailer**

Run: `npm install nodemailer && npm install -D @types/nodemailer`
Expected: both added to `package.json` without peer-dependency errors.

- [ ] **Step 2: Create `app/api/contact/route.ts` with this exact content**

```ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
  consent: z.literal(true),
  // Honeypot — humans never fill this; handled below, kept loose here.
  website: z.string().optional().default(''),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { name, email, message, website } = parsed.data

  // Honeypot filled → pretend success, send nothing.
  if (website) {
    return NextResponse.json({ ok: true })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error('[contact] SMTP env vars missing')
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `[v13studio.com] Contact form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })
  } catch (error) {
    console.error('[contact] sendMail failed:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Verify validation behavior locally (no SMTP creds needed)**

Run `npm run dev` in background, then:

```bash
curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":""}'
```
Expected: `400`

```bash
curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"a@b.com","message":"hi","consent":true,"website":"spam"}'
```
Expected: `200` (honeypot short-circuit — no email attempted)

```bash
curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"a@b.com","message":"hi","consent":true}'
```
Expected: `500` if SMTP env vars not set (logged "SMTP env vars missing"); `200` once real creds exist in `.env.local`. Stop the dev server after.

- [ ] **Step 4: Commit**

```bash
git add app/api/contact/route.ts package.json package-lock.json
git commit -m "feat: contact API route sending mail via IONOS SMTP"
```

(If `pnpm-lock.yaml` changed instead, add that file.)

---

### Task 3: New i18n strings for form states

**Files:**
- Modify: `lib/i18n/dictionaries.ts`

- [ ] **Step 1: Extend the `contact` block of the `Dictionary` interface**

In `lib/i18n/dictionaries.ts`, the interface's `contact` section (around line 61) gains four keys. Add after `send: string`:

```ts
    sending: string
    errorTitle: string
    errorText: string
    errorMailto: string
```

- [ ] **Step 2: Add the strings to all three locale objects**

Each locale object (`en`, `es`, `ca`) has a `contact: { ... }` block. Add after the `send` entry in each:

English (`en`):
```ts
    sending: 'Sending…',
    errorTitle: 'Something went wrong',
    errorText: 'Your message could not be sent. Please try again, or email us directly at',
    errorMailto: 'v13studio@v13studio.com',
```

Spanish (`es`):
```ts
    sending: 'Enviando…',
    errorTitle: 'Algo ha fallado',
    errorText: 'No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbenos directamente a',
    errorMailto: 'v13studio@v13studio.com',
```

Catalan (`ca`):
```ts
    sending: 'Enviant…',
    errorTitle: 'Alguna cosa ha fallat',
    errorText: "No s'ha pogut enviar el missatge. Torna-ho a provar o escriu-nos directament a",
    errorMailto: 'v13studio@v13studio.com',
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/dictionaries.ts
git commit -m "feat: i18n strings for contact form sending/error states"
```

---

### Task 4: Wire the contact form to the API

**Files:**
- Modify: `components/sections/contact.tsx`

- [ ] **Step 1: Replace form state machine**

In `components/sections/contact.tsx`, replace these two lines (currently lines 17–18):

```ts
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
```

with:

```ts
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
```

- [ ] **Step 2: Replace `handleSubmit` (currently lines 35–38)**

```ts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "sending") return
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, consent, website: honeypot }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }
```

- [ ] **Step 3: Switch the render condition**

Change `{submitted ? (` (line 176) to `{status === "success" ? (`.

- [ ] **Step 4: Add honeypot field + error message + sending state inside the form**

Right after `<form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">` add the honeypot:

```tsx
                {/* Honeypot — hidden from humans */}
                <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                  <label>
                    Website
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </label>
                </div>
```

Note: the `<form>` needs `relative` added to its className for the absolute positioning: `className="relative space-y-6 sm:space-y-8"`.

Right before the submit `<button>` add the error block:

```tsx
                {status === "error" && (
                  <div className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm" role="alert">
                    <p className="font-medium">{t.contact.errorTitle}</p>
                    <p className="text-muted-foreground">
                      {t.contact.errorText}{" "}
                      <a href={`mailto:${t.contact.errorMailto}`} className="text-primary underline underline-offset-2">
                        {t.contact.errorMailto}
                      </a>
                    </p>
                  </div>
                )}
```

On the submit button: add `disabled={status === "sending"}` and `disabled:opacity-60 disabled:cursor-not-allowed` to its className, and change the button label span content from `{t.contact.send}` to:

```tsx
{status === "sending" ? t.contact.sending : t.contact.send}
```

- [ ] **Step 5: Verify in browser**

Run `npm run dev`, open `http://localhost:3000/es`, scroll to contact form:
- Submit empty → native required validation blocks.
- Fill and submit without SMTP creds → error block appears with mailto link.
- With creds in `.env.local` → success panel appears AND email arrives at `CONTACT_TO`.
Stop the dev server after.

- [ ] **Step 6: Commit**

```bash
git add components/sections/contact.tsx
git commit -m "feat: wire contact form to API with sending/error states and honeypot"
```

---

### Task 5: Portfolio section driven by props

**Files:**
- Modify: `components/sections/portfolio.tsx`

- [ ] **Step 1: Replace hardcoded projects with a prop**

In `components/sections/portfolio.tsx`:

1. Delete the entire `const projects = [ ... ]` array (lines 8–45).
2. Add the import: `import type { SheetProject } from "@/lib/content"`.
3. Change the component signature from `export function Portfolio() {` to:

```tsx
export function Portfolio({ projects }: { projects: SheetProject[] }) {
```

The JSX body keeps working as-is: it uses `project.id`, `project.title`, `project.category`, `project.year`, `project.description`, `project.tags`, `project.color` — all present on `SheetProject`.

- [ ] **Step 2: Make the project title a link when `url` exists**

Replace the title `<h3>` block (currently lines 153–155):

```tsx
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-4">
                      {project.url ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
```

- [ ] **Step 3: Commit** (note: `app/[locale]/page.tsx` still renders `<Portfolio />` without props until Task 8 — `npx tsc --noEmit` will flag exactly that one error; acceptable until Task 8)

```bash
git add components/sections/portfolio.tsx
git commit -m "feat: portfolio section reads projects from props (Sheets data)"
```

---

### Task 6: About section driven by props + dictionary cleanup

**Files:**
- Modify: `components/sections/about.tsx`
- Modify: `lib/i18n/dictionaries.ts`

- [ ] **Step 1: Convert About to props**

In `components/sections/about.tsx`:

1. Delete the `const teamMeta = [ ... ]` array (lines 8–13).
2. Add import: `import type { SheetTeamMember, SheetStat } from "@/lib/content"`.
3. Change the signature and remove the local mappings. Replace:

```tsx
export function About() {
  const t = useT()
  const team = teamMeta.map((meta, i) => ({
    ...meta,
    role: t.about.teamRoles[i],
  }))
  const stats = t.about.stats
```

with:

```tsx
export function About({ team, stats }: { team: SheetTeamMember[]; stats: SheetStat[] }) {
  const t = useT()
```

4. Hide empty sub-blocks. Wrap the team grid (`<div className="grid grid-cols-2 gap-2 sm:gap-4">...</div>`) in `{team.length > 0 && ( ... )}` and the stats grid (`<div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:gap-8">...</div>`) in `{stats.length > 0 && ( ... )}`. The team member key changes from `key={member.role}` to `key={member.initials}` (roles from a sheet may repeat).

- [ ] **Step 2: Remove `stats` and `teamRoles` from dictionaries**

In `lib/i18n/dictionaries.ts`:
- Interface: delete `stats: { value: string; label: string }[]` and `teamRoles: string[]` from the `about` block.
- In each of the three locale objects (`en`, `es`, `ca`), delete the `stats: [ ... ]` array and the `teamRoles: [ ... ]` array inside `about`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/about.tsx lib/i18n/dictionaries.ts
git commit -m "feat: about team/stats from Sheets props, drop hardcoded dictionary data"
```

---

### Task 7: Hide "Work" navigation when there are no projects

**Files:**
- Modify: `components/sections/header.tsx`
- Modify: `components/sections/hero.tsx`

- [ ] **Step 1: Header accepts `hasProjects`**

In `components/sections/header.tsx`, change the signature:

```tsx
export function Header({ hasProjects }: { hasProjects: boolean }) {
```

and filter the nav array. Replace the `const navItems = [ ... ]` declaration's closing with a filter:

```tsx
  const navItems = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
    { label: t.nav.blog, href: `/${locale}/blog` },
    { label: t.nav.tools, href: "https://tools.v13studio.com" },
  ].filter((item) => hasProjects || item.href !== "#work")
```

- [ ] **Step 2: Hero hides the work CTA**

In `components/sections/hero.tsx`, change the signature:

```tsx
export function Hero({ hasProjects }: { hasProjects: boolean }) {
```

Wrap the first CTA `<button onClick={() => navigateToSection("#work")} ...>...</button>` (lines 154–169) in `{hasProjects && ( ... )}`.

- [ ] **Step 3: Commit**

```bash
git add components/sections/header.tsx components/sections/hero.tsx
git commit -m "feat: hide Work nav and hero CTA when no projects published"
```

---

### Task 8: Home page loads Sheets data (async server component)

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Replace the file content entirely**

```tsx
import { notFound } from "next/navigation"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { Portfolio } from "@/components/sections/portfolio"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { SectionStack } from "@/components/section-stack"
import { AnimatedBackground } from "@/components/animated-background"
import { CustomCursor } from "@/components/custom-cursor"
import { Preloader } from "@/components/preloader"
import { ScrollProgress } from "@/components/scroll-progress"
import { getProjects, getTeam, getStats } from "@/lib/content"
import { isLocale } from "@/lib/i18n/config"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [projects, team, stats] = await Promise.all([
    getProjects(locale),
    getTeam(locale),
    getStats(locale),
  ])
  const hasProjects = projects.length > 0

  return (
    <>
      <Preloader />
      <CustomCursor />
      <AnimatedBackground />
      <ScrollProgress />
      <Header hasProjects={hasProjects} />
      <main>
        <SectionStack>
          <Hero hasProjects={hasProjects} />
          <Services />
          {hasProjects && <Portfolio projects={projects} />}
          <Process />
          <About team={team} stats={stats} />
          <Contact />
        </SectionStack>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Type-check (the Task 5 prop error must be gone now)**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify in browser**

`npm run dev`, open `http://localhost:3000/es`:
- Without `SHEETS_*` env vars: Portfolio section absent, "Work" missing from menu, hero shows only the contact CTA, About renders without team/stats grids. No crashes.
- (After owner setup) with env vars pointing at a sheet with rows: section/menu/CTA appear, data matches the sheet per language (`/es`, `/en`, `/ca`).
Stop the dev server after.

- [ ] **Step 4: Commit**

```bash
git add "app/[locale]/page.tsx"
git commit -m "feat: home page loads projects/team/stats from Google Sheets with ISR"
```

---

### Task 9: Env template, gitignore, owner setup doc

**Files:**
- Create: `.env.example`
- Create: `docs/content-sheets.md`
- Modify: `.gitignore`

- [ ] **Step 1: Create `.env.example`**

```bash
# IONOS SMTP (contact form)
SMTP_HOST=smtp.ionos.es
SMTP_PORT=587
SMTP_USER=v13studio@v13studio.com
SMTP_PASS=
CONTACT_TO=v13studio@v13studio.com

# Google Sheets published-to-web CSV URLs (one per tab)
SHEETS_PROJECTS_CSV_URL=
SHEETS_TEAM_CSV_URL=
SHEETS_STATS_CSV_URL=
```

- [ ] **Step 2: Ensure `.gitignore` covers env files and tsbuildinfo**

Check `.gitignore`; add any of these lines that are missing:

```
.env*
!.env.example
*.tsbuildinfo
```

If `tsconfig.tsbuildinfo` is currently untracked-but-present, the ignore line removes it from `git status` noise.

- [ ] **Step 3: Create `docs/content-sheets.md` (owner-facing, in Spanish)**

```markdown
# Contenido editable desde Google Sheets

La web lee proyectos, equipo y stats de una hoja de Google Sheets publicada como CSV.
Editas la hoja → la web se actualiza sola en ≤10 minutos. Sin deploys.

## Crear la hoja (una sola vez)

1. Crea un documento en Google Sheets con tres pestañas: `projects`, `team`, `stats`.
2. Primera fila de cada pestaña = cabeceras EXACTAS (en minúsculas):

   **projects**: `id`, `title`, `year`, `color`, `tags`, `url`, `category_en`, `category_es`, `category_ca`, `description_en`, `description_es`, `description_ca`
   - `tags`: separadas por comas (`React Native, NestJS`)
   - `color`: hex (`#8B5CF6`)
   - `url`: opcional, enlace al proyecto
   - Una fila sin `id` o `title` se ignora.

   **team**: `initials`, `color`, `role_en`, `role_es`, `role_ca`

   **stats**: `value`, `label_en`, `label_es`, `label_ca`

3. Para CADA pestaña: Archivo → Compartir → Publicar en la web → selecciona la pestaña →
   formato "Valores separados por comas (.csv)" → Publicar. Copia la URL resultante
   (termina en `output=csv`).

## Configurar las URLs

Pon cada URL en su variable de entorno (local: `.env.local`; producción: Vercel →
Settings → Environment Variables):

- `SHEETS_PROJECTS_CSV_URL`
- `SHEETS_TEAM_CSV_URL`
- `SHEETS_STATS_CSV_URL`

Tras añadirlas en Vercel hace falta UN deploy (solo esta vez). Después, editar la hoja
nunca requiere deploy.

## Comportamiento

- Sin proyectos (pestaña vacía): la sección Portfolio, el enlace "Work" del menú y el
  botón del hero desaparecen. Aparecen solos al añadir la primera fila.
- Si Google Sheets no responde, la web sirve el último contenido cacheado. Nunca rompe.
- Si falta una traducción, se usa la columna `_en` como respaldo.

## Formulario de contacto (SMTP IONOS)

Variables (local: `.env.local`; producción: Vercel): `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`. Plantilla en `.env.example`.
La contraseña es la del buzón de correo IONOS (crea el buzón en el panel de IONOS si
no existe).
```

- [ ] **Step 4: Commit**

```bash
git add .env.example .gitignore docs/content-sheets.md
git commit -m "docs: env template and Google Sheets content setup guide"
```

---

### Task 10: Final verification

- [ ] **Step 1: Full type-check and build**

Run: `npx tsc --noEmit` → expected: no errors.
Run: `npm run build` → expected: build succeeds; `/[locale]` routes generated; `/api/contact` listed as dynamic route.

- [ ] **Step 2: Manual smoke test**

`npm run dev` and check `http://localhost:3000/es`, `/en`, `/ca`:
- All sections render; no Portfolio/Work/hero-work-CTA without sheet data.
- Contact form: error path renders (no creds) or email arrives (with creds).
Stop the dev server.

- [ ] **Step 3: Confirm clean status and report**

`git status` → only intentional changes. Report to owner the two setup actions pending on their side (Sheets creation + env vars in Vercel and `.env.local`).
