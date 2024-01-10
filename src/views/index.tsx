import loadable from '@loadable/component'

export const LoadableLandingView = loadable(() => import('~/views/LandingView'))
export const LazyLoginView = loadable(() => import('~/views/LoginView'))
export const LoadableTodoView = loadable(() => import('~/views/TodoView'))
