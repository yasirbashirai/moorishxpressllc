"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Link that works on every click.
 *
 * Why this exists: Next.js <Link> skips the scroll when the address already ends in
 * the same #section (for example a second click on "Get a Quote" after the first click
 * put #quote in the address bar), so the button looked dead after its first use.
 * Here, links to a section on the current page always scroll to it, and phone / email
 * links are plain anchors so the device's dialer or mail app opens directly.
 */
export default function SmartLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: { href: string; children: React.ReactNode; className?: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const pathname = usePathname();

  // tel:, mailto: and full URLs: plain anchor, handled by the browser / phone
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return <a href={href} className={className} onClick={onClick} {...rest}>{children}</a>;
  }

  const [path, hash] = href.split("#");
  const samePage = hash && (path === "" || path === pathname);

  if (samePage) {
    return (
      <a
        href={`#${hash}`}
        className={className}
        {...rest}
        onClick={(e) => {
          onClick?.(e);
          const el = document.getElementById(hash);
          if (!el) return; // let the browser handle it
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", `#${hash}`);
        }}
      >
        {children}
      </a>
    );
  }

  return <Link href={href} className={className} onClick={onClick} {...rest}>{children}</Link>;
}
