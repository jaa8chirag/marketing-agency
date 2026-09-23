export default function Eyebrow({
  children,
  index,
  tone = "ink",
}: {
  children: React.ReactNode;
  index?: string;
  tone?: "ink" | "paper" | "signal";
}) {
  const toneClass =
    tone === "paper" ? "text-paperMuted" : tone === "signal" ? "text-signal" : "text-fgMuted";

  return (
    <div className="flex items-center gap-3 mb-5">
      {index && (
        <span className="font-mono text-[11px] font-bold text-signal">{index}</span>
      )}
      <span className={`font-mono text-[11px] font-bold uppercase tracking-superwide ${toneClass}`}>
        {children}
      </span>
      <span className="h-px flex-1 max-w-[64px] bg-current opacity-30" />
    </div>
  );
}
