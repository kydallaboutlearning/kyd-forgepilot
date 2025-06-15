
-- Update site_settings with CTA label "Get started" for the hero section, keeping other AI automation text.
UPDATE site_settings
SET
  hero_headline = 'Unleash AI Automation For Your Business',
  hero_subtext = 'Accelerate growth, cut costs, and let advanced AI handle the busywork—effortlessly and securely.',
  hero_cta_label = 'Get started',
  hero_cta_link = '#works'
WHERE
  hero_headline IS NULL OR hero_headline = ''
  OR hero_subtext IS NULL OR hero_subtext = ''
  OR hero_cta_label IS NULL OR hero_cta_label = ''
  OR hero_cta_link IS NULL OR hero_cta_link = '';
