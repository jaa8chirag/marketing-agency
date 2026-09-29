# Deploying to Production (Vercel + Postgres)

Until this session, the site was a static-ish Next.js frontend on Vercel with no backend. It now has a real PostgreSQL database (Prisma), an admin panel, and API routes. Vercel can still host all of that — Next.js API routes, Server Actions and Server Components all run there natively — but Vercel itself does **not** host a long-running Postgres server (it's serverless), so the database needs a separate managed provider alongside it.

Legend: 🧑 = something only you can do (needs your accounts/dashboards) · 🤖 = already done in code this session.

---

## 1. Push the code to GitHub 🧑

If this repo isn't already on GitHub connected to your Vercel project, push it there first — Vercel deploys from a git connection.

```bash
git add -A
git commit -m "Add Postgres backend, admin panel, and deployment config"
git push
```

## 2. Create a managed Postgres database 🧑 — ✅ you've already done this

You enabled Vercel's native **Postgres database** from the project's Storage tab (Branch overview screenshot showed it as "Enabled"). This is Neon under the hood. **Important correction to what I said earlier:** this integration does *not* create a plain `DATABASE_URL` env var — it auto-injects its own set instead:

- `POSTGRES_URL` — pooled
- `POSTGRES_PRISMA_URL` — pooled, Prisma-formatted (this is the one that matters most)
- `POSTGRES_URL_NON_POOLING` — direct/non-pooled
- plus `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE`

🤖 **Fixed in code**, not something you need to do: `lib/db.ts` (app runtime) and `prisma7.config.ts` (CLI/migrations) now both fall back through `DATABASE_URL → POSTGRES_PRISMA_URL → POSTGRES_URL` automatically. Whatever Vercel already injected for you just works — no manual env var renaming or duplicating needed.

> **Why pooled matters:** our `lib/db.ts` uses `@prisma/adapter-pg` with the `pg` driver — a real TCP connection per request. Vercel serverless functions are ephemeral and can spin up many concurrent instances; without pooling, Postgres's connection limit (often just a few dozen on free tiers) gets exhausted fast under real traffic. `POSTGRES_PRISMA_URL` is already pooled, which is exactly why the fallback checks it before the plain `POSTGRES_URL`.

## 3. Set the remaining environment variables in Vercel 🧑

The database connection is already handled (step 2). Project → Settings → Environment Variables. Add these three (Production, and Preview if you want preview deploys to also hit the DB) — Vercel's Postgres integration doesn't create these for you, they're specific to this app:

| Variable | Value |
|---|---|
| `SESSION_SECRET` | A new random string — **do not reuse the dev one**. Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_EMAIL` | The real admin login email |
| `ADMIN_PASSWORD` | A strong password — only used by the one-time seed script to create the admin user, see step 5 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Your GA4 measurement ID, if you have one (optional — analytics script only loads when this is set) |
| `NEXT_PUBLIC_CAL_LINK` | Your Cal.com event link, e.g. `your-username/book-a-call` (optional — the Book a Call flow shows a "not configured" message instead of a calendar until this is set) |
| `CAL_WEBHOOK_SECRET` | The webhook secret from that same Cal.com event type's settings (required for `/api/cal-webhook` to accept anything — it fails closed without it) |
| `RESEND_API_KEY` | From resend.com, free tier (optional — email sending is skipped with a log warning, not an error, until this is set) |
| `RESEND_FROM_EMAIL` | e.g. `Cordinit Media <hello@yourdomain.com>` — needs a domain verified in Resend. Falls back to Resend's shared `onboarding@resend.dev` if unset |
| `NOTIFICATION_EMAIL` | Where "new lead" internal alerts go. Falls back to `ADMIN_EMAIL` if unset |

See `docs/CLIENT_HANDOFF.md` for what exactly to get from the client for the Cal.com/Resend accounts — as of this write-up these were set up with the developer's own accounts as temporary placeholders.

## 4. Deploy 🧑

Push to your connected branch (or trigger a deploy from the Vercel dashboard). 🤖 The build itself now runs migrations automatically — `package.json`'s `build` script was updated this session to:

```
prisma generate && prisma migrate deploy && next build
```

`prisma migrate deploy` applies all committed migrations (from `prisma/migrations/`) to whatever `DATABASE_URL` is set for that environment — so the very first production deploy will create every table for you. No manual `migrate dev`/`db push` needed in production.

## 5. Seed the production database — once 🧑

The schema will exist after step 4, but it'll be empty (no capabilities, no admin user) until you seed it. Run this **once**, from your own machine, pointed at production:

```bash
# Copy the value of POSTGRES_PRISMA_URL from Vercel's Environment Variables
# page (Project → Settings → Environment Variables) and use it here as
# DATABASE_URL for this one-off command — that name always wins in the
# fallback chain, so this works regardless of what Vercel itself named it.
DATABASE_URL="<value of POSTGRES_PRISMA_URL from Vercel>" ADMIN_EMAIL="<real email>" ADMIN_PASSWORD="<real password>" npx prisma db seed
```

(On Windows PowerShell, set them as `$env:DATABASE_URL=...` etc. first, or run via Git Bash using the `VAR=value command` form above.)

This is safe to re-run later too — every seed operation is an `upsert` keyed on slug/email, so re-running just refreshes existing rows rather than duplicating them. 🤖 `package.json` also now has an `npm run db:seed` shortcut for this.

## 6. Change the admin password after first login 🧑

The seed script sets whatever `ADMIN_PASSWORD` you passed it. Log into `/admin` once and treat that as the real password going forward — there's currently no in-app "change password" flow, so if you need to rotate it later, re-run the seed with a new `ADMIN_PASSWORD` (it'll update the existing user via upsert).

## 7. Confirm the production domain matches the site's metadata 🧑🤖

`app/layout.tsx` and every page's canonical URL currently hardcode `https://cordinitmedia.com` as the site's domain (set during the SEO work this session, based on the brand name — **not confirmed as your actual registered domain**). If your real production domain is different, tell me and I'll do a find-and-replace across `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and every page's `alternates.canonical` — it's the same string in ~17 places, quick to fix once confirmed.

---

## What's already handled in code (nothing more to do here)

- ✅ `prisma/schema.prisma` + all migrations are committed to the repo — `migrate deploy` in step 4 applies them.
- ✅ `.gitignore` excludes `.env` — your local secrets were never committed.
- ✅ CSP/security headers (`next.config.mjs`) apply in production automatically, no extra config.
- ✅ Rate limiting on `/api/contact` and `/api/newsletter` — note it's in-memory per server instance. Vercel serverless functions don't share memory across invocations, so this rate limit is effectively much weaker in production than it looks locally (each cold invocation resets the counter). Fine for now; if abuse becomes a real problem, that needs a shared store (e.g. Vercel KV/Upstash Redis) instead — not built, flagging honestly rather than pretending it's production-grade as-is.
- ✅ `docker-compose.yml` is dev-only — not used in production at all, Neon replaces it entirely.
- ✅ **Fail-fast startup check** — `lib/db.ts` now throws a clear error immediately if no database connection string resolves, instead of the `pg` driver failing with a cryptic error deep inside a request.
- ✅ **Preview deployments won't get indexed** — both `app/robots.ts` and the `robots` metadata in `app/layout.tsx` now check Vercel's `VERCEL_ENV` and return `noindex`/`Disallow: /` for anything that isn't the `production` environment (this includes local dev too — verified `curl localhost:4100/robots.txt` returns `Disallow: /`). Without this, every preview URL Vercel generates for a branch/PR would be publicly crawlable and indexable — a real, commonly-missed leak of unfinished work.
- ✅ **Health-check endpoint** — `GET /api/health` round-trips to Postgres (`SELECT 1`) and returns `{status:"ok"}` or a `503`. Point an uptime monitor (UptimeRobot, Better Uptime, or Vercel's own) at this instead of `/` — it catches "app is up but the DB connection is broken" (rotated password, hit connection limit) that a homepage check would miss.
- ✅ `package.json` now pins `"engines": {"node": ">=20.9.0"}` so Vercel's build uses a Node version matching what this was built/tested against.

## Additional best practices — dashboard settings, not code (your call on these)

- **Vercel Deployment Protection** (Project → Settings → Deployment Protection): turn on password/SSO protection for Preview deployments. The `noindex`/`Disallow` fix above stops search engines from indexing preview URLs, but the URLs themselves are still publicly *reachable* by anyone with the link — Deployment Protection actually gates access.
- **Neon backups**: Neon keeps point-in-time restore history (window depends on your plan). Worth knowing where that setting lives in the Neon dashboard before you need it, not after.
- **Rotate `ADMIN_PASSWORD` out of Vercel's env vars after first seed, optionally**: it's only read by the one-time seed script, never at runtime — so once the admin user exists in Postgres, you can delete that env var from Vercel entirely (or leave it — it's encrypted at rest either way, this is a "reduce what's sitting around" step, not a vulnerability fix).
- **If contact-form spam becomes a real problem**: upgrade the in-memory rate limiter (flagged above) to Upstash Redis (`@upstash/ratelimit` + `@upstash/redis`, both have free tiers and a one-click Vercel integration) — not done now since it's a new account/service and the current honeypot + rate-limit combo is a reasonable starting bar.
- **Error monitoring**: no Sentry/error-tracking service is wired up. For a site this size, Vercel's own function logs (Project → Logs) are enough to start; add Sentry later if you want alerting rather than checking logs manually.

## Post-deploy checklist

- [ ] Visit the live site, confirm the homepage and a few inner pages load with real data (not empty).
- [ ] Log into `/admin`, confirm you can see seeded capabilities/case studies/etc.
- [ ] Submit a test contact form entry, confirm it appears in `/admin/leads`, then delete the test row.
- [ ] Check browser DevTools console on a few pages for CSP violations (the policy was built by grepping known external resources, but a real browser is the only way to catch something missed).
- [ ] Hit `/api/health` directly, confirm `{"status":"ok"}`.
- [ ] Check `/robots.txt` on the actual production URL — confirm it shows `Allow: /` (not `Disallow`) once `VERCEL_ENV=production` is really set; if it still shows `Disallow`, something's misconfigured.
- [ ] If a real domain is live, update `metadataBase`/canonical URLs per step 7 above.
