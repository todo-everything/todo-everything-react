import { Outlet } from 'react-router-dom'
import { useUserStore } from '~/stores/user.ts'
import AuthApi from '~/lib/auth.ts'
import SideNavigation from '~/components/SideNavigation'
import MainLayout from '~/components/Layout/MainLayout.tsx'

export default function RootView() {
  const user = useUserStore((state) => state.user)
  const resetUser = useUserStore((state) => state.resetUser)

  const handleLogout = async () => {
    await AuthApi.logout()
    resetUser()
  }

  return (
    <div className="flex flex-row">
      <SideNavigation user={user} onLogout={handleLogout} />
      <MainLayout className="ml-4">
        <Outlet />
      </MainLayout>
    </div>
  )
}
