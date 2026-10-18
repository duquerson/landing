# Plan 001 — Restaurar i18n (Qwik Speak 0.24) y bases de accesibilidad

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Función pura de resolución de idioma + test | 5 |
| Carga de traducciones en servidor | 2 |
| Locale por petición (`plugin.ts`) + `entry.ssr` + `entry.dev` | 5, 6 |
| `root.tsx` con el provider actual + `theme-color` | 1, 13 |
| Plugin inline de Vite + función de traducción en los 8 componentes | 3, 4, 8 |
| Skip link + anclas con desplazamiento | 9, 11 |
| Menú móvil + etiqueta traducible del nav | 10, 14 |
| `aria-live` en los mensajes del formulario | 12, 14 |
| Verificación y memoria | 7, 8 |

## Archivos

**Nuevos**

- `src/speak-locale.ts` — `resolveLocale(header, config)`: función pura que devuelve el código de idioma. Sin efectos secundarios, sin acceso a red.
- `src/speak-functions.ts` — `translationFn.loadTranslation$`: QRL de servidor que resuelve el JSON del idioma y el asset pedidos.
- `src/routes/plugin.ts` — `onRequest` que lee `Accept-Language`, llama a `resolveLocale` y fija `locale()`.

**Modificados**

- `vite.config.ts` — añadir `qwikSpeakInline` con `basePath: './public'` y `assetsPath: 'i18n'`.
- `src/root.tsx` — sustituir el provider inexistente por la llamada al hook de inicialización con `config` y `translationFn`; añadir `theme-color`; quitar el `viewport` duplicado.
- `src/entry.ssr.tsx` — `base` según `serverData.locale` y `lang` dinámico en `containerAttributes`.
- `src/entry.dev.tsx` — usar `render` de `@builder.io/qwik` en lugar de la función inexistente.
- `src/components/{hero,navbar,about,projects,experience,skills,contact,footer}/*.tsx` — función de traducción vigente y `scroll-mt` en las secciones con ancla.
- `src/components/navbar/navbar.tsx` — menú móvil, `aria-label` traducible, cierre con `Escape`.
- `src/routes/layout.tsx` — skip link y `<main id="main" tabindex="-1">`.
- `src/components/contact/contact.tsx` — `aria-live` y `role` en los mensajes de estado.
- `src/components/router-head/router-head.tsx` — quitar el `viewport` duplicado.
- `public/i18n/es-CL/app.json` y `public/i18n/en-US/app.json` — claves `a11y.skip`, `a11y.menu`, `navbar.aria_label`.
- `MEMORY.MD` — al cerrar la spec.

## Decisiones

1. **Resolución de idioma por `Accept-Language` en el servidor, sin selector manual.**
   Alternativa descartada: selector es/en en el navbar. Necesita cookie o rutas por idioma, lo que amplía la spec y toca el routing (prohibido sin preguntar).
2. **Traducciones en `public/i18n` con `basePath: './public'`.**
   Alternativa descartada: mover la carpeta a `i18n/` en la raíz del proyecto. Evita `basePath`, pero añade una carpeta en la raíz y `AGENTS.md` pide preguntar antes.
3. **`loadTranslation$` con `server$` e `import.meta.glob`.**
   Alternativa descartada: `fetch` a `/i18n/<lang>/app.json` desde el navegador. Duplicaría la descarga: los archivos ya se inlinean en los chunks.
4. **`resolveLocale` como función pura aparte, testeada con `node --test`.**
   Alternativa descartada: lógica dentro de `plugin.ts`. Un `RequestHandler` no se puede testear sin levantar el servidor, y la constitución pide lógica separada y testable sin dependencias.
5. **Menú móvil con `useSignal` en lugar de `<details>`.**
   Alternativa descartada: `<details>`/`<summary>` nativo. El control lo dibuja el navegador, fuera del sistema de color y foco del proyecto.
6. **El salto de anclas se resuelve con `scroll-mt` en cada sección.**
   Alternativa descartada: `scroll-padding-top` global. Con sticky positioning, el margen por sección es más explícito y no depende de la cascada.

## Estrategia de tests

`node --test` nativo, sin dependencias. Un único archivo `src/speak-locale.test.ts` con casos para: cabecera ausente, cabecera vacía, idioma no admitido (`ja-JP`), idioma con región distinta (`es-MX` → `es-CL`), varios idiomas con el primero no admitido, lista vacía y coincidencia exacta. La lógica de los componentes es de presentación y no se testea; la verificación de la interfaz se hace con el MCP de Chrome DevTools.

## Orden

Primero la lógica pura con su test en rojo, luego la infraestructura de idioma, después los componentes, y por último la accesibilidad y la verificación. Cada tarea deja el proyecto en un estado coherente.