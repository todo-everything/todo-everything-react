import { AppProvider } from '~/providers/app'
import { AppRoutes } from '~/routes'
import './App.css'
import { useEffect } from 'react'
import { useUserStore } from '~/stores/user.ts'
import AuthApi from '~/lib/auth.ts'

function App() {
  const user = useUserStore((state) => state.user)
  const updateUser = useUserStore((state) => state.updateUser)
  const tokens = AuthApi.getTokens()

  useEffect(() => {
    if (!user && tokens.refresh && tokens.access) {
      const refetchUser = async () => {
        const res = await AuthApi.getUser()
        updateUser(res.data)
      }

      refetchUser()
    }
  }, [tokens, user])

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
