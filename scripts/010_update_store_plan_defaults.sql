-- Update existing stores to have proper plan limits based on their current plan
UPDATE stores 
SET 
  max_leads = CASE 
    WHEN plan = 'Free' THEN 100
    WHEN plan = 'Starter' THEN 1000
    WHEN plan = 'Pro' THEN 999999
    ELSE 100
  END,
  remaining_leads = CASE 
    WHEN plan = 'Free' THEN GREATEST(0, 100 - COALESCE(leads_this_month, 0))
    WHEN plan = 'Starter' THEN GREATEST(0, 1000 - COALESCE(leads_this_month, 0))
    WHEN plan = 'Pro' THEN GREATEST(0, 999999 - COALESCE(leads_this_month, 0))
    ELSE GREATEST(0, 100 - COALESCE(leads_this_month, 0))
  END
WHERE max_leads IS NULL OR max_leads = 0;

-- Create a function to reset monthly lead counts (to be run monthly)
CREATE OR REPLACE FUNCTION reset_monthly_leads()
RETURNS void AS $$
BEGIN
  UPDATE stores 
  SET 
    leads_this_month = 0,
    remaining_leads = max_leads;
END;
$$ LANGUAGE plpgsql;

-- Add a trigger to automatically update lead counts when a new lead is inserted
CREATE OR REPLACE FUNCTION update_store_lead_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE stores 
  SET 
    total_leads = total_leads + 1,
    leads_this_month = leads_this_month + 1,
    remaining_leads = GREATEST(0, remaining_leads - 1)
  WHERE id = NEW.store_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_update_lead_count ON leads;
CREATE TRIGGER trigger_update_lead_count
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_store_lead_count();
