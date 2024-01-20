import { Outlet } from 'react-router-dom'

export default function TodoRootView(props) {
  return (
    <div className="w-full flex flex-col mx-auto mt-4">
      <Outlet />
    </div>
  )
}
