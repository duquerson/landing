# Plan 003 — Afinar el formulario y el contenido del sitio

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Errores por campo + foco | 1 |
| Mensajes de validación traducidos | 2 |
| Endpoint con campos, sin prosa | 3 |
| Contenido desde traducciones | 4 |
| Periodos con `Intl` | 5 |
| `translate="no"` | 6 |
| Textos largos | 7 |
| `text-wrap`, `…`, `touch-action`, sin scroll | 8, 9 |
| Año del footer sin `new Date()` en render | 10 |

## Archivos

**Modificados**

- `public/i18n/es/app.json`, `public/i18n/en/app.json` — claves `contact.errors.*`,
  `contact.fields.*`, `contact.placeholders.*`, `projects.items.*`, `experience.items.*`,
  `experience.present`, `skills.categories.*`.
- `src/features/contact-form/model/schema.ts` — sin texto visible: solo las reglas.
- `src/features/contact-form/model/errors.ts` — **nuevo**: traduce un `issue` de Zod a la
  clave de traducción del campo que falló.
- `src/features/contact-form/ui/contact-form.tsx` — errores junto al campo, `aria-invalid`,
  `aria-describedby`, foco al primer error, placeholders, spinner.
- `src/routes/api/contact/index.ts` — devuelve la lista de campos fallidos.
- `src/components/projects/projects.tsx`, `experience/experience.tsx`, `skills/skills.tsx`
  — contenido desde `t()`, periodos con `useFormatDate`.
- `src/components/hero/hero.tsx`, `footer/footer.tsx` — `translate="no"`, `text-wrap`, año
  sin `new Date()` en render.
- `src/app/styles/global.css` — `touch-action`, realce de toque, `overflow-x`, `text-wrap`.
- `MEMORY.MD`.

## Decisiones

1. **El schema no lleva mensajes; el endpoint devuelve nombres de campo.**
   Alternativa descartada: dejar los mensajes en el schema. Esos textos son en español, así
   que un visitante en inglés vería el error en el idioma equivocado.
2. **El mapeo de error a traducción vive en `model/errors.ts`.**
   Alternativa descartada: mapear dentro del componente. El componente quedaría con lógica
   de validación y la regla "lógica separada" de la constitution se rompería.
3. **El contenido se queda en arrays de código, pero cada texto sale de `t()` con clave
   literal.**
   Alternativa descartada: mover los arrays a las traducciones con claves dinámicas. Eso
   obliga a `runtimeAssets` y a perder la verificación estática de claves que da el plugin
   inline. Con claves literales (`projects.p1.title`) el plugin las comprueba en cada build.
4. **Los periodos se guardan como ISO en las traducciones y se formatean con
   `useFormatDate`.**
   Alternativa descartada: guardar "2024 - Presente" como texto. No se puede localizar ni
   ordenar, y la skill `local-dates` lo prohíbe.
5. **Consolidar los tokens de color queda fuera.**
   Alternativa descartada: hacerlo en esta spec. Los tokens declarados y la paleta usada
   no coinciden; elegir una cambia la apariencia del sitio y eso es una decisión del
   propietario, no un refactor.
6. **El foco al primer error se mueve con `document.getElementById(...).focus()` dentro del
   manejador `$()`.**
   Alternativa descartada: refs de Qwik. Solo hay tres campos y el ids ya existen por las
   etiquetas; añadir refs sería ruido.

## Estrategia de tests

No hay lógica nueva pura: el mapa de errores es una función de translation de claves, y su
resultado se comprueba en navegador. Los tests existentes de `resolveLocale` siguen siendo
la única lógica pura con test. Se mantiene `pnpm test` en verde y se verifica la
interfaz con el MCP de Chrome DevTools en `/es/` y `/en/`.

## Orden

Primero el modelo de errores y el endpoint, luego el formulario, después el contenido de las
secciones, y por último los detalles de estilo y el cierre.