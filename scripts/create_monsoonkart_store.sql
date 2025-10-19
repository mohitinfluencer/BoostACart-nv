-- Create the monsoonkart.com store
INSERT INTO stores (
  id,
  name,
  domain,
  store_slug,
  user_id,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Monsoon Kart',
  'monsoonkart.com',
  'monsoonkart-com',
  (SELECT id FROM profiles LIMIT 1), -- Use the first available user
  NOW(),
  NOW()
);

-- Create widget settings for the store
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
  is_active,
  show_email,
  show_phone,
  discount_code,
  show_coupon_page,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM stores WHERE domain = 'monsoonkart.com'),
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
  true,
  NOW(),
  NOW()
);
