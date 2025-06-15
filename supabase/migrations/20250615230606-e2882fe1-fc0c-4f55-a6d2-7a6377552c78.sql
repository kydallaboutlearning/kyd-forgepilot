
-- Create table for admin tokens
CREATE TABLE public.admin_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  last_used_at timestamp with time zone,
  is_active boolean DEFAULT true
);

-- Insert a test token for you to use
INSERT INTO admin_tokens (token, description) 
VALUES ('admin-token-2025', 'Initial admin token');
