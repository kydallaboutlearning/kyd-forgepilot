
-- Add admin_email and admin_password_hash to site_settings
ALTER TABLE site_settings
  ADD COLUMN admin_email TEXT NULL,
  ADD COLUMN admin_password_hash TEXT NULL;

-- Optionally set default admin credentials if you wish:
-- UPDATE site_settings SET admin_email = 'admin@agency.ai' WHERE admin_email IS NULL;
