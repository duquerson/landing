# Tareas 006 — Formulario de contacto estable y notificación con formato de correo electrónico

Estado: **T1, T2 y T3 completadas**.

## T1 — Corregir renderizado bilingüe y errores del formulario — HECHA

**RF**: 1–8, 11–12, 16–17

Corregir el renderizado del formulario en español e inglés. Mantener los mensajes de campos localizados y mapear identificadores `fields` del endpoint solo a errores localizados existentes; ante identificadores desconocidos, respuestas fallidas sin campos válidos o fallos de red del navegador, mostrar el mensaje genérico inline. Mantener respuesta del endpoint sin contenido Telegram ni detalles técnicos y no mostrar ni registrar detalles internos en el cliente.

**Hecho cuando**: El formulario se renderiza en ambos idiomas; los errores se muestran localizados; ningún campo o error técnico crudo se muestra al visitante; y el cliente no registra excepciones, trazas ni detalles internos.

## T2 — Dar formato de correo a la notificación de Telegram — HECHA

**RF**: 18–26

Reorganizar la notificación como correo, con asunto, saludo, remitente, cuerpo, despedida y origen. Conservar el escape HTML, los saltos de línea y los caracteres Unicode. Adaptar las expectativas existentes en `telegram.test.ts` y `contact-integration.test.ts`, sin crear suites nuevas.

**Hecho cuando**: La notificación contiene las secciones en el orden especificado; los datos del visitante permanecen escapados; se conserva el cuerpo multilínea; y la entrega sigue dirigida a Telegram.

## T3 — Tratar credenciales ausentes como fallo de conexión seguro — HECHA

**RF**: 3–4, 8–15

Conservar el mismo `contactSchema` Zod importado por el formulario y el endpoint. En `telegram.ts`, eliminar la simulación exitosa cuando falte cualquier credencial y emitir exactamente un log de servidor genérico de conexión, sin token, `chatId`, excepción ni respuesta del proveedor. En `contact/index.ts`, mantener la respuesta no exitosa reducida y evitar un segundo log o la inclusión de `chatId` en ese caso. No cambiar el logging existente para rechazos de Telegram o fallos de red. Actualizar `contact.error` en ambos idiomas para que el mensaje inline existente comunique genéricamente el fallo de conexión. Adaptar el caso existente de credenciales ausentes en `telegram.test.ts` para comprobar el resultado fallido y, si es factible dentro del mismo caso, el log genérico; actualizar también la expectativa correspondiente de `contact-integration.test.ts`, sin crear suites ni casos nuevos.

**Hecho cuando**: Si falta cualquiera de las credenciales, el envío falla sin simular éxito y el servidor registra exactamente una frase genérica sin datos sensibles; el endpoint no duplica ese log, no registra `chatId` en ese caso y responde con cuerpo sin detalles; el formulario muestra el error genérico localizado; el mismo schema Zod sigue siendo compartido; y el caso existente de credenciales ausentes espera fallo. Los rechazos de Telegram y fallos de red siguen respondiendo sin éxito, sin ampliar su logging en esta tarea.
