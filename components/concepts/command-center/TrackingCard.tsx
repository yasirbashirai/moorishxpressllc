"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const steps = [
  { t: "Booked", d: "Rate confirmed, truck assigned", time: "08:12" },
  { t: "Picked up", d: "Loaded with liftgate · BOL signed", time: "10:40" },
  { t: "In transit", d: "Check call sent to you", time: "14:05" },
  { t: "Delivered + POD", d: "Proof of delivery emailed", time: "19:30" },
];

/** Demo tracking card: cycles through shipment updates while visible. */
export default function TrackingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1600); // 5 = brief pause on "all done"
    return () => clearInterval(id);
  }, [inView, reduce]);

  const active = Math.min(step, 3);
  const pct = (active / 3) * 100;

  return (
    <div ref={ref} className="relative rounded-[1.4rem] border border-black/5 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(12,12,14,0.35)] sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-steel">Shipment · example</p>
          <p className="mt-1 font-display text-2xl font-semibold uppercase text-ink">ATL → CLT</p>
        </div>
        <span className="rounded-full bg-blush px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-red">Demo</span>
      </div>

      {/* Progress rail */}
      <div className="relative mt-6 h-2 rounded-full bg-fog">
        <motion.div className="absolute inset-y-0 left-0 rounded-full bg-red-gradient" animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }} />
        <motion.div className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-4 border-white bg-red shadow-lg" animate={{ left: `calc(${pct}% - 10px)` }} transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }} />
      </div>

      <ol className="mt-7 space-y-1">
        {steps.map((s, i) => {
          const done = i <= active;
          return (
            <li key={s.t} className={`flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-500 ${i === active ? "bg-red/5" : ""}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${done ? "border-red bg-red-gradient text-white" : "border-line bg-white text-steel"}`}>
                {done ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[3]"><path d="m5 12 5 5L20 7" /></svg>
                ) : (
                  <span className="text-xs font-bold">{i + 1}</span>
                )}
              </span>
              <span className="flex-1">
                <span className={`block font-display text-base font-semibold uppercase tracking-wide ${done ? "text-ink" : "text-steel/70"}`}>{s.t}</span>
                <span className="block text-sm text-steel">{s.d}</span>
              </span>
              <span className={`font-mono text-xs ${done ? "text-ink" : "text-steel/50"}`}>{s.time}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 border-t border-line pt-4 text-xs text-steel">Illustration of the updates you receive on every load. Times shown are an example.</p>
    </div>
  );
}
