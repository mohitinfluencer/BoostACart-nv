-- Migration: Add identity columns to store_lead_stats VIEW
-- Purpose: Add domain and shopify_domain columns to support unified store lookup
-- Date: 2025

-- Drop the existing VIEW
DROP VIEW IF EXISTS store_lead_stats;

-- Recreate VIEW with additional columns
CREATE OR REPLACE VIEW store_lead_stats AS
SELECT
  s.id AS store_id,
  s.name AS store_name,
  s.domain,
  s.shopify_domain,
  s.plan,
  s.max_leads,
  -- Total leads (all time)
  COUNT(l.id) AS total_leads,
  -- Leads this month
  COUNT(l.id) FILTER (
    WHERE l.created_at >= date_trunc('month', CURRENT_DATE)
  ) AS leads_this_month,
  -- Leads today
  COUNT(l.id) FILTER (
    WHERE l.created_at >= CURRENT_DATE
  ) AS leads_today,
  -- Remaining leads (monthly limit - monthly usage)
  GREATEST(
    s.max_leads - COUNT(l.id) FILTER (
      WHERE l.created_at >= date_trunc('month', CURRENT_DATE)
    ),
    0
  ) AS remaining_leads
FROM stores s
LEFT JOIN leads l ON l.store_id = s.id
GROUP BY s.id, s.name, s.domain, s.shopify_domain, s.plan, s.max_leads;

-- Grant public read access to the VIEW
GRANT SELECT ON store_lead_stats TO anon, authenticated;

-- Explanation:
-- This VIEW provides real-time lead statistics for each store
-- It replaces the need for manual counter updates in the stores table
-- All metrics are calculated directly from the leads table
-- Monthly limits are enforced using leads_this_month, not total_leads
