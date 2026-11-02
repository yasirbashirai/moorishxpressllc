import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { QuoteForm } from "@/components/forms";
import { IconArrow, IconClock, IconFacebook, IconHeadset, IconInstagram, IconLinkedin, IconMail, IconMap, IconPhone } from "@/components/icons";
import { PageHero } from "@/components/ui";
import { fullAddress, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Moorish Xpress | Box Truck Freight Quote Atlanta GA",
  description:
    "Contact Moorish Xpress, LLC at 2920 Campbellton Rd SW, Atlanta, GA 30311. Call (678) 968-7511 or email loads@moorishxpress.com. Dispatch open 24/7.",
  alternates: { canonical: "/contact" },
};

const socials = [
  { href: site.social.facebook, label: "Facebook", Icon: IconFacebook },
  { href: site.social.instagram, label: "Instagram", Icon: IconInstagram },
  { href: site.social.linkedin, label: "LinkedIn", Icon: IconLinkedin },
].filter((s) => s.href);

export default function ContactPage() {
  const cards = [
    { Icon: IconPhone, k: "Call dispatch 24/7", v: site.phone, href: site.phoneHref },
    { Icon: IconMail, k: "Email loads", v: site.email, href: `mailto:${site.email}` },
    { Icon: IconMap, k: "Office", v: fullAddress, href: site.mapsUrl },
    { Icon: IconClock, k: "Hours", v: "Open 24 hours, 7 days a week" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s talk <span className="text-gold">freight.</span></>}
        intro="Send a load, ask for our carrier packet, or sign up for dispatch. We answer 24/7."
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

            <Link href="/dispatch#signup" className="group flex items-center justify-between gap-4 rounded-xl bg-gold-gradient p-6 text-ink">
              <span className="flex items-center gap-4">
                <IconHeadset className="h-9 w-9" />
                <span><span className="block font-display text-xl font-bold uppercase">Owner-operator?</span><span className="text-sm">Sign up for box truck or hotshot dispatch</span></span>
              </span>
              <IconArrow className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>

            {socials.length > 0 && (
              <div className="flex gap-3 pt-2">
                {socials.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-md bg-ink text-white hover:bg-red"><Icon /></a>
                ))}
              </div>
            )}

            <div className="overflow-hidden rounded-xl border border-line">
              <iframe
                title="Moorish Xpress location map"
                src="https://www.google.com/maps?q=2920+Campbellton+Rd+SW,+Atlanta,+GA+30311&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div id="quote" className="lg:col-span-3">
            <QuoteForm title="Request a freight quote" />
          </div>
        </div>
      </section>
    </>
  );
}
