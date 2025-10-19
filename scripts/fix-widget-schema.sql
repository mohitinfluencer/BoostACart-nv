-- Add missing columns to stores table if they don't exist
ALTER TABLE stores
ADD COLUMN IF NOT EXISTS store_slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'Free',
ADD COLUMN IF NOT EXISTS total_leads INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS leads_this_month INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS remaining_leads INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS max_leads INTEGER DEFAULT 100;

-- Create index on store_slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_stores_store_slug ON stores(store_slug);
CREATE INDEX IF NOT EXISTS idx_stores_domain ON stores(domain);

-- Insert test store for monsooncart.com if it doesn't exist
INSERT INTO stores (name, domain, store_slug, plan, total_leads, leads_this_month, remaining_leads, max_leads, created_at, updated_at)
VALUES (
  'Monsoon Cart',
  'monsooncart.com',
  'monsooncart-com',
  'Free',
  0,
  0,
  100,
  100,
  NOW(),
  NOW()
)
ON CONFLICT (domain) DO NOTHING;

-- Get the store ID for widget settings
DO $$
DECLARE
  store_id UUID;
BEGIN
  SELECT id INTO store_id FROM stores WHERE domain = 'monsooncart.com' LIMIT 1;
  
  IF store_id IS NOT NULL THEN
    -- Insert default widget settings if they don't exist
    INSERT INTO widget_settings (
      store_id,
      heading,
      description,
      button_text,
      background_color,
      text_color,
      button_color,
      overlay_opacity,
      is_active,
      show_email,
      show_phone,
      discount_code,
      show_coupon_page,
      created_at,
      updated_at
    )
    VALUES (
      store_id,
      'Get Exclusive Discount!',
      'Leave your details and get 20% off your next order',
      'Get My Discount',
      '#ffffff',
      '#1f2937',
      '#3b82f6',
      0.8,
      true,
      true,
      false,
      'SAVE20',
      true,
      NOW(),
      NOW()
    )
    ON CONFLICT (store_id) DO NOTHING;
  END IF;
END $$;
