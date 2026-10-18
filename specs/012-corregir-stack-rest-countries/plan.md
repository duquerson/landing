# Plan 012 — Corregir el stack de REST Countries

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Descripción y etiquetas es/en | 1–3 |
| Comprobación de otras tarjetas y traducciones | 2–4 |
| Memoria y verificación | 1–4 |

## Archivos

**Modificados**

- `public/i18n/es/app.json` — corregir descripción y etiquetas del proyecto p2.
- `public/i18n/en/app.json` — corregir descripción y etiquetas del proyecto p2.
- `MEMORY.md` — registrar la aclaración y el conflicto encontrado en el README.

No se cambia el componente: ya renderiza las etiquetas localizadas de cada proyecto.

## Decisiones

1. **Seguir la aclaración directa del usuario para REST Countries.** La descripción pública del
   repo menciona Svelte, aunque el README enumera Astro/Vue. Alternativa descartada: mantener
   Vue/Astro basándose solo en el README contradictorio.
2. **Conservar React en Todo App y Astro/Vue en Game Learning.** Sus README/manifiestos
   respaldan esos stacks. Alternativa descartada: aplicar la corrección de REST Countries a
   todas las tarjetas.

## Estrategia de verificación

- Comprobar que ambas traducciones describen REST Countries con Svelte y sin Astro/Vue.
- Comprobar que Game Learning sigue con Vue y Todo App con React.
- Ejecutar `pnpm lint` y `pnpm test --test-isolation=none`.

## Orden

1. Actualizar descripción y etiquetas p2 en ambos idiomas.
2. Validar JSON y el stack de las tres tarjetas.
3. Ejecutar lint/tests y actualizar la memoria.
