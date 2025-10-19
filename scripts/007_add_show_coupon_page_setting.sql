-- Add show_coupon_page column to widget_settings table
ALTER TABLE widget_settings 
ADD COLUMN show_coupon_page BOOLEAN DEFAULT true;

-- Update existing records to show coupon page by default
UPDATE widget_settings 
SET show_coupon_page = true 
WHERE show_coupon_page IS NULL;

-- Add comment for the new column
COMMENT ON COLUMN widget_settings.show_coupon_page IS 'Controls whether to show coupon page after form submission or redirect directly';
