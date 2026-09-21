import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import LocalizedLink from '@/components/LocalizedLink'
import Seo from '@/components/Seo'
import TerminalWindow from '@/components/TerminalWindow'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="grid min-h-screen place-items-center bg-background bg-grid px-6">
      <Seo page="notFound" path="/404" noIndex />

      <div className="w-full max-w-lg space-y-6">
        <h1 className="font-display text-7xl font-bold tracking-tighter text-primary sm:text-8xl">
          404
        </h1>

        <TerminalWindow title="stderr" bodyClassName="space-y-3">
          <p className="terminal-prompt text-sm">
            {t('notFound.path')}
            <span className="ml-1 inline-block h-4 w-2 translate-y-[2px] animate-blink bg-accent" />
          </p>
          <p className="text-sm text-destructive">{t('notFound.stderr')}</p>
          <p className="text-sm text-muted-foreground">{t('notFound.message')}</p>
        </TerminalWindow>

        <Button asChild>
          <LocalizedLink to="/">
            <FaChevronLeft /> {t('common.backHome')}
          </LocalizedLink>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
