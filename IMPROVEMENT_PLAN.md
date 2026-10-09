# TechBack Solutions — Website Improvement Plan

_Produced 2026-10-05 by a multi-agent audit (10 lenses, 3 adversarial verifiers, synthesized final). Theme stays identical — this plan is content, structure, SEO, trust, and content-model additions only._

## North star promise

> An independent Mumbai studio that designs, engineers and ships the websites, SaaS platforms and operations software a serious business runs on — with the senior people who built it still on the call after launch, procurement-ready in writing, and findable where buyers already look.

## Executive summary

TechBack ships a stunning editorial theme on top of thin, generic content — a studio that quietly builds SaaS, operations panels and CRMs for cargo, real-estate, gaming, HR, maritime and ed-tech, but tells first-time visitors it does "digital craft for brands with a point of view." The plan keeps every pixel of the night/bone/ember theme and rebuilds the substance: Home repositions around platforms (hero H1, 4-item rotator, single-line eyebrow row, outcome caption on project cards); Services splits into six indexable /services/[slug] pages with timeline, engagement shape, "from Rs X (approx. USD/GBP)" bands and unique FAQs; Work gains a Challenge/Approach/Result scaffold with embedded client quote, stack chip row, "What you keep" + "After launch" handover and a quantified Metric type with methodology captions; About and Reviews stop hiding when admin fields are empty and finally carry a signed founder letter + case-anchored, third-party-verified testimonials + callable references; a Content Engine (Journal, FAQ, Industries) opens a 25-query SEO roadmap mapped in src/content/seo-roadmap.md before any article is written; and a Global SEO workstream ships JSON-LD (Organization, ProfessionalService/LocalBusiness, Service+Offer, CreativeWork, VideoObject, Article/BlogPosting with author Person @id continuity, Review+AggregateRating third-party-only, FAQPage from /faq hub only, Breadcrumb), hreflang, OG images per dynamic segment, image sitemap, favicons, canonicals, 301 map, Core Web Vitals budget + Lighthouse CI gate, and Google Business Profile + NAP citations. Enterprise procurement readiness (MSA/DPA/PI/warranty/vendor-pack PDF, payment terms, change-order process, hosting/DNS/account ownership, bus-factor continuity statement, WCAG 2.2 AA audit) lands as a dedicated workstream. Theme integrity is treated as a hard contract: no second Marquee under Platforms, no persistent dot-rail, no live-clock, no Magnetic pill adjacent to the Hero scroll circle, no bordered chip on every ProjectCard, no (00) breaking the numbered ladder, no boxed Breadcrumbs, no new type scale on the MarkdownPost renderer, and a per-page ember-scarcity audit. Workstream order: Trust & Model foundations -> Home repositioning & conversion plumbing -> Services split & Case-study scaffolding -> Global SEO/structured-data + CWV gate -> Content Engine + Industries (4 loud, not 7 thin) -> Enterprise & Procurement -> Admin draft/preview + measurement -> Launch GTM.

## Themes

- Say what you build — replace 'digital craft for brands with a point of view' positioning with the real business: websites, SaaS platforms, operations panels, CRMs and booking portals (plus Shopify Headless for commerce) for named industries, out of Mumbai, with named client regions.
- Prove it with real numbers AND show the method — retire fabricated stats and surface quantified Metric tiles (value + unit + baseline + timeframe + method sub-caption) plus outcome captions on every ProjectCard so visitors read evidence instead of adjectives.
- Make the proof reachable with descriptive anchors — services link to the case studies that came out of them, case studies carry an embedded verified client quote and a 'More like this' row with industry+service anchor text, reviews pin to the projects they refer to via project_slug and emit schema only when third-party-verified, the home grid shows outcomes above the fold.
- Answer the money question in full — publish 'from Rs X (approx. USD/GBP)' bands on every engagement and service page, surface payment schedule + change-order rules + retainer deliverables (hours/rollover/pause/exit) on /engagements, add Budget and Timeline chips to the inquiry form, and address pricing/timeline/NDA/IP/procurement openly in /faq.
- Pass procurement, not just the pitch — enterprise buyers need MSA, DPA (DPDP 2023 + GDPR), PI insurance + liability cap, warranty, data residency, backup/DR, sub-processors, bus-factor continuity, and callable references. Ship /legal/vendor-pack as a downloadable PDF plus a Procurement section in /faq.
- Earn long-tail AND local SEO — split one /services page into six, add /industries + /journal + /faq, ship JSON-LD across Organization/ProfessionalService/Service+Offer/CreativeWork/VideoObject/Article+Person@id/Review+AggregateRating/FAQPage/Breadcrumb, hreflang (en-IN/en-US/en-GB/x-default), verified GBP + NAP citations on Clutch/DesignRush/GoodFirms, and give every page a canonical, OG image per dynamic segment and honest meta description.
- Make the site fast on an Indian 4G phone — LCP <2.5s / INP <200ms / CLS <0.1 as hard budgets, Lighthouse CI gate, Preloader once-per-session + reduced-motion, next/image mandatory, Instrument Serif self-hosted and preloaded on LCP routes.
- Keep the theme sacred — every change above lands inside existing components (Hero, ProjectCard, ProjectVisual, SectionHeading, ScrollText, Marquee, Counter, Process, ServiceAccordion, Testimonials, Reveal, SplitText, Magnetic, CTA, Preloader) with zero new type scale, no second stacked Marquee, no dot-rail, no live-clock, no Magnetic pill next to the Hero scroll circle, no bordered chips on ProjectCards, no (00) breaking the numbered ladder, no boxed Breadcrumbs or 'What you keep' cards, per-page ember-scarcity audit, Reveal capped at one per block.
- Fix trust before growth, then measure growth honestly — fabricated stats, personal Gmail, broken socials, placeholder team names and empty-admin sections are the single highest-leverage block. Ship Week 1 foundations before any new page. Analytics (GA4 + Speed Insights) and attribution (Inquiry.ref + utm_*) ship with the launch so every KPI has instrumentation.

## Sequencing (6 weeks + 6-12 week follow-through)

- Week 1 — TRUST & FOUNDATIONS (unblocks everything). Replace fabricated stats (120+/9yr/14/98%) with provable settings-driven numbers (platforms shipped, platform types, reply SLA, senior lead); rewrite settings.about_story to match founder-led reality; migrate email from personal Gmail to studio-domain inbox with DMARC/SPF/DKIM; populate real socials or hide empty ones (add validation); seed address + phone + GSTIN; retire the three placeholder team members (published:false) and write Arman's full bio + letter + continuity statement (bus-factor: backup contact + handover SLA + named covering collaborators); add settings.hq/regions/booking_url/whatsapp/legal_entity/reply_time_miss_policy/backup_contact_email. Ship favicon + apple-icon + manifest + delete create-next-app SVGs. Extend Service / Project / Review / TeamMember / Inquiry / Settings types in src/lib/types.ts and seed.ts; add admin forms for the new fields WITH component-level fallbacks for every settings copy string and draft/preview/publish state on each. Set up GA4 + Vercel Speed Insights + GSC + Bing Webmaster verification. These foundations block Weeks 2-4 so they go first.
- Week 2 — HOME & CONVERSION PLUMBING. Rewrite Hero H1 + sublede + 4-item rotator (validated against H1 metric); replace Hero eyebrow with a SINGLE line (location + reply SLA, ember-dot separated) — not three padded chip-pills; keep the Hero scroll circle solo (no Magnetic pill adjacent). Add primary 'Start a project' affordance via the persistent Navbar pill (already above the fold) + a secondary 'See the work' eyebrow link in the clientele strip below Hero. Add scroll anchors on home sections (ids only, NO visible dot-rail). Replace outcome 'chip' on ProjectCard with a muted eyebrow caption + hairline rule + single ember dot before the number (ember stays scarce). Fold the four 'By the numbers' Counter cells into the Platforms SectionHeading aside slot OR a thin eyebrow row — NOT a new (00) section (preserve the numbered ladder starting at 01). Rewrite clients marquee eyebrow with sector-range line + link items to case studies via settings.clients[].slug using descriptive anchor text. Reframe (01) to 'What we do for you'. Rewrite inquiry form: rename budget -> engagement, add real Budget bands (with USD/GBP footnote hints), Timeline chips, NDA checkbox, optional link field, hidden ref field. Add Cloudflare Turnstile + honeypot + per-IP rate limit + Resend bounce handler + Zod schema. Wire two emails on submit (confirmation to inquirer naming Arman + reply SLA + miss-policy; notification to studio with /admin link). Replace Success panel dead-end with 'Explore the work' + 'Book a call' forward actions + 3-step 'What happens next' block (Reply 24h -> Discovery call 30 min free, 1-page brief back -> Proposal within 5 working days). Add CTA band to /reviews. Add 404 rescue strip. Instrument form events.
- Week 3 — SERVICES SPLIT & CASE-STUDY SCAFFOLDING. Build /services/[slug] template reusing PageHeader + ScrollText + Counter (bone-on-night, ember accent on number full-stop only, no card borders) + ServiceAccordion + ProjectCard rail + Process (with per-service steps prop) + CTA. Fill the six services with outcome, timeline_weeks, engagement_types, starting_from (with USD/GBP footnote), in_scope, out_of_scope, sample_project_slugs, UNIQUE service-specific FAQ (no cannibalisation with /faq hub). Move engagements to /engagements with Shape/Window/From/Fits rows + retainer deliverables (hours/month, cadence, rollover, pause, exit terms) + payment schedule (milestone split, NET terms, advance) + change-order rules. Add inline FAQ block on /services (NO schema emit; component only). Build /faq hub with FAQPage schema. Rewrite /work/[slug] with Challenge/Approach/Result sections, embedded client pull-quote (bone-background block, existing Testimonials treatment, ember open-quote glyph), stack chip row (STATIC eyebrow strip of chips, NO second Marquee), 'What you keep' three-line eyebrow prose (source + Figma + README + account-ownership + DNS + offboarding runbook — NOT a boxed card), 'After launch' subsection (hosting cost, hypercare window, bug SLA, feature-request process), 'More like this' row with descriptive industry+service anchor text (by same industry, else same category, else services_used overlap). Split Metric type with method field; render as muted sub-caption. Separate outcome_bullets[] as ember-tick list (ember scarce). Rewrite ArenaOS as the worked example everyone else is seeded against. Add Breadcrumbs component (eyebrow text, ember separator, NO border/box/background) + BreadcrumbList schema. Reveal use capped: one Reveal per block, not per tile.
- Week 4 — GLOBAL SEO & STRUCTURED DATA + CWV GATE. Ship src/lib/jsonLd.ts with all helpers. Inject Organization + WebSite in root layout, LocalBusiness (ProfessionalService hybrid, knowsAbout) on /contact, Service + Offer on /services/[slug], CreativeWork + BreadcrumbList + VideoObject (when video_url) on /work/[slug], Review + AggregateRating on /reviews (third-party-verified only), FAQPage on /faq hub only. Author Person @id continuity across Organization team <-> Article.author <-> Project credits. Add page-level metadata to home. Rewrite the five placeholder meta descriptions. Add alternates.canonical + alternates.languages hreflang (en-IN, en-US, en-GB, x-default) to every route. Add OG images (global + per-dynamic-segment for /work, /services, /industries, /journal, /approach, /faq, /engagements). Enrich sitemap.ts with lastModified / changeFreq / priority + image sitemap entries + robots.ts (disallow /admin, /api). Pre-launch Screaming Frog / Sitebulb crawl; 301 redirect map in next.config.ts for every URL whose content moves. Lighthouse CI gate: LCP <2.5s / INP <200ms / CLS <0.1 on 4G mobile. Preloader runs once per session + honours prefers-reduced-motion. Self-host Instrument Serif + preload on LCP routes. next/image mandatory. Verify GSC + Bing Webmaster. Audit WCAG 2.2 AA (axe + Lighthouse + palette contrast report); fix within palette family only.
- Week 5 — CONTENT ENGINE LAUNCH + INDUSTRIES. Build /industries hub + 4 vertical detail pages (logistics-cargo, real-estate, gaming-entertainment, maritime — each has >=2 proof projects). Hold interior-design, hr-workforce, ed-tech until they qualify. Each industry page carries vertical-specific compliance signalling (RERA for real estate, DPDP for HR when it launches, port-authority integrations for maritime, GST invoicing for cargo). Launch /journal shell with 2 articles: (1) founder-written 'Why we rebuilt the TechBack site in 2026' doubling as GTM launch note; (2) 'How we built a cargo CRM in six weeks'. MarkdownPost renderer pinned to existing tokens only. Build /approach route and retire duplicate Process section from /services. Build /legal/privacy (DPDP + GDPR + CCPA), /legal/terms, /legal/accessibility (WCAG conformance statement + palette contrast report + audit date), /legal/vendor-pack (downloadable PDF with MSA, DPA, PI, warranty, data residency, backup/DR, sub-processors), /security.txt. Add fourth Footer column 'Legal' + fifth 'Sitemap'. Ship src/content/seo-roadmap.md mapping all 25 queries to target URL + H1 + meta + internal links. GTM launch day: founder LinkedIn post, email to past clients + warm leads, pin 'View our 2026 rebuild' to Hero for 2 weeks.
- Weeks 6-12 — JOURNAL CADENCE + PILLAR REFRESH + ENTERPRISE READINESS. Publish 1 journal article/week for 10 weeks against the 25-query roadmap, each linking up to a service or industry pillar and sideways to a case study. Verify Google Business Profile for Mumbai HQ with 15-25 photos; publish weekly GBP Posts tied to Journal articles; seed GBP Q&A from /faq. Secure NAP citations on Clutch, DesignRush, GoodFirms, Behance, LinkedIn Company Page, JustDial, Sulekha. Collect real, written-with-permission client quotes from Mahalaxmi, AARAN HOMES, ArenaOS, Vertitide + 1 anonymised NDA client — ship Reviews only after permission_granted:true. Add callable references row on /reviews with 2-3 past clients who agreed. Backfill case-study PDFs via Puppeteer export (x-robots-tag:noindex,noimageindex) for non-NDA projects. Add team photos as real hires or collaborators are confirmed. Build /admin content-health dashboard + inquiry attribution dashboard rolling up ref + utm_*. Monitor GSC for ranking lift; iterate meta/H1 on pages impressing but not clicking. 60/90/180-day pillar refresh cycle on /services/[slug] + /industries/[slug] bumping dateModified. Weekly review-moderation queue in /admin.

