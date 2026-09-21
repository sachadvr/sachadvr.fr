import React from 'react'
import { useTranslation } from 'react-i18next'

import CGV from '@/components/CGV'
import Footer from '@/components/Footer'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'

const UtilisationCGV = () => {
  const { t } = useTranslation()

  return (
    <>
      <Seo page="cgv" path="/cgv" />
      <StructuredData
        breadcrumb={[
          { name: t('seo.home.title'), path: '/' },
          { name: t('legal.cgv.title'), path: '/cgv' },
        ]}
      />
      <CGV />
      <Footer />
    </>
  )
}

export default UtilisationCGV
