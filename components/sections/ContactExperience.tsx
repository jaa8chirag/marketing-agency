"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { trackEvent } from "@/lib/analytics";
import CalEmbed from "@/components/ui/CalEmbed";

const stepVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
};

type Mode = "book-a-call" | "enquiry";
type Step = "form" | "schedule" | "success";

const fieldClasses =
  "w-full bg-transparent border-b border-edge py-3.5 text-fg placeholder:text-fgMuted focus:outline-none focus:border-signal transition-colors";

export default function ContactExperience({ areasOfInterest }: { areasOfInterest: string[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialMode: Mode = searchParams.get("intent") === "book-a-call" ? "book-a-call" : "enquiry";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookedAt, setBookedAt] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    interest: areasOfInterest[0] ?? "",
    message: "",
    consent: false,
    website: "", // honeypot — left empty by real visitors
  });

  const hasStarted = useRef(false);

  useEffect(() => {
    trackEvent("contact_form_view", { mode: initialMode });
    // Fire once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackEvent("contact_form_start", { mode });
    }
    setForm((f) => ({ ...f, [key]: value }));
  }

  function switchMode(next: Mode) {
    setMode(next);
    setStep("form");
    setBookedAt(null);
  }

  function attribution() {
    const params = new URLSearchParams(window.location.search);
    return {
      sourcePath: pathname,
      ctaLocation: "contact-page-form",
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      utmContent: params.get("utm_content") ?? undefined,
      referrer: document.referrer || undefined,
    };
  }

  const submitLead = useCallback(
    async (extra: { bookingDate?: string; bookingTime?: string; calBookingUid?: string }) => {
      setSubmitting(true);
      setSubmitError(null);
      trackEvent("contact_form_submit", { mode });
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: mode === "book-a-call" ? "BOOK_A_CALL" : "ENQUIRY",
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            company: form.company,
            jobTitle: form.jobTitle,
            interest: form.interest,
            message: form.message,
            consent: form.consent,
            website: form.website,
            ...extra,
            ...attribution(),
          }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) {
          throw new Error(json.error || "Something went wrong. Please try again.");
        }
        trackEvent("contact_form_success", { mode });
        setStep("success");
      } catch (err) {
        trackEvent("contact_form_error", { mode });
        setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
      // form/mode/attribution intentionally omitted — this always reads the latest via closure per call, not memoized across renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [mode, form]
  );

  function handleSubmitDetails(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "book-a-call") {
      setStep("schedule");
    } else {
      submitLead({});
    }
  }

  const handleBooked = useCallback(
    (booking: { uid: string; startTime?: string }) => {
      setBookedAt(booking.startTime ?? null);
      submitLead({
        calBookingUid: booking.uid,
        bookingDate: booking.startTime,
        bookingTime: booking.startTime,
      });
    },
    [submitLead]
  );

  return (
    <div>
      <div className="relative flex border border-edge mb-14 max-w-md">
        <button
          type="button"
          onClick={() => switchMode("book-a-call")}
          className={`relative flex-1 px-5 py-4 font-mono text-[11px] uppercase tracking-widest font-bold transition-colors ${
            mode === "book-a-call" ? "text-paper" : "text-fgMuted hover:text-fg"
          }`}
        >
          {mode === "book-a-call" && (
            <motion.span
              layoutId="contact-mode-pill"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="absolute inset-0 bg-ink -z-10"
            />
          )}
          Book a Call
        </button>
        <button
          type="button"
          onClick={() => switchMode("enquiry")}
          className={`relative flex-1 px-5 py-4 font-mono text-[11px] uppercase tracking-widest font-bold transition-colors border-l border-edge ${
            mode === "enquiry" ? "text-paper" : "text-fgMuted hover:text-fg"
          }`}
        >
          {mode === "enquiry" && (
            <motion.span
              layoutId="contact-mode-pill"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="absolute inset-0 bg-ink -z-10"
            />
          )}
          General Enquiry
        </button>
      </div>

      <div className={step === "schedule" ? "" : "grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16"}>
        <div>
        <AnimatePresence mode="wait">
          {step === "success" ? (
            <motion.div key="success" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="border-beam p-10 md:p-14">
              {mode === "book-a-call" ? (
                <>
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                    className="material-symbols-outlined text-signal text-4xl mb-6 block"
                  >
                    event_available
                  </motion.span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">You&apos;re booked.</h2>
                  <p className="text-lg text-fgMuted leading-relaxed mb-8">
                    {bookedAt
                      ? new Date(bookedAt).toLocaleString(undefined, {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })
                      : "Your meeting is confirmed."}
                    . A calendar invitation and confirmation email are on their way to {form.email || "your inbox"}.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/work" className="px-6 py-3.5 border border-fg font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper hover:border-ink transition-colors">
                      Explore Solutions
                    </Link>
                    <Link href="/insights" className="px-6 py-3.5 border border-edge font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper hover:border-ink transition-colors">
                      View Insights
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-signal text-4xl mb-6 block">mark_email_read</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Thank you.</h2>
                  <p className="text-lg text-fgMuted leading-relaxed mb-8">
                    We have received your enquiry. We will be in touch soon.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/work" className="px-6 py-3.5 border border-fg font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper hover:border-ink transition-colors">
                      Explore Solutions
                    </Link>
                    <Link href="/insights" className="px-6 py-3.5 border border-edge font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper hover:border-ink transition-colors">
                      View Insights
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          ) : step === "schedule" ? (
            <motion.div key="schedule" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fgMuted hover:text-fg mb-8 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Back to details
              </button>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-8">Pick a date &amp; time</h2>
              <CalEmbed
                name={`${form.firstName} ${form.lastName}`.trim()}
                email={form.email}
                notes={form.message}
                onBooked={handleBooked}
              />
              {submitting && <p className="mt-4 text-sm text-fgMuted">Confirming your booking…</p>}
              {submitError && <p className="mt-4 text-sm text-red-500">{submitError}</p>}
            </motion.div>
          ) : (
            <motion.form key="form" variants={stepVariants} initial="initial" animate="animate" exit="exit" onSubmit={handleSubmitDetails} className="flex flex-col gap-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">First Name *</label>
                  <input required value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} className={fieldClasses} placeholder="Jordan" />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">Last Name *</label>
                  <input required value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} className={fieldClasses} placeholder="Rivera" />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">Work Email *</label>
                <input required type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={fieldClasses} placeholder="jordan@company.com" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">Company *</label>
                  <input required value={form.company} onChange={(e) => updateField("company", e.target.value)} className={fieldClasses} placeholder="Company name" />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">Job Title</label>
                  <input value={form.jobTitle} onChange={(e) => updateField("jobTitle", e.target.value)} className={fieldClasses} placeholder="Marketing Director" />
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">Area of Interest *</label>
                <select
                  required
                  value={form.interest}
                  onChange={(e) => updateField("interest", e.target.value)}
                  className={`${fieldClasses} appearance-none`}
                >
                  {/* Browsers render a native <select>'s open dropdown with their own
                      popup chrome (often a plain white background) regardless of the
                      page's dark theme — <option> needs its own explicit colors or
                      light-on-light text becomes unreadable. */}
                  {areasOfInterest.map((area) => (
                    <option key={area} value={area} style={{ backgroundColor: "#141414", color: "#F7F4EC" }}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-2">
                  What would you like help with? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={`${fieldClasses} resize-none`}
                  placeholder="Tell us briefly about the project or problem."
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  required
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => updateField("consent", e.target.checked)}
                  className="mt-1 accent-ink"
                />
                <span className="text-sm text-fgMuted leading-relaxed">
                  I agree to be contacted by Cordinit Media about my enquiry, in line with the{" "}
                  <Link href="/legal/privacy-policy" className="text-fg underline hover:text-signal">Privacy Policy</Link>. *
                </span>
              </label>

              {/* Honeypot — hidden from real visitors via CSS, not display:none (which some bots skip). */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 px-6 py-4 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors self-start disabled:opacity-40"
              >
                {submitting ? "Sending…" : mode === "book-a-call" ? "Continue to Scheduling" : "Send Enquiry"}
              </button>
              {submitError && <p className="text-sm text-red-500">{submitError}</p>}
            </motion.form>
          )}
        </AnimatePresence>
        </div>

        {step !== "schedule" && (
          <div className="border border-edge p-8 md:p-10 h-fit">
            <span className="font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-6">What happens next</span>
            <ol className="flex flex-col gap-6">
              {(mode === "book-a-call"
                ? [
                    "Tell us a little about you and the project.",
                    "Pick a date and time that works for you.",
                    "We'll send a calendar invite and confirmation instantly.",
                    "We meet, and come prepared with relevant work and thinking.",
                  ]
                : [
                    "Your enquiry reaches our team directly — no ticket queue.",
                    "We review against the right capability and specialists.",
                    "We reply with next steps, usually within one business day.",
                  ]
              ).map((text, idx) => (
                <li key={text} className="flex gap-4">
                  <span className="font-mono text-xs font-bold text-signal shrink-0">0{idx + 1}</span>
                  <span className="text-fgMuted leading-relaxed">{text}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
