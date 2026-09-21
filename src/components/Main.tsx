import React from 'react'

import FeaturedProjects from '@/components/FeaturedProjects'
import Portfolio from '@/components/Portfolio'
import WhoAmi from '@/components/WhoAmi'
import Metrics from '@/components/Metrics'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ScrollToTop'

const Main = () => {
  return (
    <main>
      <WhoAmi />
      <FeaturedProjects />
      <Portfolio />
      <Metrics />
      <Contact />
      <ScrollToTop />
    </main>
  )
}

export default Main
