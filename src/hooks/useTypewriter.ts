import { useEffect, useRef, useState } from 'react'

interface UseTypewriterOptions {
  /** Délai entre deux caractères tapés, en ms (blacksmith : 80ms). */
  speed?: number
  /** Pause entre la fin d'une ligne et le début de la suivante, en ms. */
  lineDelay?: number
  /** Pause une fois toutes les lignes tapées, avant une éventuelle boucle, en ms. */
  holdDelay?: number
  /** Reprendre la saisie en boucle. */
  loop?: boolean
}

interface UseTypewriterResult {
  /** Nombre de caractères rendus pour chaque ligne. */
  counts: number[]
  /** Index de la ligne en cours de saisie, `-1` une fois tout tapé (ou en boucle). */
  activeIndex: number
  done: boolean
  restart: () => void
}

/**
 * Effet « machine à écrire », ligne par ligne. Chaque ligne commence à être
 * tapée quand la précédente est terminée. Respecte `prefers-reduced-motion` :
 * tout est affiché d'un coup.
 */
export function useTypewriter(
  lines: string[],
  options: UseTypewriterOptions = {}
): UseTypewriterResult {
  const { speed = 80, lineDelay = 350, holdDelay = 1800, loop = true } = options

  const [counts, setCounts] = useState<number[]>(() => lines.map(() => 0))
  const [activeIndex, setActiveIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const linesRef = useRef(lines)
  linesRef.current = lines
  const linesKey = lines.join('\u241e')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCounts(linesRef.current.map((line) => line.length))
      setActiveIndex(-1)
      setDone(true)
      return
    }

    let cancelled = false
    let timer: number | undefined

    const step = (lineIndex: number, charIndex: number) => {
      if (cancelled) return

      const currentLines = linesRef.current
      if (lineIndex >= currentLines.length) {
        setActiveIndex(-1)
        setDone(true)
        if (loop) {
          timer = window.setTimeout(() => {
            if (cancelled) return
            setCounts(currentLines.map(() => 0))
            setActiveIndex(0)
            setDone(false)
            timer = window.setTimeout(() => step(0, 0), 0)
          }, holdDelay)
        }
        return
      }

      setActiveIndex(lineIndex)
      const line = currentLines[lineIndex]
      const nextChar = Math.min(charIndex + 1, line.length)
      setCounts((prev) => prev.map((count, i) => (i === lineIndex ? nextChar : count)))

      timer = window.setTimeout(
        () => (nextChar < line.length ? step(lineIndex, nextChar) : step(lineIndex + 1, 0)),
        nextChar < line.length ? speed : lineDelay
      )
    }

    timer = window.setTimeout(() => step(0, 0), 120)

    return () => {
      cancelled = true
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [linesKey, speed, lineDelay, holdDelay, loop, resetKey])

  const restart = () => setResetKey((key) => key + 1)

  return { counts, activeIndex, done, restart }
}