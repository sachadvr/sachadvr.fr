import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LANGUAGES, languagePrefix } from '@/i18n/config'
import LanguageLayout from '@/i18n/LanguageLayout'
import AccentTuner from '@/components/AccentTuner'
import { routerBasename } from '@/lib/base-path'
import Home from '@/pages/Home'

// Home reste en statique : c'est la route d'entrée, la découper retarderait le LCP.
const NotFound = lazy(() => import('@/pages/NotFound'))
const Repo = lazy(() => import('@/pages/Git/[repo]'))
const Links = lazy(() => import('@/pages/Links'))
const UtilisationCGU = lazy(() => import('@/pages/UtilisationCGU'))
const UtilisationCGV = lazy(() => import('@/pages/UtilisationCGV'))

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter basename={routerBasename(import.meta.env.BASE_URL)}>
        <Suspense fallback={null}>
          <AccentTuner />
          <Routes>
            {LANGUAGES.map(({ code }) => (
              <Route
                key={code}
                path={languagePrefix(code) || '/'}
                element={<LanguageLayout language={code} />}
              >
                <Route index element={<Home />} />
                <Route path="cgu" element={<UtilisationCGU />} />
                <Route path="cgv" element={<UtilisationCGV />} />
                <Route path="links" element={<Links />} />
                <Route path="git/:repoName" element={<Repo />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
