import type { Project, Review, Service, SiteSettings, TeamMember } from "./types";

type Seed<T> = Omit<T, "id" | "created_at">;

export const seedServices: Seed<Service>[] = [
  {
    slug: "brand-identity",
    title: "Brand Identity",
    summary: "Strategy, naming and visual systems that make you unmistakable.",
    description:
      "We start with positioning, not logos. Through workshops and research we find the one idea your brand can own — then build a flexible identity system around it: mark, type, colour, motion and voice, documented so your team can use it without us.",
    deliverables: ["Brand strategy", "Naming", "Logo & wordmark", "Visual system", "Guidelines", "Motion identity"],
    sort_order: 1,
    published: true,
  },
  {
    slug: "web-design-development",
    title: "Websites",
    summary: "Fast, editorial websites engineered on Next.js and built to convert.",
    description:
      "Design and engineering under one roof. We design in the browser's language, build with Next.js and TypeScript, and ship sites that score green on Core Web Vitals, rank well and are a joy for your team to edit.",
    deliverables: ["UX & information architecture", "Art direction", "Next.js development", "CMS integration", "Performance & SEO", "Hosting on Vercel"],
    sort_order: 2,
    published: true,
  },
  {
    slug: "product-design",
    title: "Product Design",
    summary: "Interfaces for SaaS, dashboards and apps people actually enjoy using.",
    description:
      "From zero-to-one MVPs to redesigns of mature products. We map the jobs your users hire you for, prototype early, test with real people, and hand over a design system engineers love.",
    deliverables: ["Product discovery", "User research", "Prototyping", "UI design", "Design systems", "Usability testing"],
    sort_order: 3,
    published: true,
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    summary: "Headless storefronts that feel like flagship stores, not templates.",
    description:
      "Custom Shopify and headless commerce experiences with considered product storytelling, frictionless checkout, and the analytics to keep improving after launch.",
    deliverables: ["Headless Shopify", "Product storytelling", "Checkout optimisation", "Subscriptions", "Analytics"],
    sort_order: 4,
    published: true,
  },
  {
    slug: "operations-panels-crm",
    title: "Operations Panels & CRM",
    summary: "Admin panels, dashboards and CRMs built around the way your team actually works.",
    description:
      "Spreadsheets and off-the-shelf tools only go so far. We build custom operations panels and CRMs that manage your customers, leads, orders and teams in one place — with the roles, automations and reports your business runs on.",
    deliverables: ["Operations & admin panels", "Custom CRM", "Roles & permissions", "Workflow automation", "Reports & dashboards", "Integrations & APIs"],
    sort_order: 5,
    published: true,
  },
  {
    slug: "growth",
    title: "Launch & Growth",
    summary: "Go-to-market, content and CRO so the work keeps working.",
    description:
      "A launch is the start. We plan the rollout, set up measurement, write the content and run structured experiments to move the numbers that matter to your business.",
    deliverables: ["Launch strategy", "Content design", "Conversion optimisation", "A/B testing", "Monthly retainers"],
    sort_order: 6,
    published: true,
  },
];

