# Arquitectura — Portfolio duquerson

Guía de estructura del proyecto. Deriva de Feature-Sliced Design (FSD) con arquitectura
hexagonal **selectiva**. Es el detalle que `AGENTS.md` no repite; si algo se contradice,
manda `docs/constitution.md` y después `AGENTS.md`.

## 0. Objetivo

Que se entienda qué hace el proyecto y dónde tocar mirando la estructura de carpetas,
sin leer documentación aparte.

**Principio rector:** la estructura cuenta la historia del proyecto (qué hace), no la del
framework (con qué está hecho).

## 1. Estructura vigente

```text
src/
├── root.tsx                 # providers y <head>. Ruta fija de Qwik.
├── entry.ssr.tsx            # render en servidor. Ruta fija de Qwik.
├── entry.dev.tsx            # render en desarrollo. Ruta fija de Qwik.
├── routes/                  # páginas y endpoints = capa "pages"
│   ├── index.tsx            # raíz: 302 a /es/ o /en/ según el navegador
│   ├── [...lang]/index.tsx  # portada bajo el prefijo de idioma
│   ├── layout.tsx           # skip link, navbar, <main>, footer
│   ├── plugin.ts            # fija el idioma en cada petición
│   └── api/contact/         # endpoint POST con Zod
├── app/                     # arranque
│   ├── i18n/                # config, carga y resolución de idioma (+ su test)
│   └── styles/global.css    # tokens del tema, focus-visible, reduced-motion
├── components/<sección>/    # bloques visuales de la portada
│   ├── hero/  about/  projects/  experience/
│   └── skills/  navbar/  footer/  router-head/
└── features/
    └── contact-form/        # acción de usuario con validación
        ├── ui/contact-form.tsx
        ├── model/schema.ts  # Zod, fuente única
        └── index.ts         # API pública
```

## 2. Excepciones de Qwik City

Qwik City resuelve el routing por sistema de archivos y busca estos archivos en rutas
fijas. No se mueven:

| Ruta | Motivo |
| --- | --- |
| `src/root.tsx` | punto de entrada del documento |
| `src/entry.*.tsx` | render en servidor y en desarrollo |
| `src/routes/` | capa de páginas **y** directorio de rutas a la vez |

Consecuencia práctica: `routes/` es la capa de páginas y, a la vez, una excepción del
framework. Reorganizar rutas cambia las URLs, así que está prohibido sin preguntar.

## 2.1 Rutas con prefijo de idioma

El sitio vive en `/es/` y `/en/`. La raíz no muestra contenido: responde 302 al idioma
del visitante. Un prefijo que no existe (`/fr/`) se redirige al idioma que sí.

```text
/es/  →  español
/en/  →  inglés
/fr/  →  302 → /en/
/     →  302 → /es/ o /en/, según el navegador
```

La precedencia es deliberada: **el prefijo de la URL manda** sobre el navegador, para que
un enlace compartido abra siempre el idioma que dice. `plugin.ts` aplica esa precedencia y
`resolveLocale` (en `app/i18n/`) decide cuando no hay prefijo. No hay selector manual: el
idioma se detecta solo.

Consecuencia: `defaultLocale` es `en`, porque todo lo que no sea español se muestra en
inglés, incluido un navegador sin datos de idioma.

## 3. Regla de dependencias

```text
routes/  →  features/  →  app/
routes/  →  components/
```

- Una capa solo importa de capas inferiores. Nunca hacia arriba ni entre hermanos.
- Un componente no importa archivos internos de `features/`: entra por
  `~/features/contact-form` (su `index.ts`).
- Nada entra en `components/` desde fuera, salvo la propia página que compone secciones.

## 4. API pública obligatoria

Cada unidad expone solo lo necesario desde su `index.ts`:

```ts
// Correcto
import { ContactForm } from "~/features/contact-form";

// Incorrecto
import { ContactForm } from "~/features/contact-form/ui/contact-form";
```

## 5. Cuándo añadir arquitectura hexagonal (y cuándo no)

**No es el default.** Solo dentro de una unidad y cuando el costo se paga solo.

En este proyecto **ninguna** cumple las señales hoy: solo hay una acción de usuario con
un schema y sin integraciones reales. El día que `/api/contact` envíe correo (Resend) y
aplique rate limit (Upstash), `features/contact-form/` tendrá dos implementaciones de una
misma dependencia externa y sí justificará puertos y adaptadores:

```text
features/contact-form/
├── domain/              # reglas puras: qué es un mensaje válido. Cero dependencias
├── application/         # caso de uso + PUERTOS (Notificacion, Limitador)
├── infrastructure/      # ADAPTADORES: Resend, Upstash
├── ui/                  # el formulario
└── index.ts
```

Dirección dentro de la unidad: `ui / infrastructure → application → domain`.

Regla práctica: si no sabes explicar en una frase qué problema resuelve el puerto, no lo crees.

## 6. No se crean carpetas vacías

`shared/` y `entities/` **no existen** y es una decisión, no un olvido. Crear una capa
solo porque la guía FSD la menciona produce indirección sin valor en un portfolio.

- `shared/` se crea cuando exista un componente con **dos** consumidores reales.
- `entities/` se crea cuando los datos de proyectos, experiencia o habilidades dejen de
  estar embebidos en los componentes y pasen a ser datos traducibles.

## 7. Nombres

- Carpetas y archivos dicen qué es y qué rol cumplen: `contact-form/`, `model/schema.ts`.
- Variables y funciones en inglés; comentarios y textos visibles en español.
- Nada de carpetas `utils`, `helpers`, `common` o `misc`.

## 8. Árbol de decisión para código nuevo

```text
¿Es configuración de arranque, estilos globales o idioma?
 └─ Sí → app/
 └─ No ↓
¿Es una sección o bloque visual de la portada?
 └─ Sí → components/<seccion>/
 └─ No ↓
¿Es una acción del usuario con validación o integraciones?
 └─ Sí → features/<accion>/ con ui/, model/ e index.ts
 └─ No ↓
¿Es una ruta o un endpoint?
 └─ Sí → routes/
 └─ No → si hay un consumidor más, shared/; si no, no crees la capa
```

## 9. Checklist de revisión

- [ ] Ninguna capa importa de una capa superior.
- [ ] Nadie importa archivos internos de una unidad: todo pasa por su `index.ts`.
- [ ] El schema de validación está en `features/contact-form/model/`, no duplicado.
- [ ] No se han creado carpetas vacías ni capas "por si acaso".
- [ ] No hay lógica de negocio dentro de componentes de presentación.
- [ ] Las rutas de Qwik (`root.tsx`, `entry.*.tsx`, `routes/`) siguen en su sitio.
- [ ] `pnpm lint`, `pnpm test` y `pnpm build` en verde.

## 10. Instrucciones para agentes

1. Antes de crear un archivo, indica en qué capa va y por qué, en una línea.
2. Si una petición rompe la regla de dependencias, avisa y ofrece la alternativa: mover el
   código a una capa inferior o componerlo desde arriba.
3. No inventes abstracciones (interfaces, factories, capas) sin un motivo documentado.
4. No muevas `root.tsx`, `entry.*.tsx` ni `routes/` sin preguntar.
5. Al terminar, resume qué archivos creaste, en qué capa quedaron y si `pnpm lint` pasa.