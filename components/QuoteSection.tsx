import { fullAddress, site } from "@/lib/site";
import { QuoteForm } from "./forms";
import { IconClock, IconMail, IconMap, IconPhone } from "./icons";
import { SectionHeading } from "./ui";

/** Quote form + direct contact panel. Placed on every major page. */
export default function QuoteSection({ title = "Get a quote in under a minute." }: { title?: string }) {
  return (
    <section id="quote" className="bg-fog py-24">
      <div className="container-x grid items-start gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Request a quote" title={title} intro="Tell us about the load and we will reply with availability and a clear rate. Prefer to talk? Dispatch picks up 24/7." />
          <ul className="mt-10 space-y-4">
            <li><a href={site.phoneHref} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-gradient text-white"><IconPhone className="h-6 w-6" /></span><span><span className="block text-xs uppercase tracking-widest text-steel">Call dispatch</span><span className="font-display text-2xl font-semibold">{site.phone}</span></span></a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-gradient text-ink"><IconMail className="h-6 w-6" /></span><span><span className="block text-xs uppercase tracking-widest text-steel">Email loads</span><span className="font-semibold">{site.email}</span></span></a></li>
            <li className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm"><span className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-gold"><IconMap className="h-6 w-6" /></span><span className="text-graphite">{fullAddress}</span></li>
            <li className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm"><span className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-gold"><IconClock className="h-6 w-6" /></span><span className="text-graphite">Open 24 hours, 7 days a week</span></li>
          </ul>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
