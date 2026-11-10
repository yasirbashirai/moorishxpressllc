import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./icons";

/** Primary (solid red), secondary (white with red outline), ghost and dark buttons. */
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
    // "gold" is the legacy name for the secondary button: white with a red outline
    gold: "bg-white text-red ring-2 ring-inset ring-red shadow-lg shadow-red/10 hover:bg-red hover:text-white",
    ghost: "border-2 border-ink/15 bg-white text-ink hover:border-red hover:text-red",
    dark: "bg-white text-red shadow-lg shadow-black/10 hover:bg-blush",
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
      <p className={`eyebrow flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${dark ? "text-white/90" : "text-red"}`}>
        <span className="h-0.5 w-8 bg-current" />{eyebrow}
      </p>
      <h2 className={`mt-4 text-4xl font-bold uppercase leading-[1.05] sm:text-5xl ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/85" : "text-steel"}`}>{intro}</p>}
    </div>
  );
}

/**
 * Light hero for inner pages, with breadcrumb.
 * White + red brand: text sits on white on the left, the photo fills the right
 * side and fades into the white. `bright` keeps the photo fully visible (About page).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  crumbs,
  children,
  bright = false,
  imagePosition = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  image?: string;
  imageAlt?: string;
  crumbs: { href: string; label: string }[];
  children?: React.ReactNode;
  bright?: boolean;
  imagePosition?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white text-ink">
      {image && (
        <div className="absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden lg:block">
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            priority
            sizes="60vw"
            style={{ objectPosition: imagePosition }}
            className="animate-kenburns object-cover"
          />
          {/* Fade the photo into the white text side */}
          <div className={`absolute inset-0 bg-gradient-to-r from-white ${bright ? "via-white/10 to-transparent" : "via-white/40 to-white/5"}`} />
        </div>
      )}
      <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-red/10 blur-[120px]" />
      <div className="container-x relative py-16 sm:py-24">
        <div className="max-w-2xl">
          <nav className="flex flex-wrap gap-2 text-sm text-steel" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex gap-2">
                {i > 0 && <span>/</span>}
                {i < crumbs.length - 1 ? <Link href={c.href} className="hover:text-red">{c.label}</Link> : <span className="font-semibold text-red">{c.label}</span>}
              </span>
            ))}
          </nav>
          <p className="eyebrow mt-8 flex items-center gap-3 text-red"><span className="h-0.5 w-8 bg-current" />{eyebrow}</p>
          <h1 className="mt-4 text-5xl font-bold uppercase leading-[1.02] text-ink sm:text-6xl lg:text-[4.2rem]">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">{intro}</p>
          {children && <div className="mt-9 flex flex-wrap gap-4">{children}</div>}
        </div>
      </div>
      {/* Mobile: photo below the text */}
      {image && (
        <div className="relative aspect-[16/9] w-full lg:hidden">
          <Image src={image} alt="" fill sizes="100vw" style={{ objectPosition: imagePosition }} className="object-cover" />
        </div>
      )}
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
