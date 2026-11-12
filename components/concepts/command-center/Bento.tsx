"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { services } from "@/lib/site";

// Bento layout: tile spans per service, in a 6-column grid on desktop
const layout: Record<string, string> = {
  "otr-box-truck-freight": "md:col-span-2 lg:col-span-4 lg:row-span-2",
  "box-truck-dispatch": "lg:col-span-2 lg:row-span-2",
  "palletized-freight-transportation": "lg:col-span-2",
  "partial-truckload-freight": "lg:col-span-2",
  "u-box-container-transportation": "lg:col-span-2",
  "freight-documentation-load-coordination": "md:col-span-2 lg:col-span-6",
};

/** One service tile with pointer-driven 3D tilt and image parallax. */
function Tile({ slug, i }: { slug: string; i: number }) {
  const s = services.find((x) => x.slug === slug)!;
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], reduce ? [0, 0] : [-6, 6]);
  const rotateX = useTransform(sy, [0, 1], reduce ? [0, 0] : [6, -6]);
  const imgX = useTransform(sx, [0, 1], reduce ? [0, 0] : [14, -14]);
  const imgY = useTransform(sy, [0, 1], reduce ? [0, 0] : [10, -10]);
  const glare = useTransform([sx, sy] as never, ([x, y]: number[]) => `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.22), transparent 45%)`);

  const big = slug === "otr-box-truck-freight";
  const wide = slug === "freight-documentation-load-coordination";
  const dispatch = s.group === "dispatch";

  return (
    <motion.div
      className={`[perspective:1200px] ${layout[slug]} ${big ? "min-h-[26rem]" : wide ? "min-h-[16rem]" : "min-h-[19rem]"}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.07, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
        className="group relative h-full overflow-hidden rounded-[1.4rem] bg-ink shadow-[0_24px_60px_-28px_rgba(12,12,14,0.45)]"
      >
        <Link href={`/services/${s.slug}`} className="absolute inset-0 z-30" aria-label={s.title} />
        <motion.div style={{ x: imgX, y: imgY }} className="absolute -inset-6">
          <Image src={s.image} alt={s.imageAlt} fill sizes={big ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, 100vw"} style={{ objectPosition: s.imagePosition }} className="object-cover transition duration-700 group-hover:scale-105" />
        </motion.div>
        <div className={`absolute inset-0 ${wide ? "bg-[linear-gradient(to_right,rgba(12,12,14,0.82)_0%,rgba(12,12,14,0.55)_32%,transparent_58%)]" : "bg-[linear-gradient(to_top,rgba(12,12,14,0.88)_0%,rgba(12,12,14,0.6)_30%,transparent_62%)]"}`} />
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-5 top-5 z-20 flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] backdrop-blur-md ${dispatch ? "bg-white text-red" : "bg-ink/55 text-white ring-1 ring-white/30"}`}>
            {dispatch ? "Dispatch" : "Freight"}
          </span>
        </div>

        <div className={`absolute inset-x-0 bottom-0 z-20 p-6 sm:p-7 ${wide ? "lg:max-w-xl" : ""}`} style={{ transform: "translateZ(40px)" }}>
          <h3 className={`font-display font-bold uppercase leading-[0.95] text-white ${big ? "text-4xl sm:text-5xl" : "text-3xl"}`}>{s.title}</h3>
          <p className={`mt-3 text-sm leading-relaxed text-white/90 ${big || wide ? "max-w-md text-base" : ""}`}>{s.short}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-red transition group-hover:bg-red group-hover:text-white">
            Explore <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Bento() {
  return (
    <div className="grid auto-rows-auto gap-4 md:grid-cols-2 lg:grid-cols-6">
      {Object.keys(layout).map((slug, i) => <Tile key={slug} slug={slug} i={i} />)}
    </div>
  );
}
