
-- Insert an initial settings row for dashboard editing
INSERT INTO site_settings (
  id, site_title, site_subtitle, logo_url, favicon_url, hero_headline, hero_subtext, hero_cta_label, hero_cta_link, footer_text, updated_at, show_footer, show_hero
)
VALUES (
  gen_random_uuid(),
  'My Site Title',
  'Welcome to my site',
  '',   -- logo_url
  '',   -- favicon_url
  'Big Hero Headline',
  'Short hero subtext/description',
  'Get Started',
  '#',
  '© 2025 My Company. All rights reserved.',
  now(),
  true,
  true
)
ON CONFLICT DO NOTHING;
