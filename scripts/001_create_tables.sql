-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('Free', 'Starter', 'Pro')),
  total_leads INTEGER DEFAULT 0,
  leads_this_month INTEGER DEFAULT 0,
  remaining_leads INTEGER DEFAULT 100,
  max_leads INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Widget settings as JSONB
  widget_settings JSONB DEFAULT '{
    "heading": "Don'\''t miss out!",
    "description": "Get notified when this item is back in stock",
    "buttonText": "Notify Me",
    "backgroundColor": "#ffffff",
    "textColor": "#000000",
    "buttonColor": "#3b82f6",
    "overlayOpacity": 0.8,
    "isActive": true
  }'::jsonb
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  product TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  variant_id TEXT,
  source_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for stores
CREATE POLICY "Users can view their own stores" ON stores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stores" ON stores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stores" ON stores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stores" ON stores
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for leads (users can see leads for their stores)
CREATE POLICY "Users can view leads for their stores" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stores 
      WHERE stores.id = leads.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stores_user_id ON stores(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_store_id ON leads(store_id);
CREATE INDEX IF NOT EXISTS idx_leads_timestamp ON leads(timestamp);
