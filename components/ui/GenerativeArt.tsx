import { seedToHue, seedToImageUrl } from "@/lib/seed";

// Real seeded photography with a brand-tinted duotone treatment.
// No client-side JS: hover motion is pure CSS, so this renders as a
// server component and never triggers a React re-render on mouse move.
export default function GenerativeArt({
  seed,
  label,
  index,
  interactive = true,
  className = "",
  width = 640,
  height = 480,
}: {
  seed: string;
  label?: string;
  index?: string;
  interactive?: boolean;
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
        alt=""
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover ${
          interactive ? "transition-transform duration-700 ease-out hover:scale-110" : ""
        }`}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-color"
        style={{ backgroundColor: `hsl(${hue} 70% 35%)`, opacity: 0.4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/25 pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay pointer-events-none" />

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
