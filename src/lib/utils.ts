import { type ClassValue, clsx } from 'clsx'

/**
 * Concatène des classes Tailwind. `tailwind-merge` a été retiré : il pesait
 * ~100 ko dans le bundle d'entrée alors qu'aucun appel `cn()` du projet ne
 * produit de conflit d'utilitaires (les variantes sont mutuellement
 * exclusives et les `className` passés n'écrasent aucune classe de base).
 * Si un jour un appelant doit écraser une classe de base, corriger la classe
 * de base plutôt que de réintroduire le résolveur de conflits.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
