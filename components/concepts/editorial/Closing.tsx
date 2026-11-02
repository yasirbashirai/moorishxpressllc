import Link from "next/link";
import { QuoteForm } from "@/components/forms";
import { CoverageMap } from "@/components/interactive";
import { Faq } from "@/components/ui";
import { homeFaqs, site } from "@/lib/site";
import s from "./editorial.module.css";

const steps = [
  ["Send the load", "Pickup, delivery, weight, timing. That is all we need to start."],
  ["We match the truck", "CDL 33,000 lb or non-CDL 26,000 lb, matched to your freight."],
  ["We haul it", "Dedicated truck, straight to delivery, check calls on the way."],
  ["Delivered + POD", "Liftgate if needed, proof of delivery sent fast."],
];

/** Process strip: four giant numbered steps on red. */
export function Process() {
  return (
    <section className="bg-red-gradient text-white">
      <div className="mx-auto max-w-[110rem] px-4 py-20 sm:px-8 sm:py-28">
        <h2 className="font-display text-[14vw] font-bold uppercase leading-[0.85] sm:text-[9vw] lg:text-[6.5vw]">
          Quote to POD. <span className="text-ink">Four moves.</span>
        </h2>
        <ol className="mt-14 grid border-t-4 border-white sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="group border-b-2 border-white/30 py-8 pr-6 transition sm:border-r-2 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <span className="block font-display text-[7rem] font-bold leading-none text-white/25 transition group-hover:text-gold">{i + 1}</span>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase">{t}</h3>
              <p className="mt-2 text-white/80">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Coverage: giant headline plus the interactive lane map. */
export function Coverage() {
  return (
    <section className={`relative overflow-hidden bg-[#f4f1ea] py-24 sm:py-32 ${s.grain}`}>
      <div className="mx-auto max-w-[110rem] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="font-display text-[14vw] font-bold uppercase leading-[0.85] text-ink sm:text-[9vw] lg:text-[6.5vw]">
            From <span className="text-red">ATL</span><br />to your dock.
          </h2>
          <p className="max-w-md text-lg text-graphite">Southeast, Texas and the South, the Mid-Atlantic and Northeast, and the Midwest. Pick a region to light up the lanes.</p>
        </div>
        <div className="mt-12"><CoverageMap /></div>
      </div>
    </section>
  );
}

/** FAQ + quote form on black. */
export function QuoteBlock() {
  return (
    <section id="quote" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-[110rem] gap-14 px-4 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.35em] text-gold">Straight answers</p>
          <h2 className="mt-4 font-display text-[13vw] font-bold uppercase leading-[0.85] sm:text-[8vw] lg:text-[5.4vw]">
            Ask. <span className={s.outlineLight}>Then</span> <span className="text-red">book.</span>
          </h2>
          <div className="mt-10"><Faq dark items={homeFaqs} /></div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="border-4 border-gold p-1.5 shadow-[14px_14px_0_#d7141a]"><QuoteForm dark title="Get your freight quote" /></div>
        </div>
      </div>
    </section>
  );
}

/** Final poster CTA with huge type. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gold-gradient">
      <div className={`h-6 ${s.hazard}`} />
      <div className="mx-auto max-w-[110rem] px-4 py-20 sm:px-8 sm:py-28">
        <p className="font-display text-sm uppercase tracking-[0.35em] text-ink/70">Last stop</p>
        <h2 className="mt-4 font-display text-[20vw] font-bold uppercase leading-[0.8] text-ink lg:text-[15vw]">
          Load it.<br /><span className="text-red">Move it.</span>
        </h2>
        <div className="mt-12 flex flex-col gap-6 border-t-4 border-ink pt-8 lg:flex-row lg:items-center lg:justify-between">
          <a href={site.phoneHref} className="font-display text-5xl font-bold text-ink hover:text-red sm:text-7xl">{site.phone}</a>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact#quote" className="group inline-flex items-center gap-3 bg-red-gradient px-7 py-5 font-display text-lg font-semibold uppercase tracking-wider text-white shadow-[6px_6px_0_#0c0c0e] transition hover:-translate-y-0.5">
              Get a Freight Quote <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/dispatch#signup" className="group inline-flex items-center gap-3 bg-ink px-7 py-5 font-display text-lg font-semibold uppercase tracking-wider text-gold shadow-[6px_6px_0_#d7141a] transition hover:-translate-y-0.5">
              Dispatch My Truck <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
