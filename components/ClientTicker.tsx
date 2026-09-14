export default function ClientTicker() {
  const clients = [
    "NIKE",
    "GOOGLE",
    "LEVI'S",
    "SPOTIFY",
    "NETFLIX",
    "APPLE",
    "SAMSUNG",
    "BALENCIAGA",
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-12 border-b border-slate-200 bg-slate-50/50">
      <div className="flex items-center justify-between mb-6 font-mono text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
        <span>CLIENT PARTNERSHIPS</span>
        <span>GLOBAL IMPACT 2022—2026</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {clients.map((client, idx) => (
          <div
            key={idx}
            className="h-20 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <span className="font-display font-extrabold text-sm sm:text-base text-slate-400 group-hover:text-darkText tracking-widest transition-colors">
              {client}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
