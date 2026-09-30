/**
 * Tide Pools: site content (single source of truth).
 *
 * Everything a visitor reads lives here. main.js only renders it.
 * Values tagged `// MOCK` are placeholders to replace before launch
 * (full checklist in MOCK_CONTENT.md). Untagged values are real,
 * owner-confirmed business facts.
 *
 * index.html repeats the hero, company name, phone and section headings
 * as a no-JavaScript / SEO fallback. If you change those here, mirror
 * the change in index.html.
 */
export const SITE = {
  // Set to false at launch to remove the "Preview: sample content" ribbon.
  isPreview: true,
  previewRibbon: "Preview: sample content",

  company: {
    brand: "Tide Pools",
    name: "Tide Pools Texas",
    legalName: "Tide Pools LLC",
    owner: "Jack",
    tagline: "Crystal-clear pools, zero hassle.",
    founded: 2020,
    phoneDisplay: "(214) 538-9993",
    phoneHref: "tel:+12145389993",
    email: "Swim@tidepoolsllc.com",
    url: "https://www.tidepoolsllc.com/",
    region: "North DFW metroplex",
    about: "Family owned and operated since 2020, servicing the North DFW metroplex with full service cleanings, honest repairs and E-Reports with every visit.",
    hours: [
      { days: "Mon – Fri", time: "8:00 am – 6:00 pm" }, // MOCK: confirm hours with Jack
      { days: "Saturday", time: "By appointment" },      // MOCK: confirm hours with Jack
    ],
    social: [
      { name: "Facebook", icon: "facebook", url: "#" },   // MOCK: placeholder URL
      { name: "Instagram", icon: "instagram", url: "#" }, // MOCK: placeholder URL
      { name: "Nextdoor", icon: "nextdoor", url: "#" },   // MOCK: placeholder URL
    ],
  },

  // Footer navigation (the header nav is static in index.html).
  nav: [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Areas", href: "#areas" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Pool cleaning & care · North DFW",
    headline: "Crystal-clear pools, zero hassle.",
    subline: "Weekly service, honest repairs and a photo E-Report after every visit, for homes in Plano, Richardson, McKinney, Allen, Garland, University Park and North Dallas.",
    primaryCta: { label: "Get a Free Quote", href: "#contact" },
    secondaryCta: { label: "Call (214) 538-9993", href: "tel:+12145389993" },
    stats: [
      { icon: "home", label: "Family owned since 2020" },
      { icon: "certificate", label: "CPO® & RAIL certified" },
      { icon: "shield", label: "Fully insured" },
    ],
    image: { base: "hero", alt: "Sparkling blue backyard swimming pool on a sunny day" }, // MOCK photo
  },

  trustBadges: {
    intro: "One local, family-run crew that treats your backyard like our own.",
    pillars: [
      {
        icon: "sparkle",
        title: "Full Service Cleanings",
        text: "Skim, brush, vacuum, baskets and balanced water on every visit. Nothing skipped, nothing rushed.", // MOCK copy, confirm with Jack
      },
      {
        icon: "wrench",
        title: "Honest Repairs",
        text: "We explain what's wrong, show you photos and quote it straight. No upsells, no surprise bills.", // MOCK copy, confirm with Jack
      },
      {
        icon: "report",
        title: "E-Reports with every visit",
        text: "Chemical readings, notes and photos land in your inbox the moment we close the gate.", // MOCK copy, confirm with Jack
      },
    ],
    credentials: [
      { icon: "shield", label: "Fully Insured" },
      { icon: "certificate", label: "CPO® Certified" },
      { icon: "badge", label: "RAIL Certified" },
      { icon: "gear", label: "Jandy Service Pro" },
      { icon: "handshake", label: "Pentair Partner" },
      { icon: "home", label: "Family Owned Since 2020" },
    ],
  },

  services: {
    intro: "From weekly cleanings to full remodels, one local team for everything your pool needs.",
    categories: [
      {
        id: "maintenance",
        title: "Maintenance",
        blurb: "Keep it clean, balanced and swim-ready.",
        items: [
          { name: "Weekly Pool Service", icon: "calendar", description: "Full cleaning and balanced chemistry every week, with a photo E-Report." }, // MOCK copy, confirm with Jack
          { name: "Chem-only Service", icon: "flask", description: "You handle the cleaning; we test and balance your water every week." }, // MOCK copy, confirm with Jack
          { name: "Filter Cleaning", icon: "filter", description: "Deep cartridge and DE filter cleans for clearer water and an easier-running pump." }, // MOCK copy, confirm with Jack
          { name: "Green-to-Cleans", icon: "leaf", description: "Algae took over? We shock, scrub and filter it back to blue." }, // MOCK copy, confirm with Jack
        ],
      },
      {
        id: "repairs",
        title: "Repairs",
        blurb: "Diagnosed right, fixed right, priced honestly.",
        items: [
          { name: "Equipment Repairs", icon: "tool", description: "Pumps, filters, heaters and valves diagnosed and fixed, with a straight quote." }, // MOCK copy, confirm with Jack
          { name: "Leak Detection", icon: "drop", description: "Losing water? We track down leaks in the shell, plumbing and equipment." }, // MOCK copy, confirm with Jack
          { name: "Polaris Rebuilds", icon: "cleaner", description: "We rebuild Polaris pressure-side cleaners so they climb and clean like new." }, // MOCK copy, confirm with Jack
          { name: "Mastic Replacement", icon: "seal", description: "Fresh flexible sealant in the joint between coping and deck to keep water out." }, // MOCK copy, confirm with Jack
        ],
      },
      {
        id: "upgrades",
        title: "Upgrades & Education",
        blurb: "Make it better, and learn how to keep it that way.",
        items: [
          { name: "Pool Remodels", icon: "remodel", description: "Resurfacing, tile and coping updates that make an older pool feel brand new." }, // MOCK copy, confirm with Jack
          { name: "Automation Upgrades", icon: "phone-app", description: "Run pumps, lights and heat from your phone with modern automation." }, // MOCK copy, confirm with Jack
          { name: "Pool School", icon: "school", description: "A hands-on lesson from a certified pro on caring for your own pool." }, // MOCK copy, confirm with Jack (assumed meaning)
        ],
      },
    ],
  },

  howItWorks: {
    intro: "Getting started takes one call. After that, your pool is on autopilot.",
    steps: [
      { title: "Request a free quote", text: "Call or send the form. We visit, check your pool and give you a clear price." }, // MOCK copy, confirm with Jack
      { title: "First deep clean", text: "We start with a full clean and chemical reset so your pool begins at 100%." }, // MOCK copy, confirm with Jack
      { title: "Relax, we handle it weekly", text: "Same day every week, with an E-Report and photos after each visit." }, // MOCK copy, confirm with Jack
    ],
  },

  weeklyChecklist: {
    intro: "Every weekly visit covers the full list, and you get proof it was done.",
    items: [
      "Skim the surface",
      "Brush walls & steps",
      "Vacuum the floor",
      "Empty skimmer & pump baskets",
      "Test & balance chemicals",
      "Inspect equipment",
      "Photo report sent after every visit",
    ],
    // Sample E-Report card shown next to the checklist.
    report: {
      title: "E-Report",
      subtitle: "Weekly visit · Plano",            // MOCK
      readings: [
        { label: "Free chlorine", value: "3.0 ppm" }, // MOCK
        { label: "pH", value: "7.4" },                // MOCK
        { label: "Alkalinity", value: "90 ppm" },     // MOCK
      ],
      note: "Baskets emptied, filter pressure normal.", // MOCK
    },
    image: { base: "weekly-service", alt: "Pool technician skimming leaves from a clear backyard pool" }, // MOCK photo
  },

  pricing: {
    intro: "Simple monthly plans. No long-term contracts.", // MOCK: confirm no-contract policy with Jack
    tiers: [
      {
        name: "Chem-only Service",
        prefix: "Starting at",
        price: 99,                                     // MOCK price
        period: "/mo",
        description: "For hands-on owners who want perfectly balanced water.", // MOCK copy
        features: ["Weekly water testing", "Chemicals balanced & included", "Basket check", "E-Report every visit"], // MOCK
        featured: false,
        cta: { label: "Get a quote", service: "Chem-only Service" },
      },
      {
        name: "Full Service Weekly",
        prefix: "Starting at",
        price: 159,                                    // MOCK price
        period: "/mo",
        description: "Everything handled, every week. Our most requested plan.", // MOCK copy
        features: ["Skim, brush & vacuum", "Chemicals balanced & included", "Skimmer & pump baskets", "Equipment check", "Photo E-Report every visit"], // MOCK
        featured: true,
        badge: "Most Popular",
        cta: { label: "Get a quote", service: "Weekly Pool Service" },
      },
      {
        name: "Premium Care",
        prefix: "Starting at",
        price: 219,                                    // MOCK price
        period: "/mo",
        description: "Full service plus the extras that keep equipment happy.", // MOCK copy
        features: ["Everything in Full Service", "Routine filter cleans", "Priority repair scheduling", "Seasonal equipment tune-up"], // MOCK
        featured: false,
        cta: { label: "Get a quote", service: "Weekly Pool Service" },
      },
    ],
    footnote: "Final price depends on pool size and condition. Free on-site quote.",
  },

  gallery: {
    intro: "Drag the handle to see the difference a Tide Pools visit makes.",
    beforeLabel: "Before",
    afterLabel: "After",
    items: [
      { image: { base: "gallery-1", alt: "Backyard pool with clear blue water" }, caption: "Green-to-clean in 3 visits" },        // MOCK photo + caption
      { image: { base: "gallery-2", alt: "Pool and attached spa with sparkling water" }, caption: "Pool & spa back to blue in a week" }, // MOCK photo + caption
      { image: { base: "gallery-3", alt: "Clear pool water over clean tile steps" }, caption: "Cloudy water cleared after a filter clean" }, // MOCK photo + caption
      { image: { base: "gallery-4", alt: "Modern backyard pool with a clean deck" }, caption: "Storm cleanup, swim-ready next day" }, // MOCK photo + caption
    ],
  },

  reviews: {
    rating: 5.0,  // MOCK: replace with real Google rating
    count: 48,    // MOCK: replace with real review count
    intro: "Neighbors across North DFW trust us with their backyards.",
    items: [
      { name: "Megan R.", city: "Plano", rating: 5, date: "2 weeks ago", text: "Our pool went from swamp green to crystal clear in under a week. The E-Reports with photos are a game changer." }, // MOCK
      { name: "Carlos D.", city: "Richardson", rating: 5, date: "1 month ago", text: "On time every week and they actually explain what they're doing. Fair, honest price on a pump repair too." }, // MOCK
      { name: "Priya S.", city: "McKinney", rating: 5, date: "1 month ago", text: "We tried two other companies before Tide Pools. Night and day difference. The water has never looked better." }, // MOCK
      { name: "Tom H.", city: "University Park", rating: 5, date: "2 months ago", text: "They found a leak two other companies missed and didn't try to upsell us. Highly recommend." }, // MOCK
      { name: "Alyssa K.", city: "Allen", rating: 5, date: "3 months ago", text: "I love getting a report after every visit so I know exactly what was done. Super friendly, and our dog loves them." }, // MOCK
      { name: "Derek W.", city: "Garland", rating: 5, date: "4 months ago", text: "Took the Pool School lesson and finally understand my equipment. Great people, fair prices." }, // MOCK
    ],
  },

  serviceAreas: {
    intro: "Servicing the North DFW metroplex, with weekly routes through these cities.",
    // Approximate city centers, used only to place dots on the stylized map.
    cities: [
      { name: "University Park", lat: 32.850, lng: -96.800 },
      { name: "North Dallas", lat: 32.935, lng: -96.795 },
      { name: "Garland", lat: 32.913, lng: -96.639 },
      { name: "Richardson", lat: 32.948, lng: -96.730 },
      { name: "Plano", lat: 33.020, lng: -96.699 },
      { name: "Allen", lat: 33.103, lng: -96.671 },
      { name: "McKinney", lat: 33.197, lng: -96.640 },
    ],
    note: "Don't see your city? Call us, we may still cover you.",
  },

  faq: {
    intro: "Quick answers to what homeowners ask us most.",
    items: [
      { q: "Do I need to be home during service?", a: "No. As long as we can get into the backyard (an unlocked gate or a gate code), we take care of everything and email your E-Report when we're done." }, // MOCK copy, confirm with Jack
      { q: "Do you require a contract?", a: "No long-term contracts. Service is month to month. Just let us know if you need to pause or cancel." }, // MOCK copy, confirm with Jack
      { q: "What happens if it rains?", a: "Light rain doesn't stop us. For lightning or severe storms we reschedule to the next safe day and let you know. After a big storm we check your chemistry and clear the debris." }, // MOCK copy, confirm with Jack
      { q: "What about pets in the yard?", a: "We love pets, but please keep them inside on service day for everyone's safety. Tell us about your furry friends and we'll text before we arrive." }, // MOCK copy, confirm with Jack
      { q: "How do I pay?", a: "We bill monthly and you can pay online by card or bank transfer. No checks or cash to leave out." }, // MOCK copy, confirm with Jack
      { q: "What chemicals do you use?", a: "Professional-grade chlorine, pH balancers and stabilizer, dosed to your pool's test results each visit. Every reading is listed in your E-Report." }, // MOCK copy, confirm with Jack
      { q: "Can you repair equipment you didn't install?", a: "Yes. As a Jandy Service Pro and Pentair Partner we work on most pumps, filters, heaters and automation systems, whoever installed them." }, // MOCK copy, confirm with Jack
      { q: "How quickly can you start?", a: "Most new customers are on our route within a week of their quote. Green pools can often be seen sooner. Just ask." }, // MOCK copy, confirm with Jack
    ],
  },

  contact: {
    provider: "web3forms",              // "web3forms" for preview (GitHub Pages) | "php" for Bluehost
    web3formsKey: "YOUR_WEB3FORMS_KEY", // MOCK: create a free key at web3forms.com with Jack's email
    phpEndpoint: "./contact.php",
    toEmail: "Swim@tidepoolsllc.com",
    subject: "New quote request from tidepoolsllc.com",
    intro: "Tell us a little about your pool and we'll get back to you within one business day.", // MOCK: confirm response time with Jack
    serviceAreaSummary: "Plano, Richardson, McKinney, Allen, Garland, University Park and North Dallas.",
    otherServiceOption: "Not sure yet / other",
    messages: {
      sending: "Sending…",
      success: "Thanks! Your request is in. We'll be in touch within one business day.", // MOCK: confirm response time with Jack
      error: "Sorry, something went wrong sending your request. Please try again, or call us at (214) 538-9993.",
      notConfigured: "The quote form isn't connected yet in this preview. Please call (214) 538-9993 or email Swim@tidepoolsllc.com.",
      required: "Please fill in this field.",
      email: "Please enter a valid email address, like name@example.com.",
      phone: "Please enter a valid phone number, or leave it blank.",
      summary: "Please fix the highlighted fields and try again.",
    },
  },

  seo: {
    // Mirrors the <head> tags in index.html (kept static there for crawlers).
    title: "Tide Pools Texas | Pool Service & Repair in Plano, Richardson, McKinney & North Dallas",
    description: "Family-owned pool cleaning, repair and weekly service in the North DFW metroplex since 2020. CPO® & RAIL certified, fully insured, E-Reports with every visit. Get a free quote.",
    canonical: "https://www.tidepoolsllc.com/",
    ogImage: "assets/img/og-image.jpg", // MOCK photo
    themeColor: "#060D1F",
  },
};
