// Shared field styling + small helpers for admin CRUD forms. The admin
// panel is deliberately plain/functional — it doesn't need the marketing
// site's animation/brand treatment, just to be fast to build and use.
export const inputClass =
  "w-full bg-transparent border border-edge rounded px-3 py-2.5 text-fg focus:outline-none focus:border-signal transition-colors";
export const labelClass = "font-mono text-[11px] uppercase tracking-wider text-fgMuted block mb-1.5";
export const buttonClass =
  "px-5 py-2.5 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors disabled:opacity-40";
export const dangerButtonClass =
  "px-5 py-2.5 border border-red-500 text-red-500 font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors";

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
