import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { stripLanguagePrefix } from '@/i18n/config'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import LocalizedLink from '@/components/LocalizedLink'

const LEGAL_ROUTES = [
  { to: '/cgu', labelKey: 'footer.cgu' },
  { to: '/cgv', labelKey: 'footer.cgv' },
]

const NavCguCgv = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const currentPath = stripLanguagePrefix(pathname)

  return (
    <nav className="border-b border-border bg-card">
      <ul className="container flex flex-wrap items-center gap-3 py-3">
        {LEGAL_ROUTES.map(({ to, labelKey }) => (
          <li key={to}>
            <LocalizedLink
              to={to}
              className={cn(
                'inline-block border border-border px-3 py-1 text-xs font-medium uppercase tracking-[0.5px] transition-shadow',
                currentPath === to
                  ? 'bg-primary text-primary-foreground shadow-brutal-sm'
                  : 'bg-card hover:bg-secondary'
              )}
            >
              {t(labelKey)}
            </LocalizedLink>
          </li>
        ))}
        <li className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />
          <LocalizedLink
            to="/"
            className="inline-block border border-transparent px-3 py-1 text-xs font-medium uppercase tracking-[0.5px] text-muted-foreground hover:text-foreground"
          >
            &#x2B05; {t('common.back')}
          </LocalizedLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavCguCgv
