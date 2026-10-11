import React from "react";
import "./index.scss";
import App from "./App";

import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import { activateLanguage } from "@/i18n";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  applyDensity,
  isSupportedLanguage,
  languageDefinition,
  localizePath,
} from "@/i18n/config";
import { stripBasePath, withBasePath } from "@/lib/base-path";

// La langue doit être fixée avant le premier rendu, sinon la page flashe en français
// puis se redécale (CLS) quand LanguageLayout redirige après coup vers la langue préférée.
// Résolution + réécriture d'URL faites ici, avant `root.render`, pour que l'app monte
// directement sur la bonne langue sans jamais peindre la version française transitoire.
// Sous GitHub Pages, le pathname commence par le chemin de base (`/sachadvr.fr/en`) :
// on raisonne sur le chemin applicatif, celui que voit react-router.
const appPath = stripBasePath(window.location.pathname, import.meta.env.BASE_URL);
const pathLanguage = appPath.split("/")[1];

function preferredLanguage(): string {
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isSupportedLanguage(stored ?? undefined)) return stored as string;
  const browser = (window.navigator.language || DEFAULT_LANGUAGE).split("-")[0];
  return isSupportedLanguage(browser) ? browser : DEFAULT_LANGUAGE;
}

const initialLanguage = isSupportedLanguage(pathLanguage)
  ? pathLanguage
  : preferredLanguage();

// Redirection limitée à la racine nue : cf. LanguageLayout, ne jamais détourner
// les URLs françaises profondes (/cgu, /git/...) pour rester indexables par langue.
if (!isSupportedLanguage(pathLanguage) && appPath === "/" && initialLanguage !== DEFAULT_LANGUAGE) {
  const target = withBasePath(localizePath("/", initialLanguage), import.meta.env.BASE_URL);
  window.history.replaceState(null, "", `${target}${window.location.search}${window.location.hash}`);
}

document.documentElement.lang = languageDefinition(initialLanguage).hreflang;
applyDensity(initialLanguage);

const container = document.getElementById("root");

if (!container) throw new Error("Could not find root element with id 'root'");

const root = createRoot(container);

activateLanguage(initialLanguage).finally(() => {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
});
