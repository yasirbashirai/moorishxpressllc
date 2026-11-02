"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";
import s from "./editorial.module.css";

/** "Let's connect. Let's talk freight." collage built around Jude's flyer. */
export default function FlyerCollage() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const r1 = useTransform(scrollYProgress, [0, 1], reduce ? [-4, -4] : [-14, 6]);
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 90]);
  const r2 = useTransform(scrollYProgress, [0, 1], reduce ? [6, 6] : [12, -2]);

  return (
    <section ref={ref} className={`relative overflow-hidden bg-gold-gradient py-24 sm:py-32 ${s.grain}`}>
      <div className="mx-auto grid max-w-[110rem] items-center gap-16 px-4 sm:px-8 lg:grid-cols-2">
        <div className="relative z-10">
          <h2 className="font-display text-[17vw] font-bold uppercase leading-[0.9] text-ink sm:text-[11vw] lg:text-[7.4vw]">
            Let&apos;s<br />connect.<br /><span className="my-[0.08em] inline-block bg-red px-[0.12em] pt-[0.04em] leading-[0.95] text-white">Let&apos;s talk</span><br />freight.
          </h2>
          <p className="mt-8 max-w-md text-lg text-ink/80">Have box truck freight on your board? Let&apos;s talk lanes and carrier setup. Call, email or send a quote request.</p>
          <div className="mt-8 flex flex-col gap-2 font-display text-2xl font-semibold uppercase sm:text-3xl">
            <a href={site.phoneHref} className="w-fit underline decoration-red decoration-4 underline-offset-8 hover:text-red">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="w-fit break-all text-xl normal-case hover:text-red sm:text-2xl">{site.email}</a>
          </div>
          <Link href="/contact#quote" className="group mt-10 inline-flex items-center gap-3 bg-ink px-7 py-5 font-display text-lg font-semibold uppercase tracking-wider text-gold shadow-[6px_6px_0_#d7141a] transition hover:-translate-y-0.5">
            Request carrier setup <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="relative mx-auto h-[560px] w-full max-w-[560px] sm:h-[680px]">
          {/* tape strips */}
          <motion.div style={{ rotate: r2, y: y2 }} className="absolute right-0 top-6 w-[58%] border-[6px] border-white bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[4/3]">
              <Image src="/images/first-mile-dock-pickup.jpg" alt="Trucks at a loading dock" fill sizes="320px" className="object-cover grayscale contrast-125" />
            </div>
            <p className="bg-white pt-2 font-display text-xs uppercase tracking-[0.25em] text-ink">Dock · First mile</p>
          </motion.div>
          <motion.div style={{ rotate: r1, y: y1 }} className="absolute bottom-0 left-0 w-[70%] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)]">
            <div className="absolute -top-4 left-1/2 z-10 h-8 w-32 -translate-x-1/2 rotate-[-4deg] bg-white/70 backdrop-blur-sm" />
            <Image src="/images/flyer-lets-talk-freight.jpg" alt="Moorish Xpress flyer: Let's connect. Let's talk freight. 26 ft box trucks, 33,000 lb GVWR" width={1122} height={1402} className="h-auto w-full border-[6px] border-white" />
          </motion.div>
          <div className={`absolute left-[52%] top-[44%] z-20 flex h-32 w-32 items-center justify-center rounded-full bg-red text-white shadow-2xl sm:h-40 sm:w-40`}>
            <svg viewBox="0 0 200 200" className={`absolute inset-0 h-full w-full ${s.spin}`} aria-hidden="true">
              <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
              <text fontSize="17" fontFamily="Oswald, sans-serif" letterSpacing="4" fill="#fff"><textPath href="#circ">WHEN YOU NEED IT THERE NOW · ATLANTA GA · </textPath></text>
            </svg>
            <span className="font-display text-3xl font-bold">24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
