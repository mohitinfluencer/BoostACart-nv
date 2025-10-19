/*
  # Add Demo Data for BoostACart Platform

  1. Demo Stores
    - Demo Store (Starter plan)
    - TechGear Pro (Pro plan) 
    - Fashion Forward (Free plan)
    - Home & Garden Plus (Starter plan)

  2. Widget Settings
    - Custom settings for each store with different themes
    - Various color schemes and messaging

  3. Demo Leads
    - Realistic lead data across all stores
    - Different products and customer information
    - Spread across the last 30 days for analytics
*/

-- Insert demo stores
INSERT INTO stores (id, name, domain, plan, total_leads, leads_this_month, remaining_leads, max_leads, user_id) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Demo Store', 'demo-store.com', 'Starter', 247, 89, 911, 1000, null),
('550e8400-e29b-41d4-a716-446655440002', 'TechGear Pro', 'techgearpro.com', 'Pro', 1543, 234, 999999, 999999, null),
('550e8400-e29b-41d4-a716-446655440003', 'Fashion Forward', 'fashionforward.store', 'Free', 67, 23, 33, 100, null),
('550e8400-e29b-41d4-a716-446655440004', 'Home & Garden Plus', 'homegardenplus.net', 'Starter', 456, 78, 422, 1000, null);

