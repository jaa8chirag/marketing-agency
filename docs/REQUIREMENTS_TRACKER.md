# Cordinit Media — Website Requirements Tracker

Source: `Confidential Media_Brief.pdf` (dated 06-Sep-2026), cross-checked against the codebase on 2026-09-29.

Legend: `[x]` Done · `[~]` Partial / needs work · `[ ]` Not started · `(unverified)` = structurally present but content/behavior not checked in this pass.

---

## ✅ Backend build (2026-09-29) — supersedes several items below

Built a full PostgreSQL + Prisma backend per your decision, replacing the brief's suggested third-party CMS with a custom one:
- **Infra:** `docker-compose.yml` (local Postgres on port 5434 to avoid clashing with another project's container on 5432), `.env`/`.env.example`, `prisma/schema.prisma` covering Capability/Service/ServiceApproachStep/Industry/CaseStudy/CaseStudyResult/CaseStudyCapability(join)/Insight/Testimonial/ClientLogo/Lead/NewsletterSubscriber/AdminUser.
- **Migration + seed:** `prisma/seed.ts` migrated all existing `lib/content.ts` static data into Postgres (idempotent, upsert-based). Verified: 8 capabilities, 6 industries, 6 case studies, 6 insights, 3 testimonials, 6 client logos, 1 admin user seeded successfully.
- **Data layer:** `lib/db.ts` (Prisma client singleton, `@prisma/adapter-pg` driver) + `lib/queries.ts` (async functions mirroring the exact same shapes/signatures `lib/content.ts` used to export synchronously — `getCapabilities()`, `getCapability(slug)`, `getService(capSlug, svcSlug)`, etc.). `lib/content.ts` itself is kept only for its TypeScript types + as the original seed source, no longer used for live data.
- **Rewired every page** that used to import static arrays from `lib/content.ts` to instead `await` the equivalent from `lib/queries.ts`: home, `/capabilities` (+ detail + service detail), `/industries` (+ detail), `/work` (+ detail), `/insights` (+ detail), `/ecosystem`, `/contact`, `app/sitemap.ts`. `Header` was split into an async Server Component (`Header.tsx`, fetches nav data) wrapping a new `HeaderClient.tsx` (all the existing interactive/animated behavior, now prop-driven) — every existing `<Header />` call site needed zero changes.
- **Real lead capture:** `app/api/contact/route.ts` — zod validation, honeypot field, in-memory rate limiting (5 req/10min/IP), writes to the `Lead` table including the brief's "Hidden Lead & Attribution Data" (UTM params, referrer, source path, CTA location). `ContactExperience.tsx` now actually calls this instead of `setTimeout`. Verified end-to-end via a real POST + direct Postgres query.
- **Real newsletter capture:** `app/api/newsletter/route.ts`, same validation/honeypot/rate-limit pattern, upserts into `NewsletterSubscriber`. *(UI signup form component still to be added — see below.)*
- **Fixed a real bug this surfaced:** `app/error.tsx` must be a Client Component (Next.js requirement for error boundaries) but was importing the newly-async `Header` — Client Components can't import Server Components directly, and doing so was dragging `pg`/Node's `fs` into the client bundle and 500ing *every* route. Fixed by having `error.tsx` use `HeaderClient` directly with an empty nav list.
- **Known gap surfaced by the DB move:** `Testimonial` data now exists (3 rows, seeded) but nothing in the UI actually renders testimonials anywhere — this was already true before the DB migration (dead data in `lib/content.ts`), just carried it over faithfully. Worth a small follow-up to actually surface these somewhere (SocialProof section is the obvious spot).
- **Admin panel — built and verified (2026-09-29):**
  - **Auth:** `middleware.ts` protects every `/admin/*` route (redirects to `/admin/login`), session is a signed JWT (`jose`, `HS256`) in an httpOnly cookie, password checked with `bcryptjs` against the seeded `AdminUser` row, login form uses `useFormState`/`useFormStatus` with a Server Action (`app/admin/auth-actions.ts`).
  - **Shell:** `app/admin/(dashboard)/layout.tsx` — sidebar nav + sign-out; `app/admin/(dashboard)/page.tsx` — dashboard with live row counts per content type, linking into each section.
  - **Full CRUD** (list, create, edit, delete via Server Actions, `revalidatePath` on every mutation) for: **Capabilities** (+ nested **Services**, each with its own approach steps — services are edited from within their parent capability's page), **Industries**, **Case Studies** (with a metric/label results list and a multi-select for related capabilities), **Insights** (with capability dropdown + content-type enum select), **Testimonials**, **Client Logos**.
  - **Read-only views** for **Leads** and **Newsletter Subscribers** (no edit needed — these are inbound data, not editable content).
  - Array fields (problems, deliverables, challenges, etc.) use a simple "one value per line" textarea convention; paired fields (case study results, service approach steps) use a "Field | Field" one-per-line convention — deliberately simple over building rich multi-row editors, given this is an internal single-admin tool, not a multi-user SaaS product.
  - **Verified:** every list/new/edit route across all 8 entities returns 200 with a real authenticated session (tested via a manually-signed valid session cookie plus real row IDs pulled from Postgres); full `npx tsc --noEmit` clean; the underlying bcrypt-compare and JWT sign/verify logic independently verified against the seeded admin user. The login page's own Server Action submission wasn't curl-testable (Next.js encodes Server Action calls in a way plain curl can't replicate) — **recommend manually confirming the login form works in an actual browser** before considering this fully done.
  - **Not built:** bulk import/export, content versioning/drafts, image/asset upload (all entities currently reference images by seeded external URLs, matching how the public site already sourced photography — no admin upload flow exists), audit log of who changed what (moot with a single admin user, but worth noting if a second admin is ever added).

## ✅ Integrations phase (brief §19 Phase 9) — 2026-09-29

Following the phase-by-phase order agreed (build shared foundation once, then work through the brief's own §19 milestones), completed the Integrations phase:

- **Newsletter signup UI** — `components/ui/NewsletterForm.tsx`, wired into the Insights page's closing CTA (`CTASection` got a new `variant="newsletter"` prop that swaps its buttons for a real email input). Posts to the existing `/api/newsletter`, honeypot included. Verified end-to-end (real POST → row confirmed in Postgres → cleaned up). **Not done:** a second placement in the Footer — brief's footer sitemap lists "newsletter" as a link/section, but the Footer's fixed-height "curtain reveal" layout has no easy room for a form without restructuring it; the Insights page placement covers the functional requirement for now.
- **Analytics** — `lib/analytics.ts` (`trackEvent`, pushes to `window.dataLayer`, safe no-op with no GA4 ID configured) + `components/analytics/GoogleAnalytics.tsx` (loads GA4's gtag.js only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set). Wired the primary conversion-funnel events from the brief's taxonomy: `book_call_click` (all 3 header CTA locations: announcement bar, desktop nav, mobile nav — plus the reusable `CTASection`'s Book a Call button via a new `Button` `trackAs` prop), `contact_form_view/start/submit/success/error` (full lifecycle in `ContactExperience.tsx`), `newsletter_view/start/submit/success`, `capability_view`/`service_view`/`case_study_view`/`insight_view` (via a new `<TrackView>` client shim dropped into each Server Component detail page — fires one event on mount, renders nothing), and `outbound_click` on the Footer's social links. **Not wired:** `resource_download`, `video_start`/`video_complete` (no gated-download or video-player feature exists yet to hang these off), `solution_explore`/`industry_explore`/`accelerator_explore` (secondary/lower-value events from the brief's addendum, "accelerator" doesn't correspond to any concept in this project). `Button.tsx` had to become a Client Component (`"use client"`) to support the click handler — it wasn't one before, and its `onClick` prop was previously unused/untested dead code.
- **SEO — finished the plumbing that was left partial:**
  - **JSON-LD structured data** (previously zero anywhere): sitewide `Organization` schema in `app/layout.tsx`; `BreadcrumbList` schema added directly into `PageHero.tsx` (fires automatically on every page that already passes it a `breadcrumbs` prop — no per-page work needed); `Article` schema on insight detail pages.
  - **Per-page canonical URLs** (previously only the global `metadataBase`, no actual `<link rel="canonical">` anywhere): added `alternates: { canonical: ... }` to all 10 static pages' metadata and all 5 dynamic detail templates' `generateMetadata` functions.
  - **Still not done:** per-page OG image overrides (only the one global OG block in `app/layout.tsx` exists — no entity has its own social-share image), SEO-friendly pagination/filter URLs for Work/Insights (filters are still client-state only, not reflected in the URL, so filtered views aren't independently indexable/shareable).
- All of the above verified: full `npx tsc --noEmit` clean, every route re-tested at 200, and the new JSON-LD/canonical tags spot-checked directly in the rendered HTML output (not just "should work" — actually grepped for `"@type":"Organization"`, `rel="canonical"`, etc. in real responses).

## ✅ QA & Launch phase (brief §19 Phase 10) — 2026-09-29, accessibility + security

**Accessibility** — the audit had flagged this as "thin" (zero reduced-motion handling despite heavy GSAP/Lenis/motion, no skip-link). Since then several fixes had already landed incidentally during the animation sweep (`PageHero`, `RevealOnScroll`, `CyclingWord`, `tilt-card` all gained `useReducedMotion` guards); this pass closed the remaining real gaps:
- [x] **Skip-link** — added to `HeaderClient.tsx` ("Skip to content", visually hidden until keyboard-focused), targeting a new `id="main-content"` added to every page's `<main>` (18 files, mechanical).
- [x] **The two genuine vestibular-motion risks fixed**: (1) `SmoothScroll.tsx` (Lenis) now skips initializing entirely under `prefers-reduced-motion: reduce`, falling back to native browser scroll. (2) `HomeHero.tsx`'s pinned 300vh scroll-jacking hero animation — the single strongest motion effect on the site — now detects reduced-motion and skips the pin/scrub/parallax entirely, rendering the end state directly (video + copy visible, no scroll-jacking, normal-height section) instead.
- [x] `CustomCursor.tsx` given `aria-hidden="true"` (purely decorative, was previously unmarked).
- [x] Spot-checked icon-only buttons across `HeaderClient.tsx` and `CaseStudyGallery.tsx` (mobile menu toggle, mega-menu close, announcement dismiss, gallery prev/next/close) — all already had `aria-label`s, better shape than the original audit suggested.
- [~] **Not done / lower confidence:** no automated color-contrast audit (would need a real browser + axe/Lighthouse, not available in this environment); focus indicators on text inputs use a border-color change (`focus:border-signal`) rather than a box-shadow ring — visible but not maximally robust for low-vision/color-blind users; broader `alt=`/`aria-*` coverage across less-trafficked components not re-audited line-by-line (only spot-checked the highest-traffic ones).
- **Recommend:** running a real Lighthouse/axe pass in an actual browser before launch — this pass fixed the specific issues the earlier grep-based audit could find and reason about from source, not a substitute for tooling that renders the page.

**Security (brief §15)**:
- [x] **CSP + security headers** — `next.config.mjs` now sends `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` (blocks camera/mic/geolocation) on every route. Verified live via `curl -I`. The CSP's `script-src`/`img-src`/`connect-src`/`style-src`/`font-src` allowlist was built by grepping every external URL actually referenced in the codebase (Google Fonts, GA4's gtag.js + beacon endpoints, Unsplash/Picsum/Google-hosted photography) — not guessed.
- **Honest caveat:** this is a *baseline* CSP using `'unsafe-inline'` for script-src and style-src, needed because the codebase has several inline `<script>` tags (theme-flash-prevention snippet, GA4 init, the JSON-LD blocks added this session) and Tailwind's inline styles. A fully hardened CSP would thread a per-request nonce through all of those instead — bigger change, not done here.
- [x] Already true from earlier work: server-side validation (zod) + rate limiting + honeypot on both API routes, no secrets in client-side code, `.env` gitignored.
- **Not done:** no automated CSP-violation check in a real browser (curl can confirm the header is *sent* correctly, not that the browser accepts every resource without violation — recommend checking DevTools console after this restart).

---

## 🔴 Top Critical Gaps (read this first)

- [x] ~~No CMS.~~ **Resolved 2026-09-29** — custom PostgreSQL + Prisma backend built instead of Sanity/Strapi/Payload (your decision). All content now lives in Postgres; `lib/content.ts` is types-only now. Admin CRUD UI still pending, see below.
- [x] ~~Contact form doesn't actually submit anywhere.~~ **Resolved 2026-09-29** — `app/api/contact/route.ts` validates, rate-limits, and writes real `Lead` rows. Verified end-to-end.
- [ ] **"Book a Call" isn't a real booking flow.** No Calendly/Cal.com embed — it's a custom fake date/time picker with hardcoded slots, though it now genuinely stores the picked date/time as a real `Lead` row. Brief explicitly asks for Calendly or Cal.com — still a gap if you want real calendar availability/invites rather than a manual internal follow-up.
- [x] ~~No spam protection~~ **Resolved 2026-09-29** — honeypot field + in-memory rate limiting (5 req/10min/IP) on both `/api/contact` and `/api/newsletter`. Note: rate limiter is single-instance/in-memory, fine for now, would need a shared store (Redis) behind a load balancer.
- [x] ~~No analytics at all~~ **Resolved 2026-09-29** — GA4 wiring (loads only when configured) + primary conversion-funnel events (Book a Call, contact form lifecycle, newsletter lifecycle, content views, outbound clicks). A few secondary events (resource_download, video events, solution/industry/accelerator explore) still unwired — see the Integrations phase section below for exactly which.
- [x] ~~SEO plumbing partial~~ **Resolved 2026-09-29** — JSON-LD (Organization, BreadcrumbList, Article) and per-page canonical URLs added on top of the sitemap/robots that already existed. Only per-page OG image overrides and indexable filter URLs remain open.
- [x] ~~Newsletter backend exists, UI doesn't yet~~ **Resolved 2026-09-29** — signup form built and live on the Insights page, verified end-to-end against Postgres.
- [x] ~~Accessibility is thin~~ **Largely resolved 2026-09-29** — skip-link added, the two real vestibular-motion risks (pinned scroll-jacking hero, Lenis smooth-scroll) now respect `prefers-reduced-motion`, icon buttons spot-checked and already labeled. No automated contrast/Lighthouse audit done — see the QA & Launch phase section below for exact caveats.
- [x] ~~No CI/CD, Docker, or `.env.example`~~ **Docker/env resolved**, CI/CD still missing — `docker-compose.yml` + `.env.example` exist (built during the backend phase). GitHub Actions pipeline still not set up.
- [ ] **No Three.js anywhere** — not in `package.json`, not used. You asked for it explicitly below (see Animation section).
- [ ] Ecosystem page's parent brand node literally renders the placeholder string **"CONFIDENTIAL"** instead of the real holding-company name — needs a real name before this ships.
- [ ] `lib/content.ts` capability **"Brand & Creative" has only 3 services, not 4** (missing one vs. the other 7 capabilities).
- [ ] Service slug **`cro` is duplicated** across "Performance Marketing" and "Commerce & Growth" — not a routing bug (scoped by parent capability) but worth a naming pass.
- [ ] No `README.md` at all — brief wants architecture/setup docs.

---

## 1. Project Summary — What we're building in this phase

- [~] Responsive, high-performance, SEO-ready public website — responsive: yes (Tailwind); SEO-ready: partial, see SEO section below.
- [x] Capabilities-led IA (Brand & Creative, Content & Production, Website & Digital Experiences, Digital Marketing, Media, Performance Marketing, Automation & AI, Commerce & Growth) — all 8 exist in `lib/content.ts`.
- [x] Dedicated Work/case study experience — `/work` + `/work/[slug]` exist.
- [~] Insights hub — `/insights` + `/insights/[slug]` exist; `/insights/category/[category]` from the brief's sitemap is **missing**.
- [x] Industry pages — `/industries` + `/industries/[slug]`, 6 industries defined.
- [~] Cordinit Ecosystem page — exists but parent brand name is a placeholder (see critical gaps).
- [ ] CMS-driven content relationships (one case study reusable across capability/service/industry pages) — not possible yet, no CMS.
- [ ] Lead capture + newsletter infrastructure wired to a future CRM — form has no backend; no newsletter exists.

## 2. Business & Brand Model

- [~] Cordinit → Cordinit Technology / Cordinit Media architecture shown on `/ecosystem` — structurally present (`EcosystemModule.tsx`, tree diagram to "CORDINIT MEDIA" and "CORDINIT TECH") but parent node name unset.
- [ ] "Future specialist / acquired businesses" branch — not represented in the ecosystem tree yet.
- `(unverified)` Positioning copy on homepage matches/reflects "Creative, media and digital growth company..." — hero exists (`HomeHero.tsx`) but exact copy not diffed against brief §2.2.
- `(unverified)` Site avoids reading as a generic "360° digital marketing agency" / commodity service list (brief §2.3) — subjective, needs a content read-through.

## 3. Goals (brief §3)

Mostly structural/strategic — tracked implicitly via other sections (SEO, CMS, forms, work/case studies, ecosystem). No standalone action needed beyond those.

## 4. Target Audience / Client Need → Capability Mapping

- [x] `ClientNeedMapper` component exists on the homepage and is wired into `app/page.tsx`. `(unverified)` whether its 10 mapped intents match brief §4.1 exactly.

## 5. Recommended Tech Stack

| Layer | Brief wants | Current state |
|---|---|---|
| Frontend | Next.js/React/TS | [x] Next.js 14.2.15, React 18.3.1, TypeScript — done |
| Styling | Tailwind + design tokens | [x] Tailwind present; `(unverified)` token completeness |
| CMS | Sanity/Strapi/Payload | [ ] absent entirely |
| API | REST/GraphQL | [ ] no `/api` routes at all |
| Hosting | AWS/GCP/Azure | `(unverified)` — currently deploys to Vercel per prior commits |
| CI/CD | GitHub Actions | [ ] absent, no `.github/workflows` |
| Assets | CDN + responsive images | [~] `next/image` remote patterns configured for Unsplash; no dedicated CDN |
| Containers | Docker | [ ] absent, no `Dockerfile`/`docker-compose.yml` |
| Forms | Server-side handling + validation | [ ] absent, client-only fake submit |
| Analytics | GA4 + GTM | [ ] absent |
| Email | Approved ESP | [ ] absent |

## 6. Site Structure — Information Architecture

- [x] `/`, `/capabilities`, `/capabilities/[capability]`, `/capabilities/[capability]/[service]`
- [x] `/industries`, `/industries/[slug]`
- [x] `/work`, `/work/[slug]`
- [x] `/insights`, `/insights/[slug]`
- [ ] `/insights/category/[category]` — missing
- [x] `/about`, `/ecosystem`, `/contact`, `/careers`
- [x] `/legal/privacy-policy`, `/legal/terms-of-service`
- [x] 404 (`app/not-found.tsx`), error boundary (`app/error.tsx`, acting as 500)
- [x] Primary nav: Capabilities | Industries | Work | Insights | About — confirmed in `Header.tsx`
- `(unverified)` Primary CTA labeled exactly "Start a Project" vs. current "Book a Call" wording — brief uses both terms in different sections; current code standardizes on **Book a Call** (`?intent=book-a-call`), which actually matches the *later* "Website Flow & Customer Journey" section of the brief (§1 of that addendum) more closely than the earlier IA section. Not a bug — brief is internally inconsistent about the CTA name; flag for the client to confirm final wording.
- [ ] Developer rule "no separate hardcoded Blog/Resources system" — technically satisfied (Insights is the single hub), but everything is hardcoded anyway pending CMS.

## 7. Overall Website Model / Content Relationships

- [~] Capability ↔ Service ↔ Industry ↔ Work ↔ Insights cross-links exist as static arrays in `lib/content.ts` (e.g. capability has `industries: string[]`) but this is manual duplication, not managed references — will need real relations once a CMS is in place.

## 8. Capability Architecture & Service Scope

- [x] 8 capabilities defined.
- [~] Service depth: 7 of 8 capabilities have 4 services each; **Brand & Creative has only 3** (missing a 4th, e.g. "Naming & Identity" / "Brand Architecture" per brief §8.01 service list).
- `(unverified)` Whether each service's individual copy (approach, deliverables, outcomes) matches the specific service lists in brief §8 — not diffed line-by-line.

## 9. Page-by-Page Requirements

### 9.1 Home Page
- [x] All required modules present and wired in `app/page.tsx`: Hero, Client Need→Capability (`ClientNeedMapper`), Capabilities overview (`CapabilitiesShowcase`), Operating model (`OperatingModel`), Featured work (`FeaturedWork`), Industries teaser (`IndustriesTeaser`), Social proof (`SocialProof`), Insights teaser (`InsightsTeaser`), Ecosystem module (`EcosystemModule`), Final CTA (`CTASection`), Footer.
- `(unverified)` Hero copy exact match to brief's recommended direction ("Creative. Media. Technology. Growth.").

### 9.2–9.4 Capabilities Hub / Overview / Service templates
- [x] Templates exist and render from `lib/content.ts`.
- [x] **Capabilities Hub animation pass (2026-09-29):** `CapabilitiesAccordion.tsx` — rows now stagger-in via `<Reveal>` on scroll, hover gets a signal-tint fill sweep + name slide, open panel image has a slow Ken Burns zoom (`animate-kenburns`), and the floating summary card now uses the `.border-beam` rotating-light border for brand consistency with the header mega menu.
- [ ] Capability Overview Template (`/capabilities/[capability]`) and Service Detail Template (`/capabilities/[capability]/[service]`) — not yet given the same animation pass, next up.
- [~] CMS-driven/reusable — no, static.

### 9.5 Industries
- [x] Grid + detail template exist, 6 industries seeded.

### 9.6 Work / Case Studies
- [x] Filter by capability + industry works (client-side, `WorkGrid.tsx`).
- [ ] Filter by **service** — not confirmed/implemented (brief asks for capability + service + industry).
- `(unverified)` Full case study detail flow: Client → Challenge → Objective → Strategy → Creative → Execution → Technology → Media → Results → Gallery — structure not diffed field-by-field.

### 9.7 Insights
- [x] Filter by content type + capability works (`InsightsGrid.tsx`).
- [ ] Filter by **industry** — not confirmed.
- [ ] Gated downloads with lead capture — not implemented.
- [ ] `/insights/category/[category]` route — missing.

### 9.8 About
- `(unverified)` Page exists; content coverage (story, vision/mission/values, leadership, how it connects to Cordinit, operating philosophy) not read in detail.

### 9.9 Ecosystem
- [~] See Business & Brand Model section above — structurally present, placeholder parent name, no "future businesses" slot.

### 9.10 Contact / Start a Project
- [x] All required fields present (name, work email, company, job title optional, area of interest, message, consent).
- [ ] Job title should arguably be required per brief tone — currently optional (minor).
- [ ] No real submit pipeline (validation/spam/email/DB/webhook) — see critical gaps.
- [ ] Area of interest **is** pulled from the same capability taxonomy — good, this part matches the brief.

### 9.11 Careers
- [x] `/careers` exists and is footer/utility-only (not in primary nav) — matches brief exactly.

## 10. Functional Requirements

- [x] ~~CMS-editable content~~ **Resolved 2026-09-29** — Capabilities, Services, Industries, Case Studies, Insights, Testimonials, Client Logos are all editable via `/admin` without touching code.
- [x] ~~Content relationships~~ **Resolved** — real foreign keys/join tables in Postgres (e.g. `CaseStudyCapability`) instead of static array duplication.
- [ ] Site search across Work/Insights/Capabilities/Services — still not found (client-side filters exist, full-text search doesn't).
- [~] Newsletter signup — backend exists (`app/api/newsletter/route.ts`, `NewsletterSubscriber` table, admin list view), UI signup form still not wired into any page.
- [ ] Analytics event tracking — still not found.
- [ ] Consent-aware tracking — still not found.
- [x] ~~Form validation~~ **Resolved** — `app/api/contact/route.ts` and `app/api/newsletter/route.ts` validate server-side with `zod`, on top of the existing client-side HTML5 validation.
- [x] ~~Spam protection / rate limiting~~ **Resolved** — honeypot field + in-memory rate limiter on both API routes.
- [x] Form success/error UI states exist **and are now real** — success only shows after an actual DB write succeeds; errors surface actual API failures.
- [~] Editable SEO metadata — page `<title>`/description are still hardcoded per-page in each `page.tsx` (not moved into the CMS as a per-entity SEO field yet), but the entity content itself (title, summary, etc. used to derive metadata) is now DB-editable.
- [~] Alt text on images — unchanged, still present in only a few components.
- [x] Case study filtering is dynamic (client-side, now backed by live DB data instead of a static array).
- [x] Capability/service taxonomy reused in contact form's "Area of Interest" (now sourced live from Postgres via `getAreasOfInterest()`).
- [x] ~~Multi-environment support~~ **Partially resolved** — `.env`/`.env.example` now exist with `DATABASE_URL`; true local/staging/production separation still depends on how/where this gets deployed (not yet decided).
- [x] 404 page exists (now with a glitch-effect entrance). [~] 500 handling exists via `error.tsx` (client boundary, not a dedicated styled 500 page).
- [ ] Redirect management — still not found.

## 11. CMS / Content Model

- [x] **Built 2026-09-29** — not a third-party headless CMS as the brief suggested, but a custom PostgreSQL + Prisma schema (`prisma/schema.prisma`) with an admin panel, covering every entity the brief's content model table lists except **Team Member**, **CTA**, and **Site Settings** (About page's team list, footer/nav config, and reusable CTA blocks are still hardcoded in components — smaller, lower-priority pieces of this section, not yet migrated).

## 12. Design & UX Requirements

- [~] Brand expression — premium/bold/brutalist-editorial direction is clearly present (per commit history: 3D tilt cards, kinetic footer, generative art, scramble logo) — subjectively strong, matches brief's "not a template site" ask.
- [~] Design tokens — Tailwind config + CSS variables for color exist (`app/globals.css` `:root`/`.dark`); `(unverified)` full coverage for spacing/radius/shadow tokens.
- [ ] Documented interaction states / component library docs — not found.
- [ ] Reduced-motion support — **confirmed absent**, despite GSAP/Lenis/motion being used throughout. This is a real risk against brief §15 Accessibility.
- `(unverified)` Hero video/showreel with poster fallback — `public/videos/hero-reel.mp4` exists; poster fallback not confirmed.

## 13. SEO Requirements

- [x] Server-rendered/SSG pages (Next.js App Router default).
- [x] Editable (hardcoded, not CMS) title/description on 15/17 pages.
- [ ] Editable OG title/description/image per page — only global OG in `app/layout.tsx`, no per-page overrides, no OG image set at all.
- [ ] Canonical URLs — none anywhere.
- [ ] XML sitemap — none.
- [ ] robots.txt — none.
- `(unverified)` Semantic HTML / heading hierarchy — not audited.
- [ ] Breadcrumbs — not found.
- [ ] JSON-LD (Organization, Article, BreadcrumbList, etc.) — **zero** structured data anywhere.
- [x] Clean URL structure (matches brief's IA).
- `(unverified)` Internal linking density between capability/service/industry/work/insight pages.
- [ ] SEO-friendly pagination/filter strategy — filters are client-side only (no crawlable URLs/query params), which is a soft SEO gap for `/work` and `/insights`.
- [ ] Redirect support for changed slugs — not found.

## 14. Analytics & Conversion Tracking

- [ ] None of the 11 required events implemented: `start_project_click`, `contact_form_start`, `contact_form_submit`, `newsletter_signup`, `case_study_view`, `service_view`, `capability_view`, `insight_view`, `resource_download`, `video_start`/`video_complete`, `outbound_click`.
- [ ] No GA4/GTM script loaded at all.

## 15. Non-Functional Requirements

**Performance**
- `(unverified)` Core Web Vitals / Lighthouse — not measured in this pass.
- [~] CDN for images — via `next/image` + remote Unsplash, no dedicated CDN.
- [ ] Lazy loading strategy below the fold — `(unverified)`, likely partial via `next/image` defaults only.

**Accessibility**
- [~] Sparse `aria-*` (17 hits / 7 files) and `alt=` (7 hits / 4 files) coverage — most interactive components have none.
- [ ] Reduced-motion support — absent.
- [ ] Skip-link — absent.
- `(unverified)` Keyboard navigation / focus-visible styling — no explicit focus-visible rules found via grep, needs a manual pass.
- **Risk:** brief requires WCAG 2.1 AA minimum — current state would very likely fail an audit today given the above.

**Responsive** — `(unverified)`, Tailwind responsive classes used throughout per earlier work, but no real-device test log exists.

**Security**
- `(unverified)` HTTPS (host-level, N/A locally).
- [ ] Input sanitization/validation — no server layer exists to sanitize.
- [ ] Rate limiting — absent.
- [ ] CSP headers — not found in `next.config.mjs`.
- [x] No secrets in client code (nothing to leak yet — no API keys used).
- [ ] Env vars / secrets manager — no `.env.example` even as a template.
- `(unverified)` CMS/admin auth — N/A, no CMS yet.

## 16. Recommended Repository Structure

- [~] Partial match: has `/app`, `/components` (brief's `/app/components`, close enough), `/public`. Missing: `/lib` exists (good, extra), but no `/cms`, `/tests`, `/docs` (now being created), `.env.example`, `docker-compose.yml`, `README.md`.
- Two stray unrelated folders exist at repo root — `monochrome_editorial_studio/` and `sculptural_modern_industrial_design_audio_device_matte_black_finish_with/` — worth confirming with you whether these are leftover scaffolding that can be deleted.

## 17. Forward Compatibility

- [ ] API-first architecture — no API layer exists yet to be "first" about.
- `(unverified)` Lead schema designed for future CRM — no lead schema exists since there's no backend.
- [ ] Auth architecture for future client portal — not started.
- [x] Design system is componentized (Tailwind + reusable components), reasonably reusable already.
- [ ] Stable analytics event naming — moot until analytics exists.

## 18–21. Competitor reference, Deliverables/Milestones, Definition of Done, One-Page Model

- Reference/strategic sections — no code action, just context. The "Definition of Done" checklist in brief §20 is effectively a rollup of everything above (CMS-editable content, WCAG AA, Lighthouse ≥90, analytics, SEO metadata, forms, no console errors, cross-browser, docs, no secrets, redirects) — **currently far from met**, primarily blocked on CMS + backend + analytics + accessibility + SEO plumbing.

## Book a Call / Contact Flow Addendum (brief's later section)

- [x] `?intent=book-a-call` deep link works and pre-selects the booking mode in `ContactExperience.tsx`.
- [ ] Real scheduling integration (Calendly or Cal.com, per brief's stated preference) — currently a fully custom fake picker with hardcoded time slots, no real calendar, no confirmation email, no ICS/calendar invite.
- [ ] Hidden lead & attribution data (UTM source/medium/campaign, referrer, landing page, CTA location, solution/service/industry context) — not captured anywhere, since there's no backend to store it.
- [x] Confirmation UI states exist for both general enquiry and booked-call paths (text matches brief's suggested copy reasonably closely) — but they're cosmetic only, nothing is actually sent/stored.
- [ ] Tracking events for this flow (`book_call_click`, `contact_form_view/start/submit/success/error`, `newsletter_*`) — none implemented.

---

## Animation & Interaction — Progress Log

- [x] **2026-09-29 — `PageHero.tsx` global upgrade.** This component renders the top hero on nearly every inner page (`/capabilities`, `/capabilities/[capability]`, `/capabilities/[capability]/[service]`, `/industries`, `/industries/[slug]`, `/work`, `/work/[slug]`, `/insights`, `/insights/[slug]`, `/about`, `/contact`, `/careers`, legal pages). Converted to a client component with a staggered blur/rise-in entrance (breadcrumb → eyebrow → title → description, via `motion/react`), a clip-path wipe-reveal on the hero visual, and the hero image now sits inside the `.border-beam` rotating-light border instead of a flat line. Respects `useReducedMotion`. **This one change upgrades the hero on essentially every route at once.**
- [x] **2026-09-29 — Capabilities Hub (`CapabilitiesAccordion.tsx`).** Rows stagger in via `<Reveal>` on scroll, hover gets a signal-tint fill sweep, open panel image has a slow Ken Burns zoom (new `.animate-kenburns` utility in `globals.css`), floating summary card uses `.border-beam`.
- [ ] Capability Overview Template body sections — already use `<Reveal>` for scroll stagger (pre-existing, confirmed working), not yet touched further.
- [ ] Service Detail Template — not yet audited.
- [x] **2026-09-29 — `GenerativeArt.tsx` upgraded with reusable `groupHover` prop**: grayscale→color reveal + diagonal light sweep, opt-in so existing usages (PageHero, CapabilitiesAccordion) are unaffected. This is now the site's one shared "signature" image-hover language.
- [x] **2026-09-29 — `CaseStudyCard.tsx`** (used on Work hub + capability pages' "Featured work"): now uses `groupHover` on its thumbnail, border tints signal-green + soft shadow on hover instead of a flat `hover:border-ink`.
- [x] **2026-09-29 — `WorkGrid.tsx`**: filter changes now animate with `AnimatePresence`/`layout` (cards fade+scale in/out instead of snapping), initial stagger on mount.
- [x] **2026-09-29 — `InsightCard.tsx`**: thumbnail switched to the same `groupHover` reveal (was a plain `scale-105`); it already had a strong `RevealOnScroll` entrance + hover-lift, that's untouched.
- [x] **2026-09-29 — `/industries` grid**: cards were text-only before; now each reveals its `GenerativeArt` seeded photo as a grayscale background on hover (fading up from 0→100% opacity, ink overlay darkens), giving the page the same visual-storytelling weight as Work/Insights instead of being the flattest page on the site.
- [ ] Insights grid filter transitions (`InsightsGrid.tsx`) — relies on `InsightCard`'s own `RevealOnScroll`, not yet given the explicit `AnimatePresence` treatment `WorkGrid` got; lower priority since `RevealOnScroll` already re-fires per card on re-filter.
- [x] **2026-09-29 — About page**: leadership cards were bare text boxes — added a large ghost index number, signal-color hover, and an animated underline-reveal. The "Part of Cordinit" callout now uses `.border-beam`.
- [x] **2026-09-29 — Ecosystem page (`app/ecosystem/page.tsx`)**: the 8-capability grid at the bottom had no links and no hover state at all (dead-end boxes) — now each links to its `/capabilities/[slug]` page with a hover invert + underline-reveal, matching the rest of the site's interaction language. **Correction to an earlier note**: this page already correctly says "Cordinit" everywhere — the "CONFIDENTIAL" placeholder-name issue flagged earlier is specific to the *homepage's* `EcosystemModule.tsx` tree diagram, not this route.
- [x] **2026-09-29 — Careers page**: role rows were static, non-interactive text — now link to `/contact` with a hover fill-sweep, title slide, and arrow reveal (no dedicated application flow exists yet, so this routes into the general enquiry funnel for now).
- [x] **2026-09-29 — Contact page (`ContactExperience.tsx`)**: this was the flattest interaction on the whole site given it's the money page — step transitions (form → schedule → success) had zero animation, hard-cutting between states. Added: `AnimatePresence` cross-fade/slide between all three steps, a shared-layout sliding pill behind the Book-a-Call/General-Enquiry tab switch (`layoutId`), a spring pop-in on the success icon, and the success panel now sits in `.border-beam`. **Note: this is animation-only — the functional gap (form doesn't actually submit anywhere) tracked above is untouched and still needs backend work.**
- [x] **2026-09-29 — Service Detail Template (`/capabilities/[capability]/[service]`)**: Deliverables grid cells were static — added stagger `<Reveal>`, hover invert, and a left-edge signal accent bar per cell.
- [x] **2026-09-29 — Case Study detail (`/work/[slug]`) and Insight detail (`/insights/[slug]`)**: both have bespoke heroes (not `PageHero`) that had zero entrance animation — added staggered `<Reveal>` on breadcrumb → badges → title/summary → stat blocks, matching the rise-in language used everywhere else now.
- [x] **2026-09-29 — 404 / 500 pages**: added staggered `<Reveal>` entrance and a new `.glitch-404` RGB-split flicker effect (green/red channel offset, CSS-only `@keyframes`) on the big "404"/"500" numerals — these were completely static before.
- [~] Legal pages (`/legal/privacy-policy`, `/legal/terms-of-service`) — checked, load fine, left untouched (plain legal text; animation would be inappropriate there).

### Route-by-route animation sweep: status
Every route in the brief's sitemap (§6) has now been passed over at least once for entrance/hover/flow animation, verified compiling + type-checking clean (`npx tsc --noEmit`) and returning HTTP 200 after each change:
`/`, `/capabilities`, `/capabilities/[capability]`, `/capabilities/[capability]/[service]`, `/industries`, `/industries/[slug]`, `/work`, `/work/[slug]`, `/insights`, `/insights/[slug]`, `/about`, `/ecosystem`, `/contact`, `/careers`, `/legal/*`, 404, 500.
Not yet done: a second, deeper pass per page (e.g. Industries detail template body sections, richer Three.js/WebGL moments) — this first pass focused on bringing every route up to a consistent baseline (PageHero entrance + signature image hover + no dead static blocks) rather than a bespoke showcase treatment per page. Revisit after the group reviews this baseline.

## Animation & Interaction — your explicit request + brief's "High Creative Expectation" note

The brief's design note (final page) explicitly demands **"advanced web interactions and emerging technologies... should feel like a showcase of Cordinit Media's own work."** You separately asked for GSAP, scroll-driven animation, and **Three.js** to be used more broadly across cards/hovers/everything.

Current state:
- [x] GSAP installed and used (hero, header logo scramble, scroll reveals per `.reveal` utility class).
- [x] Lenis smooth-scroll installed and wired.
- [x] `motion` (Framer Motion) used for the tilt-card/glare interaction system (`components/spectrumui/tilt-card.tsx`).
- [ ] **Three.js / react-three-fiber — not installed anywhere.** If you want real 3D (not just CSS 3D transforms like the current tilt cards), this needs to be added as a new dependency and is a genuinely new build, not a tweak.
- [~] Card/hover animation coverage is inconsistent — some components (capability mega-menu cards, tilt cards) have rich hover treatment (just upgraded this session: grayscale→color reveal, light sweep, border-beam); many other cards across Work/Insights/Industries grids likely still use plain/basic hover states and haven't been audited or upgraded yet.
- [ ] No scroll-triggered (`ScrollTrigger`) choreography confirmed beyond the homepage hero and generic `.reveal` fade-up — most inner pages (`/work`, `/insights`, `/industries`, capability/service detail templates) haven't been checked for scroll animation coverage.

**Suggested next pass (pending your confirmation):** audit every grid/card component (`WorkGrid`, `InsightsGrid`, `IndustriesTeaser`/`/industries` grid, capability/service detail pages) one at a time and bring hover/scroll motion up to the same bar as the Capabilities mega menu we just built, then decide together whether Three.js is worth adding for a specific hero/showcase moment (it's a real performance/complexity tradeoff, not a drop-in).

## ✅ Three.js — added 2026-09-29, on the Ecosystem page

Installed `three`, `@react-three/fiber@8`, `@react-three/drei@9` (React 18-compatible versions — fiber v9 requires React 19, which this project isn't on).

**Where and why:** the Ecosystem page (`app/ecosystem/page.tsx`), specifically because it's the one page whose actual content is a network — Cordinit → Cordinit Technology / Cordinit Media → eight capabilities — so a 3D orbit visualization illustrates the real hierarchy instead of being decoration dropped onto an unrelated page. No other page got a Three.js treatment; the brief's "showcase of our own work" note is about creative quality, not "put WebGL everywhere."

**What it does:** `components/three/EcosystemOrbit.tsx` renders a central "Cordinit" sphere, an orbiting "Cordinit Technology" node, and an orbiting "Cordinit Media" node that itself has a second, faster-rotating orbit of 8 small capability satellites nested inside it (parent/child orbits mirror the parent/child brand relationship). Labels use `drei`'s `<Html>` so they're real crisp DOM text over the 3D scene, not baked 3D geometry. `OrbitControls` lets a visitor drag to look around (zoom/pan disabled to avoid disorientation), with a slow auto-rotate when idle.

**Engineering choices made deliberately, not left to chance:**
- **Code-split, not global cost:** loaded via `next/dynamic(..., { ssr: false })` in `components/three/EcosystemOrbitLoader.tsx` — verified in the dev server log that `/ecosystem` alone jumped from ~790 modules to 2626 on first compile, while every other route's module count stayed the same. The Three.js/fiber/drei bundle genuinely only loads on this one page.
- **Reduced-motion respected:** a continuously auto-rotating 3D scene is exactly the kind of effect `prefers-reduced-motion` exists to skip. `EcosystemOrbitLoader` checks the media query before ever loading the WebGL bundle and swaps in a static text badge instead when it's set — this doesn't just pause the animation, it avoids shipping the JS at all in that case.
- **Not the only source of the information:** every label in the 3D scene (Cordinit, Cordinit Technology, Cordinit Media, all 8 capability names) is also present as ordinary crawlable, accessible text in the section immediately below it on the same page — WebGL canvases aren't accessible to screen readers or indexable by search engines, so the 3D view is explicitly a supplementary visual, never the only place the content exists.

**Verification — and an honest limit on it:** `npx tsc --noEmit` clean (meaningful here specifically because `@react-three/fiber`/`drei` ship full TypeScript JSX-intrinsic definitions, so this actually validated prop names/types for every Three.js element used, not just generic JS syntax). Dev server compiles the route with no errors, and `/ecosystem` returns 200 repeatedly. **What I could not verify myself:** actual visual rendering — camera framing, whether the orbit radii/label placement look right, whether OrbitControls feels good to drag, whether the reduced-motion fallback triggers correctly. The built-in browser tool available in this session cannot reach `localhost` servers I start myself (it runs in a separate environment from my shell), so this needs a manual look in your own browser at `/ecosystem` before calling it done.

---

## How to use this file

Update a line's `[ ]` → `[x]` (or `[~]`) as work lands. When a new requirement or discrepancy is discovered mid-build, add it under the relevant numbered section rather than creating a new file, so this stays the single source of truth.
