import { useTranslation } from 'react-i18next'

import { densityFor, type Density } from '@/i18n/config'

/**
 * Densité d'affichage de la langue active. La quasi-totalité de l'adaptation se fait
 * en CSS via `[data-density]` ; ce hook n'est là que pour les cas où la densité change
 * la *quantité* de contenu rendu (colonne supplémentaire, carte en plus), ce que la CSS
 * ne peut pas faire.
 */
export default function useDensity(): Density {
  const { i18n } = useTranslation()
  return densityFor(i18n.resolvedLanguage ?? i18n.language)
}
