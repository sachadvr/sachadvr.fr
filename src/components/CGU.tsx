import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import LegalPage from '@/components/LegalPage'

const BOLD = { b: <strong /> }

const CGU = () => {
  const { t } = useTranslation()

  return (
    <LegalPage command="cat cgu.md" title={t('legal.cgu.title')}>
      <p>
        <Trans i18nKey="legal.cgu.intro" components={BOLD} />
      </p>
      <p>{t('legal.cgu.listIntro')}</p>
      <ul>
        <li>
          <Trans i18nKey="legal.cgu.item1" components={BOLD} />
        </li>
        <li>
          <Trans i18nKey="legal.cgu.item2" components={BOLD} />
        </li>
        <li>
          <Trans i18nKey="legal.cgu.item3" components={BOLD} />
        </li>
      </ul>
      <p>
        <Trans i18nKey="legal.cgu.audience" components={BOLD} />
      </p>
      <p>
        <Trans i18nKey="legal.cgu.disagreement" components={BOLD} />
      </p>
    </LegalPage>
  )
}

export default CGU
