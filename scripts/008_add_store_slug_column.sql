-- Add store_slug column to stores table
ALTER TABLE stores ADD COLUMN IF NOT EXISTS store_slug TEXT;

-- Create unique index on store_slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_stores_store_slug ON stores(store_slug);

-- Update existing stores to have slugs based on their domain
UPDATE stores 
SET store_slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(domain, '^(https?://)?(www\.)?', ''), 
    '[^a-z0-9]+', '-', 'g'
  )
)
WHERE store_slug IS NULL;

-- Insert a demo store for monsoonkart.com if it doesn't exist
INSERT INTO stores (id, user_id, name, domain, store_slug, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  (SELECT id FROM profiles LIMIT 1), -- Use first available user
  'Monsoon Kart',
  'monsoonkart.com',
  'monsoonkart-com',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM stores WHERE domain = 'monsoonkart.com' OR store_slug = 'monsoonkart-com'
);

-- Insert default widget settings for the new store
INSERT INTO widget_settings (
  id, store_id, heading, description, button_text, 
  background_color, text_color, button_color, overlay_opacity,
  show_email, show_phone, is_active, discount_code, redirect_url,
  show_coupon_page, created_at, updated_at
)
SELECT 
  gen_random_uuid(),
  s.id,
  'Get Exclusive Discount!',
  'Leave your details and get 20% off your next order',
  'Get My Discount',
  '#ffffff',
  '#1f2937',
  '#3b82f6',
  0.8,
  true,
  true,
  true,
  'SAVE20',
  'https://monsoonkart.com/cart',
  true,
  NOW(),
  NOW()
FROM stores s
WHERE s.domain = 'monsoonkart.com'
AND NOT EXISTS (
  SELECT 1 FROM widget_settings WHERE store_id = s.id
);
