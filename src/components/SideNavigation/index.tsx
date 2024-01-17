import { useState } from 'react'
import {
  TbFingerprint,
  TbHome2,
  TbListCheck,
  TbLogin,
  TbLogout,
  TbMoodPlus,
  TbSettings,
  TbUser,
} from 'react-icons/tb'
import NavbarLink from './NavbarLink.tsx'
import { IUser } from '~/api/models'
import { Link, NavLink } from 'react-router-dom'

interface SideNavigationProps {
  user?: IUser
  onLogout: () => void
}

export default function SideNavigation(props: SideNavigationProps) {
  const [active, setActive] = useState(2)

  let navigationLinks = [{ icon: TbHome2, label: 'Home', to: '/' }]

  if (props.user) {
    navigationLinks.push({ icon: TbListCheck, label: 'Todos', to: '/todos' })
  } else {
    navigationLinks = navigationLinks.concat([
      { icon: TbLogin, label: 'Login', to: '/login' },
      {
        icon: TbMoodPlus,
        label: 'Register',
        to: '/register',
      },
    ])
  }

  return (
    <nav className="flex flex-col w-60 h-screen overflow-hidden p-2 bg-neutral-200 border-r border-solid border-base-200">
      <div className="flex flex-col w-full h-full items-center">
        <Link to="/" className="flex flex-row w-full items-center p-2">
          <TbFingerprint className="mr-4" type="mark" size={30} />
          <h3 className="font-semibold">TODO: Everything</h3>
        </Link>

        <div className="w-full mt-14 flex-1">
          <ul className="menu">
            {navigationLinks.map((link, index) => (
              <li>
                <NavLink
                  {...link}
                  key={link.label}
                  // className={cx({ active: active })}
                  to={link.to}
                  onClick={() => setActive(index)}
                >
                  <link.icon className="w-5 h-5" strokeWidth={1.5} />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {props.user && (
          <div className="w-full">
            <ul className="menu">
              <li>
                <NavbarLink icon={TbUser} label="Account" to="/account" />
              </li>
              <li>
                <NavbarLink icon={TbSettings} label="Settings" to="/settings" />
              </li>
              <li>
                <NavbarLink
                  active={false}
                  icon={TbLogout}
                  label="Logout"
                  to={'/'}
                  onClick={props.onLogout}
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
