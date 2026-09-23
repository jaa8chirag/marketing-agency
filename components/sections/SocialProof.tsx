import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import { testimonials, clientLogos } from "@/lib/content";

export default function SocialProof() {
  return (
    <section className="border-b border-line">
      <Marquee items={clientLogos} />
      <Container className="py-24 md:py-32">
        <Reveal>
          <Eyebrow index="05">Trusted by</Eyebrow>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {testimonials.map((t, idx) => (
            <Reveal key={t.person} delay={idx * 60}>
              <div className="border border-line p-7 h-full flex flex-col justify-between min-h-[240px]">
                <span className="material-symbols-outlined text-signal text-[32px] mb-4">format_quote</span>
                <p className="font-display text-lg leading-snug text-ink mb-6 text-balance">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="font-mono text-[11px] uppercase tracking-wider text-muted pt-4 border-t border-line">
                  {t.person} &middot; {t.company}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
