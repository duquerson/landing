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

Variables de entorno usadas por el endpoint de contacto:

| Variable | Para qué sirve |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Token privado del bot que recibe los mensajes |
| `TELEGRAM_CHAT_ID` | ID del chat de destino |

En desarrollo local, define estos valores en `.env`. En producción, configúralos en Netlify como variables de entorno privadas; no los añadas al repositorio.

## Comandos

```bash
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción
pnpm preview  # preview del build
pnpm lint     # chequeo de tipos (tsc --noEmit; no hay ESLint)
pnpm test     # tests con node --test
pnpm fmt      # Prettier
```

## Despliegue en Netlify

El sitio usa Qwik City con Netlify Edge para servir páginas SSR y el endpoint `POST /contact`. La configuración está en `netlify.toml`: Netlify ejecuta `pnpm build.netlify` y publica los recursos estáticos generados en `dist`.

1. Sube esta rama a GitHub y, en Netlify, selecciona **Add new site → Import an existing project**.
2. Conecta GitHub, elige `duquerson/landing` y selecciona la rama `master`.
3. Netlify leerá el comando de build y el directorio de publicación de `netlify.toml`.
4. En **Site configuration → Environment variables**, crea `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` con los valores reales. No los pegues en el repo, en `netlify.toml` ni en logs.
5. Inicia el deploy desde Netlify y revisa el resultado en el log de build.

La configuración del código no crea ni vincula un sitio en una cuenta Netlify. El primer deploy requiere acceso a la cuenta del propietario y establecer allí las variables privadas.

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