-- Insert widget settings for each store
INSERT INTO widget_settings (store_id, heading, description, button_text, background_color, text_color, button_color, overlay_opacity, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Don''t Miss Out!', 'Enter your details to get an exclusive 20% discount on this item.', 'Get My Discount', '#ffffff', '#1f2937', '#3b82f6', 0.5, true),
('550e8400-e29b-41d4-a716-446655440002', 'Exclusive Tech Deal!', 'Get insider pricing on premium tech products. Limited time offer!', 'Claim Tech Discount', '#f8fafc', '#0f172a', '#10b981', 0.6, true),
('550e8400-e29b-41d4-a716-446655440003', 'Style Alert!', 'Join our VIP list for early access to new collections and exclusive discounts.', 'Get VIP Access', '#fef3c7', '#92400e', '#d97706', 0.4, true),
('550e8400-e29b-41d4-a716-446655440004', 'Transform Your Space', 'Get expert tips and exclusive deals on home improvement products.', 'Get Home Deals', '#ffffff', '#374151', '#6366f1', 0.5, false);

-- Insert demo leads with realistic data spread over the last 30 days
INSERT INTO leads (store_id, name, phone, product, quantity, variant_id, source_url) VALUES
-- Demo Store leads
('550e8400-e29b-41d4-a716-446655440001', 'Alex Johnson', '+1-555-0123', 'Premium Wireless Headphones', 1, 'WH-1000XM4-BLACK', 'https://demo-store.com/products/wireless-headphones'),
('550e8400-e29b-41d4-a716-446655440001', 'Sarah Chen', '+1-555-0124', 'Smart Home Hub', 2, 'SHH-GEN3-WHITE', 'https://demo-store.com/products/smart-home-hub'),
('550e8400-e29b-41d4-a716-446655440001', 'Michael Rodriguez', '+1-555-0125', 'Ergonomic Office Chair', 1, 'EOC-PRO-GRAY', 'https://demo-store.com/products/office-chair'),
('550e8400-e29b-41d4-a716-446655440001', 'Emma Thompson', '+1-555-0126', 'Professional Camera Lens', 1, 'PCL-85MM-F14', 'https://demo-store.com/products/camera-lens'),
('550e8400-e29b-41d4-a716-446655440001', 'James Wilson', '+1-555-0127', 'Organic Skincare Set', 3, 'OSS-COMPLETE', 'https://demo-store.com/products/skincare-set'),
('550e8400-e29b-41d4-a716-446655440001', 'Lisa Anderson', '+1-555-0128', 'Bluetooth Speaker', 1, 'BS-PORTABLE-BLK', 'https://demo-store.com/products/bluetooth-speaker'),
('550e8400-e29b-41d4-a716-446655440001', 'David Kim', '+1-555-0129', 'Gaming Mechanical Keyboard', 1, 'GMK-RGB-BLUE', 'https://demo-store.com/products/gaming-keyboard'),
('550e8400-e29b-41d4-a716-446655440001', 'Rachel Green', '+1-555-0130', 'Stainless Steel Water Bottle', 2, 'SSWB-32OZ-SIL', 'https://demo-store.com/products/water-bottle'),

-- TechGear Pro leads
('550e8400-e29b-41d4-a716-446655440002', 'Kevin Brown', '+1-555-0131', 'Gaming Laptop RTX 4080', 1, 'GL-RTX4080-15', 'https://techgearpro.com/products/gaming-laptop'),
('550e8400-e29b-41d4-a716-446655440002', 'Amanda Davis', '+1-555-0132', '4K Webcam Pro', 1, '4KWC-PRO-USB3', 'https://techgearpro.com/products/4k-webcam'),
('550e8400-e29b-41d4-a716-446655440002', 'Ryan Miller', '+1-555-0133', 'Wireless Charging Pad', 2, 'WCP-15W-BLACK', 'https://techgearpro.com/products/wireless-charger'),
('550e8400-e29b-41d4-a716-446655440002', 'Jessica Taylor', '+1-555-0134', 'USB-C Hub 7-in-1', 1, 'USBCH-7IN1-GRY', 'https://techgearpro.com/products/usb-c-hub'),
('550e8400-e29b-41d4-a716-446655440002', 'Mark Garcia', '+1-555-0135', 'Mechanical Gaming Mouse', 1, 'MGM-RGB-12K', 'https://techgearpro.com/products/gaming-mouse'),
('550e8400-e29b-41d4-a716-446655440002', 'Nicole Martinez', '+1-555-0136', 'Noise Cancelling Earbuds', 1, 'NCE-PRO-WHITE', 'https://techgearpro.com/products/earbuds'),

-- Fashion Forward leads
('550e8400-e29b-41d4-a716-446655440003', 'Chris Lee', '+1-555-0137', 'Designer Handbag', 1, 'DH-LEATHER-BRN', 'https://fashionforward.store/products/designer-handbag'),
('550e8400-e29b-41d4-a716-446655440003', 'Ashley White', '+1-555-0138', 'Silk Scarf Collection', 2, 'SSC-FLORAL-MIX', 'https://fashionforward.store/products/silk-scarves'),
('550e8400-e29b-41d4-a716-446655440003', 'Brandon Clark', '+1-555-0139', 'Premium Denim Jeans', 1, 'PDJ-SLIM-32W', 'https://fashionforward.store/products/premium-jeans'),
('550e8400-e29b-41d4-a716-446655440003', 'Megan Hall', '+1-555-0140', 'Cashmere Sweater', 1, 'CS-VNECK-NAVY', 'https://fashionforward.store/products/cashmere-sweater'),

-- Home & Garden Plus leads
('550e8400-e29b-41d4-a716-446655440004', 'Tyler Young', '+1-555-0141', 'Smart Garden System', 1, 'SGS-HYDRO-12', 'https://homegardenplus.net/products/smart-garden'),
('550e8400-e29b-41d4-a716-446655440004', 'Samantha King', '+1-555-0142', 'Outdoor Furniture Set', 1, 'OFS-TEAK-4PC', 'https://homegardenplus.net/products/outdoor-furniture'),
('550e8400-e29b-41d4-a716-446655440004', 'Daniel Wright', '+1-555-0143', 'LED Grow Lights', 3, 'LGL-FULL-SPEC', 'https://homegardenplus.net/products/grow-lights'),
('550e8400-e29b-41d4-a716-446655440004', 'Jennifer Lopez', '+1-555-0144', 'Automatic Sprinkler System', 1, 'ASS-SMART-ZONE', 'https://homegardenplus.net/products/sprinkler-system');

-- Add more recent leads for better analytics (last 7 days)
INSERT INTO leads (store_id, name, phone, product, quantity, variant_id, source_url, created_at) VALUES
-- Recent Demo Store leads
('550e8400-e29b-41d4-a716-446655440001', 'Sophie Turner', '+1-555-0201', 'Premium Wireless Headphones', 1, 'WH-1000XM4-SILVER', 'https://demo-store.com/products/wireless-headphones', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440001', 'Jake Morrison', '+1-555-0202', 'Smart Home Hub', 1, 'SHH-GEN3-BLACK', 'https://demo-store.com/products/smart-home-hub', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440001', 'Maya Patel', '+1-555-0203', 'Bluetooth Speaker', 2, 'BS-PORTABLE-RED', 'https://demo-store.com/products/bluetooth-speaker', NOW() - INTERVAL '2 days'),
('550e8400-e29b-41d4-a716-446655440001', 'Connor Walsh', '+1-555-0204', 'Gaming Mechanical Keyboard', 1, 'GMK-RGB-RED', 'https://demo-store.com/products/gaming-keyboard', NOW() - INTERVAL '3 days'),
('550e8400-e29b-41d4-a716-446655440001', 'Zoe Campbell', '+1-555-0205', 'Organic Skincare Set', 1, 'OSS-TRAVEL', 'https://demo-store.com/products/skincare-set', NOW() - INTERVAL '4 days'),

-- Recent TechGear Pro leads
('550e8400-e29b-41d4-a716-446655440002', 'Ethan Parker', '+1-555-0206', 'Gaming Laptop RTX 4080', 1, 'GL-RTX4080-17', 'https://techgearpro.com/products/gaming-laptop', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440002', 'Olivia Reed', '+1-555-0207', '4K Webcam Pro', 1, '4KWC-PRO-USB3', 'https://techgearpro.com/products/4k-webcam', NOW() - INTERVAL '2 days'),
('550e8400-e29b-41d4-a716-446655440002', 'Lucas Bennett', '+1-555-0208', 'Mechanical Gaming Mouse', 1, 'MGM-RGB-16K', 'https://techgearpro.com/products/gaming-mouse', NOW() - INTERVAL '3 days'),

-- Recent Fashion Forward leads
('550e8400-e29b-41d4-a716-446655440003', 'Isabella Cruz', '+1-555-0209', 'Designer Handbag', 1, 'DH-LEATHER-BLACK', 'https://fashionforward.store/products/designer-handbag', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440003', 'Noah Foster', '+1-555-0210', 'Premium Denim Jeans', 1, 'PDJ-STRAIGHT-34W', 'https://fashionforward.store/products/premium-jeans', NOW() - INTERVAL '2 days'),

-- Recent Home & Garden Plus leads
('550e8400-e29b-41d4-a716-446655440004', 'Ava Mitchell', '+1-555-0211', 'Smart Garden System', 1, 'SGS-HYDRO-24', 'https://homegardenplus.net/products/smart-garden', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440004', 'Mason Torres', '+1-555-0212', 'LED Grow Lights', 2, 'LGL-FULL-SPEC-PRO', 'https://homegardenplus.net/products/grow-lights', NOW() - INTERVAL '3 days');
