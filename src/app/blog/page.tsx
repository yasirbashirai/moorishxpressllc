import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PostCover from "@/components/PostCover";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/icons";
import { PageHero } from "@/components/ui";
import { formatDate, posts } from "@/lib/posts";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Box Truck & Dispatch Blog | Freight Guides for Shippers and Owner-Operators",
  description:
    "Practical guides on box truck freight, CDL vs non-CDL box trucks, last-mile delivery, box truck dispatch and hotshot dispatch from Moorish Xpress in Atlanta.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <PageHero
        eyebrow="Blog"
        title={<>Freight knowledge <span className="text-red">from the road.</span></>}
        intro="Straight-talk guides for shippers, brokers and owner-operators, written by a box truck carrier that runs these lanes."
        crumbs={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }]}
      />

      <section className="py-20">
        <div className="container-x">
          {/* Featured */}
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-3xl border border-line bg-white transition hover:shadow-2xl lg:grid-cols-2">
              <div className="aspect-[16/10] lg:aspect-auto"><PostCover post={featured} large /></div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-sm text-steel">{formatDate(featured.date)} · {featured.readMins} min read</p>
                <h2 className="mt-3 text-3xl font-bold uppercase leading-tight sm:text-4xl">{featured.title}</h2>
                <p className="mt-4 text-steel">{featured.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display font-semibold uppercase tracking-wider text-red">Read article <IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="aspect-[16/10]"><PostCover post={p} /></div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs text-steel">{formatDate(p.date)} · {p.readMins} min read</p>
                    <h2 className="mt-2 flex-1 text-xl font-bold uppercase leading-snug">{p.title}</h2>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-red">Read <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
