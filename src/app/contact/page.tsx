import type { Metadata } from "next";
import SmartLink from "@/components/SmartLink";
import JsonLd from "@/components/JsonLd";
import { QuoteForm } from "@/components/forms";
import { IconArrow, IconClock, IconHeadset, IconMail, IconMap, IconPhone } from "@/components/icons";
import { BbbBadge, SocialLinks } from "@/components/Social";
import { PageHero } from "@/components/ui";
import { fullAddress, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact MOORISH XPRESS LLC | Box Truck Freight Quote Atlanta GA",
  description:
    "Contact MOORISH XPRESS LLC in Atlanta, GA 30311. Call (678) 968-7511 or email loads@moorishxpress.com. Dispatch open 24/7.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cards = [
    { Icon: IconPhone, k: "Call dispatch 24/7", v: site.phone, href: site.phoneHref },
    { Icon: IconMail, k: "Email loads", v: site.email, href: `mailto:${site.email}` },
    { Icon: IconMap, k: "Location", v: fullAddress, href: site.mapsUrl },
    { Icon: IconClock, k: "Hours", v: "Open 24 hours, 7 days a week" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s talk <span className="text-red">freight.</span></>}
        intro="Send a load, ask for our carrier packet, or sign up for dispatch. Whether you have freight to move or need dispatch support, let's talk about your next load. We answer 24/7."
        crumbs={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }]}
      />

      <section className="relative -mt-1 py-20">
        <div className="container-x grid gap-12 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {cards.map((c) => {
              const body = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-gradient text-white"><c.Icon className="h-6 w-6" /></span>
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-steel">{c.k}</span>
                    <span className="font-semibold text-ink">{c.v}</span>
                  </span>
                </>
              );
              return c.href ? (
                <a key={c.k} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-line bg-white p-5 transition hover:border-red/40 hover:shadow-lg">{body}</a>
              ) : (
                <div key={c.k} className="flex items-center gap-4 rounded-xl border border-line bg-white p-5">{body}</div>
              );
            })}

            <SmartLink href="/dispatch#signup" className="group flex items-center justify-between gap-4 rounded-xl bg-red-gradient p-6 text-white shadow-lg shadow-red/20 transition hover:shadow-red/40">
              <span className="flex items-center gap-4">
                <IconHeadset className="h-9 w-9" />
                <span><span className="block font-display text-xl font-bold uppercase">Owner-operator?</span><span className="text-sm">Sign up for truck dispatch</span></span>
              </span>
              <IconArrow className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </SmartLink>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white p-5">
              <span>
                <span className="block text-xs uppercase tracking-widest text-steel">Follow MOORISH XPRESS LLC</span>
                <span className="font-semibold text-ink">Instagram · Facebook · LinkedIn</span>
              </span>
              <SocialLinks tone="light" size="lg" />
            </div>

            <div className="overflow-hidden rounded-xl border border-line">
              <iframe
                title="MOORISH XPRESS LLC location map"
                src="https://www.google.com/maps?q=Atlanta,+GA+30311&z=11&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div id="quote" className="lg:col-span-3">
            <QuoteForm title="Request a freight quote" />
            {/* Larger BBB badge directly below the quote form */}
            <div className="mt-8 flex justify-center"><BbbBadge size="xl" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
