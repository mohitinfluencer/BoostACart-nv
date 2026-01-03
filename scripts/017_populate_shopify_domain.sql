-- Migration: Populate shopify_domain column
-- Purpose: Set shopify_domain as the canonical store identifier
-- The domain column becomes metadata only

-- Step 1: Populate shopify_domain from domain for existing stores
UPDATE stores
SET shopify_domain = domain
WHERE shopify_domain IS NULL AND domain IS NOT NULL;

-- Step 2: Add NOT NULL constraint to shopify_domain
ALTER TABLE stores
ALTER COLUMN shopify_domain SET NOT NULL;

-- Step 3: Add unique constraint to shopify_domain
ALTER TABLE stores
ADD CONSTRAINT stores_shopify_domain_unique UNIQUE (shopify_domain);

-- Step 4: Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_stores_shopify_domain ON stores(shopify_domain);

-- Log the migration
DO $$
BEGIN
  RAISE NOTICE 'Migration complete: shopify_domain is now the canonical identifier';
  RAISE NOTICE 'Total stores: %', (SELECT COUNT(*) FROM stores);
  RAISE NOTICE 'Stores with shopify_domain: %', (SELECT COUNT(*) FROM stores WHERE shopify_domain IS NOT NULL);
END$$;
