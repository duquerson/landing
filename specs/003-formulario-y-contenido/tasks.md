# Tareas 003 — Afinar el formulario y el contenido del sitio

Estado: **completadas**.

## T1 — Modelo de errores y endpoint — HECHA (RF 2, 3)

Quitar el texto visible del schema, crear `model/errors.ts` con el mapeo de campo a clave de
traducción y hacer que el endpoint devuelva la lista de campos fallidos.

Hecho: `model/schema.ts` solo reglas; `model/errors.ts` mapea campo + motivo a clave
traducible; el endpoint responde 400 con `fields` y sin prosa en ningún idioma.

## T2 — Errores por campo en el formulario — HECHA (RF 1, 2)

Mostrar el error junto a su campo con `aria-invalid` y `aria-describedby`, limpiarlo al
corregir y mover el foco al primer error al enviar.

Hecho: un envío inválido muestra un mensaje por campo y el foco queda en el primero; el error
se limpia al escribir en el campo.

## T3 — Placeholders y estado de carga — HECHA (RF 2, 8)

Añadir placeholders traducidos terminados en `…` y un indicador de carga en el botón con
`aria-busy`.

Hecho: los tres campos tienen placeholder traducido y el botón anuncia y muestra el estado
de carga con `aria-busy` y spinner.

## T4 — Contenido de las secciones desde las traducciones — HECHA (RF 4)

Mover títulos, descripciones, etiquetas, roles, empresas y habilidades a las traducciones, con
claves literales.

Hecho: proyectos, experiencia y habilidades salen de `app.json`; no queda texto de negocio en
los componentes.

## T5 — Periodos con la API de fechas — HECHA (RF 5)

Guardar los periodos como fechas ISO en las traducciones y formatearlos con
`useFormatDate`, usando la clave de "presente" cuando no hay fecha final.

Hecho: los periodos se formatean según el idioma activo; `e1.end` es `""` literal en el
componente para no romper el rastreo estático de claves de Qwik Speak.

## T6 — Detalles de tipografía e interacción — HECHA (RF 6, 7, 8, 9, 10)

`translate="no"` en marcas, `text-wrap: balance` en encabezados, puntos suspensivos correctos
en las traducciones, textos largos que no desbordan, `touch-action` y realce de toque en
`global.css`, sin scroll horizontal y año del footer calculado una sola vez.

Hecho: marcas con `translate="no"`, encabezados con `text-wrap: balance`, `…` correctos,
`touch-action` y realce de toque en `global.css`, sin overflow horizontal y año del footer
calculado una vez.

## T7 — Verificación y cierre — HECHA (RF 1-10)

Recorrer `/es/` y `/en/` con el MCP de Chrome DevTools: envío inválido y válido, foco,
anuncio de errores, ausencia de scroll horizontal y contenido traducido. Cerrar la spec y
actualizar `MEMORY.md`.

Hecho: `pnpm lint`, `pnpm test` (21 casos) y `pnpm build` en verde; `/es/` y `/en/` devuelven
200 con el idioma y el contenido correctos; `POST /api/contact` responde 400 con campos y 200
con datos válidos; sin procesos ni puertos residuales.