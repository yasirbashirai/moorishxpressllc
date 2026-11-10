import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { IconArrow, IconCheck } from "@/components/icons";
import { Button, PageHero, SectionHeading } from "@/components/ui";
import { carrierServices, dispatchServices, trucks } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Freight Transportation Services Atlanta GA | OTR, Palletized, PTL, U-Box",
  description:
    "26 ft box truck freight services from Atlanta, GA: OTR, palletized, partial truckload and U-Haul U-Box transportation for brokers and shippers. Tuck-under liftgate, air-ride suspension, open 24/7.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Freight Services", path: "/services" }])} />
      <PageHero
        eyebrow="Freight transportation services"
        title={<>26 ft box truck freight <span className="text-red">from Atlanta</span>, done right.</>}
        intro="We are an asset-based carrier for freight brokers, direct shippers, manufacturers, warehouses, distribution centers and logistics companies. Our own 26 ft box trucks haul your freight from Atlanta, GA to the Midwest, the Northeast and the Southern states, with a tuck-under liftgate and air-ride suspension on every truck."
        image="/images/moorish-red-truck-highway.jpg"
        imageAlt="26 ft box trucks parked at a warehouse loading dock"
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Freight Services" }]}
      >
        <Button href="#quote">Get a Quote</Button>
        <Button href="/dispatch" variant="ghost">Looking for dispatch?</Button>
      </PageHero>

      {/* Carrier services, alternating rows */}
      <section className="py-24">
        <div className="container-x space-y-24">
          {carrierServices.map((s, i) => (
            <div key={s.slug} className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal className={`relative ${i % 2 ? "lg:order-2" : ""}`}>
                <div className={`absolute -inset-3 -z-10 rounded-3xl ${i % 2 ? "bg-red-deep" : "bg-red-gradient"} opacity-20 blur-xl`} />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute left-5 top-5 rounded-md bg-red px-3 py-1.5 font-display text-sm uppercase tracking-widest text-white shadow-lg">0{i + 1}</span>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <p className="eyebrow text-red">{s.keyword}</p>
                <h2 className="mt-3 text-4xl font-bold uppercase leading-tight sm:text-5xl">{s.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-steel">{s.intro}</p>
                <ul className="mt-6 space-y-3">
                  {s.points.slice(0, 4).map((p) => (
                    <li key={p} className="flex gap-3 text-graphite"><IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-red" />{p}</li>
                  ))}
                </ul>
                <Link href={`/services/${s.slug}`} className="group mt-8 inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wider text-red">
                  {s.title} details <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment table */}
      <section className="bg-red-gradient py-24 text-white">
        <div className="container-x">
          <SectionHeading dark eyebrow="Equipment" title={<>Two truck classes. <span className="text-white/80">One standard.</span></>} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {trucks.map((t) => (
              <div key={t.id} className="rounded-2xl border border-white/20 bg-white/10 p-8">
                <p className="eyebrow text-white/85">{t.badge}</p>
                <h3 className="mt-2 text-3xl font-bold uppercase">{t.name}</h3>
                <p className="mt-2 font-display text-5xl font-bold text-white">{t.gvwr.toLocaleString()} <span className="text-2xl">lb GVWR</span></p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {t.specs.map((x) => <li key={x} className="flex items-center gap-2 text-white/90"><IconCheck className="h-4 w-4 text-white" />{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dispatch cross-sell */}
      <section className="py-20">
        <div className="container-x">
          <div className="grid items-center gap-8 rounded-3xl border border-red/10 bg-blush p-8 sm:p-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="eyebrow text-red-deep">Also from Moorish Xpress</p>
              <h2 className="mt-2 text-4xl font-bold uppercase text-ink">Own a box truck or hotshot? We dispatch too.</h2>
              <p className="mt-3 text-graphite">Professional freight dispatching, plus freight documentation and load coordination, for box trucks and hotshots: loads, rates and paperwork handled by a carrier that runs the same lanes.</p>
            </div>
            <div className="lg:text-right"><Button href="/dispatch">See Dispatch Services</Button></div>
          </div>
        </div>
      </section>

      <QuoteSection />
      <CtaBand />
    </>
  );
}
