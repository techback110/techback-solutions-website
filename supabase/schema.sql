-- Studio website schema for Supabase Postgres.
-- Safe to run multiple times.

create extension if not exists "pgcrypto";

create table if not exists public.services (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  summary      text not null default '',
  description  text not null default '',
  deliverables text[] not null default '{}',
  sort_order   integer not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now()
);

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  client      text not null,
  category    text not null,
  year        integer not null,
  summary     text not null default '',
  description text not null default '',
  cover_image text,
  gallery     text[] not null default '{}',
  tags        text[] not null default '{}',
  metrics     jsonb not null default '[]'::jsonb,
  live_url    text,
  accent      text not null default '#FF4D1C',
  featured    boolean not null default false,
  published   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  author     text not null,
  role       text not null default '',
  company    text not null default '',
  avatar_url text,
  rating     smallint not null default 5 check (rating between 1 and 5),
  content    text not null,
  featured   boolean not null default false,
  approved   boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text,
  budget     text,
  service    text,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists projects_sort_idx on public.projects (sort_order);
create index if not exists services_sort_idx on public.services (sort_order);
create index if not exists reviews_created_idx on public.reviews (created_at desc);
create index if not exists inquiries_created_idx on public.inquiries (created_at desc);

-- The app talks to Postgres directly from the server. Enabling RLS with no
-- policies blocks Supabase's public REST API (anon key) from these tables.
alter table public.services  enable row level security;
alter table public.projects  enable row level security;
alter table public.reviews   enable row level security;
alter table public.inquiries enable row level security;

create table if not exists public.team_members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text not null default '',
  photo_url  text,
  color      text not null default '#FF4D1C',
  sort_order integer not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id            uuid primary key default gen_random_uuid(),
  name          text not null default '',
  email         text not null unique,
  password_hash text not null,
  created_at    timestamptz not null default now()
);

-- Key/value store for site-wide content (contact details, about copy, …).
create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists team_sort_idx on public.team_members (sort_order);

alter table public.team_members enable row level security;
alter table public.admin_users  enable row level security;
alter table public.settings     enable row level security;

-- ---------------------------------------------------------------------------
-- Buyer-facing fields. Added separately so this file stays re-runnable against
-- an existing database. Text defaults to '' and arrays to '{}' because the app
-- treats empty as "hide this", which keeps half-filled records safe to publish.
-- ---------------------------------------------------------------------------

alter table public.services
  add column if not exists outcome              text   not null default '',
  add column if not exists timeline_weeks       text   not null default '',
  add column if not exists engagement_types     text[] not null default '{}',
  add column if not exists starting_from        text   not null default '',
  add column if not exists in_scope             text[] not null default '{}',
  add column if not exists out_of_scope         text[] not null default '{}',
  add column if not exists sample_project_slugs text[] not null default '{}';

alter table public.projects
  add column if not exists industry               text   not null default '',
  add column if not exists duration_weeks         text   not null default '',
  add column if not exists team_size              text   not null default '',
  add column if not exists role                   text   not null default '',
  add column if not exists brief                  text   not null default '',
  add column if not exists outcome_bullets        text[] not null default '{}',
  add column if not exists services_used          text[] not null default '{}',
  add column if not exists tech_stack             text[] not null default '{}',
  add column if not exists pull_quote             text   not null default '',
  add column if not exists pull_quote_attribution text   not null default '',
  add column if not exists video_url              text,
  add column if not exists pdf_url                text;

alter table public.reviews
  add column if not exists project_slug        text,
  add column if not exists quote_short         text    not null default '',
  add column if not exists verification_source text,
  add column if not exists source_url          text,
  add column if not exists permission_granted  boolean not null default false;

alter table public.team_members
  add column if not exists bio          text not null default '',
  add column if not exists specialty    text not null default '',
  add column if not exists location     text not null default '',
  add column if not exists linkedin_url text,
  add column if not exists github_url   text;

alter table public.inquiries
  add column if not exists engagement   text,
  add column if not exists timeline     text,
  add column if not exists nda          boolean not null default false,
  add column if not exists link         text,
  add column if not exists ref          text,
  add column if not exists utm_source   text,
  add column if not exists utm_medium   text,
  add column if not exists utm_campaign text;

create index if not exists reviews_project_idx on public.reviews (project_slug);
create index if not exists projects_industry_idx on public.projects (industry);
