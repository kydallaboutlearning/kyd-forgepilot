
INSERT INTO site_settings (admin_email, admin_password_hash)
SELECT
  'admin@agency.ai',
  '$2a$10$RwLTx5ZQSQ12Kbnrjpf6yexu/vGOCJMTcdrcIDi.8sCsrhD24YVzW'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- This sets your admin account to:
-- Email: admin@agency.ai
-- Password: admin123

