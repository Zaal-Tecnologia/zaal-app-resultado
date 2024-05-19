import { create } from 'zustand'

import type { User } from '~/types/user'

type Props = {
  user: Pick<User, 'userName' | 'userLastName' | 'token'> | null
  setUser(user: Pick<User, 'userName' | 'userLastName' | 'token'> | null): void
}

export const useSession = create<Props>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}))
