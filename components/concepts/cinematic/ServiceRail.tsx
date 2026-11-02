"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/site";
import { IconArrow } from "@/components/icons";
import s from "./cinematic.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal service rail. Vertical scroll drives the cards sideways on desktop;
 * on mobile it is a native swipeable snap carousel.
 */
export default function ServiceRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 64;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 100px", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-[#060607] py-20 text-white lg:flex lg:h-[calc(100vh-100px)] lg:flex-col lg:justify-center lg:py-0">
      <div className="container-x flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow flex items-center gap-3 text-[#ffc107]"><span className="h-0.5 w-8 bg-current" />Six services · Two sides of the road</p>
          <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
            We haul it. <span className={s.outline}>We dispatch it.</span>
          </h2>
        </div>
        <p className="max-w-sm text-white/55">Carrier services for shippers and brokers, dispatch services for owner-operators. Same team, same standards.</p>
      </div>

      <div className="mt-10 overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div ref={track} className="flex w-max snap-x snap-mandatory gap-5 px-4 sm:px-6 lg:snap-none lg:px-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {services.map((sv, i) => {
            const dispatch = sv.group === "dispatch";
            return (
              <Link
                key={sv.slug}
                href={`/services/${sv.slug}`}
                className={`group relative h-[30rem] w-[82vw] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[26rem] lg:h-[54vh] lg:w-[30rem] ${s.sweepHost}`}
              >
                <Image src={sv.image} alt={sv.imageAlt} fill sizes="(min-width:1024px) 30rem, 82vw" className="object-cover transition duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                <div className={s.sweep} />
                <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                  <span className={`rounded-sm px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-widest ${dispatch ? "bg-[#ffc107] text-[#0c0c0e]" : "bg-[#d7141a] text-white"}`}>
                    {dispatch ? "Dispatch" : "Carrier"}
                  </span>
                  <span className="font-display text-5xl font-bold text-white/25">0{i + 1}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-4xl font-bold uppercase leading-none">{sv.title}</h3>
                  <p className="mt-3 text-white/75">{sv.short}</p>
                  <span className={`mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-widest ${dispatch ? "text-[#ffc107]" : "text-[#ff4a3d]"}`}>
                    Explore <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
                <span className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition duration-500 group-hover:scale-x-100 ${dispatch ? "bg-[#ffc107]" : "bg-[#d7141a]"}`} />
              </Link>
            );
          })}
          {/* End card */}
          <div className="flex h-[30rem] w-[82vw] shrink-0 snap-start flex-col justify-end rounded-3xl bg-gradient-to-br from-[#b30f14] via-[#d7141a] to-[#ff4a3d] p-8 sm:w-[26rem] lg:h-[54vh] lg:w-[26rem]">
            <p className="font-display text-5xl font-bold uppercase leading-[0.95]">Not sure which fits?</p>
            <p className="mt-4 text-white/85">Tell us about the load or the truck. We will point you to the right service.</p>
            <Link href="#quote" className="mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-black px-6 py-3.5 font-display font-semibold uppercase tracking-wider">
              Talk to dispatch <IconArrow className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
