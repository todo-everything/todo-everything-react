import { httpClientPrivate } from '~/lib/httpClientPrivate.ts'
import { httpClientPublic } from '~/lib/httpClientPublic.ts'

import { TokenResponse, UserResponse } from '~/types'
import { AxiosResponse } from 'axios'
import { REFRESH_TOKEN } from '~/lib/auth.ts'

interface EmailPasswordDTO {
  email: string
  password: string
}

export interface LoginCredentialsDTO extends EmailPasswordDTO {}

export interface RegisterAccountDTO extends EmailPasswordDTO {}

export const registerWithEmailAndPassword = (
  data: LoginCredentialsDTO,
): Promise<AxiosResponse<TokenResponse>> => {
  return httpClientPublic.post('/register/', data)
}

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO,
): Promise<AxiosResponse<TokenResponse>> => {
  return httpClientPublic.post('/token/', data)
}

export const fetchUserDetails = (): Promise<AxiosResponse<UserResponse>> => {
  return httpClientPrivate.get('/account/me/')
}

export const logout = (): Promise<AxiosResponse> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN)
  return httpClientPrivate.post('/token/blacklist/', {
    refresh: refreshToken,
  })
}
