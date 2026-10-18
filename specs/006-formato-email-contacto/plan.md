# Plan 006 — Formulario de contacto estable y notificación con formato de correo electrónico

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Renderizado bilingüe, schema compartido, validación, respuestas seguras y estados del formulario | 1–8, 11–12, 16–17 |
| Fallos de entrega, credenciales ausentes, respuesta genérica localizada y registro seguro de credenciales | 8–15 |
| Formato de correo, entrega y conservación segura del contenido | 18–26 |

La verificación de RF3 y RF4 conserva el schema Zod existente compartido; no requiere duplicarlo ni modificarlo. La T3 es el incremento pendiente de entrega: T1 y T2 ya constan como completadas en `tasks.md`.

## Archivos

**Modificados en la implementación**

- `src/features/contact-form/server/telegram.ts` — Tratar credenciales ausentes como fallo real, sin éxito simulado, y registrar exactamente una frase genérica de conexión sin datos sensibles ni detalles del proveedor; devolver un resultado fallido. No ampliar el cambio de logging a rechazos o fallos de red.
- `src/routes/contact/index.ts` — Mantener el schema compartido y el cuerpo de respuesta reducido; si faltan credenciales, responder sin éxito sin repetir el registro genérico ni incluir `chatId`; conservar fuera de ese caso el comportamiento de logging existente.
- `public/i18n/es/app.json` — Ajustar `contact.error` para comunicar genéricamente un fallo de conexión en español.
- `public/i18n/en/app.json` — Ajustar `contact.error` para comunicar genéricamente un fallo de conexión en inglés.
- `src/features/contact-form/server/telegram.test.ts` — Actualizar el caso existente de credenciales ausentes para esperar fallo, no resultado simulado; conservar las verificaciones de envío, formato y escape.
- `src/features/contact-form/contact-integration.test.ts` — Actualizar el caso existente Local/Dev para que la falta de credenciales no se considere un éxito.

**Solo revisados, sin cambios previstos**

- `src/features/contact-form/model/schema.ts` — Confirmar que el mismo `contactSchema` se importa tanto en el formulario como en el endpoint.
- `src/features/contact-form/ui/contact-form.tsx` — Conservar el mensaje inline existente y su fallback localizado; la nueva redacción llega por `contact.error`, sin rediseñar la interfaz ni añadir logs del navegador.
- `src/features/contact-form/model/errors.ts` y `src/features/contact-form/model/errors.test.ts` — El mapeo de identificadores de campos a errores localizados ya está resuelto por T1 y no cambia en este incremento.

No se crean archivos, suites de pruebas ni dependencias nuevas.

## Decisiones

1. **Conservar el schema Zod único que ya comparten el formulario y el endpoint.** La inspección confirma que ambos importan `contactSchema` desde `model/schema.ts`; solo se verifica esta condición. Alternativa descartada: mantener schemas paralelos o introducir una segunda fuente de reglas.
2. **Registrar la falta de credenciales una sola vez en el servicio Telegram con un mensaje constante genérico; el endpoint no duplica ese log ni registra `chatId` en ese caso.** La respuesta pública sigue siendo solo `{ success: false }`. El cambio de logging se limita al caso de credenciales ausentes; los logs existentes para rechazo o fallo de red no se amplían ni se cambian en esta spec. Alternativa descartada: emitir logs duplicados desde servicio y endpoint, o registrar configuración/detalles del proveedor cuando faltan credenciales.
3. **No simular entrega cuando falta cualquier credencial requerida y usar `contact.error` para el feedback localizado de conexión.** Se conserva el mensaje inline actual; se actualizan las traducciones es/en y solo una respuesta HTTP exitosa confirma el envío. Alternativa descartada: mostrar éxito en desarrollo o dejar un mensaje que no indique que el problema es de conexión.
4. **Mantener la notificación con estructura de correo y los datos escapados como ya implementó T2.** El cambio incremental no altera asunto, saludo, remitente, cuerpo, despedida, origen, escape HTML ni saltos de línea. Alternativa descartada: rehacer el formato o interpolar texto del visitante sin escapar.
5. **Actualizar únicamente expectativas en las suites nativas existentes y no ejecutar pruebas durante esta fase.** La cobertura prevista queda documentada para el flujo aprobado, respetando la instrucción de no agregar suites. Alternativa descartada: sumar dependencias/suites o ejecutar comandos de prueba ahora.

## Estrategia de tests

Casos que se actualizarían o conservarían en los tests nativos existentes con `node --test`; en esta fase no se ejecutan:

- `telegram.test.ts`: falta de token, chat ID o ambos produce `ok: false` y nunca `simulated: true`; dentro del caso existente, capturar el registro y verificar una única frase genérica sin token/chat ID/detalles si es factible; el envío válido conserva formato de correo y escape.
- `contact-integration.test.ts`: el flujo integrado de datos válidos conserva el mensaje formateado; el caso Local/Dev de credenciales ausentes deja de esperar éxito simulado y espera fallo; se mantienen validación, mapeo localizado, fallo de red y escape.
- `schema.ts` y las importaciones del formulario/endpoint: verificación por inspección de que ambos usan la misma instancia exportada de `contactSchema`; no se duplican casos ni reglas.
- `src/routes/contact/index.ts`: revisar que la falta de credenciales termina en respuesta no exitosa sin duplicar el log genérico ni registrar `chatId`; comprobar que el cuerpo no contiene detalles del proveedor. Los rechazos y fallos de red mantienen el logging existente, fuera de este alcance. No existe una suite de endpoint en los archivos actuales y no se crea una nueva para esta fase.
- `contact.error` en ambos JSON: revisar que la redacción es genérica, localizada y expresa un problema de conexión; el componente sigue presentándola en su región inline para fallos HTTP y de red.

## Orden

1. En `telegram.ts`, retirar el éxito simulado al faltar cualquier credencial, emitir exactamente un log genérico y devolver fallo controlado sin incluir datos sensibles.
2. En `contact/index.ts`, conservar el uso del schema compartido y responder sin éxito ni detalles; evitar un segundo log o filtración de `chatId` cuando faltan credenciales, sin cambiar el logging de rechazos o fallos de red.
3. Actualizar `contact.error` en español e inglés para describir el fallo de conexión sin revelar causa interna.
4. Adaptar las expectativas de credenciales ausentes en `telegram.test.ts` y `contact-integration.test.ts`; conservar las comprobaciones ya existentes del formato de correo, escape, idioma y errores.
5. Revisar los RF contra el resultado: schema único, no éxito simulado, confirmación solo en éxito HTTP, error inline localizado, cuerpo de endpoint seguro y ausencia de detalles/logs en cliente.
