-- Create profiles table for user management
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles policies
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create stores table
create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  domain text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on stores
alter table public.stores enable row level security;

-- Stores policies
create policy "stores_select_own"
  on public.stores for select
  using (auth.uid() = user_id);

create policy "stores_insert_own"
  on public.stores for insert
  with check (auth.uid() = user_id);

create policy "stores_update_own"
  on public.stores for update
  using (auth.uid() = user_id);

create policy "stores_delete_own"
  on public.stores for delete
  using (auth.uid() = user_id);

-- Create leads table
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  detected_product text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on leads
alter table public.leads enable row level security;

-- Leads policies (users can only see leads from their own stores)
create policy "leads_select_own_store"
  on public.leads for select
  using (
    exists (
      select 1 from public.stores 
      where stores.id = leads.store_id 
      and stores.user_id = auth.uid()
    )
  );

create policy "leads_insert_own_store"
  on public.leads for insert
  with check (
    exists (
      select 1 from public.stores 
      where stores.id = leads.store_id 
      and stores.user_id = auth.uid()
    )
  );

-- Allow public insert for widget (we'll handle this with service role)
create policy "leads_insert_public"
  on public.leads for insert
  with check (true);
