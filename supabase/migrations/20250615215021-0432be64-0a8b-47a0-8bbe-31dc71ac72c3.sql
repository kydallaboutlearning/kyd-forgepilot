
-- Create table for admin users
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- (Optional for future) This enforces uniqueness and password hash per admin.
-- Grant select/insert/update/delete to service role only, lock down with RLS if needed.
