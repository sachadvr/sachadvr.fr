import React from 'react'
import { useTranslation } from 'react-i18next'

import NavCguCgv from '@/components/NavCguCgv'
import SectionHeading from '@/components/SectionHeading'

interface LegalPageProps {
  command: string
  title: string
  children: React.ReactNode
}

const LegalPage = ({ command, title, children }: LegalPageProps) => {
  const { t } = useTranslation()
  const disclaimer = t('legal.disclaimer')

  return (
    <>
      <NavCguCgv />
      <div className="bg-background bg-grid py-12">
        <div className="container max-w-3xl">
          <SectionHeading command={command} title={title} />
          {disclaimer ? (
            <p className="mb-4 border border-border bg-secondary px-4 py-3 text-xs text-muted-foreground">
              {disclaimer}
            </p>
          ) : null}
          <article className="brutal-box space-y-4 p-6 text-sm leading-relaxed text-muted-foreground [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-foreground [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-4">
            {children}
          </article>
        </div>
      </div>
    </>
  )
}

export default LegalPage
