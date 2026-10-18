# Tareas 005 — Envío de formulario vía Telegram Bot con proxy interno /contact

## T1 — Lógica pura de Telegram y tests unitarios

**RF**: 3, 5, 6, 7

Crear `src/features/contact-form/server/telegram.ts` con las funciones puras `escapeHtml`, `formatTelegramMessage` y `sendTelegramNotification` (usando `fetch` nativo). Crear sus pruebas unitarias en `src/features/contact-form/server/telegram.test.ts`.

**Hecho cuando**: Los tests en `telegram.test.ts` pasan con `pnpm test` verificando escape de caracteres, formato HTML y fallback cuando faltan credenciales.

## T2 — Crear endpoint de servidor `/contact`

**RF**: 2, 4, 8

Crear `src/routes/contact/index.ts` con los manejadores:
- `onPost`: Lee el cuerpo JSON, valida con `contactSchema`, llama a `sendTelegramNotification` con las credenciales de `env` y responde JSON según el resultado.
- `onGet`: Redirige con 302 a `/#contact`.

**Hecho cuando**: El endpoint existe, compila sin errores y delega a la función de Telegram.

## T3 — Conectar el cliente `ContactForm` a `/contact` y limpiar endpoint antiguo

**RF**: 1

Modificar `src/features/contact-form/ui/contact-form.tsx` para cambiar la URL de `fetch('/api/contact', ...)` a `fetch('/contact', ...)`. Actualizar `src/routes/api/contact/index.ts` para responder con redirección permanente o delegar a `/contact`.

**Hecho cuando**: El formulario en el cliente apunta a `/contact` y no quedan referencias directas al endpoint anterior.

## T4 — Verificación final y actualización de memoria

**RF**: 1, 2, 3, 4, 5, 6, 7, 8

Ejecutar `pnpm lint`, `pnpm test` y `pnpm build`. Asegurar que todas las pruebas pasen en verde y actualizar `MEMORY.md`.

**Hecho cuando**: `pnpm lint`, `pnpm test` y `pnpm build` finalizan con código 0 y `MEMORY.md` documenta la spec 005 implementada.
