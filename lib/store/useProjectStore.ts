import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MasterAsset } from '@/types/master-asset';

export interface Project {
  id: string;
  name: string;
  defaultCopyright?: string;
  createdAt: string;
  status: 'Draft' | 'Ready' | 'Exported';
}

interface ProjectState {
  projects: Project[];
  assets: MasterAsset[];
  
  // Actions
  createProject: (name: string, defaultCopyright?: string) => Project;
  deleteProject: (projectId: string) => void;
  updateProjectStatus: (projectId: string, status: Project['status']) => void;
  
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

      createProject: (name, defaultCopyright) => {
        const newProject: Project = {
          id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          name,
          defaultCopyright,
          createdAt: new Date().toISOString(),
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

      updateProjectStatus: (projectId, status) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, status } : p
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
    }
  )
);
