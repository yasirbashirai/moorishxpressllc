import Image from "next/image";
import { site } from "@/lib/site";
import { Button } from "./ui";
import { IconPhone } from "./icons";

/** Closing call-to-action band used at the bottom of most pages. */
export default function CtaBand({
  title = "Freight on your board? Let's talk lanes.",
  text = "Shippers and brokers: send us the load and we will match the right truck. Owner-operators: Let us keep your truck loaded 24/7.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-red-gradient text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-[1fr_auto_auto]">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold uppercase leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-white/90">{text}</p>
          <a href={site.phoneHref} className="mt-5 inline-flex items-center gap-2 font-display text-2xl font-semibold text-white">
            <IconPhone className="h-6 w-6" />{site.phone}
          </a>
        </div>
        {/* Buttons stacked vertically */}
        <div className="flex flex-col gap-4 sm:max-w-xs">
          <Button href="/contact#quote" variant="dark">Get a Quote</Button>
          <Button href="/dispatch#signup" variant="gold">Dispatch My Truck</Button>
        </div>
        {/* Logo: upright, original colours, on white so nothing tints it */}
        <div className="flex justify-center rounded-2xl bg-white p-5 shadow-xl shadow-black/15 sm:max-w-xs lg:max-w-none">
          <Image src="/images/logo-sm.png" alt={`${site.name} logo`} width={581} height={453} className="h-auto w-56 lg:w-64" />
        </div>
      </div>
    </section>
  );
}
