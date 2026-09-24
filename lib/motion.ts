// Single source of truth for every duration, easing and stagger value used
// by the card fx system in components/fx/. No animation should hardcode
// its own numbers — import from here so every section reads consistent.

export const easing = {
  standard: [0.16, 1, 0.3, 1] as const, // premium "settle" ease, used site-wide already
  snappy: [0.34, 1.56, 0.64, 1] as const, // slight overshoot, for pops/scale-ins
  soft: [0.4, 0, 0.2, 1] as const, // gentle, for blur/opacity-only moves
};

export const duration = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
  entrance: 0.7,
};

export const stagger = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
};

export const spring = {
  lift: { type: "spring", stiffness: 300, damping: 22, mass: 0.6 } as const,
  snap: { type: "spring", stiffness: 420, damping: 28, mass: 0.5 } as const,
};

// Reduced-motion fallback: every entrance variant collapses to this.
export const reducedMotionVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast, ease: easing.soft } },
};
