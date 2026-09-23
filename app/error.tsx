"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full flex-1 flex items-center pt-32">
        <Container className="py-24 text-center">
          <span className="font-mono text-[11px] uppercase tracking-superwide text-signal block mb-6">
            500 &middot; Server Error
          </span>
          <h1 className="font-display text-[18vw] sm:text-[160px] font-bold tracking-tightest leading-none mb-8">
            500
          </h1>
          <p className="text-lg text-muted max-w-md mx-auto leading-relaxed mb-10">
            Something went wrong on our end. Try again, or head back to the homepage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="px-6 py-3.5 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors"
            >
              Try Again
            </button>
            <Link href="/" className="px-6 py-3.5 border border-ink font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors">
              Back to Home
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
