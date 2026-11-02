"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";
import DispatchConsole from "./DispatchConsole";

const ease = [0.2, 0.8, 0.2, 1] as const;

/** Floating glass chip that orbits the console. */
function Chip({ children, className, delay = 0 }: { children: React.ReactNode; className: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ opacity: { delay: 0.8 + delay, duration: 0.6 }, scale: { delay: 0.8 + delay, duration: 0.6 }, y: { delay: 1.4 + delay, duration: 5 + delay, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute z-20 hidden rounded-2xl border border-white/80 bg-white/70 px-4 py-3 shadow-[0_20px_50px_-15px_rgba(12,12,14,0.3)] backdrop-blur-xl xl:block ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Console starts tilted in 3D and flattens as you scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [reduce ? 0 : 12, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [reduce ? 1 : 0.96, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f6f6f8] pb-24 pt-14 sm:pt-20">
      {/* Mesh gradient glows + fine grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,74,61,0.28),transparent_65%)] blur-2xl" />
        <div className="absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,193,7,0.35),transparent_65%)] blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(215,20,26,0.12),transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(12,12,14,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(12,12,14,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      </div>

      <div className="container-x relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="mx-auto max-w-4xl text-center">
          <Link href="/dispatch" className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 py-1.5 pl-1.5 pr-4 text-sm font-medium text-graphite shadow-sm backdrop-blur transition hover:border-red/30">
            <span className="rounded-full bg-gold-gradient px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-ink">New</span>
            Box truck & hotshot dispatch now open
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <h1 className="mt-7 font-display text-[clamp(2.9rem,8vw,6.6rem)] font-bold uppercase leading-[0.92] tracking-tight text-ink">
            When you need it
            <br />
            <span className="relative inline-block">
              <span className="text-red-gradient">there</span>{" "}
              <span className="bg-[linear-gradient(120deg,#e0a100,#ffc107_50%,#f2a900)] bg-clip-text text-transparent">now.</span>
              <motion.svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-4 w-full" initial={{ pathLength: 0 }} aria-hidden="true">
                <motion.path d="M4 14 C 80 4, 200 4, 296 12" fill="none" stroke="#ffc107" strokeWidth="6" strokeLinecap="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.9, ease }} />
              </motion.svg>
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-steel sm:text-xl">
            An asset-based box truck carrier in Atlanta, Georgia. We haul OTR, first mile, last mile and white glove freight, and we dispatch box trucks and hotshots for owner-operators.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#quote" className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-gradient px-7 py-4 font-display text-base font-semibold uppercase tracking-wider text-white shadow-[0_14px_40px_-10px_rgba(215,20,26,0.6)] transition hover:-translate-y-0.5 sm:w-auto">
              Get a Freight Quote <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#dispatch" className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-7 py-4 font-display text-base font-semibold uppercase tracking-wider text-ink shadow-[0_14px_40px_-12px_rgba(255,193,7,0.7)] transition hover:-translate-y-0.5 sm:w-auto">
              Dispatch My Truck <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
          <p className="mt-5 text-sm text-steel">
            Dispatch answers 24/7 · <a href={site.phoneHref} className="font-semibold text-ink underline decoration-red/40 underline-offset-4 hover:decoration-red">{site.phone}</a>
          </p>
        </motion.div>

        {/* Console with orbiting chips */}
        <div className="relative mx-auto mt-16 max-w-5xl [perspective:1600px]">
          <motion.div style={{ rotateX, scale, transformOrigin: "center top" }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9, ease }}>
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
