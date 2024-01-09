import { create } from 'zustand'
import { IUser } from '~/api/models'

interface UserStore {
  user?: IUser
  updateUser: (data: IUser) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  updateUser: (user) => set(() => ({ user: user })),
}))
