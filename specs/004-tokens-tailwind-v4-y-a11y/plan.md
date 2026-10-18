# Plan 004 — Tokens semánticos de Tailwind CSS v4 y accesibilidad WCAG 2.2 AA

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Tokens `@theme` y `:focus-visible` en `global.css` | 1, 3, 7 |
| Migración de componentes a tokens semánticos | 2 |
| Accesibilidad en Footer (contraste) | 4 |
| Enlaces externos y traducciones (`a11y.external_link`) | 5 |
| Áreas táctiles móviles (Navbar botón y enlaces) | 6 |

## Archivos

**Nuevos**
- `specs/004-tokens-tailwind-v4-y-a11y/spec.md` — Especificación de requisitos.
- `specs/004-tokens-tailwind-v4-y-a11y/plan.md` — Este plan.
- `specs/004-tokens-tailwind-v4-y-a11y/tasks.md` — Lista de tareas ejecutables.

**Modificados**
- `src/app/styles/global.css` — Declaración `@theme` en Tailwind CSS v4, tokens semánticos y reglas globales de focus/motion.
- `public/i18n/es/app.json` — Clave `a11y.external_link`.
- `public/i18n/en/app.json` — Clave `a11y.external_link`.
- `src/components/navbar/navbar.tsx` — Uso de tokens semánticos y área táctil mínima de 44px en botón y enlaces móviles.
- `src/components/hero/hero.tsx` — Uso de tokens semánticos y unificación de foco.
- `src/components/about/about.tsx` — Uso de tokens semánticos.
- `src/components/projects/projects.tsx` — Tokens semánticos, aviso sonoro en enlaces externos con `sr-only`.
- `src/components/experience/experience.tsx` — Tokens semánticos.
- `src/components/skills/skills.tsx` — Tokens semánticos.
- `src/components/footer/footer.tsx` — Tokens semánticos y corrección de contraste en texto secundario.
- `src/features/contact-form/ui/contact-form.tsx` — Tokens semánticos y unificación de foco.
- `MEMORY.md` — Estado del proyecto actualizado tras completar la spec.

## Decisiones

1. **Tokens dentro de `@theme` en vez de variables CSS sueltas en `:root`**: Tailwind CSS v4 genera automáticamente clases como `bg-bg-primary`, `bg-bg-card`, `border-border-subtle`, `text-text-main`, `text-text-muted`, `bg-accent`, `hover:bg-accent-hover`. Alternativa descartada: seguir usando clases de paleta `slate-*` y `blue-*` en cada componente.
2. **Uso de `sr-only` para indicar enlace externo**: Añadir `<span> ({t("a11y.external_link")})</span>` invisible visualmente dentro del enlace `target="_blank"`. Alternativa descartada: icono SVG decorativo sin soporte para lectores de pantalla.
3. **Área táctil de 44×44px en botón de menú**: Botón con tamaño mínimo `min-h-[44px] min-w-[44px]` para cumplir WCAG 2.5.8. Alternativa descartada: depender solo de `p-2` que medía menos de 36px en algunas resoluciones.

## Estrategia de tests

- La lógica existente no se altera; los 21 tests de `node --test` deben mantenerse en verde.
- Verificación visual y de tipos con `pnpm lint` (`tsc --noEmit`) y `pnpm build`.

## Orden

1. Crear y configurar `@theme` en `src/app/styles/global.css`.
2. Añadir claves i18n para enlace externo en `app.json` (es y en).
3. Actualizar `navbar.tsx` y `footer.tsx` (a11y y contraste).
4. Actualizar `hero.tsx`, `about.tsx`, `projects.tsx`, `experience.tsx`, `skills.tsx` y `contact-form.tsx`.
5. Ejecutar `pnpm lint`, `pnpm test` y `pnpm build`.
6. Actualizar `MEMORY.md`.
