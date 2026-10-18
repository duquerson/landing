# Tareas 004 — Tokens semánticos de Tailwind CSS v4 y accesibilidad WCAG 2.2 AA

## T1 — Configurar `@theme` en Tailwind CSS v4 y reglas de a11y en `global.css`

**RF**: 1, 3, 7

Definir los tokens semánticos en `src/app/styles/global.css` usando `@theme` de Tailwind v4, manteniendo compatibilidad de `:root` para estilos base del documento y reforzando las reglas globales de `:focus-visible` y `prefers-reduced-motion`.

**Hecho cuando**: `global.css` incluye la directiva `@theme` con variables semánticas (`--color-bg-primary`, `--color-bg-card`, `--color-border-subtle`, `--color-text-main`, `--color-text-muted`, `--color-accent`, etc.) y `pnpm build` compila sin errores de CSS.

## T2 — Añadir traducciones para enlaces externos en Qwik Speak

**RF**: 5

Agregar la clave `external_link` dentro del bloque `a11y` en `public/i18n/es/app.json` ("se abre en una nueva pestaña") y `public/i18n/en/app.json` ("opens in a new tab").

**Hecho cuando**: Ambas claves existen en los archivos JSON y están disponibles para `inlineTranslate()`.

## T3 — Refactorizar `Navbar` y `Footer` con tokens semánticos y a11y mejorada

**RF**: 2, 4, 6

En `navbar.tsx`, aplicar tokens semánticos y asegurar tamaño de toque mínimo de 44×44px en el botón hamburguesa (`min-w-[44px] min-h-[44px] inline-flex items-center justify-center`) y enlaces móviles con padding holgado. En `footer.tsx`, reemplazar el texto secundario por `text-text-muted` garantizando ratio de contraste > 4.5:1.

**Hecho cuando**: Ambos componentes usan clases del tema y el botón de menú mide al menos 44px de alto y ancho.

## T4 — Refactorizar `Hero`, `About`, `Projects`, `Experience`, `Skills` y `ContactForm`

**RF**: 2, 3, 5

Actualizar las secciones restantes para utilizar los tokens semánticos de `@theme` (`bg-bg-card`, `border-border-subtle`, `text-text-main`, `text-text-muted`, etc.), añadir el anuncio para lectores de pantalla en los enlaces externos de `projects.tsx` (`<span class="sr-only"> ({t("a11y.external_link")})</span>`), y normalizar las clases de foco a la regla global.

**Hecho cuando**: Ninguna sección contiene colores `slate-*` o `blue-*` hardcodeados en sus contenedores base y los enlaces externos tienen la etiqueta para lectores de pantalla.

## T5 — Verificación y actualización de memoria

**RF**: 1, 2, 3, 4, 5, 6, 7

Ejecutar `pnpm lint`, `pnpm test` y `pnpm build` para asegurar que el proyecto compila limpiamente, no hay regresiones de tipos ni de pruebas, y actualizar `MEMORY.md`.

**Hecho cuando**: `pnpm lint`, `pnpm test` y `pnpm build` finalizan con código 0 y `MEMORY.md` refleja la finalización de la spec 004.
