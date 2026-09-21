import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-soft border border-input bg-card px-3 py-2 font-mono text-sm text-foreground shadow-brutal-sm transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-brutal focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
