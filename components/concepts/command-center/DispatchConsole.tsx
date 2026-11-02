"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { truckFit } from "@/components/forms";

/** Preset cities on the lanes we run (lat/lon for the mini-map and distance estimate). */
export const cities = [
  { name: "Atlanta, GA", lat: 33.75, lon: -84.39 },
  { name: "Savannah, GA", lat: 32.08, lon: -81.09 },
  { name: "Birmingham, AL", lat: 33.52, lon: -86.8 },
  { name: "Charlotte, NC", lat: 35.23, lon: -80.84 },
  { name: "Columbia, SC", lat: 34.0, lon: -81.03 },
  { name: "Nashville, TN", lat: 36.16, lon: -86.78 },
  { name: "Memphis, TN", lat: 35.15, lon: -90.05 },
  { name: "Jacksonville, FL", lat: 30.33, lon: -81.66 },
  { name: "Orlando, FL", lat: 28.54, lon: -81.38 },
  { name: "Dallas, TX", lat: 32.78, lon: -96.8 },
  { name: "Houston, TX", lat: 29.76, lon: -95.37 },
  { name: "Oklahoma City, OK", lat: 35.47, lon: -97.52 },
  { name: "Richmond, VA", lat: 37.54, lon: -77.44 },
  { name: "Philadelphia, PA", lat: 39.95, lon: -75.17 },
  { name: "New York, NY", lat: 40.71, lon: -74.0 },
  { name: "Columbus, OH", lat: 39.96, lon: -82.99 },
  { name: "Indianapolis, IN", lat: 39.77, lon: -86.16 },
  { name: "Chicago, IL", lat: 41.88, lon: -87.63 },
];

// Simple equirectangular projection into the 400 x 260 mini-map
const proj = (lon: number, lat: number) => ({ x: ((lon + 99) / 27) * 380 + 10, y: ((43 - lat) / 16) * 240 + 10 });

/** Great-circle miles x 1.2 road factor: a rough planning estimate, not a routed distance. */
function roadMiles(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 3958.8;
  const toR = (d: number) => (d * Math.PI) / 180;
  const dLat = toR(b.lat - a.lat);
  const dLon = toR(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 1.2);
}

