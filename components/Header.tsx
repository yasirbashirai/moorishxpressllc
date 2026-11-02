"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { dispatchServices, nav, site } from "@/lib/site";
import { IconClock, IconMail, IconMap, IconPhone } from "./icons";

/**
 * Sticky header: slim operations bar on top, main nav below.
 * Shrinks and gains a shadow on scroll; collapses into a drawer on mobile.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  // Dispatch service pages live under /services but belong to the Dispatch menu item
  const onDispatchService = dispatchServices.some((s) => pathname === `/services/${s.slug}`);
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/dispatch") return pathname.startsWith("/dispatch") || onDispatchService;
    if (href === "/services") return pathname.startsWith("/services") && !onDispatchService;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Operations bar */}
      <div className="hidden bg-red-gradient text-white md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Dispatch open 24/7
            </span>
            <span className="flex items-center gap-1.5"><IconMap className="h-3.5 w-3.5" />Atlanta, GA · Southeast, South, Midwest & Northeast</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-1.5 lg:flex"><IconClock className="h-3.5 w-3.5" />{site.tagline}</span>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-gold-light"><IconMail className="h-3.5 w-3.5" />{site.email}</a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`border-b border-white/10 transition-all duration-300 ${scrolled ? "bg-ink/95 shadow-2xl shadow-black/30 backdrop-blur-xl" : "bg-ink"}`}>
        <div className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image
              src="/images/logo-sm.png"
              alt={`${site.name} logo`}
              width={571}
              height={447}
              priority
              className={`w-auto drop-shadow-[0_4px_14px_rgba(255,193,7,0.25)] transition-all duration-300 ${scrolled ? "h-[3.25rem]" : "h-[4.25rem]"}`}
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 font-display text-[0.95rem] font-medium uppercase tracking-wide transition-colors xl:px-4 ${isActive(item.href) ? "text-gold" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
                {isActive(item.href) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gold-gradient xl:inset-x-4" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="hidden items-center gap-2 font-display text-lg font-semibold text-white xl:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><IconPhone className="h-4 w-4 text-gold" /></span>
              {site.phone}
            </a>
            <Link href="/contact#quote" className="hidden rounded-md bg-red-gradient px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-red/30 transition hover:-translate-y-0.5 hover:shadow-red/50 sm:inline-flex">
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`grid overflow-hidden transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0">
            <nav className="container-x flex flex-col gap-1 pb-6" aria-label="Mobile">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={`rounded-md px-4 py-3 font-display text-lg uppercase tracking-wide ${isActive(item.href) ? "bg-white/10 text-gold" : "text-white/85"}`}>
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link href="/contact#quote" className="rounded-md bg-red-gradient px-4 py-3 text-center font-display font-semibold uppercase text-white">Get a Quote</Link>
                <Link href="/dispatch#signup" className="rounded-md bg-gold-gradient px-4 py-3 text-center font-display font-semibold uppercase text-ink">Dispatch My Truck</Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
