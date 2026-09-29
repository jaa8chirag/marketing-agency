"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    trackEvent("newsletter_view");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    trackEvent("newsletter_submit");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true, website }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      trackEvent("newsletter_success");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="font-mono text-sm text-signal">Thanks — you&apos;re subscribed.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xs">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            if (!hasStarted.current) {
              hasStarted.current = true;
              trackEvent("newsletter_start");
            }
            setEmail(e.target.value);
          }}
          placeholder="Work email"
          className="flex-1 min-w-0 bg-transparent border-b border-lineOnInk py-2.5 text-paper placeholder:text-mutedOnInk focus:outline-none focus:border-signal transition-colors"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 px-4 py-2.5 bg-paper text-ink font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors disabled:opacity-40"
        >
          {status === "submitting" ? "…" : "Subscribe"}
        </button>
      </div>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <p className="font-mono text-[10px] text-mutedOnInk leading-relaxed">
        By subscribing you agree to be contacted by Cordinit Media, per the{" "}
        <a href="/legal/privacy-policy" className="underline hover:text-paper">
          Privacy Policy
        </a>
        .
      </p>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  );
}
