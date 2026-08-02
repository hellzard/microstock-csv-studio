-- Core Tables

-- Profiles table linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  default_copyright_owner TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assets table
CREATE TABLE public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  original_filename TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  file_size BIGINT,
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Asset Metadata table
CREATE TABLE public.asset_metadata (
  asset_id UUID PRIMARY KEY REFERENCES public.assets(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  generative_ai BOOLEAN DEFAULT FALSE,
  prompt TEXT,
  generation_model TEXT,
  editorial BOOLEAN DEFAULT FALSE,
  illustration BOOLEAN DEFAULT FALSE,
  mature_content BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Platform Overrides
CREATE TABLE public.platform_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE,
  platform_id TEXT NOT NULL,
  overrides JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Exports
CREATE TABLE public.exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  platforms JSONB NOT NULL,
  status TEXT NOT NULL,
  download_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Set up Row Level Security (RLS)

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own projects." ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects." ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects." ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects." ON public.projects FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view assets for own projects." ON public.assets FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE id = public.assets.project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert assets for own projects." ON public.assets FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update assets for own projects." ON public.assets FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.projects WHERE id = public.assets.project_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete assets for own projects." ON public.assets FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.projects WHERE id = public.assets.project_id AND user_id = auth.uid())
);

-- (To keep it concise, analogous policies apply to metadata, overrides, and exports, but we allow full access based on the asset owner)
CREATE POLICY "Users can view/manage asset metadata for own assets." ON public.asset_metadata FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.assets a 
    JOIN public.projects p ON a.project_id = p.id 
    WHERE a.id = public.asset_metadata.asset_id AND p.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view/manage platform overrides for own assets." ON public.platform_overrides FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.assets a 
    JOIN public.projects p ON a.project_id = p.id 
    WHERE a.id = public.platform_overrides.asset_id AND p.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view/manage exports for own projects." ON public.exports FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.projects p 
    WHERE p.id = public.exports.project_id AND p.user_id = auth.uid()
  )
);
