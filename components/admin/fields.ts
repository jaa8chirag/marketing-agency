// Shared field styling + small helpers for admin CRUD forms. The admin
// panel is deliberately plain/functional — it doesn't need the marketing
// site's animation/brand treatment, just to be fast to build and use.
export const inputClass =
  "w-full bg-surface border border-edge rounded-lg px-3.5 py-2.5 text-fg focus:outline-none focus:border-signal focus:ring-2 focus:ring-signal/15 transition-colors";
export const labelClass = "font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-1.5";
export const buttonClass =
  "inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-signal transition-colors disabled:opacity-40";
export const dangerButtonClass =
  "inline-flex items-center gap-2 px-5 py-2.5 border border-red-500 text-red-500 font-mono text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-red-500 hover:text-white transition-colors";

// Browsers render a native <select>'s open dropdown with their own popup
// chrome (often a plain white background) regardless of the page's dark
// theme — <option> needs its own explicit colors or light-on-light text
// becomes unreadable. Spread onto every <option> in admin forms.
export const optionStyle = { backgroundColor: "#141414", color: "#F7F4EC" };

/** Textarea convention for string[] fields: one value per line. */
export function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(value: string[]): string {
  return value.join("\n");
}

/** Shared per-entity SEO columns (seoTitle / seoDescription / ogImageUrl). */
export function seoFromForm(formData: FormData) {
  return {
    seoTitle: String(formData.get("seoTitle") ?? "").trim() || null,
    seoDescription: String(formData.get("seoDescription") ?? "").trim() || null,
    ogImageUrl: String(formData.get("ogImageUrl") ?? "").trim() || null,
  };
}
