import type { NextConfig } from "next";

// Static-friendly config: images are local, so no remote patterns needed
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // Old service URLs from v1 of the site, kept alive so links and search results don't 404.
  // White glove was removed (not offered); first/last mile now live inside palletized freight.
  async redirects() {
    return [
      { source: "/services/white-glove-delivery", destination: "/services", permanent: true },
      { source: "/blog/white-glove-freight-delivery-what-to-expect", destination: "/blog", permanent: true },
      { source: "/services/first-mile-freight", destination: "/services/palletized-freight-transportation", permanent: true },
      { source: "/services/last-mile-delivery", destination: "/services/palletized-freight-transportation", permanent: true },
    ];
  },
};

export default nextConfig;
