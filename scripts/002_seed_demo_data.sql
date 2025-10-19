-- Insert demo stores (these will be visible to all users for demo purposes)
INSERT INTO stores (id, name, domain, plan, total_leads, leads_this_month, remaining_leads, max_leads, user_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'TechGadgets Pro', 'techgadgets.com', 'Pro', 1247, 89, 911, 1000, null),
  ('550e8400-e29b-41d4-a716-446655440002', 'Fashion Forward', 'fashionforward.store', 'Starter', 456, 34, 166, 200, null),
  ('550e8400-e29b-41d4-a716-446655440003', 'Home Essentials', 'homeessentials.shop', 'Free', 78, 12, 22, 100, null)
ON CONFLICT (id) DO NOTHING;

-- Insert demo leads
INSERT INTO leads (store_id, name, phone, product, quantity, variant_id, source_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'John Smith', '+1234567890', 'Wireless Headphones', 1, 'var_123', 'https://techgadgets.com/headphones'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Sarah Johnson', '+1987654321', 'Smart Watch', 2, 'var_456', 'https://techgadgets.com/watch'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Mike Davis', '+1122334455', 'Summer Dress', 1, 'var_789', 'https://fashionforward.store/dress'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Emily Wilson', '+1555666777', 'Coffee Maker', 1, 'var_101', 'https://homeessentials.shop/coffee')
ON CONFLICT DO NOTHING;

-- Update demo policies to allow viewing demo stores
DROP POLICY IF EXISTS "Users can view their own stores" ON stores;
CREATE POLICY "Users can view stores" ON stores
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can view leads for their stores" ON leads;
CREATE POLICY "Users can view leads for stores" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stores 
      WHERE stores.id = leads.store_id 
      AND (stores.user_id = auth.uid() OR stores.user_id IS NULL)
    )
  );
