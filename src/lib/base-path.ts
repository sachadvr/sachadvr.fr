/**
 * Helpers du chemin de base de déploiement (`BASE_PATH` au build, exposé par Vite
 * sous `import.meta.env.BASE_URL`).
 *
 * Le site tourne soit à la racine d'un domaine (`/`, Docker/nginx), soit sous un
 * sous-chemin (`/sachadvr.fr/` sur GitHub Pages). Le chemin applicatif (celui que
 * voit react-router, ex. `/en/cgu`) ne contient jamais ce préfixe.
 *
 * ⚠️ Module sans dépendance ni alias `@/` : il est aussi importé par
 * `vite.config.ts` et exécuté tel quel par `node --test`.
 */

export const DEFAULT_SITE_URL = 'https://sachadvr.fr'

/** Normalise une valeur de `BASE_PATH` : `''`, `'x'`, `'/x'` → `'/'`, `'/x/'`, `'/x/'`. */
export function normalizeBasePath(value: string | undefined): string {
  const trimmed = (value ?? '').trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
}

/** `basename` attendu par react-router : `'/'` ou `'/x'` (sans slash final). */
export function routerBasename(base: string): string {
  return normalizeBasePath(base).replace(/\/$/, '') || '/'
}

/** Retire le chemin de base d'un pathname du navigateur pour obtenir le chemin applicatif. */
export function stripBasePath(pathname: string, base: string): string {
  const prefix = routerBasename(base)
  if (prefix === '/') return pathname || '/'
  if (pathname === prefix) return '/'
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length)
  return pathname || '/'
}

/** Préfixe un chemin applicatif (`/en`) avec le chemin de base (`/sachadvr.fr/en`). */
export function withBasePath(path: string, base: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const prefix = routerBasename(base)
  if (prefix === '/') return normalized
  return normalized === '/' ? `${prefix}/` : `${prefix}${normalized}`
}

/**
 * URL racine publique du site, sans slash final : origine + chemin de base.
 * `('https://sachadvr.github.io', '/sachadvr.fr/')` → `'https://sachadvr.github.io/sachadvr.fr'`.
 * Sans origine connue, on garde le domaine canonique tel quel : lui accoler la base
 * produirait une URL qui n'existe pas (`https://sachadvr.fr/sachadvr.fr`).
 */
export function siteRootUrl(origin: string | undefined, base: string): string {
  if (!origin?.trim()) return DEFAULT_SITE_URL

  const cleanOrigin = origin.trim().replace(/\/+$/, '')
  const prefix = routerBasename(base)
  return prefix === '/' ? cleanOrigin : `${cleanOrigin}${prefix}`
}
