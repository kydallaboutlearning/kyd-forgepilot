
-- Update the admin email and set the password hash as 'admin123' for new login
UPDATE site_settings
SET
  admin_email = 'kydallaboutlearning@gmail.com',
  admin_password_hash = 'admin123'
WHERE TRUE;
