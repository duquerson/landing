# Tareas 011 — Tecnologías verificadas de proyectos destacados

Estado: **implementadas y verificadas**.

## T1 — Revisar los repositorios — HECHA (RF 1–3)

**RF**: 1–3

Contrastar README, `package.json` y archivos de configuración accesibles de los tres repos
para separar tecnologías declaradas de suposiciones.

**Hecho cuando**: existe una lista breve y comprobable para cada proyecto.

**Hecho**: Se contrastaron los manifiestos y READMEs accesibles de los tres repositorios.

## T2 — Actualizar etiquetas bilingües — HECHA (RF 1–4)

**RF**: 1–4

Reemplazar `projects.items.p1/p2/p3.tags` en es/en por los stacks verificados, conservando
los nombres de tecnologías sin traducir.

**Hecho cuando**: ambos catálogos contienen etiquetas específicas para cada proyecto.

**Hecho**: Las etiquetas es/en reflejan los stacks verificados de Game Learning, REST
Countries y Todo App.

## T3 — Verificar y cerrar — HECHA (RF 4–5)

**RF**: 4–5

Comprobar el componente, previews, enlaces, JSON, lint, tests y actualizar la memoria.

**Hecho cuando**: no se modifican las URLs ni previews, `pnpm lint` pasa y los 35 tests pasan
con `--test-isolation=none`.

**Hecho**: URLs y previews se conservaron; lint pasa y los 35 tests pasan sin aislamiento.
