-- Create function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Create profile record
  insert into public.profiles (id, email)
  values (
    new.id,
    new.email
  )
  on conflict (id) do nothing;

  -- Create store record if store metadata is provided
  if new.raw_user_meta_data ->> 'store_name' is not null then
    insert into public.stores (id, user_id, name, domain)
    values (
      gen_random_uuid(),
      new.id,
      new.raw_user_meta_data ->> 'store_name',
      new.raw_user_meta_data ->> 'store_domain'
    );
  end if;

  return new;
end;
$$;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger that fires after user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
