-- Phase 1: Convert store_lead_stats from VIEW to TABLE
-- This allows us to add columns and use triggers

-- Drop the existing VIEW
DROP VIEW IF EXISTS public.store_lead_stats;

-- Create store_lead_stats as a proper TABLE
CREATE TABLE IF NOT EXISTS public.store_lead_stats (
  store_id uuid PRIMARY KEY REFERENCES public.stores(id) ON DELETE CASCADE,
  store_name text,
  domain text,
  shopify_domain text,
  plan text DEFAULT 'Free',
  installed boolean DEFAULT false,
  total_leads bigint DEFAULT 0,
  leads_this_month bigint DEFAULT 0,
  leads_today bigint DEFAULT 0,
  max_leads integer DEFAULT 50,
  remaining_leads integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_store_lead_stats_shopify_domain ON public.store_lead_stats(shopify_domain);
CREATE INDEX IF NOT EXISTS idx_store_lead_stats_domain ON public.store_lead_stats(domain);

-- Enable RLS
ALTER TABLE public.store_lead_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public reads (needed for widget)
CREATE POLICY "Public read store_lead_stats" ON public.store_lead_stats
  FOR SELECT USING (true);

-- Create RLS policy for admins to update
CREATE POLICY "Admins can update store_lead_stats" ON public.store_lead_stats
  FOR UPDATE USING (true);

-- Populate existing data from stores table
INSERT INTO public.store_lead_stats (
  store_id,
  store_name,
  domain,
  shopify_domain,
  plan,
  installed,
  max_leads,
  created_at,
  updated_at
)
SELECT 
  id,
  name,
  domain,
  shopify_domain,
  COALESCE(plan, 'Free'),
  COALESCE(installed, false),
  CASE 
    WHEN COALESCE(plan, 'Free') = 'Free' THEN 50
    WHEN plan = 'Starter' THEN 600
    WHEN plan = 'Pro' THEN 2000
    ELSE 50
  END,
  COALESCE(created_at, now()),
  COALESCE(updated_at, now())
FROM public.stores
ON CONFLICT (store_id) DO UPDATE SET
  store_name = EXCLUDED.store_name,
  domain = EXCLUDED.domain,
  shopify_domain = EXCLUDED.shopify_domain,
  plan = EXCLUDED.plan,
  installed = EXCLUDED.installed,
  max_leads = EXCLUDED.max_leads,
  updated_at = now();

-- Create function to recalculate lead stats
CREATE OR REPLACE FUNCTION public.recalculate_store_lead_stats(p_store_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_leads bigint;
  v_leads_this_month bigint;
  v_leads_today bigint;
  v_max_leads integer;
  v_remaining_leads integer;
  v_plan text;
BEGIN
  -- Get current plan and max_leads
  SELECT plan, max_leads INTO v_plan, v_max_leads
  FROM public.store_lead_stats
  WHERE store_id = p_store_id;

  -- Count total leads
  SELECT COUNT(*) INTO v_total_leads
  FROM public.leads
  WHERE store_id = p_store_id;

  -- Count leads this month
  SELECT COUNT(*) INTO v_leads_this_month
  FROM public.leads
  WHERE store_id = p_store_id
    AND created_at >= date_trunc('month', CURRENT_TIMESTAMP);

  -- Count leads today
  SELECT COUNT(*) INTO v_leads_today
  FROM public.leads
  WHERE store_id = p_store_id
    AND created_at >= date_trunc('day', CURRENT_TIMESTAMP);

  -- Calculate remaining leads
  v_remaining_leads := GREATEST(v_max_leads - v_leads_this_month, 0);

  -- Update stats table
  UPDATE public.store_lead_stats
  SET 
    total_leads = v_total_leads,
    leads_this_month = v_leads_this_month,
    leads_today = v_leads_today,
    remaining_leads = v_remaining_leads,
    updated_at = now()
  WHERE store_id = p_store_id;
END;
$$;

-- Trigger to auto-sync new stores
CREATE OR REPLACE FUNCTION public.sync_new_store_to_lead_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.store_lead_stats (
    store_id,
    store_name,
    domain,
    shopify_domain,
    plan,
    installed,
    max_leads,
    total_leads,
    leads_this_month,
    leads_today,
    remaining_leads
  ) VALUES (
    NEW.id,
    NEW.name,
    NEW.domain,
    NEW.shopify_domain,
    COALESCE(NEW.plan, 'Free'),
    COALESCE(NEW.installed, false),
    CASE 
      WHEN COALESCE(NEW.plan, 'Free') = 'Free' THEN 50
      WHEN NEW.plan = 'Starter' THEN 600
      WHEN NEW.plan = 'Pro' THEN 2000
      ELSE 50
    END,
    0,
    0,
    0,
    CASE 
      WHEN COALESCE(NEW.plan, 'Free') = 'Free' THEN 50
      WHEN NEW.plan = 'Starter' THEN 600
      WHEN NEW.plan = 'Pro' THEN 2000
      ELSE 50
    END
  )
  ON CONFLICT (store_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_sync_new_store ON public.stores;
CREATE TRIGGER trigger_sync_new_store
  AFTER INSERT ON public.stores
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_new_store_to_lead_stats();

-- Trigger to update lead stats when a new lead is inserted
CREATE OR REPLACE FUNCTION public.update_lead_stats_on_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Recalculate all stats for this store
  PERFORM public.recalculate_store_lead_stats(NEW.store_id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_lead_stats ON public.leads;
CREATE TRIGGER trigger_update_lead_stats
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_lead_stats_on_insert();

-- Initial calculation for all existing stores
DO $$
DECLARE
  store_record RECORD;
BEGIN
  FOR store_record IN SELECT store_id FROM public.store_lead_stats
  LOOP
    PERFORM public.recalculate_store_lead_stats(store_record.store_id);
  END LOOP;
END;
$$;
