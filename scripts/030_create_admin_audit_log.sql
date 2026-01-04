-- Create admin_audit_logs table to track all admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES public.stores(id) ON DELETE CASCADE,
  store_name text,
  action_type text NOT NULL, -- 'plan_change', 'max_leads_change', etc.
  old_value text,
  new_value text,
  changed_by text DEFAULT 'admin',
  changed_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_store_id ON public.admin_audit_logs(store_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_changed_at ON public.admin_audit_logs(changed_at DESC);

-- Enable RLS (only admins should see audit logs)
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for admin access
CREATE POLICY "Admins can view audit logs" ON public.admin_audit_logs
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert audit logs" ON public.admin_audit_logs
  FOR INSERT WITH CHECK (true);
