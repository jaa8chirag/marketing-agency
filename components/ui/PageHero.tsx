import Link from "next/link";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import GenerativeArt from "./GenerativeArt";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  tone = "paper",
  visualSeed,
  visualIndex,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  tone?: "paper" | "ink";
  visualSeed?: string;
  visualIndex?: string;
}) {
  const isInk = tone === "ink";

  const textBlock = (
    <>
      {breadcrumbs && (
        <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider mb-8 flex-wrap">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className={`${isInk ? "text-mutedOnInk hover:text-paper" : "text-muted hover:text-ink"} transition-colors`}>
                  {crumb.label}
                </Link>
              ) : (
                <span className={isInk ? "text-paper" : "text-ink"}>{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span className={isInk ? "text-mutedOnInk" : "text-muted"}>/</span>}
            </span>
          ))}
        </nav>
      )}
      <Eyebrow tone={isInk ? "paper" : "ink"}>{eyebrow}</Eyebrow>
      <h1 className="font-display text-[42px] sm:text-[58px] md:text-[76px] font-bold tracking-tightest leading-[0.98] max-w-4xl text-balance">
        {title}
      </h1>
      {description && (
        <p className={`mt-8 max-w-xl text-lg leading-relaxed ${isInk ? "text-mutedOnInk" : "text-muted"}`}>
          {description}
        </p>
      )}
    </>
  );

  return (
    <section className={`${isInk ? "bg-ink text-paper" : "bg-paper text-ink"} pt-40 pb-16 md:pt-48 md:pb-20 border-b ${isInk ? "border-lineOnInk" : "border-line"}`}>
      <Container>
        {visualSeed ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-end">
            <div>{textBlock}</div>
            <GenerativeArt
              seed={visualSeed}
              index={visualIndex}
              className="hidden lg:block aspect-[4/3] w-full border border-lineOnInk"
            />
          </div>
        ) : (
          textBlock
        )}
      </Container>
    </section>
  );
}
