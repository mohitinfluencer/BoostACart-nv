-- Create saved_leads table for separate storage of saved leads
CREATE TABLE IF NOT EXISTS public.saved_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name text,
  email text,
  phone text,
  product_name text,
  detected_product text,
  product_url text,
  status text DEFAULT 'saved',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  saved_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.saved_leads ENABLE ROW LEVEL SECURITY;

-- Create policies for saved_leads
CREATE POLICY "Users can view their saved leads"
  ON public.saved_leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = saved_leads.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their saved leads"
  ON public.saved_leads FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = saved_leads.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their saved leads"
  ON public.saved_leads FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = saved_leads.store_id
      AND stores.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_saved_leads_store_id ON public.saved_leads(store_id);
CREATE INDEX IF NOT EXISTS idx_saved_leads_created_at ON public.saved_leads(created_at DESC);
