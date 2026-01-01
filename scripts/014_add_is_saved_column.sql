-- Add is_saved column to leads table for saved leads feature
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS is_saved BOOLEAN DEFAULT FALSE;

-- Create index for faster queries on saved leads
CREATE INDEX IF NOT EXISTS idx_leads_is_saved ON leads(store_id, is_saved) WHERE is_saved = TRUE;

-- Add comment
COMMENT ON COLUMN leads.is_saved IS 'Marks whether a lead has been saved by the user for later reference';
