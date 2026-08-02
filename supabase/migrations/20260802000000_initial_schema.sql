-- Supabase Schema for BuatinCSV (Cloud Sync Mode)

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  asset_type text,
  metadata_language text,
  default_copyright text,
  generative_ai_default boolean DEFAULT false,
  default_generation_model text,
  selected_platforms text[] DEFAULT '{}',
  export_naming_convention text,
  status text NOT NULL DEFAULT 'Draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS public.assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_filename text NOT NULL,
  current_filename text NOT NULL,
  extension text NOT NULL,
  asset_type text NOT NULL,
  mime_type text NOT NULL,
  file_size bigint NOT NULL,
  title text,
  description text,
  keywords text[] DEFAULT '{}',
  editorial boolean DEFAULT false,
  illustration boolean DEFAULT false,
  mature_content boolean DEFAULT false,
  generative_ai boolean DEFAULT false,
  releases text[] DEFAULT '{}',
  audit_status text DEFAULT 'Warning',
  copyright_owner text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Policies for projects
CREATE POLICY "Users can insert their own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for assets
CREATE POLICY "Users can insert their own assets"
  ON public.assets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own assets"
  ON public.assets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own assets"
  ON public.assets FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assets"
  ON public.assets FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS projects_user_id_idx ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS assets_project_id_idx ON public.assets(project_id);
CREATE INDEX IF NOT EXISTS assets_user_id_idx ON public.assets(user_id);

-- Functions and Triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_modtime
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_assets_modtime
BEFORE UPDATE ON public.assets
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
