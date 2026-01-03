-- Enable public read access to widget_settings table
-- This allows the widget to load customization settings without authentication

-- Enable RLS on widget_settings table if not already enabled
alter table public.widget_settings enable row level security;

-- Drop existing public read policy if it exists
drop policy if exists "Public read widget_settings" on public.widget_settings;

-- Create new public read policy
-- Allows anyone to read widget settings (needed for widget to load)
create policy "Public read widget_settings"
on public.widget_settings
for select
using (true);

-- Verify the policy was created
select schemaname, tablename, policyname, cmd, qual
from pg_policies
where tablename = 'widget_settings'
and policyname = 'Public read widget_settings';
