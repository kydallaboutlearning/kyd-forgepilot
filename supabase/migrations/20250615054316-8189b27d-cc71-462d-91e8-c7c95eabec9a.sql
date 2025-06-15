
-- Reset the admin login to a new email and password hash for first login
UPDATE site_settings
SET
  admin_email = 'leeekayode@gmail.com',
  admin_password_hash = 'admin123';
