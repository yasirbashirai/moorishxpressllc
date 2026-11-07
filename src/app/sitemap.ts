import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";
import { posts } from "@/lib/posts";

// XML sitemap for search engines: core pages, every service and every article
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/dispatch", "/brokers-shippers", "/faq", "/contact", "/reviews", "/blog"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const svc = services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: new Date(), priority: 0.9 }));
  const articles = posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 }));
  return [...pages, ...svc, ...articles];
}
