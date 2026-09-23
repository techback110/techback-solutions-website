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
