-- Add store_slug column to stores table for URL-friendly lookups
ALTER TABLE stores ADD COLUMN IF NOT EXISTS store_slug text;

-- Create unique index on store_slug for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_stores_store_slug ON stores(store_slug);

-- Function to generate URL-friendly slug from domain
CREATE OR REPLACE FUNCTION generate_store_slug(domain_input text)
RETURNS text AS $$
BEGIN
  -- Remove protocol, www, and convert to lowercase
  -- Replace dots and special characters with hyphens
  -- Remove trailing hyphens
  RETURN TRIM(BOTH '-' FROM 
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        LOWER(
          REGEXP_REPLACE(domain_input, '^(https?://)?(www\.)?', '', 'i')
        ), 
        '[^a-z0-9]+', '-', 'g'
      ), 
      '-+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Update existing stores with generated slugs
UPDATE stores 
SET store_slug = generate_store_slug(domain) 
WHERE store_slug IS NULL AND domain IS NOT NULL;

-- Insert default store if none exists
INSERT INTO stores (id, name, domain, store_slug, user_id, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  'Monsoon Store',
  'monsoonkart.com',
  'monsoonkart',
  (SELECT id FROM profiles LIMIT 1),
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM stores WHERE domain = 'monsoonkart.com' OR store_slug = 'monsoonkart');

-- Insert default widget settings for the store if none exists
INSERT INTO widget_settings (
  id, store_id, heading, description, button_text, 
  background_color, text_color, button_color, 
  is_active, overlay_opacity, show_email, show_phone, 
  discount_code, redirect_url, created_at, updated_at
)
SELECT 
  gen_random_uuid(),
  s.id,
  'Get Exclusive Discount',
  'Leave your details and get 20% off your next order',
  'Get My Discount',
  '#ffffff',
  '#1f2937',
  '#3b82f6',
  true,
  0.8,
  false,
  true,
  'SAVE20',
  'https://monsoonkart.com/cart',
  NOW(),
  NOW()
FROM stores s
WHERE (s.domain = 'monsoonkart.com' OR s.store_slug = 'monsoonkart')
AND NOT EXISTS (
  SELECT 1 FROM widget_settings ws WHERE ws.store_id = s.id
);

-- Display all stores with their slugs for verification
SELECT 
  name,
  domain,
  store_slug,
  created_at
FROM stores
ORDER BY created_at DESC;
