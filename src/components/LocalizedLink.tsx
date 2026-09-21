import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import { useLocalizedPath } from '@/i18n/useLocalizedPath'

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string
}

/** `<Link>` qui préfixe automatiquement sa cible avec la langue active. */
const LocalizedLink = React.forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ to, ...props }, ref) => {
    const localizePath = useLocalizedPath()
    return <Link ref={ref} to={localizePath(to)} {...props} />
  }
)

LocalizedLink.displayName = 'LocalizedLink'

export default LocalizedLink
