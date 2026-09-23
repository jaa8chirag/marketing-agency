import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

type Variant = "primary" | "inverse" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  // primary/inverse are deliberate fixed-contrast chips (used to pop against
  // a specific dark or light section) — they stay static across both themes.
  primary:
    "bg-ink text-paper hover:bg-signal hover:text-paper border border-ink hover:border-signal",
  inverse:
    "bg-paper text-ink hover:bg-signal hover:text-paper border border-paper hover:border-signal",
  // outline/ghost follow the page's own theme, with a signal-green hover
  // that reads correctly in both light and dark mode.
  outline:
    "bg-transparent text-fg border border-fg hover:bg-signal hover:text-ink hover:border-signal",
  ghost:
    "bg-transparent text-fg border border-transparent hover:border-fg",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  icon = true,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  icon?: boolean;
}) {
  const classes = `group inline-flex items-center gap-2.5 px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${variants[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          arrow_outward
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Magnetic>
        <Link href={href} className={classes}>
          {content}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <button type={type} onClick={onClick} className={classes}>
        {content}
      </button>
    </Magnetic>
  );
}
