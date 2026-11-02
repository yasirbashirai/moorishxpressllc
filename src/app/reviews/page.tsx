import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { ReviewForm } from "@/components/forms";
import { IconClock, IconDoc, IconPhone, IconShield, IconStar } from "@/components/icons";
import { PageHero, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Customer Reviews | Moorish Xpress Box Truck Carrier Atlanta",
  description:
    "Read and share reviews of Moorish Xpress, an Atlanta box truck carrier and dispatch service. Worked with us? Tell us how we did.",
  alternates: { canonical: "/reviews" },
};

/**
 * Add real customer reviews here as they come in (with permission).
 * The page shows the "be one of our first reviews" layout while this is empty.
 */
const reviews: { name: string; company?: string; rating: number; text: string }[] = [];

const promises = [
  { Icon: IconClock, t: "On-time pickups", d: "We show up when we say we will, or we call you before it matters." },
  { Icon: IconPhone, t: "Check calls without chasing", d: "Updates at pickup, in transit and at delivery." },
  { Icon: IconDoc, t: "Paperwork done right", d: "Clean BOLs, quick PODs and invoices that match the rate con." },
  { Icon: IconShield, t: "Freight treated with care", d: "Liftgate handling and air-ride suspension on every truck." },
];

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }])} />
      <PageHero
        eyebrow="Reviews"
        title={<>Earned one load <span className="text-gold">at a time.</span></>}
        intro="We are a growing Atlanta carrier, and every review here comes from a real shipper, broker or owner-operator we have worked with."
        crumbs={[{ href: "/", label: "Home" }, { href: "/reviews", label: "Reviews" }]}
      />

      <section className="py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            {reviews.length > 0 ? (
              <div className="space-y-5">
                {reviews.map((r) => (
                  <Reveal key={r.name} className="rounded-2xl border border-line bg-white p-7 shadow-sm">
                    <div className="flex gap-1 text-gold">{Array.from({ length: r.rating }).map((_, i) => <IconStar key={i} className="h-5 w-5 fill-current" />)}</div>
                    <p className="mt-4 text-lg leading-relaxed text-graphite">&ldquo;{r.text}&rdquo;</p>
                    <p className="mt-4 font-display font-semibold uppercase">{r.name}{r.company && <span className="text-steel"> · {r.company}</span>}</p>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <SectionHeading eyebrow="Our promise" title={<>What every customer <span className="text-red">should be able to say.</span></>} intro="We are building our reputation the right way, so we do not post made-up testimonials. Until our reviews fill this page, here is the standard we hold ourselves to." />
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {promises.map((p) => (
                    <div key={p.t} className="rounded-2xl border border-line p-6 transition hover:border-red/40 hover:shadow-lg">
                      <p.Icon className="h-8 w-8 text-red" />
                      <h3 className="mt-4 text-xl font-bold uppercase">{p.t}</h3>
                      <p className="mt-1 text-steel">{p.d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
            {site.googleReviewUrl && (
              <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-md bg-ink px-6 py-3 font-display font-semibold uppercase tracking-wider text-white">
                Review us on Google
              </a>
            )}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4 text-red">Worked with us?</p>
            <ReviewForm />
          </div>
        </div>
      </section>

      <CtaBand title="Be our next success story." />
    </>
  );
}
