import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { IconArrow, IconBox, IconCheck, IconDoc, IconHeadset, IconRoute, IconShield, IconTruck, IconUsers } from "@/components/icons";
import { Button, Faq, PageHero, SectionHeading } from "@/components/ui";
import { carrierServices, faqGroups, site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Box Truck Freight Carrier for Brokers & Shippers | Atlanta GA",
  description:
    "Freight broker partnerships and direct shipper transportation services. Moorish Xpress is a reliable 26 ft box truck carrier in Atlanta, GA for brokers, shippers, warehouses and 3PLs.",
  alternates: { canonical: "/brokers-shippers" },
};

/** Who we haul for: the client's primary target audience. */
const audiences = [
  { Icon: IconRoute, t: "Freight brokers & logistics companies", d: "Reliable 26 ft box truck capacity for long-distance, interstate freight." },
  { Icon: IconBox, t: "Shippers & manufacturers", d: "Palletized commercial goods moved between factories, warehouses and distribution centers." },
  { Icon: IconTruck, t: "Warehouses & distribution centers", d: "Dependable transportation for scheduled shipments and outbound deliveries." },
  { Icon: IconUsers, t: "Third-party logistics providers (3PLs)", d: "A carrier partner for full or partial box truck loads." },
];

/** What a broker or shipper can expect on every load. */
const promises = [
  { Icon: IconHeadset, t: "Clear communication", d: "Dispatch answers 24/7. Check calls and shipment updates without you chasing us." },
  { Icon: IconDoc, t: "Paperwork done right", d: "Rate confirmations, Bills of Lading and Proofs of Delivery handled on every load." },
  { Icon: IconShield, t: "Consistent follow-through", d: "We only commit to loads our trucks and schedule can handle, then we deliver." },
];

const faqs = faqGroups.find((g) => g.id === "brokers")!.items;

export default function BrokersShippersPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Brokers & Shippers", path: "/brokers-shippers" }])} />

      <PageHero
        eyebrow="Brokers & shippers"
        title={<>Your box truck carrier <span className="text-red">out of Atlanta.</span></>}
        intro="Freight brokers, direct shippers, manufacturers, warehouses, distribution centers and logistics companies: when you need reliable 26 ft box truck transportation, we haul it with our own trucks."
        image="/images/moorish-red-truck-dock.jpg"
        imageAlt="26 ft box truck hauling freight on an interstate highway"
        crumbs={[{ href: "/", label: "Home" }, { href: "/brokers-shippers", label: "Brokers & Shippers" }]}
      >
        <Button href="#quote">Send Us a Load</Button>
        <Button href={`mailto:${site.email}?subject=Carrier%20setup%20packet%20request`} variant="ghost">Request Carrier Packet</Button>
      </PageHero>

      {/* Who we work with */}
      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Who we haul for" title={<>Built for the people <span className="text-red">who move freight.</span></>} intro="Long-distance, interstate box truck freight for businesses across the U.S. freight and logistics industry." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal key={a.t} delay={i * 80} className="rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-red/40 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-gradient text-white"><a.Icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl font-bold uppercase leading-tight">{a.t}</h3>
                <p className="mt-2 text-sm text-steel">{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Two tracks: brokers today, direct shippers long term */}
      <section className="bg-fog py-24">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-red-gradient p-9 text-white shadow-xl shadow-red/20 sm:p-12">
            <p className="eyebrow text-white/90">For freight brokers</p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight">A carrier you can put on the board.</h2>
            <p className="mt-4 text-white/85">We are building long-term freight broker partnerships. Add Moorish Xpress to your carrier list and we will send our setup packet the same day.</p>
            <ul className="mt-6 space-y-3">
              {["26 ft box trucks, CDL and non-CDL", "Tuck-under liftgate and air-ride suspension on every truck", "24/7 dispatch for check calls", "Rate cons, BOLs and PODs handled fast"].map((p) => (
                <li key={p} className="flex gap-3 text-white/90"><IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-white" />{p}</li>
              ))}
            </ul>
            <a href={`mailto:${site.email}?subject=Carrier%20setup%20packet%20request`} className="mt-8 inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wider text-white underline decoration-white/40 underline-offset-4">
              Request our carrier packet <IconArrow className="h-5 w-5" />
            </a>
          </Reveal>
          <Reveal delay={100} className="rounded-3xl bg-white p-9 shadow-sm ring-1 ring-line sm:p-12">
            <p className="eyebrow text-red">For direct shippers</p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight text-ink">Work with the truck, not a middleman.</h2>
            <p className="mt-4 text-steel">We welcome direct contracts with shippers, manufacturers, warehouses and distribution centers. Booking us directly means you talk to the carrier moving your freight.</p>
            <ul className="mt-6 space-y-3">
              {["Recurring lanes and scheduled shipments", "Palletized and partial truckload freight", "Long-distance runs from Atlanta, GA", "One point of contact from pickup to POD"].map((p) => (
                <li key={p} className="flex gap-3 text-graphite"><IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-red" />{p}</li>
              ))}
            </ul>
            <Link href="#quote" className="mt-8 inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wider text-red">
              Get a freight quote <IconArrow className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* What you can expect */}
      <section className="py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/moorish-box-truck.jpg" alt="Moorish Xpress yellow 26 ft box truck with tuck-under liftgate at a warehouse" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-left" />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="On every load" title={<>Strong relationships start <span className="text-red">with follow-through.</span></>} />
            <div className="mt-8 space-y-4">
              {promises.map((p) => (
                <div key={p.t} className="flex gap-4 rounded-xl border border-line p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blush text-red"><p.Icon className="h-5 w-5" /></span>
                  <span><span className="block font-display text-lg font-semibold uppercase text-ink">{p.t}</span><span className="text-steel">{p.d}</span></span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Freight services quick links */}
      <section className="bg-red-gradient py-20 text-white">
        <div className="container-x">
          <SectionHeading dark eyebrow="Freight services" title={<>What we <span className="text-white/80">haul.</span></>} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {carrierServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-2xl border border-white/20 bg-white/10 p-6 transition hover:border-white/50 hover:bg-white/15">
                <h3 className="text-xl font-bold uppercase leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-white/85">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase text-white">Details <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x max-w-4xl">
          <SectionHeading align="center" eyebrow="FAQ" title="Questions from brokers and shippers" />
          <div className="mt-10"><Faq items={faqs} /></div>
        </div>
      </section>

      <QuoteSection title="Send us your next load." />
      <CtaBand />
    </>
  );
}
