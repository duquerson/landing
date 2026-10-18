# Portfolio duquerson

Portfolio personal de **Yeferson Soto Duque** (duquerson.dev), una página en español e inglés dirigida a reclutadores y clientes. El foco del proyecto es la accesibilidad WCAG 2.2 AA y el código mantenible.

## Stack

- **Framework**: Qwik 1 (`@builder.io/qwik` + `@builder.io/qwik-city`). No v2: los imports de `@qwik.dev/*` no se usan en este repo.
- **i18n**: Qwik Speak con prefijo de idioma en la URL (`/es/` y `/en/`), en `src/app/i18n/`. La raíz redirige al idioma del navegador; no hay selector manual.
- **Estilos**: Tailwind CSS 4 vía `@tailwindcss/vite`, con tokens CSS definidos en `src/global.css`.
- **Validación**: Zod, solo en el endpoint del formulario de contacto (`src/routes/api/contact/index.ts`).
- **Tests**: runner nativo de Node (`node --test`). Sin dependencias de testing.
- **Tipos**: TypeScript en modo strict.
- **Gestor**: pnpm. **Despliegue**: Netlify.

## Requisitos

- Node.js >= 22.12.0
- pnpm

## Puesta en marcha

```bash
pnpm install
pnpm dev
```

Variables de entorno: copia `.env.example` a `.env` y rellena los valores. **Nunca subas `.env` al repositorio**; las claves solo se usan en el servidor.

Claves que todavía no se consumen en el código actual:

| Variable | Para qué sirve |
| --- | --- |
| `RESEND_API_KEY` | Envío de emails del formulario de contacto (Resend) |
| `CONTACT_TO_EMAIL` | Destino del formulario de contacto |
| `RESEND_FROM` | Remitente verificado en Resend |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Rate limit distribuido opcional (Upstash Redis REST) |
| `CV_DOWNLOAD_SECRET` | Firma de URLs temporales de descarga del CV (mínimo 16 caracteres) |

## Comandos

```bash
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción
pnpm preview  # preview del build
pnpm lint     # chequeo de tipos (tsc --noEmit; no hay ESLint)
pnpm test     # tests con node --test
pnpm fmt      # Prettier
```

## Estructura

```text
src/
├── routes/                  # páginas y endpoints
│   ├── index.tsx            # raíz: 302 a /es/ o /en/
│   ├── [...lang]/index.tsx  # portada bajo el prefijo de idioma
│   ├── layout.tsx           # skip link, navbar, <main>, footer
│   ├── plugin.ts            # fija el idioma en cada petición
│   └── api/contact/         # endpoint POST con validación Zod
├── app/                     # arranque
│   ├── i18n/                # config, carga y resolución de idioma (+ test)
│   └── styles/global.css    # tokens, focus-visible, prefers-reduced-motion
├── components/<sección>/    # hero, about, projects, experience, skills, navbar, footer
└── features/contact-form/   # ui/ + model/schema.ts + index.ts (API pública)
```

La estructura sigue Feature-Sliced Design de forma mínima; las reglas, las excepciones de
Qwik City y el criterio para crear capas están en `ARCHITECTURE.md`.

## Accesibilidad (WCAG 2.2 AA)

- HTML semántico, skip link al contenido y navegación por teclado también en móvil.
- Foco visible en todos los elementos interactivos.
- `prefers-reduced-motion` respetado en `src/app/styles/global.css` para animaciones y scroll suave.
- Los mensajes del formulario se anuncian con una región `aria-live`.
- Revisión manual de teclado, foco y contraste en cada cambio de interfaz.

## Agentes y flujo de trabajo

El proyecto usa el flujo SDD descrito en `AGENTS.md`, configurado en `.opencode/agents/`:

- `coordinator` (primary) dirige el flujo; `planner` redacta specs; `implementer` implementa una tarea por llamada; `reviewer` valida RF por RF.
- `/feature` para cambios pequeños: pide un plan y espera aprobación antes de tocar archivos.
- `docs/constitution.md` contiene los principios innegociables del proyecto.
- `MEMORY.md` guarda el estado y las decisiones entre sesiones.

## Licencia

Proyecto privado. Todos los derechos reservados.