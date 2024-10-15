import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '~/utils/zustand-storage'

type ThemeStore = {
  theme: string | undefined
  setTheme(theme: string | undefined): void
}

export const useStorageTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme: string | undefined) => set({ theme }),
    }),
    {
      name: 'zaal-result-theme',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
