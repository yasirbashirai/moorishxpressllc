import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MobileCallBar from "@/components/MobileCallBar";
import { site } from "@/lib/site";
import { businessSchema } from "@/lib/schema";
import "./globals.css";

// Brand typography: Oswald for bold freight-style headlines, Inter for body copy
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Box Truck Freight & Dispatch Services Atlanta GA | MOORISH XPRESS LLC",
    template: "%s | MOORISH XPRESS LLC",
  },
  description:
    "MOORISH XPRESS LLC is an Atlanta, GA freight transportation and truck dispatch company. OTR, palletized and partial truckload freight in 26 ft box trucks, plus box truck and hotshot dispatch. Open 24/7.",
  keywords: [
    // Client-supplied SEO keywords (Website Development Requirements, Nov 2026)
    "26 ft box truck freight services",
    "Atlanta Georgia box truck trucking company",
    "OTR box truck freight transportation",
    "long distance box truck freight hauling",
    "interstate freight carrier Atlanta GA",
    "palletized freight transportation services",
    "box truck freight carrier for brokers",
    "reliable freight carriers in Atlanta Georgia",
    "26 foot straight truck freight transportation",
    "long distance palletized freight shipping",
    "partial truckload freight transportation",
    "U-Haul U-Box transportation services",
    "freight carrier services",
    "direct shipper transportation services",
    "freight broker partnerships",
    "independent trucking services",
    "professional freight dispatch services",
    "truck dispatching services for owner operators",
    "freight dispatch services for small trucking companies",
    "independent truck dispatcher",
    "box truck dispatching services",
    "hotshot dispatch services",
    "dispatch services for 26 ft box trucks and hotshots",
    "freight load booking and dispatch services",
    "truck dispatching and load coordination",
    "OTR freight dispatch services",
    "dispatch support for small trucking fleets",
    "first-mile transportation",
    "last-mile delivery",
    "freight transportation company Atlanta GA",
    "box truck freight services Atlanta Georgia",
    "Atlanta-based interstate trucking company",
    "freight dispatch services Atlanta Georgia",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: "/images/og-share.jpg", width: 1200, height: 630, alt: "MOORISH XPRESS LLC: When you need it there now" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/og-share.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#d7141a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${oswald.variable} ${inter.variable}`}>
      <body className="pb-16 md:pb-0">
        <JsonLd data={businessSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