export default function DispatchConsole() {
  const reduce = useReducedMotion();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(9);
  const [weight, setWeight] = useState(12000);

  const a = cities[from];
  const b = cities[to];
  const pa = proj(a.lon, a.lat);
  const pb = proj(b.lon, b.lat);
  const miles = from === to ? 0 : roadMiles(a, b);
  const driveHrs = Math.max(1, Math.round(miles / 50));
  const fit = truckFit(weight);
  const isCdl = weight > 10000;

  // Curved route: control point lifted above the midpoint
  const path = useMemo(() => {
    const mx = (pa.x + pb.x) / 2;
    const my = (pa.y + pb.y) / 2 - Math.min(70, Math.hypot(pb.x - pa.x, pb.y - pa.y) * 0.3);
    return `M${pa.x},${pa.y} Q${mx},${my} ${pb.x},${pb.y}`;
  }, [pa.x, pa.y, pb.x, pb.y]);

  const goQuote = () => document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });

  const select =
    "w-full appearance-none rounded-xl border border-black/10 bg-white/90 px-3.5 py-3 text-sm font-semibold text-ink shadow-sm outline-none transition focus:border-red focus:ring-4 focus:ring-red/10";

  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/75 shadow-[0_40px_120px_-30px_rgba(12,12,14,0.35),0_0_0_1px_rgba(12,12,14,0.04)] backdrop-blur-2xl">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-black/5 bg-white/60 px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <p className="font-display text-[0.72rem] font-medium uppercase tracking-[0.25em] text-steel">Moorish Xpress · Dispatch Console</p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-700">
          <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" /><span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" /></span>
          24/7
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.05fr_1fr]">
        {/* Inputs */}
        <div className="space-y-4 p-5 sm:p-6">
          <p className="font-display text-xl font-semibold uppercase tracking-wide text-ink">Instant lane check</p>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-wider text-steel"><span className="h-2 w-2 rounded-full bg-red" />Pickup</span>
            <select aria-label="Pickup city" className={select} value={from} onChange={(e) => setFrom(Number(e.target.value))}>
              {cities.map((c, i) => <option key={c.name} value={i}>{c.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-wider text-steel"><span className="h-2 w-2 rounded-full bg-gold" />Delivery</span>
            <select aria-label="Delivery city" className={select} value={to} onChange={(e) => setTo(Number(e.target.value))}>
              {cities.map((c, i) => <option key={c.name} value={i}>{c.name}</option>)}
            </select>
          </label>

          <div className="rounded-xl border border-black/5 bg-fog/80 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.68rem] font-bold uppercase tracking-wider text-steel">Load weight</span>
              <span className="font-display text-2xl font-semibold text-ink">{weight.toLocaleString()} <span className="text-sm text-steel">lb</span></span>
            </div>
            <input aria-label="Load weight in pounds" type="range" min={1000} max={20000} step={500} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="mt-3 w-full" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { on: !isCdl, t: "Non-CDL", s: "26,000 lb GVWR" },
                { on: isCdl, t: "CDL Class B", s: "33,000 lb GVWR" },
              ].map((x) => (
                <div key={x.t} className={`rounded-lg border px-3 py-2 transition-all duration-300 ${x.on ? "border-red bg-white shadow-md shadow-red/10" : "border-transparent bg-white/50 opacity-55"}`}>
                  <p className={`font-display text-sm font-semibold uppercase ${x.on ? "text-red" : "text-steel"}`}>{x.t}</p>
                  <p className="text-[0.68rem] text-steel">{x.s}</p>
                </div>
              ))}
            </div>
            {fit && <p className="mt-3 text-xs leading-snug text-graphite"><span className="font-semibold">{fit.truck}.</span> {fit.note}</p>}
          </div>
        </div>

        {/* Map + readout */}
        <div className="relative border-t border-black/5 bg-gradient-to-br from-[#fbfbfc] to-[#f1f2f5] p-5 sm:p-6 md:border-l md:border-t-0">
          <div className="relative overflow-hidden rounded-xl border border-black/5 bg-white">
            <svg viewBox="0 0 400 260" className="block h-auto w-full" role="img" aria-label={`Route from ${a.name} to ${b.name}`}>
              <defs>
                <pattern id="cc-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.1" fill="rgba(12,12,14,0.12)" /></pattern>
                <linearGradient id="cc-route" x1="0" x2="1"><stop offset="0" stopColor="#d7141a" /><stop offset="1" stopColor="#ffc107" /></linearGradient>
              </defs>
              <rect width="400" height="260" fill="url(#cc-dots)" />
              {cities.map((c) => {
                const p = proj(c.lon, c.lat);
                return <circle key={c.name} cx={p.x} cy={p.y} r={2.4} fill="#9a9ea8" />;
              })}
              <path d={path} fill="none" stroke="rgba(12,12,14,0.08)" strokeWidth={6} strokeLinecap="round" />
              <motion.path
                key={path}
                d={path}
                fill="none"
                stroke="url(#cc-route)"
                strokeWidth={3.5}
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
              />
              {/* Faint region labels for orientation */}
              {[
                { t: "MIDWEST", x: 200, y: 40 },
                { t: "NORTHEAST", x: 330, y: 22 },
                { t: "SOUTHEAST", x: 290, y: 205 },
                { t: "TEXAS & SOUTH", x: 40, y: 215 },
              ].map((r) => (
                <text key={r.t} x={r.x} y={r.y} fontSize="9" fontWeight="700" letterSpacing="2" fill="rgba(12,12,14,0.18)" fontFamily="Oswald, sans-serif">{r.t}</text>
              ))}
              {/* Endpoint labels */}
              {[{ p: pa, c: a }, { p: pb, c: b }].map(({ p, c }, i) => (
                <g key={`lbl-${i}`}>
                  <rect x={Math.min(p.x + 10, 330)} y={p.y - 22} width={c.name.split(",")[0].length * 6.4 + 14} height={17} rx={8.5} fill={i ? "#0c0c0e" : "#d7141a"} />
                  <text x={Math.min(p.x + 10, 330) + 7} y={p.y - 10} fontSize="10" fontWeight="700" fill={i ? "#ffc107" : "#fff"} fontFamily="Inter, sans-serif">{c.name.split(",")[0]}</text>
                </g>
              ))}
              <circle cx={pa.x} cy={pa.y} r={7} fill="#d7141a" stroke="#fff" strokeWidth={2.5} />
              <circle cx={pb.x} cy={pb.y} r={7} fill="#ffc107" stroke="#0c0c0e" strokeWidth={2} />
              {!reduce && from !== to && (
                <circle r={4} fill="#0c0c0e">
                  <animateMotion key={path} dur="2.6s" repeatCount="indefinite" path={path} />
                </circle>
              )}
            </svg>
            <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-steel shadow-sm">Lane preview</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[0.62rem] font-bold uppercase tracking-wider text-steel">Est. road miles</p>
              <AnimatePresence mode="wait">
                <motion.p key={miles} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="font-display text-3xl font-semibold text-ink">
                  {miles ? `~${miles.toLocaleString()}` : "Local"}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-[0.62rem] font-bold uppercase tracking-wider text-steel">Est. drive time</p>
              <p className="font-display text-3xl font-semibold text-ink">{miles ? `~${driveHrs} hrs` : "Same day"}</p>
            </div>
          </div>
          <p className="mt-2 text-[0.65rem] leading-snug text-steel">Straight-line estimate for planning only. Dispatch confirms the real route, timing and rate.</p>

          <button type="button" onClick={goQuote} className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-gradient px-5 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-red/30 transition hover:-translate-y-0.5 hover:shadow-red/50">
            Request this quote
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
