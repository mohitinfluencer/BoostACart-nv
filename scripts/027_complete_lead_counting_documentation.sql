-- ============================================================================
-- BOOSTACART LEAD COUNTING SYSTEM - COMPLETE DOCUMENTATION
-- ============================================================================
-- This script documents the FINAL architecture for accurate lead counting.
-- 
-- PROBLEM: Dashboard, Supabase, and widget show different lead counts
-- CAUSE: Manual counter columns (total_leads, leads_this_month, remaining_leads) 
--        in stores table were incremented manually, causing drift and inaccuracy.
--
-- SOLUTION: Make leads table the single source of truth for all metrics
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PART 1: The store_lead_stats VIEW (Already exists, documented here)
-- ----------------------------------------------------------------------------
-- This VIEW provides real-time statistics calculated directly from the leads table.
-- It guarantees 100% accurate data with no manual counter updates needed.

-- CREATE OR REPLACE VIEW public.store_lead_stats AS
-- SELECT
--   s.id AS store_id,
--   s.name AS store_name,
--   s.plan,
--   s.max_leads,
--   
--   -- All metrics calculated from leads table in real-time
--   COUNT(l.id) AS total_leads,
--   
--   COUNT(CASE 
--     WHEN date_trunc('month', l.created_at) = date_trunc('month', now()) 
--     THEN 1 
--   END) AS leads_this_month,
--   
--   COUNT(CASE 
--     WHEN date_trunc('day', l.created_at) = date_trunc('day', now()) 
--     THEN 1 
--   END) AS leads_today,
--   
--   -- Remaining leads based on MONTHLY usage (resets each month)
--   GREATEST(s.max_leads - COUNT(CASE 
--     WHEN date_trunc('month', l.created_at) = date_trunc('month', now()) 
--     THEN 1 
--   END), 0) AS remaining_leads
--   
-- FROM public.stores s
-- LEFT JOIN public.leads l ON l.store_id = s.id
-- GROUP BY s.id, s.name, s.plan, s.max_leads;

-- ----------------------------------------------------------------------------
-- PART 2: Deprecated columns in stores table
-- ----------------------------------------------------------------------------
-- These columns are NO LONGER USED but remain for backwards compatibility:
-- - total_leads (integer)
-- - leads_this_month (integer)  
-- - remaining_leads (integer)
--
-- They are NOT updated by the application and should be ignored.
-- All queries should calculate from the leads table or use the VIEW instead.

-- ----------------------------------------------------------------------------
-- PART 3: How different parts of the app calculate metrics
-- ----------------------------------------------------------------------------

-- DASHBOARD (app/dashboard/page.tsx)
-- ✅ Calculates from leads table using Supabase count queries:
--    - total_leads: COUNT(*) from leads
--    - leads_this_month: COUNT(*) with date filter
--    - remaining_leads: max_leads - leads_this_month

-- ACCOUNT PAGE (app/dashboard/account/page.tsx)
-- ✅ Calculates from leads table using Supabase count queries:
--    - Same calculation as dashboard
--    - remaining_leads = max_leads - leads_this_month (monthly tracking)

-- WIDGET (app/widget/[store]/page.tsx)
-- ❌ Currently reads stale remaining_leads from stores table
-- 🔧 NEEDS FIX: Should calculate from leads table or use the VIEW

-- API ROUTE (app/api/leads/route.ts)
-- ✅ Just inserts leads, no counter updates

-- ANALYTICS COMPONENT (src/components/LeadsAnalytics.tsx)
-- ✅ Fetches leads and computes metrics client-side

-- ----------------------------------------------------------------------------
-- PART 4: Plan limits and monthly tracking
-- ----------------------------------------------------------------------------
-- FREE PLAN: 50 leads per month
-- STARTER PLAN: 600 leads per month
-- PRO PLAN: Unlimited (999999) leads per month
--
-- Important: remaining_leads = max_leads - leads_this_month
-- This means limits reset monthly, not based on all-time usage.

-- ----------------------------------------------------------------------------
-- PART 5: Benefits of this architecture
-- ----------------------------------------------------------------------------
-- 1. Single source of truth: leads table
-- 2. No manual counter updates = no drift
-- 3. Automatic monthly reset
-- 4. Real-time accuracy across all pages
-- 5. Simple to understand and maintain
-- 6. No race conditions or increment bugs

-- ----------------------------------------------------------------------------
-- PART 6: Migration path (if needed)
-- ----------------------------------------------------------------------------
-- If you want to completely remove deprecated columns:
-- 
-- ALTER TABLE public.stores DROP COLUMN IF EXISTS total_leads;
-- ALTER TABLE public.stores DROP COLUMN IF EXISTS leads_this_month;
-- ALTER TABLE public.stores DROP COLUMN IF EXISTS remaining_leads;
--
-- However, keeping them is fine - they are simply ignored by the app.

-- ============================================================================
-- END OF DOCUMENTATION
-- ============================================================================
