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
      <section className="relative overflow-hidden bg-ink text-white">
        {/* Full-bleed photo of the Moorish Xpress fleet on the highway */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-moorish-fleet-highway.jpg"
            alt="Moorish Xpress yellow box trucks driving on the highway at sunrise"
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover object-[72%_center] lg:object-[center_40%]"
          />
        </div>
        {/* Legibility: full tint on mobile; on desktop a left-side wash, photo clear on the right */}
        <div className="absolute inset-0 bg-ink/70 lg:bg-transparent" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(12,12,14,0.85)_0%,rgba(12,12,14,0.55)_35%,rgba(12,12,14,0)_60%)] lg:block" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red/25 blur-[120px]" />

        <div className="container-x relative grid min-h-[min(82svh,760px)] items-center gap-12 pb-24 pt-16 lg:grid-cols-12 lg:pb-28 lg:pt-20">
          <div className="lg:col-span-6 lg:rounded-3xl lg:border lg:border-white/10 lg:bg-ink/45 lg:p-10 lg:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] lg:backdrop-blur-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold">
              <IconTruck className="h-4 w-4" /> Atlanta box truck carrier + dispatch
            </p>
            <h1 className="mt-6 text-5xl font-bold uppercase leading-[0.98] sm:text-6xl xl:text-7xl">
              When you need it <span className="text-red-gradient">there</span> <span className="text-gold-gradient">now.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
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

          {/* Spec badges floating over the trucks (desktop) */}
          <div className="relative hidden h-full lg:col-span-6 lg:block">
            <div className="animate-float absolute right-0 top-[4%] rounded-xl border border-white/15 bg-ink/75 p-4 shadow-2xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-widest text-white/60">GVWR up to</p>
              <p className="font-display text-3xl font-bold text-gold">33,000 lb</p>
            </div>
            <div className="animate-float absolute bottom-[4%] right-[8%] rounded-xl bg-white/95 p-4 text-ink shadow-2xl backdrop-blur [animation-delay:1.5s]">
              <p className="flex items-center gap-2 font-display text-lg font-semibold uppercase"><IconLift className="h-5 w-5 text-red" />Liftgate + air ride</p>
              <p className="text-xs text-steel">Standard on every truck</p>
            </div>
          </div>
        </div>

        {/* Flyer-style spec bar */}
        <div className="relative border-t border-white/10 bg-black/55 backdrop-blur-md">
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
