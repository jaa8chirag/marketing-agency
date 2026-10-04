# Deferred Work Log

Tracks things we deliberately chose **not** to do yet — what, where, and why — so nothing gets silently forgotten. This is separate from [REQUIREMENTS_TRACKER.md](./REQUIREMENTS_TRACKER.md) (which tracks brief compliance overall): this file is specifically the "we saw it, we chose to skip it for now, here's why" log.

Legend: 🔵 = waiting on a later phase (planned) · 🟡 = waiting on a decision from you · ⚪ = minor, batch with a future content/cleanup pass. · ✅ = resolved/moved out of deferred, see note.

---

## ✅ DONE (2026-10-04): Brief/workbook completion pass

Full detail is in `REQUIREMENTS_TRACKER.md` (top section). Resolved from the lists below: per-entity SEO fields, README, CI (type-check only), redirect management, `/insights/category/[category]`, industry filter on Insights, service filter on Work, site search, the "Brand & Creative has only 3 services" fix, the ecosystem placeholder name, and the full ~102-service taxonomy.

**Production not updated yet.** Two new migrations (`add_entity_seo_fields`, `add_case_study_services`) are applied locally only. Deploying runs them via `npm run build` (`prisma migrate deploy`); then run `npm run db:seed-services` once against production (create-only, safe).

**Still open (deliberately):**
- 🟡 Gated downloads + `resource_download` — needs real files and a storage decision.
- 🟡 Real image uploads — still URL fields.
- 🟡 `Solutions` link in the CMS-driven mega-menu (one line in `/admin/settings`).
- ⚪ Copy review of the 70 template-framed services before launch.
- ⚪ ESLint setup, automated tests, Lighthouse/axe + real-device pass.

---

## ✅ DONE (2026-09-29): CMS integration + Contact form backend — built, not deferred anymore

