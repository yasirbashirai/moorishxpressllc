import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import CountUp from "@/components/CountUp";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { QuoteForm } from "@/components/forms";
import { AudienceSwitch, CoverageMap, Marquee, TruckSpecs } from "@/components/interactive";
import { IconArrow, IconClock, IconDoc, IconHeadset, IconLift, IconPhone, IconRoute, IconShield, IconTruck, IconWeight } from "@/components/icons";
import { Button, Faq, SectionHeading } from "@/components/ui";
import { carrierServices, dispatchServices, homeFaqs, site } from "@/lib/site";
import { faqSchema } from "@/lib/schema";

const keywords = ["OTR box truck freight", "Box truck dispatch", "Hotshot dispatch", "Last mile delivery", "First mile pickup", "Liftgate delivery", "Atlanta, GA"];

const steps = [
  { Icon: IconDoc, title: "Send the load", text: "Use the quote form or call. Pickup, delivery, weight and timing is all we need to start." },
  { Icon: IconWeight, title: "We match the truck", text: "Dispatch matches your freight to the right unit: CDL 33,000 lb or non-CDL 26,000 lb." },
  { Icon: IconRoute, title: "We haul it", text: "A dedicated truck picks up on time and heads straight to delivery, with check calls along the way." },
  { Icon: IconShield, title: "Delivered + POD", text: "Freight delivered, liftgate if needed, and proof of delivery sent to you fast." },
];

export const metadata = { title: "Concept: v1 home", robots: { index: false } };

