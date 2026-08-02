import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { MasterAsset } from '@/types/master-asset';
import { Project } from '@/types/project';
import { get, set, del } from 'idb-keyval';
import { createClient } from '@/lib/supabase/client';

// Custom storage engine using IndexedDB via idb-keyval
const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface ProjectState {
  projects: Project[];
  assets: MasterAsset[];
  
  // Actions
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<Project>;
  deleteProject: (projectId: string) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
  
  addAssets: (assets: MasterAsset[]) => Promise<void>;
  updateAsset: (assetId: string, updates: Partial<MasterAsset>) => Promise<void>;
  deleteAsset: (assetId: string) => Promise<void>;
  deleteAssetsByProject: (projectId: string) => Promise<void>;
  
  syncFromCloud: () => Promise<void>;
}

// Helper to ensure user is logged in anonymously
async function ensureAuth() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) console.error("Anonymous auth failed:", error.message);
  }
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, getStore) => ({
      projects: [],
      assets: [],

      createProject: async (data) => {
        const newProject: Project = {
          ...data,
          id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'Draft',
        };

        if (newProject.storageMode === 'cloud') {
          await ensureAuth();
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            // Transform to Supabase schema format
            const dbProject = {
              id: newProject.id.length === 36 ? newProject.id : crypto.randomUUID(), // Ensure UUID for Supabase
              user_id: user.id,
              name: newProject.name,
              asset_type: newProject.assetType,
              metadata_language: newProject.metadataLanguage,
              default_copyright: newProject.defaultCopyright,
              generative_ai_default: newProject.generativeAiDefault,
              default_generation_model: newProject.defaultGenerationModel,
              selected_platforms: newProject.selectedPlatforms,
              export_naming_convention: newProject.exportNamingConvention,
              status: newProject.status,
            };
            
            // Assign true UUID back to local project so it links correctly
            newProject.id = dbProject.id;
            
            await supabase.from('projects').insert(dbProject);
          }
        }

        set((state) => ({ projects: [newProject, ...state.projects] }));
        return newProject;
      },

      deleteProject: async (projectId) => {
        const project = getStore().projects.find(p => p.id === projectId);
        if (project?.storageMode === 'cloud') {
          const supabase = createClient();
          await supabase.from('projects').delete().eq('id', projectId);
        }

        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId),
          assets: state.assets.filter((a) => a.projectId !== projectId),
        }));
      },

      updateProject: async (projectId, updates) => {
        const project = getStore().projects.find(p => p.id === projectId);
        if (project?.storageMode === 'cloud') {
          const supabase = createClient();
          
          const dbUpdates: any = {};
          if (updates.name !== undefined) dbUpdates.name = updates.name;
          if (updates.status !== undefined) dbUpdates.status = updates.status;
          if (updates.defaultCopyright !== undefined) dbUpdates.default_copyright = updates.defaultCopyright;
          
          await supabase.from('projects').update(dbUpdates).eq('id', projectId);
        }

        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      addAssets: async (newAssets) => {
        if (newAssets.length === 0) return;
        const projectId = newAssets[0].projectId;
        const project = getStore().projects.find(p => p.id === projectId);

        if (project?.storageMode === 'cloud') {
          await ensureAuth();
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();

          if (user) {
            const dbAssets = newAssets.map(a => {
              // Replace ID with UUID for DB
              const dbId = crypto.randomUUID();
              a.id = dbId;
              
              return {
                id: dbId,
                project_id: projectId,
                user_id: user.id,
                original_filename: a.originalFilename,
                current_filename: a.currentFilename,
                extension: a.extension,
                asset_type: a.assetType,
                mime_type: a.mimeType,
                file_size: a.fileSize,
                title: a.title,
                description: a.description,
                keywords: a.keywords,
                editorial: a.editorial,
                illustration: a.illustration,
                mature_content: a.matureContent,
                generative_ai: a.generativeAi,
                copyright_owner: a.copyrightOwner
              };
            });
            
            await supabase.from('assets').insert(dbAssets);
          }
        }

        set((state) => ({
          assets: [...newAssets, ...state.assets],
        }));
      },

      updateAsset: async (assetId, updates) => {
        const asset = getStore().assets.find(a => a.id === assetId);
        if (!asset) return;
        const project = getStore().projects.find(p => p.id === asset.projectId);
        
        if (project?.storageMode === 'cloud') {
          const supabase = createClient();
          const dbUpdates: any = {};
          if (updates.title !== undefined) dbUpdates.title = updates.title;
          if (updates.description !== undefined) dbUpdates.description = updates.description;
          if (updates.keywords !== undefined) dbUpdates.keywords = updates.keywords;
          if (updates.editorial !== undefined) dbUpdates.editorial = updates.editorial;
          if (updates.generativeAi !== undefined) dbUpdates.generative_ai = updates.generativeAi;
          if (updates.copyrightOwner !== undefined) dbUpdates.copyright_owner = updates.copyrightOwner;
          
          await supabase.from('assets').update(dbUpdates).eq('id', assetId);
        }

        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === assetId
              ? { ...a, ...updates, updatedAt: new Date().toISOString() }
              : a
          ),
        }));
      },

      deleteAsset: async (assetId) => {
        const asset = getStore().assets.find(a => a.id === assetId);
        if (!asset) return;
        const project = getStore().projects.find(p => p.id === asset.projectId);
        
        if (project?.storageMode === 'cloud') {
          const supabase = createClient();
          await supabase.from('assets').delete().eq('id', assetId);
        }

        set((state) => ({
          assets: state.assets.filter((a) => a.id !== assetId),
        }));
      },
      
      deleteAssetsByProject: async (projectId) => {
        const project = getStore().projects.find(p => p.id === projectId);
        if (project?.storageMode === 'cloud') {
          const supabase = createClient();
          await supabase.from('assets').delete().eq('project_id', projectId);
        }

         set((state) => ({
            assets: state.assets.filter((a) => a.projectId !== projectId),
         }));
      },

      syncFromCloud: async () => {
        try {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) return;
          
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          // Fetch cloud projects
          const { data: cloudProjects, error: projectError } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', user.id);

          if (projectError) throw projectError;

          // Fetch cloud assets
          const { data: cloudAssets, error: assetError } = await supabase
            .from('assets')
            .select('*')
            .eq('user_id', user.id);

          if (assetError) throw assetError;

          if (cloudProjects && cloudProjects.length > 0) {
            set((state) => {
              // Merge projects (cloud takes precedence for cloud storage projects)
              const localProjects = [...state.projects];
              const mergedProjects = localProjects.filter(p => p.storageMode !== 'cloud');
              
              const mappedCloudProjects: Project[] = cloudProjects.map(cp => ({
                id: cp.id,
                name: cp.name,
                assetType: cp.asset_type as any,
                metadataLanguage: cp.metadata_language as any,
                defaultCopyright: cp.default_copyright || '',
                generativeAiDefault: cp.generative_ai_default,
                defaultGenerationModel: cp.default_generation_model || '',
                selectedPlatforms: cp.selected_platforms || [],
                exportNamingConvention: cp.export_naming_convention || '',
                status: cp.status as any,
                createdAt: cp.created_at,
                updatedAt: cp.updated_at,
                storageMode: 'cloud'
              }));

              // Merge assets
              const localAssets = [...state.assets];
              const mergedAssets = localAssets.filter(a => {
                const proj = state.projects.find(p => p.id === a.projectId);
                return proj?.storageMode !== 'cloud';
              });

              const mappedCloudAssets: MasterAsset[] = (cloudAssets || []).map(ca => ({
                id: ca.id,
                projectId: ca.project_id,
                originalFilename: ca.original_filename,
                currentFilename: ca.current_filename,
                extension: ca.extension,
                assetType: ca.asset_type as any,
                mimeType: ca.mime_type,
                fileSize: ca.file_size,
                title: ca.title || '',
                description: ca.description || '',
                keywords: ca.keywords || [],
                editorial: ca.editorial,
                illustration: ca.illustration,
                matureContent: ca.mature_content,
                generativeAi: ca.generative_ai,
                aiGeneratedMetadata: false,
                releases: ca.releases || [],
                auditStatus: ca.audit_status as any,
                copyrightOwner: ca.copyright_owner || '',
                createdAt: ca.created_at,
                updatedAt: ca.updated_at
              }));

              return {
                projects: [...mergedProjects, ...mappedCloudProjects],
                assets: [...mergedAssets, ...mappedCloudAssets]
              };
            });
          }
        } catch (error) {
          console.error("Failed to sync from cloud", error);
        }
      },
    }),
    {
      name: 'microstock-project-storage',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
