"use client";

// Thin wrapper around GA4's dataLayer. Safe to call even when no GA4
// measurement ID is configured (NEXT_PUBLIC_GA_MEASUREMENT_ID unset) — the
// event just goes nowhere instead of throwing, so every call site stays
// harmless in local dev and doesn't need to guard on whether analytics is
// actually wired up.
//
// Event names match the taxonomy in the brief (§14 + the "Website Flow &
// Customer Journey" addendum): start_project_click, book_call_click,
// contact_form_view/start/submit/success/error, newsletter_view/start/
// submit/success, capability_view, service_view, case_study_view,
// insight_view, outbound_click.
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
