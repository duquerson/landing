# Plan 008 — Perfil profesional, experiencia y formación

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Experiencia independiente y periodo localizado | 1–3 |
| Formación sin inventar datos faltantes | 4–5 |
| Habilidades verificables y exclusiones | 6–7 |
| Traducciones es/en y presentación adaptable | 8 |

## Archivos

**Modificados**

- `src/components/experience/experience.tsx` — separar visualmente la experiencia de la
  formación, conservar únicamente el TSU y formatear sus fechas con `useFormatDate`.
- `public/i18n/es/app.json`, `public/i18n/en/app.json` — reemplazar los datos actuales de
  experiencia, añadir las traducciones de formación y ajustar las habilidades seleccionadas.
- `MEMORY.md` — registrar el contenido de perfil acordado y las exclusiones relevantes.

No se modifican rutas, estilos globales, dependencias ni la arquitectura; no se necesita
cambiar `skills.tsx` porque ya presenta tres categorías traducidas desde Qwik Speak.

## Decisiones

1. **La experiencia se presenta como independiente y basada en proyectos personales.**
   El rol será “Desarrollador Frontend independiente” y el contexto “Proyectos personales”; no
   se agregará un empleador. Alternativa descartada: conservar empleadores/periodos previos o
   presentar un puesto en empresa.
2. **La formación será una subsección de la sección `#experience`.** Se conserva el ancla de
   navegación actual y se añade un encabezado de “Formación”, evitando un cambio de routing o
   del menú. Alternativa descartada: crear una nueva sección y un nuevo enlace de navegación.
3. **Las fechas seguirán como ISO en traducciones y se formatearán con Qwik Speak.** El inicio
   del trabajo será `2025-09-01`; los estudios universitarios usarán fechas que solo muestran
   año (`2008-01-01` y `2012-01-01`).
   Alternativa descartada: hardcodear rangos presentacionales en TSX.
4. **Las habilidades combinan tecnologías descritas por el usuario y evidencia del portfolio.**
   Se incluyen React, Astro y Vue 3 por los proyectos descritos; Qwik, SSR, Zod, `node:test` y
   Netlify por el stack actual. Se excluyen localStorage, Vitest, Playwright y Vercel por no
   tener evidencia confirmada. La mención de soporte/hardware se omite de Formación según la
   petición y no se añade como habilidad frontend. Alternativa descartada: atribuir usos o
   experiencia no corroborados.
5. **Todas las cadenas de contenido seguirán usando claves literales de `inlineTranslate()`.**
   Alternativa descartada: textos visibles en TSX o claves construidas dinámicamente.

## Estrategia de verificación

- `pnpm lint` para validar tipos y claves de traducción rastreadas por el proyecto.
- `pnpm test` para asegurar que los tests nativos existentes siguen en verde.
- Revisar las traducciones en ambos JSON y comprobar los rangos `es/en` con `useFormatDate`.
- Intentar previsualizar `/es/` y `/en/` en Chromium; si Vite vuelve a fallar con `spawn EPERM`,
  dejar registrado ese límite del entorno y no declarar validación visual completada.

## Orden

1. Actualizar datos y claves en las traducciones española e inglesa, quitando el título
   técnico de la educación.
2. Ajustar `experience.tsx` para presentar experiencia y educación en bloques separados con
   únicamente el TSU y sus fechas localizadas.
3. Ejecutar lint/tests y revisar las dos traducciones; intentar comprobación visual si el
   servidor puede iniciarse.
4. Actualizar `MEMORY.md` con el resultado y las decisiones.
