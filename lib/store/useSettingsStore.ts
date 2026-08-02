import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  defaultCopyright: string;
  geminiApiKey: string;
  exportFormat: 'csv' | 'zip';
  theme: 'dark' | 'light' | 'system';
  ftpHost?: string;
  ftpUser?: string;
  ftpPassword?: string;
  
  // Actions
  updateSettings: (updates: Partial<Omit<SettingsState, 'updateSettings'>>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      defaultCopyright: '',
      geminiApiKey: '',
      exportFormat: 'zip',
      theme: 'dark',
      ftpHost: '',
      ftpUser: '',
      ftpPassword: '',

      updateSettings: (updates) => {
        set((state) => ({ ...state, ...updates }));
      },
    }),
    {
      name: 'microstock-settings-storage',
    }
  )
);
