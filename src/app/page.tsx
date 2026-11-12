import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Bento from "@/components/concepts/command-center/Bento";
import FadeIn from "@/components/concepts/command-center/FadeIn";
import HeroV1 from "@/components/home/HeroV1";
import ConsoleSection from "@/components/concepts/command-center/ConsoleSection";
import OperatorDashboard from "@/components/concepts/command-center/OperatorDashboard";
import ScrollRail from "@/components/concepts/command-center/ScrollRail";
import TrackingCard from "@/components/concepts/command-center/TrackingCard";
import JsonLd from "@/components/JsonLd";
import { BbbBadge, hasBbb, SocialLinks } from "@/components/Social";
import { DispatchForm, QuoteForm } from "@/components/forms";
import { CoverageMap } from "@/components/interactive";
import { IconClock, IconDoc, IconHeadset, IconLift, IconMail, IconPhone, IconRoute, IconShield, IconTruck, IconWeight } from "@/components/icons";
import { Faq } from "@/components/ui";
import { homeFaqs, site, trucks } from "@/lib/site";
import { faqSchema } from "@/lib/schema";

// Homepage v2: Concept B (Command Center) with the original v1 hero.
// Title/description come from the root layout defaults.
export const metadata: Metadata = { alternates: { canonical: "/" } };

/** Section opener: small pill eyebrow + big display headline. */
function Head({ eyebrow, title, intro, center = false, dark = false }: { eyebrow: string; title: React.ReactNode; intro?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] ${dark ? "bg-white/15 text-white ring-1 ring-white/25" : "bg-white text-red shadow-sm ring-1 ring-black/5"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-white" : "bg-red"}`} />{eyebrow}
      </span>
      <h2 className={`mt-5 font-display text-[clamp(2.3rem,5vw,4.2rem)] font-bold uppercase leading-[0.95] tracking-tight ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/85" : "text-steel"}`}>{intro}</p>}
    </div>
  );
}

const facts = [
  { Icon: IconTruck, t: "26 ft box trucks", s: "CDL + non-CDL" },
  { Icon: IconWeight, t: "33,000 lb GVWR", s: "Class B CDL unit" },
  { Icon: IconLift, t: "Tuck-under liftgate", s: "On every truck" },
  { Icon: IconShield, t: "Air-ride suspension", s: "Gentle on freight" },
  { Icon: IconClock, t: "Open 24/7", s: "Dispatch never sleeps" },
  { Icon: IconRoute, t: "Nationwide", s: "From Atlanta, GA" },
];

const updates = [
  { Icon: IconDoc, t: "Booked", d: "Rate confirmed in writing, truck assigned to your load." },
  { Icon: IconTruck, t: "Picked up", d: "On-time pickup, liftgate if there is no dock, BOL signed." },
  { Icon: IconRoute, t: "In transit", d: "Check calls along the way, without you chasing us." },
  { Icon: IconShield, t: "Delivered + POD", d: "Proof of delivery sent fast so you can close it out." },
];

