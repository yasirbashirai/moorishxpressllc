"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./editorial.module.css";

const rows: [string, string, string][] = [
  ["GVWR", "33,000 lb", "26,000 lb"],
  ["Driver license", "Class B CDL", "Non-CDL"],
  ["Body", "26 ft box", "Box truck"],
  ["Liftgate", "Tuck-under", "Tuck-under"],
  ["Suspension", "Air ride", "Air ride"],
  ["Best for", "Heavier, denser loads", "Everyday palletized freight"],
];

/** Blueprint-style technical poster for the two truck classes. */
export default function SpecSheet() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ref.current!.querySelectorAll<SVGPathElement>("[data-draw]").forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        });
      });
      gsap.fromTo("[data-dim]", { opacity: 0 }, { opacity: 1, stagger: 0.12, delay: 0.9, scrollTrigger: { trigger: ref.current, start: "top 65%" } });
      gsap.fromTo("[data-row]", { x: -30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, scrollTrigger: { trigger: "[data-table]", start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={`relative overflow-hidden py-24 text-white sm:py-32 ${s.blueprint}`}>
      <div className="mx-auto max-w-[110rem] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.35em] text-gold">Sheet MX-02 · Equipment</p>
            <h2 className="mt-4 font-display text-[14vw] font-bold uppercase leading-[0.85] sm:text-[9vw] lg:text-[7vw]">
              Spec <span className={s.outlineLight}>sheet.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-white/70">Two box truck classes, one standard. Every truck runs a tuck-under liftgate and air-ride suspension.</p>
        </div>

        {/* Truck elevation drawing */}
        <div className="relative mt-14 border-2 border-gold/40 p-4 sm:p-10">
          <span className="absolute left-3 top-3 font-display text-[0.65rem] uppercase tracking-[0.3em] text-gold/70">Side elevation · not to scale</span>
          <span className="absolute right-3 top-3 font-display text-[0.65rem] uppercase tracking-[0.3em] text-gold/70">Moorish Xpress · ATL</span>
          <svg viewBox="0 0 1000 340" className="mt-6 w-full" fill="none" stroke="#ffc107" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Box truck side drawing showing 26 ft box, tuck-under liftgate and air-ride suspension">
            {/* box */}
            <path data-draw d="M300 40 H900 V250 H300 Z" />
            <path data-draw d="M300 60 H900 M300 230 H900" strokeOpacity=".4" />
            {/* cab */}
            <path data-draw d="M300 110 H215 L165 165 L110 180 V250 H300" />
            <path data-draw d="M210 120 L180 160 H260 V120 Z" strokeOpacity=".7" />
            {/* chassis */}
            <path data-draw d="M110 250 H935" />
            {/* liftgate (tucked under) */}
            <path data-draw d="M880 262 H935 V278 H880 Z" stroke="#ff4a3d" />
            {/* wheels */}
            <path data-draw d="M175 280 m-34 0 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" />
            <path data-draw d="M720 280 m-34 0 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" />
            <path data-draw d="M800 280 m-34 0 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" />
            {/* air ride bags */}
            <path data-draw d="M740 250 v-6 a8 8 0 0 1 16 0 v6 M780 250 v-6 a8 8 0 0 1 16 0 v6" stroke="#ff4a3d" />
            {/* dimension: box length */}
            <g data-dim stroke="#ffffff" strokeOpacity=".7" strokeWidth="1.5">
              <path d="M300 20 H900 M300 12 V28 M900 12 V28" />
            </g>
            <text data-dim x="600" y="14" fill="#ffffff" stroke="none" textAnchor="middle" fontSize="18" fontFamily="Oswald, sans-serif" letterSpacing="3">26 FT BOX</text>
            {/* callouts */}
            <g data-dim stroke="#ff4a3d" strokeWidth="1.5"><path d="M935 270 L975 320" /></g>
            <text data-dim x="985" y="334" fill="#ff4a3d" stroke="none" textAnchor="end" fontSize="16" fontFamily="Oswald, sans-serif" letterSpacing="2">TUCK-UNDER LIFTGATE</text>
            <g data-dim stroke="#ff4a3d" strokeWidth="1.5"><path d="M768 236 L640 190" /></g>
            <text data-dim x="630" y="186" fill="#ff4a3d" stroke="none" textAnchor="end" fontSize="16" fontFamily="Oswald, sans-serif" letterSpacing="2">AIR-RIDE SUSPENSION</text>
            <text data-dim x="600" y="160" fill="#ffc107" stroke="none" textAnchor="middle" fontSize="44" fontWeight="700" fontFamily="Oswald, sans-serif" letterSpacing="2" opacity=".9">UP TO 33,000 LB GVWR</text>
          </svg>
        </div>

        {/* Spec table */}
        <div data-table className="mt-10 overflow-hidden border-2 border-gold/40">
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-gold font-display text-sm uppercase tracking-[0.15em] text-ink sm:text-lg">
            <span className="p-3 sm:p-5">Spec</span>
            <span className="border-l-2 border-ink/20 p-3 sm:p-5">CDL Class B</span>
            <span className="border-l-2 border-ink/20 p-3 sm:p-5">Non-CDL</span>
          </div>
          {rows.map(([k, a, b]) => (
            <div key={k} data-row className="grid grid-cols-[1fr_1fr_1fr] border-t border-gold/25 text-sm sm:text-xl">
              <span className="p-3 font-display uppercase tracking-[0.15em] text-white/50 sm:p-5">{k}</span>
              <span className="border-l border-gold/25 p-3 font-display font-semibold uppercase text-white sm:p-5">{a}</span>
              <span className="border-l border-gold/25 p-3 font-display font-semibold uppercase text-white sm:p-5">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
