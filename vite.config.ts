import fs from 'fs'
import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

import { DEFAULT_SITE_URL, normalizeBasePath, siteRootUrl } from './src/lib/base-path'

// `/` pour Docker/nginx, `/sachadvr.fr/` pour GitHub Pages (cf. deploy-pages.yml).
const basePath = normalizeBasePath(process.env.BASE_PATH)
// Origine publique (`SITE_URL`, ex. https://sachadvr.github.io) + base : URLs absolues SEO
// (canonical, hreflang, OG, JSON-LD). Sans `SITE_URL`, domaine canonique https://sachadvr.fr.
const siteUrl = siteRootUrl(process.env.SITE_URL, basePath)

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Remplace le `<link rel="stylesheet">` de l'entrée par un `<style>` inline.
 * La feuille est petite (~5 ko gzip) et son aller-retour réseau bloquait le
 * premier rendu : l'inliner supprime ce saut du chemin critique.
 */
function inlineEntryStylesheet(base: string): Plugin {
  const stylesheetLink = new RegExp(`<link rel="stylesheet"[^>]*href="${escapeRegExp(base)}(assets/[^"]+\\.css)"[^>]*>`, 'g')

  return {
    name: 'inline-entry-stylesheet',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html

      return html.replace(
        stylesheetLink,
        (linkTag, fileName: string) => {
          const stylesheet = ctx.bundle?.[fileName]
          if (stylesheet?.type !== 'asset') return linkTag

          delete ctx.bundle?.[fileName]
          return `<style>${stylesheet.source}</style>`
        }
      )
    },
  }
}

/**
 * Réécrit le domaine canonique codé en dur (baseline SEO d'`index.html`, fichiers
 * texte de `public/`) vers l'URL réelle du déploiement. No-op au déploiement racine
 * par défaut : le HTML source reste lisible et identique à la prod.
 */
function rewriteSiteUrl(url: string): Plugin {
  const hardcodedSiteUrl = new RegExp(`${escapeRegExp(DEFAULT_SITE_URL)}(?![\\w-])`, 'g')
  const publicTextFiles = ['robots.txt', 'sitemap.xml', 'llms.txt', 'ai-catalog.json']
  let outDir = 'dist'

  return {
    name: 'rewrite-site-url',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    transformIndexHtml(html) {
      return html.replace(hardcodedSiteUrl, url)
    },
    closeBundle() {
      if (url === DEFAULT_SITE_URL) return

      for (const fileName of publicTextFiles) {
        const filePath = path.join(outDir, fileName)
        if (!fs.existsSync(filePath)) continue
        fs.writeFileSync(filePath, fs.readFileSync(filePath, 'utf8').replace(hardcodedSiteUrl, url))
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  },
  plugins: [react(), inlineEntryStylesheet(basePath), rewriteSiteUrl(siteUrl)],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
