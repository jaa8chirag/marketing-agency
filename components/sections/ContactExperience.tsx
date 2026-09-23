"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { areasOfInterest } from "@/lib/content";

type Mode = "book-a-call" | "enquiry";
type Step = "form" | "schedule" | "success";

const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

function nextBusinessDays(count: number) {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < count) {
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) {
      days.push(new Date(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

const fieldClasses =
  "w-full bg-transparent border-b border-edge py-3.5 text-fg placeholder:text-fgMuted focus:outline-none focus:border-signal transition-colors";

export default function ContactExperience() {
  const searchParams = useSearchParams();
  const initialMode: Mode = searchParams.get("intent") === "book-a-call" ? "book-a-call" : "enquiry";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    interest: areasOfInterest[0],
    message: "",
    consent: false,
  });

  const days = nextBusinessDays(5);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function switchMode(next: Mode) {
    setMode(next);
    setStep("form");
    setSelectedDay(null);
    setSelectedTime(null);
  }

  function handleSubmitDetails(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "book-a-call") {
      setStep("schedule");
    } else {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setStep("success");
      }, 900);
    }
  }

  function handleConfirmBooking() {
    if (selectedDay === null || !selectedTime) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("success");
    }, 900);
  }

  const chosenDate = selectedDay !== null ? days[selectedDay] : null;

  return (
    <div>
      <div className="flex border border-edge mb-14 max-w-md">
        <button
          type="button"
          onClick={() => switchMode("book-a-call")}
          className={`flex-1 px-5 py-4 font-mono text-[11px] uppercase tracking-widest font-bold transition-colors ${
            mode === "book-a-call" ? "bg-ink text-paper" : "text-fgMuted hover:text-fg"
          }`}
        >
          Book a Call
        </button>
        <button
          type="button"
          onClick={() => switchMode("enquiry")}
          className={`flex-1 px-5 py-4 font-mono text-[11px] uppercase tracking-widest font-bold transition-colors border-l border-edge ${
            mode === "enquiry" ? "bg-ink text-paper" : "text-fgMuted hover:text-fg"
          }`}
        >
          General Enquiry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16">
        <div>
          {step === "success" ? (
            <div className="border border-edge p-10 md:p-14">
              {mode === "book-a-call" && chosenDate && selectedTime ? (
                <>
                  <span className="material-symbols-outlined text-signal text-4xl mb-6 block">event_available</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">You&apos;re booked.</h2>
                  <p className="text-lg text-fgMuted leading-relaxed mb-8">
                    {chosenDate.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}. A calendar
                    invitation and confirmation email are on their way to {form.email || "your inbox"}.
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
            </div>
          ) : step === "schedule" ? (
            <div>
              <button
                type="button"
                onClick={() => setStep("form")}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fgMuted hover:text-fg mb-8 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Back to details
              </button>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-8">Pick a date &amp; time</h2>
              <div className="grid grid-cols-5 gap-2 mb-8">
                {days.map((day, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDay(idx)}
                    className={`p-3 border text-center transition-colors ${
                      selectedDay === idx ? "bg-ink text-paper border-ink" : "border-edge hover:border-ink"
                    }`}
                  >
                    <span className="block font-mono text-[10px] uppercase">{day.toLocaleDateString(undefined, { weekday: "short" })}</span>
                    <span className="block font-display text-lg font-bold">{day.getDate()}</span>
                  </button>
                ))}
              </div>
              {selectedDay !== null && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-10">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`px-4 py-3 border font-mono text-xs uppercase tracking-wider transition-colors ${
                        selectedTime === slot ? "bg-signal text-paper border-signal" : "border-edge hover:border-ink"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="button"
                disabled={selectedDay === null || !selectedTime || submitting}
                onClick={handleConfirmBooking}
                className="px-6 py-3.5 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {submitting ? "Confirming…" : "Confirm Booking"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitDetails} className="flex flex-col gap-7">
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
                  {areasOfInterest.map((area) => (
                    <option key={area} value={area}>{area}</option>
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

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 px-6 py-4 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors self-start disabled:opacity-40"
              >
                {submitting ? "Sending…" : mode === "book-a-call" ? "Continue to Scheduling" : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>

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
      </div>
    </div>
  );
}
