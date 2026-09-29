import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export interface DisplayTestimonial {
  quote: string;
  person: string;
  role?: string;
  company: string;
  photoUrl?: string;
}

export default function TestimonialsSection({ testimonials }: { testimonials: DisplayTestimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 md:py-32 border-b border-edge bg-surface">
      <Container>
        <Reveal>
          <Eyebrow index="06">In Their Words</Eyebrow>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
            What it&apos;s actually like to work with us.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Reveal key={`${t.person}-${t.company}`} delay={idx * 60}>
              <figure className="group relative h-full flex flex-col justify-between border border-edge p-7 bg-surfaceMuted hover:border-signal/50 hover:-translate-y-1 transition-all duration-300">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl font-bold text-signal/20 leading-none mb-4 select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1">
                  <p className="text-fg leading-relaxed">{t.quote}</p>
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6 pt-6 border-t border-edge">
                  {t.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.photoUrl}
                      alt={t.person}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-edge grayscale-[20%] group-hover:grayscale-0 transition-[filter] duration-500"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-sm font-bold shrink-0">
                      {t.person.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-fg truncate">
                      {t.person}
                      {t.role ? `, ${t.role}` : ""}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-fgMuted truncate">{t.company}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
