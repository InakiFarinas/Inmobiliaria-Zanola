# Inmobiliaria - Frontend

Proyecto frontend de la app inmobiliaria (Vite + React).

## Repositorio

https://github.com/InakiFarinas/Inmobiliaria-Zanola

## Sitio desplegado

https://inmobiliaria-neon-eight.vercel.app

## Descripción

SPA en React (Vite) que muestra propiedades, página About y formulario de Contacto.
Trabajo principal realizado:

- Hero con buscador compacto flotando entre secciones
- Grid de propiedades responsivo (4 / 2 / 1 columnas)
- Cards con stripe redondeada
- Página de Contacto con formulario (cliente-simulado)

## Estructura principal

- `index.html`, `package.json`, `vite.config.js`
- `src/` — código React
  - `App.jsx` — rutas
  - `pages/` — `HomePage.jsx`, `AboutPage.jsx`, `PropertiesPage.jsx`, `PropertyDetailPage.jsx`, `ContactPage.jsx`
  - `components/` — Layout, PropertyCard, PropertyFilters, PropertyGallery, PropertyMap, icons
  - `styles/` — CSS segmentado (`base.css`, `hero.css`, `catalog.css`, `responsive.css`)
  - `lib/` — `api.js`, `mockData.js`, `utils.js`

## Requisitos

- Node.js 18+ (recomendado)
- npm o yarn

## Scripts

Instalar dependencias y ejecutar en desarrollo:

```bash
npm install
npm run dev
```

Build y previsualizar:

```bash
npm run build
npm run preview
```

El `package.json` incluye los scripts habituales (`dev`, `build`, `preview`).

## Deploy en Vercel (pasos)

1. Conectar el repo de GitHub a Vercel (Import Project).
2. Configurar build:
   - Build Command: `npm run build` (o `vite build`)
   - Output Directory: `dist`
3. Deployar.

Opción CLI (si prefieres desplegar desde la máquina):

```bash
# opcional: instalar vercel
npm i -g vercel
vercel login
# dentro del proyecto
vercel --prod
```

Usar token no interactivo (CI):

```bash
VERCEL_TOKEN=xxxx vercel --prod --token $VERCEL_TOKEN
```

Recomendación: añadir un `VERCEL_TOKEN` como secret en GitHub Actions o en los Environment Variables de Vercel para despliegues automatizados.

## Notas sobre el proyecto

- El formulario de `ContactPage` es cliente-simulado: guarda/valida localmente y muestra un mensaje. Si querés integrar un backend, crear un endpoint que reciba `POST` con `nombre`, `email`, `telefono`, `descripcion`.
- El logo de alta resolución no está incluido; si querés lo optimizo y lo subo (SVG preferido).
- Para cambios de diseño, revisá los archivos en `src/styles/`.

## Cómo contribuir / actualizar

```bash
git checkout -b feature/mi-cambio
git add .
git commit -m "feat: descripción"
git push origin feature/mi-cambio
# luego abrir PR en GitHub
```

## Contacto

Repo maintainer: Inaki Farinas — ver el repo en GitHub.
