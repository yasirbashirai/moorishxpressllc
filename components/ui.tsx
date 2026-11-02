import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./icons";

/** Primary (red), secondary (gold) and ghost buttons used across the site. */
export function Button({
  href,
  children,
  variant = "red",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "red" | "gold" | "ghost" | "dark";
  className?: string;
}) {
  const styles = {
    red: "bg-red-gradient text-white shadow-lg shadow-red/30 hover:shadow-red/50",
    gold: "bg-gold-gradient text-ink shadow-lg shadow-gold/30 hover:shadow-gold/50",
    ghost: "border-2 border-white/30 text-white hover:border-gold hover:text-gold",
    dark: "bg-ink text-white hover:bg-coal",
  }[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-md px-7 py-4 font-display text-base font-semibold uppercase tracking-wider transition duration-300 hover:-translate-y-0.5 ${styles} ${className}`}
    >
      {children}
      <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Eyebrow + headline + intro used to open each section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${dark ? "text-gold" : "text-red"}`}>
        <span className="h-0.5 w-8 bg-current" />{eyebrow}
      </p>
      <h2 className={`mt-4 text-4xl font-bold uppercase leading-[1.05] sm:text-5xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/70" : "text-steel"}`}>{intro}</p>}
    </div>
  );
}

/** Dark photo hero for inner pages, with breadcrumb. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  image?: string;
  imageAlt?: string;
  crumbs: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {image && <Image src={image} alt={imageAlt || ""} fill priority sizes="100vw" className="animate-kenburns object-cover opacity-45" />}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="container-x relative py-20 sm:py-28">
        <nav className="flex flex-wrap gap-2 text-sm text-white/60" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex gap-2">
              {i > 0 && <span>/</span>}
              {i < crumbs.length - 1 ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-gold">{c.label}</span>}
            </span>
          ))}
        </nav>
        <p className="eyebrow mt-8 flex items-center gap-3 text-gold"><span className="h-0.5 w-8 bg-current" />{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold uppercase leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>
        {children && <div className="mt-9 flex flex-wrap gap-4">{children}</div>}
      </div>
      <div className="relative h-1.5 bg-red-gradient" />
    </section>
  );
}

/** Accordion FAQ built on native <details> (works without JavaScript). */
export function Faq({ items, dark = false }: { items: { q: string; a: string }[]; dark?: boolean }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className={`group rounded-lg border p-6 transition open:shadow-lg ${dark ? "border-white/10 bg-white/5 open:bg-white/10" : "border-line bg-white open:border-red/30"}`}>
          <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-medium uppercase tracking-wide ${dark ? "text-white" : "text-ink"}`}>
            {f.q}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-gradient text-white transition-transform duration-300 group-open:rotate-45">+</span>
          </summary>
          <p className={`mt-4 leading-relaxed ${dark ? "text-white/70" : "text-steel"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
