# Plan 009 — Proyectos destacados del portfolio

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Datos y traducciones de proyectos | 1–4, 9 |
| Repositorios y demos | 5–7 |
| Componente, enlaces y accesibilidad | 8–9 |

## Archivos

**Modificados**

- `public/i18n/es/app.json` — contenido, etiquetas y nombres de acciones en español.
- `public/i18n/en/app.json` — contenido, etiquetas y nombres de acciones en inglés.
- `src/components/projects/projects.tsx` — tercer proyecto, enlaces específicos y claves
  literales para las etiquetas de GitHub y demo.
- `MEMORY.md` — registrar los proyectos y destinos verificados.

No se crean archivos nuevos de aplicación ni se añaden dependencias.

## Decisiones

1. **Mantener un arreglo local de tres proyectos con claves literales.** El componente ya
   usa este patrón y Qwik Speak puede rastrear las claves; alternativa descartada: introducir
   un catálogo dinámico o una nueva capa de datos para tres consumidores inexistentes.
2. **Usar dos etiquetas de enlace localizadas: GitHub y demo.** Esto refleja los destinos
   proporcionados y evita mostrar un enlace vacío; alternativa descartada: botones genéricos
   que no indiquen qué destino abren.
3. **Conservar `translate="no"` en botones de marca y etiquetas tecnológicas.** Los nombres
   propios, tecnologías y marcas no deben traducirse; alternativa descartada: dejar que el
   traductor altere GitHub, React, Astro o los nombres de proyectos.

## Estrategia de verificación

- Parsear ambos archivos JSON y confirmar las tres claves de proyecto y las seis URLs.
- Ejecutar `pnpm lint`.
- Ejecutar `pnpm test --test-isolation=none`; el test normal puede seguir bloqueado por
  `spawn EPERM` en este entorno.
- Revisar que no queden referencias a Portfolio Qwik ni Fullstack E-Commerce API.

## Orden

1. Actualizar claves `projects` en ambos idiomas.
2. Ajustar `projects.tsx` para tres tarjetas y acciones separadas.
3. Validar JSON, lint, tests y URLs.
4. Actualizar `MEMORY.md`.
