import SmartLink from "./SmartLink";
import { site } from "@/lib/site";
import { IconPhone } from "./icons";

/** Fixed bottom bar on phones: one tap to call, one tap to quote. */
export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-black/10 bg-white md:hidden">
      <a href={site.phoneHref} className="flex items-center justify-center gap-2 py-4 font-display font-semibold uppercase tracking-wide text-ink">
        <IconPhone className="h-5 w-5 text-red" /> Call 24/7
      </a>
      <SmartLink href="/contact#quote" className="bg-red-gradient py-4 text-center font-display font-semibold uppercase tracking-wide text-white">
        Get a Quote
      </SmartLink>
    </div>
  );
}
