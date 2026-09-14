export default function Impact() {
  const stats = [
    {
      value: "5,000+",
      label: "CREATIVE PROFESSIONALS",
      description: "Engineers, designers & strategists operating worldwide",
    },
    {
      value: "34",
      label: "GLOBAL HUBS",
      description: "Production studios across Americas, EMEA & APAC",
    },
    {
      value: "350+",
      label: "LIONS & AWARDS",
      description: "Cannes Lions, D&AD Pencils, FWAs & Webby Honors",
    },
    {
      value: "$2.4B+",
      label: "ENTERPRISE VALUE",
      description: "Cumulative enterprise growth unlocked for client partners",
    },
  ];

  return (
    <section
      className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-24 md:py-32 border-b border-slate-200"
      id="impact"
    >
      <div className="mb-16">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-accentBlue block mb-3">
          QUANTIFIED PERFORMANCE
        </span>
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tightest text-darkText">
          GLOBAL IMPACT
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-8 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col justify-between min-h-[240px] shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
          >
            <span className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-darkText">
              {stat.value}
            </span>
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accentBlue block mb-1">
                {stat.label}
              </span>
              <p className="font-sans text-xs text-slate-600 font-medium">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
