import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { DispatchForm } from "@/components/forms";
import { IconArrow, IconChart, IconCheck, IconDoc, IconHeadset, IconRoute, IconShield } from "@/components/icons";
import { Button, Faq, PageHero, SectionHeading } from "@/components/ui";
import { dispatchServices, site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Box Truck & Hotshot Dispatch Service | Truck Dispatcher Atlanta GA",
  description:
    "Box truck and hotshot dispatch service from Moorish Xpress, an Atlanta box truck carrier. We find loads, negotiate rates, handle broker setup and paperwork. Sign up today.",
  alternates: { canonical: "/dispatch" },
};

const includes = [
  { Icon: IconRoute, t: "Load searching", d: "We search load boards and our broker contacts for freight that fits your truck and lanes." },
  { Icon: IconChart, t: "Rate negotiation", d: "We push for your target rate per mile and walk away from loads that do not pay." },
  { Icon: IconDoc, t: "Broker setup & paperwork", d: "Carrier packets, rate confirmations, BOLs and PODs, organized and sent on time." },
  { Icon: IconHeadset, t: "A dispatcher who knows you", d: "One point of contact who learns your truck, your home time and your goals." },
  { Icon: IconShield, t: "You stay in control", d: "No forced dispatch. You approve every load before it is booked." },
  { Icon: IconCheck, t: "Carrier perspective", d: "We run box trucks too, so we know what a good load looks like from the driver's seat." },
];

const faqs = [
  { q: "What equipment do you dispatch?", a: "Box trucks (26 ft and smaller, CDL and non-CDL) and hotshots. If you run something else, ask and we will tell you honestly if we are a fit." },
  { q: "Do I need my own authority?", a: "Yes, you need an active MC/DOT authority and insurance. If your authority is new, we can still help you build broker relationships." },
  { q: "Is there a contract?", a: "We keep it simple. We go over our dispatch fee and terms with you upfront before we book your first load." },
  { q: "How do I get started?", a: "Fill in the dispatch sign-up form or call " + site.phone + ". We will set up a quick call to learn about your truck and lanes." },
];

export default function DispatchPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Dispatch", path: "/dispatch" }])} />

      <PageHero
        eyebrow="Truck dispatch services"
        title={<>Box truck & hotshot <span className="text-gold">dispatch</span> that keeps you loaded.</>}
        intro="We are a box truck carrier that also dispatches for owner-operators. We find the loads, negotiate the rates and handle the paperwork, so you can focus on driving."
        image="/images/dispatch-office.jpg"
        imageAlt="Moorish Xpress dispatch office in Atlanta"
        crumbs={[{ href: "/", label: "Home" }, { href: "/dispatch", label: "Dispatch" }]}
      >
        <Button href="#signup" variant="gold">Dispatch My Truck</Button>
        <Button href="tel:+16789687511" variant="ghost">Call {site.phone}</Button>
      </PageHero>

      {/* Two dispatch services */}
      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Who we dispatch" title={<>Built for <span className="text-red">box trucks and hotshots.</span></>} />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {dispatchServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <Link href={`/services/${s.slug}`} className="group relative block h-[28rem] overflow-hidden rounded-2xl bg-ink">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover opacity-65 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="eyebrow text-gold">{s.keyword}</p>
                    <h3 className="mt-2 text-4xl font-bold uppercase text-white">{s.title}</h3>
                    <p className="mt-3 max-w-md text-white/80">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wider text-gold">Learn more <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-fog py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading align="center" eyebrow="What's included" title={<>Everything between <span className="text-red">the load board and the dock.</span></>} />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((x, i) => (
              <Reveal key={x.t} delay={i * 70} className="group rounded-2xl border border-line bg-white p-8 transition hover:-translate-y-1 hover:border-gold hover:shadow-xl">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-gradient text-ink transition group-hover:rotate-6"><x.Icon className="h-7 w-7" /></span>
                <h3 className="mt-6 text-2xl font-bold uppercase">{x.t}</h3>
                <p className="mt-2 text-steel">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-up */}
      <section id="signup" className="relative overflow-hidden bg-ink-gradient py-24 text-white">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-x relative grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading dark eyebrow="Get started" title={<>Ready to stay loaded? <span className="text-gold">Sign up in a minute.</span></>} intro="Tell us about your truck and where you like to run. A dispatcher will call you to go over lanes, rates and next steps." />
            <ol className="mt-10 space-y-5">
              {["Send your details", "Quick intro call with a dispatcher", "Send your MC, insurance and W-9", "We start booking loads you approve"].map((t, i) => (
                <li key={t} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-gradient font-display text-lg font-bold text-ink">{i + 1}</span>
                  <span className="text-lg text-white/85">{t}</span>
                </li>
              ))}
            </ol>
            <div className="mt-12"><Faq dark items={faqs} /></div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start"><DispatchForm /></div>
        </div>
      </section>

      <CtaBand title="Shipper or broker instead?" text="We also haul freight with our own box trucks out of Atlanta. Send us your load." />
    </>
  );
}
