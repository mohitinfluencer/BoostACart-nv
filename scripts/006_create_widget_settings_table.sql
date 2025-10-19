-- Create widget_settings table to match dashboard expectations
CREATE TABLE IF NOT EXISTS widget_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE UNIQUE,
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE widget_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for widget_settings (users can manage settings for their stores)
CREATE POLICY "Users can view widget settings for their stores" ON widget_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stores 
      WHERE stores.id = widget_settings.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert widget settings for their stores" ON widget_settings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores 
      WHERE stores.id = widget_settings.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update widget settings for their stores" ON widget_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM stores 
      WHERE stores.id = widget_settings.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete widget settings for their stores" ON widget_settings
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM stores 
      WHERE stores.id = widget_settings.store_id 
      AND stores.user_id = auth.uid()
    )
  );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_widget_settings_store_id ON widget_settings(store_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_widget_settings_updated_at 
    BEFORE UPDATE ON widget_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
