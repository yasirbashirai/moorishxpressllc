import { site } from "@/lib/site";
import { IconFacebook, IconInstagram, IconLinkedin } from "./icons";

/** Official Moorish Xpress social pages (no Twitter/X). Each opens in a new tab. */
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
      ? "bg-white/10 text-white ring-1 ring-white/15 hover:bg-red hover:ring-red"
      : "bg-ink text-white hover:bg-red";
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
 * Official BBB badge linked to the company's BBB business profile.
 * Renders nothing until the client supplies the badge file + profile URL in site.ts,
 * so the site never shows an unofficial or inaccurate BBB status.
 */
export function BbbBadge({ className = "" }: { className?: string }) {
  const { profileUrl, badgeSrc, badgeAlt, badgeWidth, badgeHeight } = site.bbb;
  if (!profileUrl || !badgeSrc) return null;
  // Plain <img> on purpose: BBB requires its seal served unmodified from its own server.
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="nofollow noopener"
      className={`inline-block rounded-lg bg-white p-2 transition hover:-translate-y-0.5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={badgeSrc} alt={badgeAlt} width={badgeWidth} height={badgeHeight} style={{ border: 0 }} className="h-16 w-auto" />
    </a>
  );
}

/** True once the BBB badge has been configured (used to hide wrapper sections). */
export const hasBbb = Boolean(site.bbb.profileUrl && site.bbb.badgeSrc);
