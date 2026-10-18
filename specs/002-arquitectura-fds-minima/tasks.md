# Tareas 002 — FDS mínimo y guía de arquitectura del proyecto

## T1 — Schema de validación como fuente única

**RF**: 2, 3

Crear `src/features/contact-form/model/schema.ts` con el schema Zod que hoy está duplicado en el componente y en el endpoint.

**Hecho cuando**: existe un solo archivo que define el schema y el endpoint y el componente lo consumen a él.

## T2 — Unidad del formulario

**RF**: 2, 4

Mover el componente a `src/features/contact-form/ui/contact-form.tsx`, crear `index.ts` con la API pública y actualizar `src/routes/index.tsx`. El endpoint importa el schema desde la API pública.

**Hecho cuando**: `pnpm lint` pasa, la portada muestra el formulario igual que antes y no queda ningún import a un archivo interno de la unidad.

## T3 — Capa de arranque

**RF**: 1

Mover los estilos globales y los cuatro archivos de idioma a `src/app/`, y actualizar `root.tsx` y `plugin.ts`.

**Hecho cuando**: `pnpm lint`, `pnpm test` y `pnpm build.client` están en verde y la portada se ve igual en español y en inglés.

## T4 — Guía de arquitectura del proyecto

**RF**: 5, 6, 7

Reescribir `ARCHITECTURE.md`: objetivo, capas reales con su excepción de Qwik, API pública por unidad, señales que justificarían estructura hexagonal en este proyecto, árbol de decisión para código nuevo, checklist e instrucciones para agentes.

**Hecho cuando**: el documento describe la estructura vigente sin contradecir `AGENTS.md` y no incluye el ejemplo de un proyecto que no es este.

## T5 — Reglas en AGENTS.md y cierre

**RF**: 8

Actualizar la sección de estructura de `AGENTS.md` con las capas y las excepciones, añadir la regla de imports por API pública y el enlace a `ARCHITECTURE.md`. Actualizar `MEMORY.md` con las decisiones y sus motivos.

**Hecho cuando**: un agente que lea solo `AGENTS.md` sabe dónde va un archivo nuevo y qué documento le da el detalle.