export const seedProjects: Seed<Project>[] = [
  {
    slug: "halden-coffee",
    title: "Roasted slow, sold fast",
    client: "Halden Coffee",
    category: "E-commerce",
    year: 2026,
    summary: "A headless storefront and identity refresh for a specialty roaster going national.",
    description:
      "Halden had outgrown its template store. We rebuilt the brand around the ritual of the morning cup — warm paper textures, a custom serif, and product pages that read like tasting notes.\n\nThe new headless Shopify storefront loads in under a second, introduces flexible subscriptions and tells the story of every farm Halden works with.",
    cover_image: null,
    gallery: [],
    tags: ["Identity", "Shopify", "Next.js"],
    metrics: [
      { value: "+212%", label: "Subscription sign-ups" },
      { value: "0.8s", label: "Largest contentful paint" },
      { value: "3.1×", label: "Return on ad spend" },
    ],
    live_url: null,
    accent: "#C08552",
    featured: true,
    published: true,
    sort_order: 1,
  },
  {
    slug: "verso-health",
    title: "Care that fits in a pocket",
    client: "Verso Health",
    category: "Product Design",
    year: 2026,
    summary: "A patient app and clinician dashboard for a fast-growing telehealth platform.",
    description:
      "Verso's patients were dropping off before their first consult. We redesigned onboarding around a single question — \"how are you feeling today?\" — and built a calm, accessible design system spanning mobile and the clinician web app.\n\nWeekly usability tests with patients shaped every release.",
    cover_image: null,
    gallery: [],
    tags: ["Research", "iOS & Android", "Design system"],
    metrics: [
      { value: "−46%", label: "Onboarding drop-off" },
      { value: "4.8★", label: "App Store rating" },
      { value: "120+", label: "Components shipped" },
    ],
    live_url: null,
    accent: "#6E8B74",
    featured: true,
    published: true,
    sort_order: 2,
  },
  {
    slug: "atlas-freight",
    title: "Logistics, made legible",
    client: "Atlas Freight",
    category: "Web Platform",
    year: 2025,
    summary: "A real-time shipment tracking platform and marketing site for a freight forwarder.",
    description:
      "Atlas moves cargo across 40 countries, but customers tracked it through spreadsheets and emails. We designed a live control tower — maps, milestones and exceptions in one view — and a marketing site that finally matched the scale of the operation.",
    cover_image: null,
    gallery: [],
    tags: ["Dashboard", "Maps", "Next.js"],
    metrics: [
      { value: "−63%", label: "Support tickets" },
      { value: "18k", label: "Shipments tracked monthly" },
      { value: "2 wks", label: "Faster quoting" },
    ],
    live_url: null,
    accent: "#3F5E8C",
    featured: true,
    published: true,
    sort_order: 3,
  },
  {
    slug: "mira-skincare",
    title: "Quiet luxury, loudly",
    client: "Mira",
    category: "Brand Identity",
    year: 2025,
    summary: "Naming, identity and packaging for a clean-beauty label launching in 6 markets.",
    description:
      "Mira needed to stand apart in a category drowning in beige. We built an identity from a single sculptural letterform, a restrained palette with one daring pink, and packaging that looks as good on a shelf as in a feed.",
    cover_image: null,
    gallery: [],
    tags: ["Naming", "Identity", "Packaging"],
    metrics: [
      { value: "6", label: "Markets at launch" },
      { value: "40k", label: "Waitlist in 3 weeks" },
    ],
    live_url: null,
    accent: "#D9867C",
    featured: true,
    published: true,
    sort_order: 4,
  },
  {
    slug: "kinfolk-architects",
    title: "Space to think",
    client: "Kinfolk Architects",
    category: "Website",
    year: 2024,
    summary: "An editorial portfolio for an award-winning architecture practice.",
    description:
      "Architects think in light and proportion, so the site does too: generous white space, a strict grid, and project pages that unfold like a monograph. A custom CMS lets the team publish new work in minutes.",
    cover_image: null,
    gallery: [],
    tags: ["Art direction", "CMS", "Editorial"],
    metrics: [
      { value: "Awwwards", label: "Honourable mention" },
      { value: "+88%", label: "Qualified enquiries" },
    ],
    live_url: null,
    accent: "#8C8475",
    featured: false,
    published: true,
    sort_order: 5,
  },
  {
    slug: "pulse-fintech",
    title: "Money, minus the fear",
    client: "Pulse",
    category: "Product Design",
    year: 2024,
    summary: "A spending app for first-time earners that turns budgeting into a habit.",
    description:
      "Pulse speaks to people getting their first paycheck. We designed a playful yet trustworthy product — clear numbers, gentle nudges and a weekly ritual that users actually look forward to.",
    cover_image: null,
    gallery: [],
    tags: ["Fintech", "Mobile", "Motion"],
    metrics: [
      { value: "62%", label: "Week-4 retention" },
      { value: "1M+", label: "Downloads" },
    ],
    live_url: null,
    accent: "#B8C94A",
    featured: false,
    published: true,
    sort_order: 6,
  },
];

