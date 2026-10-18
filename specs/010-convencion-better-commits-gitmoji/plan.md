# Plan 010 — Convención Better Commits con Gitmoji

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Convención, formato y ejemplos para contribuciones | 1, 2, 3, 4, 5 |
| Límites sin automatización ni commits | 6 |

## Archivos

**Modificados**

- `AGENTS.md` — documentar el formato de commits, las reglas y ejemplos coherentes con Gitmoji y Conventional Commits.
- `MEMORY.MD` — registrar la decisión de usar la convención sin dependencias ni automatización.

## Decisiones

1. **Documentar únicamente la convención.** Evita agregar herramientas al stack mínimo; alternativa descartada: instalar una CLI o configurar hooks, que requiere dependencias y mayor alcance.
2. **Usar Gitmoji seguido por tipo Conventional Commits.** `✨ feat(hero): ...` da una señal visual y mantiene una categoría legible por herramientas; alternativa descartada: usar solo emojis, sin clasificación consistente.
3. **No crear commits.** El historial está vacío y todos los archivos del proyecto aparecen sin seguimiento; alternativa descartada: crear un commit inicial que incluya archivos ajenos al alcance de esta petición.

## Estrategia de tests

- Revisión de diff para comprobar formato, ejemplos y límites.
- No se requieren tests automáticos para un cambio documental.

## Orden

1. Añadir la convención a `AGENTS.md`.
2. Actualizar `MEMORY.MD`.
3. Revisar el diff y confirmar que no se cambió staging ni se creó un commit.
