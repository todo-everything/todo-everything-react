import { axios } from '~/lib/axios'
import {
  fetchUserDetails,
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
} from '~/api/auth'
import { AuthUser, TokenResponse, UserResponse } from '~/types'
import { AxiosResponse } from 'axios'
import memoize from 'memoize'
import { useUserStore } from '~/stores/user.ts'

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'
const ALL_TOKENS = [ACCESS_TOKEN, REFRESH_TOKEN]
const TOKENS: { [key: string]: string } = {
  access: ACCESS_TOKEN,
  refresh: REFRESH_TOKEN,
}

async function handleUserResponse(
  response: AxiosResponse<TokenResponse>,
): Promise<AxiosResponse<UserResponse> | void> {
  if (response.status === 200) {
    const { refresh, access } = response.data
    AuthApi.setToken('refresh', refresh)
    AuthApi.setToken('access', access)
    const detailsResponse = await fetchUserDetails()
    const updateUser = useUserStore.getState().updateUser
    updateUser(detailsResponse.data)
  }
}

export async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data)
  return handleUserResponse(response)
}

const getUserFunc = async (): Promise<AxiosResponse<AuthUser>> => {
  console.log('get user info func (memo)')
  return axios.get('/account/me/')
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
    axios.defaults.headers.common['Authorization'] = null
  },

  logout: async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    const res = await axios.post('/token/blacklist/', {
      refresh: refreshToken,
    })

    // TODO: Check res status code, etc.

    ALL_TOKENS.forEach((token) => localStorage.removeItem(token))
    axios.defaults.headers.common['Authorization'] = null
  },

  // TODO: Update `memoize` package.
  getUser: memoize(getUserFunc, { maxAge: 10000 }),
}

export default AuthApi
