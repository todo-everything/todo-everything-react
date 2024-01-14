import memoize from 'memoize'
import AuthApi from '~/lib/auth.ts'
import { httpClientPublic } from '~/lib/httpClientPublic.ts'

type Response = {
  data: {
    access: string
  }
}

const refreshTokenFn = async () => {
  const { refresh: refreshToken } = AuthApi.getTokens()

  if (!refreshToken) {
    // No refresh token. Reset local token storage since we're not in a good state.
    return AuthApi.clearAllTokens()
  }

  try {
    const response = await httpClientPublic.post('/token/refresh/', {
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
    console.error('Error refreshing tokens. Clearing all tokens.')
    AuthApi.clearAllTokens()
  }
}

const maxAge = 10000

export const memoizedRefreshToken = memoize(refreshTokenFn, { maxAge })
