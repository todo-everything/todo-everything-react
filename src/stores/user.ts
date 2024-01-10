import { create } from 'zustand'
import { IUser } from '~/api/models'

interface UserStore {
  user: IUser | null
  updateUser: (data: IUser) => void
  resetUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user: user })),
  resetUser: () => set(() => ({ user: null })),
}))
