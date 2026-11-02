"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Thin red-to-yellow progress bar pinned under the header that fills as the
 * page scrolls (GSAP ScrollTrigger scrub).
 */
export default function ScrollRail() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !bar.current) return;
    const tween = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 } }
    );
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div ref={bar} className="h-full origin-left bg-[linear-gradient(90deg,#d7141a,#ff4a3d,#ffc107)]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
