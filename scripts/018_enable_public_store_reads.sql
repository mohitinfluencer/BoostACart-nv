-- Enable public read access to stores table for widget
-- This allows the widget to look up store settings without authentication

-- Enable RLS on stores table if not already enabled
alter table public.stores enable row level security;

-- Drop existing public read policy if it exists
drop policy if exists "Public read stores" on public.stores;

-- Create new public read policy
-- Allows anyone to read store information (needed for widget to load)
create policy "Public read stores"
on public.stores
for select
using (true);

-- Verify the policy was created
select schemaname, tablename, policyname, cmd, qual
from pg_policies
where tablename = 'stores'
and policyname = 'Public read stores';
