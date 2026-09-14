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
        lightBg: "#FFFFFF",
        surfaceLight: "#F8FAFC",
        surfaceElevated: "#F1F5F9",
        darkText: "#0F172A",
        secondaryText: "#475569",
        mutedText: "#94A3B8",
        borderLight: "#E2E8F0",
        accentBlue: "#2563EB",
        accentEmerald: "#10B981",
        accentIndigo: "#4F46E5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
        mono: ["var(--font-space-mono)", "'Space Mono'", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        widest: "0.15em",
      },
    },
  },
  plugins: [],
};

export default config;
