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
    default: "Box Truck Carrier & Dispatch Services Atlanta GA | Moorish Xpress",
    template: "%s | Moorish Xpress",
  },
  description:
    "Moorish Xpress, LLC is an Atlanta, GA box truck carrier and dispatch service. OTR, first mile, last mile and white glove freight, plus box truck and hotshot dispatch. Open 24/7.",
  keywords: [
    "box truck carrier Atlanta",
    "box truck dispatch service",
    "hotshot dispatch service",
    "OTR box truck freight",
    "last mile delivery Atlanta",
    "first mile freight",
    "white glove delivery",
    "26 ft box truck with liftgate",
    "CDL box truck 33000 GVWR",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: "/images/og-share.jpg", width: 1200, height: 630, alt: "Moorish Xpress, LLC: When you need it there now" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/og-share.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0c0c0e" };

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
