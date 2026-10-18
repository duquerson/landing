# Spec 004 — Tokens semánticos de Tailwind CSS v4 y accesibilidad WCAG 2.2 AA

**Estado: implementada**

## Por qué

En la arquitectura actual, los estilos de tema definidos en `:root` dentro de `src/app/styles/global.css` no están integrados con la directiva nativa `@theme` de Tailwind CSS v4. Como consecuencia, los componentes usan utilidades hardcodeadas (`slate-900`, `slate-800`, `blue-400`, `blue-600`), rompiendo la fuente única de verdad del diseño. Además, existen detalles de accesibilidad pendientes: elementos con bajo contraste como el texto secundario del footer, enlaces externos sin aviso para lectores de pantalla, y áreas táctiles en móvil que requieren mayor holgura según WCAG 2.2 AA.

## Alcance

- Migración de tokens a `@theme` nativo de Tailwind CSS v4 en `src/app/styles/global.css`.
- Sustitución de colores hardcodeados por utilidades semánticas en todos los componentes (`hero`, `navbar`, `about`, `projects`, `experience`, `skills`, `footer`, `contact-form`).
- Unificación del estilo de enfoque `:focus-visible` accesible y consistente.
- Corrección de ratios de contraste (contraste mínimo 4.5:1 en textos secundarios).
- Enlaces externos con aviso sonoro para tecnologías de asistencia mediante clave i18n (`a11y.external_link`).
- Objetivos táctiles mínimos de 44×44px en componentes interactivos en pantallas móviles.
- Garantía de desactivación de animaciones cuando `prefers-reduced-motion: reduce` está activo.

## Fuera de alcance

- Envío de correos por backend (Fase 3: Resend/Upstash).
- Adaptador de despliegue Netlify (Fase 4).
- Nuevas dependencias en `package.json`.

## Requisitos (EARS)

### Sistema de Diseño y Tokens (Fase 1)

1. El sistema DEBE definir los tokens de color dentro del bloque `@theme` de Tailwind CSS v4 en `src/app/styles/global.css`.
2. Los componentes DEBEN utilizar las clases semánticas generadas por el tema en lugar de clases de color hardcodeadas de la paleta por defecto.
3. El sistema DEBE unificar la apariencia de `:focus-visible` con un contorno de alto contraste y separación `outline-offset: 2px` en todos los elementos interactivos.

### Accesibilidad y Experiencia de Usuario (Fase 2)

4. El texto secundario del pie de página DEBE cumplir con un ratio de contraste de al menos 4.5:1 contra el fondo.
5. Cuando un enlace se abra en una nueva pestaña (`target="_blank"`), el sistema DEBE incluir texto accesible oculto visualmente que lo indique.
6. En pantallas móviles, los elementos interactivos (botón de menú y enlaces) DEBEN ofrecer un área táctil mínima de 44×44px.
7. Mientras el usuario tenga habilitada la preferencia `prefers-reduced-motion: reduce`, el sistema DEBE neutralizar las animaciones y transiciones visuales.

## Criterios de finalización

- `pnpm lint` compila sin errores de tipos.
- `pnpm test` ejecuta y aprueba todos los tests existentes.
- `pnpm build` compila con éxito los bundles de cliente y SSR.
