import React, { useEffect } from 'react'
import { AppProvider } from '~/providers/app'
import { useUserStore } from '~/stores/user.ts'
import AuthApi from '~/lib/auth.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getRoutes } from '~/routes'

function App() {
  const user = useUserStore((state) => state.user)
  const updateUser = useUserStore((state) => state.updateUser)
  const tokens = AuthApi.getTokens()

  const router = createBrowserRouter(getRoutes(user))

  useEffect(() => {
    if (!user && tokens.refresh && tokens.access) {
      console.log('refetch user?')
      const refetchUser = async () => {
        const res = await AuthApi.getUser()
        updateUser(res.data)
      }

      refetchUser()
    }
  }, [tokens, user])

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
