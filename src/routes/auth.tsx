import { Route, Routes } from 'react-router-dom'
import LoginView from '~/views/LoginView'

export const AuthRoutes = () => {
  return (
    <Routes>
      {/*<Route path="register" element={<Register />} />*/}
      <Route path="login" element={<LoginView />} />
    </Routes>
  )
}
