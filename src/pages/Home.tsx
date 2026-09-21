import React from 'react'

import SiteHeader from '@/components/SiteHeader'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Footer from '@/components/Footer'
import Main from '@/components/Main'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'

const Home = () => {
  return (
    <>
      <Seo page="home" path="/" />
      <StructuredData includeWebSite />
      <SiteHeader />
      <Hero />
      <Ticker />
      <Main />
      <Footer />
    </>
  )
}

export default Home
