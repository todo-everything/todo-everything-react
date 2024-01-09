import { lazyImport } from '~/utils/lazyImport.ts'

const { TodoRoutes } = lazyImport(() => import('~/routes/todo'), 'TodoRoutes')


export const protectedRoutes = [
  {
    path: '/todos/*',
    element: <TodoRoutes />,
  }
]