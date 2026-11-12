import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import QuoteSection from "@/components/QuoteSection";
import Reveal from "@/components/Reveal";
import { IconClock, IconHand, IconLift, IconShield, IconTruck, IconUsers } from "@/components/icons";
import { Button, PageHero, SectionHeading } from "@/components/ui";
import { companyDescription, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About MOORISH XPRESS LLC | Atlanta Freight Transportation & Truck Dispatch Company",
  description:
    "MOORISH XPRESS LLC is an Atlanta, Georgia-based freight transportation and truck dispatch company led by Jude Hood. 26 ft box trucks with tuck-under liftgates and air-ride suspension, open 24/7.",
  alternates: { canonical: "/about" },
};

const values = [
  { Icon: IconClock, t: "Speed with discipline", d: "When you need it there now, we move fast, but we never cut corners on safety or paperwork." },
  { Icon: IconShield, t: "Honest capacity", d: "We only commit to loads our trucks and schedule can handle. No overpromising." },
  { Icon: IconHand, t: "Care for the freight", d: "Tuck-under liftgates and air-ride suspension, so freight is loaded, hauled and delivered gently." },
  { Icon: IconUsers, t: "Partnership", d: "Shippers, brokers and owner-operators: we build long-term relationships, not one-off transactions." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About us"
        title={<>Atlanta-built. <span className="text-red">Operator-led.</span></>}
        intro="MOORISH XPRESS LLC is a freight transportation and truck dispatch company based in Atlanta, Georgia. We haul freight in our own 26ft box trucks and we offer dispatching services for owner-operators and small trucking companies."
        image="/images/moorish-box-truck.jpg"
        imageAlt="MOORISH XPRESS LLC branded yellow 26 ft box truck at a warehouse"
        bright
        imagePosition="30% center"
        crumbs={[{ href: "/", label: "Home" }, { href: "/about", label: "About" }]}
      >
        <Button href="#quote">Work With Us</Button>
      </PageHero>

      {/* Story */}
      <section className="py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-hazard opacity-20" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl">
              <Image src="/images/moorish-red-truck-highway.jpg" alt="MOORISH XPRESS LLC 26 ft box truck on a long-distance freight run" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[35%_center]" />
            </div>
            {/* Founder card with Jude's photo */}
            <div className="absolute -bottom-6 -right-2 flex items-center gap-4 rounded-2xl bg-red-gradient p-5 pr-7 text-white shadow-2xl shadow-red/30 sm:-right-6">
              <Image src="/images/jude-hood.jpg" alt={`${site.owner}, founder of MOORISH XPRESS LLC`} width={600} height={600} className="h-20 w-20 rounded-full object-cover ring-4 ring-white/90" />
              <div>
                <p className="font-display text-sm uppercase tracking-widest text-white/85">Founder & owner</p>
                <p className="mt-1 font-display text-3xl font-bold uppercase">{site.owner}</p>
                <p className="text-sm text-white/80">Class B CDL holder</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Our story" title={<>From behind the wheel <span className="text-red">to running the desk.</span></>} />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-steel">
              {companyDescription.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              <p>
                {site.owner} spent months learning the box truck business from experienced owner-operators before putting his own trucks on the road. Today we run 26 ft box trucks out of Atlanta: non-CDL trucks rated at 26,000 lb GVWR and a heavier-duty truck rated at 33,000 lb GVWR, operated by a Class B CDL holder. Every truck has a tuck-under liftgate and air-ride suspension.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-red-gradient py-24 text-white">
        <div className="container-x">
          <SectionHeading dark align="center" eyebrow="How we operate" title={<>Four rules <span className="text-white/80">we run by.</span></>} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 90} className="rounded-2xl border border-white/20 bg-white/10 p-7 transition hover:border-white/50 hover:bg-white/15">
                <v.Icon className="h-10 w-10 text-white" />
                <h3 className="mt-5 text-2xl font-bold uppercase">{v.t}</h3>
                <p className="mt-2 text-white/85">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Asset-based vs broker */}
      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" eyebrow="The difference" title={<>A carrier, <span className="text-red">not a middleman.</span></>} intro="When you book MOORISH XPRESS LLC for freight, our truck hauls it. Here is what that means for you." />
          </Reveal>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-3 border-b border-line bg-fog font-display text-sm uppercase tracking-wider text-ink">
              <span className="p-4" />
              <span className="bg-red-gradient p-4 text-center text-white">MOORISH XPRESS LLC</span>
              <span className="p-4 text-center text-steel">Typical broker</span>
            </div>
            {[
              ["Who hauls your freight", "Our own truck", "Whoever takes the load"],
              ["Who you talk to", "The carrier's dispatch", "An agent in between"],
              ["Equipment known upfront", "Yes: liftgate + air-ride", "Varies by carrier"],
              ["Availability", "24/7 direct line", "Office hours, often"],
            ].map(([k, a, b], i) => (
              <div key={k} className={`grid grid-cols-3 text-sm sm:text-base ${i % 2 ? "bg-fog" : "bg-white"}`}>
                <span className="p-4 font-semibold text-ink">{k}</span>
                <span className="flex items-center justify-center gap-2 p-4 text-center font-semibold text-red"><IconTruck className="hidden h-5 w-5 sm:block" />{a}</span>
                <span className="p-4 text-center text-steel">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment strip */}
      <section className="border-y border-red/10 bg-blush py-14">
        <div className="container-x grid gap-6 text-ink sm:grid-cols-3">
          {[
            { Icon: IconTruck, t: "26 ft box trucks", d: "CDL and non-CDL units" },
            { Icon: IconLift, t: "Tuck-under liftgates", d: "On every truck" },
            { Icon: IconShield, t: "33,000 lb GVWR", d: "For heavier loads" },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-gradient text-white shadow-lg shadow-red/20"><x.Icon className="h-7 w-7" /></span>
              <div><p className="font-display text-2xl font-bold uppercase">{x.t}</p><p className="text-sm text-graphite">{x.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <QuoteSection title="Let's talk freight." />
      <CtaBand />
    </>
  );
}
