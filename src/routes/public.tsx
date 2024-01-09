import { lazyImport } from '../utils/lazyImport.ts'

const { AuthRoutes } = lazyImport(() => import('~/routes/auth'), 'AuthRoutes')

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
]