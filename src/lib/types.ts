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
};

export type Metric = { value: string; label: string };

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
};

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

/** Site-wide content editable from Admin → Settings. Empty strings are hidden on the site. */
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
};
