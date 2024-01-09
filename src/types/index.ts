export type AuthUser = {
  id: number
  email: string
  // firstName: string
  // lastName: string
  // bio: string
  // role: 'ADMIN' | 'USER'
}

export type TokenResponse = {
  refresh: string
  access: string
}

export type UserResponse = {
  id: number
  email: string
}
