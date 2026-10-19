# MEMORY.md — Portfolio duquerson

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- Specs 001 (i18n), 002 (FDS), 003 (formulario), 004 (Tailwind v4 tokens y a11y) y 005 (Telegram Bot proxy `/contact`) **implementadas**: `pnpm lint`, `pnpm test` (35 casos) y `pnpm build` en verde.
- Spec 006 **implementada**: formulario bilingüe con errores localizados y notificación de Telegram en formato de correo. Verificación actual: Node 24.18.0, `node --test --test-isolation=none` (35/35); `pnpm test` aún falla por `spawn EPERM` al crear procesos aislados.
- Spec 007: hero con órbita responsive implementado: Hono.js reemplaza a Docker; los otros once logos siguen en Devicon y Hono está añadido desde Simple Icons al sprite local, con color y licencia. El radio interior aumentó a 35cqw para separar los iconos de la foto; el exterior sigue en 42cqw. El giro se activa en el `<img>` con `pointerenter` y se detiene al salir de la escena con `pointerleave`; al hover individual, la insignia escala 5% y toma el color de fondo de página. En revisión local con Chromium, `prefers-reduced-motion` es `reduce`: el evento sí añade `animate-spin`, pero el estilo computado deja la animación en `none`; también quedan desactivados el giro de órbitas y el botón de pausa. `pnpm lint` pasa y los tests pasan 35/35 con `--test-isolation=none`; aunque Vite había fallado antes por `spawn EPERM`, `pnpm dev` arrancó en esta revisión.
- Spec 009 **implementada y verificada**: la escena orbital pausa con foco visible de teclado y reanuda al salir; la pausa manual permanece. Chromium confirmó ambas transiciones. La preferencia del sistema continúa en `reduce`, por lo que las animaciones visuales siguen desactivadas en ese navegador; no se intenta detectar lectores de pantalla.
- Spec 008: Experiencia y Formación actualizadas en es/en. La experiencia desde septiembre de 2025 se presenta como independiente y basada en proyectos; Formación contiene únicamente el TSU en Informática (IUFRONT, 2008–2012), por petición del usuario. Habilidades incluyen las tecnologías de los proyectos descritos y del portfolio; se excluyen localStorage, Vitest, Playwright y Vercel por falta de evidencia. `pnpm lint` pasa; `pnpm test --test-isolation=none` pasa 35/35; el test normal falla con `spawn EPERM`. Los periodos son ISO al mediodía UTC para evitar cambios de día en Santiago/Nueva York y se formatean con `useFormatDate`.
- Spec 009: Proyectos destacados reemplazados por Game Learning, REST Countries — Where in the world? y Todo App, con descripciones bilingües, tecnologías y enlaces reales a GitHub/demos. `pnpm lint` pasa; `pnpm test --test-isolation=none` pasa 35/35; el test normal continúa con `spawn EPERM`. Astro/Vue/Vitest/Playwright aparecen únicamente como tecnologías y prácticas de los proyectos descritos; el runtime de este portfolio sigue siendo Qwik.
- Spec 010: Las tarjetas de proyectos muestran previews con `alt` localizado. Game Learning usa la captura adjunta en `public/img/projects/game-learning.png`; REST Countries y Todo App usan las URLs directas proporcionadas por el usuario. Las imágenes declaran dimensiones, `loading="lazy"`, `decoding="async"` y `object-contain`; `pnpm lint` y `pnpm test --test-isolation=none` pasan 35/35.
- Specs 011–012: Stacks de proyectos localizados en es/en. Game Learning usa Astro/Vue; REST Countries se corrigió a Svelte (el usuario confirmó que su README contradice el stack implementado); Todo App usa React. No mezclar tecnologías entre tarjetas. Lint y 35 tests pasan con `--test-isolation=none`.
- Idiomas con prefijo de ruta: `/es/` y `/en/`. La raíz responde 302 al idioma del navegador y un prefijo desconocido se redirige al que corresponde. Sin selector manual.
- Estructura por capas: `routes/` (pages + endpoint `/contact`) → `features/contact-form/` → `app/` (i18n + estilos) + `components/<sección>/`.
- Estilos con Tailwind CSS v4: tokens semánticos en `@theme` (`src/app/styles/global.css`), utilidades semánticas en componentes, áreas táctiles mínimas de 44px en móvil, foco unificado y `motion-reduce`.
- Formulario de contacto: el cliente solo llama a `POST /contact` (oculta proveedores y claves en red). Valida con Zod y envía a Telegram Bot API (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) con escape HTML. Si falta una credencial, el envío falla y se muestra el mensaje genérico localizado.
- Verificación previa de specs 001–005: `pnpm lint`, `pnpm build` en verde y `pnpm test` con 35 casos; no equivale a una verificación de spec 006.

