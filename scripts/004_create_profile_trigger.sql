-- Create trigger to auto-create profile and store on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, store_name, store_domain)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'store_name', null),
    COALESCE(new.raw_user_meta_data ->> 'store_domain', null)
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert into stores table if store data exists
  IF (new.raw_user_meta_data ->> 'store_name') IS NOT NULL AND 
     (new.raw_user_meta_data ->> 'store_domain') IS NOT NULL THEN
    INSERT INTO public.stores (profile_id, name, domain)
    VALUES (
      new.id,
      new.raw_user_meta_data ->> 'store_name',
      new.raw_user_meta_data ->> 'store_domain'
    )
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN new;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
