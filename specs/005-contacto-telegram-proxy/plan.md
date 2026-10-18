# Plan 005 — Envío de formulario vía Telegram Bot con proxy interno /contact

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Saneamiento y formateo de mensajes de Telegram | 5 |
| Envío hacia Telegram API con manejo de credenciales ausentes | 3, 6, 7 |
| Endpoint `/contact` (`onPost` y `onGet`) | 2, 4, 8 |
| Integración en el cliente `ContactForm` (`POST /contact`) | 1 |

## Archivos

**Nuevos**
- `specs/005-contacto-telegram-proxy/spec.md` — Especificación de requisitos.
- `specs/005-contacto-telegram-proxy/plan.md` — Este plan técnico.
- `specs/005-contacto-telegram-proxy/tasks.md` — Tareas paso a paso.
- `src/features/contact-form/server/telegram.ts` — Lógica pura de saneamiento, formateo y llamada `fetch` a Telegram.
- `src/features/contact-form/server/telegram.test.ts` — Tests unitarios con `node:test` para escape HTML y formateo.
- `src/routes/contact/index.ts` — Endpoint de Qwik City con `onPost` y `onGet`.

**Modificados**
- `src/features/contact-form/ui/contact-form.tsx` — Actualizar llamada `fetch` a `/contact`.
- `src/features/contact-form/index.ts` — Exportar utilidades de servidor si aplica.
- `src/routes/api/contact/index.ts` — Redirigir/delegar a `/contact` para evitar endpoints huérfanos.
- `MEMORY.md` — Registrar estado actual y decisión de Telegram Bot API.

## Decisiones

1. **Uso de Telegram Bot API en lugar de proveedores de correo**: Cero requerimiento de dominio propio, entrega instantánea en dispositivo móvil y 100% gratuito de por vida sin límite mensual.
2. **Endpoint propio en `/contact` en lugar de middleware en `plugin.ts`**: Siguiendo las directrices oficiales de Qwik City, la lógica de negocio de rutas específicas pertenece a archivos de ruta dedicados (`src/routes/contact/index.ts`) y no a plugins globales.
3. **Saneamiento explícito de caracteres especiales**: Telegram con `parse_mode: 'HTML'` falla si el texto contiene `<` o `&` sin escapar. Una función pura `escapeHtml` neutraliza cualquier inyección o error de parseo.
4. **Simulación en entorno local sin credenciales**: Si `TELEGRAM_BOT_TOKEN` o `TELEGRAM_CHAT_ID` no están configuradas, se muestra aviso por consola del servidor y se responde éxito `{ ok: true, simulated: true }` para permitir el desarrollo visual fluido.

## Estrategia de tests

- Tests unitarios en `src/features/contact-form/server/telegram.test.ts` con el runner nativo `node --test` para validar:
  - Escape de entidades HTML (`&`, `<`, `>`, `"`).
  - Formateo correcto del mensaje de Telegram con saltos de línea y etiquetas `<b>`.
  - Comportamiento de `sendTelegramNotification` cuando faltan credenciales (retorno de estado simulado).
- Verificación con `pnpm lint`, `pnpm test` y `pnpm build`.

## Orden

1. Crear `telegram.ts` y sus pruebas unitarias en `telegram.test.ts`.
2. Crear el endpoint `src/routes/contact/index.ts`.
3. Actualizar `contact-form.tsx` para llamar a `/contact`.
4. Reemplazar `src/routes/api/contact/index.ts` para redirigir a `/contact`.
5. Ejecutar tests y compilar proyecto.
6. Actualizar `MEMORY.md`.
