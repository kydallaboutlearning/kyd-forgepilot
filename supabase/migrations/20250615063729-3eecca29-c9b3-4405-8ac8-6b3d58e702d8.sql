
-- Update site_settings with AI automation service placeholder hero section values.
UPDATE site_settings
SET
  hero_headline = 'Unleash AI Automation For Your Business',
  hero_subtext = 'Accelerate growth, cut costs, and let advanced AI handle the busywork—effortlessly and securely.',
  hero_cta_label = 'See How It Works',
  hero_cta_link = '#works'
WHERE
  hero_headline IS NULL OR hero_headline = ''
  OR hero_subtext IS NULL OR hero_subtext = ''
  OR hero_cta_label IS NULL OR hero_cta_label = ''
  OR hero_cta_link IS NULL OR hero_cta_link = '';

