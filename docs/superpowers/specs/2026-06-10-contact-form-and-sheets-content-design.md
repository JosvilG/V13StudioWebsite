# Design: Real contact form (IONOS SMTP) + editable content via Google Sheets

Date: 2026-06-10
Status: Approved by user

## Context

The site is a Next.js 16 app (App Router, locales `en/es/ca`, deployed on Vercel) for V13 Studio, a solo freelancer brand. Two problems:

1. The contact form (`components/sections/contact.tsx`) fakes submission — `handleSubmit` only sets `submitted = true`. Messages are lost.
2. Display data (portfolio projects, team grid, about stats) is hardcoded placeholder/demo content. The owner wants to edit this data in an external document and have the site update without deploying. There are no real published projects yet.

## Decisions (user-confirmed)

- Email delivery: IONOS SMTP (domain is hosted at IONOS). Site stays on Vercel.
- Data source: Google Sheets, read via "Publish to web" CSV. No API keys.
- Portfolio section: hidden entirely when the sheet has no projects (nav links to it hidden too). Appears automatically when the first row is added.
- About section: keep the team grid, fed from Sheets (owner decides what to put there).

## Component 1: Contact form backend

### API route `app/api/contact/route.ts`

- POST only. Body validated with `zod`: `name` (1–200 chars), `email` (valid email), `message` (1–5000 chars), `consent` (must be true), `website` (honeypot — must be empty; if filled, return 200 silently without sending).
- Sends mail with `nodemailer` through IONOS SMTP.
- Env vars: `SMTP_HOST` (`smtp.ionos.es`), `SMTP_PORT` (`587`), `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`. Configured in `.env.local` (local) and Vercel project settings (production). Never committed.
- Mail: from `SMTP_USER`, to `CONTACT_TO`, `replyTo` set to the visitor's email. Subject includes visitor name. Plain-text body with name/email/message.
- Responses: 200 `{ ok: true }`, 400 on validation error, 500 on send failure. No internal error details leaked to the client.

### Frontend changes (`components/sections/contact.tsx`)

- `handleSubmit` does `fetch('/api/contact', { method: 'POST', ... })`.
- States: idle / sending (button disabled, spinner or label change) / success (existing success panel) / error (inline message + fallback `mailto:` link).
- Hidden honeypot input named `website` (visually hidden, `tabIndex={-1}`, `autoComplete="off"`).
- New i18n strings in `lib/i18n/dictionaries.ts` for EN/ES/CA: sending label, error title/text, mailto fallback text.

## Component 2: Content from Google Sheets

### Spreadsheet structure

One Google Sheets document, three tabs, each published to web as CSV (read-only public; editing protected by the owner's Google account):

- `projects`: `id`, `title`, `year`, `color`, `tags` (comma-separated), `url` (optional), `category_en`, `category_es`, `category_ca`, `description_en`, `description_es`, `description_ca`
- `team`: `initials`, `color`, `role_en`, `role_es`, `role_ca`
- `stats`: `value`, `label_en`, `label_es`, `label_ca`

### Loader `lib/content.ts`

- One exported async function per tab: `getProjects(locale)`, `getTeam(locale)`, `getStats(locale)`. Each fetches its published CSV URL with `next: { revalidate: 600 }` (10 min ISR), parses CSV (small hand-rolled parser handling quoted fields — no new dependency), maps per-locale columns to the requested locale, and returns typed arrays.
- CSV URLs come from env vars (`SHEETS_PROJECTS_CSV_URL`, `SHEETS_TEAM_CSV_URL`, `SHEETS_STATS_CSV_URL`) so the sheet can be swapped without code changes.
- Error handling: on fetch/parse failure, return `[]` (and log server-side). Sections render their fallback behavior; the site never breaks. ISR serves the last good cached HTML while revalidation fails.
- Rows with missing required fields are skipped.

### Page and section changes

- `app/[locale]/page.tsx` becomes an async server component: loads projects/team/stats, passes them as props.
- `Portfolio` receives `projects` prop, drops its hardcoded array. If `projects.length === 0`, the home page does not render the section at all.
- `Header` and `Footer` receive a flag (or the nav list) so the "Work" link is hidden when there are no projects.
- `About` receives `team` and `stats` props, drops `teamMeta` and dictionary stats. Empty team/stats arrays hide just that sub-block, not the section.
- Dictionary `about.stats` entries removed (data moves to Sheets); `teamRoles` removed likewise. Static copy (hero, services, process, about paragraphs, legal) stays in `dictionaries.ts`.

## Out of scope

- Honest rewrite of About copy ("4-person studio" claim) — owner will manage via Sheets/dictionary content separately.
- Captcha/advanced rate limiting (honeypot only for now).
- Test framework setup. Verification is manual: `next build`, local run with real `.env.local`, send a test email, edit the sheet and confirm refresh after revalidation.

## Setup the owner must do

1. Create the Google Sheets document with the three tabs and publish each tab to web as CSV; put the three CSV URLs in env vars (local + Vercel).
2. Create/confirm an IONOS mailbox; put SMTP credentials in `.env.local` and Vercel env vars.
