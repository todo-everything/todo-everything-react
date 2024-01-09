import { create } from 'zustand'
import { AuthUser } from '~/types'

interface UserStore {
  user: AuthUser | null
  updateUser: (data: AuthUser) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user: user })),
}))
