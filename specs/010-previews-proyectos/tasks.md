# Tareas 010 — Previews visuales de proyectos destacados

Estado: **implementadas y verificadas**.

## T1 — Incorporar capturas reales — HECHA (RF 1–3)

**RF**: 1–3

Guardar la captura adjunta de Game Learning como recurso local y registrar las URLs directas
proporcionadas para REST Countries y Todo App.

**Hecho cuando**: existe la captura local de Game Learning y cada una de las tres fuentes
corresponde visualmente al proyecto cuyo nombre contiene.

**Hecho**: La captura adjunta se guardó como `public/img/projects/game-learning.png`; REST
Countries y Todo App usan exactamente las URLs directas proporcionadas.

## T2 — Añadir textos alternativos bilingües — HECHA (RF 4)

**RF**: 4

Agregar `preview_alt` para p1, p2 y p3 en los catálogos es/en con claves literales.

**Hecho cuando**: ambos JSON parsean y cada preview se puede describir en los dos idiomas.

**Hecho**: Se añadieron claves `preview_alt` localizadas para p1, p2 y p3 en es/en.

## T3 — Renderizar previews accesibles — HECHA (RF 1–6)

**RF**: 1–6

Extender el arreglo de proyectos y las tarjetas para mostrar cada imagen con `alt`,
`width`, `height`, `loading="lazy"`, `decoding="async"` y clases Tailwind responsive.

**Hecho cuando**: las tres tarjetas muestran su imagen sin overflow y mantienen los enlaces,
el foco y el contenido bilingüe existentes.

**Hecho**: `projects.tsx` muestra las tres imágenes con dimensiones, carga diferida,
decodificación asíncrona, `alt` localizado y `object-contain` responsive.

## T4 — Verificar y cerrar — HECHA (RF 1–6)

**RF**: 1–6

Comprobar recursos, JSON, ausencia de URLs remotas de preview, lint, tests y actualizar la
memoria.

**Hecho cuando**: `pnpm lint` y `pnpm test --test-isolation=none` pasan y la memoria describe
el cambio.

**Hecho**: Lint y 35 tests pasan; el recurso local existe y no se usan iframes ni servicios
de captura dinámicos.
