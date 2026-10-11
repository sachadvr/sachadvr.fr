/**
 * Constantes d'identité du site, partagées par le SEO, le JSON-LD et les traductions.
 *
 * ⚠️ `CITY` est la seule source de vérité pour la ville affichée (badge du hero,
 * JSON-LD `PostalAddress`, descriptions SEO dans les 5 langues). Le contenu
 * existant du site (badge « disponible / Lille, FR », « Université catholique de
 * Lille ») référence Lille : changer cette constante suffit à basculer le site
 * entier sur une autre ville.
 */
export const SITE = {
  /**
   * URL racine publique, sans slash final : origine + chemin de base du déploiement,
   * injectée au build par vite.config.ts (`SITE_URL` + `BASE_PATH`, défaut
   * `https://sachadvr.fr`). Sur GitHub Pages : `https://sachadvr.github.io/sachadvr.fr`.
   */
  url: import.meta.env.VITE_SITE_URL,
  name: 'Sacha Duvivier',
  shortName: 'SachaDVR',
  email: 'contact@sachadvr.fr',
  city: 'Lille',
  country: 'France',
  countryCode: 'FR',
  githubUser: 'sachadvr',
  /**
   * Image de partage (Open Graph / Twitter Card), servie depuis /public.
   * ⚠️ 794x820 : quasi carrée, alors que LinkedIn/X attendent du 1200x630 pour un
   * rendu `summary_large_image` correct. À remplacer par un visuel dédié.
   */
  ogImage: '/preview.png',
  ogImageWidth: 794,
  ogImageHeight: 820,
  sameAs: [
    'https://github.com/sachadvr',
    'https://www.linkedin.com/in/sachadvr/',
    'https://twitter.com/SachaDvr',
    'https://instagram.com/sachadvr',
  ],
} as const

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}
