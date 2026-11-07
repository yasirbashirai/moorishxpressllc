"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { site } from "@/lib/site";
import s from "./editorial.module.css";

const ease = [0.2, 0.8, 0.2, 1] as const;

/** Rubber-stamp badge that slams onto the page. */
function Stamp({ children, className, rotate, delay, tone = "red" }: { children: React.ReactNode; className: string; rotate: number; delay: number; tone?: "red" | "ink" | "gold" }) {
  const reduce = useReducedMotion();
  const color = tone === "red" ? "text-red bg-[#f4f1ea]/95" : tone === "gold" ? "text-gold bg-ink" : "text-ink bg-gold";
  return (
    <motion.div
      className={`absolute z-30 ${className}`}
      style={{ z: 140 }}
      initial={reduce ? false : { scale: 2.6, opacity: 0, rotate: rotate - 18 }}
      animate={{ scale: 1, opacity: 1, rotate }}
      transition={{ delay, type: "spring", stiffness: 520, damping: 18, mass: 0.9 }}
    >
      <div className={`${s.stamp} ${tone === "gold" ? s.stampLight : ""} ${color} px-3 py-1.5 text-center leading-none sm:px-4 sm:py-2`}>{children}</div>
    </motion.div>
  );
}

/** Mega-type poster hero with a tilting, frame-breaking truck photo. */
export default function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 16 });
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-26, 26]), { stiffness: 90, damping: 18 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), { stiffness: 90, damping: 18 });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), { stiffness: 90, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const line = (delay: number) => ({
    initial: reduce ? false : { y: "105%" },
    animate: { y: "0%" },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }} className={`relative overflow-hidden bg-[#f4f1ea] text-ink ${s.grain}`}>
      {/* Meta strip */}
      <div className="relative z-20 border-b-2 border-ink">
        <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-4 px-4 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] sm:px-8 sm:text-xs">
          <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full bg-red ${s.blink}`} />Dispatch live 24/7</span>
          <span className="hidden md:block">Atlanta, Georgia · 33.75° N 84.39° W</span>
          <span className="hidden sm:block">Carrier + Dispatch</span>
          <span>Issue Nº 01</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-[110rem] px-4 pb-10 pt-6 sm:px-8 lg:pb-14">
        {/* Mega type */}
        <h1 className={`${s.mega} relative z-10 select-none`} aria-label="When you need it there now">
          <span className="block overflow-hidden"><motion.span className="block text-[19vw] lg:text-[13.2vw]" {...line(0.05)}>When you</motion.span></span>
          <span className="block overflow-hidden"><motion.span className={`block text-[19vw] lg:text-[13.2vw] ${s.outline}`} {...line(0.15)}>Need it</motion.span></span>
          <span className="mt-[1vw] flex flex-wrap items-stretch gap-[1.2vw] overflow-hidden">
            <motion.span className="block bg-red-gradient px-[1.4vw] pt-[0.6vw] text-[19vw] text-white lg:text-[13.2vw]" {...line(0.25)}>There</motion.span>
            <motion.span className="block bg-ink px-[1.4vw] pt-[0.6vw] text-[19vw] text-gold lg:text-[13.2vw]" {...line(0.35)}>Now.</motion.span>
          </span>
        </h1>

        {/* Frame-breaking truck (desktop overlays the type, mobile sits below) */}
        <div className="relative mt-10 h-[56vw] lg:absolute lg:right-8 lg:top-8 lg:z-20 lg:mt-0 lg:h-[22vw] lg:w-[39vw]" style={{ perspective: 1200 }}>
          <motion.div className="relative h-full w-full" style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
            {/* The frame */}
            <div className="absolute inset-[6%] border-[6px] border-ink bg-gold" style={{ transform: "translateZ(-40px)" }} />
            <div className={`absolute inset-[6%] ${s.hazard} opacity-90`} style={{ transform: "translateZ(-60px) translate(18px, 18px)" }} />
            {/* The photo, offset so the cab breaks out past the frame */}
            <motion.div
              className="absolute inset-y-[14%] -left-[4%] right-[10%] overflow-hidden shadow-[0_40px_80px_-20px_rgba(12,12,14,0.55)]"
              style={{ x: px, y: py, z: 60 }}
              initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.2, delay: 0.5, ease }}
            >
              <Image src="/images/moorish-box-truck.jpg" alt="Moorish Xpress yellow 26 ft box truck with liftgate at an Atlanta warehouse" fill priority sizes="(min-width:1024px) 40vw, 100vw" className="scale-110 object-cover object-[30%_60%]" />
            </motion.div>
            <motion.p style={{ x: tx }} className="absolute bottom-0 right-[10%] translate-y-1/2 bg-ink px-3 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.3em] text-white sm:text-xs">
              Fig. 01 · Our truck · ATL
            </motion.p>
            <Stamp className="-top-2 left-[2%] text-lg sm:text-2xl lg:left-[4%] lg:-top-[2%]" rotate={-12} delay={1.1}>33,000 lb<br /><span className="text-[0.55em] tracking-[0.3em]">GVWR · CDL B</span></Stamp>
            <Stamp className="-bottom-4 left-[10%] text-base sm:text-xl lg:-bottom-[34%] lg:left-auto lg:right-[3%]" rotate={7} delay={1.35} tone="ink">Liftgate + air ride</Stamp>
            <Stamp className="right-[2%] top-[38%] text-3xl sm:text-5xl lg:-right-[3%] lg:top-[30%]" rotate={-6} delay={1.6} tone="red">24/7</Stamp>
          </motion.div>

        </div>

        {/* Lede + CTAs */}
        <div className="relative z-20 mt-14 grid items-end gap-8 border-t-2 border-ink pt-8 lg:mt-12 lg:grid-cols-12">
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-graphite lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
          >
            <strong className="font-semibold text-ink">Moorish Xpress, LLC</strong> is an asset-based box truck carrier in Atlanta. We haul OTR, palletized and partial truckload freight, and we dispatch box trucks and hotshots for owner-operators.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3 lg:col-span-7 lg:justify-end"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease }}
          >
            <Link href="/contact#quote" className="group inline-flex items-center gap-3 bg-red-gradient px-7 py-5 font-display text-lg font-semibold uppercase tracking-wider text-white shadow-[6px_6px_0_#0c0c0e] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0c0c0e]">
              Get a Freight Quote <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/dispatch#signup" className="group inline-flex items-center gap-3 bg-gold-gradient px-7 py-5 font-display text-lg font-semibold uppercase tracking-wider text-ink shadow-[6px_6px_0_#0c0c0e] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_#0c0c0e]">
              Dispatch My Truck <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a href={site.phoneHref} className="ml-1 font-display text-2xl font-semibold tracking-wide underline decoration-red decoration-4 underline-offset-8 hover:text-red">
              {site.phone}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
