# BUCLE — Donuts + Coffee

Proyecto conceptual de marca y desarrollo web para **BUCLE**, una cadena
ficticia de donuts y café creada como pieza de portfolio por **Takumi
Studio** (2026). No es un negocio real: no procesa pagos, no envía datos a
ningún servidor y todos los locales, teléfonos y precios son de
demostración.

> _"Uno lleva a otro."_ — La idea central de la marca: la repetición
> convertida en ritual.

## Stack técnico

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- React 19 + TypeScript estricto
- Tailwind CSS 4 (tokens de marca vía `@theme` en `globals.css`)
- Context + `useReducer` para el carrito (persistido en `localStorage`)
- `react-hook-form` + `zod` para validación de formularios
- `lucide-react` para iconografía funcional
- Vitest + Testing Library para pruebas unitarias

## Instalación y arranque

```bash
npm install
npm run dev
```

La web se sirve en `http://localhost:3000` (o el puerto que indique la
terminal).

## Scripts

| Script              | Descripción                                |
| -------------------- | ------------------------------------------- |
| `npm run dev`         | Servidor de desarrollo con Turbopack        |
| `npm run build`       | Build de producción                         |
| `npm run start`       | Sirve el build de producción                |
| `npm run lint`        | ESLint                                      |
| `npm run typecheck`   | `tsc --noEmit`                              |
| `npm run test`        | Tests unitarios (Vitest)                    |
| `npm run format`      | Prettier (con plugin de Tailwind)           |

## Estructura del proyecto

```
src/
  app/                 Rutas (App Router): home, carta, pedido, locales,
                        nosotros, contacto, legal/*, not-found, SEO routes
  components/
    brand/              Logo, CERO (mascota), icono del bucle
    commerce/            Tarjetas de producto, modal, carrito, configurador,
                          constructor de cajas, filtros de carta
    forms/                Formularios de contacto y newsletter
    layout/               Header, menú móvil, footer
    locations/            Tarjeta de local
    order/                 Formulario y confirmación de pedido
    sections/              Bloques editoriales de la home
    misc/                   Banner de cookies, textos legales
    ui/                      Primitivos (botón, marquesina, badges…)
  config/                Identidad de marca y configuración del sitio
  data/                  Catálogo de productos, locales, navegación
  lib/                   Carrito, checkout de demo, validación, SEO, utils
  types/                 Tipos compartidos
public/
  images/                Fotografía e ilustraciones reales de la marca
  og/                    Imagen Open Graph
```

## Recursos visuales

Todas las fotografías de producto, packaging, fachada, interior, delivery y
piezas editoriales en `public/images/` son ilustraciones generadas para
este proyecto conceptual. El logotipo y la mascota CERO se generan como
componentes (`src/components/brand/Logo.tsx`, `Cero.tsx`) en lugar de
archivos de imagen, para poder sustituirlos por vectores reales sin tocar
el resto de la web.

## Personalizar el proyecto

- **Marca**: `src/config/brand.ts` (nombre, colores, eslóganes).
- **Datos del sitio**: `src/config/site.ts` (contacto, redes, textos legales).
- **Catálogo**: `src/data/products.ts`.
- **Locales**: `src/data/locations.ts`.

## Despliegue

### Vercel

No requiere configuración especial. Importa el repositorio en Vercel y
despliega — `next.config.ts` solo activa la exportación estática cuando
detecta `DEPLOY_TARGET=github-pages`, así que en Vercel se sirve como una
app Next.js normal (SSR/ISR disponibles si se necesitan en el futuro).

### GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` construye una exportación
estática (`next build` con `output: "export"`) y la publica en GitHub
Pages en cada push a `main`. Configura `basePath`/`assetPrefix`
automáticamente a partir del nombre del repositorio, así que funciona bajo
`https://usuario.github.io/nombre-repo/` sin tocar código.

Para activar el despliegue:

1. En GitHub → Settings → Pages, selecciona "GitHub Actions" como fuente.
2. Haz push a `main`.

Para probar la exportación estática en local:

```bash
DEPLOY_TARGET=github-pages NEXT_PUBLIC_BASE_PATH=/bucle-web npm run build
npx serve out
```

## Alcance y límites de la demo

- El checkout de `/pedido` es una simulación: genera un número de pedido
  local y no realiza ningún cobro ni llamada de red.
- Los formularios de contacto y newsletter no envían datos a ningún
  backend.
- Las páginas legales son textos de demostración, no asesoramiento
  jurídico.
- No se incluye licencia — queda a decisión de la propietaria del
  proyecto.

---

Diseñado por [Takumi Studio](https://www.takumistudio.es). BUCLE es una
marca ficticia creada con fines de portfolio.
