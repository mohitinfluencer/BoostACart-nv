-- Migration: Update pricing plans to new limits
-- Free: 50 leads, Starter: 600 leads ($19), Pro: unlimited ($99)

-- Step 1: Update max_leads for all existing stores based on their plan
UPDATE stores
SET 
  max_leads = CASE
    WHEN plan = 'Free' THEN 50
    WHEN plan = 'Starter' THEN 600
    WHEN plan = 'Pro' THEN 999999
    ELSE 50
  END,
  remaining_leads = CASE
    WHEN plan = 'Free' THEN GREATEST(0, 50 - COALESCE(leads_this_month, 0))
    WHEN plan = 'Starter' THEN GREATEST(0, 600 - COALESCE(leads_this_month, 0))
    WHEN plan = 'Pro' THEN GREATEST(0, 999999 - COALESCE(leads_this_month, 0))
    ELSE GREATEST(0, 50 - COALESCE(leads_this_month, 0))
  END;

-- Step 2: Update the default values for new stores
ALTER TABLE stores 
  ALTER COLUMN max_leads SET DEFAULT 50,
  ALTER COLUMN remaining_leads SET DEFAULT 50;

-- Step 3: Update or create the monthly reset function to use new limits
CREATE OR REPLACE FUNCTION reset_monthly_leads()
RETURNS void AS $$
BEGIN
  UPDATE stores
  SET 
    leads_this_month = 0,
    remaining_leads = CASE
      WHEN plan = 'Free' THEN 50
      WHEN plan = 'Starter' THEN 600
      WHEN plan = 'Pro' THEN 999999
      ELSE 50
    END;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Update the increment function to enforce limits properly
CREATE OR REPLACE FUNCTION increment_store_leads(store_id UUID)
RETURNS void AS $$
DECLARE
  current_remaining INTEGER;
  current_max INTEGER;
BEGIN
  -- Get current values
  SELECT remaining_leads, max_leads INTO current_remaining, current_max
  FROM stores
  WHERE id = store_id;

  -- Only increment if there are remaining leads (Pro plan has high limit)
  IF current_remaining > 0 THEN
    UPDATE stores
    SET 
      total_leads = total_leads + 1,
      leads_this_month = leads_this_month + 1,
      remaining_leads = GREATEST(0, remaining_leads - 1)
    WHERE id = store_id;
  ELSE
    RAISE EXCEPTION 'Monthly lead limit reached for this store';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Add a comment documenting the pricing tiers
COMMENT ON COLUMN stores.max_leads IS 'Maximum leads per month: Free=50, Starter=600, Pro=999999 (unlimited)';
COMMENT ON COLUMN stores.plan IS 'Pricing plan: Free ($0), Starter ($19), Pro ($99)';
