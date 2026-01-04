-- Document the lead counting system architecture
-- This script explains how BoostACart counts leads in real-time

/*
  LEAD COUNTING SYSTEM
  ====================
  
  Single Source of Truth: public.leads table
  
  All lead counts are calculated in real-time by querying the leads table:
  - total_leads = COUNT(*) WHERE store_id = X
  - leads_this_month = COUNT(*) WHERE store_id = X AND created_at >= start of month
  - leads_today = COUNT(*) WHERE store_id = X AND created_at >= start of today
  
  Plan Limits:
  - Free: 50 leads/month
  - Starter: 600 leads/month
  - Pro: Unlimited (999999)
  
  Remaining Leads Calculation:
  remaining_leads = max_leads - leads_this_month
  
  Deprecated Columns (kept for backwards compatibility):
  - stores.total_leads (not used, may be stale)
  - stores.leads_this_month (not used, may be stale)
  - stores.remaining_leads (not used, may be stale)
  
  Database View:
  - store_lead_stats VIEW provides pre-calculated stats for performance
  - Can be queried instead of running COUNT queries every time
  
  Widget Behavior:
  - Before form submission, check: leads_this_month < max_leads
  - If limit reached, show: "Lead limit reached. Upgrade plan to continue."
  - On successful submission, only INSERT into leads table
  - Do NOT manually update counter columns
  
  Dashboard Display:
  - All pages query leads table directly for accurate counts
  - Uses Supabase .count() with filters for performance
  - Real-time updates via Supabase realtime subscriptions (optional)
*/

-- No actual schema changes needed, this is documentation only
SELECT 'Lead counting system documented' AS status;
