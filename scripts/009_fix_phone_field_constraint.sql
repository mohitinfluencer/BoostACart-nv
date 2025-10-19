-- Fix the phone field constraint to allow NULL values
-- This allows leads to be submitted without phone numbers when the field is disabled

-- Remove NOT NULL constraint from phone field
ALTER TABLE leads ALTER COLUMN phone DROP NOT NULL;

-- Update existing records with empty phone to NULL for consistency
UPDATE leads SET phone = NULL WHERE phone = '' OR phone IS NULL;

-- Add a comment to document the change
COMMENT ON COLUMN leads.phone IS 'Phone number - optional field that can be NULL when not collected';
