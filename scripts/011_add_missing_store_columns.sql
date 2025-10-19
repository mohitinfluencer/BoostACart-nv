-- Add missing columns to stores table that the widget expects
ALTER TABLE stores ADD COLUMN IF NOT EXISTS store_slug text;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS plan text DEFAULT 'Free';
ALTER TABLE stores ADD COLUMN IF NOT EXISTS total_leads integer DEFAULT 0;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS leads_this_month integer DEFAULT 0;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS remaining_leads integer DEFAULT 100;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS max_leads integer DEFAULT 100;

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

-- Function to normalize domain (remove protocols, www, trailing slashes)
CREATE OR REPLACE FUNCTION normalize_domain(domain_input text)
RETURNS text AS $$
BEGIN
  RETURN TRIM(
    LOWER(
      REGEXP_REPLACE(
        REGEXP_REPLACE(domain_input, '^(https?://)?(www\.)?', '', 'i'),
        '/+$', '', 'g'
      )
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Update existing stores with normalized domains and generated slugs
UPDATE stores 
SET 
  domain = normalize_domain(domain),
  store_slug = generate_store_slug(domain)
WHERE domain IS NOT NULL;

-- Ensure monsoonkart.com store exists with proper normalization
INSERT INTO stores (id, name, domain, store_slug, user_id, plan, total_leads, leads_this_month, remaining_leads, max_leads, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  'Monsoon Kart',
  'monsoonkart.com',
  'monsoonkart-com',
  (SELECT id FROM profiles LIMIT 1),
  'Free',
  0,
  0,
  100,
  100,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM stores 
  WHERE domain = 'monsoonkart.com' 
  OR store_slug = 'monsoonkart-com'
  OR store_slug = 'monsoonkart'
);

-- Ensure widget settings exist for monsoonkart store
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
WHERE (s.domain = 'monsoonkart.com' OR s.store_slug = 'monsoonkart-com')
AND NOT EXISTS (
  SELECT 1 FROM widget_settings WHERE store_id = s.id
);

-- Display all stores with their slugs for verification
SELECT 
  name,
  domain,
  store_slug,
  plan,
  remaining_leads,
  max_leads,
  'Widget URL: /widget/' || store_slug as widget_url
FROM stores
ORDER BY created_at DESC;
