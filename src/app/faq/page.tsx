import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { Faq, PageHero } from "@/components/ui";
import { faqGroups, site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ | Box Truck Freight & Dispatch Questions | Moorish Xpress",
  description:
    "Answers about Moorish Xpress freight transportation and dispatch services: equipment, coverage, carrier packets, partial truckload, U-Box transport and box truck and hotshot dispatch.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqGroups.flatMap((g) => g.items))} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])} />

      <PageHero
        eyebrow="Frequently asked questions"
        title={<>Straight <span className="text-red">answers.</span></>}
        intro="Everything brokers, shippers and owner-operators usually ask us. Don't see your question? Call dispatch 24/7."
        crumbs={[{ href: "/", label: "Home" }, { href: "/faq", label: "FAQ" }]}
      />

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[16rem_1fr]">
          {/* Jump links */}
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-red">Topics</p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="block rounded-lg border border-line px-4 py-2.5 font-display text-sm font-medium uppercase tracking-wide text-ink transition hover:border-red/40 hover:text-red">{g.title}</a>
                </li>
              ))}
            </ul>
            <a href={site.phoneHref} className="mt-6 hidden rounded-xl bg-red-gradient p-5 text-white lg:block">
              <span className="block text-xs uppercase tracking-widest text-white/75">Still have questions?</span>
              <span className="font-display text-2xl font-semibold">{site.phone}</span>
            </a>
          </nav>

          <div className="space-y-16">
            {faqGroups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-28">
                <h2 className="text-3xl font-bold uppercase text-ink sm:text-4xl">{g.title}</h2>
                <div className="mt-6"><Faq items={g.items} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
