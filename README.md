# Inmobiliaria - Frontend

Frontend de la app inmobiliaria (Vite + React).

Repositorio: https://github.com/InakiFarinas/Inmobiliaria-Zanola

Sitio desplegado: https://inmobiliaria-zanola.vercel.app

## Descripción

Single Page App en React (Vite) para listar y filtrar propiedades, ver detalles y contactar. Nuevas mejoras incluidas en esta rama:

- Hero móvil con mini galería/imagen destacada
- Panel de filtros convertido en drawer en mobile
- Optimización: consulta de conteo (`getPropertiesCount`) para evitar traer todos los registros
- Mejoras en el admin: miniaturas en cada fila y panel a ancho completo
- Animación suave del menú hamburguesa

## Estructura principal

- `index.html`, `package.json`, `vite.config.js`
- `src/` — código React
  - `App.jsx` — rutas
  - `pages/` — `HomePage.jsx`, `AboutPage.jsx`, `PropertiesPage.jsx`, `PropertyDetailPage.jsx`, `ContactPage.jsx`, `admin/*`
  - `components/` — Layout, PropertyCard, PropertyFilters, PropertyGallery, PropertyMap, icons
  - `styles/` — Tailwind / CSS utilities
  - `lib/` — `api.js`, `utils.js`

## Requisitos

- Node.js 18+ (recomendado)
- npm o yarn

## Variables de entorno

Crear un archivo `.env` en la raíz con las claves de Supabase (necesarias para llamadas reales):

```
VITE_SUPABASE_URL=https://...your-supabase-url...
VITE_SUPABASE_ANON_KEY=your-anon-key
BASE_URL=/  # opcional
```

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

## Deploy en Vercel

1. Conectar el repo de GitHub a Vercel (Import Project).
2. Build Command: `npm run build`
3. Output Directory: `dist`

CLI deploy (opcional):

```bash
npm i -g vercel
vercel --prod
```

## Notas y recomendaciones

- El `ContactPage` usa validación cliente; para producción se recomienda añadir un endpoint que envíe correos o guarde los mensajes.
- Para el conteo total de propiedades (mostrado en el `hero`) se añadió `getPropertiesCount()` en `src/lib/api.js` para evitar transferir todos los registros.
- Si desplegás en Vercel, configura las variables de entorno en el panel de Vercel (no subir `.env` al repo).

## Cómo contribuir

```bash
git checkout -b feature/mi-cambio
git add .
git commit -m "feat: descripción"
git push origin feature/mi-cambio
# luego abrir PR en GitHub
```

## Contacto

Maintainer: Inaki Farinas — ver el repo en GitHub.
