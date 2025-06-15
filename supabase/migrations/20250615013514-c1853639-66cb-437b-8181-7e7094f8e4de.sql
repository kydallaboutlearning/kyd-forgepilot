
-- 1. Table for site-wide settings
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text,
  favicon_url text,
  site_title text,
  site_subtitle text,
  hero_headline text,
  hero_subtext text,
  hero_cta_label text,
  hero_cta_link text,
  footer_text text,
  show_hero boolean DEFAULT true,
  show_footer boolean DEFAULT true,
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Table for navigation links
CREATE TABLE public.navigation_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  order_index int DEFAULT 0,
  is_active boolean DEFAULT true
);

-- 3. Table for social media links
CREATE TABLE public.social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  icon text NOT NULL -- e.g. 'facebook', 'instagram'
);

-- 4. Table for hero background (image/video)
CREATE TABLE public.hero_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, -- 'image' | 'video'
  url text,
  alt text
);

-- 5. Benefits section
CREATE TABLE public.benefits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  icon text, -- icon name (choose from Lucide or library)
  order_index int DEFAULT 0
);

-- 6. Partner logos
CREATE TABLE public.partner_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  logo_url text,
  link text,
  order_index int DEFAULT 0
);

-- 7. Portfolio projects
CREATE TABLE public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  images jsonb, -- array of image URLs
  video_url text,
  date date,
  category text,
  tags text[],
  summary text,
  problem text[],
  solution text[],
  tech_stack text[],
  results jsonb, -- [{kpi:..., desc:...}]
  testimonial jsonb, -- {name, quote}
  contact_email text,
  contact_calendly text,
  order_index int DEFAULT 0
);

-- 8. Metrics
CREATE TABLE public.metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  order_index int DEFAULT 0
);

-- 9. Pricing Plans (renamed desc -> description)
CREATE TABLE public.pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  description text,
  price_monthly int,
  price_yearly int,
  features text[],
  order_index int DEFAULT 0
);

-- 10. Testimonials
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  avatar_url text,
  text text,
  rating float,
  order_index int DEFAULT 0
);

-- 11. Team members
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  role text,
  photo_url text,
  bio text,
  order_index int DEFAULT 0
);

-- 12. FAQs
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text,
  answer text,
  order_index int DEFAULT 0
);

-- 13. Final CTA
CREATE TABLE public.final_cta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text,
  subtext text,
  button_label text,
  button_link text,
  show boolean DEFAULT true
);

-- 14. Buckets for uploads (images/brand)
INSERT INTO storage.buckets (id, name, public) VALUES
  ('site-assets', 'site-assets', true),
  ('portfolio', 'portfolio', true)
ON CONFLICT DO NOTHING;

-- 15. Enable RLS for all tables (so only dashboard editors with future auth can edit/manage)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.final_cta ENABLE ROW LEVEL SECURITY;

-- 16. Add policy: allow all for now (will refine after dashboard auth is added)
CREATE POLICY "Open select" ON public.site_settings      FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.navigation_links   FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.social_links       FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.hero_media         FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.benefits           FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.partner_logos      FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.portfolio_items    FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.metrics            FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.pricing_plans      FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.testimonials       FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.team_members       FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.faqs               FOR SELECT USING (true);
CREATE POLICY "Open select" ON public.final_cta          FOR SELECT USING (true);
