"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconDoc, IconHeadset, IconShield } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    n: "01",
    title: "Pickup",
    Icon: IconDoc,
    text: "Dispatch confirms the load, matches the right truck, CDL 33,000 lb or non-CDL 26,000 lb, and the driver arrives on time. Dock or no dock, the liftgate handles it.",
    tags: ["Truck matched to weight", "Liftgate pickup", "BOL signed"],
  },
  {
    n: "02",
    title: "In transit",
    Icon: IconHeadset,
    text: "A dedicated truck heads straight for delivery. No terminal hops, no transfers. You get check calls along the way, and dispatch picks up 24/7.",
    tags: ["Dedicated truck", "Check calls", "Air-ride suspension"],
  },
  {
    n: "03",
    title: "Delivered + POD",
    Icon: IconShield,
    text: "Freight comes off the truck safely, liftgate down to ground level if needed. Proof of delivery goes to you fast, so you can close the load.",
    tags: ["Liftgate delivery", "POD sent fast", "Invoice matches rate con"],
  },
];

// Stylised lane: Atlanta (left) to destination (right)
const ROUTE = "M80,300 C220,300 260,140 420,150 S620,320 760,250 S960,90 1120,120";

/**
 * Pinned scroll story: a truck travels the lane while the stage panels change.
 * On small screens or with reduced motion it becomes a simple stacked timeline.
 */
export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const truck = useRef<SVGGElement>(null);
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const p = path.current!;
      const len = p.getTotalLength();
      gsap.set(trail.current, { strokeDasharray: len, strokeDashoffset: len });
      const place = (t: number) => {
        const pt = p.getPointAtLength(t * len);
        const ahead = p.getPointAtLength(Math.min(len, t * len + 2));
        const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
        truck.current?.setAttribute("transform", `translate(${pt.x},${pt.y}) rotate(${angle})`);
      };
      place(0);
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 100px",
        end: "+=2400",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const t = self.progress;
          place(t);
          gsap.set(trail.current, { strokeDashoffset: len * (1 - t) });
          setProgress(t);
          setStage(t < 0.34 ? 0 : t < 0.67 ? 1 : 2);
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-[#0a0a0c] text-white lg:h-[calc(100vh-100px)]">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[#d7141a]/15 blur-[140px]" />

      <div className="container-x relative flex h-full flex-col justify-center py-20 lg:py-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow flex items-center gap-3 text-[#ffc107]"><span className="h-0.5 w-8 bg-current" />The run</p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">From your dock <span className="bg-gradient-to-r from-[#d7141a] to-[#ff4a3d] bg-clip-text text-transparent">to theirs.</span></h2>
          </div>
          {/* Progress meter (desktop) */}
          <div className="hidden w-80 lg:block">
            <div className="flex justify-between font-display text-sm uppercase tracking-widest text-white/50">
              <span>Atlanta, GA</span><span className="text-[#ffc107]">{Math.round(progress * 100)}%</span><span>Delivery</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-[#d7141a] to-[#ffc107]" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="relative mt-4 hidden lg:block">
          <svg viewBox="0 0 1200 380" className="h-[30vh] w-full" aria-hidden="true">
            <path d={ROUTE} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="14" strokeLinecap="round" />
            <path d={ROUTE} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="14 12" />
            <path ref={trail} d={ROUTE} fill="none" stroke="url(#trailGrad)" strokeWidth="6" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 10px rgba(255,74,61,.8))" }} />
            <path ref={path} d={ROUTE} fill="none" stroke="none" />
            <defs>
              <linearGradient id="trailGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#d7141a" />
                <stop offset="1" stopColor="#ffc107" />
              </linearGradient>
            </defs>
            {/* Stops */}
            {[{ x: 80, y: 300, l: "ATLANTA HQ" }, { x: 420, y: 150, l: "PICKUP" }, { x: 760, y: 250, l: "IN TRANSIT" }, { x: 1120, y: 120, l: "DELIVERED" }].map((d, i) => (
              <g key={d.l}>
                <circle cx={d.x} cy={d.y} r="12" fill="#0a0a0c" stroke={progress * 3 >= i ? "#ffc107" : "rgba(255,255,255,.3)"} strokeWidth="3" />
                <text x={d.x} y={d.y + 40} textAnchor="middle" fill={progress * 3 >= i ? "#fff" : "rgba(255,255,255,.4)"} fontSize="16" fontFamily="Oswald, sans-serif" letterSpacing="3">{d.l}</text>
              </g>
            ))}
            {/* Truck marker */}
            <g ref={truck} transform="translate(80,300)">
              <circle r="34" fill="rgba(255,193,7,.18)" />
              <g transform="translate(-22,-14)">
                <rect x="0" y="0" width="30" height="22" rx="2" fill="#ffc107" />
                <path d="M30 6h8l6 7v9H30z" fill="#ffe066" />
                <circle cx="9" cy="24" r="4" fill="#0c0c0e" stroke="#fff" strokeWidth="1.5" />
                <circle cx="36" cy="24" r="4" fill="#0c0c0e" stroke="#fff" strokeWidth="1.5" />
                <rect x="41" y="12" width="5" height="3" fill="#fff" />
              </g>
            </g>
          </svg>
        </div>

        {/* Stage panels: one active on desktop, all stacked on mobile */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {stages.map((st, i) => {
            const active = stage === i;
            return (
              <div
                key={st.n}
                className={`relative overflow-hidden rounded-2xl border p-7 transition-all duration-500 ${active ? "border-[#ffc107]/60 bg-white/[0.07] lg:-translate-y-2" : "border-white/10 bg-white/[0.02] lg:opacity-45"}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl font-bold text-white/10">{st.n}</span>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${active ? "bg-gradient-to-br from-[#d7141a] to-[#ff4a3d]" : "bg-white/10"}`}><st.Icon className="h-6 w-6" /></span>
                </div>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase">{st.title}</h3>
                <p className="mt-3 text-white/65">{st.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {st.tags.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/75">{t}</span>)}
                </div>
                {active && <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#d7141a] to-[#ffc107]" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
