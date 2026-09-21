import React, { useEffect, useState } from 'react'

interface AccentOption {
  name: string
  hex: string
  /** Triplet `h s% l%` appliqué aux variables `--accent` / `--primary-foreground`. */
  hsl: string
}

/** Saturation et luminosité encadrées pour rester lisible avec le texte papier
 *  posé sur les fonds d'accent (pas de néons pâles, pas de noirs bouchés). */
function randomAccent(): AccentOption {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 70 + Math.floor(Math.random() * 25)
  const lightness = 42 + Math.floor(Math.random() * 12)
  return { name: 'accident', hex: hslToHex(hue, saturation, lightness), hsl: `${hue} ${saturation}% ${lightness}%` }
}

function hslToHex(h: number, s: number, l: number): string {
  const chroma = (1 - Math.abs(2 * l / 100 - 1)) * (s / 100)
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l / 100 - chroma / 2
  const bases =
    h < 60
      ? [chroma, x, 0]
      : h < 120
        ? [x, chroma, 0]
        : h < 180
          ? [0, chroma, x]
          : h < 240
            ? [0, x, chroma]
            : h < 300
              ? [x, 0, chroma]
              : [chroma, 0, x]
  return (
    '#' +
    bases
      .map((value) => Math.round((value + m) * 255).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  )
}

const Swatch = ({ hex }: { hex: string }) => (
  <span
    aria-hidden="true"
    className="inline-block h-4 w-4 shrink-0 rounded-pill border border-ink"
    style={{ backgroundColor: hex }}
  />
)

/**
 * Outil de prototypage temporaire : applique une couleur d'accent aléatoire en
 * direct (variables CSS) tant qu'on n'a pas trouvé la bonne teinte.
 */
const AccentTuner = () => {
  const [accent, setAccent] = useState<AccentOption>({ name: 'cyan', hex: '#22B1D8', hsl: '193 73% 49%' })
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', accent.hsl)
    root.style.setProperty('--primary-foreground', accent.hsl)
  }, [accent])

  if (hidden) return null

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-2">
      <span className="mono-label border border-ink bg-paper px-3 py-2 shadow-brutal-sm">
        <Swatch hex={accent.hex} /> {accent.hex}
      </span>
      <button
        type="button"
        onClick={() => setAccent(randomAccent())}
        aria-label="Couleur d'accent aléatoire"
        title="Accent aléatoire"
        className="grid h-11 w-11 place-items-center border border-ink bg-ink text-base font-bold text-paper transition-colors duration-150 hover:bg-accent hover:text-paper"
      >
        ⇄
      </button>
      <button
        type="button"
        onClick={() => setHidden(true)}
        aria-label="Masquer le sélecteur d'accent"
        title="Retirer (temporairement)"
        className="grid h-11 w-11 place-items-center border border-ink bg-paper text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
      >
        ×
      </button>
    </div>
  )
}

export default AccentTuner