import React from 'react'
import { FaReact, FaVuejs, FaHtml5, FaCss3, FaJava, FaPython, FaPhp, FaSass } from 'react-icons/fa'
import { DiJavascript, DiDocker, DiTerminal } from 'react-icons/di'
import { SiTypescript, SiSvelte, SiSymfony, SiGo } from 'react-icons/si'
import { VscTerminalPowershell } from 'react-icons/vsc'
import { HiOutlineCode } from 'react-icons/hi'

type IconComponent = React.ComponentType<{ className?: string; title?: string }>

const LANGUAGE_ICONS: Record<string, IconComponent> = {
  JavaScript: DiJavascript,
  TypeScript: SiTypescript,
  Go: SiGo,
  Dockerfile: DiDocker,
  Shell: DiTerminal,
  PowerShell: VscTerminalPowershell,
  Svelte: SiSvelte,
  HTML: FaHtml5,
  CSS: FaCss3,
  SCSS: FaSass,
  PHP: FaPhp,
  Java: FaJava,
  Python: FaPython,
  React: FaReact,
  Vue: FaVuejs,
  Symfony: SiSymfony,
  Hack: HiOutlineCode,
}

export default function LanguageIconSet({
  language,
  className,
}: {
  language: string
  className?: string
}): JSX.Element {
  const Icon = LANGUAGE_ICONS[language]

  if (!Icon) {
    return <span className={className}>{language}</span>
  }

  return <Icon className={className} title={language} />
}
