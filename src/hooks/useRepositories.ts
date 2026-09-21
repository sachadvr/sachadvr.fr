import { useEffect } from 'react'
import { useAtom } from 'jotai'

import { API_URL } from '@/config'
import { repositoriesAtom, type Repository } from '@/store/state'

// Header et Portfolio montent au même rendu : sans ce cache de promesse,
// `/repos` partirait deux fois et allongerait la chaîne de requêtes.
let pendingRepositories: Promise<Repository[]> | null = null

function fetchRepositories(): Promise<Repository[]> {
  if (!pendingRepositories) {
    pendingRepositories = fetch(`${API_URL}/repos`).then((response) => response.json())
  }
  return pendingRepositories
}

export default function useRepositories(): Repository[] {
  const [repositories, setRepositories] = useAtom(repositoriesAtom)

  useEffect(() => {
    let cancelled = false

    fetchRepositories()
      .then((fetched) => {
        if (!cancelled) setRepositories(fetched)
      })
      .catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [setRepositories])

  return repositories
}
