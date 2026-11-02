// Single source of truth for Moorish Xpress business details and service content.
// Edit here and every page, the footer, schema and sitemap update together.

export const site = {
  name: "Moorish Xpress, LLC",
  shortName: "Moorish Xpress",
  tagline: "When you need it there now",
  url: "https://www.moorishxpress.com",
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
  // TODO: paste the exact page URLs from Jude/his VA. Empty links stay hidden.
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  // FMCSA numbers: add once confirmed by the client. Hidden while empty.
  usdot: "",
  mc: "",
  // Google review link: add once the Google Business Profile is live.
  googleReviewUrl: "",
};

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.zip}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Carrier Services" },
  { href: "/dispatch", label: "Dispatch" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/** The two truck types in the fleet. Used by the spec toggle and the load-fit checker. */
export const trucks = [
  {
    id: "cdl",
    name: "CDL Class B Box Truck",
    gvwr: 33000,
    badge: "Heavy-load option",
    summary:
      "Our 33,000 lb GVWR box truck runs under a Class B CDL, so it can legally carry heavier freight than a standard non-CDL box truck.",
    specs: ["26 ft box", "33,000 lb GVWR", "Class B CDL driver", "Tuck-under liftgate", "Air-ride suspension"],
  },
  {
    id: "noncdl",
    name: "Non-CDL Box Truck",
    gvwr: 26000,
    badge: "Everyday freight",
    summary:
      "Our 26,000 lb GVWR box trucks are built for palletized and boxed freight, dock or no dock, across regional and long-haul lanes.",
    specs: ["Box truck", "26,000 lb GVWR", "Non-CDL", "Tuck-under liftgate", "Air-ride suspension"],
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
  {
    slug: "otr-box-truck-freight",
    group: "carrier",
    title: "OTR Box Truck Freight",
    short: "Over-the-road box truck hauling from Atlanta across the Southeast, South, Midwest and Northeast.",
    keyword: "OTR box truck carrier",
    metaTitle: "OTR Box Truck Carrier Atlanta GA | Long Haul Box Truck Freight",
    metaDescription:
      "Moorish Xpress is an Atlanta-based OTR box truck carrier hauling freight across the Southeast, South, Midwest and Northeast. 33,000 lb GVWR option, liftgate, 24/7.",
    image: "/images/otr-truck-highway.jpg",
    imageAlt: "Truck on an open highway hauling over-the-road freight",
    intro:
      "When your freight needs to leave Georgia and arrive on time, a dedicated box truck is often the fastest, simplest option. We run over-the-road lanes out of Atlanta into the Southeast, Texas and the South, the Midwest and the Northeast.",
    points: [
      "Dedicated truck: your load is not sitting in a terminal waiting for a consolidation",
      "33,000 lb GVWR CDL box truck for heavier loads, plus 26,000 lb non-CDL trucks",
      "Tuck-under liftgate on every truck for non-dock pickups and deliveries",
      "Air-ride suspension for freight that should not bounce for 600 miles",
      "Direct line to dispatch 24/7 for check calls and updates",
    ],
    idealFor: ["Freight brokers with box truck loads on the board", "Shippers moving partial or full box truck loads", "Expedited regional and multi-state runs"],
    faqs: [
      {
        q: "Which states do you run OTR?",
        a: "We are based in Atlanta and run lanes across the Southeast, Texas, Oklahoma and the South, the Midwest and the Northeast. Call or send a quote request with your lane and we will confirm availability.",
      },
      {
        q: "How much can your box trucks carry?",
        a: "We run a 33,000 lb GVWR Class B CDL box truck and 26,000 lb GVWR non-CDL box trucks. Payload depends on the truck, so share your weight and pallet count and we will match the right unit.",
      },
    ],
  },
  {
    slug: "first-mile-freight",
    group: "carrier",
    title: "First Mile Pickup",
    short: "Pickups from manufacturers, suppliers and warehouses moved to the dock, terminal or DC on time.",
    keyword: "first mile delivery Atlanta",
    metaTitle: "First Mile Freight Pickup Atlanta | Box Truck First Mile Delivery",
    metaDescription:
      "First mile freight pickup in Atlanta and the Southeast. Moorish Xpress moves product from suppliers and warehouses to terminals, DCs and cross-docks by box truck.",
    image: "/images/first-mile-dock-pickup.jpg",
    imageAlt: "Trucks backed into a warehouse loading dock for first mile pickup",
    intro:
      "The first mile sets the pace for the whole shipment. We pick up from suppliers, manufacturers and warehouses and get product to the cross-dock, terminal or distribution center when it is expected.",
    points: [
      "Supplier and warehouse pickups across metro Atlanta and the region",
      "Liftgate pickups where there is no dock",
      "Appointment-based pickups that respect cut-off times",
      "Clear BOL and pickup documentation",
    ],
    idealFor: ["Manufacturers shipping to a DC", "E-commerce sellers moving inventory", "3PLs needing reliable feeder capacity"],
    faqs: [
      {
        q: "Can you pick up without a loading dock?",
        a: "Yes. Every one of our trucks has a tuck-under liftgate, so ground-level pickups are not a problem.",
      },
      {
        q: "Do you handle recurring pickups?",
        a: "Yes. Tell us the schedule and volume and we will set up recurring pickups at a dedicated rate.",
      },
    ],
  },
  {
    slug: "last-mile-delivery",
    group: "carrier",
    title: "Last Mile Delivery",
    short: "Final delivery to stores, job sites, businesses and residences, liftgate included.",
    keyword: "last mile box truck delivery",
    metaTitle: "Last Mile Box Truck Delivery Atlanta GA | Liftgate Delivery",
    metaDescription:
      "Last mile box truck delivery in Atlanta and across the Southeast. Liftgate delivery to businesses, job sites and residences. Moorish Xpress, open 24/7.",
    image: "/images/last-mile-delivery-truck.jpg",
    imageAlt: "Truck on the road completing a last mile delivery",
    intro:
      "Last mile is where customers notice the service. We deliver to retail stores, offices, job sites and residential addresses, with a liftgate so freight comes off the truck safely even without a dock.",
    points: [
      "Liftgate delivery to ground-level locations",
      "Business, job-site and residential deliveries",
      "Delivery appointments and call-ahead on request",
      "Proof of delivery shared quickly",
    ],
    idealFor: ["Retail and furniture deliveries", "Construction and job-site materials", "Brokers needing a final-mile partner"],
    faqs: [
      {
        q: "Do you deliver to residential addresses?",
        a: "Yes. Liftgate delivery makes residential and other non-dock deliveries simple. Let us know about any access limits when you request a quote.",
      },
      {
        q: "Can the driver call ahead?",
        a: "Yes. Ask for a call-ahead or appointment when you book and we will build it into the run.",
      },
    ],
  },
  {
    slug: "white-glove-delivery",
    group: "carrier",
    title: "White Glove Delivery",
    short: "Careful handling for high-value, fragile and sensitive freight, from pickup to placement.",
    keyword: "white glove freight delivery",
    metaTitle: "White Glove Freight Delivery Atlanta | Careful Box Truck Transport",
    metaDescription:
      "White glove freight delivery from Atlanta. Air-ride box trucks, liftgate, careful handling and communication for fragile, high-value and sensitive shipments.",
    image: "/images/white-glove-freight.jpg",
    imageAlt: "Clean white truck used for careful white glove freight",
    intro:
      "Some freight needs more than a dock-to-dock move. For fragile, high-value or sensitive items we handle with care, use air-ride trucks, and stay in touch with you until it is delivered.",
    points: [
      "Air-ride suspension to reduce shock and vibration",
      "Liftgate handling instead of hand-dropping off the deck",
      "Blanket-wrapping and securing on request",
      "Direct communication with the driver and dispatch",
    ],
    idealFor: ["Fixtures, displays and furniture", "Medical, retail and office equipment", "Trade show and event freight"],
    faqs: [
      {
        q: "What does white glove include?",
        a: "Careful loading, securing, liftgate handling and clear communication. If you need inside delivery or placement, tell us in your quote request and we will confirm what we can do for that load.",
      },
      {
        q: "Is white glove more expensive?",
        a: "It usually takes more time and care than a standard delivery, so it is priced per job. Send your details and we will quote it clearly upfront.",
      },
    ],
  },
  {
    slug: "box-truck-dispatch",
    group: "dispatch",
    title: "Box Truck Dispatch",
    short: "We find, negotiate and book box truck loads so owner-operators can focus on driving.",
    keyword: "box truck dispatch service",
    metaTitle: "Box Truck Dispatch Service | Dispatcher for Box Truck Owner-Operators",
    metaDescription:
      "Box truck dispatch from a carrier that runs box trucks every day. Moorish Xpress finds loads, negotiates rates and handles broker paperwork for owner-operators.",
    image: "/images/dispatch-owner-operator-fleet.jpg",
    imageAlt: "Row of trucks parked at a yard for owner-operators using dispatch services",
    intro:
      "We are a box truck carrier ourselves, so we dispatch the way we would want to be dispatched. We look for loads that fit your truck, your lanes and your home time, and we handle the back-and-forth with brokers.",
    points: [
      "Load searching across load boards and broker relationships",
      "Rate negotiation aimed at your target rate per mile",
      "Broker setup packets, rate confirmations and paperwork",
      "Lane planning around your home base and schedule",
      "One dispatcher who knows your truck and your goals",
    ],
    idealFor: ["26 ft box truck owner-operators", "New authorities building broker relationships", "Small fleets that need a dispatch desk"],
    faqs: [
      {
        q: "Do you force loads on drivers?",
        a: "No. You approve every load before it is booked. Our job is to bring good options and negotiate, not to push you into lanes you do not want.",
      },
      {
        q: "What do I need to get started?",
        a: "Your active MC/DOT authority, insurance certificate, W-9 and truck details. Fill in the dispatch sign-up form and we will walk you through the rest.",
      },
    ],
  },
  {
    slug: "hotshot-dispatch",
    group: "dispatch",
    title: "Hotshot Dispatch",
    short: "Dispatch for hotshot owner-operators: loads, rates and paperwork handled.",
    keyword: "hotshot dispatch service",
    metaTitle: "Hotshot Dispatch Service | Dispatcher for Hotshot Owner-Operators",
    metaDescription:
      "Hotshot dispatch service for owner-operators. Moorish Xpress finds hotshot loads, negotiates rates, handles broker setup and keeps your truck moving.",
    image: "/images/hotshot-flatbed-dispatch.jpg",
    imageAlt: "Flatbed truck ready for hotshot freight dispatch",
    intro:
      "Hotshot freight moves fast and pays for speed, but only if the truck stays loaded. We find hotshot loads that fit your trailer and weight limits, negotiate the rate and handle broker setup so you can stay on the road.",
    points: [
      "Hotshot and flatbed load searching",
      "Rate negotiation and backhaul planning",
      "Broker packets, rate cons and paperwork",
      "Load planning around trailer length and weight",
    ],
    idealFor: ["Hotshot owner-operators", "Gooseneck and flatbed trailers", "Drivers who want fewer empty miles"],
    faqs: [
      {
        q: "Do you dispatch CDL and non-CDL hotshots?",
        a: "Yes. Tell us your truck, trailer and weight limits and we will only bring you loads that fit your setup.",
      },
      {
        q: "How do I pay for dispatch?",
        a: "We explain our dispatch fee clearly before we start, so you know exactly what you pay on every load. Contact us for current dispatch rates.",
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
    a: "We are an asset-based carrier. Moorish Xpress operates its own box trucks out of Atlanta, and we also offer dispatch services for other box truck and hotshot owner-operators.",
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
