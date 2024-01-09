import { useRoutes } from 'react-router-dom'

import LandingView from '~/views/LandingView'
import { publicRoutes } from './public'
import { protectedRoutes } from './protected'
import { useUserStore } from '~/stores/user.ts'

export function AppRoutes() {
  const user = useUserStore((state) => state.user)
  console.log('routes user', { user })

  const commonRoutes = [
    {
      path: '/',
      element: <LandingView />,
    },
  ]

  const routes = [...publicRoutes, ...(user ? protectedRoutes : [])]

  const element = useRoutes([...routes, ...commonRoutes])
  return <>{element}</>
}
