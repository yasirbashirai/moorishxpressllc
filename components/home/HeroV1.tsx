import Image from "next/image";
import { Marquee } from "@/components/interactive";
import { IconLift, IconPhone, IconTruck } from "@/components/icons";
import { Button } from "@/components/ui";
import { site } from "@/lib/site";

const keywords = ["OTR box truck freight", "Box truck dispatch", "Hotshot dispatch", "Last mile delivery", "First mile pickup", "White glove", "Liftgate delivery", "Atlanta, GA"];

/** The original (v1) homepage hero, with its spec bar and keyword marquee. */
export default function HeroV1() {
  return (
    <>
      {/* ============ 1. HERO ============ */}
      <section className="relative overflow-hidden bg-ink-gradient text-white">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red/30 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/20 blur-[120px]" />

        <div className="container-x relative grid items-center gap-12 pb-24 pt-16 lg:grid-cols-12 lg:pb-32 lg:pt-20">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold">
              <IconTruck className="h-4 w-4" /> Atlanta box truck carrier + dispatch
            </p>
            <h1 className="mt-6 text-5xl font-bold uppercase leading-[0.98] sm:text-6xl xl:text-7xl">
              When you need it <span className="text-red-gradient">there</span> <span className="text-gold-gradient">now.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Moorish Xpress, LLC is an asset-based box truck carrier in Atlanta, Georgia. We haul OTR, first mile, last mile and white glove freight for shippers and brokers, and we dispatch box trucks and hotshots for owner-operators.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="#quote">Get a Freight Quote</Button>
              <Button href="#dispatch" variant="gold">Dispatch My Truck</Button>
            </div>
            <a href={site.phoneHref} className="mt-8 inline-flex items-center gap-3 text-white/80 hover:text-white">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-red-gradient">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-red/60" />
                <IconPhone className="relative h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-white/50">Dispatch answers 24/7</span>
                <span className="font-display text-2xl font-semibold">{site.phone}</span>
              </span>
            </a>
          </div>

          <div className="relative lg:col-span-6">
            <div className="animate-drive relative">
              <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-red via-transparent to-gold opacity-70 blur-md" />
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-coal">
                <Image src="/images/moorish-box-truck.jpg" alt="Moorish Xpress yellow 26 ft box truck with tuck-under liftgate parked at an Atlanta warehouse dock" width={1122} height={395} priority className="h-72 w-full object-cover object-left sm:h-96" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-5 pt-16">
                  <p className="font-display text-sm uppercase tracking-[0.25em] text-gold">Our fleet · Atlanta, GA</p>
                </div>
              </div>
            </div>
            {/* Floating spec badges */}
            <div className="animate-float absolute -left-4 top-6 hidden rounded-xl border border-white/10 bg-ink/90 p-4 shadow-2xl backdrop-blur sm:block">
              <p className="text-xs uppercase tracking-widest text-white/50">GVWR up to</p>
              <p className="font-display text-3xl font-bold text-gold">33,000 lb</p>
            </div>
            <div className="animate-float absolute -right-3 -bottom-6 rounded-xl bg-white p-4 text-ink shadow-2xl [animation-delay:1.5s]">
              <p className="flex items-center gap-2 font-display text-lg font-semibold uppercase"><IconLift className="h-5 w-5 text-red" />Liftgate + air ride</p>
              <p className="text-xs text-steel">Standard on every truck</p>
            </div>
          </div>
        </div>

        {/* Flyer-style spec bar */}
        <div className="relative border-t border-white/10 bg-black/40 backdrop-blur">
          <div className="container-x grid grid-cols-2 divide-white/10 py-6 md:grid-cols-4 md:divide-x">
            {[
              { k: "26 ft", v: "Box trucks" },
              { k: "33,000 lb", v: "CDL Class B GVWR" },
              { k: "24/7", v: "Dispatch & check calls" },
              { k: "2 in 1", v: "Carrier + dispatch" },
            ].map((s) => (
              <div key={s.v} className="px-2 py-2 text-center md:px-6">
                <p className="font-display text-3xl font-bold text-gold sm:text-4xl">{s.k}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/60">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={keywords} />
    </>
  );
}
