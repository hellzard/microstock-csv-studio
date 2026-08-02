import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  defaultCopyright: string;
  exportFormat: 'csv' | 'zip';
  theme: 'dark' | 'light' | 'system';
  
  // Actions
  updateSettings: (updates: Partial<Omit<SettingsState, 'updateSettings'>>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      defaultCopyright: '',
      exportFormat: 'zip',
      theme: 'dark',

      updateSettings: (updates) => {
        set((state) => ({ ...state, ...updates }));
      },
    }),
    {
      name: 'microstock-settings-storage',
    }
  )
);
