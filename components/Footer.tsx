import Image from "next/image";
import Link from "next/link";
import { carrierServices, dispatchServices, fullAddress, moreLinks, nav, site } from "@/lib/site";
import { IconClock, IconMail, IconMap, IconPhone } from "./icons";
import { Marquee } from "./interactive";
import SmartLink from "./SmartLink";
import { BbbBadge, SocialLinks } from "./Social";

/** Site footer: brand, services, company links and contact details. */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white text-graphite">
      <div className="h-1.5 bg-red-gradient" aria-hidden="true" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/images/logo-sm.png" alt={`${site.name} logo`} width={581} height={453} className="h-28 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Atlanta, Georgia-based freight transportation and truck dispatch company. We haul freight in our 26 ft box trucks for brokers and shippers, and we dispatch box trucks, hotshots, flatbeds, reefers and dry vans for owner-operators and small trucking companies.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-steel">Follow us</p>
          <SocialLinks tone="light" className="mt-3" />
          <div className="mt-6"><BbbBadge size="lg" /></div>
          {(site.usdot || site.mc) && (
            <p className="mt-5 text-xs uppercase tracking-wider text-steel">
              {site.usdot && <>USDOT {site.usdot}</>}{site.usdot && site.mc && " · "}{site.mc && <>MC {site.mc}</>}
            </p>
          )}
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-red">Freight</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {carrierServices.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-red">{s.title}</Link></li>
            ))}
          </ul>
          <h3 className="eyebrow mt-8 text-red">Dispatch</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {dispatchServices.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-red">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-red">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[...nav.slice(1), ...moreLinks].map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-red">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="eyebrow text-red">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li><a href={site.phoneHref} className="flex items-center gap-3 font-display text-2xl font-semibold text-ink hover:text-red"><IconPhone className="h-5 w-5 text-red" />{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-red"><IconMail className="h-5 w-5 text-red" />{site.email}</a></li>
            <li className="flex items-start gap-3"><IconMap className="h-5 w-5 shrink-0 text-red" />{fullAddress}</li>
            <li className="flex items-center gap-3"><IconClock className="h-5 w-5 text-red" />Open 24 hours, 7 days a week</li>
          </ul>
          <SmartLink href="/contact#quote" className="mt-7 inline-flex rounded-md bg-red-gradient px-6 py-3 font-display font-semibold uppercase tracking-wider text-white transition hover:-translate-y-0.5">
            Request a Quote
          </SmartLink>
        </div>
      </div>

      {/* Bottom red band: tagline across the full width, everything loops like the homepage marquee */}
      <div className="bg-red-gradient">
        <Marquee size="xl" items={Array(8).fill(site.tagline)} className="pb-1 pt-3 !bg-none" />
        <Marquee
          size="sm"
          items={Array(3).fill([`© ${new Date().getFullYear()} ${site.name}. All rights reserved.`, "Atlanta, GA 30311", site.phone, site.email, "Open 24/7"]).flat()}
          className="pb-2.5 pt-1 !bg-none"
        />
      </div>
    </footer>
  );
}
