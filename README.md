# Noyada Studio — agency website

A premium agency website with a full admin panel, built with **Next.js 16 (App Router) + TypeScript**, **Tailwind CSS v4**, **Motion** animations and **Supabase Postgres**. Deploys to **Vercel** as a single app.

## Features

**Public site**
- Home: animated hero, client marquee, scroll-lit manifesto, featured work with parallax, services accordion, animated stats, process timeline, testimonial carousel, CTA
- Work index with animated category filters + case study pages (story, results, gallery, next project)
- Services (with engagement models), Studio/About, Reviews (with public "leave a review" form), Contact (inquiry form)
- Smooth scrolling (Lenis), custom cursor, first-visit preloader, split-text reveals, magnetic buttons, film grain
- Projects without a cover image get an art-directed generated poster from their accent colour
- SEO: metadata, sitemap.xml, robots.txt; respects `prefers-reduced-motion`

**Admin (`/admin`)**
- Signed, httpOnly session cookie (JWT via `jose`), protected by `src/proxy.ts` and re-checked in every server action
- Dashboard with stats, latest inquiries, reviews awaiting approval
- Create / edit / delete **projects** (live cover preview), **services**, **reviews** (approve / feature)
- **Inquiries** inbox (mark read, reply by email, delete)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run db:setup             # creates tables + seeds starter content (needs DATABASE_URL)
npm run dev                  # http://localhost:3000
```

Without a real `DATABASE_URL`, the app runs in **demo mode** using in-memory seed data (changes reset on restart), so you can explore everything immediately.
Dev admin login when `ADMIN_EMAIL`/`ADMIN_PASSWORD` aren't set: `admin@studio.dev` / `admin12345` (disabled in production).

## Environment variables

| Name | Description |
| --- | --- |
| `DATABASE_URL` | Supabase Postgres connection string. Use the **Session pooler** URL (port 5432) — the direct host is IPv6-only and the transaction pooler stalls on parallel queries. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin account, created by `npm run db:setup`. After that, manage users and passwords in Admin → Users. |
| `AUTH_SECRET` | 32+ random chars used to sign session cookies. Required in production. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata/sitemap. |

## Deploying to Vercel

1. Import the GitHub repo in Vercel (framework auto-detected as Next.js).
2. Add `DATABASE_URL` (Session pooler) and `AUTH_SECRET` as environment variables.
3. Run `npm run db:setup` once locally against the production database.

## Customising

- Contact details, socials, stats, client list, About copy and team: Admin → Settings / Team
- Studio name and navigation: `src/lib/site.ts`
- Colours, fonts and motion tokens: `src/app/globals.css`
- Seed content: `src/lib/seed.ts` · Schema: `supabase/schema.sql`
