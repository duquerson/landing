# Tareas 007 — Órbita accesible de tecnologías para el hero

Estado: **T1, T2 y T3 completadas; T4 parcial**.

## T1 — Preparar recursos, tema y traducciones — HECHA

**RF**: 5, 8–9, 13–14

Usar `@devicons-pack/sprite` (versión 2.1.0), ya instalado, y guardar en `public/icons/devicon/original.svg` el subconjunto local de los símbolos en sus colores originales. Como Devicon no incluye Hono, añadir su símbolo de Simple Icons al sprite local y registrar ambas licencias. Preparar los tokens semánticos y las traducciones es/en de accesibilidad.

**Hecho cuando**: El sprite Devicon local incluye marcas originales a color; el tema publica los tokens de órbita requeridos; y cada clave nueva tiene traducción en español e inglés.

**Hecho**: La dependencia está instalada; el sprite local contiene los símbolos requeridos, incluido Hono, y conserva sus colores de marca. Se registraron las licencias pertinentes en `public/icons/devicon/LICENSES.md`.

## T2 — Construir la órbita visual y su control accesible — HECHA

**RF**: 4–13, 15, 17–18

Crear/ajustar `HeroOrbit.tsx` con `public/Hero-img.png` como sol central, máscara difuminada, doce símbolos en sus órbitas y colores originales; ajustar tamaño con utilidades Tailwind. Implementar el control de pausa/reanudación y la interacción de puntero especificada, con soporte para movimiento reducido.

**Hecho cuando**: La órbita interior muestra Hono.js/JavaScript/CSS/Tailwind CSS/Node.js/HTML5 con radio 35cqw y duración 24s, separada visualmente de la foto; la exterior muestra Qwik/Astro/Vue/Next.js/Nuxt.js/React con radio 42cqw y duración 36s; la foto tiene alt localizado y máscara suave; el control pausa/reanuda ambas órbitas; al entrar sobre la foto los logotipos giran hasta salir de la escena; cada insignia crece 5% y adopta el fondo de página al recibir hover; y movimiento reducido desactiva las animaciones.

## T3 — Integrar la composición responsive sin reescribir el hero — HECHA

**RF**: 1–3

Actualizar `hero.tsx` para colocar el texto existente a la izquierda y la órbita a la derecha en pantallas anchas, apilándola debajo del texto en móvil. Conservar exactamente el badge, título, descripción, etiquetas de CTA y destinos.

**Hecho cuando**: El hero usa el orden solicitado en escritorio y móvil, y el texto y los enlaces actuales no cambian.

## T4 — Verificar presentación y accesibilidad — PARCIAL

**RF**: 1–18

Ejecutar las verificaciones de tipos/compilación del proyecto y revisar el hero con DevTools en es/en, anchos móvil/escritorio, teclado y preferencia de movimiento reducido. No crear una suite de tests para esta presentación.

**Verificado en esta iteración**: `pnpm lint` pasa con Node 24; `pnpm test --test-isolation=none` pasa los 35 tests; el sprite local contiene exactamente doce símbolos, incluye Hono y ya no incluye Docker. Tailwind genera las utilidades `animate-orbit`, `animate-orbit-reverse` y `animate-spin`. Windows reporta desactivadas las animaciones de área cliente; el CSS respeta `prefers-reduced-motion` y mantiene estáticas las órbitas por accesibilidad en ese estado.

**Pendiente por el entorno**: `pnpm dev` y `pnpm build.client` fallan antes de cargar la aplicación porque el sandbox rechaza el proceso hijo de esbuild (`spawn EPERM`), incluso con Node 24. La revisión visual interactiva en DevTools y las pruebas manuales de movimiento/teclado/hover aún están pendientes.
