import React, { useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

const ScrollToTop = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 400)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <Button
      variant="accent"
      size="icon"
      aria-label={t('common.scrollTop')}
      className="fixed bottom-6 right-6 z-50"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <FaChevronUp />
    </Button>
  )
}

export default ScrollToTop
