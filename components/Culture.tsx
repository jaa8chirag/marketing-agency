export default function Culture() {
  const values = [
    {
      title: "CULTURAL RELEVANCE",
      desc: "We build work that resonates across internet culture, luxury fashion, and digital ecosystems.",
    },
    {
      title: "UNCOMPROMISING CRAFT",
      desc: "Every pixel, 3D polygon, and micro-interaction is executed with obsessive precision.",
    },
    {
      title: "VELOCITY & SCALE",
      desc: "Global production team operating across 4 time zones delivering enterprise speed and agility.",
    },
  ];

  return (
    <section
      className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-24 border-b border-slate-200 bg-slate-900 text-white rounded-3xl my-16 shadow-2xl overflow-hidden relative"
      id="culture"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-4">
          CULTURE &amp; PHILOSOPHY
        </span>

        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tightest leading-none mb-12">
          BE BOLD. BE HUMBLE. <br />
          <span className="text-blue-400">MERGE CULTURE &amp; CODE.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-800">
          {values.map((v, i) => (
            <div key={i} className="space-y-3">
              <span className="font-mono text-xs text-slate-400 font-bold block">
                0{i + 1} // PRINCIPLE
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight text-white">
                {v.title}
              </h3>
              <p className="font-sans text-sm text-slate-300 leading-relaxed font-normal">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
