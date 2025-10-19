-- Check if stores exist and create a default one if needed
DO $$
BEGIN
  -- Check if any stores exist
  IF NOT EXISTS (SELECT 1 FROM stores LIMIT 1) THEN
    -- Create a default store
    INSERT INTO stores (id, name, domain, user_id, created_at, updated_at)
    VALUES (
      gen_random_uuid(),
      'monsson',
      'monsson',
      (SELECT id FROM profiles LIMIT 1), -- Use the first profile as owner
      NOW(),
      NOW()
    );
    
    -- Create default widget settings for the store
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
      created_at,
      updated_at
    )
    VALUES (
      gen_random_uuid(),
      (SELECT id FROM stores WHERE domain = 'monsson'),
      'Get Exclusive Discount',
      'Leave your details and get 20% off your next order',
      'Go',
      '#ffffff',
      '#1f2937',
      '#000000',
      0.8,
      true,
      false,
      true,
      'SAVE20',
      NOW(),
      NOW()
    );
    
    RAISE NOTICE 'Default store "monsson" created successfully';
  ELSE
    RAISE NOTICE 'Stores already exist in the database';
  END IF;
END $$;

-- Show all stores
SELECT 
  s.name,
  s.domain,
  s.created_at,
  ws.heading,
  ws.is_active
FROM stores s
LEFT JOIN widget_settings ws ON s.id = ws.store_id
ORDER BY s.created_at;
