import { PropsWithChildren } from 'react'

interface PanelProps extends PropsWithChildren {
  className?: string
}

export default function Panel({ children, className }: PanelProps) {
  return <div className={`w-1/2 h-full p-2 ${className} `}>{children}</div>
}
