-- Update pricing structure to new values
-- Free: 50 leads, Starter: $19/600 leads, Pro: $99/unlimited

-- Update existing Free plan stores
UPDATE stores
SET 
  max_leads = 50,
  remaining_leads = CASE
    WHEN remaining_leads > 50 THEN 50
    ELSE remaining_leads
  END
WHERE plan = 'Free';

-- Update existing Starter plan stores
UPDATE stores
SET 
  max_leads = 600,
  remaining_leads = CASE
    WHEN remaining_leads > 600 THEN 600
    ELSE remaining_leads
  END
WHERE plan = 'Starter';

-- Update existing Pro plan stores to unlimited (NULL)
UPDATE stores
SET 
  max_leads = NULL,
  remaining_leads = NULL
WHERE plan = 'Pro';

-- Update default values for new stores
ALTER TABLE stores 
ALTER COLUMN max_leads SET DEFAULT 50;

ALTER TABLE stores 
ALTER COLUMN remaining_leads SET DEFAULT 50;

-- Add comment explaining the structure
COMMENT ON COLUMN stores.max_leads IS 'Maximum leads per month: 50 for Free, 600 for Starter, NULL for Pro (unlimited)';
COMMENT ON COLUMN stores.remaining_leads IS 'Remaining leads this month: decrements from max_leads, NULL for unlimited plans';
