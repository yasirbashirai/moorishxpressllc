import Image from "next/image";
import { Marquee } from "@/components/interactive";
import { IconLift, IconPhone, IconTruck } from "@/components/icons";
import { Button } from "@/components/ui";
import { site } from "@/lib/site";

const keywords = ["OTR box truck freight", "Palletized freight", "Partial truckload", "U-Box transportation", "Box truck dispatch", "Hotshot dispatch", "Load coordination", "Atlanta, GA"];

const fade =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 14%, black 34%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)";
// Banner fade: solid black on the left melting into the photo, like a cinematic web banner
const bannerFade = "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 8%, rgba(0,0,0,0.85) 16%, black 24%)";
const bannerMask: React.CSSProperties = { maskImage: bannerFade, WebkitMaskImage: bannerFade };
const heroMask: React.CSSProperties = {
  maskImage: fade,
  WebkitMaskImage: fade,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

/** The original (v1) homepage hero, with its spec bar and keyword marquee. */
export default function HeroV1() {
  return (
    <>
      {/* ============ 1. HERO ============ */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red/25 blur-[120px]" />

        <div className="relative">
        {/* Desktop banner photo: full hero height, starts at the text box edge, fades in from the black */}
        <div className="absolute inset-y-0 left-[calc(max(0px,(100vw-80rem)/2)+2rem+(min(100vw,80rem)-4rem-3rem)*5/12+3rem-5rem)] hidden aspect-[1672/941] lg:block" style={bannerMask}>
          <Image
            src="/images/hero-fleet-highway-rtl.jpg"
            alt="Moorish Xpress yellow 26 ft box trucks with tuck-under liftgates driving on the highway at sunrise"
            fill
            priority
            sizes="70vw"
            className="object-cover"
          />
        </div>
        <div className="container-x relative grid items-center gap-12 pb-20 pt-14 lg:grid-cols-12 lg:py-10">
          <div className="relative z-10 lg:col-span-5 lg:rounded-3xl lg:border lg:border-white/10 lg:bg-ink/60 lg:p-8 lg:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] lg:backdrop-blur-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold">
              <IconTruck className="h-4 w-4" /> Atlanta box truck carrier + dispatch
            </p>
            <h1 className="mt-5 text-5xl font-bold uppercase leading-[0.98] sm:text-6xl lg:text-[3.4rem]">
              When you need it <span className="text-red-gradient">there</span> <span className="text-gold-gradient">now.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed lg:text-base text-white/85 [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
              Moorish Xpress, LLC is an Atlanta, Georgia-based freight transportation and truck dispatch company. We haul OTR and palletized freight in our 26 ft box trucks for brokers and shippers, and we dispatch box trucks and hotshots for owner-operators and small trucking companies.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#quote" className="lg:px-5 lg:py-3.5 lg:text-sm">Get a Freight Quote</Button>
              <Button href="#dispatch" variant="gold" className="lg:px-5 lg:py-3.5 lg:text-sm">Dispatch My Truck</Button>
            </div>
            <a href={site.phoneHref} className="mt-6 inline-flex items-center gap-3 text-white/80 hover:text-white">
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

          {/* Mobile/tablet: the photo sits below the copy */}
          <div className="relative -mx-4 sm:-mx-6 lg:hidden">
            <div className="relative aspect-[1672/941] w-full" style={heroMask}>
              <Image src="/images/hero-fleet-highway-rtl.jpg" alt="" fill sizes="100vw" className="object-cover" />
            </div>
          </div>

          {/* Desktop: spec badges floating over the banner photo */}
          <div className="relative hidden h-full min-h-[24rem] lg:col-span-7 lg:block">
            <div className="animate-float absolute right-0 top-0 rounded-xl border border-white/15 bg-ink/75 p-4 shadow-2xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-widest text-white/60">GVWR up to</p>
              <p className="font-display text-3xl font-bold text-gold">33,000 lb</p>
            </div>
            <div className="animate-float absolute bottom-0 right-0 rounded-xl bg-white/95 p-4 text-ink shadow-2xl backdrop-blur [animation-delay:1.5s]">
              <p className="flex items-center gap-2 font-display text-lg font-semibold uppercase"><IconLift className="h-5 w-5 text-red" />Liftgate + air-ride</p>
              <p className="text-xs text-steel">Standard on every truck</p>
            </div>
          </div>
        </div>

        </div>

        {/* Flyer-style spec bar */}
        <div className="relative border-t border-white/10 bg-black/55 backdrop-blur-md">
          <div className="container-x grid grid-cols-2 divide-white/10 py-6 md:grid-cols-4 md:divide-x">
            {[
              { k: "26 ft", v: "Box trucks" },
              { k: "33,000 lb", v: "GVWR (Class B CDL)" },
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
