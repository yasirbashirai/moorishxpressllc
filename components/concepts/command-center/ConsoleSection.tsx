"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import DispatchConsole from "./DispatchConsole";

const ease = [0.2, 0.8, 0.2, 1] as const;

/** Floating glass chip that orbits the console. */
function Chip({ children, className, delay = 0 }: { children: React.ReactNode; className: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
      viewport={{ once: true }}
      transition={{ opacity: { delay: 0.4 + delay, duration: 0.6 }, scale: { delay: 0.4 + delay, duration: 0.6 }, y: { delay: 1 + delay, duration: 5 + delay, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute z-20 hidden rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-[0_20px_50px_-15px_rgba(12,12,14,0.3)] backdrop-blur-xl xl:block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * The interactive Dispatch Console from Concept B, as its own section
 * directly under the cinematic hero. It tilts in 3D and flattens on scroll.
 */
export default function ConsoleSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.94, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f6f6f8] pb-28 pt-24">
      {/* Mesh gradient glows + fine grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-20 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,74,61,0.22),transparent_65%)] blur-2xl" />
        <div className="absolute -right-40 top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,193,7,0.3),transparent_65%)] blur-2xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(12,12,14,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(12,12,14,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      </div>

      <div className="container-x relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-red shadow-sm ring-1 ring-black/5">
            <span className="h-1.5 w-1.5 rounded-full bg-red" />Instant lane check
          </span>
          <h2 className="mt-5 font-display text-[clamp(2.3rem,5vw,4.2rem)] font-bold uppercase leading-[0.95] tracking-tight text-ink">
            Plan your load <span className="text-red-gradient">in seconds.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-steel">Pick a pickup and delivery city, set the weight, and see the lane and the right truck before you even call.</p>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-5xl [perspective:1600px]">
          <motion.div style={{ rotateX, scale, transformOrigin: "center top" }} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_120deg,rgba(215,20,26,0.25),rgba(255,193,7,0.35),rgba(215,20,26,0.25))] opacity-70 blur-3xl" />
            <DispatchConsole />
          </motion.div>

          <Chip className="-left-36 top-36">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-steel">Every truck</p>
            <p className="font-display text-lg font-semibold uppercase text-ink">Liftgate + air ride</p>
          </Chip>
          <Chip className="-right-32 top-12" delay={0.4}>
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-steel">GVWR up to</p>
            <p className="font-display text-2xl font-bold text-red">33,000 lb</p>
          </Chip>
          <Chip className="-right-36 bottom-24" delay={0.8}>
            <p className="flex items-center gap-2 font-display text-lg font-semibold uppercase text-ink">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" /><span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" /></span>
              24/7 dispatch
            </p>
            <p className="text-xs text-steel">Real people, day and night</p>
          </Chip>
        </div>
      </div>
    </section>
  );
}
