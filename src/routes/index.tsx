import { RouteObject } from 'react-router-dom'
import RootView from '~/views/RootView.tsx'
import { LazyLoginView, LoadableLandingView, LoadableTodoView } from '~/views'

export function getRoutes(user) {
  const authRoutes: RouteObject[] = [
    {
      path: 'todos',
      element: <LoadableTodoView />,
    },
  ]

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <RootView />,

      children: [
        {
          path: 'landing',
          element: <LoadableLandingView />,
        },
        {
          path: 'login',
          element: <LazyLoginView />,
        },
        ...(user ? authRoutes : []),
      ],
    },
  ]

  return routes
}

// const routes = [...publicRoutes, ...(user ? protectedRoutes : [])]
// const element = useRoutes([...commonRoutes])

// return commonRoutes
// <Routes>
//   <Route path="/" element={<RootView />}>
//     <Route path="landing" element={<LandingView />} />
//     <Route path="login" element={<LoginView />} />
//   </Route>
// </Routes>
// }