## KPIs — how we measure the work

- Inquiry quality rate — percent of /contact submissions arriving with budget band + timeline + service selected (today 0 percent; fields do not exist). Target: 80 percent within 4 weeks of launching the new form. Owner: Form workstream. Instrumentation: GA4 inquiry_submit event with budget/timeline/service dimensions.
- Reference-attributed inquiries — percent of submissions with Inquiry.ref populated from a case-study CTA. Target: 40 percent within 30 days. Instrumentation: GA4 custom dimension ref; roll-up in /admin dashboard.
- Organic sessions on commercial pages — Google Search Console impressions + clicks on /services/[slug], /industries/[slug] and /work/[slug]. Target: 3x impressions in 90 days from new URLs ranking against the 25-query roadmap. Instrumentation: GSC + GA4 landing-page report.
- Case-study depth engagement — median scroll depth and average time on /work/[slug]. Target: median scroll >=75 percent and avg time >=90s. Instrumentation: GA4 scroll_75 event + engagement_time_msec.
- SERP CTR on brand and commercial queries — before/after metadata rewrites, OG image, favicon, canonical, breadcrumb schema. Target: +25 percent CTR on the top 20 queries within 60 days. Instrumentation: GSC Performance report, before/after export.
- Core Web Vitals — LCP <2.5s, INP <200ms, CLS <0.1 on 4G mobile for /, /work, /work/[slug], /services/[slug]. Instrumentation: Vercel Speed Insights + CrUX via GSC + Lighthouse CI gate on PRs.
- Reply-SLA adherence — percent of inquiries receiving a human reply within 24 working hours; miss policy fires an auto 'reason within 48h' email. Target: 95 percent on-time; 100 percent on-miss notification. Instrumentation: Inquiry.replied_at timestamp; weekly /admin report.
- Local pack visibility — ranking in top 3 of Google Local Pack for 'website design agency mumbai', 'software development mumbai', 'saas developers mumbai' within 90 days of GBP verification + 15 citations. Instrumentation: GSC + manual local-pack checks + GBP insights.
- Discovery-call conversion — percent of qualified inquiries (budget >=Rs 2L, timeline <=4 months) that convert to a 30-minute discovery call. Target: 60 percent within 60 days. Instrumentation: booking tool callback into /admin.
- Content-health completeness — percent of Services, Projects, TeamMembers, Reviews with all required fields populated. Target: 100 percent on launch; stays above 90 percent at any admin audit. Instrumentation: /admin content-health dashboard.

## Risks & trade-offs

- Scope realism — the full plan is 6-8 weeks of focused work plus a 10-week Journal cadence. Shipping Trust & Model foundations without the content follow-through would leave the site looking honest but still thin. Commit to the full sequence or defer workstreams explicitly, and apply the defer-ladder (below) if Week 2 overruns.
- Defer-ladder for scope slippage — in order of first-to-defer: (1) /journal articles beyond the 2 launch pieces; (2) /industries pages beyond the 4 loud launches; (3) /approach + /engagements as standalone routes (keep inline Process + engagement cards on /services as fallback); (4) /legal/vendor-pack PDF (keep privacy/terms/accessibility); (5) per-industry OG images (fall back to global card). Case-study scaffold, Services split, Global SEO and Enterprise procurement DO NOT defer — they are launch-critical.
- Removing fabricated stats before new numbers land will temporarily make /about and the Capabilities section look emptier. Ship replacement numbers (platforms shipped, platform types, reply SLA) in the same deploy — do not leave the page bare for weeks.
- Hard-coded strings move to Settings (Preloader tagline, Hero H1/sublede/rotator, Platforms tiles, Process steps). Every new settings field MUST ship a component-level fallback that preserves the current H1 line-break metric, SplitText emphasis positions and Preloader timing, or an empty admin field will reflow the Hero. Admin draft -> preview -> publish state is required on all settings copy before go-live.
- Pricing transparency ('from Rs X with USD/GBP equivalents' on engagement cards and service pages) will filter out some inbound. That is the point, but the owner must be comfortable publishing bands they will honour; a brackets-left-in placeholder on launch looks worse than no number.
- Six new /services/[slug] + four /industries/[slug] pages mean 10 new URLs crawl-dependent on real content. Shipping thin stubs will dilute, not concentrate, SEO. Each page needs 500-800 words, >=2 linked case studies and a unique FAQ at launch. Industry pages gate on >=2 proof projects OR a signed-NDA case with named outcomes; interior-design, hr-workforce and ed-tech wait until they qualify.
- Case-study rewrites require real client quotes and real tech stacks. Four of eight projects are NDA — plan the ask: can we quote the client anonymised? Can we name the stack even when the client stays confidential? Build the review/approval loop before writing. Example quotes in the plan are drafts — ship empty-state before shipping fabricated.
- Content Engine (Journal) is a sustained commitment — 1 article/week for 10 weeks after launch. If the owner cannot write (or hire a writer who sounds like the house voice), this workstream should be deferred rather than started weakly. Generic agency blog posts rank for nothing and look worse than silence. Pillar pages (Services + Industries) need a 60/90/180-day review cadence to bump dateModified.
- Journal + /industries create 40+ new indexable URLs — monitor sitemap, canonicals and internal linking during rollout to avoid thin-content penalties. The sitemap must reflect published_at and real lastModified from day one. Pre-launch Screaming Frog crawl is mandatory, not optional.
- Admin pricing data (Service.starting_from, engagement 'from' rows) must be editable by the owner, not hard-coded. Otherwise every rate change becomes a deploy and the fields drift stale fast. USD/GBP equivalents refresh via a scheduled job or an admin-editable rate.
- Email migration from the Gmail inbox to a studio-domain inbox needs DMARC/SPF/DKIM alignment or form notifications will land in spam. Plan the DNS work before switching settings.email. Add Resend bounce handler to catch delivery failures.
- Theme integrity is a hard contract. Any UI that reads product-site or dashboard (Magnetic pill next to the Hero scroll circle, right-rail dot nav, live LocalTime chip, (00) breaking the numbered ladder, bordered chip on every ProjectCard, second stacked Marquee, boxed Breadcrumbs, three padded chip-pills in the Hero eyebrow, boxed 'What you keep' card) is cut by this plan. The MarkdownPost renderer pins to existing tokens only — no new type scale, no new spacing scale, no stock prose stylesheet. Ember accent carries a per-page scarcity audit after all additions.
- WCAG 2.2 AA audit may surface a contrast failure between 'mute' text on 'night' background or ember on bone at small sizes. If it does, fix is per-token adjustment within the existing palette family (e.g. a slightly lighter mute for body copy <=14px), not a palette rework. Document explicitly as 'tune within family, do not swap'.
- GTM launch LinkedIn post + Journal 'Why we rebuilt' article must be founder-written. Any copy that reads AI-authored or generically agency-marketing will undo the trust foundations the Week 1 workstream is paying for.
- Case-study PDF production path is Puppeteer-exported from the live case-study route to /case-studies/<slug>.pdf with x-robots-tag:noindex,noimageindex so the PDF does not outrank the HTML. If Puppeteer scope slips, drop the PDF button entirely rather than linking to a Google Doc.
- Review schema policy — emit Review + AggregateRating ONLY from reviews with verification_source + source_url set. Self-serving aggregated stars that Google strips damage trust more than no stars. The /admin review moderation queue catches hostile/fake submissions before publish.

## New pages / content types to add

- /services/[slug] — six detail pages (brand-identity, web-design-development, product-design, ecommerce including Shopify Headless, operations-panels-crm, growth) composed from PageHeader + ScrollText + Counter + ServiceAccordion + ProjectCard rail + Process + CTA. Each carries outcome, timeline range, team shape, engagement types with retainer deliverables + rollover + exit terms, in/out of scope, sample projects, service-specific FAQ (unique questions, no cannibalisation with /faq hub), per-service OG image, 301 from any legacy URL, and Service + Offer + FAQPage JSON-LD.
- /industries hub + /industries/[slug] — launch loud with four verticals that have >=2 proof projects (logistics-cargo, real-estate, gaming-entertainment, maritime); hold interior-design, hr-workforce and ed-tech until a second proof lands. Each page pulls matching Projects into a WorkIndex-style grid, carries vertical-specific compliance signalling (RERA for real estate, DPDP for HR, port-authority integrations for maritime, GST invoicing for cargo), a vertical-specific FAQ, per-industry OG image, and CollectionPage + BreadcrumbList JSON-LD.
- /approach — lift the Process timeline + per-phase deliverables into its own route, add 301 from any legacy /services#process anchor shares; retire the duplicate Process section on /services. Process component accepts a steps prop so service pages pass per-service variations without duplicating markup.
- /engagements — four cards (Project / Partnership / SaaS / Consultancy) with Shape / Window / From / Fits rows, retainer deliverables (hours/month, cadence, rollover, pause clauses, exit terms), payment schedule (milestone split, NET terms, advance), change-order rules, example clients, and USD/GBP equivalents next to INR bands.
- /faq — ServiceAccordion-styled hub with 20-25 Q&As grouped Working with us / Who we are / How we build / After launch / Procurement / Compliance. Inline FAQ blocks on /services, /services/[slug], /contact and each /industries page use UNIQUE Q&As (no duplication) and FAQPage schema is emitted ONLY from /faq hub to avoid Google rich-snippet cannibalisation. Inline blocks keep the ServiceAccordion component but drop the JSON-LD emit.
- /journal + /journal/[slug] — editorial surface for the 25-query roadmap. Target 2 articles at launch (including a founder-written 'Why we rebuilt the TechBack site in 2026' doubling as the GTM launch note) + 1/week for 10 weeks. New 'articles' table with title, dek, cover_image, body_md, author_id, tags[], industry, service_slugs[], related_project_slugs[], meta_title, meta_description, og_image, reading_time, published_at, updated_at (auto-bumped on save), published, status (draft/review/published). MarkdownPost renderer pins to existing tokens only — Instrument Serif display, serif body, eyebrow for captions, ScrollText rhythm for lede, Testimonials pull-quote treatment, existing dividers.
- /legal/privacy (DPDP Act 2023 + GDPR + CCPA compliance language) + /legal/terms + /legal/accessibility (WCAG 2.2 AA conformance statement + audited palette contrast report + external audit date) + /legal/vendor-pack (downloadable PDF: MSA template, DPA, PI insurance certificate + liability cap, warranty/defect period, data residency, backup/DR, sub-processor list) + /security.txt. Fourth Footer column 'Legal' with entity line (settings.legal_entity, settings.gstin). Fifth Footer column 'Sitemap' linking Services / Industries / Journal / FAQ / Approach / Engagements for site-wide internal anchor-text coverage.
- /not-found upgrade — add metadata robots:noindex, replace single Home pill with Work/Services/Contact rescue strip in existing ghost border style.
- Case-study long-form scaffold — Project model gains industry, duration_weeks, team_size, role, brief, outcome_bullets[], services_used[], tech_stack[], role_breakdown, credits (Person @id references), pdf_url (production path: Puppeteer export from live case-study route, named /case-studies/<slug>.pdf, x-robots-tag:noindex,noimageindex), video_url, review_id, client_logo_url, pull_quote, primary_outcome, status (active/archived), last_shipped_at (powers a 'currently building' / 'last shipped' line). /work/[slug] renders The brief -> What we did -> What changed with embedded client quote, stack chip row (static eyebrow strip, no second Marquee), 'What you keep' three-line eyebrow block (source + Figma + README + account-ownership + DNS + offboarding runbook, prose not a boxed card), 'After launch' subsection (hosting cost, hypercare window, bug SLA, feature-request process), 'More like this' row with descriptive industry+service anchor text.
- Metric model split with methodology — metrics becomes {value:number, unit:string, label:string, baseline:string, timeframe:string, method:string} rendered with the method as a muted sub-caption; narrative wins move to Project.outcome_bullets[] as ember-tick list (ember used scarcely).
- Review <-> Project join and third-party-verified policy — Review gains project_slug, quote_short, verification_source ('email'|'linkedin'|'clutch'|'gbp'|null), source_url, company_logo_url, permission_granted:boolean, moderation_status ('pending'|'approved'|'flagged'|'rejected'). JSON-LD Review + AggregateRating emits ONLY from reviews where verification_source and source_url are set — self-serving stars that Google strips are suppressed. Review moderation queue in /admin catches hostile/fake submissions before publish. Add callable references row on /reviews with 2-3 past clients who agreed to a 15-minute call (settings.referenceable_clients[]).
- TeamMember expansion — bio (2 sentences), linkedin_url, github_url, specialty, location, years_experience, person_id (stable @id for schema continuity), knowsAbout[]. Launch with Arman fully written up + photo + published founder letter; park placeholder members at published:false until replaced with real collaborators + photos.
- SiteSettings expansion — hq, regions, hero_sublede (with component-level fallback that preserves H1 line-break metric and SplitText emphasis), hero_rotator[] (max 4 items validated for H1 metric at min-breakpoint; longer nouns move to Platforms), preloader_tagline (with fallback), booking_url, whatsapp, legal_entity, gstin, reply_time_promise, reply_time_miss_policy ('If we miss, we send a reason within 48h'), backup_contact_email, office_hours, founder_letter, founder_signature, continuity_statement (bus-factor: backup contact + handover SLA + named covering collaborators), referenceable_clients[], draft/preview/publish state on every settings copy field, procurement_pack_url. Validate socials to reject bare-domain URLs; warn on free-provider email domains.
- Inquiry model expansion — budget (real bands), timeline, nda, link, ref (referring case study slug), source, utm_source/medium/campaign/term/content, discovery_call_booked, currency_hint (geo-detected display only). Form hardening: Cloudflare Turnstile + honeypot + per-IP server-side rate limit + Resend bounce handler + Zod schema.
- Breadcrumbs component — eyebrow-case text (tracked), ember separator glyph only, NO border/box/background, inherits PageHeader top-padding (no own rhythm band). Rendered above PageHeader on /work/[slug], /services/[slug], /industries/[slug], /journal/[slug] with BreadcrumbList JSON-LD.
- Logos & client objects — settings.clients[] becomes {name, slug?, href?, logo_url?} so the home marquee links each client to its case study with descriptive anchor text (client + industry).
- Favicon system — app/icon.tsx (32x32), app/apple-icon.tsx (180x180), app/manifest.ts rendering ember-on-night italic serif 'T'. Delete the five create-next-app SVGs from public/.
- Open Graph image system — app/opengraph-image.tsx global card + per-dynamic-segment opengraph-image.tsx for /work/[slug], /services/[slug], /industries/[slug], /journal/[slug], /approach, /faq, /engagements. All in the signature italic-serif ember style with route-appropriate accent + title; no drop shadows, no saturated presets, grain treatment consistent with site photography.
- JSON-LD helpers in src/lib/jsonLd.ts — Organization + WebSite (with SearchAction if /search ships, otherwise omit cleanly) + ProfessionalService/LocalBusiness hybrid with knowsAbout + additionalType + Person (founder with sameAs chain to LinkedIn, GitHub, Clutch, GBP, Wikidata eventually) + Service + Offer (priceCurrency:'INR', price, availability) + ItemList + CreativeWork (with dateModified) + VideoObject (when project.video_url present) + Article/BlogPosting (with author Person @id continuity) + Review + AggregateRating (third-party-verified only) + FAQPage (/faq hub only) + BreadcrumbList. All helpers guard against empty inputs to avoid invalid-emits.
- Image sitemap entries — extend sitemap.ts to a MetadataRoute.Sitemap with <image:image> loc entries for project.cover_image, project.gallery[].url, team member photo_url. Enables Image Pack SERP.
- hreflang alternates — root generateMetadata and every static page emit alternates.languages = { 'en-IN': canonical, 'en-US': canonical, 'en-GB': canonical, 'x-default': canonical } self-referential (single English site, no duplicate /en-us trees).
- 301 redirect map — pre-launch Screaming Frog / Sitebulb crawl, document every URL whose content moves (engagement cards -> /engagements, Process section -> /approach, /services shape change) in next.config.ts redirects with code comments. Catch orphan pages, canonical loops, mixed-case/trailing-slash duplicates.
- Google Business Profile + citations — verified GBP for Mumbai HQ with NAP exactly matching settings; categories (Website Designer, Software Company, Graphic Designer); service areas; 15-25 photos; weekly GBP Posts tied to Journal; GBP Q&A seeded from /faq. Directory citations with identical NAP on Clutch, DesignRush, GoodFirms, Behance, LinkedIn Company Page, JustDial, Sulekha.
- Analytics stack — GA4 + Vercel Analytics + Vercel Speed Insights + Plausible optional. Event schema: form_view, form_start, chip_select (budget, timeline, service), inquiry_submit with dimensions (budget, timeline, service, ref, utm_*); case_study_scroll_75, service_detail_cta_click. Dashboard in /admin reads events and rolls up Inquiry.ref/utm_* for attribution. Search Console property verified; Bing Webmaster submitted.
- Core Web Vitals budget + Lighthouse CI gate — LCP <2.5s on 4G mobile for /, /work, /work/[slug], /services/[slug], /industries/[slug]; INP <200ms; CLS <0.1. Preloader runs once per session (sessionStorage flag), honours prefers-reduced-motion. Instrument Serif self-hosted with font-display:swap and preloaded on routes where H1 is LCP. next/image mandated for every gallery/cover_image/client logo with explicit sizes. Preload LCP image on /work/[slug]. Lighthouse-CI gate on Week 4 ship.