export default function HomePage() {
  return (
    <div className="bg-[#f6f6f8]">
      <JsonLd data={faqSchema(homeFaqs)} />
      <ScrollRail />
      <HeroV1 />
      <ConsoleSection />

      {/* ============ FACT STRIP ============ */}
      <section className="relative border-y border-black/5 bg-white">
        <div className="container-x grid grid-cols-2 divide-black/5 md:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {facts.map((f, i) => (
            <FadeIn key={f.t} delay={i * 0.05} className="flex items-center gap-3 px-3 py-6 lg:justify-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fog text-red"><f.Icon className="h-5 w-5" /></span>
              <span>
                <span className="block font-display text-sm font-semibold uppercase tracking-wide text-ink">{f.t}</span>
                <span className="block text-xs text-steel">{f.s}</span>
              </span>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============ TRUST: BBB badge (shows once configured) + socials ============ */}
      <section className="border-b border-black/5 bg-white">
        <div className="container-x flex flex-col items-center justify-center gap-5 py-6 text-center sm:flex-row sm:gap-10 sm:text-left">
          {hasBbb && (
            <div className="flex items-center gap-4">
              <BbbBadge size="lg" />
            </div>
          )}
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-ink">Follow MOORISH XPRESS LLC</span>
            <SocialLinks tone="light" />
          </div>
        </div>
      </section>

      {/* ============ VISIBILITY / TRACKING ============ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(215,20,26,0.14),transparent_65%)] blur-2xl" />
        <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
          <FadeIn>
            <Head eyebrow="Visibility" title={<>Know where your freight is. <span className="text-red-gradient">Always.</span></>} intro="Shippers and brokers hate chasing carriers. So we built our process around updates you never have to ask for." />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {updates.map((u, i) => (
                <div key={u.t} className="group rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-gradient text-white shadow-md shadow-red/25"><u.Icon className="h-5 w-5" /></span>
                    <span className="font-display text-3xl font-bold text-black/[0.07]">0{i + 1}</span>
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-ink">{u.t}</p>
                  <p className="mt-1 text-sm text-steel">{u.d}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_30%,rgba(215,20,26,0.18),transparent_60%)] blur-2xl" />
            <TrackingCard />
          </FadeIn>
        </div>
      </section>

      {/* ============ SERVICES BENTO ============ */}
      <section className="pb-28">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <FadeIn><Head eyebrow="Services" title={<>Freight + dispatch. <span className="text-red-gradient">Equal priority.</span></>} /></FadeIn>
            <FadeIn delay={0.1}><p className="max-w-sm text-steel">Four ways we haul your freight with our own 26 ft box trucks, and two ways we keep owner-operators and small fleets loaded, organized and moving.</p></FadeIn>
          </div>
          <div className="mt-12"><Bento /></div>
        </div>
      </section>

      {/* ============ EQUIPMENT SPEC SHEET ============ */}
      <section className="pb-28">
        <div className="container-x">
          <FadeIn className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_40px_100px_-40px_rgba(12,12,14,0.3)]">
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              <div className="relative min-h-[18rem] overflow-hidden bg-blush">
                <Image src="/images/moorish-box-truck.jpg" alt="MOORISH XPRESS LLC yellow 26 ft box truck with tuck-under liftgate at an Atlanta warehouse" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover object-left" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                  {["Our truck", "Atlanta, GA"].map((t) => (
                    <span key={t} className="rounded-full bg-white/85 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink backdrop-blur">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-7 sm:p-10">
                <Head eyebrow="Spec sheet" title={<>The right truck <span className="text-red-gradient">for the load.</span></>} />
                <div className="mt-8 overflow-hidden rounded-2xl border border-black/5">
                  <div className="grid grid-cols-[1fr_auto_auto] bg-fog px-4 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-steel">
                    <span>Spec</span><span className="w-24 text-center">Class B CDL</span><span className="w-24 text-center">Non-CDL</span>
                  </div>
                  {[
                    ["GVWR", `${trucks[0].gvwr.toLocaleString()} lb`, `${trucks[1].gvwr.toLocaleString()} lb`],
                    ["Driver", "Class B CDL", "Non-CDL"],
                    ["Liftgate", "Tuck-under", "Tuck-under"],
                    ["Suspension", "Air-ride", "Air-ride"],
                    ["Best for", "Heavier loads", "Everyday freight"],
                  ].map(([k, a, b], i) => (
                    <div key={k} className={`grid grid-cols-[1fr_auto_auto] items-center px-4 py-3 text-sm ${i % 2 ? "bg-fog/50" : "bg-white"}`}>
                      <span className="font-semibold text-ink">{k}</span>
                      <span className="w-24 text-center font-display font-semibold text-red">{a}</span>
                      <span className="w-24 text-center text-graphite">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ DISPATCH (red emphasis) ============ */}
      <section id="dispatch" className="relative overflow-hidden bg-red-gradient py-28 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_65%)] blur-2xl" />
          <div className="absolute -right-32 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(120,6,10,0.35),transparent_65%)] blur-2xl" />
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>
        <div className="container-x relative">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <FadeIn><Head dark eyebrow="For owner-operators" title={<>A dispatch desk <span className="bg-[linear-gradient(120deg,#ffffff,#ffd9d9)] bg-clip-text text-transparent">that drives too.</span></>} /></FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg leading-relaxed text-white/85">We run 26 ft box trucks ourselves, so we dispatch box trucks and hotshots like an owner-operator would: loads that fit, rates that pay, paperwork handled, and you approve every load.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/services/box-truck-dispatch" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-red">Professional freight dispatching →</Link>
                <Link href="/services/freight-documentation-load-coordination" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-red">Freight documentation →</Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} className="mt-14"><OperatorDashboard /></FadeIn>

          <div id="signup" className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
            <FadeIn>
              <p className="font-display text-3xl font-semibold uppercase text-white">Start in four steps</p>
              <ol className="mt-6 space-y-3">
                {["Send your details (1 minute)", "Quick intro call with a dispatcher", "Send your MC, insurance and W-9", "We start booking loads you approve"].map((t, i) => (
                  <li key={t} className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-lg font-bold text-red">{i + 1}</span>
                    <span className="text-white">{t}</span>
                  </li>
                ))}
              </ol>
              <a href={site.phoneHref} className="mt-8 inline-flex items-center gap-3 text-white/85 hover:text-white">
                <IconHeadset className="h-6 w-6 text-white" /> Prefer to talk? <span className="font-display text-xl font-semibold text-white">{site.phone}</span>
              </a>
            </FadeIn>
            <FadeIn delay={0.1}><DispatchForm /></FadeIn>
          </div>
        </div>
      </section>

      {/* ============ COVERAGE ============ */}
      <section className="py-28">
        <div className="container-x">
          <FadeIn><Head eyebrow="Coverage" title={<>Atlanta hub. <span className="text-red-gradient">Nationwide lanes.</span></>} intro="From Atlanta, GA to the Midwest, the Northeast, the Southern states and the West Coast. Tap a region to light up the lanes." /></FadeIn>
          <FadeIn delay={0.1} className="mt-12 rounded-[2rem] border border-black/5 bg-white/60 p-4 shadow-[0_30px_80px_-40px_rgba(12,12,14,0.3)] backdrop-blur sm:p-6">
            <CoverageMap />
          </FadeIn>
        </div>
      </section>

      {/* ============ QUOTE + FAQ ============ */}
      <section id="quote" className="relative overflow-hidden pb-28">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(215,20,26,0.14),transparent_65%)] blur-2xl" />
        <div className="container-x relative grid items-start gap-14 lg:grid-cols-2">
          <FadeIn>
            <Head eyebrow="Get a quote" title={<>Send the load. <span className="text-red-gradient">We&apos;ll match the truck.</span></>} intro="Three quick steps. Your quote request goes straight to dispatch, and we reply with availability and a clear rate." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={site.phoneHref} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-gradient text-white"><IconPhone className="h-5 w-5" /></span>
                <span><span className="block text-[0.65rem] font-bold uppercase tracking-wider text-steel">Call 24/7</span><span className="font-display text-lg font-semibold">{site.phone}</span></span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blush text-red ring-1 ring-red/15"><IconMail className="h-5 w-5" /></span>
                <span className="min-w-0"><span className="block text-[0.65rem] font-bold uppercase tracking-wider text-steel">Email loads</span><span className="block truncate text-sm font-semibold">{site.email}</span></span>
              </a>
            </div>
            <div className="mt-10"><Faq items={homeFaqs} /></div>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:sticky lg:top-28">
            <div className="rounded-[1.6rem] bg-white/50 p-2 shadow-[0_40px_100px_-40px_rgba(12,12,14,0.4)] ring-1 ring-black/5 backdrop-blur">
              <QuoteForm title="Get your freight quote" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="pb-24">
        <div className="container-x">
          <FadeIn className="relative overflow-hidden rounded-[2rem] bg-red-gradient p-10 text-white shadow-[0_40px_100px_-30px_rgba(215,20,26,0.6)] sm:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/25 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(90deg,transparent,black)]" />
            <div className="absolute right-12 top-1/2 hidden -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl shadow-black/20 lg:block">
              <Image src="/images/logo-sm.png" alt={`${site.name} logo`} width={581} height={453} className="h-auto w-64 xl:w-72" />
            </div>
            <div className="relative max-w-2xl">
              <p className="font-display text-sm uppercase tracking-[0.3em] text-white/85">{site.tagline}</p>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold uppercase leading-[0.95]">Let&apos;s connect. Let&apos;s talk freight.</h2>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-display font-semibold uppercase tracking-wider text-red shadow-lg shadow-black/15 transition hover:-translate-y-0.5">Get a Freight Quote →</a>
                <a href="#signup" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-7 py-4 font-display font-semibold uppercase tracking-wider text-white transition hover:bg-white/10 hover:-translate-y-0.5">Dispatch My Truck →</a>
              </div>
              <a href={site.phoneHref} className="mt-6 inline-flex items-center gap-2 font-display text-2xl font-semibold"><IconPhone className="h-6 w-6" />{site.phone}</a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
