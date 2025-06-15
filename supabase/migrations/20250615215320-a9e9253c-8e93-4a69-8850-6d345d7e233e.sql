
-- Insert a new admin user with email and hashed password using the app's scrypt hashing format
-- Replace the below hash if you update the hash function in code
INSERT INTO admin_users (email, password_hash)
VALUES (
  'kydallaboutlearning@gmail.com',
  'a391c10d965798fbf5ba769ac2339f22$352f3aa07328873df3d32ddf93e2cd6e797134efd03a989c7e383161995bff06'
);
/*
Password for this hash: learning4me
*/ 
