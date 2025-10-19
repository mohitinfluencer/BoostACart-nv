-- Update profiles table to include store information
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS store_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS store_domain TEXT;

-- Add RLS policies for profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;

-- Create new policies
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

-- Update stores table to reference profiles
ALTER TABLE stores DROP COLUMN IF EXISTS user_id;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE;

-- Add RLS policies for stores table
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "stores_select_own" ON stores;
DROP POLICY IF EXISTS "stores_insert_own" ON stores;
DROP POLICY IF EXISTS "stores_update_own" ON stores;
DROP POLICY IF EXISTS "stores_delete_own" ON stores;

-- Create new policies
CREATE POLICY "stores_select_own"
  ON stores FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "stores_insert_own"
  ON stores FOR INSERT
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "stores_update_own"
  ON stores FOR UPDATE
  USING (profile_id = auth.uid());

CREATE POLICY "stores_delete_own"
  ON stores FOR DELETE
  USING (profile_id = auth.uid());

-- Add RLS policies for leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "leads_select_own" ON leads;
DROP POLICY IF EXISTS "leads_insert_public" ON leads;

-- Create new policies
CREATE POLICY "leads_select_own"
  ON leads FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()));

CREATE POLICY "leads_insert_public"
  ON leads FOR INSERT
  WITH CHECK (true); -- Allow public insert for widget functionality
