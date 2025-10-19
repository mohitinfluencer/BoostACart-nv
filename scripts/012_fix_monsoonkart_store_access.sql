-- Fix monsoonkart.com store access for widget
-- This script ensures the store is properly configured and accessible

-- First, let's check if monsoonkart.com store exists
DO $$
BEGIN
  -- Create or update monsoonkart.com store with proper configuration
  INSERT INTO stores (
    id, 
    name, 
    domain, 
    store_slug, 
    user_id, 
    plan, 
    total_leads, 
    leads_this_month, 
    remaining_leads, 
    max_leads, 
    created_at, 
    updated_at
  ) VALUES (
    gen_random_uuid(),
    'Monsoon Kart',
    'monsoonkart.com',
    'monsoonkart-com',
    NULL, -- NULL user_id makes it publicly accessible
    'Free',
    0,
    0,
    100,
    100,
    NOW(),
    NOW()
  )
  ON CONFLICT (domain) DO UPDATE SET
    store_slug = 'monsoonkart-com',
    user_id = NULL, -- Ensure it's publicly accessible
    plan = 'Free',
    remaining_leads = 100,
    max_leads = 100,
    updated_at = NOW();

  RAISE NOTICE 'Monsoon Kart store created/updated successfully';
END $$;

-- Ensure widget settings exist for monsoonkart store
INSERT INTO widget_settings (
  id, 
  store_id, 
  heading, 
  description, 
  button_text, 
  background_color, 
  text_color, 
  button_color, 
  overlay_opacity,
  show_email, 
  show_phone, 
  is_active, 
  discount_code, 
  redirect_url,
  show_coupon_page, 
  created_at, 
  updated_at
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
ON CONFLICT (store_id) DO UPDATE SET
  heading = 'Get Exclusive Discount!',
  description = 'Leave your details and get 20% off your next order',
  button_text = 'Get My Discount',
  is_active = true,
  show_email = true,
  show_phone = true,
  discount_code = 'SAVE20',
  redirect_url = 'https://monsoonkart.com/cart',
  show_coupon_page = true,
  updated_at = NOW();

-- Update RLS policies to allow public access to stores with NULL user_id
DROP POLICY IF EXISTS "Users can view stores" ON stores;
CREATE POLICY "Users can view stores" ON stores
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow public access to widget settings for stores with NULL user_id
DROP POLICY IF EXISTS "Users can view widget settings for their stores" ON widget_settings;
CREATE POLICY "Users can view widget settings for their stores" ON widget_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stores 
      WHERE stores.id = widget_settings.store_id 
      AND (stores.user_id = auth.uid() OR stores.user_id IS NULL)
    )
  );

-- Display the monsoonkart store configuration for verification
SELECT 
  s.name,
  s.domain,
  s.store_slug,
  s.plan,
  s.remaining_leads,
  s.max_leads,
  s.user_id,
  ws.is_active as widget_active,
  ws.heading,
  ws.discount_code,
  'Widget URL: /widget/' || s.store_slug as widget_url
FROM stores s
LEFT JOIN widget_settings ws ON s.id = ws.store_id
WHERE s.domain = 'monsoonkart.com'
ORDER BY s.created_at DESC;

-- Also create alternative access patterns for the widget
INSERT INTO stores (
  id, 
  name, 
  domain, 
  store_slug, 
  user_id, 
  plan, 
  total_leads, 
  leads_this_month, 
  remaining_leads, 
  max_leads, 
  created_at, 
  updated_at
) VALUES (
  gen_random_uuid(),
  'Monsoon Kart (Alt)',
  'monsoonkart',
  'monsoonkart',
  NULL,
  'Free',
  0,
  0,
  100,
  100,
  NOW(),
  NOW()
)
ON CONFLICT (domain) DO NOTHING;

-- Create widget settings for the alternative store entry
INSERT INTO widget_settings (
  id, 
  store_id, 
  heading, 
  description, 
  button_text, 
  background_color, 
  text_color, 
  button_color, 
  overlay_opacity,
  show_email, 
  show_phone, 
  is_active, 
  discount_code, 
  redirect_url,
  show_coupon_page, 
  created_at, 
  updated_at
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
WHERE s.domain = 'monsoonkart' AND s.store_slug = 'monsoonkart'
ON CONFLICT (store_id) DO NOTHING;

-- Show all available stores and their widget URLs
SELECT 
  s.name,
  s.domain,
  s.store_slug,
  s.user_id,
  ws.is_active as widget_active,
  'Widget URL: /widget/' || s.store_slug as widget_url
FROM stores s
LEFT JOIN widget_settings ws ON s.id = ws.store_id
ORDER BY s.name;
