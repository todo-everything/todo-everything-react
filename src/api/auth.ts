import { axios } from '~/lib/axios'

import { TokenResponse, UserResponse } from '~/types'
import { AxiosResponse } from 'axios'

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