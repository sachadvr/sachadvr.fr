import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { activateLanguage } from '@/i18n'
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  localizePath,
  stripLanguagePrefix,
} from '@/i18n/config'

interface LanguageSwitcherProps {
  className?: string
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { t, i18n } = useTranslation()
  const { pathname, search, hash } = useLocation()

  const activeLanguage = i18n.resolvedLanguage ?? DEFAULT_LANGUAGE
  const basePath = stripLanguagePrefix(pathname)

  function selectLanguage(code: string) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code)
    activateLanguage(code)
  }

  return (
    <nav aria-label={t('common.languageSwitcher')} className={cn('flex flex-wrap gap-1', className)}>
      {LANGUAGES.map(({ code, hreflang, label, short }) => {
        const isActive = code === activeLanguage
        return (
          <Link
            key={code}
            to={`${localizePath(basePath, code)}${search}${hash}`}
            hrefLang={hreflang}
            lang={hreflang}
            title={label}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => selectLanguage(code)}
            className={cn(
              'inline-block border border-border px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.5px] transition-shadow',
              // `bg-ink` plutôt que `bg-accent` : lisible sur fond jaune (header/hero)
              // et sur fond clair (footer jaune).
              isActive
                ? 'bg-ink text-crimson shadow-brutal-sm'
                : 'bg-card text-foreground hover:bg-secondary'
            )}
          >
            {short}
          </Link>
        )
      })}
    </nav>
  )
}

export default LanguageSwitcher
