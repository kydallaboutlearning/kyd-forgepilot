
-- Add pricing_type column to support different payment models
ALTER TABLE public.pricing_plans 
ADD COLUMN IF NOT EXISTS pricing_type text DEFAULT 'monthly' CHECK (pricing_type IN ('one-time', 'monthly', 'yearly'));

-- Update existing plans to have explicit pricing types
UPDATE public.pricing_plans 
SET pricing_type = 'monthly' 
WHERE pricing_type IS NULL;
