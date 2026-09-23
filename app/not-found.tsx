import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full flex-1 flex items-center pt-32">
        <Container className="py-24 text-center">
          <span className="font-mono text-[11px] uppercase tracking-superwide text-signal block mb-6">
            404 &middot; Not Found
          </span>
          <h1 className="font-display text-[18vw] sm:text-[160px] font-bold tracking-tightest leading-none mb-8">
            404
          </h1>
          <p className="text-lg text-muted max-w-md mx-auto leading-relaxed mb-10">
            This page doesn&apos;t exist &mdash; or the brief changed since we built it. Let&apos;s
            get you back to something useful.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="px-6 py-3.5 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors">
              Back to Home
            </Link>
            <Link href="/work" className="px-6 py-3.5 border border-ink font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors">
              See the Work
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
