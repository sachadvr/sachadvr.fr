import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import LegalPage from '@/components/LegalPage'

const BOLD = { b: <strong /> }

const CGV = () => {
  const { t } = useTranslation()

  return (
    <LegalPage command="cat cgv.md" title={t('legal.cgv.title')}>
      <p>
        <Trans i18nKey="legal.cgv.intro" components={BOLD} />
      </p>
      <p>
        <Trans i18nKey="legal.cgv.scope" components={BOLD} />
      </p>
      <p>
        <Trans i18nKey="legal.cgv.process" components={BOLD} />
      </p>
      <p>
        <Trans i18nKey="legal.cgv.changes" components={BOLD} />
      </p>
    </LegalPage>
  )
}

export default CGV
