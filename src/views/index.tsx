import loadable from '@loadable/component'

export const LoadableLandingView = loadable(() => import('~/views/LandingView'))
export const LoadableLoginView = loadable(() => import('~/views/LoginView'))
export const LoadableRegisterView = loadable(
  () => import('~/views/RegisterView'),
)
export const LoadableTodoView = loadable(() => import('~/views/TodoView'))
export const LoadableAccountView = loadable(() => import('~/views/AccountView'))
export const LoadableSettingsView = loadable(
  () => import('~/views/SettingsView'),
)
