
-- Create a storage bucket for portfolio images
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict do nothing;

-- Create a table for managing social links
create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  icon text not null
);

-- Allow everyone to read social_links (for footer display)
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to social_links"
  ON public.social_links
  FOR SELECT
  USING (true);

-- Allow only authenticated users to insert, update, and delete social_links
CREATE POLICY "Authenticated manage social_links"
  ON public.social_links
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
