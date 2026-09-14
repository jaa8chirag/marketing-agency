"use client";

import { useState } from "react";

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const pillars = [
    {
      num: "01",
      title: "BRAND & EXPERIENCE STRATEGY",
      deliverable: "DELIVERABLE: STRATEGIC ROADMAP",
      items: [
        "Brand Identity & Architecture",
        "Cultural & Technological Foresight",
        "Digital Transformation Strategy",
        "Executive Creative Direction",
      ],
    },
    {
      num: "02",
      title: "AI & EXPERIENCE PLATFORMS",
      deliverable: "DELIVERABLE: ENTERPRISE PLATFORM",
      items: [
        "Generative AI Workflow Integration",
        "LLM & Vision Fine-Tuning",
        "E-Commerce & Digital FlagSHIPS",
        "Motion & High-Fidelity UX",
      ],
    },
    {
      num: "03",
      title: "SPATIAL & IMMERSIVE COMPUTING",
      deliverable: "DELIVERABLE: SPATIAL RUNTIME",
      items: [
        "Apple Vision Pro / VisionOS Apps",
        "Real-Time 3D WebGL & WebGPU",
        "Interactive Physical Installations",
        "Tactile Haptic Architecture",
      ],
    },
    {
      num: "04",
      title: "DESIGN SYSTEMS & ENGINE",
      deliverable: "DELIVERABLE: SCALABLE TOKENS",
      items: [
        "Cross-Platform Token Engines",
        "Component & Micro-Frontend Architecture",
        "Design Ops & Automated QA Pipelines",
        "Accessibility & Performance Audit",
      ],
    },
  ];

  return (
    <section
      className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-24 md:py-32 border-b border-slate-200"
      id="capabilities"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-slate-200 mb-16">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accentBlue block mb-3">
            CORE CAPABILITIES
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tightest text-darkText">
            WHAT WE BUILD
          </h2>
        </div>
        <p className="font-sans text-slate-600 text-base sm:text-lg max-w-md leading-relaxed font-normal">
          We merge brand storytelling, artificial intelligence, and spatial computing to deliver enterprise value for industry leaders.
        </p>
      </div>

      {/* 4-Column Architectural Pillar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between min-h-[420px] ${
              activeTab === idx
                ? "bg-slate-900 text-white border-slate-900 shadow-xl"
                : "bg-slate-50 text-darkText border-slate-200 hover:border-slate-300 hover:bg-slate-100/80"
            }`}
          >
            <div>
              <span
                className={`font-mono text-xs font-bold block mb-6 ${
                  activeTab === idx ? "text-emerald-400" : "text-accentBlue"
                }`}
              >
                {pillar.num} // PILLAR
              </span>
              <h3 className="font-display text-2xl font-extrabold tracking-tight mb-6">
                {pillar.title}
              </h3>
              <ul className="space-y-3 font-sans text-xs uppercase font-medium">
                {pillar.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        activeTab === idx ? "bg-white" : "bg-darkText"
                      }`}
                    />
                    <span className={activeTab === idx ? "text-slate-200" : "text-slate-600"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`pt-6 border-t font-mono text-[10px] uppercase font-bold tracking-wider ${
                activeTab === idx
                  ? "border-slate-800 text-slate-400"
                  : "border-slate-200 text-slate-400"
              }`}
            >
              {pillar.deliverable}
            </div>
          </div>
        ))}
      </div>

      {/* Accordion Specs Dropdown */}
      <div className="border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left select-none bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider font-bold text-darkText">
            <span className="text-accentBlue">++</span>
            <span>TECHNOLOGY STACK &amp; INFRASTRUCTURE</span>
          </div>
          <span
            className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            expand_more
          </span>
        </button>

        {isOpen && (
          <div className="p-6 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                GRAPHICS &amp; 3D ENGINE
              </span>
              <p className="text-darkText font-semibold">WebGPU / Three.js / Metal / Unity</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                ARTIFICIAL INTELLIGENCE
              </span>
              <p className="text-darkText font-semibold">PyTorch / ComfyUI / Custom Fine-Tuning</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                FRONTEND RUNTIME
              </span>
              <p className="text-darkText font-semibold">Next.js / React 19 / WASM / Tailwind</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                SPATIAL &amp; HAPTIC
              </span>
              <p className="text-darkText font-semibold">VisionOS / OSC / Arduino / TouchDesigner</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
