# Client Handoff — Accounts & Credentials to Replace Later

Things currently set up with **your own** (developer's) accounts/emails as temporary placeholders so the project could be built and tested now, that should eventually move to **the client's own** accounts before real launch. Nothing here is urgent to fix immediately — just don't forget to swap these before this goes fully live for the client.

Legend: 🟡 = using your own account/value right now, needs replacing · 🔴 = not set up at all yet, needs a decision either way.

---

## 🟡 Cal.com (Book a Call scheduling) — ✅ configured and live-tested (2026-09-29)

**Status:** fully wired and verified — real Cal.com embed replaces the old fake picker, signed webhook confirmed working (test booking successfully created a `Lead` row with matching `calBookingUid`), tested both locally and against the flow end-to-end.
**What's temporary (yours, not the client's):**
- Cal.com account under username `chirag-choudhary-rpubom`, using its default **"30 min meeting"** event type (no dedicated "Book a Call" event was created — the default 30-min slot was used as-is).
- `NEXT_PUBLIC_CAL_LINK` is set to `chirag-choudhary-rpubom/30min` in both Vercel and local `.env`.
- A webhook is configured in this Cal.com account (Settings → Developer → Webhooks) pointing at `https://marketing-agency-eight-black.vercel.app/api/cal-webhook`, trigger "Booking created" (a few extra default triggers are also selected — harmless, the webhook code only acts on `BOOKING_CREATED` and silently acknowledges everything else).
- The actual `CAL_WEBHOOK_SECRET` value is **not written here** — it's set in Vercel's Environment Variables (Production) and in the local `.env` (gitignored, never committed). Check either of those directly, not this file, if you need the value again.
**What to get from the client eventually:**
- Their own Cal.com account (free plan is fine) — meetings should land on *their* calendar, not yours.
- A real event named something like "Book a Call" (30 min is a reasonable duration to keep) instead of the default "30 min meeting."
- Swap `NEXT_PUBLIC_CAL_LINK` to their event slug, and re-create the webhook (Booking Created trigger) pointing at the same `/api/cal-webhook` URL under their account, with a fresh `CAL_WEBHOOK_SECRET`.
- Which calendar (Google/Outlook) they want bookings to sync to — configured inside their own Cal.com account, not our code.

## 🟡 Resend (transactional email — confirmations + internal notifications) — ✅ configured and live-tested (2026-09-29)

**Status:** wired and verified. Internal "new lead" notification emails confirmed actually arriving (tested with a real submission). Visitor-facing confirmation emails are **correctly blocked right now** — this isn't a bug, see below.
**What's temporary (yours, not the client's):**
- Resend account under `chiragjaa888@gmail.com` (no domain verified yet) — the `RESEND_API_KEY` value itself is **not written here**, only in Vercel's env vars and local `.env` (gitignored).
- `NOTIFICATION_EMAIL` is set to `chiragjaa888@gmail.com` — internal "new lead" alerts land there.
- `RESEND_FROM_EMAIL` is intentionally **not set at all** (Vercel won't save an empty value for it — just don't create the key) so the code's fallback (`onboarding@resend.dev`) is used.
- **Known real limitation, not a bug:** Resend's free/unverified-domain mode only allows sending **to the account owner's own email** (`chiragjaa888@gmail.com`). Confirmation emails to actual site visitors (any other address) will fail until a domain is verified — confirmed by testing (a fake test address was correctly rejected by Resend with exactly this message). The failure is handled gracefully (logged, doesn't break the form submission), but real visitors won't receive confirmation emails yet.
**What to get from the client eventually:**
- A Resend account (free tier: 3,000 emails/month) — ideally under the client's own organization, not a personal account, since this handles real customer data.
- **Domain verification**: the client needs to add a few DNS records (Resend provides these) for their real domain (e.g. `cordinitmedia.com`, once confirmed — see the open item below) so outgoing mail reads as `hello@cordinitmedia.com` instead of `onboarding@resend.dev`, **and** so confirmation emails can actually reach real visitors instead of only the account owner.
- The real email address internal lead notifications should go to — might be a shared inbox like `leads@cordinitmedia.com` instead of one person's Gmail.

## 🔴 Real production domain — still unconfirmed

**Status:** `https://cordinitmedia.com` is hardcoded in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and every page's canonical URL — this was **assumed from the brand name**, never confirmed as the client's actual registered domain. Currently the live site is actually reachable at `marketing-agency-eight-black.vercel.app`.
**Needed:** the client's real domain (if they own one already) or a decision to register one, then a Vercel domain connection + a quick find-and-replace across the ~17 places above.

## 🟡 Admin panel login

**What's temporary:** `ADMIN_EMAIL`/`ADMIN_PASSWORD` currently set to a placeholder combo generated during setup, not the client's own credentials.
**What to get from the client eventually:** whoever will actually manage content day-to-day should have their own login — re-run `npm run db:seed` with their real email/a new password once decided (it upserts, safe to re-run).

## 🔴 Social media links

**Status:** Footer/JSON-LD currently link to placeholder generic URLs (`linkedin.com`, `instagram.com`, `youtube.com`, `x.com` — not real profile pages).
**Needed:** the client's actual social profile URLs, whenever they have them.

## 🔴 GA4 analytics

**Status:** analytics wiring exists (`lib/analytics.ts`, `GoogleAnalytics.tsx`) but is inactive — `NEXT_PUBLIC_GA_MEASUREMENT_ID` isn't set anywhere.
**Needed:** the client's GA4 property measurement ID, if/when they want analytics turned on. Nothing breaks by leaving this unset — the script just doesn't load.

## 🟡 Vercel project + Neon database ownership

**Status:** both currently live under your personal Vercel account (`jaa8chirags-projects`) and its connected Neon Postgres.
**Consider eventually:** whether this should transfer to a Vercel team/account the client controls (or stays under yours as the developer of record — a business decision, not a technical one, just flagging it exists).

---

## How to use this file

When a 🟡 or 🔴 item above gets resolved with the client's real info, update the relevant env var/code and check it off here (or delete the entry). Add new entries here any time you reach for your own account/email as a stand-in during development, so nothing quietly stays "yours" by accident.
