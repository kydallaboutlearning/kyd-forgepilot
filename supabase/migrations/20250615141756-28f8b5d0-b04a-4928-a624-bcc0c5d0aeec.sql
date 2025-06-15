
-- Add `highlighted` flag to portfolio_items to indicate projects shown in Recent Works
ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS highlighted boolean DEFAULT false;

-- Add a UI-editable setting to control how many highlighted projects show in Recent Works
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS highlighted_portfolio_limit integer DEFAULT 3;