## SEO checklist

- Add src/app/opengraph-image.tsx (global 1200x630 ember-on-night card) + per-dynamic-segment opengraph-image.tsx for /work/[slug], /services/[slug], /industries/[slug], /journal/[slug], /approach, /faq, /engagements. All in signature italic-serif ember style with route-appropriate accent + title; no drop shadows.
- Add twitter: { card: 'summary_large_image', title, description, images } to root layout.tsx; inherited by all routes.
- Add page-level generateMetadata to src/app/(site)/page.tsx — the home page currently exports no metadata and inherits only root defaults.
- Rewrite meta descriptions on /, /work, /services, /about, /reviews, /contact to 140-160 chars, benefit-led, with Mumbai geo cue and 1-2 commercial keywords each. Include Shopify Headless + Hydrogen on /services/ecommerce and / to catch 'shopify headless agency india' intent.
- Add alternates.canonical to every route (static + dynamic). On /work/[slug] compute canonical = siteUrl() + '/work/' + slug.
- Add alternates.languages = { 'en-IN': canonical, 'en-US': canonical, 'en-GB': canonical, 'x-default': canonical } (self-referential) on root and every static page. Do NOT build separate /en-us trees.
- Extend /work/[slug] generateMetadata to include openGraph.type='article', openGraph.images from project.cover_image || gallery[0] || per-case opengraph-image.tsx, openGraph.publishedTime, openGraph.modifiedTime, keywords=project.tags.
- Create src/lib/jsonLd.ts with helpers: organizationLd, websiteLd (SearchAction only if /search ships; otherwise omit cleanly), localBusinessLd (@type:['ProfessionalService','LocalBusiness'] + knowsAbout + additionalType), serviceLd (with Offer: priceCurrency, price, availability), serviceItemListLd, creativeWorkLd (with dateModified), videoObjectLd, articleLd / blogPostingLd (with author Person @id continuity + publisher + mainEntityOfPage + dateModified), reviewLd, aggregateRatingLd (THIRD-PARTY-VERIFIED REVIEWS ONLY), faqPageLd (emit ONLY from /faq hub to avoid cannibalisation), breadcrumbLd, personLd (with sameAs chain). Every helper guards against empty inputs.
- Inject Organization + WebSite JSON-LD in root layout.tsx (name, url, logo=/icon, sameAs from settings.socials + validated against bare-domain regex, contactPoint, foundingLocation).
- Inject LocalBusiness JSON-LD on /contact (address, telephone, email, geo, areaServed, openingHoursSpecification, priceRange, knowsAbout:['Next.js','React','Node.js','PostgreSQL','Shopify Headless','SaaS Development','CRM Development']).
- Inject ItemList(Service) on /services and Service + Offer JSON-LD on each /services/[slug].
- Inject CreativeWork + BreadcrumbList JSON-LD on each /work/[slug] with name, creator=Organization@id, image, datePublished, dateModified, keywords=tags, about=industry. Inject VideoObject when project.video_url is set.
- Inject Article/BlogPosting on each /journal/[slug] with author Person @id matching the same @id used in Organization team + Project credits (knowledge-graph continuity).
- Inject Review[] + AggregateRating on /reviews — THIRD-PARTY-VERIFIED ONLY (verification_source + source_url present).
- Inject FAQPage JSON-LD on /faq hub ONLY. Inline FAQ components on /services, /services/[slug], /contact, /industries/[slug] use the component but DO NOT emit schema (prevents rich-snippet cannibalisation).
- Enrich sitemap.ts entries with lastModified (project.updated_at ?? created_at bumped on every admin save), changeFrequency, priority (home 1.0, /work and /services 0.9, service and industry detail 0.8, project detail 0.9 if featured else 0.7, journal 0.6).
- Extend sitemap.ts to a MetadataRoute.Sitemap emitting <image:image> loc entries for project.cover_image, project.gallery[].url, team member photo_url (Image Pack SERP).
- Add /services/[slug], /industries, /industries/[slug], /journal, /journal/[slug], /faq, /approach, /engagements, /legal/* routes to sitemap.ts.
- Add src/app/icon.tsx (32x32 ember-on-night italic serif 'T'), src/app/apple-icon.tsx (180x180), src/app/manifest.ts; delete the five create-next-app SVGs from public/.
- Add visible Breadcrumbs component above PageHeader on all deep routes (eyebrow typeface, ember separators, NO border/box/background) paired with BreadcrumbList JSON-LD.
- Add robots: { index: false, follow: false } metadata export to src/app/not-found.tsx and the admin layout files. In robots.ts: disallow /admin/*, /api/*; allow /opengraph-image.*; declare sitemap URL.
- Rewrite gallery <img> alt from the templated 'client gallery image N' to project.gallery[].alt (promote gallery to {url, alt, caption?}[]).
- Update TeamPortrait alt from member.name to member.name + ', ' + member.role so Person schema and image search both carry the role.
- Hero rotator trimmed to 4 words max (validated against H1 metric at min-breakpoint; longer nouns move to Platforms). Mirror the Platforms tiles.
- Hero sub-head carries Mumbai + three surface nouns in server-rendered HTML.
- Settings.description rewritten with keywords (Mumbai, Next.js, SaaS, CRM, operations panels, booking portals, Shopify Headless) as the home description fallback.
- Validate settings.socials to reject bare-domain URLs so Organization.sameAs never emits a broken knowledge-panel link; warn on free-provider email domains.
- Internal-link anchor-text strategy: /work/[slug] 'More like this' uses `${project.industry} ${primary service}`; services -> cases uses `${project.client}, ${project.industry}`; journal -> service uses `${service.title}`; platforms tiles -> cases uses outcome + client. Footer 'Sitemap' column links every hub URL.
- 301 redirect map in next.config.ts for every URL whose content moves (engagement cards -> /engagements, Process -> /approach, /services shape change). Pre-launch Screaming Frog / Sitebulb crawl.
- Google Business Profile verified for Mumbai HQ with NAP exactly matching settings; categories, service areas, 15-25 photos, weekly GBP Posts tied to Journal, GBP Q&A seeded from /faq. NAP citations on Clutch, DesignRush, GoodFirms, Behance, LinkedIn Company Page, JustDial, Sulekha.
- Core Web Vitals gate: Lighthouse CI on Week 4 ship; LCP <2.5s on 4G mobile, INP <200ms, CLS <0.1. Preloader runs once per session (sessionStorage) + honours prefers-reduced-motion. Instrument Serif self-hosted + font-display:swap + preloaded on LCP routes. next/image mandatory with explicit sizes. Preload LCP image on /work/[slug].
- Analytics: GA4 property + Vercel Analytics + Vercel Speed Insights. Event schema: form_view, form_start, chip_select (budget/timeline/service), inquiry_submit (budget, timeline, service, ref, utm_*), case_study_scroll_75, service_detail_cta_click. GSC + Bing Webmaster verified. Dashboard in /admin reads events.

## Workstreams

### Home

**Goal:** In the first 10 seconds a visitor can name what we build (SaaS, operations panels, CRMs, websites), where we are (Mumbai), who we have shipped for (named clients + sectors), and what to do next (Start a project) — without any UI element that reads product-site or dashboard.

#### [P0] Rewrite Hero H1, sublede and 4-item rotator (theme-safe)  _(effort: S)_

**Where:** src/components/site/Hero.tsx lines 9 (WORDS), 95 (H1), 106-109 (sublede)

**Why:** Current H1 'Digital craft for brands with a point of view' + a 5-word rotator missing SaaS/Booking/Operations/CRM contradicts the Platforms grid two scrolls below. First-screen scan tells one story, proof underneath tells another.

**Deliverables:**

- Replace H1 (admin-editable via settings.hero_headline, with component-level fallback preserving current line-break metric and SplitText emphasis): 'We build the *software* that runs your *business.*'
- Trim WORDS to 4 nouns validated against H1 metric at min-breakpoint: ['SaaS platforms', 'Operations panels', 'CRMs', 'Websites']. Longer rotator nouns (Booking portals, Brand identity) move to Platforms grid where they have room.
- Add admin-editable settings.hero_sublede with component fallback. Default: 'An independent studio in Mumbai designing and engineering the websites, SaaS platforms and operations software that keep an eight-figure business running.'
- Move Preloader tagline into settings.preloader_tagline with fallback that preserves current Preloader timing. Default: 'Websites. Platforms. The *panel* your team opens every morning.'
- Confirm Motion rotator handles variable-width words without jitter at current advance interval; if the 'SaaS platforms' string forces a line break, swap to a 3-noun rotator rather than reduce typography.

**Example copy:**

```
H1: 'We build the *software* that runs your *business.*' Sublede: 'An independent studio in Mumbai designing and engineering the websites, SaaS platforms and operations software that keep an eight-figure business running.' Rotator (4 items): SaaS platforms / Operations panels / CRMs / Websites.
```

**Success signal:** SERP excerpt for brand searches carries 'websites', 'SaaS', 'platforms', 'Mumbai'; above-the-fold HTML contains four Platforms nouns before any script executes; empty admin field renders fallback without reflowing Hero.

#### [P0] Hero eyebrow becomes a SINGLE line (not three chip-pills) + keep scroll circle solo  _(effort: S)_

**Where:** src/components/site/Hero.tsx lines 77-87 (eyebrow row) and 130-148 (bottom row)

**Why:** Three padded chip-pills in the Hero eyebrow compete with the H1 and read product-site. Theme contract says Hero eyebrow is one typographic line. The primary CTA already lives in the persistent Navbar pill above the fold — doubling it next to the scroll circle crowds a signature negative-space moment.

**Deliverables:**

- Left eyebrow: single ember-dot-separated line 'Mumbai, IST  ·  Replies within 24h'. Right side keeps 'Booking Q4 2026' (admin-editable; refresh copy when Q4 2026 is current to avoid stale freshness signal).
- Sectors ('SaaS · Real estate · Logistics · Maritime') move to (01) 'What we do for you' or Platforms where they have room — NOT into the Hero eyebrow.
- Rely on the persistent Navbar 'Start a project' pill for the primary CTA; do NOT add a Magnetic pill next to the Hero scroll circle.
- Add a secondary 'See the work' eyebrow-led link in the clientele strip immediately below Hero (not inside Hero chrome).
- All strings pulled from Settings so admin can rotate without a deploy; every field ships with a component fallback.

**Example copy:**

```
Eyebrow (one line, left): 'Mumbai, IST  ·  Replies within 24h' | Right pill: 'Booking Q4 2026' | Secondary (in clientele strip below): 'See the work ↓'
```

**Success signal:** Hero scroll circle remains the solo negative-space moment on the lower-right; Hero typography reads editorial, not product-site; Navbar pill click-through rises because it is the only above-the-fold primary CTA.

#### [P0] Reframe (01) to 'What we do for you' + fold proof numbers into Platforms aside (NO new (00))  _(effort: M)_

**Where:** src/app/(site)/page.tsx lines 41-69; src/components/site/Platforms.tsx aside slot

**Why:** The numbered-section ladder starts at (01) and is part of the editorial voice — a (00) breaks it. Also the first narrative beat after Hero is studio-about-itself, before visitors care. Platforms (which answers WHAT and FOR WHOM) is two scrolls later.

**Deliverables:**

- Rewrite the (01) eyebrow to '(01) What we do for you' and rewrite settings.home_intro so ScrollText names outcomes, surfaces and sectors (SaaS, real estate, logistics, maritime).
- Fold the four proof cells (Platforms shipped / Industries / Reply time / Senior lead) into the Platforms SectionHeading aside slot as a thin Counter row, OR a single-line eyebrow strip directly under Platforms heading — NOT a new (00) section with its own number. Reuse Counter in existing bone-on-night form with ember full-stop only on the number (no card borders, no shaded tiles).
- Move the current 'small, senior team' voice inline into a (04) About teaser so nothing is lost.
- Rewrite clients marquee eyebrow from generic 'Trusted by teams who care about craft' to a sector-range line; extend settings.clients[] to {name, slug, href?, logo_url?} so each name links to its case study with descriptive anchor (`${client}, ${industry}`). Hardcoded fallback so the row never disappears on fresh installs.

**Example copy:**

```
(01) eyebrow: '(01) What we do for you' / Body: 'You come to us with a business that runs on calls, spreadsheets or software built for someone else. We give you back a website that earns its traffic, a platform your team runs on, and a studio you can keep calling after launch.' Platforms aside Counter: 8 Platforms (2026) · 6 Industries · <24h Reply · 1 Senior lead. Clients marquee eyebrow: 'Four industries, four live systems — the businesses we build for.'
```

**Success signal:** Median scroll depth on home increases to 60%+; numbered ladder preserved; proof numbers live inside Platforms aside, not as a new section.

#### [P0] Outcome caption on every ProjectCard (muted eyebrow, NOT a bordered pill)  _(effort: M)_

**Where:** src/components/site/ProjectCard.tsx; data from Project.primary_outcome or project.metrics[0] fallback

**Why:** Visitors scanning the home grid can read what each project IS but not what it DID. BUT reusing the Platforms 'Built in' bordered chip style on 8+ ProjectCards turns ember into decoration and dilutes the Platforms chip's chip-semantics.

**Deliverables:**

- Add Project.primary_outcome (short, 2-6 words, numeric where possible) or compute from metrics[0].
- Render under the client-title line as a MUTED eyebrow caption with a hairline rule above and a single ember dot before the number — NO bordered pill.
- Hover: Counter animation on the number component.
- If both are empty, fall back to tags[0] silently so cards never look naked.
- Ember appearance audit after launch — count ember instances per page and keep accent sparing.

**Example copy:**

```
ArenaOS card eyebrow: '· 6 venues on one platform'. AARAN HOMES: '· 1-tap WhatsApp enquiries'. Cargo Operations: '· 4 teams, one system'. Mahalaxmi Art: '· Live in 6 weeks'.
```

**Success signal:** Case-study page CTR from the home grid rises; outcome captions show in server-rendered HTML of /work and /; ember stays scarce.

#### [P1] Add scroll anchors to home sections (ids only, NO visible dot-rail)  _(effort: S)_

**Where:** src/app/(site)/page.tsx (section wrappers)

**Why:** Eight distinct sections and only one carries an id. Sales reps cannot send techback.com/#platforms. BUT a persistent right-rail dot nav is a product-site convention and visually competes with the custom cursor + Lenis feel.

**Deliverables:**

- Add id attributes to every home section wrapper with scroll-mt-20: #studio, #work, #platforms, #capabilities, #process, #reviews. Confirm each respects the existing Lenis anchor offset contract.
- Do NOT add a visible dot-rail. Do NOT add IntersectionObserver labels.
- Mobile overlay grows a 'Jump to' sub-list from the same anchor set (menu-only, not a floating rail).

**Example copy:**

```
Mobile overlay sub-list: STUDIO · WORK · PLATFORMS · CAPABILITIES · PROCESS · REVIEWS
```

**Success signal:** Deep-shared #platforms and #process links appear in Search Console; session depth rises; no persistent floating UI competes with the custom cursor.

---

### Services

**Goal:** Six capabilities each earn their own URL, their own metadata, their own structured data and their own 'from Rs X (approx. USD/GBP) · N weeks' answer with a unique FAQ — so every service query has a dedicated landing page with linked proof and no cannibalisation with the /faq hub.

#### [P0] Extend Service model with buyer-decision fields including compliance signals  _(effort: M)_

**Where:** src/lib/types.ts (Service), src/lib/seed.ts (seedServices), admin forms

**Why:** Service today carries slug/title/summary/description/deliverables and nothing a serious buyer uses to decide: no outcome, timeline, engagement types, starting-from, in/out scope, sample-project link, or compliance signalling.

**Deliverables:**

- Add Service.outcome (1-sentence promise), timeline_weeks:{min,max}, engagement_types:('project'|'partnership'|'saas'|'consultancy')[], starting_from:{inr,usd,gbp}|null (with scheduled rate refresh or admin override), in_scope:string[], out_of_scope:string[], sample_project_slugs:string[], faqs:{q,a}[] (UNIQUE to this service, no overlap with /faq hub Qs), knowsAbout:string[] (feeds Service JSON-LD).
- Seed every row with real values; include Shopify Headless + Hydrogen + Oxygen in /services/ecommerce knowsAbout so 'shopify headless agency india' intent lands here.
- Mirror in admin edit form (chip/list editors, draft/preview/publish state).

**Example copy:**

```
operations-panels-crm: outcome: 'One system your sales, operations and accounts teams all open in the morning.' timeline_weeks:{min:10,max:16} engagement_types:['project','partnership','saas'] starting_from:{inr:'from Rs 8L', usd:'approx. US$9.5k', gbp:'approx. £7.5k'} sample_project_slugs:['arenaos','cargo-operations','hr-platform']
```

**Success signal:** Every Service row renders a complete detail page without any admin follow-up; Service + Offer JSON-LD passes Google Rich Results test; FAQ Qs are unique across the site.

#### [P0] Build /services/[slug] detail route from existing components (theme-pinned)  _(effort: L)_

**Where:** src/app/(site)/services/[slug]/page.tsx (new); mirror /work/[slug]

**Why:** All six commercial head terms share one URL today. Each capability needs its own 500-800 word landing page with linked proof, timeline, pricing shape and a UNIQUE service-specific FAQ.

**Deliverables:**

- Template: Breadcrumbs (eyebrow + ember separator, NO border) + PageHeader + ScrollText lede + 3-up Counter row (timeline / team / engagement models) in existing bone-on-night form + 'What's included' deliverables chip grid + In-scope / Out-of-scope two-column list + 2-4 ProjectCard rail of sample_project_slugs + engagement cards filtered to this service + Process (service-specific steps via steps prop) + ServiceAccordion-styled UNIQUE FAQ (component only, NO JSON-LD emit) + CTA with ?service=<slug> prefill.
- Reveal use capped at one per block (not per tile) to stay inside motion budget.
- generateStaticParams from getServices(); generateMetadata emits per-service title + description (140-160 chars with Mumbai + commercial keyword) + canonical + hreflang alternates + openGraph.images from per-service opengraph-image.tsx.
- Emit Service + Offer + BreadcrumbList JSON-LD. Do NOT emit FAQPage schema (that lives on /faq hub only).
- Register all six slugs in src/app/sitemap.ts.
- On /services, ServiceAccordion row links to the detail page (keep + expand for in-place reading).

**Example copy:**

```
/services/websites — H1: 'Fast, editorial *Next.js* websites.' Lede: 'We design in the browser language and ship with Next.js, TypeScript and Vercel. Core Web Vitals green at launch, CMS your team can edit, SEO baked in from the first wireframe.' From: 'From Rs 3L for a marketing site (approx. US$3.5k), Rs 8L for a product site (approx. US$9.5k). 6-10 weeks to launch.' Proof: 'Mahalaxmi Art · AARAN HOMES · Vertitide.'
```

**Success signal:** Six new indexable URLs each ranking for its own cluster; FAQ rich snippets fire from /faq hub only; organic clicks on /services/[slug] replace diluted /services traffic within 60 days.

#### [P0] Rewrite engagement cards + move to /engagements with payment/retainer specifics  _(effort: M)_

**Where:** src/app/(site)/services/page.tsx ENGAGEMENTS array (lines 17-39); new src/lib/engagements.ts; new /engagements route

**Why:** The four cards describe shape generically and never answer how we charge, invoice rhythm, change-order process, retainer deliverables, or exit terms. 'Most chosen' sits on Partnership with no evidence.

**Deliverables:**

- Move ENGAGEMENTS into src/lib/engagements.ts with id/name/shape/window/from/payment_schedule/change_order_rules/retainer_terms (hours_per_month, cadence, rollover, pause_clauses, exit_terms)/fits/example_clients[]/points.
- Add a 3-col <dl> above each card's bullet list: Shape · Window · From (INR + approx USD/GBP). Add 'Fits:' italic one-liner below bullets.
- Replace generic 'Most chosen' badge with concrete signal ('Chosen by 3 of our 2026 projects') or omit until backed.
- Add /engagements route as the hero of these cards: Breadcrumbs + PageHeader + ScrollText + four engagement cards + 'How we invoice' block (milestone split 30/40/30 default, NET-30, advance 20%, change-order process) + CTA.
- Keep a condensed version on /services linked to /engagements for depth.

**Example copy:**

```
Partnership · Shape: Monthly retainer · Window: 3-month minimum · From: Rs 6-12L/month (approx. US$7-14k) · Includes: 120 engineering + 20 design hours/month, weekly ship cadence, 20% unused hours roll over 1 month, pause with 2 weeks' notice, exit with 30 days' notice and source handover. Fits: 'A product you ship continuously, with a roadmap that keeps moving.'
```

**Success signal:** Form inquiries arrive with engagement selected 80%+ of the time; CFO can approve vendor without a call; pricing-related long-tail queries index on /engagements.

#### [P1] Visible deliverables chips on closed accordion rows + mobile-visible summaries  _(effort: S)_

**Where:** src/app/(site)/services/page.tsx line 53 + src/components/site/ServiceAccordion.tsx lines 49-51

**Why:** On /services every row is collapsed by default and on mobile even the summary is hidden. Visitors see six category names and nothing else before the first click.

**Deliverables:**

- Render first 3 deliverables as hairline chips in the closed-row right-hand aside slot (existing chip style, no new treatment).
- Replace sm:block gate on the summary with always-visible summary wrapped under the title on mobile.
- On open state keep all deliverables (do not truncate).

**Example copy:**

```
Operations Panels & CRM row chips (closed state): 'Operations panels' · 'Custom CRM' · 'Roles & permissions'
```

**Success signal:** Scroll-to-expand ratio on /services rises; visitors see concrete chips they want to tap into.

#### [P1] Dynamic count in Services PageHeader eyebrow + H1 rewrite  _(effort: S)_

**Where:** src/app/(site)/services/page.tsx lines 45-49

**Why:** 'Six disciplines, one team' hardcodes a number that goes stale. 'Capabilities' is a word nobody searches for.

**Deliverables:**

- Compute the count: eyebrow = `${pad(services.length)} — what we do`.
- Rewrite H1 and intro to lead with outcome and real proof count.

**Example copy:**

```
Eyebrow: '06 — what we do'. Title: 'Design, engineering and the *system* that ships them.' Intro: 'We design brands and websites, build SaaS and operations platforms, and run the launch after. Eight live cases below.'
```

**Success signal:** H1 stays accurate across admin edits; SERP excerpt improves.

---

### Work (case studies)

**Goal:** Every case study answers Challenge / Approach / Result with real metrics (with methodology captions), an embedded verified client quote, a static stack chip row, a 'What you keep' + 'After launch' prose handover, and a 'More like this' row with descriptive anchor text — no boxed cards, no second Marquee, no bordered chips.

#### [P0] Extend Project model with narrative, outcome, method and credit fields  _(effort: M)_

**Where:** src/lib/types.ts (Project), src/lib/seed.ts (seedProjects), admin forms

**Why:** Project has 17 fields but none a decision-maker scans for. 'Scope' is literally tags.join(', '). Metrics have no methodology.

**Deliverables:**

- Add: industry, duration_weeks, team_size, role, brief, outcome_bullets[], services_used[] (Service.slug values), tech_stack[], role_breakdown:{discipline,people}[], credits:{role, name, person_id}[] (person_id for Person @id continuity), pdf_url?, video_url?, review_id?, client_logo_url?, pull_quote?:{content,author,role}, primary_outcome, status, last_shipped_at (powers 'currently building' / 'last shipped' freshness line).
- Promote gallery to {url, alt, caption?}[] so alt text is per-image (Image Pack SEO).
- Split Metric: metrics becomes {value:number, unit:string, label:string, baseline:string, timeframe:string, method:string}. Render method as a muted sub-caption. Narrative wins move to outcome_bullets[].
- Admin updated_at auto-bumps on save (keeps schema + sitemap freshness aligned).

**Example copy:**

```
ArenaOS filled: industry:'Gaming & entertainment' duration_weeks:14 team_size:4 role:'Platform strategy, product design and full-stack engineering, from first workshop to live.' services_used:['product-design','operations-panels-crm','web-design-development'] tech_stack:['Next.js','NestJS','PostgreSQL','Prisma','Vercel','Razorpay'] metric: {value:60, unit:'%', label:'faster seat-to-session', baseline:'paper check-in', timeframe:'first quarter live', method:'measured owner-reported in weekly ops review, Q1 2026 vs the quarter before launch'}
```

**Success signal:** CreativeWork + VideoObject JSON-LD emits with image, author Person @id, keywords, about (industry), datePublished, dateModified — passes Rich Results test; metrics show method captions.

#### [P0] Rewrite /work/[slug] with Challenge / Approach / Result + 'What you keep' + 'After launch' (no boxed cards)  _(effort: L)_

**Where:** src/app/(site)/work/[slug]/page.tsx lines 55-160

**Why:** One freeform prose column means outcomes depend on how admins write. There is no formal rhythm, no embedded client quote, no stack list, no related-work row with descriptive anchor, and 'Next project' rotates linearly by sort_order.

**Deliverables:**

- Add Breadcrumbs (eyebrow + ember separator, NO border/box/background) above PageHeader.
- Replace the single '(01) The story' with three SectionHeading-anchored blocks: (01) The brief (project.brief, 1 paragraph) · (02) What we did (project.description inside ScrollText) · (03) What changed (metrics strip with method captions + outcome_bullets as ember-tick list, ember scarce).
- Rebuild meta <dl>: Client · Industry · Services (chips linking to /services/[slug]) · Timeline (duration_weeks + year) · Team (team_size + role_breakdown summary) · Role.
- Insert bone-background pull-quote block between (02) and (03): large ember open-quote glyph, quote_short in display type, author line in eyebrow + Stars underneath, 'All reviews ->' link on the right. Auto-populate from Review.project_slug.
- Add 'Built with' row as a STATIC eyebrow strip of chips under (02) — NOT a second Marquee.
- Add 'What you keep' as three eyebrow-led prose lines inside the existing meta column rhythm (NOT a boxed card next to the Visit-live button). Covers source + Figma + README + account-ownership (Vercel/Supabase/Resend accounts transferred to client on day one) + DNS transfer + no stored credentials.
- Add 'After launch' subsection: hosting cost estimate, hypercare window (first 30 days), bug SLA (critical <24h, non-critical <5 working days, first 90 days free), feature-request process, offboarding runbook.
- Replace single Next project with 'More like this' row of 2-3 ProjectCards. Pick by (a) same industry, else (b) same category, else (c) services_used overlap. Anchor text: `${project.industry} ${primary service}` not 'Read more'. Keep smaller Next-project rotation beneath.
- Add 'Download the case study (PDF, 2.4MB) ↓' Magnetic button when project.pdf_url exists (Puppeteer-exported with x-robots-tag:noindex,noimageindex). NDA variant: 'Request a walk-through ->' linking to /contact?project=<slug>. If Puppeteer scope slips, drop the PDF button; do NOT link to a Google Doc.
- 'Start a project like *{project.client}* ->' primary CTA on every case study with ?ref=<project.slug>&service=<primary service_used>.

**Example copy:**

```
(01) The brief: 'Six parlours were booking seats on paper, running sessions on timers nobody checked, and reconciling UPI payments against the ledger by hand. The owner wanted one platform for every venue — without six logins or a rewrite per site.' Pull-quote: 'We stopped sending WhatsApp forwards the week ArenaOS went live. Six venues on one screen — that was the whole pitch, and it works.' — Rohan K., Operations Lead. (ONLY ship this quote after permission_granted:true in the Review table.) Metric: '60% faster seat-to-session' / method sub-caption: 'owner-reported, Q1 2026 vs quarter before launch'. Built with (static eyebrow strip): Next.js · NestJS · PostgreSQL · Prisma · Vercel · Razorpay. What you keep (three prose lines): 'Source on your GitHub from day one. Figma file with every component named. Vercel, Supabase and Resend accounts in your name; one-page README; admin password reset we never store a copy of; DNS transfer runbook; 30-day hypercare and 90-day bug SLA included.'
```

**Success signal:** Median case-study scroll depth >75%; avg time >90s; outbound clicks from case studies to /services/[slug] and /contact rise; no boxed cards drift into the editorial frame.

#### [P1] Review ↔ Project join with third-party-verified policy + callable references  _(effort: M)_

**Where:** src/lib/types.ts (Review), src/app/(site)/work/[slug]/page.tsx, src/app/(site)/reviews/page.tsx

**Why:** Reviews cannot show on the case studies they refer to today. Also, Google increasingly ignores self-serving Review schema — must constrain emission to third-party-verified sources.

**Deliverables:**

- Add Review.project_slug, Review.quote_short, Review.verification_source ('email'|'linkedin'|'clutch'|'gbp'|null), Review.source_url?, Review.company_logo_url?, Review.permission_granted:boolean, Review.moderation_status ('pending'|'approved'|'flagged'|'rejected').
- /admin review moderation queue — ReviewForm submissions enter pending; publish only after approve.
- On /work/[slug], render matching review inside Testimonials pattern as a single-item block under the metrics strip, only when permission_granted and moderation_status='approved'.
- Use quote_short on the home Testimonials carousel.
- JSON-LD Review + AggregateRating emits ONLY when verification_source + source_url set (third-party-verified). Self-serving-only aggregated stars suppressed.
- Add settings.referenceable_clients[] (2-3 past clients who agreed to a 15-minute reference call). Render on /reviews as a 'Talk to a past client' row with eyebrow prompt + request-intro link.

**Example copy:**

```
Collect in writing with permission_granted:true before launch, one per shipped project: Mahalaxmi, AARAN HOMES, ArenaOS, Vertitide + 1 anonymised NDA client. Callable references eyebrow: 'Talk to a past client — we will introduce you to Priya (Mahalaxmi), Rohan (ArenaOS) or an NDA client whose brief matched yours.'
```

**Success signal:** Non-empty /reviews page on launch with only verified reviews visible; AggregateRating JSON-LD emits valid and survives Google review-policy sweep; buyers can request a callable reference without a sales conversation.

---

### About / Studio

**Goal:** Visitors answer WHO we are, WHERE we are, and WHY they should trust us before they scroll to the team grid — through a signed founder letter with a continuity statement, real locations, specialty-captioned team members, and no live-clock chrome.

#### [P0] Retire fabricated stats + rewrite settings.about_story  _(effort: S)_

**Where:** src/lib/seed.ts settings.stats + settings.about_story

**Why:** Current stats (120+/9yr/14/98%) contradict the 8 seeded projects, the 'Booking Q4 2026' pill and the founder-led team page.

**Deliverables:**

- Replace stats with provable, settings-driven numbers. Suggested seed: 8 Platforms shipped in 2026 · 6 Industries · <24h Average reply time · 1 Senior lead on every build.
- Rewrite about_story in honest first-person (match founder-led reality).
- Add Stat.context micro-caption slot so numbers carry baseline/timeframe.

**Example copy:**

```
about_story: 'I started TechBack to build one thing: software a business can actually run on. Eight platforms later — in cargo, real estate, gaming venues, ed-tech, maritime and HR — the pitch has not moved. One senior engineer leads every build. One codebase scales from the first customer to the thousandth.'
```

**Success signal:** /about and home stats match portfolio and Hero pill; no visitor can disprove a number in 90 seconds.

#### [P0] Founder letter block with continuity statement (bus-factor)  _(effort: S)_

**Where:** src/app/(site)/about/page.tsx (between Studio story and Principles)

**Why:** For a founder-led studio the single highest-leverage trust element is a signed letter. BUT 'one senior lead on every build' is a strength on first read and a red flag on second read — procurement asks 'what if Arman is sick?'

**Deliverables:**

- Two-column Reveal section (one Reveal, not per child): left is TeamPortrait of founder (requires real photo), right is 6-8 sentence first-person letter.
- New settings fields: founder_letter, founder_signature, continuity_statement (bus-factor), backup_contact_email. Admin-editable with draft/preview/publish state.
- Continuity statement renders as a short italic paragraph below the signature.
- No new component.

**Example copy:**

```
Letter: 'I started TechBack in 2021 because I was tired of two things: beautiful websites that did not ship, and shipped software nobody loved. Twelve years of production code and six years of client work later, I am still the person reading your brief, writing your contract, reviewing every deploy and replying on Monday morning. Two things in writing: your source and your IP on day one, and a Monday reply even when I am travelling.' — Arman Noyada, Founder · Mumbai · Available IST + 4h · Reply within 24h. Continuity: 'If I am unreachable: Priyanka (lead engineer, 7y with the studio) is the backup contact at [backup email] with full source and account access. Handover SLA on any ongoing build is 48 hours from first missed response.'
```

**Success signal:** /about median time-on-page rises; founder-named inquiries appear; procurement officers reading the letter find the bus-factor answer in the same block.

#### [P1] Specialty + location captions under each TeamPortrait + Person @id continuity  _(effort: M)_

**Where:** src/app/(site)/about/page.tsx team grid; src/lib/types.ts TeamMember

**Why:** Team grid shows name + role only, every photo is null, 3 of 4 names read as placeholder. Also, Person @id continuity across Organization team <-> Article.author <-> Project credits lifts E-E-A-T.

**Deliverables:**

- Add TeamMember.bio (2 sentences), linkedin_url?, github_url?, specialty, location, years_experience?, person_id (stable @id), knowsAbout[].
- Render 2-line bio + specialty chip + 'LinkedIn ↗' micro-link under existing name/role.
- Launch with Arman fully written up + photo; park 3 placeholder names at published:false until replaced.
- Person JSON-LD on /about team cards uses person_id; same @id referenced by Article.author on /journal/[slug] and Project.credits on /work/[slug].

**Example copy:**

```
Arman Noyada — Founder, Engineering — TypeScript · Postgres · systems from zero — Mumbai, IST · 12y experience — 'Twelve years shipping production software; the last six running TechBack. I write the code reviews, I run the deploys, I reply on Monday.' LinkedIn ↗ · GitHub ↗
```

**Success signal:** /about resolves 'who am I actually hiring?' in two scrolls; knowledge-graph association between Organization and founder Person solidifies.

#### [P1] Rewrite About PageHeader + add 'Where we are' Counter (NO live-clock chip)  _(effort: S)_

**Where:** src/app/(site)/about/page.tsx + src/components/site/Footer.tsx

**Why:** 'Small team. Serious craft.' could sit on a hundred studio sites. Mumbai + India appear nowhere in Hero/(01)/About/Footer. BUT a live-clock widget above Footer is a dashboard device and reads off-theme.

**Deliverables:**

- Rewrite About H1: 'Senior hands. *Shipped* platforms.'
- Add 'Where we are' SectionHeading on /about with existing Counter row (bone-on-night, ember accent on number full-stop only, no card borders): Mumbai HQ · N client regions · IST + 2 overlap hours with GMT · IST + 10.5 overlap with PT.
- Add a thin credit strip above Footer: eyebrow 'The studio' + static STRING 'Shipped from Mumbai. Served to teams in 11 countries. IST, GMT +5:30.' — NO live ticking clock.
- Update Footer studio column: 'Mumbai, India. Serving clients across India, the GCC, the UK and the US.'

**Example copy:**

```
About H1: 'Senior hands. *Shipped* platforms.' Where-we-are: 'Mumbai *HQ,* clients everywhere. 2 overlap hours with GMT · 10.5 overlap with PT · 0 time-zone excuses.'
```

**Success signal:** Mumbai + India appear in server-rendered body copy on every page; LocalBusiness JSON-LD can emit truthfully; Footer stays editorial, not dashboard-y.

#### [P2] 'Not for us' negative-space block (same Principles typography)  _(effort: S)_

**Where:** src/app/(site)/about/page.tsx between Principles and Team

**Why:** Every section tells visitors what we do. Nothing narrows. For a studio pitching 'brands with a point of view', lack of a point of view in positioning itself is a trust gap.

**Deliverables:**

- Reuse the Principles cell layout VERBATIM (ember 01/02/03 eyebrow, display headline, body) with a negated voice. NO strike-through, NO new eyebrow colour, NO 'crossed-out' treatment.
- 3-4 cells: no slideware, no ghosts after launch, no lock-in by design, no dark patterns.

**Example copy:**

```
Eyebrow: 'Not for us'. Title: 'What we *don\'t* do.' 01 — No decks that don\'t ship. 02 — No ghosts after launch. 03 — No lock-in by design. 04 — No crypto grifts, no dark patterns. We turn down the brief, not the client.
```

**Success signal:** Unique editorial copy distinguishes TechBack in SERPs; mis-fit leads self-select out.

---

### Reviews

**Goal:** /reviews is the page a buyer visits last before deciding — a conversion surface with third-party-verified testimonials pinned to projects, a callable-references row, a final CTA, and an admin moderation queue that catches hostile submissions.

#### [P0] Seed 3-5 real, written-permission reviews before launch (NO fabricated quotes)  _(effort: M)_

**Where:** src/lib/seed.ts seedReviews; /reviews page; /work/[slug]

**Why:** seedReviews = [] today. Shipping Claude-authored quotes as if real is the single fastest way to lose a sophisticated buyer. Collect real quotes in writing with permission_granted:true before launch.

**Deliverables:**

- Pre-launch: collect written-permission quotes from Mahalaxmi Art, AARAN HOMES, ArenaOS, Vertitide + 1 anonymised NDA client.
- Seed each with rating, content, quote_short, project_slug, verification_source, source_url, permission_granted:true, moderation_status:'approved'.
- Verify Testimonials auto-populates on home from featured reviews.
- Verify each /work/[slug] renders its matching pull-quote block only when permission_granted + approved.

**Success signal:** No page shows empty-state card on launch; AggregateRating emits valid from third-party-verified reviews only; no fabricated quote reaches production.

#### [P0] Add CTA band + callable references row to /reviews  _(effort: S)_

**Where:** src/app/(site)/reviews/page.tsx

**Why:** Every other public page ends with the CTA band. /reviews ends with the ReviewForm (for past clients). Buyers doing final due-diligence have no inquiry prompt. Callable references close 20L+ deals that written quotes don't.

**Deliverables:**

- Import { CTA } and render <CTA /> after the write-a-review section with eyebrow 'Ready when you are.'
- Add 'Talk to a past client' row above the CTA: SectionHeading eyebrow + 2-3 reference cards reading from settings.referenceable_clients[] + 'Request an introduction ->' link to /contact?intent=reference.
- No new component — reuse ProjectCard pattern.

**Example copy:**

```
Eyebrow: 'Talk to a past client.' Prompt: 'We will introduce you to two or three clients whose brief looked like yours. 15-minute call, your questions, no studio on the line.'
```

**Success signal:** /reviews stops being a conversion dead end; reference-call requests appear in Inquiry table.

#### [P1] Replace empty-state banner + add moderation queue  _(effort: S)_

**Where:** src/app/(site)/reviews/page.tsx; /admin reviews queue

**Why:** Even with seeded reviews, demo installs will go through moments of zero visible reviews. Current empty-state hints the site is fresh. Also ReviewForm is public — hostile/fake submissions need catching before AggregateRating emits.

**Deliverables:**

- When approved reviews.length === 0, render clients marquee + 'See the work' CTA + inline link to /work/[slug] cases.
- Remove 'yours could be the first one here' phrasing.
- /admin/reviews queue: pending reviews with approve/flag/reject actions; email notification to settings.email on new submission; rate-limit on ReviewForm to prevent spam.

**Example copy:**

```
Empty state: 'Reviews are in moderation. In the meantime, see the eight platforms we shipped in 2026 ->'
```

**Success signal:** Fresh installs never look empty; no hostile review reaches AggregateRating.

---

### Contact & Inquiry Form

**Goal:** The form collects triage data (budget, timeline, service, NDA, link, ref, utm_*), sends auto-confirmation + studio notification, resists spam, and no visitor hits a conversion dead end anywhere on the site.

#### [P0] Rebuild inquiry form with real fields + spam hardening  _(effort: M)_

**Where:** src/components/site/forms.tsx ContactForm; src/app/actions.ts inquirySchema; src/lib/types.ts Inquiry

**Why:** Field named 'budget' actually submits engagement chip. No real budget bands, no timeline, no NDA checkbox, no attachment URL. Form surface tripling without hardening = spam vector.

**Deliverables:**

- Rename engagement chip name to 'engagement'; update Zod in actions.ts.
- Add Budget chip picker with real INR bands + USD/GBP footnote hints: 'Under Rs 2L (approx. US$2.5k)' / 'Rs 2-8L (approx. US$2.5-9.5k)' / 'Rs 8-20L (approx. US$9.5-24k)' / 'Rs 20L+ (approx. US$24k+)' / 'Not sure yet'.
- Add Timeline chip picker: ASAP / 1-2 months / 2-4 months / Flexible.
- Add NDA checkbox: 'Keep this inquiry confidential — we sign on request.'
- Add optional link field for Figma / Loom / brief URL.
- Add hidden ref field prefilled from case-study CTA with project.slug.
- Prefill service chip from useSearchParams().get('service'); prefill engagement from ?engagement=; prefill ref from ?ref=.
- Extend Inquiry schema: budget, timeline, nda, link, ref, source, utm_source/medium/campaign/term/content, discovery_call_booked, replied_at.
- Spam hardening: Cloudflare Turnstile widget, honeypot field (hidden input), per-IP server-side rate limit (5 submissions / hour), Resend bounce handler, Zod + server action rate-limit.
- GA4 event instrumentation: form_view, form_start, chip_select (budget/timeline/service), inquiry_submit with all dimensions.

**Example copy:**

```
Legends: 'Rough budget (approx. USD shown next to INR for international teams)' / 'When would you like to launch?' / 'Keep this inquiry confidential — we sign on request.' / 'Brief, Figma or Loom link (optional)'
```

**Success signal:** 80%+ of inquiries arrive with budget + timeline + service; reply SLA shortens; spam submissions < 2/week; GA4 funnel reports populate.

#### [P0] Wire two emails + redesign Success panel with 'What happens next' + miss-policy  _(effort: M)_

**Where:** src/app/actions.ts submitInquiry; src/components/site/forms.tsx Success component

**Why:** After submit, server writes to Postgres and visitor sees 'Thank you.' No email leaves the server. Studio only sees inquiries in /admin. Visitor is parked. Also no stated discovery process means buyers can't tell what reciprocity they'll get.

**Deliverables:**

- Integrate Resend (or Postmark). Set FROM to a studio-domain inbox with DMARC/SPF/DKIM aligned.
- Send confirmation email: restates reply SLA, names Arman (or backup_contact if founder OOO), mentions NDA option, lists what to send in a reply thread.
- Send notification email to settings.email with inquiry body + direct link to /admin/inquiries/<id>.
- Reply-SLA miss policy: cron job checks for inquiries without replied_at > 24 working hours; auto-sends 'reason within 48h' message from backup_contact_email.
- Rebuild Success panel: eyebrow 'Message received' / display 'We will be in *touch.*' / body 'Reply lands in your inbox within one working day. In the meantime —' / 3-step 'What happens next' timeline: Reply (24h) -> Discovery call (30 min, free, we send a 1-page brief back) -> Proposal (within 5 working days) / primary 'Explore the work ->' / secondary 'Book a 15-minute intro call ↗' (settings.booking_url).

**Example copy:**

```
Confirmation subject: 'Got it — we will reply within one working day.' Miss-policy subject: 'Running late on your TechBack reply — here is why.' Success panel 3-step: 'Reply within 24h / Free 30-min discovery call + 1-page written summary back / Proposal within 5 working days.'
```

**Success signal:** Zero 'did it submit?' follow-ups; inbox placement verified pre-launch; miss-policy fires correctly in staging test; discovery-call conversion measurable.

#### [P1] Trust-chip row + WhatsApp + Book-a-call on Contact and CTA  _(effort: S)_

**Where:** src/app/(site)/contact/page.tsx left column; src/components/site/CTA.tsx second row

**Why:** Reply-time promise is buried. NDA promise invisible. No WhatsApp despite Indian client base. No calendar fallback.

**Deliverables:**

- Three-chip trust row above the form (and in CTA second row), single hairline rule separators (not padded pills): '· NDA on request' · '· Reply within 1 working day · we miss, we tell you why in 48h' · '· Direct access to founders — no sales reps'.
- Add settings.whatsapp (number) and settings.booking_url. On /contact render both under Email: eyebrow 'WhatsApp' + number as wa.me link; eyebrow 'Book a call' + 'Grab a 15-minute slot ↗'.
- Micro-promise under form submit: 'We read every message ourselves. Yours lands with Arman first.'

**Example copy:**

```
Trust row: '· NDA on request' · '· Reply within 1 working day (miss policy: reason within 48h)' · '· Direct access to founders — no sales reps'
```

**Success signal:** Diversified lead channels; WhatsApp inquiries from India/GCC increase; calendar bookings rise.

#### [P1] Inline inquiry CTAs on case studies and services with descriptive anchor text  _(effort: S)_

**Where:** src/app/(site)/work/[slug]/page.tsx; src/app/(site)/services/page.tsx + /services/[slug]

**Why:** Non-NDA case studies hand visitors to the live site in a new tab (where our tab usually closes). Services accordion has no inline inquiry CTA. Also anchor text should carry industry+service for internal link SEO.

**Deliverables:**

- Render 'Start a project like *{project.client}* ->' on EVERY case study (not only NDA) next to 'Visit live site ↗'. Deep-link to /contact?ref=<project.slug>&service=<primary service_used>.
- In ServiceAccordion open-state, add 'Start a {service.title.toLowerCase()} project ->' inline link below deliverables chips, deep-linked to /contact?service=<service.slug>.

**Success signal:** Inquiry.ref populated on 40%+ of submissions within 30 days; internal link graph carries descriptive anchors for SEO.

#### [P2] Rescue strip to 404 + surface Contact in Navbar  _(effort: S)_

**Where:** src/app/not-found.tsx; src/lib/site.ts (site.nav)

**Why:** 404 funnels every lost visitor to Home only. Contact missing from desktop top bar.

**Deliverables:**

- Add Contact to site.nav after Studio.
- Keep ember 'Start a project' pill on the right.
- On /not-found: `export const metadata = { title: 'Not found', robots: { index: false, follow: false } }`.
- Add three-pill rescue strip: Work · Services · Contact (ghost border style, existing).

**Success signal:** /contact appears in top nav on every page; 404 traffic enters the funnel.

---

### Global SEO

**Goal:** Every indexable page carries page-level metadata, canonical, hreflang, OG image, Twitter card, right JSON-LD (with author Person @id continuity + VideoObject + Offer where applicable, FAQPage only from /faq hub, Review only when third-party-verified). Favicon, apple-touch and manifest are branded. Sitemap sends real lastModified + image entries. Core Web Vitals under budget on 4G mobile. Google Business Profile + NAP citations live.

#### [P0] OG image + Twitter card system (per dynamic segment)  _(effort: M)_

**Where:** src/app/opengraph-image.tsx + src/app/(site)/work/[slug]/opengraph-image.tsx + per-dynamic-segment OG for /services/[slug], /industries/[slug], /journal/[slug], /approach, /faq, /engagements; src/app/layout.tsx openGraph/twitter

**Why:** Zero OG image = text-only shares. New indexable surfaces are precisely where LinkedIn B2B buyers vet agencies — fallback global card wastes acquisition.

**Deliverables:**

- Global opengraph-image.tsx: 1200x630 night-background card with Instrument Serif wordmark + tagline in italic ember. No drop shadow, no saturated preset, grain treatment consistent with site photography.
- Per-case opengraph-image.tsx: project.accent + client + title in signature italic-serif ember.
- Per-service, per-industry, per-journal opengraph-image.tsx using slug + accent + title + pictogram in the same style.
- Extend root generateMetadata: openGraph.siteName, locale='en_IN', url=siteUrl(), images=['/opengraph-image']; twitter:{card:'summary_large_image', images, title, description}.
- On /work/[slug], extend generateMetadata to return openGraph.images = project.cover_image ? [cover_image] : [per-case opengraph-image URL], type='article', publishedTime, modifiedTime.

**Success signal:** LinkedIn Post Inspector / Twitter Card Validator show rich cards on all shared URLs; image-pack eligibility unlocked; per-route cards win social CTR.

#### [P0] Page-level metadata on home + hreflang + rewrite all meta descriptions  _(effort: S)_

**Where:** src/app/(site)/page.tsx (add generateMetadata); services/about/reviews/contact/work metadata exports; seed.ts settings.description

**Why:** Home has no metadata export. Placeholder 4-20 word descriptions elsewhere. settings.description (fallback) has none of the words the studio sells on. No hreflang despite explicit international positioning.

**Deliverables:**

- Add generateMetadata to src/app/(site)/page.tsx: title (explicit), 140-158 char description with Mumbai + 2-3 commercial keywords, alternates.canonical=siteUrl()+'/', alternates.languages={'en-IN':canonical,'en-US':canonical,'en-GB':canonical,'x-default':canonical}, openGraph override.
- Rewrite /work, /services, /about, /reviews, /contact meta descriptions to 140-160 chars each; include Shopify Headless + Hydrogen on /services and /services/ecommerce.
- Rewrite settings.description to be keyword-rich (Mumbai, Next.js, SaaS, CRM, operations panels, booking portals, Shopify Headless).
- Apply canonical + hreflang alternates to every static route; do NOT build separate /en-us trees.

**Example copy:**

```
/ description: 'Independent design and engineering studio in Mumbai. We build brands, Next.js websites and multi-tenant SaaS — operations panels, CRMs, booking portals, Shopify Headless — for teams across India, the GCC and Europe.'
```

**Success signal:** SERP CTR on brand and commercial queries rises +25% within 60 days; GSC Coverage shows canonicals consolidated.

#### [P0] JSON-LD helpers + per-route emission (Person @id continuity, third-party-only Reviews, FAQ from hub only)  _(effort: M)_

**Where:** src/lib/jsonLd.ts (new); injected per route via <JsonLd data={...}/> server component

**Why:** Zero JSON-LD across whole site. Review self-serving stars get stripped by Google. FAQPage schema on 10 pages risks rich-snippet cannibalisation.

**Deliverables:**

- Create src/lib/jsonLd.ts with: organizationLd, websiteLd (SearchAction only if /search ships; otherwise omit), localBusinessLd (@type:['ProfessionalService','LocalBusiness'] + knowsAbout:['Next.js','React','Node.js','PostgreSQL','Shopify Headless','SaaS Development','CRM Development'] + additionalType), serviceLd (with Offer:{priceCurrency:'INR',price,availability}), serviceItemListLd, creativeWorkLd (with dateModified), videoObjectLd, articleLd / blogPostingLd (author Person @id + publisher + mainEntityOfPage + dateModified), reviewLd, aggregateRatingLd (verification_source + source_url gate), faqPageLd, breadcrumbLd, personLd (sameAs chain: linkedin_url, github_url, Clutch profile, GBP; Wikidata when available).
- Inject Organization + WebSite in root layout.tsx.
- Inject LocalBusiness on /contact.
- Inject ItemList(Service) on /services; Service + Offer on each /services/[slug].
- Inject CreativeWork + BreadcrumbList on each /work/[slug]; add VideoObject when project.video_url is set.
- Inject Article/BlogPosting on each /journal/[slug] with same Person @id as /about team card and Project.credits.
- Inject Review[] + AggregateRating on /reviews — ONLY from reviews with verification_source + source_url (self-serving suppressed).
- Inject FAQPage on /faq hub ONLY. Inline FAQ components on other pages render the UI but DO NOT emit schema.
- Guard every emit against empty inputs.

**Success signal:** Google Rich Results Test passes for all types; stars appear in SERPs; breadcrumb trail appears under case-study URLs; FAQ snippets fire from /faq only; knowledge-graph association between Organization + founder Person strengthens.

#### [P0] Favicon + apple-icon + PWA manifest + delete starter SVGs  _(effort: S)_

**Where:** src/app/icon.tsx, src/app/apple-icon.tsx, src/app/manifest.ts; public/ cleanup

**Why:** No branded favicon anywhere. Browser tab and SERP favicon are the generic Next.js globe.

**Deliverables:**

- app/icon.tsx: 32x32 ImageResponse rendering ember-on-night italic serif 'T'.
- app/apple-icon.tsx: 180x180 with 20% padding.
- app/manifest.ts: name/short_name/start_url/display:'standalone'/background:'#0d0d0c'/theme_color:'#0d0d0c'/icons.
- Delete file.svg, globe.svg, next.svg, vercel.svg, window.svg from public/.

**Success signal:** Branded favicon shows in SERP, browser tabs and iOS pinned sites; manifest validates.

#### [P0] Core Web Vitals budget + Lighthouse CI gate + Preloader motion budget  _(effort: M)_

**Where:** src/components/site/Preloader.tsx; src/app/layout.tsx (font loading); every page using <img>; CI config

**Why:** Motion + Lenis + Preloader + custom cursor site at material CWV risk, especially on 4G Indian mobile. Theme-sacred constraint means we optimise WITHIN the palette/motion family, not around it.

**Deliverables:**

- Set budgets: LCP <2.5s on 4G mobile for /, /work, /work/[slug], /services/[slug], /industries/[slug]; INP <200ms; CLS <0.1.
- Preloader: runs ONCE per browser session via sessionStorage flag (first visit only); honours prefers-reduced-motion with a short-circuit; measured contribution to LCP documented.
- Instrument Serif self-hosted with font-display:swap; preload on routes where H1 is LCP (/, /work/[slug], /services/[slug]).
- next/image mandatory for every gallery/cover_image/client logo with explicit sizes.
- Preload LCP image on /work/[slug] via <link rel='preload' as='image'>.
- Lighthouse-CI (or Vercel Speed Insights check) gating Week 4 ship; failing budgets block deploy.
- If Preloader LCP exceeds 2.5s on cold mid-range Android after optimisation, document the trade-off and compensate with LCP image preload + reduced Preloader duration (TUNE WITHIN FAMILY, do not remove).

**Success signal:** CrUX (GSC Core Web Vitals report) shows 75th percentile LCP <2.5s / INP <200ms / CLS <0.1 within 60 days; Lighthouse CI blocks regressions.

#### [P0] Google Business Profile + NAP citations  _(effort: L)_

**Where:** External: GBP console; manual directory submissions

**Why:** LocalBusiness JSON-LD alone does not rank the local pack. 'website design agency mumbai' intent needs GBP + citations.

**Deliverables:**

- Verify GBP for Mumbai HQ with NAP exactly matching settings.address/phone/email.
- Categories: Website Designer, Software Company, Graphic Designer.
- Service areas: Mumbai + regions.
- 15-25 photos: studio, team, work-in-progress, screenshots.
- Weekly GBP Posts (3 months) tied to Journal articles.
- GBP Q&A seeded from /faq.
- Review-generation to GBP (not just /reviews) — ask the four reference clients to also leave a GBP review.
- NAP citations with identical copy on Clutch, DesignRush, GoodFirms, Behance, LinkedIn Company Page, JustDial, Sulekha.

**Success signal:** Appear in top 3 of Mumbai local pack for 'website design agency mumbai', 'software development mumbai', 'saas developers mumbai' within 90 days.

#### [P1] alternates.canonical + 301 redirect map + pre-launch crawl  _(effort: S)_

**Where:** root layout + every page.tsx + next.config.ts redirects

**Why:** Without explicit canonicals Google may pick UTM variants as canonical. Content shifts (engagement cards -> /engagements, Process -> /approach, /services shape change) without redirects drop rankings.

**Deliverables:**

- alternates:{canonical:siteUrl()+route} on every static route; /work/[slug] computes dynamic canonical. No trailing slashes.
- 301 redirect map in next.config.ts: list every URL whose content moves (code-commented with reasoning).
- Pre-launch Screaming Frog or Sitebulb crawl: catch orphan pages, canonical loops, mixed-case/trailing-slash duplicates.
- Robots.ts: disallow /admin/*, /api/*; allow /opengraph-image.*; declare sitemap URL.

**Success signal:** GSC Coverage shows canonicals consolidated; no ranking drop on legacy /services URLs.

#### [P1] Enrich sitemap.ts with lastModified / changeFreq / priority + image sitemap entries  _(effort: S)_

**Where:** src/app/sitemap.ts

**Why:** Every entry is bare `{url}` today — no re-crawl signal. Image Pack traffic needs <image:image> entries.

**Deliverables:**

- Static routes: lastModified=new Date(), changeFrequency='weekly', priority tuned (/=1.0, /work and /services=0.9, /about and /reviews=0.7, /contact=0.6, /journal=0.6).
- Projects: lastModified=new Date(updated_at ?? created_at); admin saves bump updated_at. priority=featured?0.9:0.7.
- Services: lastModified=new Date(service.updated_at ?? created_at), priority=0.8.
- Articles: lastModified from article.updated_at (bumped on save), priority=0.5.
- Register all new routes (/services/[slug], /industries/*, /journal/*, /faq, /approach, /engagements, /legal/*).
- Extend to MetadataRoute.Sitemap with <image:image> loc entries for project.cover_image, project.gallery[].url, team member photo_url.
- Keep revalidate=3600.

**Success signal:** Content edits re-crawled within hours; GSC sitemap shows all URLs discovered; Image Pack results begin appearing.

#### [P1] WCAG 2.2 AA audit + conformance statement (tune within palette family)  _(effort: M)_

**Where:** /legal/accessibility; axe + Lighthouse automated runs; external audit

**Why:** Gov/edu/large-corp buyers need WCAG 2.2 AA. Theme-sacred constraint means contrast failures (mute on night, ember on bone at small sizes) must be fixed WITHIN the palette family, not by swapping tokens.

**Deliverables:**

- Run axe + Lighthouse accessibility audits on every route.
- External audit (3rd-party) within 90 days of launch; publish dated conformance statement on /legal/accessibility.
- If contrast fails on mute text <=14px on night, tune mute token slightly lighter WITHIN the family; document the token value change in theme constants.
- Keyboard-trap test on Preloader + custom cursor + Lenis to confirm screen-reader navigability.
- Prefers-reduced-motion respected on every Reveal/SplitText/Marquee/Preloader surface.

**Success signal:** /legal/accessibility conformance statement is specific, dated and audit-backed; axe + Lighthouse pass on every route; palette family unchanged.

#### [P2] Harden image alt text + per-image gallery captions  _(effort: S)_

**Where:** src/components/site/TeamPortrait.tsx; src/app/(site)/work/[slug]/page.tsx gallery

**Why:** Team alt = member.name only. Gallery alt is templated 'client gallery image N' — useless for Google Images.

**Deliverables:**

- TeamPortrait alt = `${member.name}, ${member.role}`.
- Project.gallery promoted to {url, alt, caption?}[]; render alt from item's alt (fall back to template). Render caption as muted eyebrow directly below image.

**Example copy:**

```
ArenaOS captions: 'Live seat-map, every venue on its own tenant.' / 'Booking funnel — slot picker, UPI payment, receipt in 11 seconds.' / 'Owner dashboard — revenue, utilisation, retention in one view.'
```

**Success signal:** Image Pack results appear for case-study queries.

---

### Content Engine (Journal + FAQ + Industries + Approach)

**Goal:** Open a 25-query SEO roadmap by shipping a hub-and-spoke of pillar pages (Services + Industries) with Journal spokes and an FAQ cluster — every long-tail query has a dedicated landing surface, pillars refresh on a cadence, Industries ship loud not thin, and FAQPage schema avoids cannibalisation.

#### [P0] Define the 25-query roadmap BEFORE Journal writing starts  _(effort: M)_

**Where:** src/content/seo-roadmap.md (admin-only, not public)

**Why:** Plan references 'the 25-query SEO roadmap' repeatedly but never lists the queries, intent class, SERP shape, target URL or internal-link neighbours. Journal cadence will burn on wrong topics without this.

**Deliverables:**

- Document all 25 queries: intent class (commercial/informational/local), monthly volume estimate for IN+GCC+UK+US, SERP intent (listicle vs service page vs guide vs case study), target URL in new architecture, primary H1 phrasing, meta description template, 3 'linked from' URLs, 2 'links to' URLs.
- Include at least 3 mid-funnel 'Mumbai' head terms (website design company mumbai, software development company mumbai, saas development company india) mapped to /, /services and /contact.
- Include at least 2 comparison / 'vs' queries (Next.js vs WordPress for SaaS; in-house hire vs boutique agency) if the voice supports them.

**Success signal:** Every Journal article and every Industry page points to a specific query entry; Journal cadence hits intent, not generic agency topics.

#### [P0] /industries hub + 4 loud vertical pages (gate on >=2 proofs)  _(effort: L)_

**Where:** src/app/(site)/industries/page.tsx; src/app/(site)/industries/[slug]/page.tsx; industries table; Project.industry

**Why:** Portfolio shows deep vertical expertise but no page exists for 'real estate website developer mumbai' etc. BUT with 8 projects across 6-7 verticals, at least two industries would launch with 1 proof — thin pages dilute, not concentrate.

**Deliverables:**

- Add industries table: id, slug, name, intro, body_md, service_slugs[], project_slugs[], faq[] (UNIQUE Qs), meta_title, meta_description, compliance_signals[] (RERA / DPDP / port-authority / GST invoicing), published.
- Add Project.industry + industries text[] for multi-vertical cases.
- Launch 4 industries LOUD at Week 5: logistics-cargo, real-estate, gaming-entertainment, maritime (each has >=2 project proofs OR a signed-NDA case with named outcomes).
- Hold interior-design, hr-workforce, ed-tech until they qualify (>=2 proofs).
- Each detail page: Breadcrumbs + PageHeader + ScrollText problem/solution lede + 'What we build for this industry' + 2-3 ProjectCard grid + compliance-signals callout + FAQ block (UI only, no schema) + CTA.
- Industry-specific compliance signalling: RERA on real-estate, DPDP + labour law on HR (when it launches), port-authority integrations + maritime law on maritime, GST invoicing + e-way bill on logistics-cargo.
- Per-industry opengraph-image.tsx.
- 'Industry' filter chips on WorkIndex.tsx above the existing category filter.
- Emit BreadcrumbList + CollectionPage JSON-LD per detail page.

**Success signal:** Four new vertical URLs ranking for queries 8-15 in the roadmap within 90 days; no industry page launches thin; buyers in regulated industries find compliance signals before procurement asks.

#### [P0] /faq hub + inline FAQ components (schema from hub ONLY, no cannibalisation)  _(effort: M)_

**Where:** src/app/(site)/faq/page.tsx; inline sections on existing routes

**Why:** Zero FAQ content. The 9 most common qualification questions (pricing, timelines, team, location, NDA, equity, retainers, payments, international) go unanswered. BUT emitting FAQPage schema from 10 pages risks Google rich-snippet cannibalisation.

**Deliverables:**

- Build /faq with 20-25 UNIQUE Q&As grouped: Working with us / Who we are / How we build / After launch / Procurement (MSA, DPA, PI, liability cap, warranty) / Compliance (DPDP, GDPR, data residency).
- Inline 4-6 Q FAQ on /services (engagement/pricing), each /services/[slug] (service-specific), /contact (what-to-include-in-brief), each /industries page (vertical-specific). Each inline block has UNIQUE Qs (no duplication with /faq hub or with each other).
- Reuse ServiceAccordion on a bone surface — no new component.
- FAQPage JSON-LD emits ONLY from /faq hub. Inline blocks render component only.
- Add 'FAQ' to site.nav or Footer Sitemap column.

**Example copy:**

```
Q: 'How much does a website or SaaS cost?' A: 'A marketing website usually sits between Rs 3L and Rs 12L. A product site, custom CRM or operations panel starts at Rs 8L and scales with scope. We quote fixed on a defined brief, and open-book on a monthly partnership — never hourly.' Q: 'How do payments work?' A: 'Fixed-scope projects: 30% advance, 40% at mid-point review, 30% at launch. Partnerships: monthly, NET-30, invoiced on the first of the month. International clients: USD or GBP via wire or Stripe.' Q: 'What is the change-order process?' A: 'Any scope change over 2 engineering days triggers a written change order with time estimate and cost impact. You approve or decline before work starts.'
```

**Success signal:** FAQPage rich results appear for 6+ long-tail queries from /faq; no cannibalisation warnings in GSC; 'how much does X cost' / 'how long does X take' queries find /faq.

#### [P0] /approach route with Process + per-phase deliverables (retire duplicate on /services)  _(effort: M)_

**Where:** src/app/(site)/approach/page.tsx (new); src/components/site/Process.tsx (accept steps prop)

**Why:** Process timeline duplicates verbatim on home and /services. Visitors who scrolled on home see no new content on /services. The 'how we work' SEO entity has no home.

**Deliverables:**

- Build /approach: Breadcrumbs + PageHeader + ScrollText pitch + Process + per-phase deliverables chips + CTA.
- Make Process accept optional steps prop so service pages pass per-service variations.
- On /services, drop duplicate Process and link to /approach.
- Extend STEPS with deliverables:string[] (3-6 artefacts per step: brief, moodboard, wireframe, prototype, staging URL, launch runbook, monitoring setup).

**Success signal:** /approach ranks for 'design agency process' / 'how design agencies work' queries; /services duplicate-content signal removed.

#### [P1] /journal + /journal/[slug] with MarkdownPost renderer pinned to existing tokens  _(effort: L)_

**Where:** src/app/(site)/journal/page.tsx; src/app/(site)/journal/[slug]/page.tsx; articles table

**Why:** Zero editorial surface = zero long-tail SEO growth lever. BUT the MarkdownPost renderer is the ONE new component this plan admits — it's also the one with the most freedom to drift from the type scale.

**Deliverables:**

- Articles table: title, dek, cover_image, body_md, author_id (Person @id), tags[], industry, service_slugs[], related_project_slugs[], meta_title, meta_description, og_image, reading_time, published_at, updated_at (auto-bump on save), published, status (draft/review/published).
- Build index + detail routes reusing PageHeader + SplitText + ScrollText + Reveal + ProjectCard-shaped tiles.
- MarkdownPost renderer TYPOGRAPHY CONTRACT (pin before any .md renders): Instrument Serif display, serif body, eyebrow typography for captions, ScrollText rhythm for lede, Testimonials pull-quote treatment, existing hr/divider, existing list bullet style. NO new type scale, NO new spacing scale, NO stock prose stylesheet, NO new ember use beyond existing accent rules.
- Reveal use capped at one per block (not per paragraph).
- Each article ends with related case study card + CTA band.
- Register all article slugs in sitemap.
- Launch cadence: 2 articles at launch — (1) founder-written 'Why we rebuilt the TechBack site in 2026' (also GTM launch note); (2) 'How we built a cargo CRM in six weeks'. Then 1/week for 10 weeks.
- Article/BlogPosting JSON-LD with author Person @id continuity + dateModified.

**Example copy:**

```
/journal eyebrow: 'Journal'. H1: 'Writing from inside the *studio.*' Intro: 'Essays on building SaaS, briefing an agency, and the questions founders ask us most. New writing every week.'
```

**Success signal:** 40+ new indexable URLs within 90 days; organic sessions on /journal/[slug] hit 500/mo by week 12; MarkdownPost typography reads editorial, not generic prose.

#### [P1] Static 'Built with' stack strip under Platforms (NOT a second Marquee)  _(effort: S)_

**Where:** src/app/(site)/page.tsx (static eyebrow strip directly under Platforms grid)

**Why:** Platforms copy describes multi-tenancy, UPI, GST but names no technology. Big free opportunity to prove engineering seriousness. BUT a second scrolling Marquee stacked under Platforms compounds motion budget and reads brochure-site.

**Deliverables:**

- Add a STATIC eyebrow strip of chips (existing chip style, no border, hairline separators) directly under the Platforms aside: 'Built with · Next.js · React · TypeScript · Tailwind · Motion · Postgres · Supabase · Prisma · Vercel · Figma · Lenis · Stripe · UPI · Razorpay · WhatsApp Cloud · Resend · Zod'.
- Admin-editable settings.stack[].
- Promote settings.clients to {name, slug?, href?, logo_url?}[]. Marquee links each name to its case study with descriptive anchor text (`${name}, ${industry}`).

**Success signal:** Stack entities (Next.js, Postgres, Supabase, Shopify Headless) crawl into home server-rendered HTML; motion budget stays stable; internal link graph from home to case studies densifies.

#### [P2] Pillar refresh cadence + Journal pagination strategy  _(effort: M)_

**Where:** /admin content-health dashboard; sitemap.ts; /journal pagination

**Why:** /services/[slug] + /industries/[slug] need 60/90/180-day dateModified bumps to maintain rank. /journal with 40+ articles will need pagination.

**Deliverables:**

- /admin dashboard flag: pillar pages not updated in 90 days.
- Monthly 20-minute refresh ritual: tweak intro, add 1 outcome bullet, add 1 FAQ Q, bump updated_at.
- /journal pagination: when article count exceeds 24, first page is self-canonical; subsequent pages have canonical pointing to themselves (not /journal), rel=next/prev noted as deprecated; prefer load-more over paginated URLs if possible.

**Success signal:** Pillar pages maintain or improve ranking after 90 days; no thin pagination duplicates in GSC.

---

### Enterprise & Procurement

**Goal:** A buyer who likes the pitch can get the vendor pack past legal, finance and procurement by Friday — downloadable artefacts, callable references, continuity statement, named compliance posture, and a security contact.

#### [P0] /legal/vendor-pack downloadable PDF + Procurement FAQ section  _(effort: L)_

**Where:** src/app/(site)/legal/vendor-pack/page.tsx + static PDF at /legal/vendor-pack.pdf; new /faq Procurement group

**Why:** For any inquiry over ~Rs 15L, procurement asks for MSA, DPA, PI insurance, warranty, data residency, backup/DR, sub-processor list. Without this, honest marketing still fails the enterprise shortlist.

**Deliverables:**

- Draft MSA template (reusable); DPA covering DPDP 2023 + GDPR + CCPA; PI insurance certificate (procure if not already held) + liability cap; warranty / defect period (90 days post-launch, bug-fix free); data residency statement (where client data lives — region + hosting provider); backup/DR policy (frequency, RTO, RPO); sub-processor list (Vercel, Supabase, Resend, Stripe, Razorpay, Cloudflare, each with purpose).
- Bundle as a single PDF at /legal/vendor-pack.pdf (Puppeteer-exported from the HTML page for consistency).
- Build /legal/vendor-pack HTML page reusing PageHeader + prose column + download Magnetic button + CTA.
- Add Procurement group to /faq with 5-7 Qs: 'Do you sign an MSA?', 'Can you sign our MSA?', 'What is your DPA posture?', 'Do you carry PI insurance and what is the limit?', 'What is the warranty period?', 'Where is client data hosted?', 'Can you provide a sub-processor list?'

**Success signal:** Procurement reply time to vendor-pack requests drops from days to minutes; inbound inquiries from enterprise shortlist convert at a measurable rate.

#### [P0] Payment terms + change-order rules on /engagements  _(effort: S)_

**Where:** src/app/(site)/engagements/page.tsx 'How we invoice' block; /faq Payment group

**Why:** 'From Rs 8L' tells the opening number but not invoice rhythm, mid-project scope changes, or change-order triggers. CFO cannot approve a vendor without this.

**Deliverables:**

- Add 'How we invoice' section on /engagements: milestone split default (30% advance / 40% midpoint review / 30% launch), partnership invoicing (NET-30, first of month), international (USD/GBP via wire or Stripe, settlement in 3-5 working days), change-order threshold (>2 engineering days triggers written change order), overdue policy (NET-30 + 5 working days grace, then work-pause).
- Add Payment group to /faq: 3-4 Qs covering the above.

**Success signal:** CFO-approved vendor status reached without a sales call; change-order disputes decline.

#### [P1] Hosting, DNS, account ownership + offboarding runbook (in 'What you keep' and /faq)  _(effort: S)_

**Where:** /work/[slug] 'What you keep' + 'After launch' blocks; /faq After-launch group

**Why:** #2 buyer anxiety after price. Vercel/Supabase/Resend account ownership and DNS transfer are not covered in the baseline 'What you keep' plan.

**Deliverables:**

- Update 'What you keep' prose to explicitly cover account ownership (Vercel, Supabase, Resend, Stripe accounts in client's name on day one), DNS transfer runbook, no stored credentials.
- 'After launch' subsection names hosting cost estimate ranges, hypercare window (30 days), bug SLA (critical <24h, non-critical <5 working days, free in first 90 days post-launch), feature-request process (change-order on partnership, scoped quote off retainer).
- Add After-launch group to /faq: 'Who owns the Vercel/Supabase accounts?', 'What are hosting costs?', 'What is the bug SLA?', 'What is the offboarding runbook if we leave?'

**Success signal:** Hosting/DNS/account-ownership questions stop coming in via contact form (answers on page); offboarding is a known quantity.

#### [P1] security.txt + SOC2/ISO posture statement  _(effort: S)_

**Where:** public/.well-known/security.txt; /legal/privacy security section

**Why:** Enterprise procurement security checklists ask for a security contact and a stance on certifications even if not yet achieved.

**Deliverables:**

- public/.well-known/security.txt with Contact: security@techback.in, Expires, Preferred-Languages, Policy URL.
- /legal/privacy security section: current controls (encryption in transit + at rest via Supabase, access control via SSO where available, backup frequency, incident response commitment of <24h), stance on SOC2/ISO27001 ('not pursued at current scale; happy to execute client's security questionnaire').

**Success signal:** Enterprise security questionnaires reference the security.txt and complete faster.

---

### Admin & Content Model

**Goal:** Every content gap this plan opens becomes an admin-editable field with a form, every settings copy field has draft/preview/publish state, every component has a fallback for empty admin fields, and the owner has a content-health dashboard + attribution dashboard.

#### [P0] Extend every content model + admin forms + component-level fallbacks + draft/preview state  _(effort: L)_

**Where:** src/lib/types.ts; src/lib/seed.ts; src/db/schema.ts; admin edit forms; every component sourcing from settings

**Why:** Half the plan depends on fields that do not exist. Hero H1 + Preloader tagline + Platforms copy + about_story move from code into DB — one bad save goes live immediately. Need fallbacks + preview state.

**Deliverables:**

- Single migration/seed ticket covering every new field across Service, Project, Review, TeamMember, Settings, Inquiry, Articles, Industries (from workstreams above).
- Promote gallery to {url, alt, caption?}[] and clients to {name, slug?, href?, logo_url?}[].
- Mirror all additions in admin edit forms with chip/list/image-upload editors.
- Zod schema updates in actions.ts for every form.
- COMPONENT-LEVEL FALLBACKS NON-NEGOTIABLE: Hero H1, hero_sublede, hero_rotator, preloader_tagline, Platforms copy, home_intro, about_story, principles, process steps, engagement cards — every component ships with a hard-coded default that preserves current layout metrics (H1 line break, SplitText emphasis positions, Preloader timing).
- Admin draft/preview/publish state on Settings copy fields: unpublished changes are visible at /admin/preview?token=... but do not go live until publish.

**Success signal:** A fresh install seeded with new values renders every page completely; admin can edit every string without a deploy; empty admin field never breaks layout; preview URL shows pending changes before live.

#### [P0] Analytics + Search Console + attribution dashboard  _(effort: M)_

**Where:** src/app/layout.tsx (analytics scripts); /admin dashboard; event schema

**Why:** KPIs promise 'inquiry quality rate 80%' and 'median scroll >=75%' but no tool, event schema or owner. Without this, KPIs are aspirational.

**Deliverables:**

- Add GA4 property (via next/third-parties/google) with consent-mode default-denied, prompt via a thin cookie banner on first visit (consistent with DPDP + GDPR).
- Add Vercel Analytics + Vercel Speed Insights.
- Event schema: page_view (auto), form_view, form_start, chip_select (budget/timeline/service), inquiry_submit (dimensions: budget, timeline, service, ref, utm_*), case_study_scroll_75, service_detail_cta_click, discovery_call_booked.
- Verify GSC + Bing Webmaster; submit sitemap.
- Build /admin dashboard reading GA4 + Postgres: inquiries by week, by source/ref, by budget/timeline, scroll-depth median per /work/[slug], top-ranking queries from GSC.

**Success signal:** Every KPI in the plan has instrumentation live by Week 4; owner uses dashboard weekly.

#### [P1] Audit Platforms tile proof-link slugs + Settings validation  _(effort: S)_

**Where:** src/components/site/Platforms.tsx; admin settings form; actions.ts settings schema

**Why:** Proof links hardcode slugs (arenaos, cargo-operations, aaran-homes, quiz-platform, hr-platform). Admins renaming a project silently breaks the link. Current seed values include personal Gmail, bare-domain socials.

**Deliverables:**

- Data-drive Platforms from Services + Project.services_used so proof is computed, OR add admin check in /admin that warns when a hardcoded slug has no matching Project.
- Fallback behaviour: if slug missing, dev-log warning + render tile without proof link (do not break layout).
- Reject settings.socials.href matching /^https:\/\/(www\.)?(instagram|linkedin|dribbble|behance|github)\.com\/?$/ (bare-domain placeholder).
- Warn (not block) when settings.email is a free-provider domain.
- Make address + phone required to pass settings validation before enabling LocalBusiness JSON-LD emission.

**Success signal:** No silent proof-link failures; no regression to placeholder socials or empty address post-launch; broken-link audit returns 0 hits.

#### [P1] Content-health dashboard in /admin  _(effort: M)_

**Where:** src/app/admin/(panel)/dashboard

**Why:** Fresh install hides sections when admin fields are empty. Owner has no view of which fields are starving the site.

**Deliverables:**

- Dashboard listing: Services without outcome/timeline/sample_project_slugs; Projects without pull_quote/tech_stack/metrics/method; Settings fields empty; TeamMembers without photo/bio; Articles not updated in 60+ days (pillar-refresh signal); Pending reviews in moderation queue.
- Each row links to its edit form.
- Pull inquiry counts by source/ref to show attribution working.
- Weekly email summary to settings.email.

**Success signal:** Owner uses dashboard weekly; empty-section visitors never see the hide-when-empty regression.

#### [P2] Legal footer column + legal routes  _(effort: M)_

**Where:** src/components/site/Footer.tsx; /legal/privacy + terms + accessibility (+ vendor-pack + security.txt from Enterprise workstream)

**Why:** No privacy, no terms, no accessibility page. For a studio pitching platforms that handle customer or employee data, absence of a privacy policy fails enterprise vendor shortlists and India DPDP Act 2023.

**Deliverables:**

- Build /legal/privacy (DPDP 2023 + GDPR + CCPA language), /legal/terms, /legal/accessibility (WCAG 2.2 AA conformance statement + audited palette contrast report + external audit date) reusing PageHeader + prose column + CTA.
- Fourth Footer column 'Legal' with links + entity line (settings.legal_entity, settings.gstin).
- Fifth Footer column 'Sitemap' linking Services / Industries / Journal / FAQ / Approach / Engagements for site-wide anchor-text coverage.
- Short italic footer-bottom microcopy: '© 2026 TechBack Solutions · Privacy · Terms · Accessibility'.

**Success signal:** Enterprise procurement checks pass; DPDP + GDPR compliance claim is on page not implied.

---

### Launch GTM & Theme Audit

**Goal:** The relaunch itself is a GTM moment with a plan — founder-written launch article, LinkedIn post, email to past clients + warm leads, pinned Hero note — and the theme integrity holds up after all additions via a before/after ember audit, Reveal density check and type-scale inspection.

#### [P0] GTM launch day plan + 'Why we rebuilt' article (founder-written)  _(effort: M)_

**Where:** /journal/why-we-rebuilt-the-techback-site-in-2026 (first Journal post); LinkedIn Company Page; past-client + warm-lead email; Hero pinned note

**Why:** Shipping silently throws away the single biggest attention spike this site will get all year. AND the launch LinkedIn post / Journal article must be founder-written — AI-authored or generically agency-marketing copy will undo the Week 1 trust foundations.

**Deliverables:**

- Founder-written (not Claude-authored) 'Why we rebuilt the TechBack site in 2026' Journal post as both the launch note and the first Journal spoke.
- Founder-written LinkedIn Company Page post with the same framing + link to the article.
- Email to past clients + warm leads with permission already (BCC, not mass-sent) announcing the rebuild, inviting a reference-call offer or a referral.
- Settings-driven pinned Hero note for 2 weeks (admin-editable field + expiry date): 'View our 2026 rebuild ->' linking to the launch article.
- Measure: track inbound from LinkedIn + email during the 2-week spike via utm_source=launch_linkedin / launch_email.

**Success signal:** LinkedIn impressions, inbound inquiries and reference-call requests spike measurably in first 2 weeks; the launch article itself ranks for 'techback 2026' / 'techback solutions redesign' queries.

#### [P0] Per-page ember-scarcity audit + Reveal density check + type-scale inspection  _(effort: M)_

**Where:** All home sections; /work/[slug]; /services/[slug]; /industries/[slug]; /journal/[slug]; /approach; /engagements; /faq; /legal/*

**Why:** Plan uses ember in many new places (ember-tick list, outcome dot caption, pull-quote glyph, breadcrumb separator, 404 strip, CTA chip row, Counter number stop). Reveal appears on many new tiles. The MarkdownPost renderer is new. Without an audit the accent stops working as an accent and editorial pages tip into over-animation / stock prose.

**Deliverables:**

- Before/after ember count per page; cap ember instances per page (soft cap: 7 appearances per route) and document which are allowed.
- Reveal density check per new route: one Reveal per block (not per child); flag any route exceeding.
- MarkdownPost typography inspection: verify no new type scale/spacing scale/stock prose stylesheet; verify Instrument Serif display + serif body + eyebrow captions + ScrollText rhythm.
- Cursor state verification: new chip rows, breadcrumbs, stack chips and outcome captions all read consistent (link vs text vs default).
- Lenis anchor-offset verification across all new in-page anchors (home dot targets replaced by menu, /approach phases, /faq groups).
- Dark/light contract: all new bone-background sections (/faq, pull-quote, legal prose) use the existing bone/ink pairing at existing opacity rules.
- OG image + Journal cover inspection: no drop shadows, no saturated presets, grain treatment consistent.

**Success signal:** Ember stays sparing after all additions; motion budget stays stable; MarkdownPost reads editorial; no new chrome drifts into product-site or dashboard style; theme integrity audit documents pass/fail per route and is signed off before launch.

---
