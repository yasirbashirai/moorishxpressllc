import { site } from "@/lib/site";
import { IconFacebook, IconInstagram, IconLinkedin } from "./icons";

/** Official MOORISH XPRESS LLC social pages (no Twitter/X). Each opens in a new tab. */
export const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: IconInstagram },
  { href: site.social.facebook, label: "Facebook", Icon: IconFacebook },
  { href: site.social.linkedin, label: "LinkedIn", Icon: IconLinkedin },
].filter((s) => s.href);

/** Row of clickable social icons. `tone` switches between dark and light backgrounds. */
export function SocialLinks({ tone = "dark", size = "md", className = "" }: { tone?: "dark" | "light"; size?: "md" | "lg"; className?: string }) {
  const box = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const icon = size === "lg" ? "h-6 w-6" : "h-5 w-5";
  const styles =
    tone === "dark"
      ? "bg-red text-white hover:bg-red-deep"
      : "bg-red text-white hover:bg-red-deep";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.shortName} on ${label} (opens in a new tab)`}
          title={`${site.shortName} on ${label}`}
          className={`flex ${box} items-center justify-center rounded-lg transition hover:-translate-y-0.5 ${styles}`}
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  );
}

/**
 * BBB badge supplied by the client. Display-only: no link, no "profile" wording.
 */
export function BbbBadge({ size = "md", className = "" }: { size?: "xs" | "sm" | "md" | "lg" | "xl"; className?: string }) {
  const { badgeSrc, badgeAlt, badgeWidth, badgeHeight } = site.bbb;
  if (!badgeSrc) return null;
  const h = { xs: "h-9", sm: "h-11 sm:h-[3.25rem]", md: "h-20", lg: "h-24", xl: "h-36" }[size];
  // Per the client: the badge is display-only (no link). The seal image from BBB has
  // "Click for Profile" printed in its bottom-right corner, so that corner is covered in white.
  return (
    <span className={`relative inline-block shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-black/10 ${size === "xs" || size === "sm" ? "p-1" : "p-2"} ${className}`}>
      <span className="relative block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badgeSrc} alt={badgeAlt} width={badgeWidth} height={badgeHeight} style={{ border: 0 }} className={`${h} w-auto max-w-none`} />
        <span aria-hidden="true" className="absolute bottom-0 right-0 h-[19%] w-[51%] bg-white" />
      </span>
    </span>
  );
}

/** True once the BBB badge has been configured (used to hide wrapper sections). */
export const hasBbb = Boolean(site.bbb.badgeSrc);
