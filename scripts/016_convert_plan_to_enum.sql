-- Convert plan column to use CHECK constraint for ENUM-like behavior
-- First ensure all existing plans are valid
UPDATE public.stores 
SET plan = 'Free' 
WHERE plan NOT IN ('Free', 'Starter', 'Pro') OR plan IS NULL;

-- Add CHECK constraint to enforce ENUM values
ALTER TABLE public.stores 
DROP CONSTRAINT IF EXISTS stores_plan_check;

ALTER TABLE public.stores 
ADD CONSTRAINT stores_plan_check 
CHECK (plan IN ('Free', 'Starter', 'Pro'));

-- Set default value
ALTER TABLE public.stores 
ALTER COLUMN plan SET DEFAULT 'Free';
