import { PropsWithChildren } from 'react'

interface MainLayoutProps extends PropsWithChildren {
  className?: string
}

export default function MainLayout({
  children,
  className,
  ...others
}: MainLayoutProps) {
  return (
    <div className={`flex flex-grow ${className || ''}`} {...others}>
      {children}
    </div>
  )
}
