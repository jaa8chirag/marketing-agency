import { seedToHue, seedToImageUrl } from "@/lib/seed";

// Real seeded photography with a brand-tinted duotone treatment.
// No client-side JS: hover motion is pure CSS, so this renders as a
// server component and never triggers a React re-render on mouse move.
export default function GenerativeArt({
  seed,
  label,
  index,
  interactive = true,
  groupHover = false,
  className = "",
  width = 640,
  height = 480,
}: {
  seed: string;
  label?: string;
  index?: string;
  interactive?: boolean;
  /** Use group-hover instead of self-hover, and add the grayscale-to-color
   * reveal used across card grids (so hovering anywhere on the parent
   * card — not just the image — triggers it). */
  groupHover?: boolean;
  className?: string;
  width?: number;
  height?: number;
}) {
  const hue = seedToHue(seed);
  const src = seedToImageUrl(seed, width, height);

  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label || seed || "visual"}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        className={`absolute inset-0 w-full h-full object-cover ${
          groupHover
            ? "grayscale-[30%] contrast-105 brightness-[0.9] saturate-[0.85] scale-105 transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-115"
            : interactive
              ? "transition-transform duration-700 ease-out hover:scale-110"
              : ""
        }`}
      />
      {groupHover && (
        <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-paper/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      )}
      {/* Subtle brand tinting that preserves the vivid clarity of the photograph */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-color opacity-20"
        style={{ backgroundColor: `hsl(${hue} 70% 35%)` }}
      />
      {/* Clean cinematic vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay pointer-events-none" />

      {(label || index) && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 pointer-events-none">
          <div className="flex items-center justify-between">
            {index && <span className="font-mono text-[10px] text-paper/80">{index}</span>}
          </div>
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-paper/90">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}
