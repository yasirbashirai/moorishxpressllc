import Link from "next/link";
import s from "./editorial.module.css";

const sides = [
  {
    tag: "Side A",
    kicker: "I have freight",
    title: "Shippers & Brokers",
    text: "Book the carrier, not a middleman. Our own box trucks, liftgate and air ride on every unit, and a dispatch desk that picks up 24/7.",
    points: ["Direct asset-based carrier", "CDL 33,000 lb + non-CDL 26,000 lb trucks", "Carrier setup packet ready for brokers"],
    cta: { href: "/contact#quote", label: "Get a Freight Quote" },
    bg: "bg-red-gradient text-white",
    btn: "bg-ink text-white",
    clip: "lg:[clip-path:polygon(0_0,100%_0,calc(100%-6vw)_100%,0_100%)]",
  },
  {
    tag: "Side B",
    kicker: "I own a truck",
    title: "Owner-Operators",
    text: "Dispatch from a carrier that runs the same lanes. We find the loads, negotiate the rates and handle broker paperwork. You approve every load.",
    points: ["Box truck dispatch", "Hotshot dispatch", "Rates, packets and paperwork handled"],
    cta: { href: "/dispatch#signup", label: "Dispatch My Truck" },
    bg: "bg-gold-gradient text-ink",
    btn: "bg-ink text-gold",
    clip: "lg:-ml-[6vw] lg:[clip-path:polygon(6vw_0,100%_0,100%_100%,0_100%)] lg:pl-[8vw]",
  },
];

/** Diagonal split: hovering a side widens it and reveals the offer. */
export default function SplitAudience() {
  return (
    <section className="bg-ink">
      <div className={`flex flex-col lg:h-[86vh] lg:min-h-[620px] lg:flex-row ${s.split}`}>
        {sides.map((x) => (
          <div key={x.title} className={`relative flex flex-col lg:basis-0 justify-between overflow-hidden px-6 py-14 sm:px-12 lg:py-16 ${x.bg} ${x.clip}`}>
            <span className={`pointer-events-none absolute -bottom-[4vw] right-0 select-none font-display text-[30vw] font-bold uppercase leading-none opacity-[0.08] lg:text-[16vw]`}>{x.tag.slice(-1)}</span>
            <div className="relative">
              <p className="font-display text-sm uppercase tracking-[0.35em] opacity-80">{x.tag} · {x.kicker}</p>
              <h2 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.9] sm:text-7xl xl:text-8xl">{x.title}</h2>
            </div>
            <div className={`relative mt-10 max-w-lg ${s.reveal}`}>
              <p className="text-lg leading-relaxed opacity-90">{x.text}</p>
              <ul className="mt-6 space-y-2 font-display text-lg uppercase tracking-wide">
                {x.points.map((p) => (
                  <li key={p} className="flex items-center gap-3"><span className="h-0.5 w-6 bg-current" />{p}</li>
                ))}
              </ul>
              <Link href={x.cta.href} className={`group mt-8 inline-flex items-center gap-3 px-7 py-4 font-display text-lg font-semibold uppercase tracking-wider transition hover:-translate-y-0.5 ${x.btn}`}>
                {x.cta.label}<span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
