import { IUser } from '~/api/models'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps extends PropsWithChildren {
  user?: IUser
  onLogout: () => void
}

export default function Header(props: HeaderProps) {
  const { user } = props

  const handleLogout = () => {
    return props.onLogout()
  }

  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">TODO: Everything</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li>
            <Link to="/landing">Landing</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/todos">Todos</Link>
              </li>
              <li>{JSON.stringify(user, null, 2)}</li>
            </>
          )}
        </ul>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
