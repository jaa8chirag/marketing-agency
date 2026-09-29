"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import GenerativeArt from "./GenerativeArt";

const riseIn = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

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
  const shouldReduceMotion = useReducedMotion();

  const custom = (i: number) => (shouldReduceMotion ? 0 : i);
  const variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : riseIn;

  const textBlock = (
    <>
      {breadcrumbs && (
        <motion.nav
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={custom(0)}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider mb-8 flex-wrap"
        >
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className={`${isInk ? "text-mutedOnInk hover:text-paper" : "text-fgMuted hover:text-fg"} transition-colors`}>
                  {crumb.label}
                </Link>
              ) : (
                <span className={isInk ? "text-paper" : "text-fg"}>{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span className={isInk ? "text-mutedOnInk" : "text-fgMuted"}>/</span>}
            </span>
          ))}
        </motion.nav>
      )}
      <motion.div variants={variants} initial="hidden" animate="visible" custom={custom(1)}>
        <Eyebrow tone={isInk ? "paper" : "ink"}>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h1
        variants={variants}
        initial="hidden"
        animate="visible"
        custom={custom(2)}
        className="font-display text-[42px] sm:text-[58px] md:text-[76px] font-bold tracking-tightest leading-[0.98] max-w-4xl text-balance"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          variants={variants}
          initial="hidden"
          animate="visible"
          custom={custom(3)}
          className={`mt-8 max-w-xl text-lg leading-relaxed ${isInk ? "text-mutedOnInk" : "text-fgMuted"}`}
        >
          {description}
        </motion.p>
      )}
    </>
  );

  const breadcrumbJsonLd = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.label,
          ...(crumb.href ? { item: `https://cordinitmedia.com${crumb.href}` } : {}),
        })),
      }
    : null;

  return (
    <section className={`${isInk ? "bg-ink text-paper" : "bg-surface text-fg"} pt-40 pb-16 md:pt-48 md:pb-20 border-b ${isInk ? "border-lineOnInk" : "border-edge"}`}>
      {breadcrumbJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      )}
      <Container>
        {visualSeed ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-end">
            <div>{textBlock}</div>
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.06, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="border-beam hidden lg:block aspect-[4/3] w-full"
            >
              <GenerativeArt seed={visualSeed} index={visualIndex} className="w-full h-full" />
            </motion.div>
          </div>
        ) : (
          textBlock
        )}
      </Container>
    </section>
  );
}
