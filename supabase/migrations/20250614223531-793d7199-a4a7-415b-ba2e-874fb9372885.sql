
-- 1. CMS Pages table for headless content
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body text, -- will store HTML or rich text
  featured_image text,
  seo_title text,
  seo_description text,
  last_updated timestamp with time zone not null default now()
);

-- 2. Blog posts table (optional but recommended)
create table public.blog (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body text,
  author text,
  featured_image text,
  tags text[],
  published_at timestamp with time zone not null default now(),
  seo_title text,
  seo_description text,
  last_updated timestamp with time zone not null default now()
);

-- Enable Row Level Security (RLS) for both tables
alter table public.pages enable row level security;
alter table public.blog enable row level security;

-- Allow anyone to select (read) page and blog content
create policy "Public can read pages"
  on public.pages
  for select
  using (true);

create policy "Public can read blog"
  on public.blog
  for select
  using (true);

-- Allow only authenticated users to write (insert, update, delete) pages and blog (for now; can add role-based admin control later)
create policy "Authenticated can write pages"
  on public.pages
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can write blog"
  on public.blog
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
