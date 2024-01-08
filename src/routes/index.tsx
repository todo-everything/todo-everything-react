import React from 'react'
import { useRoutes } from 'react-router-dom'

import LandingView from '~/views/LandingView'
import { publicRoutes } from './public'

export function AppRoutes() {
  const commonRoutes = [
    {
      path: '/',
      element: <LandingView />,
    },
  ]

  const routes = [...publicRoutes]

  const element = useRoutes([...routes, ...commonRoutes])
  return <>{element}</>
}
