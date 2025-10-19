-- Add product_name and product_url columns to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS product_name TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS product_url TEXT;

-- Update existing records to populate product_name from detected_product
UPDATE leads SET product_name = detected_product WHERE product_name IS NULL AND detected_product IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN leads.product_name IS 'Product name captured from widget form or URL parameters';
COMMENT ON COLUMN leads.product_url IS 'Product URL if available from Shopify or source';
