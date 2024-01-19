import { TbHome2 } from 'react-icons/tb'
import { Link, NavLink } from 'react-router-dom'

interface NavbarLinkProps {
  icon: typeof TbHome2
  label: string
  to?: string
  isLink?: boolean
  onClick?: () => void
}

export default function NavbarLink({
  icon: Icon,
  label,
  onClick,
  to,
  isLink,
}: NavbarLinkProps) {
  const Component = isLink === true ? Link : NavLink
  return (
    <Component to={to} onClick={onClick}>
      <Icon className="w-5 h-5" strokeWidth={1.5} />
      {label}
    </Component>
  )
}
