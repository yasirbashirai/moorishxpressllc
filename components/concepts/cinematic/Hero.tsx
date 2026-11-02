"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { IconArrow, IconPhone } from "@/components/icons";
import s from "./cinematic.module.css";

const lines = [
  { words: ["WHEN", "YOU", "NEED", "IT"], cls: "text-white" },
  { words: ["THERE", "NOW."], cls: "" },
];

/** Full-viewport cinematic hero: kinetic masked type, headlight beams, rushing road, clipped truck reveal. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const truckX = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  let i = 0;
  return (
    <section ref={ref} className="relative isolate flex min-h-[calc(100svh-100px)] items-center overflow-hidden bg-[#060607] text-white">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,rgba(215,20,26,0.22),transparent_70%)]" />
      <div className={s.roadWrap}>
        <div className={s.road}>
          <div className={`${s.edge} ${s.edgeL}`} />
          <div className={`${s.lane} ${s.laneL}`} />
          <div className={`${s.lane} ${s.laneR}`} />
          <div className={`${s.edge} ${s.edgeR}`} />
        </div>
      </div>
      <div className={`${s.beam} ${s.beamL}`} />
      <div className={`${s.beam} ${s.beamR}`} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#060607] to-transparent" />
      <div className="absolute inset-y-0 left-0 hidden w-[60%] bg-gradient-to-r from-[#060607] via-[#060607]/85 to-transparent lg:block" />
      <div className={s.grain} />

      <div className="container-x relative z-10 grid w-full items-center gap-10 py-20 lg:grid-cols-12">
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3 text-[#ffc107]"
          >
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4a3d]" /><span className="relative h-2 w-2 rounded-full bg-[#ff4a3d]" /></span>
            Atlanta, GA · Box truck carrier + dispatch · 24/7
          </motion.p>

          <h1 className="mt-6 font-display font-bold uppercase leading-[0.86] tracking-tight">
            {lines.map((line, li) => (
              <span key={li} className={`block whitespace-nowrap ${li === 0 ? "text-[11vw] sm:text-6xl xl:text-[4.6rem]" : "text-[18vw] sm:text-[8rem] xl:text-[9.5rem]"}`}>
                {line.words.map((w) => {
                  const d = 0.15 + i++ * 0.09;
                  return (
                    <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-[0.06em] align-bottom last:mr-0">
                      <motion.span
                        className={`inline-block ${line.cls || (w === "THERE" ? "bg-gradient-to-r from-[#d7141a] to-[#ff4a3d] bg-clip-text text-transparent" : "bg-gradient-to-r from-[#ffc107] to-[#ffe066] bg-clip-text text-transparent")}`}
                        initial={reduce ? false : { y: "110%", rotate: 4 }}
                        animate={{ y: "0%", rotate: 0 }}
                        transition={{ duration: 0.9, delay: d, ease: [0.2, 0.8, 0.2, 1] }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Asset-based box truck freight out of Atlanta for shippers and brokers, and box truck and hotshot dispatch for owner-operators. Liftgate and air ride on every truck.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#quote" className="group inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#b30f14] via-[#d7141a] to-[#ff4a3d] px-8 py-4 font-display text-lg font-semibold uppercase tracking-wider shadow-[0_10px_40px_-8px_rgba(215,20,26,0.8)] transition hover:-translate-y-0.5">
                Get a Freight Quote <IconArrow className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <Link href="#dispatch" className="group inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#f2a900] via-[#ffc107] to-[#ffe066] px-8 py-4 font-display text-lg font-semibold uppercase tracking-wider text-[#0c0c0e] shadow-[0_10px_40px_-8px_rgba(255,193,7,0.6)] transition hover:-translate-y-0.5">
                Dispatch My Truck <IconArrow className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </div>
            <a href={site.phoneHref} className="mt-8 inline-flex items-center gap-3 text-white/70 hover:text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur"><IconPhone className="h-5 w-5 text-[#ffc107]" /></span>
              <span><span className="block text-[0.7rem] uppercase tracking-[0.25em] text-white/45">Dispatch answers 24/7</span><span className="font-display text-2xl font-semibold text-white">{site.phone}</span></span>
            </a>
          </motion.div>
        </motion.div>

        {/* Clipped truck reveal */}
        <motion.div
          className="relative lg:col-span-5"
          initial={reduce ? false : { clipPath: "inset(-30% 100% -30% -30%)", x: 60 }}
          animate={{ clipPath: "inset(-30% -30% -30% -30%)", x: 0 }}
          transition={{ duration: 1.3, delay: 0.5, ease: [0.7, 0, 0.2, 1] }}
        >
          <motion.div style={reduce ? undefined : { x: truckX }} className="relative">
            <div className="absolute -inset-6 bg-[radial-gradient(closest-side,rgba(255,193,7,0.35),transparent)] blur-2xl" />
            <div className={`relative overflow-hidden ${s.truckClip}`}>
              <Image src="/images/moorish-box-truck.jpg" alt="Moorish Xpress yellow box truck with tuck-under liftgate" width={1122} height={395} priority className="h-[22rem] w-full scale-110 object-cover object-[20%_50%] sm:h-[28rem]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-[#d7141a]/20" />
            </div>
            <div className="absolute -bottom-5 left-4 flex gap-3 sm:left-10">
              {["26 ft", "33,000 lb GVWR", "Liftgate"].map((t) => (
                <span key={t} className="rounded-sm border border-white/15 bg-black/70 px-3 py-1.5 font-display text-xs uppercase tracking-widest text-[#ffc107] backdrop-blur">{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-white/40 sm:flex">
        Scroll the route
        <span className="h-10 w-px overflow-hidden bg-white/15"><span className="block h-1/2 w-px animate-pulse bg-[#ffc107]" /></span>
      </div>
    </section>
  );
}
