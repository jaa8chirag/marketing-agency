# Cordinit Media — Website

Creative-first, CMS-driven marketing site for Cordinit Media (Next.js 14 App Router, TypeScript, Tailwind, Prisma + PostgreSQL). Built against `docs/Confidential_Media_Brief.md` and the navigation workbook.

## Quick start

```bash
npm install                       # also runs `prisma generate`
cp .env.example .env              # fill in DATABASE_URL, ADMIN_*, SESSION_SECRET
npx prisma migrate deploy         # apply migrations
npm run db:seed                   # first-time content (WARNING: overwrites edited rows — see below)
npm run dev                       # http://localhost:3000
```

The database can be any PostgreSQL 14+ (local install, Docker via `docker-compose.yml` on port 5434, or a hosted provider such as Neon). Set `DATABASE_URL` accordingly.

### Seed scripts

| Script | Behaviour |
| --- | --- |
| `npm run db:seed` | Upserts everything from `lib/content.ts`. Use on a fresh database; re-running overwrites edits made in the admin panel for the seeded rows. |
| `npm run db:seed-services` | **Create-only.** Adds the remaining services from `prisma/services-extra.ts` and links demo case studies to services. Safe on a database with admin edits. |

## Architecture

- **Public site** — Server Components in `app/`, data via `lib/queries.ts` (Prisma). Types live in `lib/content.ts`.
- **Admin / CMS** — `/admin` (cookie session, `lib/session.ts`). CRUD for capabilities, services, industries, case studies, insights, team, testimonials, client logos, CTA blocks and site settings. Every content entity has optional SEO title / description / OG image.
- **Content model** — Capability → Service; Case Study ↔ Capability (join) and Service (slug pairs); Insight → Capability / Industry. See `prisma/schema.prisma`.
- **Lead capture** — `/api/contact` (validation, honeypot, rate limit, DB, Resend emails), `/api/newsletter`, `/api/cal-webhook` (Cal.com bookings). Attribution (UTM, referrer, landing page) is stored on `Lead`.
- **Analytics** — GA4 via `lib/analytics.ts`; events listed in `docs/REQUIREMENTS_TRACKER.md`.
- **SEO** — per-page metadata, canonicals, JSON-LD, `app/sitemap.ts`, `app/robots.ts`, `lib/seo.ts` for entity overrides.

## Key routes

`/` · `/solutions` · `/capabilities[/cap[/service]]` · `/industries[/slug]` · `/work[/slug]` · `/insights[/slug]` · `/insights/category/[category]` · `/search` · `/about` · `/ecosystem` · `/contact` (`?intent=book-a-call`) · `/careers` · `/legal/*`

## Redirects

Slug changes: add an entry to `lib/redirects.mjs` (applied in `next.config.mjs`).

## Quality gates

`npx tsc --noEmit` runs in CI (ESLint is not configured yet) (`.github/workflows/ci.yml`).

## More docs

`docs/DEPLOYMENT.md` (production), `docs/CLIENT_HANDOFF.md` (accounts to transfer), `docs/REQUIREMENTS_TRACKER.md` (brief compliance), `docs/DEFERRED_WORK.md` (open items).
