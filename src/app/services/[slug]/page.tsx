import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { DispatchForm, QuoteForm } from "@/components/forms";
import { IconArrow, IconCheck, IconUsers } from "@/components/icons";
import { Button, Faq, PageHero, SectionHeading } from "@/components/ui";
import { getService, services, site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every service page at build time
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: { absolute: `${s.metaTitle} | Moorish Xpress` },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, images: [s.image] },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const isDispatch = s.group === "dispatch";
  const parent = isDispatch ? { href: "/dispatch", label: "Dispatch Services" } : { href: "/services", label: "Freight Services" };
  const others = services.filter((x) => x.slug !== s.slug && x.group === s.group);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.keyword,
    description: s.metaDescription,
    provider: { "@id": `${site.url}/#business` },
    areaServed: ["Georgia", "Southern United States", "Texas", "Tennessee", "North Carolina", "South Carolina", "Oklahoma", "Virginia", "Midwest United States", "Northeast United States"],
    url: `${site.url}/services/${s.slug}`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema(s.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: parent.label, path: parent.href }, { name: s.title, path: `/services/${s.slug}` }])} />

      <PageHero
        eyebrow={s.keyword}
        title={s.title}
        intro={s.short}
        image={s.image}
        imageAlt={s.imageAlt}
        crumbs={[{ href: "/", label: "Home" }, parent, { href: `/services/${s.slug}`, label: s.title }]}
      >
        {isDispatch ? (
          <>
            <Button href="#signup">Dispatch My Truck</Button>
            <Button href={`tel:+16789687511`} variant="ghost">Call {site.phone}</Button>
          </>
        ) : (
          <>
            <Button href="#quote">Get a Quote</Button>
            <Button href={`tel:+16789687511`} variant="ghost">Call {site.phone}</Button>
          </>
        )}
      </PageHero>

      <section className="py-24">
        <div className="container-x grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="text-4xl font-bold uppercase leading-tight">{s.title} with Moorish Xpress</h2>
              <p className="mt-5 text-lg leading-relaxed text-steel">{s.intro}</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="mt-12 text-2xl font-bold uppercase">What you get</h3>
              <ul className="mt-5 grid gap-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-4 rounded-xl border border-line p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-gradient text-white"><IconCheck className="h-4 w-4" /></span>
                    <span className="text-graphite">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-12 rounded-2xl bg-red-gradient p-8 text-white shadow-xl shadow-red/20">
                <p className="flex items-center gap-3 font-display text-xl font-semibold uppercase text-white"><IconUsers className="h-6 w-6" />Ideal for</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                  {s.idealFor.map((x) => <li key={x} className="rounded-lg bg-white/15 p-4 text-sm text-white">{x}</li>)}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <h3 className="mt-14 text-2xl font-bold uppercase">Frequently asked</h3>
              <div className="mt-6"><Faq items={s.faqs} /></div>
            </Reveal>
          </div>

          <aside id={isDispatch ? "signup" : "quote"} className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
            {isDispatch ? (
              <div className="rounded-2xl bg-red-gradient p-2 shadow-xl shadow-red/20"><DispatchForm /></div>
            ) : (
              <QuoteForm title={`Quote: ${s.title}`} />
            )}
          </aside>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-fog py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Related" title={isDispatch ? "More dispatch services" : "More freight services"} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-40">
                  <Image src={o.image} alt={o.imageAlt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold uppercase">{o.title}</h3>
                  <p className="mt-2 text-sm text-steel">{o.short}</p>
                  <span className="mt-3 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase text-red">Learn more <IconArrow className="h-4 w-4" /></span>
                </div>
              </Link>
            ))}
            {isDispatch && (
              <Link href="/services" className="flex flex-col justify-center rounded-2xl bg-red-gradient p-8 text-white">
                <h3 className="text-2xl font-bold uppercase">Need freight hauled?</h3>
                <p className="mt-2 text-white/85">See our 26 ft box truck freight services out of Atlanta.</p>
                <span className="mt-4 inline-flex items-center gap-2 font-display font-semibold uppercase">Freight services <IconArrow className="h-5 w-5" /></span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
