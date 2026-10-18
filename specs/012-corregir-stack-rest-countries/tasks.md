# Tareas 012 — Corregir el stack de REST Countries

Estado: **implementadas y verificadas**.

## T1 — Corregir contenido bilingüe — HECHA (RF 1–3)

**RF**: 1–3

Actualizar descripción y etiquetas de REST Countries en español e inglés para nombrar Svelte
y quitar Astro/Vue de esa tarjeta.

**Hecho cuando**: p2 menciona Svelte en ambos idiomas y no menciona Astro/Vue.

**Hecho**: Las descripciones p2 mencionan Svelte y TypeScript; sus etiquetas ya no atribuyen
Astro/Vue al proyecto.

## T2 — Verificar el contenido completo — HECHA (RF 2–4)

**RF**: 2–4

Confirmar que Game Learning mantiene Astro/Vue, Todo App mantiene React y p2 conserva preview,
enlaces y `alt`.

**Hecho cuando**: no cambian previews ni URLs, y los tres stacks permanecen diferenciados.

**Hecho**: Game Learning sigue con Astro/Vue, Todo App con React y p2 conserva su preview,
enlaces y textos alternativos.

## T3 — Verificar y cerrar — HECHA (RF 1–4)

**RF**: 1–4

Validar JSON, lint, tests y memoria del proyecto.

**Hecho cuando**: lint y los 35 tests con `--test-isolation=none` pasan.

**Hecho**: `pnpm lint` pasa y `pnpm test --test-isolation=none` pasa 35/35.
