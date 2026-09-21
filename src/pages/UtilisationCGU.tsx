import React from 'react'
import { useTranslation } from 'react-i18next'

import CGU from '@/components/CGU'
import Footer from '@/components/Footer'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'

const UtilisationCGU = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo page="cgu" path="/cgu" />
      <StructuredData
        breadcrumb={[
          { name: t('seo.home.title'), path: '/' },
          { name: t('legal.cgu.title'), path: '/cgu' },
        ]}
      />
      <CGU />
      <Footer />
    </>
  )
}

export default UtilisationCGU
