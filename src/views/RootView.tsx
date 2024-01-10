import Header from '~/components/Header'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { useUserStore } from '~/stores/user.ts'
import AuthApi from '~/lib/auth.ts'

export default function RootView() {
  const user = useUserStore((state) => state.user)
  const resetUser = useUserStore((state) => state.resetUser)

  const handleLogout = async () => {
    await AuthApi.logout()
    resetUser()
  }

  return (
    <div className="container mx-auto">
      <Header user={user} onLogout={handleLogout} />
      <Suspense fallback={<div>Loading in root view...</div>}>
        <Outlet />
      </Suspense>
    </div>
  )
}