export const seedReviews: Seed<Review>[] = [
  {
    author: "Elena Marsh",
    role: "Founder",
    company: "Halden Coffee",
    avatar_url: null,
    rating: 5,
    content:
      "They didn't just redesign our store — they understood why people buy from us. Subscriptions tripled in a quarter and our team finally loves the brand again.",
    featured: true,
    approved: true,
  },
  {
    author: "Dr. Rahul Menon",
    role: "Chief Product Officer",
    company: "Verso Health",
    avatar_url: null,
    rating: 5,
    content:
      "Rare mix of taste and rigour. Every design decision came with a reason and a test behind it. Our patients noticed the difference within a week.",
    featured: true,
    approved: true,
  },
  {
    author: "Jonas Brandt",
    role: "Head of Digital",
    company: "Atlas Freight",
    avatar_url: null,
    rating: 5,
    content:
      "We handed them a mess of spreadsheets and got back a product our customers now brag about. Communication was calm, clear and always on time.",
    featured: true,
    approved: true,
  },
  {
    author: "Sofia Alvarez",
    role: "Co-founder",
    company: "Mira",
    avatar_url: null,
    rating: 5,
    content:
      "The identity feels like it was always ours. Retailers comment on the packaging before they even see the product.",
    featured: false,
    approved: true,
  },
  {
    author: "Priya Shah",
    role: "Marketing Lead",
    company: "Pulse",
    avatar_url: null,
    rating: 4,
    content:
      "Fast, thoughtful and genuinely fun to work with. The motion work alone changed how people talk about our app.",
    featured: false,
    approved: true,
  },
];

export const seedTeam: Seed<TeamMember>[] = [
  { name: "Arman Noyada", role: "Founder, Engineering", photo_url: null, color: "#ff4d1c", sort_order: 1, published: true },
  { name: "Isha Kapoor", role: "Design Director", photo_url: null, color: "#c08552", sort_order: 2, published: true },
  { name: "Leo Fernandes", role: "Brand & Motion", photo_url: null, color: "#6e8b74", sort_order: 3, published: true },
  { name: "Nina Das", role: "Product Strategy", photo_url: null, color: "#3f5e8c", sort_order: 4, published: true },
];

export const seedSettings: SiteSettings = {
  email: "hello@noyada.studio",
  phone: "",
  address: "",
  description:
    "TechBack Solutions is an independent studio crafting brands, websites and digital products for companies that refuse to look like everyone else.",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
  home_intro:
    "We're a small, senior team who believe the best digital work comes from sweating the details nobody asked about. No account managers, no hand-offs — just the people doing the work, talking directly to you.",
  clients: ["Halden", "Verso", "Atlas Freight", "Mira", "Kinfolk", "Pulse", "Northwind", "Oreo Labs", "Sable & Co", "Lumen"],
  stats: [
    { value: 120, suffix: "+", label: "Projects shipped" },
    { value: 9, suffix: "", label: "Years in practice" },
    { value: 14, suffix: "", label: "Countries served" },
    { value: 98, suffix: "%", label: "Clients who return" },
  ],
  about_intro:
    "TechBack Solutions is an independent design and engineering studio. We partner with founders and marketing teams who want work that looks considered and performs in the real world.",
  about_story:
    "We started as two people who were tired of beautiful websites that didn't work and functional products nobody loved. Nine years later we're still small, still hands-on, and still obsessed with getting both right at the same time.",
  principles: [
    { title: "Craft is a strategy", body: "Details compound. The last 10% of polish is what people remember and what competitors can't copy." },
    { title: "Senior hands only", body: "The people you meet in the pitch are the people doing the work. No juniors hidden behind a deck." },
    { title: "Measure what matters", body: "Beautiful is the baseline. We agree on the numbers that define success before we start." },
    { title: "Small on purpose", body: "We take on a handful of projects at a time so each one gets our full attention." },
  ],
};
