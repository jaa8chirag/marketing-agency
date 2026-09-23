import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Button from "./Button";
import Reveal from "./Reveal";

export default function CTASection({
  eyebrow = "Start a Project",
  title = "Have a brief? Let's make something worth talking about.",
  description = "Tell us what you're building and we'll bring the right specialists into the room.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-ink text-paper py-24 md:py-32 border-t border-lineOnInk relative overflow-hidden">
      <div className="absolute inset-0 content-grid opacity-[0.06] pointer-events-none" />
      <Container className="relative">
        <Reveal>
          <Eyebrow tone="paper">{eyebrow}</Eyebrow>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tightest leading-[0.98] max-w-3xl text-balance">
              {title}
            </h2>
            <div className="flex flex-col gap-4 shrink-0">
              <p className="max-w-xs text-mutedOnInk leading-relaxed">{description}</p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact?intent=book-a-call" variant="inverse">
                  Book a Call
                </Button>
                <Button href="/work" variant="outline" className="!border-lineOnInk !text-paper hover:!bg-paper hover:!text-ink">
                  See the Work
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
