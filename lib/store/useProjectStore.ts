import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { MasterAsset } from '@/types/master-asset';
import { Project } from '@/types/project';
import { get, set, del } from 'idb-keyval';

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
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Project;
  deleteProject: (projectId: string) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  
  addAssets: (assets: MasterAsset[]) => void;
  updateAsset: (assetId: string, updates: Partial<MasterAsset>) => void;
  deleteAsset: (assetId: string) => void;
  deleteAssetsByProject: (projectId: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      assets: [],

      createProject: (data) => {
        const newProject: Project = {
          ...data,
          id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'Draft',
        };
        set((state) => ({ projects: [newProject, ...state.projects] }));
        return newProject;
      },

      deleteProject: (projectId) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId),
          assets: state.assets.filter((a) => a.projectId !== projectId),
        }));
      },

      updateProject: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      addAssets: (newAssets) => {
        set((state) => ({
          assets: [...newAssets, ...state.assets],
        }));
      },

      updateAsset: (assetId, updates) => {
        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === assetId
              ? { ...a, ...updates, updatedAt: new Date().toISOString() }
              : a
          ),
        }));
      },

      deleteAsset: (assetId) => {
        set((state) => ({
          assets: state.assets.filter((a) => a.id !== assetId),
        }));
      },
      
      deleteAssetsByProject: (projectId) => {
         set((state) => ({
            assets: state.assets.filter((a) => a.projectId !== projectId),
         }));
      },
    }),
    {
      name: 'microstock-project-storage',
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