export default function HomePageV1() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

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
              Moorish Xpress, LLC is an asset-based box truck carrier in Atlanta, Georgia. We haul OTR, palletized and partial truckload freight for shippers and brokers, and we dispatch box trucks and hotshots for owner-operators.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact#quote">Get a Freight Quote</Button>
              <Button href="/dispatch#signup" variant="gold">Dispatch My Truck</Button>
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

      {/* ============ 2. WHO ARE YOU ============ */}
      <section className="bg-fog py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Start here"
              title={<>One company. <span className="text-red">Two ways</span> to work with us.</>}
              intro="Have freight to move, or a truck that needs loads? Pick your side and we will take it from there."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <AudienceSwitch />
          </Reveal>
        </div>
      </section>

      {/* ============ 3. SERVICES ============ */}
      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal>
              <SectionHeading eyebrow="Carrier services" title={<>Box truck freight, <br className="hidden sm:block" />handled end to end.</>} />
            </Reveal>
            <Reveal delay={100}>
              <Link href="/services" className="group inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wider text-red">
                All carrier services <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {carrierServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <Link href={`/services/${s.slug}`} className="group relative block h-[26rem] overflow-hidden rounded-2xl bg-ink">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <span className="absolute left-5 top-5 font-display text-5xl font-bold text-white/20">0{i + 1}</span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-bold uppercase text-white">{s.title}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-gold">
                      Learn more <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red-gradient transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Dispatch gets equal weight */}
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            <Reveal className="rounded-2xl bg-gold-gradient p-8 lg:row-span-1">
              <IconHeadset className="h-10 w-10 text-ink" />
              <p className="eyebrow mt-6 text-red-deep">Dispatch services</p>
              <h3 className="mt-2 text-3xl font-bold uppercase leading-tight text-ink">Dispatch from a carrier that drives the same lanes.</h3>
              <Link href="/dispatch" className="group mt-6 inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wider text-ink">
                Explore dispatch <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
            {dispatchServices.map((s, i) => (
              <Reveal key={s.slug} delay={(i + 1) * 100}>
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-bold uppercase">{s.title}</h3>
                    <p className="mt-2 flex-1 text-steel">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-red">
                      Learn more <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. FLEET / INFRASTRUCTURE ============ */}
      <section className="relative overflow-hidden bg-ink-gradient py-24 text-white">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative">
          <Reveal>
            <SectionHeading dark eyebrow="Equipment" title={<>The right truck <span className="text-gold">for the load.</span></>} intro="Two box truck classes, one standard: liftgate and air ride on every unit. Toggle to compare." />
          </Reveal>
          <Reveal delay={120} className="mt-14">
            <TruckSpecs />
          </Reveal>

          {/* Infrastructure metrics */}
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {[
              { n: 24, s: "/7", l: "Dispatch availability" },
              { n: 4, s: "", l: "Regions served from Atlanta" },
              { n: 100, s: "%", l: "Trucks with liftgate + air ride" },
              { n: 6, s: "", l: "Carrier & dispatch services" },
            ].map((m) => (
              <div key={m.l} className="bg-ink p-8 text-center">
                <p className="font-display text-5xl font-bold text-white"><CountUp to={m.n} suffix={m.s} /></p>
                <p className="mt-2 text-sm uppercase tracking-wider text-white/55">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. HOW IT WORKS ============ */}
      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" eyebrow="How it works" title={<>From quote to POD <span className="text-red">in four steps.</span></>} />
          </Reveal>
          <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-[repeating-linear-gradient(90deg,#d7141a_0_12px,transparent_12px_22px)] lg:block" />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="relative text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-ink text-gold shadow-xl">
                  <s.Icon className="h-9 w-9" />
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-gradient font-display text-sm font-bold text-white">{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-bold uppercase">{s.title}</h3>
                <p className="mt-2 text-steel">{s.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button href="/contact#quote">Start With a Quote</Button>
          </div>
        </div>
      </section>

      {/* ============ 6. COVERAGE ============ */}
      <section className="bg-fog py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Coverage" title={<>Atlanta-based. <span className="text-red">Built for multi-state lanes.</span></>} intro="We run out of Atlanta into the Southeast, Texas and the South, the Mid-Atlantic and Northeast, and the Midwest. Pick a region to see the lanes." />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <CoverageMap />
          </Reveal>
        </div>
      </section>

      {/* ============ 7. WHY US + FLYER ============ */}
      <section className="overflow-hidden py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="absolute -inset-6 -z-10 rotate-2 rounded-3xl bg-hazard opacity-20" />
            <Image src="/images/flyer-lets-talk-freight.jpg" alt="Moorish Xpress flyer: Let's connect, let's talk freight. 26 ft box trucks, 33,000 lb GVWR" width={1122} height={1402} className="mx-auto w-full max-w-md -rotate-2 rounded-2xl shadow-2xl transition duration-500 hover:rotate-0" />
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <SectionHeading eyebrow="Why Moorish Xpress" title={<>Let&apos;s connect. <span className="text-red">Let&apos;s talk freight.</span></>} intro="We are a growing Atlanta carrier, and we earn every load the same way: by doing what we say." />
            <ul className="mt-8 space-y-5">
              {[
                { Icon: IconTruck, t: "Asset-based, not a broker", d: "We own and run our trucks. When you book us, our truck hauls your freight." },
                { Icon: IconClock, t: "Answer the phone, 24/7", d: "Real people on dispatch day and night, with updates you do not have to chase." },
                { Icon: IconLift, t: "Equipment that fits real freight", d: "Tuck-under liftgates and air-ride suspension on every truck, plus a 33,000 lb CDL unit for heavier loads." },
                { Icon: IconShield, t: "Straight talk, no overpromising", d: "If a load does not fit our trucks or schedule, we tell you upfront." },
              ].map((x) => (
                <li key={x.t} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-gradient text-white shadow-lg shadow-red/25"><x.Icon className="h-6 w-6" /></span>
                  <div>
                    <h3 className="text-xl font-bold uppercase">{x.t}</h3>
                    <p className="mt-1 text-steel">{x.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ 8. QUOTE + FAQ ============ */}
      <section id="quote" className="relative overflow-hidden bg-ink-gradient py-24 text-white">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading dark eyebrow="Questions" title={<>Straight answers <span className="text-gold">before you book.</span></>} />
            <div className="mt-10">
              <Faq dark items={homeFaqs} />
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <QuoteForm dark title="Get your freight quote" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
