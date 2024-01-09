import { IUser } from '~/api/models'
import { PropsWithChildren } from 'react'
import { Button, Menu, Navbar } from 'react-daisyui'
import { Link } from 'react-router-dom'

interface HeaderProps extends PropsWithChildren {
  user?: IUser
}

export default function Header(props: HeaderProps) {
  const { user } = props

  return (
    <Navbar>
      <div className="flex-1">
        <Button tag="a" className="text-xl normal-case" color="ghost">
          TODO: Everything
        </Button>
      </div>
      <div className="flex-none">
        <Menu horizontal={true} className="px-1">
          <Menu.Item>
            <Link to="/landing">Landing</Link>
          </Menu.Item>
          {user && (
            <Menu.Item>
              <Link to="/todos">Todos</Link>
            </Menu.Item>
          )}
          <Menu.Item>
            <details>
              <summary>::</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </details>
          </Menu.Item>
        </Menu>
        {user && (
          <div>
            {user.id} - {user.email}
          </div>
        )}
      </div>
    </Navbar>
  )
}
