
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS contact_cta_headline TEXT,
ADD COLUMN IF NOT EXISTS contact_cta_subtext TEXT,
ADD COLUMN IF NOT EXISTS contact_cta_button_label TEXT,
ADD COLUMN IF NOT EXISTS contact_cta_button_url TEXT;
