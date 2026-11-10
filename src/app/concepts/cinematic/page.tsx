import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/concepts/cinematic/Hero";
import Journey from "@/components/concepts/cinematic/Journey";
import ServiceRail from "@/components/concepts/cinematic/ServiceRail";
import Equipment from "@/components/concepts/cinematic/Equipment";
import SplitAudience from "@/components/concepts/cinematic/SplitAudience";
import { CoverageMap } from "@/components/interactive";
import { QuoteForm } from "@/components/forms";
import { Faq } from "@/components/ui";
import { IconArrow, IconPhone } from "@/components/icons";
import { homeFaqs, site } from "@/lib/site";

// Concept A preview: kept out of search results
export const metadata: Metadata = { title: "Concept A: Cinematic Night Run", robots: { index: false } };

const ticker = ["OTR box truck freight", "First mile", "Last mile", "Box truck dispatch", "Hotshot dispatch", "Liftgate + air ride", "Open 24/7"];

export default function CinematicConcept() {
  return (
    <div className="overflow-x-clip bg-[#060607]">
      <Hero />

      {/* Ticker band */}
      <div className="relative z-10 -rotate-1 scale-105 overflow-hidden border-y border-black bg-gradient-to-r from-[#f2a900] via-[#ffc107] to-[#ffe066] py-3.5" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {[...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-6 px-6 font-display text-xl font-bold uppercase tracking-wider text-[#0c0c0e]">
              {t}<span className="h-2.5 w-2.5 rotate-45 bg-[#d7141a]" />
            </span>
          ))}
        </div>
      </div>

      <Journey />
      <SplitAudience />
      <ServiceRail />
      <Equipment />

      {/* Coverage: light panel for contrast, the one bright moment */}
      <section className="relative bg-[#f4f4f6] py-28">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow flex items-center gap-3 text-[#d7141a]"><span className="h-0.5 w-8 bg-current" />Coverage</p>
              <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] text-[#0c0c0e] sm:text-7xl">Atlanta out. <br />Four regions deep.</h2>
            </div>
            <p className="max-w-md text-lg text-[#5d626d]">Southeast, South and Texas, Mid-Atlantic and Northeast, and the Midwest. Pick a region to light up the lanes.</p>
          </div>
          <CoverageMap />
        </div>
      </section>

      {/* Flyer + promise */}
      <section className="relative overflow-hidden py-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_50%,rgba(215,20,26,0.25),transparent_70%)]" />
        <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md [perspective:1200px]">
            <div className="transition duration-700 [transform:rotateY(14deg)_rotateX(4deg)] hover:[transform:rotateY(0)_rotateX(0)]">
              <Image src="/images/flyer-lets-talk-freight.jpg" alt="Moorish Xpress flyer: Let's connect, let's talk freight" width={1122} height={1402} className="rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]" />
            </div>
          </div>
          <div>
            <p className="eyebrow text-[#ffc107]">Our word</p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-7xl">Let&apos;s connect. <span className="bg-gradient-to-r from-[#d7141a] to-[#ff4a3d] bg-clip-text text-transparent">Let&apos;s talk freight.</span></h2>
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {[
                ["Asset-based", "Our truck hauls your freight. No re-brokering."],
                ["24/7 dispatch", "Real people on the phone, day and night."],
                ["Straight talk", "If a load doesn't fit our trucks, we tell you upfront."],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 py-6 sm:flex-row sm:items-center sm:gap-10">
                  <span className="w-44 shrink-0 font-display text-2xl font-bold uppercase text-[#ffc107]">{k}</span>
                  <span className="text-lg text-white/70">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote + FAQ */}
      <section id="quote" className="relative overflow-hidden bg-[#0a0a0c] py-28 text-white">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="container-x relative grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-[#ffc107]">Request a quote</p>
            <h2 className="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">Send the load. <br /><span className="text-white/40">We&apos;ll match the truck.</span></h2>
            <div className="mt-10"><Faq dark items={homeFaqs} /></div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start"><QuoteForm dark title="Get your freight quote" /></div>
        </div>
      </section>

      {/* Finale */}
      <section className="relative overflow-hidden py-32 text-center text-white">
        <Image src="/images/moorish-red-truck-highway.jpg" alt="Truck on the open highway at speed" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060607] via-[#060607]/60 to-[#060607]" />
        <div className="container-x relative">
          <h2 className="font-display text-[15vw] font-bold uppercase leading-[0.85] sm:text-[9rem]">
            Need it <span className="bg-gradient-to-r from-[#ffc107] to-[#ffe066] bg-clip-text text-transparent">there now?</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="#quote" className="inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-[#b30f14] via-[#d7141a] to-[#ff4a3d] px-8 py-4 font-display text-lg font-semibold uppercase tracking-wider">Get a Freight Quote <IconArrow className="h-5 w-5" /></Link>
            <a href={site.phoneHref} className="inline-flex items-center gap-3 rounded-md border-2 border-white/25 px-8 py-4 font-display text-lg font-semibold uppercase tracking-wider hover:border-[#ffc107] hover:text-[#ffc107]"><IconPhone className="h-5 w-5" />{site.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
