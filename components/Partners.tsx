export default function Partners() {
  const clients = [
    { name: "BALENCIAGA", style: "font-display text-lg lg:text-xl font-bold uppercase tracking-widest text-white/80 hover:text-white" },
    { name: "APPLE", style: "font-display text-lg lg:text-xl font-bold uppercase tracking-widest text-white/80 hover:text-white" },
    { name: "SONY", style: "font-display text-lg lg:text-xl font-bold uppercase tracking-widest text-white/80 hover:text-white" },
    { name: "TEENAGE ENGINEERING", style: "font-mono text-xs font-bold uppercase tracking-tighter text-white/80 hover:text-white text-center" },
    { name: "POLESTAR", style: "font-display text-lg lg:text-xl font-bold uppercase tracking-widest text-white/80 hover:text-white" },
    { name: "RIMOWA", style: "font-display text-lg lg:text-xl font-bold uppercase tracking-widest text-white/80 hover:text-white" },
  ];

  return (
    <section className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-20 border-b border-white/10">
      <div className="flex items-center justify-between mb-8 font-mono text-[11px] uppercase tracking-widest text-secondary">
        <span>04 // PARTNERS</span>
        <span>SELECT CLIENTS 2022—2026</span>
      </div>

      {/* Minimalist Monogram Marquee Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-white/10">
        {clients.map((client, i) => (
          <div
            key={i}
            className="h-32 border-r border-b border-white/10 flex items-center justify-center p-6 hover:bg-white/[0.02] transition-colors"
          >
            <span className={`${client.style} transition-colors`}>{client.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
