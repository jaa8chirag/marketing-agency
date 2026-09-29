import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Button from "./Button";
import Reveal from "./Reveal";
import NewsletterForm from "./NewsletterForm";
import { getCtaBlock } from "@/lib/queries";

export default async function CTASection({
  eyebrow = "Start a Project",
  title = "Have a brief? Let's make something worth talking about.",
  description = "Tell us what you're building and we'll bring the right specialists into the room.",
  variant = "default",
  ctaKey,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** "newsletter" swaps the Book a Call / See the Work buttons for a real email signup form. */
  variant?: "default" | "newsletter";
  /** Looks this block up via the admin-editable CtaBlock table (/admin/cta-blocks)
   * and overrides eyebrow/title/description/buttons above when found. Only
   * worth passing on call sites whose copy is genuinely generic/reusable —
   * most pages interpolate page-specific text into the title and should
   * keep passing eyebrow/title as plain props instead. */
  ctaKey?: string;
}) {
  const block = ctaKey ? await getCtaBlock(ctaKey) : null;

  const resolvedEyebrow = block?.eyebrow ?? eyebrow;
  const resolvedTitle = block?.title ?? title;
  const resolvedDescription = block?.description ?? description;
  const primaryLabel = block?.primaryLabel ?? "Book a Call";
  const primaryHref = block?.primaryHref ?? "/contact?intent=book-a-call";
  const secondaryLabel = block?.secondaryLabel ?? "See the Work";
  const secondaryHref = block?.secondaryHref ?? "/work";

  return (
    <section className="bg-ink text-paper py-24 md:py-32 border-t border-lineOnInk relative overflow-hidden">
      <div className="absolute inset-0 content-grid opacity-[0.06] pointer-events-none" />
      <Container className="relative">
        <Reveal>
          <Eyebrow tone="paper">{resolvedEyebrow}</Eyebrow>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tightest leading-[0.98] max-w-3xl text-balance">
              {resolvedTitle}
            </h2>
            <div className="flex flex-col gap-4 shrink-0">
              <p className="max-w-xs text-mutedOnInk leading-relaxed">{resolvedDescription}</p>
              {variant === "newsletter" ? (
                <NewsletterForm />
              ) : (
                <div className="flex flex-wrap gap-4">
                  <Button href={primaryHref} variant="inverse" trackAs="book_call_click">
                    {primaryLabel}
                  </Button>
                  {secondaryLabel && secondaryHref && (
                    <Button href={secondaryHref} variant="outline" className="!border-lineOnInk !text-paper hover:!bg-paper hover:!text-ink">
                      {secondaryLabel}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
