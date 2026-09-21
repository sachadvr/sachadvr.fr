import path from 'path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Remplace le `<link rel="stylesheet">` de l'entrée par un `<style>` inline.
 * La feuille est petite (~5 ko gzip) et son aller-retour réseau bloquait le
 * premier rendu : l'inliner supprime ce saut du chemin critique.
 */
function inlineEntryStylesheet(): Plugin {
  return {
    name: 'inline-entry-stylesheet',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html

      return html.replace(
        /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g,
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineEntryStylesheet()],
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
