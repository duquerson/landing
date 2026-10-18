# Spec 013 — Despliegue SSR en Netlify Edge

**Estado: implementada y verificada**

## Por qué

El proyecto está orientado a Netlify, pero aún no configura un adaptador ni comandos de build/publicación para el renderizado de Qwik City. El formulario depende de un endpoint del servidor, por lo que publicar solo archivos estáticos dejaría incompleta la aplicación.

## Alcance

- Configurar el adaptador Netlify Edge de Qwik City para las páginas SSR y el endpoint de contacto.
- Configurar el comando de build y el directorio de publicación de Netlify.
- Documentar las variables de entorno activas requeridas por el endpoint y los pasos para conectar el repositorio en Netlify.
- Actualizar la guía del proyecto y la memoria.
- Crear un commit inicial del estado local versionable y otro commit separado para la configuración Netlify.
- Reemplazar el contenido y la historia de `master` en GitHub con la historia local aprobada.

## Fuera de alcance

- Crear o vincular un sitio Netlify, configurar un dominio, publicar el sitio o gestionar secretos desde la cuenta del usuario.
- Añadir dependencias o servicios externos.
- Versionar secretos, archivos `.env`, artefactos de build, cachés, dependencias instaladas o configuración privada del editor.
- Cambiar el comportamiento de la aplicación o su proveedor del formulario.

## Requisitos (EARS)

### Build y ejecución en Netlify

1. Cuando Netlify construya el proyecto, el sistema DEBE generar los recursos del cliente y la función Edge SSR de Qwik City.
2. Cuando una petición llegue a una ruta dinámica del sitio, Netlify DEBE servirla mediante el adaptador Edge de Qwik City.
3. Cuando una petición llegue al endpoint de contacto, Netlify DEBE ejecutarlo en el servidor mediante el adaptador Edge.
4. Cuando Netlify publique el build, el sistema DEBE servir los recursos estáticos desde el directorio generado por Vite.

### Configuración y operación

5. Cuando el proyecto se configure en Netlify, el sistema DEBE indicar el comando de build y directorio de publicación correctos.
6. Cuando el endpoint de contacto se utilice en Netlify, el usuario DEBE poder configurar sus credenciales mediante variables de entorno privadas de la plataforma.
7. Cuando se documente el despliegue, el sistema DEBE incluir los pasos para importar el repositorio y configurar las variables requeridas sin exponer sus valores.
8. Al crear los commits solicitados, el sistema DEBE excluir secretos, artefactos ignorados y dependencias instaladas.
9. Al crear los commits solicitados, el sistema DEBE usar la convención Better Commits con Gitmoji documentada en el proyecto.
10. Cuando se sincronice `master` remoto, el sistema DEBE reemplazar su historia y contenido por los commits locales aprobados.

## Casos límite

- Si faltan las credenciales del bot en Netlify, el endpoint debe conservar su manejo de error actual y no simular un envío exitoso.
- Una build local correcta no implica que el sitio haya quedado conectado o publicado en la cuenta Netlify.
- Los directorios `.env`, `.env.local`, `node_modules`, `dist`, `server` y `.netlify` no deben incorporarse a los commits.
- Si el build no genera el directorio de publicación esperado o el manifiesto Edge, la configuración no se considera verificada.
- Si las credenciales de GitHub faltan o el repositorio rechaza el push forzado, el sistema debe dejar los commits locales intactos e informar que la sincronización no se completó.
- El usuario autorizó explícitamente reemplazar el contenido y la historia actuales de `master` remoto, incluidos sus archivos exclusivos.

## Criterios de finalización

- El build genera el bundle SSR Edge y los recursos estáticos esperados.
- `netlify.toml` define el comando y directorio de publicación compatibles con la salida comprobada.
- README documenta el despliegue, la configuración privada de credenciales y el límite de que se requiere acceso a la cuenta Netlify para publicar.
- Lint y tests pasan.
- El historial local contiene un commit inicial del proyecto versionable y un commit separado para Netlify; ningún secreto o artefacto ignorado está incluido.
- Si GitHub acepta el push autorizado, `master` apunta a la historia local y sus archivos coinciden con los archivos versionables de esta copia.
