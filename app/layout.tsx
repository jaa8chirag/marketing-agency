import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif, Space_Mono } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cordinitmedia.com"),
  title: {
    default: "Cordinit Media — Creative, Media & Growth Company",
    template: "%s — Cordinit Media",
  },
  description:
    "Cordinit Media connects creative, production, digital, media and performance to help ambitious brands build, launch and grow. Creative + Technology + Performance.",
  keywords: [
    "creative agency",
    "media company",
    "cordinit media",
    "brand strategy",
    "content production",
    "performance marketing",
    "digital experiences",
    "growth agency",
  ],
  authors: [{ name: "Cordinit Media" }],
  openGraph: {
    title: "Cordinit Media — Creative, Media & Growth Company",
    description:
      "Creative + Technology + Performance. Make people care. Make experiences work. Make growth measurable.",
    type: "website",
    siteName: "Cordinit Media",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} ${instrument.variable} ${spaceMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-paper font-sans text-ink antialiased selection:bg-signal selection:text-paper">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
