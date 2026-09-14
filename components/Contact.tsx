"use client";

import { useState, FormEvent } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [budget, setBudget] = useState("$100k - $250k");
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("direct@cordinithq.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 py-24 md:py-36"
      id="contact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Headline & Direct Contact */}
        <div className="lg:col-span-6 space-y-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accentBlue block">
            05 // START A PROJECT
          </span>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tightest leading-none text-darkText">
            LET’S CREATE SOMETHING{" "}
            <span className="text-accentBlue underline decoration-slate-200">EXTRAORDINARY.</span>
          </h2>

          <p className="font-sans text-slate-600 text-lg leading-relaxed font-normal">
            Ready to push boundaries? Reach out to schedule a consultation with our global strategy team.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-3 font-mono text-xl sm:text-3xl font-extrabold text-darkText hover:text-accentBlue transition-colors text-left group"
            >
              <span>DIRECT@CORDINITHQ.COM</span>
              <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform">
                content_copy
              </span>
            </button>

            <span
              className={`transition-opacity duration-200 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider bg-darkText text-white font-bold rounded-full shadow-md ${
                copied ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              [ COPIED TO CLIPBOARD ]
            </span>
          </div>

          {/* 4-City Studio Directory */}
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-200 font-mono text-xs">
            <div>
              <span className="text-darkText font-bold block mb-1">NEW YORK HUB</span>
              <p className="text-slate-500">520 W 28th St, Chelsea</p>
              <span className="text-accentBlue font-medium">NYC +1 212 904 3310</span>
            </div>
            <div>
              <span className="text-darkText font-bold block mb-1">AMSTERDAM HQ</span>
              <p className="text-slate-500">Hilversum &amp; City Hub</p>
              <span className="text-accentBlue font-medium">AMS +31 35 621 1600</span>
            </div>
            <div>
              <span className="text-darkText font-bold block mb-1">TOKYO ATELIER</span>
              <p className="text-slate-500">Minato-ku, Minamiaoyama</p>
              <span className="text-accentBlue font-medium">TYO +81 3 5922 8100</span>
            </div>
            <div>
              <span className="text-darkText font-bold block mb-1">LONDON STUDIO</span>
              <p className="text-slate-500">Shoreditch High St</p>
              <span className="text-accentBlue font-medium">LDN +44 20 7401 2200</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Project Inquiry Form */}
        <div className="lg:col-span-6 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
          <h3 className="font-display text-2xl font-extrabold text-darkText mb-6">
            PROJECT INQUIRY FORM
          </h3>

          {submitted ? (
            <div className="py-12 px-6 text-center bg-emerald-50 border border-emerald-200 rounded-2xl">
              <span className="material-symbols-outlined text-5xl text-emerald-600 mb-3 animate-bounce">
                check_circle
              </span>
              <h4 className="font-display text-xl font-bold text-darkText mb-2">
                INQUIRY RECEIVED
              </h4>
              <p className="font-sans text-xs text-slate-600">
                Our executive producer will be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-mono text-xs uppercase font-bold text-slate-600 mb-2">
                  SELECT ESTIMATED BUDGET
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["$50k - $100k", "$100k - $250k", "$250k+"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all border ${
                        budget === b
                          ? "bg-darkText text-white border-darkText shadow"
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase font-bold text-slate-600 mb-2">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accentBlue transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase font-bold text-slate-600 mb-2">
                  WORK EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accentBlue transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase font-bold text-slate-600 mb-2">
                  PROJECT SUMMARY
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your objectives, timeline, and vision..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accentBlue transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-accentBlue text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:bg-blue-600 transition-all hover:shadow-xl"
              >
                SUBMIT INQUIRY -&gt;
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
