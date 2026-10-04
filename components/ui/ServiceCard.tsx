import Link from "next/link";
import type { CSSProperties } from "react";
import GenerativeArt from "./GenerativeArt";

// Tall portrait flip cards (Pinterest-style masonry).
// Front: one image + title + a single line. Hover / keyboard focus flips
// slowly to the back with the detail and an Explore button. Pure CSS — the
// Explore link sits on the back face, so :focus-within flips for keyboard
// users, and tapping triggers the sticky hover state on touch devices.

type Service = {
  slug: string;
  name: string;
  hook: string;
  definition: string;
  forWhen: string[];
  deliverables: string[];
  outcomes: string[];
  approach: { title: string }[];
};

const palettes = [
  { bg: "#6FAA8E", fg: "#10201A" }, // sage
  { bg: "#FDF4E9", fg: "#10201A" }, // cream
  { bg: "#B79BE8", fg: "#1B1030" }, // lilac
  { bg: "#DDEADF", fg: "#10201A" }, // mint
  { bg: "#FBD3A8", fg: "#2B1A08" }, // peach
  { bg: "#10201A", fg: "#EAF3EC" }, // forest
];

// Short, tall, medium… like a brick wall — the big height steps are what make the columns read as a masonry.
// Back-face content must fit without scrolling, so even the shortest card stays tall enough for it.
const heights = ["h-[470px]", "h-[600px]", "h-[510px]", "h-[650px]", "h-[480px]", "h-[560px]"];
// Cards at/above this index-height also get the extra "good fit" and "outcome" blocks.
const tall = [false, true, false, true, false, true];

export default function ServiceCard({
  href,
  seed,
  imageUrl,
  index,
  capabilityName,
  service,
}: {
  href: string;
  seed: string;
  imageUrl?: string;
  index: number;
  capabilityName: string;
  service: Service;
}) {
  const p = index % palettes.length;
  const { bg, fg } = palettes[p];
  const isTall = tall[index % tall.length];
  const face: CSSProperties = { backgroundColor: bg, color: fg };

  return (
    <div className="group [perspective:1600px]">
      <div
        className={`relative ${heights[index % heights.length]} [transform-style:preserve-3d] transition-transform duration-[1400ms] ease-[cubic-bezier(.25,.8,.25,1)] motion-reduce:transition-none group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]`}
      >
        {/* ── FRONT: image + title + one line ── */}
        <div
          className="absolute inset-0 flex flex-col gap-5 rounded-[28px] p-4 [backface-visibility:hidden]"
          style={face}
        >
          <div className="relative flex-1 min-h-0 overflow-hidden rounded-[20px]">
            <GenerativeArt seed={seed} imageUrl={imageUrl} groupHover width={640} height={800} className="absolute inset-0 h-full w-full" />
            <div className="absolute left-4 top-4 right-4 flex items-start text-paper">
              <span className="rounded-full bg-ink/60 px-3 py-1 font-sans text-[11px] backdrop-blur">{capabilityName}</span>
            </div>
          </div>
          <div className="flex-none px-3 pb-3 pt-1">
            <h3 className="font-serif text-[1.7rem] leading-[1.1] tracking-tight text-balance">{service.name}</h3>
            <p className="mt-2 font-sans text-sm leading-snug opacity-80">{service.hook}</p>
          </div>
        </div>

        {/* ── BACK: more info + Explore ── */}
        <div
          data-lenis-prevent
          className="absolute inset-0 flex flex-col overflow-y-auto overscroll-contain rounded-[28px] p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={face}
        >
          <span className="font-mono text-[11px] font-bold tracking-widest opacity-70">{capabilityName}</span>
          <h3 className="mt-2 font-serif text-[1.7rem] leading-[1.1] tracking-tight text-balance">{service.name}</h3>
          <p className={`mt-3 font-sans text-[13px] leading-relaxed opacity-90 ${isTall ? "" : "line-clamp-4"}`}>{service.definition}</p>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-widest opacity-60">You get</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {service.deliverables.slice(0, isTall ? 4 : 3).map((d) => (
              <li key={d} className="flex gap-2 font-sans text-[13px] leading-snug">
                <span aria-hidden="true">✓</span>
                {d}
              </li>
            ))}
          </ul>

          {isTall && service.forWhen[0] && (
            <>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest opacity-60">Good fit when</p>
              <p className="mt-2 font-sans text-[13.5px] leading-snug opacity-90">{service.forWhen[0]}</p>
            </>
          )}

          {isTall && service.outcomes[0] && (
            <>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest opacity-60">Outcome</p>
              <p className="mt-2 font-sans text-[13.5px] leading-snug opacity-90">{service.outcomes[0]}</p>
            </>
          )}

          <Link href={href} aria-label={`Explore ${service.name}`} className="mt-auto pt-5 self-start">
            <span
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-medium transition-transform hover:scale-105"
              style={{ backgroundColor: fg, color: bg }}
            >
              Explore <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
