import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#141414",
        ink2: "#1C1C1C",
        paper: "#F7F4EC",
        paperMuted: "#EFEAD9",
        paperDim: "#E5DFCB",
        line: "#DBD6C2",
        lineOnInk: "#2B2B2B",
        signal: "#26D62E",
        signalDim: "#CFF7CE",
        lime: "#2BEE34",
        muted: "#6B6A5D",
        mutedOnInk: "#9A9A9A",

        // Theme-aware tokens: swap under the .dark class (see globals.css).
        // Used for normal content sections that should flip light<->dark.
        // The static tokens above (ink/paper/etc.) stay fixed and are used
        // for sections that are deliberately dark in both themes
        // (hero, footer, CTA banners, mega menu).
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        surfaceMuted: "rgb(var(--color-surface-muted) / <alpha-value>)",
        surfaceDim: "rgb(var(--color-surface-dim) / <alpha-value>)",
        fg: "rgb(var(--color-fg) / <alpha-value>)",
        fgMuted: "rgb(var(--color-fg-muted) / <alpha-value>)",
        edge: "rgb(var(--color-edge) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "Sora", "sans-serif"],
        display: ["var(--font-sora)", "Sora", "sans-serif"],
        mono: ["var(--font-space-mono)", "'Space Mono'", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        widest: "0.15em",
        superwide: "0.3em",
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
