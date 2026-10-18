# Spec 006 — Formulario de contacto estable y notificación con formato de correo electrónico

**Estado: borrador**

## Por qué

El formulario puede fallar al renderizarse en el cliente con `ReferenceError`, por lo que el visitante no llega a ver ni usar sus campos. La experiencia debe funcionar en español e inglés y conservar sus textos y errores localizados.

Además, la notificación que Yeferson recibe por Telegram identifica los datos con etiquetas, pero no tiene la estructura reconocible de un correo electrónico. El formulario debe comunicar el éxito o los errores con mensajes genéricos localizados, sin exponer detalles internos; la notificación debe adoptar un formato de correo y mantener el escape HTML de los datos del visitante.

## Alcance

- Renderizar el formulario de contacto en español e inglés sin errores de ejecución.
- Conservar las etiquetas y mensajes localizados del formulario y aplicar el mismo esquema de validación en cliente y servidor.
- Mostrar errores genéricos ante fallos de envío y mantener la respuesta del endpoint sin contenido de Telegram.
- Tratar la ausencia de credenciales de Telegram como un fallo de conexión, sin simular éxito.
- Registrar en el servidor un error genérico de conexión con Telegram cuando falten credenciales, sin incluir datos sensibles ni detalles técnicos.
- Formatear la notificación de Telegram como correo electrónico, conservando los datos del contacto, el escape HTML y los saltos de línea.
- Evitar que el cliente muestre o registre logs, excepciones o detalles del framework.

## Fuera de alcance

- Cambiar el proveedor o destino de notificaciones o las reglas del schema.
- Rediseñar la interfaz: se conserva el mensaje inline existente, aunque se permite actualizar su texto y estado para mostrar feedback genérico localizado.
- Hacer una auditoría general de logs del servidor.

## Requisitos (EARS)

### Renderizado, validación y respuestas

1. Cuando el visitante abra el formulario en español o inglés, el sistema DEBE renderizarlo sin un `ReferenceError`.
2. Cuando se muestre el formulario, el sistema DEBE presentar sus títulos, etiquetas, placeholders y estados en el idioma activo.
3. Cuando el formulario valide los datos antes del envío, el sistema DEBE usar el mismo schema Zod compartido que usa el endpoint.
4. Cuando el endpoint valide los datos recibidos, el sistema DEBE usar el mismo schema Zod compartido que usa el formulario.
5. Cuando falle la validación del lado del cliente, el sistema DEBE mostrar el mensaje localizado correspondiente a cada campo inválido.
6. Cuando el endpoint devuelva identificadores de campos inválidos, el sistema DEBE mapear solo los identificadores conocidos a sus mensajes localizados; si no reconoce ninguno, DEBE mostrar el error genérico localizado.
7. Cuando el endpoint responda con éxito, el formulario DEBE mostrar su confirmación genérica localizada.
8. Cuando el endpoint responda al formulario, el sistema DEBE limitar el cuerpo a un estado y, si corresponde, identificadores de campos, sin incluir el contenido de Telegram ni errores internos.
9. Cuando Telegram rechace una notificación, el endpoint DEBE responder sin éxito.
10. Cuando el servidor no logre conectarse con Telegram, el endpoint DEBE responder sin éxito.
11. Cuando el endpoint responda sin éxito y no haya identificadores de campos válidos para mostrar, el formulario DEBE quedar en estado de error y mostrar el mensaje genérico localizado de conexión.
12. Cuando falle o se rechace la petición del navegador al endpoint `/contact`, el formulario DEBE quedar en estado de error y mostrar el error genérico localizado.
13. Cuando falte una o más credenciales requeridas de Telegram, el sistema DEBE tratar el envío como fallido y NO DEBE simular un resultado exitoso.
14. Cuando falten credenciales de Telegram, el servidor DEBE registrar un error genérico de conexión con el proveedor.
15. Cuando el servidor registre ese error de conexión, el registro NO DEBE incluir tokens, identificadores de chat, detalles de excepción ni respuestas del proveedor.
16. Durante el flujo del formulario, el cliente NO DEBE mostrar al visitante mensajes de excepción, trazas ni detalles del framework.
17. Durante el flujo del formulario, el cliente NO DEBE registrar en la consola del navegador mensajes de excepción, trazas, errores internos ni detalles del framework.

