"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { services } from "@/lib/site";
import s from "./editorial.module.css";

/** Editorial numbered index of all 6 services. A photo follows the cursor on hover. */
export default function ServiceIndex() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26 });
  const sy = useSpring(y, { stiffness: 260, damping: 26 });

  return (
    <section className="relative bg-[#f4f1ea] py-24 sm:py-32">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-6 border-b-4 border-ink pb-8 lg:flex-row lg:items-end">
          <h2 className="font-display text-[15vw] font-bold uppercase leading-[0.82] text-ink sm:text-[11vw] lg:text-[8.5vw]">
            The <span className="text-red">Index.</span>
          </h2>
          <p className="max-w-md text-lg text-graphite">Six services, two sides of the business. Four carrier services with our own trucks, two dispatch services for owner-operators.</p>
        </div>

        <ul
          className="relative"
          onMouseMove={(e) => { x.set(e.clientX); y.set(e.clientY); }}
          onMouseLeave={() => setActive(null)}
        >
          {services.map((sv, i) => (
            <li key={sv.slug} onMouseEnter={() => setActive(i)} className={`${s.row} relative border-b-2 border-ink`}>
              <Link href={`/services/${sv.slug}`} className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden py-6 sm:gap-8 sm:py-8">
                <span className={`${s.rowFill} absolute inset-0 -z-0 ${sv.group === "dispatch" ? "bg-ink" : "bg-red-gradient"}`} />
                <span className={`${s.rowNum} relative font-display text-2xl font-semibold text-red sm:text-4xl`}>0{i + 1}</span>
                <span className="relative min-w-0">
                  <span className={`${s.rowTitle} block font-display text-4xl font-bold uppercase leading-none text-ink sm:text-6xl lg:text-7xl`}>{sv.title}</span>
                  <span className={`${s.rowMeta} mt-2 block text-sm uppercase tracking-[0.2em] text-steel`}>
                    {sv.group === "dispatch" ? "Dispatch" : "Carrier"} · {sv.keyword}
                  </span>
                </span>
                <span className={`${s.rowArrow} relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink font-display text-2xl text-ink sm:h-16 sm:w-16`}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview (desktop) */}
      <motion.div className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block" style={{ x: sx, y: sy }}>
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={services[active].slug}
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: active % 2 ? 4 : -4 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative -ml-[170px] -mt-[230px] h-[220px] w-[340px] overflow-hidden border-4 border-ink shadow-[12px_12px_0_#0c0c0e]"
            >
              <Image src={services[active].image} alt="" fill sizes="340px" className="object-cover" />
              <span className="absolute left-0 top-0 bg-gold px-2 py-1 font-display text-xs uppercase tracking-widest text-ink">0{active + 1}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
