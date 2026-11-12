// Blog articles. Plain data so they can move into a CMS later without
// changing the page templates. Each targets one search keyword.

export type Post = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  category: "Shippers" | "Owner-Operators";
  date: string; // ISO date
  readMins: number;
  intro: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  cta: "quote" | "dispatch";
};

export const posts: Post[] = [
  {
    slug: "cdl-vs-non-cdl-box-truck-26000-vs-33000-gvwr",
    title: "CDL vs Non-CDL Box Trucks: 26,000 vs 33,000 lb GVWR Explained",
    description:
      "What GVWR means, why a 33,000 lb GVWR CDL box truck can carry heavier freight than a 26,000 lb GVWR non-CDL box truck, and how to pick the right one for your load.",
    keyword: "CDL box truck 33000 GVWR",
    category: "Shippers",
    date: "2026-10-30",
    readMins: 5,
    intro:
      "Two box trucks can look almost identical from the outside and still carry very different amounts of freight. The difference is the GVWR, and it decides whether your load fits on one truck or needs two.",
    sections: [
      {
        heading: "What GVWR actually means",
        paragraphs: [
          "GVWR stands for Gross Vehicle Weight Rating. It is the maximum the truck is rated to weigh in total: the truck itself, fuel, driver, liftgate and your freight combined.",
          "Your usable payload is the GVWR minus the empty weight of the truck. A heavier-rated truck with a similar empty weight can legally carry much more cargo.",
        ],
      },
      {
        heading: "Why 26,000 lb is the magic number",
        paragraphs: [
          "In the United States, trucks rated at 26,000 lb GVWR or less can be driven without a commercial driver's license. That is why most rental and many owner-operator box trucks sit right at 26,000 lb.",
          "Once a truck is rated above 26,000 lb, the driver needs a Class B CDL. That extra requirement is exactly what unlocks the higher weight rating.",
        ],
      },
      {
        heading: "What a 33,000 lb GVWR box truck means for your freight",
        paragraphs: [
          "MOORISH XPRESS LLC runs a 26 ft box truck rated at 33,000 lb GVWR, operated by a Class B CDL holder, alongside our 26 ft non-CDL box trucks rated at 26,000 lb GVWR. The CDL truck gives shippers and brokers an option for dense, heavy freight that would overload a standard box truck.",
        ],
        list: [
          "Heavy palletized product like beverages, paper, tile or hardware",
          "Loads that would otherwise need two box trucks",
          "Freight that is too heavy for a standard box truck but too small for a 53 ft trailer",
        ],
      },
      {
        heading: "How to choose the right truck",
        paragraphs: [
          "Share your total weight, pallet count and pallet dimensions when you request a quote. Our quote form suggests a truck instantly, and dispatch confirms the right unit before pickup. All of our trucks have a tuck-under liftgate and air-ride suspension, whichever class you need.",
        ],
      },
    ],
    cta: "quote",
  },
  {
    slug: "box-truck-dispatch-service-what-a-dispatcher-does",
    title: "Box Truck Dispatch Service: What a Good Dispatcher Actually Does",
    description:
      "What a box truck dispatch service handles, what it should never do, and how owner-operators can pick a dispatcher that grows their business.",
    keyword: "box truck dispatch service",
    category: "Owner-Operators",
    date: "2026-10-27",
    readMins: 6,
    intro:
      "A good box truck dispatcher pays for themselves in better rates and fewer empty miles. A bad one books you cheap loads and disappears. Here is how to tell the difference.",
    sections: [
      {
        heading: "The core job: loads, rates and paperwork",
        paragraphs: ["At its simplest, a box truck dispatch service handles the office work so the driver can drive. That usually includes:"],
        list: [
          "Searching load boards and broker contacts for freight that fits your truck",
          "Negotiating rates with brokers and shippers",
          "Completing broker setup packets and rate confirmations",
          "Planning reloads so the truck does not sit empty",
          "Keeping BOLs, PODs and invoices organized",
        ],
      },
      {
        heading: "What a dispatcher should never do",
        paragraphs: [
          "Your truck, your authority, your decision. A dispatcher should never book a load without your approval, hide the rate the broker is paying, or pressure you into lanes that keep you away from home longer than you agreed.",
        ],
      },
      {
        heading: "Why a carrier-run dispatch service is different",
        paragraphs: [
          "MOORISH XPRESS LLC runs its own box trucks out of Atlanta. That means we see the same rates, the same brokers and the same problems you do. When we dispatch your truck, we think like an owner-operator because we are one.",
        ],
      },
      {
        heading: "What you need to get started",
        paragraphs: ["Most dispatchers, including us, will ask for:"],
        list: ["An active MC/DOT authority", "Certificate of insurance", "W-9", "Truck details: length, GVWR, liftgate, CDL or non-CDL", "Your preferred lanes and home time"],
      },
    ],
    cta: "dispatch",
  },
  {
    slug: "hotshot-dispatch-how-to-stay-loaded",
    title: "Hotshot Dispatch: How Owner-Operators Stay Loaded and Profitable",
    description:
      "How hotshot dispatch works, how to cut empty miles, and what to look for in a hotshot dispatcher. A practical guide for hotshot owner-operators.",
    keyword: "hotshot dispatch service",
    category: "Owner-Operators",
    date: "2026-10-22",
    readMins: 5,
    intro:
      "Hotshot freight pays for speed, but only when the truck keeps moving. The difference between a good week and a bad one is usually the reload.",
    sections: [
      {
        heading: "Plan the reload before you deliver",
        paragraphs: [
          "The biggest profit leak in hotshot trucking is deadhead. A dispatcher should be looking for your next load while you are still rolling toward delivery, not after you have unloaded.",
        ],
      },
      {
        heading: "Know your real limits",
        paragraphs: ["Good hotshot dispatch starts with accurate equipment details, so you only see loads that actually fit:"],
        list: ["Trailer length and deck type", "Your truck and trailer GVWR and real payload", "CDL or non-CDL", "Straps, chains, tarps and other securement on board"],
      },
      {
        heading: "Rate per mile, all-in",
        paragraphs: [
          "A high-paying load into a dead market can be worse than a fair load into a busy one. We look at the round trip, not just the first leg, when we negotiate hotshot rates.",
        ],
      },
      {
        heading: "Working with MOORISH XPRESS LLC",
        paragraphs: [
          "We dispatch hotshots and box trucks from Atlanta, with you approving every load. Fill in the dispatch sign-up form and we will set up a quick call to learn about your setup and lanes.",
        ],
      },
    ],
    cta: "dispatch",
  },
  {
    slug: "liftgate-last-mile-delivery-atlanta",
    title: "Last-Mile Delivery in Atlanta: When You Need a Liftgate Box Truck",
    description:
      "When last-mile freight needs a liftgate, what to tell your carrier, and how box trucks make non-dock deliveries in Atlanta simple.",
    keyword: "last mile delivery Atlanta",
    category: "Shippers",
    date: "2026-10-18",
    readMins: 4,
    intro:
      "Many last-mile addresses have no loading dock: retail stores, job sites, offices and homes. That is where a liftgate box truck earns its place.",
    sections: [
      {
        heading: "Signs you need a liftgate",
        paragraphs: ["Ask for liftgate service if any of these apply at pickup or delivery:"],
        list: ["No dock, or a dock that is too high or too low", "Ground-level storefront or job-site delivery", "Residential address", "Heavy pallets that cannot be hand-unloaded"],
      },
      {
        heading: "Why box trucks fit last-mile delivery in a city like Atlanta",
        paragraphs: [
          "A 26 ft box truck can reach places a tractor-trailer cannot: tight streets, small lots and downtown loading zones. With a tuck-under liftgate, the driver can bring pallets to ground level safely.",
        ],
      },
      {
        heading: "What to share when you book",
        paragraphs: ["The more we know, the smoother the delivery:"],
        list: ["Delivery address and receiving hours", "Contact name and phone on site", "Any access limits like low clearance or gated entry", "Whether you want a call-ahead"],
      },
      {
        heading: "Last-mile delivery with MOORISH XPRESS LLC",
        paragraphs: [
          "Every MOORISH XPRESS LLC truck has a tuck-under liftgate and air-ride suspension. Last-mile drops are handled as part of the run, across metro Atlanta and as the final leg of our longer runs.",
        ],
      },
    ],
    cta: "quote",
  },
  {
    slug: "asset-based-carrier-vs-freight-broker",
    title: "Asset-Based Carrier vs Freight Broker: Which Should Shippers Use?",
    description:
      "The difference between an asset-based carrier and a freight broker, the pros of each, and when booking a carrier directly makes sense for shippers.",
    keyword: "asset-based box truck carrier",
    category: "Shippers",
    date: "2026-10-12",
    readMins: 5,
    intro:
      "Brokers and carriers both move freight, but they are not the same thing. Knowing the difference helps you decide who to call for each load.",
    sections: [
      {
        heading: "What an asset-based carrier is",
        paragraphs: [
          "An asset-based carrier owns or operates the trucks. When you book one, their truck and their driver haul your freight. MOORISH XPRESS LLC is an asset-based box truck carrier based in Atlanta.",
        ],
      },
      {
        heading: "What a freight broker does",
        paragraphs: [
          "A broker matches your load with a carrier from their network. Brokers are useful when you need many equipment types or large volume across the country.",
        ],
      },
      {
        heading: "When going direct to a carrier makes sense",
        paragraphs: ["Booking a carrier directly is often the better choice when:"],
        list: [
          "You have recurring lanes that fit a box truck",
          "You want to talk to the people actually moving your freight",
          "You need specific equipment like a liftgate or a higher GVWR",
          "Speed matters and you cannot wait for a load to be re-tendered",
        ],
      },
      {
        heading: "We work with both",
        paragraphs: [
          "We haul for shippers directly and for freight brokers. If you are a broker with box truck freight on your board, ask for our carrier setup packet.",
        ],
      },
    ],
    cta: "quote",
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