### Formato de la notificación

18. Cuando se prepare una notificación para un contacto válido, el sistema DEBE presentar primero un asunto que identifique el nuevo mensaje de contacto.
19. Cuando se prepare una notificación para un contacto válido, el sistema DEBE incluir un saludo dirigido a Yeferson después del asunto.
20. Cuando se prepare una notificación para un contacto válido, el sistema DEBE identificar al remitente mediante el nombre y el correo proporcionados.
21. Cuando se prepare una notificación para un contacto válido, el sistema DEBE presentar el texto enviado por el visitante como el cuerpo del mensaje.
22. Cuando se prepare una notificación para un contacto válido, el sistema DEBE cerrar el mensaje con una despedida.
23. Cuando se prepare una notificación para un contacto válido, el sistema DEBE identificar el formulario o sitio de origen.
24. Cuando se prepare la notificación formateada para un contacto válido, el sistema DEBE enviarla a Telegram.

### Integridad y escape del contenido

25. Cuando se inserten nombre, correo o mensaje en la notificación HTML, el sistema DEBE escapar sus caracteres HTML especiales para que se interpreten como texto y no como formato.
26. Cuando el mensaje del visitante contenga saltos de línea, el sistema DEBE conservarlos en el cuerpo de la notificación.

## Casos límite

- Nombre, correo o cuerpo con `&`, `<`, `>`, comillas dobles o texto que parezca una etiqueta HTML: deben mostrarse como texto literal sin alterar el formato.
- Cuerpo con varios párrafos, acentos o emojis: debe conservar saltos y caracteres.
- Al abrir el formulario en español o inglés, no aparece un `ReferenceError` y el contenido permanece localizado.
- El endpoint devuelve identificadores de campos conocidos: se muestran sus mensajes localizados, nunca el identificador como texto visible.
- El endpoint devuelve identificadores desconocidos o no utilizables: se muestra el error genérico localizado.
- Telegram rechaza el mensaje o el servidor no logra conectarse: el endpoint responde sin éxito y el formulario muestra error genérico, no la confirmación.
- El endpoint devuelve un error sin identificadores de campos válidos: el formulario muestra error genérico.
- La petición del navegador a `/contact` falla por red: el formulario muestra error genérico sin datos técnicos.
- Falta cualquiera de las credenciales requeridas de Telegram: no se simula éxito, el visitante ve un error genérico localizado de conexión y el servidor registra un error genérico sin credenciales ni detalles técnicos.
- Una respuesta exitosa del endpoint muestra la confirmación localizada; ni el cuerpo de Telegram ni información técnica llegan al visitante.

## Criterios de finalización

- El formulario renderiza correctamente en español e inglés sin `ReferenceError`.
- El formulario y el endpoint aplican el mismo esquema de validación.
- Los textos visibles y los errores de validación, incluidos los campos rechazados por el endpoint, permanecen localizados.
- Los identificadores de campos se traducen solo mediante mensajes existentes; los desconocidos dan lugar al error genérico.
- Solo una respuesta exitosa del endpoint produce confirmación; rechazos de Telegram, fallo de conexión con Telegram, falta de credenciales y fallos de la petición del navegador producen estado de error con mensaje genérico localizado.
- La ausencia de credenciales no produce éxito simulado y genera solo un registro genérico de conexión, sin tokens, identificadores de chat, excepciones ni respuestas del proveedor.
- El endpoint no devuelve contenido Telegram ni detalles internos, y el cliente no muestra excepciones, trazas ni detalles del framework.
- El cliente no registra excepciones, trazas, errores internos ni detalles del framework en la consola del navegador.
- La notificación de Telegram presenta, en orden, asunto, saludo, remitente, cuerpo, despedida y origen.
- Los datos del visitante siguen escapados y se conservan saltos de línea, acentos y emojis.
