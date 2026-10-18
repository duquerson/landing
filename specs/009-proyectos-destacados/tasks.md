# Tareas 009 — Proyectos destacados del portfolio

Estado: **implementadas y verificadas**.

## T1 — Actualizar contenido bilingüe — HECHA (RF 1–4, 9)

Reemplazar los proyectos anteriores por Game Learning, REST Countries y Todo App en español
e inglés, con sus descripciones y etiquetas tecnológicas.

**Hecho**: Ambos idiomas contienen exactamente los tres proyectos en el orden pedido y no
quedan textos de los proyectos anteriores.

## T2 — Integrar enlaces y acciones — HECHA (RF 5–8)

Modificar `projects.tsx` para renderizar tres tarjetas, los repositorios y las demos reales,
con etiquetas localizadas y anuncio accesible de pestaña nueva.

**Hecho**: Cada URL apunta al destino proporcionado, cada proyecto muestra sus acciones y las
marcas/tecnologías conservan `translate="no"`.

## T3 — Verificar y cerrar — HECHA (RF 1–9)

Validar JSON, referencias antiguas, lint y tests; actualizar la memoria con los destinos
finales.

**Hecho**: Los JSON se parsean, las seis URLs coinciden con las proporcionadas, no quedan
referencias a los proyectos anteriores, `pnpm lint` pasa y `pnpm test --test-isolation=none`
completa 35/35 pruebas. `pnpm test` normal sigue bloqueado por `spawn EPERM` del entorno.
