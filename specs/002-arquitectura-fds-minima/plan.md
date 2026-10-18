# Plan 002 — FDS mínimo y guía de arquitectura del proyecto

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| `src/app/` (i18n + estilos) | 1 |
| `src/features/contact-form/` con schema único | 2, 3 |
| Imports solo por API pública | 4 |
| `ARCHITECTURE.md` adaptada | 5, 6, 7 |
| `AGENTS.md` y `MEMORY.md` | 8 |

## Archivos

**Nuevos**

- `src/features/contact-form/model/schema.ts` — schema Zod, fuente única.
- `src/features/contact-form/ui/contact-form.tsx` — el componente del formulario.
- `src/features/contact-form/index.ts` — exporta el componente y el schema.

**Movidos**

- `src/global.css` → `src/app/styles/global.css`
- `src/speak-config.ts`, `src/speak-functions.ts`, `src/speak-locale.ts`, `src/speak-locale.test.ts` → `src/app/i18n/`

**Eliminados**

- `src/components/contact/contact.tsx` y su carpeta (reemplazados por `features/contact-form/`)

**Modificados**

- `src/root.tsx` — importa `./app/styles/global.css`, `./app/i18n/speak-config` y `./app/i18n/speak-functions`.
- `src/routes/plugin.ts` — importa `../app/i18n/speak-config` y `../app/i18n/speak-locale`.
- `src/routes/index.tsx` — importa `Contact` desde `~/features/contact-form`.
- `src/routes/api/contact/index.ts` — importa el schema desde `~/features/contact-form` y deja de definirlo.
- `ARCHITECTURE.md` — guía del proyecto.
- `AGENTS.md`, `MEMORY.MD`.

## Estructura resultante

```text
src/
├── root.tsx, entry.*.tsx      # excepción: rutas fijas de Qwik
├── routes/                    # pages (excepción): index, layout, api/, plugin.ts
├── app/                       # arranque
│   ├── styles/global.css
│   └── i18n/{speak-config,speak-functions,speak-locale}.ts + test
├── components/<sección>/      # secciones de la portada: hero, about, projects, experience, skills, navbar, footer
├── features/contact-form/     # action de usuario con validación
│   ├── ui/contact-form.tsx
│   ├── model/schema.ts
│   └── index.ts
└── shared/                    # no existe todavía, y está documentado por qué
```

## Decisiones

1. **Solo `app/` y `features/`.**
   Alternativa descartada: aplicar FSD completo con `widgets/` y `entities/`. La propia guía dice que una pantalla de presentación no justifica la abstracción, y hoy ningún componente tiene dos consumidores. `entities/` solo tendría sentido si los proyectos y la experiencia se movieran a datos traducibles.
2. **El formulario se muda y `components/contact/` desaparece.**
   Alternativa descartada: dejarlo en `components/` y solo compartir el schema. Mezclaría dos formas de organizar lo mismo y el schema quedaría en una unidad que no es la que lo usa.
3. **Sin `shared/`.**
   Alternativa descartada: crear `shared/ui/section.tsx` para el contenedor repetido por las seis secciones. Descartada por decisión propia para no montar una capa sin un segundo consumidor; `ARCHITECTURE.md` deja escrito cuándo crearla.
4. **`routes/` es la capa de páginas.**
   Alternativa descartada: crear `src/pages/` y mover dentro las rutas. Qwik City deriva el routing del sistema de archivos, así que cambiar la ubicación cambia las URLs.
5. **`ARCHITECTURE.md` se reescribe como guía del proyecto.**
   Alternativa descartada: dejarla genérica con un apéndice. Dos bloques que se contradicen en el mismo archivo pesan más que uno adaptado.

## Estrategia de tests

No hay lógica nueva: `speak-locale.test.ts` solo cambia de carpeta y su import relativo se ajusta. Se mantiene `pnpm test` en verde antes y después del movimiento, y se verifica la portada en ambos idiomas para detectar cualquier import roto.

## Orden

Primero la unidad del formulario con su schema único, después los movimientos de la capa de arranque, y por último la documentación. Cada paso deja el proyecto compilando.