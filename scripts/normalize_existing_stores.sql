-- Normalize existing store domains and ensure proper slugs
-- This script ensures backwards compatibility while fixing normalization

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

-- Update existing stores to have normalized domains
UPDATE stores 
SET domain = normalize_domain(domain)
WHERE domain != normalize_domain(domain);

-- Update store slugs using the existing generate_store_slug function
UPDATE stores 
SET store_slug = generate_store_slug(domain)
WHERE store_slug IS NULL OR store_slug != generate_store_slug(domain);

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

-- Display normalized stores for verification
SELECT 
  name,
  domain,
  store_slug,
  'Widget URL: /widget/' || store_slug as widget_url
FROM stores
ORDER BY created_at DESC;
