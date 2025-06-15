
-- Add new fields for the customizable Contact CTA section
ALTER TABLE site_settings
  ADD COLUMN contact_cta_headline text,
  ADD COLUMN contact_cta_subtext text,
  ADD COLUMN contact_cta_button_label text,
  ADD COLUMN contact_cta_button_url text;
