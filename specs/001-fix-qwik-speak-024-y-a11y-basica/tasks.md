# Tareas 001 — Restaurar i18n (Qwik Speak 0.24) y bases de accesibilidad

## T1 — Función pura de resolución de idioma

**RF**: 5

Escribir el test en rojo y luego `src/speak-locale.ts` con `resolveLocale(header, config)`, sin efectos secundarios. Cubre: cabecera ausente, vacía, idioma no admitido, idioma con región distinta, varios idiomas, lista de idiomas vacía.

**Hecho cuando**: `pnpm test` pasa con los casos de cabecera ausente, no admitida y con región distinta, y `resolveLocale` no recibe nada más que la cabecera y la configuración.

## T2 — Carga de traducciones

**RF**: 2

Crear `src/speak-functions.ts` con `translationFn.loadTranslation$` como QRL de servidor que resuelve el JSON del idioma y el asset solicitados. Revisar que `speak-config.ts` declara el asset correcto.

**Hecho cuando**: `pnpm lint` no reporta errores en `speak-functions.ts` y la función devuelve el objeto de traducciones del idioma pedido.

## T3 — Locale por petición y render de servidor

**RF**: 5, 6

Crear `src/routes/plugin.ts` con `onRequest` que usa `resolveLocale` y fija `locale()`. En `entry.ssr.tsx`, resolver `base` según el locale y propagar `lang` al elemento raíz. En `entry.dev.tsx`, usar la API de render vigente.

**Hecho cuando**: `pnpm lint` pasa y el documento servido declara `lang` con el idioma resuelto.

## T4 — Provider de idioma y head

**RF**: 1, 13

En `src/root.tsx`, inicializar el contexto de traducción con la configuración y la función de carga en lugar del provider inexistente, añadir `theme-color` coherente con el fondo de la página y eliminar el `viewport` duplicado (quedará solo en `router-head.tsx`).

**Hecho cuando**: `pnpm lint` pasa y el `head` contiene un solo `viewport` y un `theme-color` igual al fondo.

## T5 — Traducciones en los componentes

**RF**: 3, 4, 8

Registrar el plugin inline de Vite con la ruta de traducciones y los dos idiomas. En los ocho componentes, sustituir la función de traducción inexistente por la vigente, conservando las claves.

**Hecho cuando**: `pnpm lint` pasa, la portada muestra los textos traducidos en español y en inglés, y `pnpm build` no deja claves sin traducir en el log del plugin.

## T6 — Comprobación de tipos, tests y build

**RF**: 7, 8

Ejecutar `pnpm lint`, `pnpm test` y `pnpm build`. Revisar el log del plugin inline en busca de claves sin valor por defecto.

**Hecho cuando**: las tres órdenes terminan en verde y el log no reporta claves dinámicas ni faltantes.

## T7 — Skip link y anclas

**RF**: 9, 11

En `layout.tsx`, añadir el enlace de salto traducible como primer elemento enfocable y dar al contenido principal un identificador y foco programático. En las secciones con ancla, añadir desplazamiento superior suficiente para la cabecera fija.

**Hecho cuando**: el primer `Tab` de la página enfoca el enlace de salto, `Enter` lleva al contenido principal, y al pulsar cualquier enlace de la navegación el encabezado de destino queda visible.

## T8 — Navegación móvil

**RF**: 10, 14

En `navbar.tsx`, añadir el control de menú para viewports estrechos con estado expandido, cierre con `Escape`, cierre al pulsar un enlace y etiqueta traducible. Añadir `a11y.menu` y `navbar.aria_label` a los dos archivos de traducción.

**Hecho cuando**: a menos de 768 px la navegación se abre y se cierra con teclado y con puntero, el control comunica su estado, y el cierre con `Escape` devuelve el foco.

## T9 — Anuncio de mensajes del formulario

**RF**: 12, 14

En `contact.tsx`, añadir región viva y rol ARIA a los mensajes de éxito y de error.

**Hecho cuando**: al enviar el formulario, el lector de pantalla anuncia el mensaje sin que el usuario tenga que navegar hasta él, y los mensajes pueden aparecer y desaparecer varias veces seguidas.

## T10 — Verificación y memoria

**RF**: 7, 8, 12

Recorrer la portada con el MCP de Chrome DevTools en español e inglés, en escritorio y en móvil, comprobando teclado, skip link, menú, anclas y mensajes del formulario. Actualizar `MEMORY.md` con el resultado y con los hallazgos de la revisión de interfaz que siguen pendientes.

**Hecho cuando**: no queda ningún incumplimiento de los RF 1 a 14 sin comprobar, y `MEMORY.md` refleja el estado final.