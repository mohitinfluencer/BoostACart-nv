-- Remove manual lead counter columns from stores table
-- These are now calculated directly from the leads table

-- Note: We're keeping the columns for backwards compatibility
-- but they will no longer be updated automatically

-- Add a comment to the columns to indicate they are deprecated
COMMENT ON COLUMN public.stores.total_leads IS 'DEPRECATED: Use COUNT(*) FROM leads WHERE store_id = stores.id';
COMMENT ON COLUMN public.stores.leads_this_month IS 'DEPRECATED: Use COUNT(*) FROM leads WHERE store_id = stores.id AND created_at >= date_trunc(''month'', NOW())';
COMMENT ON COLUMN public.stores.remaining_leads IS 'DEPRECATED: Calculate as max_leads - total_leads';

-- Optionally, you can drop these columns entirely if you want:
-- ALTER TABLE public.stores DROP COLUMN IF EXISTS total_leads;
-- ALTER TABLE public.stores DROP COLUMN IF EXISTS leads_this_month;
-- ALTER TABLE public.stores DROP COLUMN IF EXISTS remaining_leads;
