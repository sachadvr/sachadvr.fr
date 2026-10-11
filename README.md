<h1 align="center" id="title">Sachadvr</h1>

<p id="description">Portfolio website of sachadvr</p>

<h2>🚀 Demo</h2>

[Sachadvr.fr](Sachadvr.fr)

<img src="https://raw.githubusercontent.com/sachadvr/sachadvr.fr/main/src/images/preview.png" alt="preview" width="300px">

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Using Github Api to display repos
*   React Routes
*   Contact Form

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   ReactJS
*   Vite
*   TypeScript
*   Tailwind
*   RTK
*   ESLint

<h2>📦 Dependencies</h2>

*   FontAwesome
*   Github Markdown Css
*   React markdown (Rehype raw/Remark gfm)
*   React icons
*   Sass

<h2>🐳 Local run (Docker)</h2>

<h3>Dev (hot reload)</h3>

```bash
docker compose --profile dev up -d --build
```

*   `website-dev` → http://localhost:5173 (serveur Vite, HMR actif)
*   Le code est monté en volume : toute modification dans `src/` est rechargée sans rebuild.
*   Après un changement de `package.json`, relancer avec `--build` (les `node_modules` vivent dans l'image).

<h3>Prod (nginx)</h3>

```bash
docker compose --profile prod up -d --build
```

*   `website` → http://localhost (nginx + build Vite)
*   `api-mock` → http://localhost:3001 (nginx servant des réponses statiques, aucune dépendance au vrai backend)

L'URL de l'API est injectée au build via l'argument `VITE_API_URL` (défaut : `https://api.sachadvr.fr`). En local, docker-compose la pointe sur `api-mock`. Pour viser la vraie API :

```bash
VITE_API_URL=https://api.sachadvr.fr docker compose --profile prod up -d --build
```

Endpoints mockés (`docker/api-mock/`) : `GET /repos`, `GET /repos/{repo}/languages`, `POST /mail/sender`.

<h2>🌍 Internationalisation & SEO</h2>

Le site est servi en 5 langues : français (défaut), anglais, espagnol, chinois simplifié, japonais.

*   Le français n'a **pas** de préfixe d'URL (`/cgu`), les autres langues en ont un (`/en/cgu`, `/ja/cgu`…).
*   Toute la configuration vit dans `src/i18n/` : `config.ts` (langues, helpers d'URL), `site.ts` (identité, ville, image OG), `locales/*.json` (contenus), `LanguageLayout.tsx` (racine de routes par langue).
*   Les liens internes passent par `<LocalizedLink>` ou `useLocalizedPath()`, jamais par `<Link>` directement, sinon le préfixe de langue est perdu.
*   `<Seo>` produit `title`/`description`/`canonical`/`hreflang`/Open Graph/Twitter par page et par langue ; `<StructuredData>` produit le JSON-LD `Person`/`WebSite`/`BreadcrumbList`.
*   `public/` est servi à la racine du site : `robots.txt`, `sitemap.xml` (multilingue, avec alternates `xhtml:link`), `llms.txt`, `preview.png` (image de partage).
*   `index.html` porte la baseline SEO française ; ces balises sont marquées `data-rh="true"` pour que react-helmet-async les remplace au montage au lieu de les dupliquer.

Après ajout d'une page ou d'une langue : mettre à jour `LANGUAGES` dans `src/i18n/config.ts`, les routes dans `src/App.tsx`, `public/sitemap.xml` et `public/llms.txt`.

<h2>💖Like my work?</h2>

If you have any inquiries please do not hesitate to contact me at contact@sachadvr.fr