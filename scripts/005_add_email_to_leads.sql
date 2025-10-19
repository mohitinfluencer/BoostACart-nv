-- Add email field to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS email TEXT;

-- Add widget settings table for better customization
CREATE TABLE IF NOT EXISTS widget_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  heading TEXT DEFAULT 'Get Exclusive Discount!',
  description TEXT DEFAULT 'Leave your details and get 20% off your next order',
  button_text TEXT DEFAULT 'Get My Discount',
  background_color TEXT DEFAULT '#ffffff',
  text_color TEXT DEFAULT '#1f2937',
  button_color TEXT DEFAULT '#3b82f6',
  overlay_opacity DECIMAL DEFAULT 0.8,
  is_active BOOLEAN DEFAULT true,
  show_email BOOLEAN DEFAULT false,
  show_phone BOOLEAN DEFAULT true,
  discount_code TEXT DEFAULT 'SAVE20',
  redirect_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(store_id)
);

-- Add RLS policies for widget_settings
ALTER TABLE widget_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "widget_settings_select_own"
  ON widget_settings FOR SELECT
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()));

CREATE POLICY "widget_settings_insert_own"
  ON widget_settings FOR INSERT
  WITH CHECK (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()));

CREATE POLICY "widget_settings_update_own"
  ON widget_settings FOR UPDATE
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()));

CREATE POLICY "widget_settings_delete_own"
  ON widget_settings FOR DELETE
  USING (store_id IN (SELECT id FROM stores WHERE profile_id = auth.uid()));

-- Create default widget settings for existing stores
INSERT INTO widget_settings (store_id)
SELECT id FROM stores
WHERE id NOT IN (SELECT store_id FROM widget_settings WHERE store_id IS NOT NULL)
ON CONFLICT (store_id) DO NOTHING;
