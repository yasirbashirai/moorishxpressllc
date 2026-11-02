import Image from "next/image";
import Link from "next/link";
import { carrierServices, dispatchServices, fullAddress, nav, site } from "@/lib/site";
import { IconClock, IconFacebook, IconInstagram, IconLinkedin, IconMail, IconMap, IconPhone } from "./icons";

const socials = [
  { href: site.social.facebook, label: "Facebook", Icon: IconFacebook },
  { href: site.social.instagram, label: "Instagram", Icon: IconInstagram },
  { href: site.social.linkedin, label: "LinkedIn", Icon: IconLinkedin },
].filter((s) => s.href);

/** Site footer: brand, services, company links and contact details. */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="h-2 bg-hazard opacity-90" aria-hidden="true" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/images/logo-sm.png" alt={`${site.name} logo`} width={571} height={447} className="h-28 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Asset-based box truck carrier and dispatch service based in Atlanta, Georgia. We haul for shippers and brokers, and we dispatch box trucks and hotshots for owner-operators.
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${site.shortName} on ${label}`} className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-red">
                  <Icon />
                </a>
              ))}
            </div>
          )}
          {(site.usdot || site.mc) && (
            <p className="mt-5 text-xs uppercase tracking-wider text-white/50">
              {site.usdot && <>USDOT {site.usdot}</>}{site.usdot && site.mc && " · "}{site.mc && <>MC {site.mc}</>}
            </p>
          )}
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-gold">Carrier</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {carrierServices.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>
            ))}
          </ul>
          <h3 className="eyebrow mt-8 text-gold">Dispatch</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {dispatchServices.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-gold">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.slice(1).map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
            ))}
            <li><Link href="/dispatch#signup" className="hover:text-white">Dispatch Sign-Up</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="eyebrow text-gold">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li><a href={site.phoneHref} className="flex items-center gap-3 font-display text-2xl font-semibold text-white hover:text-gold"><IconPhone className="h-5 w-5 text-red-light" />{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white"><IconMail className="h-5 w-5 text-red-light" />{site.email}</a></li>
            <li><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white"><IconMap className="h-5 w-5 shrink-0 text-red-light" />{fullAddress}</a></li>
            <li className="flex items-center gap-3"><IconClock className="h-5 w-5 text-red-light" />Open 24 hours, 7 days a week</li>
          </ul>
          <Link href="/contact#quote" className="mt-7 inline-flex rounded-md bg-red-gradient px-6 py-3 font-display font-semibold uppercase tracking-wider text-white transition hover:-translate-y-0.5">
            Request a Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-display uppercase tracking-[0.2em] text-gold/80">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
