# Plan 014 — Incluir módulos de servidor del formulario en Git

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Corregir alcance de regla de build ignorado | 1, 2, 5 |
| Versionar e integrar módulo y tests existentes | 1, 3 |
| Build reproducible para Netlify Edge | 3, 4 |

## Archivos

**Modificados**

- `.gitignore` — anclar `server/` a la raíz, para permitir el código fuente anidado de la feature.
- `MEMORY.MD` — registrar la causa raíz y evitar repetir la exclusión genérica.

**Versionados en la corrección**

- `src/features/contact-form/server/telegram.ts` — módulo existente importado por la API pública.
- `src/features/contact-form/server/telegram.test.ts` — pruebas existentes del envío/formato de Telegram.

**Nuevos**

- `specs/014-incluir-modulos-server-en-git/spec.md` — requisito aprobado y resultado de la corrección.
- `specs/014-incluir-modulos-server-en-git/plan.md` — este plan.
- `specs/014-incluir-modulos-server-en-git/tasks.md` — tarea de implementación y criterios.

## Decisiones

1. **Cambiar `server/` por `/server/`.** Limita la exclusión al artefacto generado en la raíz y permite código fuente en `src/.../server`; alternativa descartada: una excepción `!src/...` más frágil que depende de reabrir cada directorio ignorado.
2. **Versionar el módulo y sus pruebas locales existentes.** Son la implementación y cobertura ya esperadas por el índice y la feature; alternativa descartada: reescribir la integración o copiar código a otra ruta.
3. **No modificar credenciales.** El error no se origina en `.env`; no se leerá ni se incluirá en el commit.
4. **Enviar un commit de fix con Gitmoji.** El `master` ya tiene la historia local y el commit Netlify; alternativa descartada: repetir el reemplazo forzado del historial.

## Estrategia de tests

- `git check-ignore` debe dejar de ignorar los dos archivos de `src/features/contact-form/server/` y seguir ignorando la carpeta raíz `server/`, `.env` y `.env.local`.
- `pnpm lint`.
- `pnpm exec node --test --test-isolation=none`.
- `pnpm build.netlify`; comprobar que se genera `.netlify/edge-functions/manifest.json`.
- Antes del commit, revisar paths staged y asegurar que no haya archivos de entorno.
- Después del push normal, verificar que el commit remoto contenga el módulo y los tests.

## Orden

1. Corregir la regla en `.gitignore`.
2. Verificar tracking y ejecutar lint, tests y build Netlify.
3. Actualizar memoria y completar la spec.
4. Crear commit Better Commits con los archivos precisos.
5. Enviar a `origin/master` con push normal y comprobar el resultado.