You decided to build the backend immediately rather than wait for the admin phase, and to go further than the brief's own suggestion: instead of a third-party headless CMS (Sanity/Strapi/Payload, as brief §5/§11 recommends), we built a **custom PostgreSQL + Prisma backend with our own admin panel** (login + CRUD UI), covering capabilities/services/industries/case studies/insights/testimonials/client logos, plus real Lead and Newsletter capture tables and API routes. This is now **fully built and verified**, not just in progress — see `REQUIREMENTS_TRACKER.md`'s "Backend build" and "Admin panel" sections for the complete rundown (Prisma schema, seed from `lib/content.ts`, every page rewired off static data, admin auth + all 8 entities' CRUD, `/api/contact` and `/api/newsletter` with validation/spam protection, all routes verified 200).

**Still genuinely open from this area:** nothing — Team Member and CTA (the two smaller content types that stayed hardcoded here) are now also resolved, see the entry below. (Real Calendly/Cal.com booking, the newsletter signup UI, GA4/analytics events, and Site Settings/Header/Footer have since all been resolved too — see their own entries below/in `REQUIREMENTS_TRACKER.md`.)

The two entries below are kept for historical context (why they were *originally* deferred) but are no longer waiting.

---

## ✅ DONE (2026-09-29): Site Settings (Header/Footer CMS-driven)

**Where:** `prisma/schema.prisma` (`SiteSettings` model), `lib/queries.ts` (`getSiteSettings()`), `app/admin/(dashboard)/settings/` (admin page + `actions.ts`), `components/admin/SiteSettingsForm.tsx`, `components/layout/Header.tsx`/`HeaderClient.tsx`, `components/layout/Footer.tsx`/`FooterClient.tsx` (new, split off from the old single-file `Footer.tsx`), `app/layout.tsx`, `components/analytics/GoogleAnalytics.tsx`.

**What was built:** a singleton `SiteSettings` row (`id: "singleton"`, upserted, never a second row) holding primary/footer nav links, the primary CTA label/href, the announcement bar text/link, LinkedIn/Instagram/YouTube/X, contact email/phone, footer copyright lines, and a GA4 measurement ID override. Nav-link fields are stored as `"Label | /href"` per line (same textarea convention already used for `problems`/`deliverables` elsewhere) and parsed by `parseNavLinks()` in `lib/queries.ts`. Header and Footer were split into async Server Component wrappers (`Header.tsx`, `Footer.tsx`) that fetch settings + hand off to client components (`HeaderClient.tsx`, `FooterClient.tsx`) — same pattern Header already used for `navCapabilities`. `app/error.tsx` (a required Client Component) renders `HeaderClient`/`FooterClient` directly with no `siteSettings` prop, which falls back to the same hardcoded defaults that used to live in the components — a crash screen doesn't need to hit the DB. `app/layout.tsx`'s Organization JSON-LD `sameAs` and the GA4 script now also read from this row.

**Why now:** you audited the brief's §11 CMS Content Model table yourself and flagged that Header/Footer/nav/social/copyright were still hardcoded, not CMS-driven like the brief's content model implies — this was the piece you picked to fix first (of Site Settings / per-entity SEO / Team Member / Testimonial display / CTA blocks / image uploads / missing tracking events, all flagged in the same audit).

**Seed status:** resolved — production (Neon) has since been migrated and seeded with this row too (2026-09-29, same day). Header/Footer/GA/JSON-LD are all live off real DB data in production now, not just locally.

**Still open from the same audit:** per-entity SEO fields and real image uploads. (Team Member, Testimonial display, CTA reusable block, and the missing tracking events are now also resolved — see the entries below.)

---

## ✅ DONE (2026-09-29): Team Member, CTA Block, and real Testimonial display

**Where:** `prisma/schema.prisma` (`TeamMember`, `CtaBlock` models, `photoUrl` added to `Testimonial`), `lib/queries.ts` (`getTeamMembers()`, `getCtaBlock(key)`, `getTestimonials()` extended), `app/admin/(dashboard)/team/` + `app/admin/(dashboard)/cta-blocks/` (full CRUD, same pattern as every other entity), `components/admin/TeamMemberForm.tsx` + `CtaBlockForm.tsx`, `components/ui/CTASection.tsx` (now an async Server Component, takes an optional `ctaKey` prop), `components/sections/TestimonialsSection.tsx` (new), `app/about/page.tsx`, `app/page.tsx`, `app/work/page.tsx`.

**What was built:**
- **Team Member:** real entity + admin CRUD, replacing About page's hardcoded role-only array (`{ name: "Founding Partner", role: "..." }`, no actual person). Seeded 4 real-feeling people (name, role, short bio, LinkedIn, Unsplash stock photo). About page's Leadership grid now shows a photo (grayscale-to-color hover, matches the capability mega-menu card treatment), name, role, bio, and a LinkedIn link when set.
- **CtaBlock:** a small reusable-CTA library looked up by `key` in code. Most `<CTASection>` call sites interpolate page-specific copy into the title (e.g. a capability or industry name) and were deliberately left code-driven — only the two call sites using the fully generic default copy (Home, About) were wired to `ctaKey="default"`. `CTASection` falls back to its existing hardcoded props if the key has no row, so nothing breaks if a block is ever deleted.
- **Testimonial display:** the `Testimonial` table existed since the original backend build but nothing ever rendered it — a genuinely dead CMS entity. Built `TestimonialsSection` (quote-card grid with photo/name/role/company) and added it to the Home and Work pages. Added an optional `photoUrl` column since the existing rows only had quote/person/role/company.

**Seed status:** seeded and verified on both local Docker Postgres and production (Neon) the same session. **One thing to know:** `/about` is statically generated (SSG) — the very first production deploy after this migration ran its build *before* the production seed command finished, so that build's static HTML baked in the "Team details coming soon" empty-state fallback. Needs one more redeploy (no code change, just a fresh build) to pick up the now-seeded team rows; this isn't a bug, just SSG timing on that one deploy.

**Still open from the same audit:** per-entity SEO fields and real image uploads. (`insight_read`/`solution_explore`/`industry_explore` tracking events are now also resolved — see the entry below.)

---

## ✅ DONE (2026-09-30): Missing tracking events, capability long-form content, reveal-from-above

**Where:** `lib/analytics.ts`, `components/analytics/TrackedLink.tsx` (new), `components/analytics/ReadTracker.tsx` (new), `components/sections/IndustriesTeaser.tsx`, `components/sections/CapabilitiesShowcase.tsx`, `components/sections/CapabilitiesAccordion.tsx`, `app/industries/page.tsx`, `app/insights/[slug]/page.tsx`, `app/globals.css`, `prisma/schema.prisma` (`Capability.overview`), `lib/content.ts`, `lib/queries.ts`, `prisma/seed.ts`, `components/admin/CapabilityForm.tsx`, `app/capabilities/[capability]/page.tsx`.

**What was built:**
- **Tracking events:** the last three missing from the brief's addendum event list. `solution_explore` fires when a capability card is clicked (homepage showcase, `/capabilities` accordion) — distinct from `capability_view`, which fires on landing on the detail page. `industry_explore` fires the same way for industry cards (homepage teaser, `/industries` listing) via a new `TrackedLink` component (a thin client wrapper around `next/link` that fires a tracked click event — needed because the `/industries` listing page is a Server Component and can't attach an inline `onClick` itself). `insight_read` fires via a new `ReadTracker` component (`IntersectionObserver` on a marker at the end of the article body) once a reader has actually scrolled to the end — not just landed on the page like `insight_view` does. `accelerator_explore` from the same brief list is still intentionally skipped (no "accelerator" concept in this project).
- **Capability long-form content:** you asked for each capability page to carry real, substantial content (your words: "1000 words tak ka kuch data") instead of just the existing bullet lists. Added a new `overview: String[]` field to the `Capability` model — 4-6 real paragraphs per capability (roughly 600-950 words each, written specifically for that capability's actual services, not generic filler), admin-editable at `/admin/capabilities`, rendered in a new "Overview" section right after the page hero on `/capabilities/[capability]`.
- **Reveal-from-above:** you flagged that scroll-triggered content was rising up from below and asked for it to come from above instead. Changed the sitewide `.reveal` CSS animation (`app/globals.css`) from `translateY(24px) → 0` to `translateY(-24px) → 0` — a one-line change that affects every `<Reveal>` usage across the entire site at once, not just capability pages.

**Seed status:** seeded and verified on local Docker Postgres. **Not yet applied to production** — migration not yet run against Neon, seed not yet run against production. This entire batch of work was done locally only, per your instruction not to push/deploy yet.

**Still open from the original audit:** per-entity SEO fields and real image uploads (see below — real image *fields* for existing entities are now resolved; real image *uploads*, i.e. a file picker instead of pasting a URL, is still open).

---

## ✅ DONE (2026-09-30): CSP dev-mode bug fix + image fields for Industry and Client Logo

**Where:** `next.config.mjs`, `prisma/schema.prisma` (`Industry.imageUrl`, `ClientLogo.logoUrl`), `lib/content.ts`, `lib/queries.ts`, `prisma/seed.ts`, `components/admin/IndustryForm.tsx`, `components/admin/ClientLogoForm.tsx`, `app/admin/(dashboard)/industries/actions.ts`, `app/admin/(dashboard)/client-logos/actions.ts`, `components/sections/IndustriesTeaser.tsx`, `components/ui/Marquee.tsx`, `components/sections/SocialProof.tsx`.

**CSP dev-mode bug (found and fixed):** the CSP added earlier for Cal.com (`script-src ... https://app.cal.com`) didn't include `'unsafe-eval'`, which Next.js's dev-mode Fast Refresh/HMR runtime needs internally. Every page in `next dev` was throwing `Uncaught EvalError` on load, silently killing all client-side JS — `<Reveal>` sections never got their visible class added (so most of the site looked empty), while plain HTML elements like a background `<video>` kept working since they don't depend on JS. **Never affected production** (`next build` doesn't use eval-based HMR), which is why the live Vercel site was fine the whole time this was broken locally. Fixed by adding `'unsafe-eval'` to `script-src` only when `NODE_ENV === "development"`.

