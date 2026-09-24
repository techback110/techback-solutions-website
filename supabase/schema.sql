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
