# Spec 005 — Envío de formulario vía Telegram Bot con proxy interno /contact

**Estado: implementada**

## Por qué

El formulario de contacto validaba los datos en cliente y servidor pero no enviaba el mensaje a ningún destino real. Para evitar depender de un dominio personalizado y no exponer URLs o claves externas en el navegador (red/DevTools), se requiere que el cliente únicamente realice una petición interna a `/contact`. El servidor de Qwik City intercepta esta solicitud, valida los datos con Zod y los reenvía de forma segura y confidencial a la API oficial de Telegram Bot.

## Alcance

- Creación de funciones puras en el servidor para saneamiento (HTML escape) y formateo de mensajes para Telegram.
- Función de envío hacia Telegram Bot API mediante `fetch` nativo sin librerías externas.
- Endpoint interno en `src/routes/contact/index.ts` con manejador `onPost` para procesar la petición y `onGet` para redirigir a `/#contact`.
- Soporte para entorno de desarrollo local: si las variables `TELEGRAM_BOT_TOKEN` o `TELEGRAM_CHAT_ID` no están configuradas, registrar aviso en consola y responder con éxito simulado para no bloquear el flujo visual.
- Actualización del componente `ContactForm` para dirigir su petición a `/contact`.
- Deprecación / reenvío del endpoint antiguo `src/routes/api/contact/index.ts`.
- Tests unitarios con `node --test` para el formateo y saneamiento de mensajes.

## Fuera de alcance

- Configuración manual de las variables en Netlify (se gestionan en el panel de Netlify por el usuario).
- Proveedores de correo como Resend o Web3Forms (se descartan a favor de Telegram).

## Requisitos (EARS)

### Intercepción y Seguridad

1. Cuando el usuario envíe el formulario de contacto, el cliente DEBE realizar la petición HTTP POST a la ruta interna `/contact`.
2. El sistema NO DEBE exponer tokens, identificadores de chat ni URLs de Telegram en el cliente ni en las respuestas HTTP.
3. Mientras las variables de entorno `TELEGRAM_BOT_TOKEN` o `TELEGRAM_CHAT_ID` no estén presentes en el servidor, el sistema DEBE registrar un aviso en consola y retornar una respuesta exitosa con indicación simulada.

### Procesamiento y Entrega en Telegram

4. Cuando el endpoint `/contact` reciba una petición POST, el sistema DEBE validar los datos con el schema Zod antes de comunicarse con Telegram.
5. El sistema DEBE sanear los caracteres HTML especiales (`<`, `>`, `&`, `"`) del nombre, correo y mensaje antes de enviarlos a Telegram para evitar errores de parseo HTML.
6. Cuando la validación sea exitosa y las variables existan, el sistema DEBE enviar el mensaje formateado a la API de Telegram (`https://api.telegram.org/bot<TOKEN>/sendMessage`) con `parse_mode: "HTML"`.
7. Si Telegram responde con error o falla la red, el sistema DEBE registrar el error en el servidor y responder con código HTTP 500 sin filtrar detalles internos.
8. Si se accede a `/contact` mediante el método GET, el sistema DEBE responder con una redirección HTTP 302 a `/#contact`.

## Criterios de finalización

- Todos los tests unitarios (`node --test`) pasan exitosamente, incluidos los de saneamiento y formateo de Telegram.
- `pnpm lint` (`tsc --noEmit`) sin errores de tipos.
- `pnpm build` compila bundles de cliente y SSR sin errores.
- El cliente envía exclusivamente a `/contact` y la UI reacciona con éxito o error de forma accesible.
