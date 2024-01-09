import { axios } from '~/lib/axios'

import { TokenResponse, UserResponse } from '~/types'
import { AxiosResponse } from 'axios'
import { REFRESH_TOKEN } from '~/lib/auth.ts'

export type LoginCredentialsDTO = {
  email: string
  password: string
}

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO,
): Promise<AxiosResponse<TokenResponse>> => {
  return axios.post('/token/', data)
}

export const fetchUserDetails = (): Promise<AxiosResponse<UserResponse>> => {
  return axios.get('/account/me/')
}

export const logout = (): Promise<AxiosResponse> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN)
  return axios.post('/token/blacklist/', {
    refresh: refreshToken,
  })
}
