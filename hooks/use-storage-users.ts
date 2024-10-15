import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { zustandStorage } from '~/utils/zustand-storage'

import type { User } from '~/types/user'

type UsersStore = {
  users: User[]
  setUsers(users: User[]): void
}

export const useStorageUsers = create<UsersStore>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users: User[]) => set({ users }),
    }),
    {
      name: 'zaal-result-app:users',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
