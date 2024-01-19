import { RouteObject } from 'react-router-dom'
import RootView from '~/views/RootView'
import {
  LoadableAccountView,
  LoadableLandingView,
  LoadableLoginView,
  LoadableRegisterView,
  LoadableSettingsView,
  LoadableTodoDetailView,
  LoadableTodoEditView,
  LoadableTodoView,
} from '~/views'

export function getRoutes(user) {
  const authRoutes: RouteObject[] = []

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <RootView />,
      // errorElement: <ErrorFallback />,

      children: [
        {
          path: 'landing',
          element: <LoadableLandingView />,
        },
        {
          path: 'login',
          element: <LoadableLoginView />,
        },
        {
          path: 'register',
          element: <LoadableRegisterView />,
        },
        {
          path: 'todos',
          element: <LoadableTodoView />,
        },
        {
          path: 'todos/:todoId',
          element: <LoadableTodoDetailView />,
        },
        {
          path: 'todos/:todoId/edit',
          element: <LoadableTodoEditView />,
        },
        {
          path: 'account',
          element: <LoadableAccountView />,
        },
        {
          path: 'settings',
          element: <LoadableSettingsView />,
        },
        ...(user ? authRoutes : []),
      ],
    },
  ]

  return routes
}
