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
    slug: "mahalaxmi-art",
    title: "A portfolio as considered as the interiors",
    client: "Mahalaxmi Art",
    category: "Website",
    year: 2026,
    summary: "Portfolio website for a Mumbai luxury interior design studio crafting homes, offices and stores since 2008.",
    description:
      "Mahalaxmi Art designs luxury interiors — homes, offices, retail stores and showrooms — and every project is won on how the last one looks.\n\nWe built a portfolio that lets the work sell itself: projects organised by space — residential, commercial, retail, kitchens, wardrobes, vanities, doors and frames — each with its own gallery and project details.\n\nAround it sit the pages that turn browsing into a brief: a clients page with testimonials, downloadable brochures, a blog for design ideas, and a contact page that brings enquiries straight to the studio.",
    cover_image: null,
    gallery: [],
    tags: ["Portfolio website", "Project galleries", "Brochures", "Blog"],
    metrics: [
      { value: "7", label: "Portfolio categories, one per type of space" },
      { value: "Since 2008", label: "A studio's body of work, brought online" },
    ],
    live_url: "https://mahalaxmiart.in/projects/residential",
    accent: "#C9A227",
    featured: false,
    published: true,
    sort_order: 1,
  },
  {
    slug: "aaran-homes",
    title: "Farmhouses and plots, sold online",
    client: "AARAN HOMES",
    category: "Real-estate Platform",
    year: 2026,
    summary: "A property website and custom back office for a developer of farmhouses, NA plots and second homes near Mumbai and Pune.",
    description:
      "AARAN HOMES sells limited-inventory farmhouses, NA plots and second homes — a purchase buyers research for months before they ever visit a site.\n\nWe built a fast property website where buyers browse by category, explore every property with photos, video and investment details, download brochures, and book a site visit or start a WhatsApp chat in one tap.\n\nBehind it sits a custom admin: the team adds properties, uploads images and video, reorders categories, publishes blog guides and works every enquiry and brochure lead from one place. Launch pages, like the one for Lonavala, go live without waiting on a developer.",
    cover_image: null,
    gallery: [],
    tags: ["Property website", "Admin panel", "Lead capture", "Landing pages"],
    metrics: [
      { value: "1 inbox", label: "For enquiries and brochure leads" },
      { value: "Self-serve", label: "Listings, media and blog, managed in-house" },
      { value: "1 tap", label: "From a listing to a WhatsApp conversation" },
    ],
    live_url: "https://aaranhome.com/",
    accent: "#3E8E63",
    featured: true,
    published: true,
    sort_order: 2,
  },
  {
    slug: "arenaos",
    title: "An operating system for gaming parlours",
    client: "ArenaOS",
    category: "SaaS Platform",
    year: 2026,
    summary: "A multi-tenant SaaS that runs gaming parlours end to end — bookings, the live floor, devices, payments and analytics.",
    description:
      "Gaming parlours still run on paper registers and decade-old software, and lose revenue to manual bookings and sessions nobody tracks.\n\nArenaOS replaces all of it with one platform: a white-labelled booking portal with seat selection, time slots and online payments; an operations panel with a live seat map, session timers and check-in; and device management for hardware health, remote resets and maintenance.\n\nOwners see revenue, seat utilisation and customer retention at a glance, with UPI payments, GST invoicing and loyalty built in. A super-admin panel onboards and manages every venue on the platform — each one its own isolated tenant, on subscription plans from a single parlour to a chain.\n\nBuilt on Next.js, NestJS, PostgreSQL and Prisma.",
    cover_image: null,
    gallery: [],
    tags: ["Multi-tenant SaaS", "Booking portal", "Operations panel", "Analytics"],
    metrics: [
      { value: "6", label: "Connected panels on one platform" },
      { value: "Multi-tenant", label: "Every venue isolated, one codebase" },
      { value: "UPI + GST", label: "Payments and invoicing built in" },
    ],
    live_url: "https://gamingarena-marketing.vercel.app/",
    accent: "#7C5CFF",
    featured: true,
    published: true,
    sort_order: 3,
  },
  {
    slug: "vertitide",
    title: "A steady presence for a maritime business",
    client: "Vertitide Ship Management",
    category: "Website",
    year: 2026,
    summary: "Corporate website for an RPSL-certified ship management company in Mumbai serving ship owners and seafarers.",
    description:
      "Vertitide connects qualified seafarers with ship owners operating container ships, bulk carriers, tankers and offshore vessels — work where trust and compliance decide who gets hired.\n\nWe built a site that speaks to both audiences: ship owners find crew management, technical management and ship chandling, organised by vessel sector, while seafarers learn how the company recruits and where to send their CV.\n\nCredentials lead the way — RPSL certification and MLC 2006 compliance are front and centre, alongside a direct line to the Mumbai office.",
    cover_image: null,
    gallery: [],
    tags: ["Corporate website", "Maritime", "Recruitment"],
    metrics: [
      { value: "4", label: "Vessel sectors, each with its own page" },
      { value: "3", label: "Service lines for ship owners" },
    ],
    live_url: "https://vertitide.com/",
    accent: "#2E6FD8",
    featured: false,
    published: true,
    sort_order: 4,
  },
  {
    slug: "quiz-platform",
    title: "A quiz platform built to scale",
    client: "Confidential · EdTech",
    category: "SaaS Platform",
    year: 2026,
    summary: "A quiz and assessment platform for students — practice, timed tests and live competitions on web and mobile.",
    description:
      "An education company needed one platform to run quizzes for large numbers of students at once — daily practice, timed tests and live competitions.\n\nWe built the full stack: a question bank organised by subject, topic and difficulty; a test engine with timers, negative marking and instant scoring; live leaderboards; and results analytics that show students and teachers exactly where to improve.\n\nIt runs on web and mobile, holds up when a live quiz starts and everyone joins at once, and gives the team an admin panel to publish quizzes, manage users and track engagement.\n\nThe client is under NDA — but the same architecture can power your quiz app, assessment portal or learning product.",
    cover_image: null,
    gallery: [],
    tags: ["Quiz engine", "Live leaderboards", "Web & mobile", "Admin panel"],
    metrics: [
      { value: "Live", label: "Real-time quizzes and leaderboards" },
      { value: "Web + app", label: "One platform on every device" },
      { value: "Analytics", label: "Results by student, topic and test" },
    ],
    live_url: null,
    accent: "#F5A524",
    featured: true,
    published: true,
    sort_order: 5,
  },
  {
    slug: "cargo-operations",
    title: "From phone calls to one booking system",
    client: "Confidential · Logistics",
    category: "Operations & CRM",
    year: 2026,
    summary: "A booking portal, operations panel and CRM that took a cargo business from calls and spreadsheets to one organised system.",
    description:
      "Cargo still runs on phone calls, WhatsApp threads and spreadsheets — an industry where most of the operational knowledge lives in people's heads.\n\nWe built three connected pieces: a customer booking portal for quotes, bookings and shipment tracking; an operations panel for dispatch, status updates and documents; and a CRM that tracks every customer, lead and follow-up.\n\nSales, operations, accounts and management each see exactly what they need, and every shipment leaves a complete trail from first enquiry to delivery.\n\nIt's how we approach unorganised industries: map how the work really happens, then turn it into an organised process your whole team runs on.",
    cover_image: null,
    gallery: [],
    tags: ["Booking portal", "Operations panel", "CRM", "Role-based access"],
    metrics: [
      { value: "3", label: "Portals: customer, operations, CRM" },
      { value: "End to end", label: "Every shipment tracked, enquiry to delivery" },
      { value: "4 teams", label: "Sales, ops, accounts and management on one system" },
    ],
    live_url: null,
    accent: "#14A39A",
    featured: true,
    published: true,
    sort_order: 6,
  },
  {
    slug: "hr-platform",
    title: "HR that runs itself",
    client: "Confidential · HR",
    category: "SaaS Platform",
    year: 2026,
    summary: "An HR platform for employee records, attendance, leave and payroll, with a self-service portal for every employee.",
    description:
      "Growing companies outgrow spreadsheets for HR fast: records scatter, leave approvals stall and payroll turns into a monthly scramble.\n\nThe platform brings it together — employee profiles and documents, attendance and shifts, leave policies with approval workflows, and payroll-ready reports.\n\nEmployees get a self-service portal for leave, payslips and requests; managers approve from anywhere; HR sees the whole organisation at a glance.\n\nIt runs on the client's own servers, so employee data never leaves their infrastructure — and we handle the deployment and updates there.",
    cover_image: null,
    gallery: [],
    tags: ["HRMS", "Attendance & leave", "Payroll reports", "Self-hosted"],
    metrics: [
      { value: "Self-service", label: "A portal for every employee" },
      { value: "Self-hosted", label: "Runs on the client's own servers" },
      { value: "Workflows", label: "Leave and request approvals" },
    ],
    live_url: null,
    accent: "#E05A7A",
    featured: false,
    published: true,
    sort_order: 7,
  },
  {
    slug: "workforce-productivity",
    title: "Every shift, measured",
    client: "Confidential · Workforce",
    category: "Operations & CRM",
    year: 2026,
    summary: "A workforce productivity system that assigns work, tracks output and shows managers who is doing what, live.",
    description:
      "On factory floors, sites and field teams, productivity is usually measured at the end of the month — when it's too late to fix anything.\n\nSupervisors assign tasks and targets by shift, workers log their output from a phone, and attendance and hours tie directly to the work done.\n\nManagers get live dashboards for output by worker, team and site, spot bottlenecks early, and export reports for incentives and payroll.\n\nIt's designed for teams using software for the first time: simple screens, mobile first, and quick to roll out.",
    cover_image: null,
    gallery: [],
    tags: ["Task & target tracking", "Mobile-first", "Live dashboards", "Reports"],
    metrics: [
      { value: "Live", label: "Output by worker, team and site" },
      { value: "Per shift", label: "Targets, attendance and hours" },
      { value: "Mobile-first", label: "Built for the floor, not the office" },
    ],
    live_url: null,
    accent: "#4F86F7",
    featured: false,
    published: true,
    sort_order: 8,
  },
];

/** Reviews come from real clients via the site form or Admin → Reviews; none are seeded. */
export const seedReviews: Seed<Review>[] = [];

export const seedTeam: Seed<TeamMember>[] = [
  { name: "Arman Noyada", role: "Founder, Engineering", photo_url: null, color: "#ff4d1c", sort_order: 1, published: true },
  { name: "Isha Kapoor", role: "Design Director", photo_url: null, color: "#c08552", sort_order: 2, published: true },
  { name: "Leo Fernandes", role: "Brand & Motion", photo_url: null, color: "#6e8b74", sort_order: 3, published: true },
  { name: "Nina Das", role: "Product Strategy", photo_url: null, color: "#3f5e8c", sort_order: 4, published: true },
];

export const seedSettings: SiteSettings = {
  email: "armancompiler@gmail.com",
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
  clients: ["Mahalaxmi Art", "AARAN HOMES", "ArenaOS", "Vertitide Ship Management"],
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
