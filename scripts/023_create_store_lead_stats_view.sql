-- Create a materialized view for store lead statistics
-- This provides a single source of truth for lead counts

CREATE OR REPLACE VIEW store_lead_stats AS
SELECT
  s.id AS store_id,
  s.name AS store_name,
  s.plan,
  s.max_leads,
  -- Total leads (all time)
  COUNT(l.id) AS total_leads,
  -- Leads this month
  COUNT(l.id) FILTER (
    WHERE l.created_at >= date_trunc('month', CURRENT_TIMESTAMP)
  ) AS leads_this_month,
  -- Leads today
  COUNT(l.id) FILTER (
    WHERE l.created_at >= CURRENT_DATE
  ) AS leads_today,
  -- Remaining leads (based on monthly limit, not total)
  GREATEST(
    s.max_leads - COUNT(l.id) FILTER (
      WHERE l.created_at >= date_trunc('month', CURRENT_TIMESTAMP)
    ),
    0
  ) AS remaining_leads
FROM stores s
LEFT JOIN leads l ON l.store_id = s.id
GROUP BY s.id, s.name, s.plan, s.max_leads;

-- Grant access to authenticated users
GRANT SELECT ON store_lead_stats TO authenticated, anon;

COMMENT ON VIEW store_lead_stats IS 'Real-time lead statistics for each store, calculated directly from the leads table';
