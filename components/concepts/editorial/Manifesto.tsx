"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./editorial.module.css";

const text =
  "We own the trucks. We answer the phone. We tell you the truth about what fits. Asset-based, Atlanta-built, and running freight across the Southeast, South, Midwest and Northeast.";

/** Scroll-scrubbed manifesto: words ink in one by one as you scroll. */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.fromTo("[data-tag]", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const highlight = new Set(["trucks.", "phone.", "truth", "Asset-based,", "Atlanta-built,"]);

  return (
    <section ref={ref} className={`relative overflow-hidden bg-white py-24 sm:py-36 ${s.grain}`}>
      <div className="mx-auto max-w-[110rem] px-4 sm:px-8">
        <div data-tag className="flex items-center gap-4 font-display text-sm uppercase tracking-[0.3em] text-red">
          <span className="h-1 w-12 bg-red" />The Moorish Xpress standard
        </div>
        <p className="mt-10 font-display text-[9vw] font-bold uppercase leading-[0.95] text-ink sm:text-[6.2vw] lg:text-[5.2vw]">
          {text.split(" ").map((w, i) => (
            <span key={i} data-w className={`inline-block pr-[0.25em] ${highlight.has(w) ? "text-red" : ""}`}>
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