## Decisiones (y por qué)
- Proxy `/contact` con Telegram Bot API: cero costo, entrega instantánea en móvil sin necesidad de dominio propio. La URL de Telegram y las claves nunca se exponen al cliente.
- Credenciales de Telegram ausentes producen un fallo real y un único log genérico en el servicio; el endpoint no duplica el log ni registra `chatId` en ese caso.
- Saneamiento de caracteres HTML en mensajes para Telegram: previene errores de parseo HTML por inyecciones en el payload.
- La notificación de Telegram conserva `parse_mode: "HTML"` y ordena asunto, saludo, remitente, cuerpo, despedida y origen; escapa cada dato y mantiene los saltos de párrafo.
- Tokens centralizados en `@theme` de Tailwind CSS v4: fuente única de verdad para el diseño y reducción del CSS final.
- La órbita autohospeda el sprite Devicon aprobado con el símbolo Hono añadido desde Simple Icons; mantiene colores de marca y usa Tailwind para tamaño/hover. La foto disponible es `public/Hero-img.png` porque `public/img/avatar.webp` no existe.
- Enlaces externos con anuncio audible (`a11y.external_link`) mediante `<span class="sr-only">`: cumplimiento de WCAG 2.2 AA.
- Experiencia independiente y Formación usan solo datos proporcionados; Qwik Speak localiza el contenido y `useFormatDate` los periodos. Las habilidades muestran React/Astro/Vue por proyectos descritos y Qwik/SSR/Zod/node:test/Netlify por el portfolio; no atribuir Vitest, Playwright, localStorage o Vercel sin evidencia.
- El CSS de órbita no depende del render de Qwik: `prefers-reduced-motion: reduce` aplica `animation-duration: 0.01ms !important` y `animation-iteration-count: 1 !important`, y las utilidades `motion-reduce` cancelan los giros y el cambio de escala. Chromium local confirmó que el handler añade la clase de giro, pero el estilo computado es `animation-name: none`; distinguir esto de un handler que no se ejecuta.
- La pausa por navegación usa `:focus-visible`, mantiene su estado separado de la pausa manual y solo se libera al salir del foco de la escena. No es un detector de lector de pantalla: el foco virtual de navegación puede no emitir eventos de foco DOM. Con `prefers-reduced-motion: reduce`, el sistema sigue desactivando las animaciones.
- La convención Better Commits usa `<gitmoji> <tipo>(<scope>): <asunto>` con tipos Conventional Commits, asuntos en español y sin automatización; no se deben crear commits iniciales implícitos cuando el historial esté vacío.
- El despliegue usa `@builder.io/qwik-city` Netlify Edge ya instalado; `pnpm build.netlify` compila cliente y SSR a `dist/` y `.netlify/edge-functions/`. La build Edge requiere `rollupOptions.input` como arreglo (qwik-speak 0.24) y `outDir` explícito (el adaptador localiza `edge-functions` en el path). Netlify usa `netlify.toml`; el formulario necesita `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` como variables privadas. `pnpm build.netlify`, `pnpm build`, `pnpm lint` y 35 tests pasan. `master` de GitHub se reemplazó con el snapshot local; aún no se ha publicado el sitio en una cuenta Netlify.
- `server/` en `.gitignore` debe quedar anclado como `/server/`: sin la barra inicial también ignoraba `src/features/contact-form/server/`, ocultando `telegram.ts` y sus tests del repositorio y rompiendo el build limpio de Netlify/Linux. Verificar siempre `git check-ignore` para ese código y mantener ignorados `.env`/`.env.local`.
- Áreas táctiles mínimas de 44×44px en botón de navegación y enlaces interactivos para cumplir WCAG 2.5.8.
- Idioma automático, sin selector: español si el navegador está en español y inglés en el resto.
- `features/contact-form/` es la única feature. El schema Zod vive una sola vez en `model/schema.ts` y lo usan el componente y el endpoint.
- `useQwikSpeak` + `loadTranslation$` con `server$` e `import.meta.glob`: los datos nunca viajan en el HTML; el plugin inline los mete en los chunks por idioma.

## Errores a evitar
- **No reescribir archivos UTF-8 con PowerShell**: `Get-Content -Raw` + `WriteAllText` decodifica como Windows-1252. Usar las herramientas de edición o un script de Node.
- El sprite de la órbita combina Devicon y el símbolo Hono de Simple Icons; si se cambia, conservar colores originales y actualizar atribución/licencias.
- **Qwik Speak elimina `inlineTranslate()` en compilación**: usa claves literales en cada `t("...")` y resuelve los textos antes de crear `$()`; no pases `t` a helpers con claves dinámicas o puede quedar una referencia inexistente en el cliente.
- **No registrar credenciales ni detalles del proveedor al faltar configuración**: una frase genérica en el servicio basta; la respuesta pública del endpoint solo comunica el estado.
- `pnpm dev` y `pnpm build` no pasan por el CLI de Qwik (`dev` = `vite --mode ssr`, `build` = cliente + `vite build --ssr src/entry.preview.tsx`).
- En este entorno, `node` es v24.18.0, pero `pnpm` resuelve `C:\ProgramData\chocolatey\bin\pnpm.exe` (advierte Node 20.11.1); el wrapper Corepack asociado a Node es `C:\Program Files\nodejs\pnpm.CMD`.
- `pnpm build` puede fallar con `spawn EPERM` al iniciar esbuild desde Vite incluso usando Node 24; `pnpm lint` se ejecuta correctamente con el wrapper y PATH de Node 24.
- Las carpetas ocultas presentes en la raíz (`.agents`, `.antigravitycli`, `.claude`, `.opencode`, `.vscode`, `.windsurf`) están excluidas explícitamente en `.gitignore`.
- El remoto puede contener una historia divergente; antes de reemplazar `master`, usar `--force-with-lease` con el SHA recién inspeccionado para no borrar cambios concurrentes. La sincronización requiere permiso de push en GitHub.
- No reintroducir restos del stack anterior (Astro/Vue/GSAP) ni Vitest/Playwright. El runner de tests es `pnpm test` (`node --test`).

## Pendiente
- Configurar el sitio y las variables privadas en la cuenta Netlify y ejecutar el primer deploy.
- Rate limit opcional y descarga de CV firmada si aplica.
