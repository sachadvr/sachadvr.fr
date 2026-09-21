import React from 'react'

import { cn } from '@/lib/utils'

interface TerminalWindowProps {
  title: string
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}

const TerminalWindow = ({ title, children, className, bodyClassName }: TerminalWindowProps) => {
  return (
    <div className={cn('window-box', className)}>
      <div className="window-chrome">
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="ml-2 truncate font-mono text-xs font-medium uppercase tracking-[0.5px]">
          {title}
        </span>
      </div>
      <div className={cn('p-5', bodyClassName)}>{children}</div>
    </div>
  )
}

export default TerminalWindow
