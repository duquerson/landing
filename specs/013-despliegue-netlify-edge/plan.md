# Plan 013 — Despliegue SSR en Netlify Edge

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Adaptador y build de cliente/Edge | 1, 2, 3, 4 |
| Netlify build config, secretos y pasos de publicación | 5, 6, 7 |
| Exclusión de secretos y commits Better Commits | 8, 9 |
| Sincronización de `master` local a remoto con lease explícito | 10 |

## Archivos

**Nuevos**

- `netlify.toml` — comando de build, carpeta `dist` y versión mayor de Node compatible con el proyecto.
- `src/entry.netlify-edge.tsx` — middleware Qwik City para procesar solicitudes en Netlify Edge.
- `adapters/netlify-edge/vite.config.ts` — build SSR específico con el adaptador ya disponible en Qwik City.

**Modificados**

- `package.json` — agregar el script de build cliente seguido por build Netlify Edge.
- `.gitignore` — excluir el estado generado `.netlify/`.
- `README.md` — corregir variables activas del formulario y documentar conexión/configuración de Netlify.
- `MEMORY.MD` — registrar adaptador, variables y sincronización del remoto.

## Decisiones

1. **Usar Netlify Edge de Qwik City 1.20.1 ya instalada.** Mantiene SSR y el endpoint de contacto sin una dependencia nueva; alternativa descartada: despliegue estático que no ejecutaría el endpoint.
2. **Separar la configuración Vite de Netlify.** Evita activar el adaptador en `dev`, `build.client` y `preview`; alternativa descartada: modificar globalmente el build normal y cambiar su salida/entorno.
3. **Compilar primero cliente y después la función Edge.** El renderer SSR consume el manifiesto cliente del build anterior; alternativa descartada: compilar solo SSR.
4. **Mantener `dist` como publicación y la función bajo `.netlify/edge-functions`.** Sigue el layout requerido por el adaptador Edge instalado; alternativa descartada: publicar el bundle SSR como sitio estático.
5. **Crear un commit inicial y otro de despliegue, luego reemplazar `master` con `--force-with-lease` contra el SHA inspeccionado.** Respeta que el local es la fuente y protege contra actualizaciones concurrentes; alternativa descartada: un `pull` que integre la versión remota divergente o un `--force` sin lease.
6. **No crear el sitio, gestionar credenciales ni afirmar que quedó desplegado.** Requiere acceso a la cuenta Netlify del usuario; alternativa descartada: configurar servicios externos sin autorización/credenciales.

## Estrategia de tests

- `pnpm lint` y `pnpm exec node --test --test-isolation=none`.
- Ejecutar el build Netlify con la configuración añadida y comprobar que existen `dist/` y `.netlify/edge-functions/manifest.json` con `entry.netlify-edge`.
- Inspeccionar los nombres de archivos staged antes de cada commit; verificar exclusión de `.env`, `.env.local`, dependencias y artefactos.
- Después del push, comparar el SHA de `master` remoto con el commit local y revisar su lista de archivos.

## Orden

1. Añadir adaptador, entrypoint, configuración Netlify y documentación de despliegue.
2. Validar tipos, tests y artefactos de build.
3. Crear commit inicial con el contenido local versionable, excluyendo archivos ignorados.
4. Crear un commit independiente para Netlify.
5. Configurar `origin`, verificar que `master` sigue en el SHA revisado y publicar a `master` con `--force-with-lease` explícito.
6. Confirmar igualdad de historia y árbol de archivos; informar si la plataforma rechaza credenciales o protección de rama.

## Estado Git inicial y riesgo remoto

- El checkout local está en `main`, sin commits ni remotos configurados; el contenido del proyecto está sin seguimiento.
- `https://github.com/duquerson/landing.git` tiene `master` en `e3a22c045eff27710df8bb7cfa914062b0cee05b`, sin base común local.
- El usuario autorizó reemplazar `master` con el contenido versionable local; no autoriza publicar el sitio ni operar la cuenta Netlify.
