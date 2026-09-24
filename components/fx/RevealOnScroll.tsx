"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { duration, easing, reducedMotionVariant } from "@/lib/motion";

export type RevealVariant = "staggerFadeUp" | "cascadeGrid" | "slideAlternating" | "blurIn" | "scaleIn";

const baseVariants: Record<Exclude<RevealVariant, "slideAlternating">, Variants> = {
  staggerFadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.entrance, ease: easing.standard } },
  },
  cascadeGrid: {
    hidden: { opacity: 0, y: 18, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: duration.base, ease: easing.snappy } },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(14px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: duration.slow, ease: easing.soft } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.82 },
    visible: { opacity: 1, scale: 1, transition: { duration: duration.base, ease: easing.snappy } },
  },
};

// One entrance wrapper, five variants — every section picks a different
// one so adjacent sections never animate in the same way. Wraps existing
// card markup as-is; only animates transform/opacity/filter.
export default function RevealOnScroll({
  children,
  variant = "staggerFadeUp",
  index = 0,
  staggerDelay = 0.08,
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  index?: number;
  staggerDelay?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  const variants: Variants =
    variant === "slideAlternating"
      ? {
          hidden: { opacity: 0, x: index % 2 === 0 ? -32 : 32 },
          visible: { opacity: 1, x: 0, transition: { duration: duration.entrance, ease: easing.standard } },
        }
      : baseVariants[variant];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={prefersReduced ? reducedMotionVariant : variants}
      transition={{ delay: prefersReduced ? 0 : index * staggerDelay }}
    >
      {children}
    </motion.div>
  );
}
