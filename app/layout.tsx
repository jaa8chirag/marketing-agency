import type { Metadata } from "next";
import { Inter, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARCADE STUDIOS — Digital Experience & Spatial Innovation Agency",
  description:
    "We design, build, and scale world-class digital platforms, AI products, and spatial computing experiences. Global hubs in New York, Amsterdam, Tokyo, and London.",
  keywords: [
    "creative agency",
    "digital experience studio",
    "arcade studios",
    "design systems",
    "ai platform development",
    "spatial computing",
    "brand strategy",
  ],
  authors: [{ name: "ARCADE STUDIOS" }],
  openGraph: {
    title: "ARCADE STUDIOS — Digital Experience & Innovation Agency",
    description: "Designing, building & scaling digital experiences for pioneering brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${spaceMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-white font-sans text-darkText antialiased selection:bg-accentBlue selection:text-white">
        {children}
      </body>
    </html>
  );
}