**Image fields audit:** you asked for an admin image option everywhere the live site actually shows a real photograph (not the procedural `GenerativeArt` pattern used deliberately for capability/case-study cards — that's a design choice, not a missing image). Two real gaps found and fixed:
- **Industry image** (homepage industries teaser, `IndustriesTeaser.tsx`) — was a hardcoded `Record<slug, url>` map in the component itself. Added `Industry.imageUrl`, admin-editable at `/admin/industries`, seeded with the same 6 URLs that were already hardcoded (zero visual change), with the old hardcoded map kept only as a fallback if a row's image is ever unset.
- **Client Logo** — genuinely had no image at all: `Marquee.tsx` rendered client names as text next to a `GenerativeArt` pattern, not a real logo. Added `ClientLogo.logoUrl`, admin-editable at `/admin/client-logos`. Left unseeded/empty for the current 6 fictional demo clients (Solace Wellness, Northbound Bank, etc.) since there's no real logo to fetch for a company that doesn't exist — `Marquee` shows the real `<img>` when a logo URL is set, falls back to the same generated-pattern treatment otherwise.
- **Explicitly not touched:** `SocialProof.tsx`'s video-testimonial carousel (`clientVideos`) and `FeaturedWork.tsx`'s three bespoke project cards (phone fan-out, car stunt, sticker graphics) — these are one-off, hand-designed creative compositions built around specific images as raw material, not generic CMS content tied to a real entity, so a generic "image field" doesn't fit them the way it does Industry/Client Logo. `TeamMember.photoUrl` and `Testimonial.photoUrl` were already covered in the entry above.

**Still open:** real image *uploads* (a file picker with something like Vercel Blob storage, instead of pasting a URL) — every image field across the whole project (Team, Testimonial, Industry, Client Logo, Site Settings) currently takes a plain URL string, which is fine for now but needs a real client's own account/decision before it's the actual intended workflow. Per-entity SEO fields are also still open.

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

## ✅ (historical) Contact form backend + real booking — now fully resolved

**Where:** `components/sections/ContactExperience.tsx` — form used to fake success via `setTimeout`, no `/api/contact`, no email, no DB, no CRM webhook; "Book a Call" was a custom fake date/time picker.
**Status:** the submission pipeline itself was resolved earlier (real `/api/contact` + Postgres). The two things that were *specifically* still fake — real scheduling and real emails — are now also resolved (2026-09-29), once you picked Cal.com + Resend:
- **Cal.com** replaces the fake picker entirely (`components/ui/CalEmbed.tsx`), prefilled from the qualification form, backed by a signature-verified webhook (`app/api/cal-webhook/route.ts`) as a server-side reliability backstop.
- **Resend** sends real confirmation + internal notification emails (`lib/email.ts`), wired into `/api/contact` for both the enquiry and booking paths.
- Both fail gracefully (not silently, logged) when not configured, so nothing breaks before real credentials exist.
**What's still needed:** real Cal.com/Resend accounts under the client's own name, not yours — tracked in the new `docs/CLIENT_HANDOFF.md`, which is exactly the file to check before this goes fully live.
**Revisit:** whenever the client's own Cal.com/Resend accounts are ready — see `docs/CLIENT_HANDOFF.md`.

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
