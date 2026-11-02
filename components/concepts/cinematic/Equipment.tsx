"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { trucks } from "@/lib/site";
import { IconCheck } from "@/components/icons";

/** Dramatic equipment reveal: 33,000 counts up at poster scale, then a CDL vs non-CDL face-off. */
export default function Equipment() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const [pick, setPick] = useState<string>("cdl");

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(33000);
    const c = animate(0, 33000, { duration: 2.2, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce]);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(255,193,7,0.12),transparent_70%)]" />
      <div ref={ref} className="container-x relative">
        <p className="eyebrow text-center text-[#ffc107]">Gross vehicle weight rating</p>
        <div className="mt-4 text-center font-display font-bold leading-none tracking-tight">
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-[23vw] text-transparent tabular-nums lg:text-[15rem]">{n.toLocaleString()}</span>
          <span className="ml-2 align-top text-[6vw] text-[#ffc107] lg:text-6xl">LB</span>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/65"
        >
          Our Class B CDL box truck is rated to 33,000 lb, so it legally carries heavier freight than a standard 26,000 lb non-CDL box truck. Both classes run a tuck-under liftgate and air-ride suspension.
        </motion.p>

        {/* Face-off */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-2">
          {trucks.map((t) => {
            const on = pick === t.id;
            const pct = (t.gvwr / 33000) * 100;
            return (
              <button
                key={t.id}
                onMouseEnter={() => setPick(t.id)}
                onClick={() => setPick(t.id)}
                className={`relative overflow-hidden rounded-3xl border p-8 text-left transition-all duration-500 ${on ? "border-[#ffc107]/70 bg-white/[0.07] shadow-[0_30px_80px_-30px_rgba(255,193,7,0.45)]" : "border-white/10 bg-white/[0.02]"}`}
              >
                <p className={`eyebrow ${t.id === "cdl" ? "text-[#ff4a3d]" : "text-white/50"}`}>{t.badge}</p>
                <h3 className="mt-2 font-display text-3xl font-bold uppercase">{t.name}</h3>
                <p className="mt-3 font-display text-6xl font-bold text-[#ffc107]">{t.gvwr.toLocaleString()}<span className="ml-1 text-2xl text-white/60">lb</span></p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-[#d7141a] to-[#ffc107]" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }} />
                </div>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {t.specs.map((x) => <li key={x} className="flex items-center gap-2 text-sm text-white/80"><IconCheck className="h-4 w-4 text-[#ffc107]" />{x}</li>)}
                </ul>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
