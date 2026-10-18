# Tareas 008 — Perfil profesional, experiencia y formación

Estado: **T1 y T2 completadas; T3 parcial por bloqueo de Chromium**.

## T1 — Actualizar contenido bilingüe — HECHA (RF 1–8)

Reemplazar las experiencias antiguas y añadir la experiencia independiente desde septiembre
de 2025 con el indicador localizado de presente. En Formación, conservar solo el TSU en
Informática. Actualizar las tres categorías de habilidades en español e inglés.

**Hecho**: Se reemplazaron las entradas antiguas en `es` y `en`; no se inventó empleador; el
TSU conserva sus datos proporcionados y Técnico en Computación no aparece en Formación; las
habilidades sin evidencia indicada en RF 7 no aparecen.

## T2 — Presentar la sección de trayectoria — HECHA (RF 1–5, 8)

Modificar `experience.tsx` para mostrar el bloque de experiencia y el bloque de formación,
con fechas ISO formateadas por `useFormatDate`, títulos localizados y texto fluido en móvil.

**Hecho**: La sección separa experiencia y formación; la experiencia se identifica como
independiente; el TSU muestra 2008–2012; no existe una segunda entrada de formación; y los
periodos salen de `useFormatDate` con la zona horaria configurada.

## T3 — Verificación y cierre — PARCIAL (RF 1–8)

Ejecutar `pnpm lint` y `pnpm test`, revisar el contenido localizado y tratar de previsualizar
las rutas `/es/` y `/en/` en Chromium. Documentar cualquier bloqueo del servidor; actualizar
`MEMORY.md` al finalizar.

**Verificado**: `pnpm lint` pasa; `pnpm test --test-isolation=none` pasa 35/35; los dos JSON
se parsean y los periodos producen “septiembre de 2025” / “September 2025” y 2008–2012 en las
zonas horarias configuradas.

**Pendiente por el entorno**: `pnpm test` normal y `pnpm dev` fallan con `spawn EPERM`; el
puerto 5173 está cerrado; Playwright CLI no se pudo descargar desde npm por red/caché y el
puente CUA devolvió `Transport closed`. No se hizo inspección visual ni de estilos computados
en Chromium.
