import { httpClientPrivate } from '~/lib/httpClientPrivate'
import {
  fetchUserDetails,
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
  logout,
  RegisterAccountDTO,
  registerWithEmailAndPassword,
} from '~/api/auth'
import { TokenResponse } from '~/types'
import { AxiosResponse } from 'axios'
import memoize from 'memoize'
import { useUserStore } from '~/stores/user'

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'
const ALL_TOKENS = [ACCESS_TOKEN, REFRESH_TOKEN]
const TOKENS: { [key: string]: string } = {
  access: ACCESS_TOKEN,
  refresh: REFRESH_TOKEN,
}

async function handleTokenResponse(
  response: AxiosResponse<TokenResponse>,
): Promise<void> {
  // Do stuff for OK and CREATED responses.
  // i.e. login + register
  if ([200, 201].includes(response.status)) {
    const { refresh, access } = response.data
    AuthApi.setToken('refresh', refresh)
    AuthApi.setToken('access', access)
    const detailsResponse = await fetchUserDetails()
    const updateUser = useUserStore.getState().updateUser
    updateUser(detailsResponse.data)
  }
}

const AuthApi = {
  getAccessToken: () => {
    return localStorage.getItem(ACCESS_TOKEN)
  },
  getToken: (type: string) => {
    if (TOKENS?.[type]) {
      return localStorage.getItem(TOKENS[type])
    }
  },
  getTokens: () => {
    return {
      access: localStorage.getItem(ACCESS_TOKEN),
      refresh: localStorage.getItem(REFRESH_TOKEN),
    }
  },

  setToken: (type: string, value: string) => {
    if (TOKENS?.[type]) {
      return localStorage.setItem(TOKENS[type], value)
    }
  },

  clearToken: (name: string) => {
    const tokenName = TOKENS?.[name]
    if (tokenName) {
      localStorage.removeItem(tokenName)
    }
  },

  clearAllTokens: () => {
    ALL_TOKENS.forEach((token) => localStorage.removeItem(token))
    httpClientPrivate.defaults.headers.common['Authorization'] = null
  },

  registerAccount: async (data: RegisterAccountDTO) => {
    return handleTokenResponse(await registerWithEmailAndPassword(data))
  },

  login: async (data: LoginCredentialsDTO) => {
    return handleTokenResponse(await loginWithEmailAndPassword(data))
  },

  logout: async () => {
    await logout()
    // TODO: Check res status code, etc.

    ALL_TOKENS.forEach((token) => localStorage.removeItem(token))
    httpClientPrivate.defaults.headers.common['Authorization'] = null
  },

  // TODO: Update `memoize` package.
  getUser: memoize(fetchUserDetails, { maxAge: 10000 }),
}

export default AuthApi
