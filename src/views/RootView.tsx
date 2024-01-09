import Header from '~/components/Header'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { useUserStore } from '~/stores/user.ts'

export default function RootView() {
  const user = useUserStore((state) => state.user)
  return (
    <div>
      <Header user={user} />

      <div className="container mx-auto">
        <Suspense fallback={<div>Loading in root view...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
