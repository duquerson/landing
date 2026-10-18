# Tareas 013 — Despliegue SSR en Netlify Edge

## T1 — Configurar build SSR y publicación Netlify

**RF**: 1, 2, 3, 4, 5

Usar el adaptador de Netlify Edge disponible en Qwik City para generar el handler SSR y el endpoint de contacto, manteniendo los builds actuales. Configurar el build cliente antes del Edge y apuntar Netlify a `dist`.

**Hecho cuando**: el build de despliegue termina y produce `dist/`, el handler Edge y un manifiesto que declara `entry.netlify-edge`.

## T2 — Documentar variables y procedimiento de despliegue

**RF**: 6, 7

Actualizar README con la importación desde GitHub, build/publicación y configuración privada de `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`. Reemplazar las variables obsoletas de Resend/Upstash en la tabla.

**Hecho cuando**: los pasos describen credenciales activas sin incluir ningún valor secreto y aclaran que la publicación requiere configurar el sitio en la cuenta Netlify.

## T3 — Validar y crear commits locales

**RF**: 8, 9

Ejecutar lint, tests y build. Revisar los paths staged y crear un commit inicial del contenido local versionable y otro commit independiente para la configuración Netlify, usando Gitmoji y Better Commits.

**Hecho cuando**: validaciones pasan, ambos commits existen y no contienen `.env`, artefactos de build ni dependencias.

## T4 — Sincronizar el local aprobado con master remoto

**RF**: 10

Agregar `origin`, comprobar que la cabeza remota coincide con el SHA inspeccionado y renombrar la rama local a `master`. Empujar la historia local usando `--force-with-lease` fijado a ese SHA, solo después de las validaciones.

**Hecho cuando**: `origin/master` apunta al commit local de despliegue y los archivos versionados remotos coinciden con el árbol local; si GitHub rechaza el push, conservar commits locales e informar el bloqueo.
