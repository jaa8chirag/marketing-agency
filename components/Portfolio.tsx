"use client";

import { useState } from "react";

type FilterType = "all" | "campaign" | "product" | "spatial";

interface Project {
  id: string;
  num: string;
  title: string;
  client: string;
  categoryTag: string;
  year: string;
  categories: FilterType[];
  image: string;
  accentBadge?: string;
}

const projects: Project[] = [
  {
    id: "nike-campaign",
    num: "01",
    title: "NIKE — FUTURE COUTURE DIGITAL CAMPAIGN",
    client: "NIKE GLOBAL",
    categoryTag: "EDITORIAL CAMPAIGN / VIRTUAL FASHION",
    year: "2026",
    categories: ["campaign"],
    image: "/images/nike-campaign.jpg",
    accentBadge: "CANNES LION GOLD",
  },
  {
    id: "spotify-ui",
    num: "02",
    title: "AURA OS — SPOTIFY NEXT-GEN DESKTOP PLATFORM",
    client: "SPOTIFY",
    categoryTag: "DIGITAL PRODUCT DESIGN / DESIGN SYSTEM",
    year: "2025",
    categories: ["product"],
    image: "/images/spotify-ui.jpg",
    accentBadge: "FWA OF THE YEAR",
  },
  {
    id: "levi-spatial",
    num: "03",
    title: "LEVI’S — SPATIAL ARCHITECTURE INSTALLATION",
    client: "LEVI STRAUSS & CO.",
    categoryTag: "SPATIAL COMPUTING / INTERACTIVE SCULPTURE",
    year: "2026",
    categories: ["spatial"],
    image: "/images/spatial-gallery.jpg",
    accentBadge: "D&AD PENCIL",
  },
  {
    id: "monolith-ai",
    num: "04",
    title: "MONOLITH OS — GENERATIVE AI WORKSPACE",
    client: "NEBULA LABS",
    categoryTag: "AI PLATFORM / WEBGL RUNTIME",
    year: "2025",
    categories: ["product", "spatial"],
    image: "/images/monolith.jpg",
    accentBadge: "WEBBY WINNER",
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const isVisible = (project: Project) =>
    activeFilter === "all" || project.categories.includes(activeFilter);

  return (
    <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-24 md:py-32 border-b border-slate-200" id="work">
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-slate-200 mb-16">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accentBlue block mb-3">
            SELECTED CASE STUDIES
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tightest text-darkText">
            FEATURED WORK
          </h2>
        </div>

        {/* Filter Tab Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-full border border-slate-200">
          {[
            { id: "all", label: "ALL WORK" },
            { id: "campaign", label: "BRAND & CAMPAIGN" },
            { id: "product", label: "DIGITAL PRODUCT" },
            { id: "spatial", label: "SPATIAL & AI" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as FilterType)}
              className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-wider font-bold transition-all ${
                activeFilter === tab.id
                  ? "bg-darkText text-white shadow-md"
                  : "text-slate-600 hover:text-darkText hover:bg-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Project 01 (Hero Card) */}
      {isVisible(projects[0]) && (
        <article className="w-full mb-20 group cursor-pointer">
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 mb-6 shadow-xl">
            <img
              alt={projects[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              src={projects[0].image}
            />

            {/* Badge Pill Overlay */}
            {projects[0].accentBadge && (
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-darkText text-white font-mono text-[10px] uppercase font-bold tracking-wider rounded-full shadow-lg">
                  ★ {projects[0].accentBadge}
                </span>
              </div>
            )}

            <div className="absolute inset-0 bg-darkText/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-6 py-3 bg-white text-darkText rounded-full font-sans text-xs font-extrabold uppercase tracking-wider shadow-2xl group-hover:scale-105 transition-transform">
                Explore Case Study -&gt;
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-2 font-mono text-xs text-slate-500">
                <span>{projects[0].num} //</span>
                <span className="font-bold text-accentBlue">CLIENT: {projects[0].client}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-darkText group-hover:text-accentBlue transition-colors">
                {projects[0].title}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-3.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[10px] uppercase font-semibold rounded-full">
                {projects[0].categoryTag}
              </span>
              <span className="font-mono text-xs font-bold text-darkText">{projects[0].year}</span>
            </div>
          </div>
        </article>
      )}

      {/* Grid Projects 02 & 03 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        {/* Project 02: 7 Cols */}
        {isVisible(projects[1]) && (
          <article className="lg:col-span-7 group cursor-pointer">
            <div className="relative w-full aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 mb-6 shadow-lg">
              <img
                alt={projects[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src={projects[1].image}
              />
              {projects[1].accentBadge && (
                <div className="absolute top-6 left-6">
                  <span className="px-3.5 py-1.5 bg-blue-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider rounded-full shadow-md">
                    ★ {projects[1].accentBadge}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-darkText/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-6 py-3 bg-white text-darkText rounded-full font-sans text-xs font-extrabold uppercase tracking-wider shadow-2xl">
                  Explore Case Study -&gt;
                </span>
              </div>
            </div>

            <div className="pb-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-2 font-mono text-xs text-slate-500">
                <span>{projects[1].num} //</span>
                <span>{projects[1].year}</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-darkText group-hover:text-accentBlue transition-colors mb-3">
                {projects[1].title}
              </h3>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500 font-semibold">CLIENT: {projects[1].client}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full border border-slate-200">
                  {projects[1].categoryTag}
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Project 03: 5 Cols */}
        {isVisible(projects[2]) && (
          <article className="lg:col-span-5 group cursor-pointer">
            <div className="relative w-full aspect-[16/10] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 mb-6 shadow-lg">
              <img
                alt={projects[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src={projects[2].image}
              />
              {projects[2].accentBadge && (
                <div className="absolute top-6 left-6">
                  <span className="px-3.5 py-1.5 bg-emerald-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider rounded-full shadow-md">
                    ★ {projects[2].accentBadge}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-darkText/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-6 py-3 bg-white text-darkText rounded-full font-sans text-xs font-extrabold uppercase tracking-wider shadow-2xl">
                  Explore Case Study -&gt;
                </span>
              </div>
            </div>

            <div className="pb-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-2 font-mono text-xs text-slate-500">
                <span>{projects[2].num} //</span>
                <span>{projects[2].year}</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-darkText group-hover:text-accentBlue transition-colors mb-3">
                {projects[2].title}
              </h3>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500 font-semibold">CLIENT: {projects[2].client}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full border border-slate-200">
                  {projects[2].categoryTag}
                </span>
              </div>
            </div>
          </article>
        )}
      </div>

      {/* Project 04 Full Width */}
      {isVisible(projects[3]) && (
        <article className="w-full group cursor-pointer">
          <div className="relative w-full aspect-[21/9] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 mb-6 shadow-xl">
            <img
              alt={projects[3].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              src={projects[3].image}
            />
            {projects[3].accentBadge && (
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-indigo-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider rounded-full shadow-md">
                  ★ {projects[3].accentBadge}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-darkText/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-6 py-3 bg-white text-darkText rounded-full font-sans text-xs font-extrabold uppercase tracking-wider shadow-2xl">
                Explore Case Study -&gt;
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-3 mb-2 font-mono text-xs text-slate-500">
                <span>{projects[3].num} //</span>
                <span className="font-bold text-accentBlue">CLIENT: {projects[3].client}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-darkText group-hover:text-accentBlue transition-colors">
                {projects[3].title}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-3.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[10px] uppercase font-semibold rounded-full">
                {projects[3].categoryTag}
              </span>
              <span className="font-mono text-xs font-bold text-darkText">{projects[3].year}</span>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
