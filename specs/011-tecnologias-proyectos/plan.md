# Plan 011 — Tecnologías verificadas de proyectos destacados

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Revisión de repositorios | 1–3 |
| Catálogos bilingües | 1–4 |
| Componente de proyectos | 4–5 |
| Verificación y memoria | 1–5 |

## Archivos

**Modificados**

- `public/i18n/es/app.json` — etiquetas verificadas en español.
- `public/i18n/en/app.json` — etiquetas verificadas en inglés.
- `MEMORY.md` — registrar los stacks verificados y sus fuentes.

No se crean archivos de aplicación ni se añaden dependencias.

## Decisiones

1. **Usar README y `package.json` como fuentes de verdad.** Son documentación y manifiesto
   del propio repositorio. Alternativa descartada: conservar las etiquetas anteriores o
   inferir tecnologías por el nombre del proyecto.
2. **Mostrar un conjunto breve pero representativo.** Incluye framework, librerías y
   herramientas que ayudan a entender el proyecto sin convertir cada tarjeta en un inventario
   de dependencias. Alternativa descartada: listar todas las dependencias transitivas.
3. **Mantener claves `tags` localizadas por proyecto.** El componente ya las resuelve mediante
   Qwik Speak y evita claves dinámicas. Alternativa descartada: hardcodear arrays en TSX.

## Estrategia de tests

- Parsear ambos JSON y comprobar que p1, p2 y p3 conservan sus etiquetas específicas.
- Ejecutar `pnpm lint`.
- Ejecutar `pnpm test --test-isolation=none`; la presentación se revisa con Chromium si está
  disponible.

## Orden

1. Registrar el stack verificado de cada repositorio.
2. Actualizar etiquetas `tags` en es/en.
3. Comprobar que el componente sigue usando claves literales y no pierde previews/enlaces.
4. Ejecutar lint/tests y actualizar `MEMORY.md`.
