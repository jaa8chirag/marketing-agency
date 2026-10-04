// Redirect management (brief §10/§13 — "CMS or deployment layer"). Add an entry
// whenever a slug changes so old links and search-engine results keep working.
// Applied via `redirects()` in next.config.mjs; permanent (308) by default.
/** @type {{ source: string, destination: string, permanent?: boolean }[]} */
export const redirects = [
  // { source: "/capabilities/brand-creative/branding", destination: "/capabilities/brand-creative/naming-identity" },
];
