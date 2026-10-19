# Spec 014 — Incluir módulos de servidor del formulario en Git

**Estado: implementada y verificada**

## Por qué

La regla `server/` de `.gitignore` coincide con cualquier carpeta que tenga ese nombre, incluida `src/features/contact-form/server/`. Por ello, los módulos de Telegram y sus pruebas existen localmente y los tests funcionan, pero Git los omitió de los commits. El build limpio de Netlify no tiene `telegram.ts` y Rollup falla al resolver el import de la API pública del formulario.

## Alcance

- Restringir la exclusión de `server/` a la carpeta de build situada en la raíz.
- Incluir en Git los módulos de Telegram y sus pruebas existentes.
- Verificar que un clon/versionado limpio resuelve el import y que el build Netlify termina.

## Fuera de alcance

- Cambiar el envío, la validación o el manejo de credenciales de Telegram.
- Leer, cambiar o versionar `.env` o credenciales.
- Modificar el adaptador o la configuración de Netlify.

## Requisitos (EARS)

### Seguimiento de archivos fuente

1. Cuando Git evalúe `src/features/contact-form/server/telegram.ts`, el archivo DEBE estar disponible para seguimiento y commit.
2. Cuando se genere `server/` en la raíz del repositorio, Git DEBE seguir ignorando ese directorio de build.
3. Cuando una build se ejecute desde un clon limpio, Rollup DEBE poder resolver `./server/telegram` desde la API pública del formulario.
4. Cuando se ejecute el build de Netlify desde un clon limpio, el sistema DEBE completar el build y generar el manifiesto de Netlify Edge.
5. Cuando se corrija el ignore, el sistema DEBE mantener `.env` y `.env.local` excluidos de Git.

## Casos límite

- El sistema de archivos Windows no distingue mayúsculas por defecto, pero la build Netlify sobre Linux es sensible a la ruta y solo recibe archivos versionados.
- El directorio generado `server/` debe seguir ignorado, aunque se incluya `src/features/contact-form/server/`.
- Las credenciales locales del usuario deben permanecer sin leer y sin seguimiento.

## Criterios de finalización

- `git check-ignore` no excluye `src/features/contact-form/server/telegram.ts`.
- Ambos archivos de servidor existentes aparecen en el commit de corrección.
- `git check-ignore` sigue excluyendo `server/`, `.env` y `.env.local`.
- Lint, tests y `pnpm build.netlify` pasan.
