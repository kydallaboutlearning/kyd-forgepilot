
ALTER TABLE public.site_settings
ADD COLUMN benefits_headline TEXT,
ADD COLUMN benefits_items JSONB,
ADD COLUMN recent_works_headline TEXT;
