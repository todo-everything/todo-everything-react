import Axios, { InternalAxiosRequestConfig } from 'axios'

import { API_URL } from '~/config'
import { memoizedRefreshToken } from '~/lib/refreshToken'
import AuthApi from '~/lib/auth.ts'

export const httpClientPrivate = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClientPrivate.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = AuthApi.getAccessToken() ?? ''
    if (accessToken) {
      console.log('adding to thing', accessToken)
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

httpClientPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config

    console.log('interceptor error', { error, config })
    // TODO: Don't attempt refresh when user was trying to use the token/login URL.
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true
      await memoizedRefreshToken()
      return httpClientPrivate(config)
    }

    // TODO: Some sort of notification storage, add error from here

    return Promise.reject(error)
  },
)
