import cx from 'clsx'
import { TbHome2 } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

interface NavbarLinkProps {
  icon: typeof TbHome2
  label: string
  active?: boolean
  to?: string

  onClick?: () => void
}

export default function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  to,
}: NavbarLinkProps) {
  return (
    <NavLink className={cx({ active: active })} to={to} onClick={onClick}>
      <Icon className="w-5 h-5" strokeWidth={1.5} />
      {label}
    </NavLink>
  )
}
