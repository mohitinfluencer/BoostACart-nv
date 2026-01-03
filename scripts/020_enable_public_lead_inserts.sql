-- Enable public insert access to leads table
-- This allows the widget to submit leads without authentication

-- Enable RLS on leads table if not already enabled
alter table public.leads enable row level security;

-- Drop existing public insert policy if it exists
drop policy if exists "Public insert leads" on public.leads;

-- Create new public insert policy
-- Allows anyone to insert leads (needed for widget form submission)
create policy "Public insert leads"
on public.leads
for insert
with check (true);

-- Verify the policy was created
select schemaname, tablename, policyname, cmd, qual
from pg_policies
where tablename = 'leads'
and policyname = 'Public insert leads';
