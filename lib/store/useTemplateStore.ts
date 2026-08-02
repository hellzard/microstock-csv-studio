import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MetadataTemplate {
  id: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  createdAt: string;
}

interface TemplateState {
  templates: MetadataTemplate[];
  
  // Actions
  createTemplate: (template: Omit<MetadataTemplate, 'id' | 'createdAt'>) => MetadataTemplate;
  updateTemplate: (id: string, updates: Partial<Omit<MetadataTemplate, 'id' | 'createdAt'>>) => void;
  deleteTemplate: (id: string) => void;
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set) => ({
      templates: [
        // Default sample template
        {
          id: 'tpl_default_1',
          name: 'Nature Photography',
          title: 'Beautiful nature landscape outdoors',
          description: 'Scenic view of nature outdoors',
          keywords: ['nature', 'outdoors', 'landscape', 'scenic', 'beautiful', 'environment'],
          createdAt: new Date().toISOString(),
        }
      ],

      createTemplate: (templateData) => {
        const newTemplate: MetadataTemplate = {
          id: `tpl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          ...templateData,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ templates: [newTemplate, ...state.templates] }));
        return newTemplate;
      },

      updateTemplate: (id, updates) => {
        set((state) => ({
          templates: state.templates.map((tpl) =>
            tpl.id === id ? { ...tpl, ...updates } : tpl
          ),
        }));
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((tpl) => tpl.id !== id),
        }));
      },
    }),
    {
      name: 'microstock-template-storage',
    }
  )
);
