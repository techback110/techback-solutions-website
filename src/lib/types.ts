/* Fields added for the buyer-facing rewrite are optional in TS and
   `not null default ''` in Postgres: empty means "hidden", which is how the rest
   of this model already behaves, and it keeps existing seed rows valid. */

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  sort_order: number;
  published: boolean;
  created_at: string;
  /** One line on what the client ends up with. */
  outcome?: string;
  /** Human range, e.g. "4–8 weeks". */
  timeline_weeks?: string;
  /** Subset of site.engagements. */
  engagement_types?: string[];
  /** Price floor, e.g. "₹2,50,000". */
  starting_from?: string;
  in_scope?: string[];
  out_of_scope?: string[];
  /** Project slugs shown as proof on the service page. */
  sample_project_slugs?: string[];
};

export type Metric = {
  /** Carries its own unit, e.g. "+212%" or "6 weeks". */
  value: string;
  label: string;
  /** How it was measured — rendered as a muted caption under the number. */
  method?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: number;
  summary: string;
  description: string;
  cover_image: string | null;
  gallery: string[];
  tags: string[];
  metrics: Metric[];
  live_url: string | null;
  accent: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  industry?: string;
  /** Human range, e.g. "6 weeks". */
  duration_weeks?: string;
  team_size?: string;
  /** What we were responsible for. */
  role?: string;
  /** The client's ask — opens the case study. */
  brief?: string;
  /** Narrative wins that aren't numbers. */
  outcome_bullets?: string[];
  /** Service slugs this project came out of. */
  services_used?: string[];
  tech_stack?: string[];
  pull_quote?: string;
  pull_quote_attribution?: string;
  video_url?: string | null;
  pdf_url?: string | null;
};

/** Where a testimonial can be independently checked. Review schema is only
 *  emitted for reviews that have one — self-serving stars get stripped by Google. */
export type VerificationSource = "email" | "linkedin" | "clutch" | "gbp" | "other";

export type Review = {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar_url: string | null;
  rating: number;
  content: string;
  featured: boolean;
  approved: boolean;
  created_at: string;
  /** Pins the review to the project it refers to. */
  project_slug?: string | null;
  /** Pull-quote length excerpt for cards and case studies. */
  quote_short?: string;
  verification_source?: VerificationSource | null;
  source_url?: string | null;
  /** Written permission to publish. Gate publishing on this. */
  permission_granted?: boolean;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  service: string | null;
  message: string;
  read: boolean;
  created_at: string;
  /** How they want to work: Project, Partnership, SaaS, Consultancy. */
  engagement?: string | null;
  timeline?: string | null;
  nda?: boolean;
  /** Their site or brief. */
  link?: string | null;
  /** Case-study slug the enquiry came from — powers attribution. */
  ref?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

export type ActionState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  message?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  color: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  /** Two sentences — who they are and what they're for. */
  bio?: string;
  specialty?: string;
  location?: string;
  linkedin_url?: string | null;
  github_url?: string | null;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export type Stat = { value: number; suffix: string; label: string };
export type Social = { label: string; href: string };
export type Principle = { title: string; body: string };

/** Site-wide content editable from Admin → Settings. Empty strings are hidden on the site.
 *  Stored settings are merged over `seedSettings`, so the seed value of every key
 *  below is also its fallback when an admin clears the field. */
export type SiteSettings = {
  email: string;
  phone: string;
  address: string;
  description: string;
  socials: Social[];
  home_intro: string;
  clients: string[];
  stats: Stat[];
  about_intro: string;
  about_story: string;
  principles: Principle[];

  /* Where we are */
  hq: string;
  regions: string[];
  office_hours: string;

  /* Hero — the first ten seconds */
  hero_headline: string;
  hero_sublede: string;
  /** Rotating nouns in the hero. Keep to 4 or the headline reflows. */
  hero_rotator: string[];
  preloader_tagline: string;

  /* How to reach us */
  booking_url: string;
  whatsapp: string;
  reply_time_promise: string;
  /** What happens when we miss the promise above. */
  reply_time_miss_policy: string;

  /* Who you're contracting with */
  legal_entity: string;
  gstin: string;

  /* The people behind it */
  founder_letter: string;
  founder_signature: string;
  /** Bus-factor answer: who covers the work if the founder is unavailable. */
  continuity_statement: string;
};
