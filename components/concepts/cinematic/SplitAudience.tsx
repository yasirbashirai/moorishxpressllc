"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconArrow, IconCheck } from "@/components/icons";

const sides = [
  {
    id: "ship",
    kicker: "I have freight",
    title: "Shippers & brokers",
    text: "Book a carrier, not a middleman. Our own box trucks, a direct line to dispatch, and equipment you know before pickup.",
    bullets: ["Direct carrier out of Atlanta", "CDL 33,000 lb + non-CDL box trucks", "Carrier setup packet ready for brokers"],
    cta: { href: "#quote", label: "Get a freight quote" },
    image: "/images/first-mile-dock-pickup.jpg",
    alt: "Trucks at a warehouse dock for shippers",
    tone: "red" as const,
  },
  {
    id: "drive",
    kicker: "I own a truck",
    title: "Owner-operators",
    text: "Box truck and hotshot dispatch from a carrier that runs the same lanes. Loads that fit, rates negotiated, paperwork handled.",
    bullets: ["You approve every load", "Rate negotiation on every load", "Broker setup and paperwork done"],
    cta: { href: "/dispatch#signup", label: "Dispatch my truck" },
    image: "/images/dispatch-owner-operator-fleet.jpg",
    alt: "Owner-operator trucks lined up in a yard",
    tone: "gold" as const,
  },
];

/** Split-screen chooser: the hovered (or tapped) side expands and reveals its offer. */
export default function SplitAudience() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-[#060607] text-white">
      <div className="flex min-h-[42rem] flex-col lg:h-[86vh] lg:flex-row">
        {sides.map((sd, i) => {
          const on = active === i;
          const red = sd.tone === "red";
          return (
            <div
              key={sd.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group relative flex cursor-pointer overflow-hidden transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${on ? "grow-[1.7]" : "grow"} basis-0 min-h-[21rem]`}
            >
              <Image src={sd.image} alt={sd.alt} fill sizes="(min-width:1024px) 60vw, 100vw" className={`object-cover transition duration-1000 ${on ? "scale-105 opacity-55" : "scale-100 opacity-25 grayscale"}`} />
              <div className={`absolute inset-0 ${red ? "bg-gradient-to-tr from-[#3a0406] via-black/70 to-transparent" : "bg-gradient-to-tl from-[#3a2a00] via-black/70 to-transparent"}`} />
              <div className={`absolute inset-y-0 ${i === 0 ? "right-0" : "left-0"} hidden w-px bg-white/15 lg:block`} />
              <div className="relative mt-auto w-full p-8 sm:p-12">
                <p className={`eyebrow ${red ? "text-[#ff4a3d]" : "text-[#ffc107]"}`}>{sd.kicker}</p>
                <h3 className={`mt-2 font-display font-bold uppercase leading-[0.95] transition-all duration-700 ${on ? "text-5xl sm:text-6xl xl:text-7xl" : "text-4xl sm:text-5xl"}`}>{sd.title}</h3>
                <div className={`grid transition-all duration-700 ${on ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-lg text-lg text-white/75">{sd.text}</p>
                    <ul className="mt-5 space-y-2">
                      {sd.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-white/85"><IconCheck className={`h-5 w-5 ${red ? "text-[#ff4a3d]" : "text-[#ffc107]"}`} />{b}</li>
                      ))}
                    </ul>
                    <Link
                      href={sd.cta.href}
                      className={`mt-8 inline-flex items-center gap-3 rounded-md px-7 py-4 font-display font-semibold uppercase tracking-wider transition hover:-translate-y-0.5 ${red ? "bg-gradient-to-r from-[#b30f14] to-[#ff4a3d]" : "bg-gradient-to-r from-[#f2a900] to-[#ffe066] text-[#0c0c0e]"}`}
                    >
                      {sd.cta.label} <IconArrow className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
