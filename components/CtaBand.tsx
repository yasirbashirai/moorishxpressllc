import Image from "next/image";
import { site } from "@/lib/site";
import { Button } from "./ui";
import { IconPhone } from "./icons";

/** Closing call-to-action band used at the bottom of most pages. */
export default function CtaBand({
  title = "Freight on your board? Let's talk lanes.",
  text = "Shippers and brokers: send us the load and we will match the right truck. Owner-operators: let us keep your truck loaded.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-red-gradient text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <Image src="/images/logo-sm.png" alt="" width={581} height={453} className="pointer-events-none absolute -right-16 -top-10 hidden w-[420px] rotate-6 opacity-20 lg:block" />
      <div className="container-x relative flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold uppercase leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-white/85">{text}</p>
          <a href={site.phoneHref} className="mt-5 inline-flex items-center gap-2 font-display text-2xl font-semibold text-white">
            <IconPhone className="h-6 w-6" />{site.phone} · 24/7
          </a>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact#quote" variant="dark">Get a Quote</Button>
          <Button href="/dispatch#signup" variant="gold">Dispatch My Truck</Button>
        </div>
      </div>
    </section>
  );
}
