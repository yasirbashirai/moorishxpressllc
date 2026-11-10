// Single source of truth for Moorish Xpress business details and service content.
// Edit here and every page, the footer, schema and sitemap update together.
// Content follows the client's "Website Development Requirements" brief (Nov 2026).

export const site = {
  name: "Moorish Xpress, LLC",
  shortName: "Moorish Xpress",
  tagline: "When you need it there now",
  url: "https://moorishxpressllc.com",
  phone: "(678) 968-7511",
  phoneHref: "tel:+16789687511",
  email: "loads@moorishxpress.com",
  owner: "Jude Hood",
  hours: "Open 24/7",
  address: {
    street: "2920 Campbellton Rd SW",
    city: "Atlanta",
    region: "GA",
    zip: "30311",
    country: "US",
  },
  mapsUrl: "https://maps.google.com/?q=2920+Campbellton+Rd+SW+Atlanta+GA+30311",
  // Official pages supplied by the client. Every icon opens in a new tab. (No Twitter/X.)
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61595701983981",
    instagram: "https://www.instagram.com/moorishxpressllc/",
    linkedin: "https://www.linkedin.com/company/146762894/",
  },
  // Official BBB seal supplied by the client (Nov 2026), used exactly as BBB issues it:
  // hotlinked from BBB's seal server and linked to the BBB business profile.
  // Note: the profile is listed as "Els & Beys Investments, LLC"; client confirmed to use it.
  bbb: {
    profileUrl: "https://www.bbb.org/us/ga/atlanta/profile/real-estate-investing/els-beys-investments-llc-0443-28164016/#sealclick",
    badgeSrc: "https://seal-atlanta.bbb.org/seals/black-seal-187-130-bbb-28164016.png",
    badgeAlt: "Els & Beys Investments, LLC BBB Business Review",
    badgeWidth: 187,
    badgeHeight: 130,
  },
  // FMCSA numbers: add once confirmed by the client. Hidden while empty.
  usdot: "",
  mc: "",
  // Google review link: add once the Google Business Profile is live.
  googleReviewUrl: "",
};

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.zip}`;

/** Company description supplied by the client (used on About + footer). */
export const companyDescription = [
  "Moorish Xpress LLC is an Atlanta, Georgia–based freight transportation and truck dispatch company. We provide freight hauling services with our 26 ft box trucks and professional dispatch services for owner-operators and small trucking companies.",
  "We work with both freight brokers and shippers to meet their freight transportation needs while helping carriers find loads, coordinate trips and manage communication and paperwork. Our dispatch approach focuses on securing competitive rates, reducing empty miles and keeping trucks moving efficiently.",
  "We believe strong business relationships start with clear communication, attention to detail and consistent follow-through. Whether you have freight to move or need dispatch support, let's talk about your next load.",
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Freight Services" },
  { href: "/dispatch", label: "Dispatch Services" },
  { href: "/brokers-shippers", label: "Brokers & Shippers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/**
 * Extra pages (Blog, Reviews) stay live for search engines but are not linked
 * in the menu or footer: the client's PDF lists exactly 7 website pages.
 */
export const moreLinks: { href: string; label: string }[] = [];

/** The two truck types in the fleet. Used by the spec toggle and the load-fit checker. */
export const trucks = [
  {
    id: "cdl",
    name: "Class B CDL Box Truck",
    gvwr: 33000,
    badge: "Heavy-load option",
    summary:
      "Our 26 ft box truck rated at 33,000 lb GVWR is operated by a Class B CDL holder, so it can legally carry heavier freight than a standard non-CDL box truck.",
    specs: ["26 ft box truck", "33,000 lb GVWR", "Class B CDL driver", "Tuck-under liftgate", "Air-ride suspension"],
  },
  {
    id: "noncdl",
    name: "Non-CDL Box Truck",
    gvwr: 26000,
    badge: "Everyday freight",
    summary:
      "Our 26 ft non-CDL box trucks rated at 26,000 lb GVWR are built for palletized and boxed freight, dock or no dock, on regional and long-distance lanes.",
    specs: ["26 ft box truck", "26,000 lb GVWR", "Non-CDL driver", "Tuck-under liftgate", "Air-ride suspension"],
  },
] as const;

export type Service = {
  slug: string;
  group: "carrier" | "dispatch";
  title: string;
  short: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  intro: string;
  points: string[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  /* ---------------- Freight transportation (our own trucks) ---------------- */
  {
    slug: "otr-box-truck-freight",
    group: "carrier",
    title: "Over-the-Road (OTR) Freight Transportation",
    short: "Long-distance interstate freight hauling using 26-foot box trucks.",
    keyword: "OTR box truck freight transportation",
    metaTitle: "OTR Box Truck Freight Transportation | Interstate Freight Carrier Atlanta GA",
    metaDescription:
      "Over-the-road box truck freight from Atlanta, GA. Moorish Xpress hauls long-distance, interstate freight in 26 ft box trucks to the Midwest, the Northeast and the Southern states. Open 24/7.",
    image: "/images/box-truck-otr-highway.jpg",
    imageAlt: "26 ft box truck hauling over-the-road freight on an interstate highway at sunset",
    intro:
      "Our primary focus is over-the-road freight in 26 ft box trucks. When your freight needs to leave Georgia and arrive on time, we run long-distance, interstate lanes out of Atlanta into the Midwest, the Northeast and the Southern states, including Texas, Tennessee, the Carolinas, Oklahoma and Virginia.",
    points: [
      "Dedicated 26 ft box truck: your freight is not waiting in a terminal for consolidation",
      "33,000 lb GVWR Class B CDL box truck for heavier loads, plus 26,000 lb GVWR non-CDL box trucks",
      "Tuck-under liftgate on every truck for pickups and deliveries without a dock",
      "Air-ride suspension for a smoother ride on long-distance runs",
      "Direct line to dispatch 24/7 for check calls and shipment updates",
    ],
    idealFor: ["Freight brokers with box truck loads on the board", "Shippers moving long-distance box truck loads", "Interstate runs from Atlanta, GA"],
    faqs: [
      {
        q: "Which states do you run OTR?",
        a: "We are based in Atlanta, Georgia and run lanes across the Midwest, the Northeast and the Southern states, including Texas, Tennessee, North Carolina, South Carolina, Oklahoma and Virginia. Send us your lane and we will confirm availability.",
      },
      {
        q: "How much can your box trucks carry?",
        a: "We run 26 ft box trucks: a 33,000 lb GVWR box truck operated by a Class B CDL holder and 26,000 lb GVWR non-CDL box trucks. Payload depends on the truck, so share your weight and pallet count and we will match the right unit.",
      },
    ],
  },
  {
    slug: "palletized-freight-transportation",
    group: "carrier",
    title: "Palletized Freight Transportation",
    short: "Transportation of palletized commercial goods for freight brokers, shippers, warehouses, and distribution centers.",
    keyword: "palletized freight transportation services",
    metaTitle: "Palletized Freight Transportation Atlanta GA | Long Distance Pallet Shipping",
    metaDescription:
      "Palletized freight transportation from Atlanta, GA. 26 ft box trucks with a tuck-under liftgate and air-ride suspension move pallets for brokers, shippers, warehouses and distribution centers.",
    image: "/images/box-trucks-loading-dock.jpg",
    imageAlt: "Two box trucks parked at a warehouse loading dock ready for palletized freight",
    intro:
      "We move palletized commercial goods between factories, warehouses and distribution centers, short haul or long distance. From first-mile pickups at the supplier to last-mile delivery at the receiver, our 26 ft box trucks with tuck-under liftgates handle docks and ground-level locations alike.",
    points: [
      "Palletized freight for brokers, shippers, warehouses and distribution centers",
      "Tuck-under liftgate for pickups and deliveries with or without a dock",
      "First-mile pickups and last-mile deliveries as part of the run",
      "Clear BOL at pickup and proof of delivery (POD) at drop-off",
    ],
    idealFor: ["Manufacturers shipping to a distribution center", "Warehouses with scheduled outbound shipments", "3PLs needing reliable box truck capacity"],
    faqs: [
      {
        q: "Can you pick up or deliver without a loading dock?",
        a: "Yes. Every one of our trucks has a tuck-under liftgate, so ground-level pickups and deliveries are not a problem.",
      },
      {
        q: "Do you handle recurring shipments?",
        a: "Yes. Tell us the schedule, lanes and volume and we will talk about setting up recurring pickups.",
      },
    ],
  },
  {
    slug: "partial-truckload-freight",
    group: "carrier",
    title: "Partial Truckload (PTL) Freight Transportation",
    short: "Transportation of smaller freight shipments that do not require the entire truck, subject to available capacity and route compatibility.",
    keyword: "partial truckload freight transportation",
    metaTitle: "Partial Truckload (PTL) Freight Transportation | Box Truck Carrier Atlanta GA",
    metaDescription:
      "Partial truckload freight transportation by box truck from Atlanta, GA. Ship a few pallets without paying for the whole truck, subject to capacity and route.",
    image: "/images/box-truck-city-delivery.jpg",
    imageAlt: "White box truck making a partial truckload delivery in the city",
    intro:
      "Not every shipment needs a full truck. When your freight takes up only part of a 26 ft box truck, we can move it as a partial truckload, subject to available capacity and route compatibility.",
    points: [
      "Ship a few pallets without paying for the whole truck",
      "Subject to available capacity and route compatibility",
      "Same equipment standard: tuck-under liftgate and air-ride suspension on every truck",
      "Direct communication with dispatch from pickup to delivery",
    ],
    idealFor: ["Shippers with a few pallets to move", "Brokers with partial box truck loads", "Freight that fits our existing lanes"],
    faqs: [
      {
        q: "How do I know if my partial load fits?",
        a: "Send us your pallet count, dimensions, weight and lane. We will check available capacity and route compatibility and let you know quickly.",
      },
      {
        q: "Is partial truckload cheaper than a full truck?",
        a: "Usually, because you only pay for the space your freight uses. The final rate depends on the lane, timing and how your freight fits with our route.",
      },
    ],
  },
  {
    slug: "u-box-container-transportation",
    group: "carrier",
    title: "U-Haul U-Box Transportation",
    short: "Long-distance transportation of U-Haul U-Box containers, subject to equipment suitability and load requirements.",
    keyword: "U-Haul U-Box transportation services",
    metaTitle: "U-Haul U-Box Transportation Services | Long Distance Box Truck Atlanta GA",
    metaDescription:
      "Long-distance transportation of U-Haul U-Box containers by 26 ft box truck from Atlanta, GA, subject to equipment suitability and load requirements.",
    image: "/images/box-truck-warehouse.jpg",
    imageAlt: "Box truck parked beside a warehouse, ready for long-distance container transport",
    intro:
      "We transport U-Haul U-Box containers long distance in our 26 ft box trucks. Every move is subject to equipment suitability and load requirements, so we confirm the details with you before we book.",
    points: [
      "Long-distance U-Box container transportation",
      "26 ft box trucks with tuck-under liftgate and air-ride suspension",
      "Subject to equipment suitability and load requirements",
      "Clear communication from pickup to delivery",
    ],
    idealFor: ["Long-distance U-Box moves", "Customers relocating out of state", "Shipments that fit our lanes"],
    faqs: [
      {
        q: "Are you part of U-Haul?",
        a: "No. Moorish Xpress, LLC is an independent carrier and is not affiliated with U-Haul. We transport U-Box containers as a hauling service.",
      },
      {
        q: "What do you need to quote a U-Box move?",
        a: "The number of containers, the pickup and delivery locations, approximate weight and your timing. We will confirm equipment suitability and load requirements before we book.",
      },
    ],
  },

  /* ---------------- Dispatch services (for other carriers) ---------------- */
  {
    slug: "box-truck-dispatch",
    group: "dispatch",
    title: "Professional Freight Dispatching Services",
    short: "Dispatch support for owner-operators and small trucking companies, including load searching, broker communication, rate negotiation, scheduling, and shipment coordination.",
    keyword: "professional freight dispatch services",
    metaTitle: "Professional Freight Dispatch Services | Box Truck & Hotshot Dispatch Atlanta GA",
    metaDescription:
      "Professional freight dispatching for box trucks and hotshots. Moorish Xpress helps owner-operators and small trucking companies with load searching, broker communication, rate negotiation, scheduling and shipment coordination.",
    image: "/images/moorish-box-truck.jpg",
    imageAlt: "Moorish Xpress yellow 26 ft box truck at a warehouse",
    intro:
      "We dispatch box trucks and hotshots. We are a box truck carrier ourselves, so we dispatch the way we would want to be dispatched. For independent owner-operators, small trucking companies and new and growing carriers, we find loads that fit your truck, your lanes and your schedule, and we handle the back-and-forth with brokers.",
    points: [
      "Dispatch for 26 ft box trucks and hotshots",
      "Load searching across load boards and broker relationships",
      "Rate negotiation aimed at competitive rates and fewer empty miles",
      "Broker communication, setup packets and rate confirmations",
      "Scheduling, route planning and shipment coordination",
      "One dispatcher who knows your truck and your goals",
    ],
    idealFor: ["Box truck and hotshot owner-operators", "Small trucking companies and fleets", "New and growing carriers"],
    faqs: [
      {
        q: "Do you force loads on drivers?",
        a: "No. You approve every load before it is booked. Our job is to bring good options and negotiate, not to push you into lanes you do not want.",
      },
      {
        q: "Do you dispatch hotshots?",
        a: "Yes. We dispatch box trucks and hotshots. Tell us your truck, trailer and weight limits and we will only bring you loads that fit your setup.",
      },
      {
        q: "What do I need to get started?",
        a: "Your active MC/DOT authority, certificate of insurance, W-9 and truck details. Fill in the dispatch sign-up form and we will walk you through the rest.",
      },
    ],
  },
  {
    slug: "freight-documentation-load-coordination",
    group: "dispatch",
    title: "Freight Documentation and Load Coordination",
    short: "Managing rate confirmations, Bills of Lading (BOLs), Proofs of Delivery (PODs), and shipment updates as part of our transportation and dispatching services.",
    keyword: "truck dispatching and load coordination",
    metaTitle: "Freight Documentation and Load Coordination | Rate Cons, BOLs, PODs",
    metaDescription:
      "Moorish Xpress manages rate confirmations, Bills of Lading, Proofs of Delivery and shipment updates as part of our transportation and dispatching services.",
    image: "/images/box-trucks-loading-dock.jpg",
    imageAlt: "Box trucks at a warehouse loading dock, where BOLs are signed at pickup",
    intro:
      "Paperwork is where loads get delayed and payments get stuck. As part of our transportation and dispatching services, we manage rate confirmations, Bills of Lading (BOLs), Proofs of Delivery (PODs) and shipment updates, so every load is documented from booking to payment.",
    points: [
      "Rate confirmations reviewed and organized",
      "Bills of Lading (BOLs) checked at pickup",
      "Proofs of Delivery (PODs) collected and sent quickly",
      "Shipment updates for brokers, shippers and carriers",
    ],
    idealFor: ["Owner-operators who want less office work", "Small fleets without a back office", "Brokers who want clean, fast paperwork"],
    faqs: [
      {
        q: "Is documentation included with dispatch?",
        a: "Yes. Managing rate confirmations, BOLs, PODs and shipment updates is part of our dispatching service, and part of every load we haul ourselves.",
      },
      {
        q: "Why does fast POD delivery matter?",
        a: "Brokers and factoring companies usually need the POD before they pay. Sending it quickly helps carriers get paid faster.",
      },
    ],
  },
];

export const carrierServices = services.filter((s) => s.group === "carrier");
export const dispatchServices = services.filter((s) => s.group === "dispatch");
export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Coverage regions shown on the coverage map. */
export const regions = [
  { name: "Southeast", states: ["GA", "FL", "AL", "SC", "NC", "TN", "MS"] },
  { name: "South & Texas", states: ["TX", "OK", "LA", "AR"] },
  { name: "Mid-Atlantic & Northeast", states: ["VA", "MD", "PA", "NJ", "NY"] },
  { name: "Midwest", states: ["OH", "IN", "IL", "KY", "MI"] },
];

/** Home-page FAQs (also emitted as FAQPage schema). */
export const homeFaqs = [
  {
    q: "Are you a carrier or a broker?",
    a: "We are an asset-based carrier. Moorish Xpress operates its own 26 ft box trucks out of Atlanta, and we also offer dispatch services for other box truck and hotshot owner-operators.",
  },
  {
    q: "What is the difference between your CDL and non-CDL box trucks?",
    a: "Our Class B CDL box truck has a 33,000 lb GVWR, so it can carry heavier freight than our 26,000 lb GVWR non-CDL box trucks. Both have a tuck-under liftgate and air-ride suspension.",
  },
  {
    q: "Do you work with freight brokers?",
    a: "Yes. We work with brokers and with shippers directly. Brokers can request our carrier setup packet by email or phone.",
  },
  {
    q: "What hours are you available?",
    a: "Dispatch is available 24/7. Call (678) 968-7511 or email loads@moorishxpress.com any time.",
  },
  {
    q: "Do you only dispatch box trucks?",
    a: "We dispatch box trucks and hotshots. If you run another equipment type, reach out and we will tell you honestly if we are a fit.",
  },
];

/** Full FAQ page, grouped by audience. Each group also feeds FAQPage schema. */
export const faqGroups = [
  {
    id: "general",
    title: "About Moorish Xpress",
    items: [
      homeFaqs[0],
      {
        q: "Where are you located?",
        a: "Our office is at 2920 Campbellton Rd SW, Atlanta, GA 30311. We haul freight from Atlanta, GA to the Midwest, the Northeast and the Southern states.",
      },
      homeFaqs[3],
    ],
  },
  {
    id: "freight",
    title: "Freight transportation",
    items: [
      homeFaqs[1],
      {
        q: "What freight services do you offer?",
        a: "Over-the-road (OTR) freight transportation, palletized freight transportation, partial truckload (PTL) freight and U-Haul U-Box container transportation, all in 26 ft box trucks.",
      },
      {
        q: "Which areas do you cover?",
        a: "We run long-distance, interstate lanes from Atlanta into the Midwest, the Northeast and the Southern states, including Texas, Tennessee, North Carolina, South Carolina, Oklahoma and Virginia.",
      },
      {
        q: "Do your trucks have liftgates?",
        a: "Yes. Every truck has a tuck-under liftgate and air-ride suspension, for convenient loading and a smoother ride.",
      },
      {
        q: "Do you offer partial truckload?",
        a: "Yes, for smaller shipments that do not need the whole truck, subject to available capacity and route compatibility.",
      },
    ],
  },
  {
    id: "brokers",
    title: "Brokers & shippers",
    items: [
      homeFaqs[2],
      {
        q: "How do I get your carrier setup packet?",
        a: "Email loads@moorishxpress.com or call (678) 968-7511 and we will send our carrier packet the same day.",
      },
      {
        q: "Do you work directly with shippers?",
        a: "Yes. We work with freight brokers today and we welcome direct contracts with shippers, manufacturers, warehouses and distribution centers.",
      },
      {
        q: "How will I get updates on my load?",
        a: "Our dispatch is available 24/7 for check calls. We confirm pickup, send updates in transit, and share the proof of delivery (POD) quickly after delivery.",
      },
    ],
  },
  {
    id: "dispatch",
    title: "Dispatch services",
    items: [
      homeFaqs[4],
      {
        q: "Who do you dispatch for?",
        a: "Independent owner-operators, small trucking companies, and new and growing carriers running box trucks or hotshots.",
      },
      {
        q: "What does your dispatch service include?",
        a: "Load sourcing, freight rate negotiation, broker communication, route and shipment coordination, and freight documentation support: rate confirmations, BOLs and PODs.",
      },
      {
        q: "Do I approve every load?",
        a: "Yes. You approve every load before it is booked. There is no forced dispatch.",
      },
      {
        q: "What do I need to get started?",
        a: "An active MC/DOT authority, certificate of insurance, W-9 and your truck details. Fill in the dispatch sign-up form or call us.",
      },
    ],
  },
];
