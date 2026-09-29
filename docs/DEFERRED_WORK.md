# Deferred Work Log

Tracks things we deliberately chose **not** to do yet — what, where, and why — so nothing gets silently forgotten. This is separate from [REQUIREMENTS_TRACKER.md](./REQUIREMENTS_TRACKER.md) (which tracks brief compliance overall): this file is specifically the "we saw it, we chose to skip it for now, here's why" log.

Legend: 🔵 = waiting on a later phase (planned) · 🟡 = waiting on a decision from you · ⚪ = minor, batch with a future content/cleanup pass. · ✅ = resolved/moved out of deferred, see note.

---

## ✅ DONE (2026-09-29): CMS integration + Contact form backend — built, not deferred anymore

You decided to build the backend immediately rather than wait for the admin phase, and to go further than the brief's own suggestion: instead of a third-party headless CMS (Sanity/Strapi/Payload, as brief §5/§11 recommends), we built a **custom PostgreSQL + Prisma backend with our own admin panel** (login + CRUD UI), covering capabilities/services/industries/case studies/insights/testimonials/client logos, plus real Lead and Newsletter capture tables and API routes. This is now **fully built and verified**, not just in progress — see `REQUIREMENTS_TRACKER.md`'s "Backend build" and "Admin panel" sections for the complete rundown (Prisma schema, seed from `lib/content.ts`, every page rewired off static data, admin auth + all 8 entities' CRUD, `/api/contact` and `/api/newsletter` with validation/spam protection, all routes verified 200).

**Still genuinely open from this area** (not resolved, tracked properly below): real Calendly/Cal.com booking integration, the newsletter signup UI component itself (backend's ready, no form on any page yet), GA4/analytics events, and a couple of smaller CMS content types (Team Member, CTA, Site Settings) that stayed hardcoded.

The two entries below are kept for historical context (why they were *originally* deferred) but are no longer waiting.

---

## ✅ (historical) Three.js — done. Deep/bespoke per-page animation pass — still open

**Where:** whole site, decided during the 2026-09-29 routes/UI sweep.
**What was skipped then:** a second, per-page bespoke animation pass, and any Three.js/WebGL hero moment.
**Three.js status:** resolved 2026-09-29 — added to the Ecosystem page only (`components/three/EcosystemOrbit.tsx`), a code-split, reduced-motion-aware orbiting node visualization of the Cordinit → Cordinit Technology/Media → 8 capabilities hierarchy. Full detail and the one thing left to manually verify (actual visual rendering in a real browser — I couldn't reach `localhost` from the built-in browser tool available in this session) is in `REQUIREMENTS_TRACKER.md`'s Three.js section.
**Still genuinely open:** the broader "richer scroll choreography beyond `<Reveal>`/`RevealOnScroll`" pass across other pages wasn't done — Three.js was the specific, concrete ask that got prioritized. If you want deeper bespoke motion elsewhere (Work grid, Insights grid, Industries grid, capability/service detail pages), that's a separate follow-up.
**Revisit:** if/when you want that broader per-page pass — not currently scheduled.

## ✅ (historical) CMS integration (Sanity/Strapi/Payload)

**Where:** brief §5, §11; currently `lib/content.ts` (1337 lines, fully static).
**What was skipped:** wiring any headless CMS; all capabilities/services/industries/case studies/insights/testimonials stay hardcoded in TypeScript.
**Why deferred:** you said routes/UI first, CMS/admin later. `lib/content.ts` was already written with a header comment noting it's shaped to swap in later without touching page templates, so this is a real "later," not a blocker right now.
**Revisit:** after the routes/UI sweep — the "admin" phase you named.

## ✅ (historical) Contact form backend + real booking

**Where:** `components/sections/ContactExperience.tsx` — form fakes success via `setTimeout`, no `/api/contact`, no email, no DB, no CRM webhook; "Book a Call" is a custom fake date/time picker, not Calendly/Cal.com as the brief prefers.
**What was skipped:** any real submission pipeline.
**Why deferred:** same routes/UI-first call, but this one also needs a decision from you before it can be built — which email/notification service (Resend? something else?), and whether Book a Call becomes a real Calendly/Cal.com embed or a custom scheduler backed by a real calendar API.
**Revisit:** admin phase. Needs your input on service choice before work starts.

## ✅ (historical) Analytics & tracking events

**Where:** brief §14.
**Status:** resolved 2026-09-29 as part of the Integrations phase — GA4 wiring (`lib/analytics.ts` + `components/analytics/GoogleAnalytics.tsx`, only loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set) plus the primary conversion-funnel events (`book_call_click`, full `contact_form_*` lifecycle, full `newsletter_*` lifecycle, `capability_view`/`service_view`/`case_study_view`/`insight_view`, `outbound_click`).
**Still genuinely open:** `resource_download`, `video_start`/`video_complete` (no feature exists yet to hang these off — no gated downloads, no video player), and the brief addendum's `solution_explore`/`industry_explore`/`accelerator_explore` (lower-value, and "accelerator" isn't a concept that exists in this project). See `REQUIREMENTS_TRACKER.md`'s Integrations phase section for full detail.

## ✅ (historical) SEO plumbing (JSON-LD, canonical URLs, per-page OG images)

**Where:** brief §13.
**Status:** resolved 2026-09-29 (Integrations phase) — Organization/BreadcrumbList/Article JSON-LD added, and every page (10 static + 5 dynamic templates) now has a proper `alternates.canonical`. Spot-checked directly in rendered HTML output, not just assumed.
**Still genuinely open:** per-page OG image overrides (still only the one global OG block sitewide) and indexable filter URLs for Work/Insights (filters are client-state only, not reflected in the URL).

## ✅ (historical) Newsletter signup — backend done, UI form still missing

**Where:** brief §9.7, §10.
**Status:** resolved 2026-09-29 — `components/ui/NewsletterForm.tsx` built and wired into the Insights page's CTA (`CTASection` got a `variant="newsletter"` prop). Verified end-to-end against Postgres.
**Still open:** only appears on the Insights page — the Footer's fixed-height "curtain reveal" layout doesn't have obvious room for a second copy of the form without restructuring it, so that placement (which brief's footer sitemap technically lists) wasn't added. Low priority since the functional requirement (a working signup somewhere) is met.

## ✅ (historical) Accessibility deep pass — largely done

**Where:** whole site.
**Status:** resolved 2026-09-29 as part of the QA & Launch phase, done *before* the deep/bespoke animation pass below rather than after (original plan said "after," but since the two real motion-sickness risks — the pinned scroll-jacking hero and Lenis — were identifiable and fixable now, doing it early meant one less thing to re-check later). Skip-link added, both real vestibular-motion risks fixed with `prefers-reduced-motion` guards, decorative cursor marked `aria-hidden`, icon buttons spot-checked (already labeled, better shape than the original audit found — several had been incidentally fixed during the earlier animation sweep too).
**Still genuinely open:** no automated tooling pass (Lighthouse/axe) — this was a source-level review, not a rendered-browser audit. Color contrast wasn't measured. If the *next* deep animation pass adds meaningfully new motion, it should get its own quick reduced-motion check rather than assuming this pass covers it forever.
**Revisit:** after the deep animation/Three.js pass, re-verify nothing new violates reduced-motion.

## 🔵 CI/CD, README — partially resolved

**Where:** brief §5, §16.
**Status (2026-09-29):** `docker-compose.yml` (local Postgres) and `.env.example` now exist, built as part of the backend work — that part of this item is done. **Still missing:** GitHub Actions CI/CD pipeline, and a `README.md` (still doesn't exist at all — no setup/architecture docs for a new developer).
**Why the rest is deferred:** CI/CD and README weren't needed to get the backend itself working locally; still pure admin-phase/documentation work.
**Revisit:** admin phase, or whenever a second developer needs to onboard (a README becomes urgent at that point).

## ⚪ Content/data fixes found during the audit (minor, not visual)

- **`lib/content.ts`**: "Brand & Creative" capability has only 3 services listed, every other capability has 4 — likely a missing 4th service (brief §8.01 lists 11 core services to pick from; e.g. "Naming & Identity" or "Brand Architecture" aren't yet a dedicated service entry).
- **`lib/content.ts`**: service slug `cro` is reused identically under both "Performance Marketing" and "Commerce & Growth" — not a routing bug (scoped by parent capability), just worth a naming pass for clarity.
- **`components/sections/EcosystemModule.tsx`** (homepage tree, not the `/ecosystem` page — that one's already correct): parent node renders the literal placeholder string "CONFIDENTIAL" instead of the real holding-company name.
- **`package.json`**: internal name is `"cordinit-hq"`, not `"cordinit-media"` — cosmetic, no functional impact.

**Why deferred:** these are small, isolated data edits, not animation or architecture work — cheapest to batch together in five minutes whenever we're next touching `lib/content.ts` for something else, rather than context-switching for each one individually now.
**Revisit:** next time `lib/content.ts` or `EcosystemModule.tsx` is open for any other reason — or sooner if you just want them fixed now, they're quick.

---

## 🟡 Production deployment (Vercel + managed Postgres)

**Where:** whole backend — until now Docker Postgres was dev-only, no production database existed.
**Status (2026-09-29):** code-side prep done — `package.json`'s `build` script now runs `prisma generate && prisma migrate deploy && next build`, `postinstall` runs `prisma generate`, `.env.example` documents needing a pooled connection string in production, and `docs/DEPLOYMENT.md` has the full step-by-step (account creation, env vars, seeding, post-deploy checklist).
**Why still open/waiting on you:** creating the actual Neon/Vercel Postgres database, setting the production env vars, and running the first deploy all need your accounts and dashboard access — none of that is something I can do from here.
**Also flagged:** `https://cordinitmedia.com` is hardcoded as the production domain in `app/layout.tsx`/sitemap/canonical URLs from the earlier SEO work — this was assumed from the brand name, not confirmed as your real registered domain. Needs your confirmation before or right after first deploy.
**Revisit:** whenever you're ready to actually deploy — `docs/DEPLOYMENT.md` has everything needed.

## How to use this file

When we consciously decide to skip or postpone something mid-task, add an entry here with **where**, **what**, **why**, and **when to revisit** — don't just let it drop out of the conversation. When an item gets picked up, move its checkbox equivalent in `REQUIREMENTS_TRACKER.md` forward and delete (or strike through) the entry here.
