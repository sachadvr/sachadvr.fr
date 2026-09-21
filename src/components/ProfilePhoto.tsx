import React from 'react'
import { useTranslation } from 'react-i18next'

import photoWebp from '@/images/photo.webp'
import photoJpeg from '@/images/photo.jpeg'

interface ProfilePhotoProps {
  className?: string
  /** À activer uniquement sur l'occurrence above-the-fold, qui est le LCP. */
  priority?: boolean
}

const ProfilePhoto = ({ className, priority = false }: ProfilePhotoProps) => {
  const { t } = useTranslation()

  return (
    <picture>
      <source srcSet={photoWebp} type="image/webp" />
      <img
        src={photoJpeg}
        alt={t('common.photoAlt')}
        width={696}
        height={696}
        loading={priority ? 'eager' : 'lazy'}
        // eslint-disable-next-line react/no-unknown-property -- cf. src/react-attributes.d.ts
        fetchpriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  )
}

export default ProfilePhoto
