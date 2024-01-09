import memoize from 'memoize'
import { axios } from '~/lib/axios'
import AuthApi, { ACCESS_TOKEN } from '~/lib/auth.ts'

type Response = {
  data: {
    access: string
  }
}

const refreshTokenFn = async () => {
  console.log('Refreshing token!')
  const { refresh: refreshToken } = AuthApi.getTokens()

  if (!refreshToken) {
    return
  }

  try {
    const response = await axios.post('/token/refresh/', {
      refresh: refreshToken,
    })

    const {
      data: { access },
    }: Response = response

    if (!access) {
      AuthApi.clearAllTokens()
    }

    AuthApi.setToken('access', access)

    return access
  } catch (error) {
    AuthApi.clearAllTokens()
  }
}

const maxAge = 10000

export const memoizedRefreshToken = memoize(refreshTokenFn, { maxAge })
