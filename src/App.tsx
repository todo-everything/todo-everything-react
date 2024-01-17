import { useEffect, useState } from 'react'
import { AppProvider } from '~/providers/app'
import { useUserStore } from '~/stores/user.ts'
import AuthApi from '~/lib/auth.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getRoutes } from '~/routes'

function App() {
  const [appLoading, setAppLoading] = useState<boolean>(false)
  const user = useUserStore((state) => state.user)
  const updateUser = useUserStore((state) => state.updateUser)
  const tokens = AuthApi.getTokens()

  const router = createBrowserRouter(getRoutes(user))

  useEffect(() => {
    if (!user && tokens.refresh && tokens.access) {
      const refetchUser = async () => {
        setAppLoading(true)
        const res = await AuthApi.getUser()
        updateUser(res.data)
        setAppLoading(false)
      }

      refetchUser()
    }
  }, [tokens, user])

  return (
    <AppProvider isLoading={appLoading}>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
