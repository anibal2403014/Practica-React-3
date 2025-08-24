# Practica React 3

App en React + Vite + TypeScript que lista **naves de Star Wars** desde SWAPI.

## Tecnologías
- React + Vite + TS
- Tailwind CSS v4

## Características
- Manejo de **loading** y **errores** con UI.
- **Componente** `StarshipCard` para cada tarjeta.
- **Respaldo**: si `swapi.dev` falla, usa `swapi.py4e.com`.

## Scripts
- `npm run dev` – modo desarrollo (http://localhost:5173/Practica-React-3/)
- `npm run build` – build de producción
- `npm run preview` – previsualizar build
- `npx gh-pages -d dist` – publicar en GitHub Pages

## Deploy
Se publica en **GitHub Pages**. Asegura en `vite.config.ts`:
```ts
base: "/Practica-React-3/"
