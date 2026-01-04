-- Migration: Add installation tracking fields to stores table
-- Purpose: Track when the widget is successfully installed on a store

-- Add installed boolean field (default false)
ALTER TABLE stores
ADD COLUMN IF NOT EXISTS installed BOOLEAN DEFAULT FALSE;

-- Add installed_at timestamp field
ALTER TABLE stores
ADD COLUMN IF NOT EXISTS installed_at TIMESTAMP WITH TIME ZONE;

-- Add index for faster queries on installed status
CREATE INDEX IF NOT EXISTS idx_stores_installed ON stores(installed);

-- Add comment for documentation
COMMENT ON COLUMN stores.installed IS 'Tracks whether the widget has been successfully installed';
COMMENT ON COLUMN stores.installed_at IS 'Timestamp when the widget was first installed';
