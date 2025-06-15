
-- Add an RLS policy to allow public UPDATEs to site_settings
CREATE POLICY "Allow public updates to site settings" 
  ON public.site_settings
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
