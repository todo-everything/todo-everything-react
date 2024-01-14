import Axios from 'axios'

import { API_URL } from '~/config'

/**
 * HTTP Client for routes that do not need user authentication.
 *
 * This is specifically used for user login, user register routes since those
 * don't need the `Authorization` header. It is also used in the token refresh
 * flow since we don't need the custom axios interceptors that inject tokens.
 *
 * See `httpClientPrivate` for requests that need API auth.
 */
export const httpClientPublic = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
