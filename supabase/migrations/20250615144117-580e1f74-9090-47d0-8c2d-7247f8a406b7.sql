
-- SERVICES SECTION
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  icon text, -- icon name for lucide-react
  name text,
  description text,
  order_index integer default 0
);

-- PRICING SECTION
create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name text,
  description text,
  price_monthly integer,
  price_yearly integer,
  features text[],
  order_index integer default 0
);

-- TESTIMONIALS SECTION
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text,
  text text,
  avatar_url text,
  rating double precision,
  order_index integer default 0
);

-- TEAM SECTION
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text,
  role text,
  photo_url text,
  bio text,
  order_index integer default 0
);

-- FAQ SECTION
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text,
  answer text,
  order_index integer default 0
);

-- METRICS SECTION
create table if not exists public.metrics (
  id uuid primary key default gen_random_uuid(),
  label text,
  value text,
  order_index integer default 0
);

-- PARTNER LOGOS SECTION
create table if not exists public.partner_logos (
  id uuid primary key default gen_random_uuid(),
  name text,
  logo_url text,
  link text,
  order_index integer default 0
);

-- FINAL CTA SECTION
create table if not exists public.final_cta (
  id uuid primary key default gen_random_uuid(),
  headline text,
  subtext text,
  button_label text,
  button_link text,
  show boolean default true
);

-- DYNAMIC HEADLINES/SUBHEADS ("available tag" text, etc) IN site_settings
alter table public.site_settings
  add column if not exists hero_available_tag_headline text,
  add column if not exists hero_available_tag_spots_left text, -- e.g. "only 3 spots left"
  add column if not exists partner_logos_headline text,
  add column if not exists metrics_headline text,
  add column if not exists team_headline text,
  add column if not exists testimonials_headline text,
  add column if not exists services_headline text,
  add column if not exists pricing_headline text,
  add column if not exists faq_headline text,
  add column if not exists recent_works_headline text,
  add column if not exists final_cta_headline text;
