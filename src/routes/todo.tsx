import { Route, Routes } from 'react-router-dom'
import TodoView from '~/views/TodoView'

export const TodoRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoView />} />
    </Routes>
  )
}
