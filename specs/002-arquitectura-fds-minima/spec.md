# Spec 002 — FDS mínimo y guía de arquitectura del proyecto

**Estado: implementada y verificada**

> Nota posterior: el idioma pasó a vivir en el prefijo de ruta (`/es/`, `/en/`) en un
> cambio posterior a esta spec. La capa `pages` sigue siendo `src/routes/`, ahora con
> `[...lang]/index.tsx` y una raíz que redirige.

## Por qué

El proyecto tiene en la raíz una guía de Feature-Sliced Design + Hexagonal selectiva pensada para "cualquier proyecto", y casi ninguno de sus capas existe aquí: el código está en `src/components/<sección>/` y el formulario de contacto, que es la única pieza con lógica propia, ni siquiera tiene su schema en un sitio único (está duplicado entre el componente y el endpoint). Además Qwik City impone rutas fijas que chocan con FSD, así que hace falta decidir y documentar la excepción en lugar de:apply la guía a medias.

El resultado buscado es que la estructura diga qué hace el proyecto, que las piezas con lógica tengan un sitio reconocible, y que quede escrito por qué `shared/` todavía no existe.

## Alcance

- Declarar `app/` como capa de arranque y mover allí la configuración de i18n y los estilos globales.
- Crear `features/contact-form/` con el schema de validación como fuente única y API pública propia.
- Redactar `ARCHITECTURE.md` como guía de este proyecto: capas reales, excepciones de Qwik, criterio hexagonal y checklist.
- Actualizar `AGENTS.md` y `MEMORY.md` para que apunten a la estructura nueva.

## Fuera de alcance

- Mover los datos de proyectos, experiencia y habilidades a `entities/`.
- Crear `shared/` o `widgets/`.
- Aplicar estructura hexagonal a ningún slice.
- Traducir contenido, cambiar el routing o la resolución de idioma.

## Requisitos (EARS)

1. La configuración de idioma, la función de carga de traducciones, la resolución de idioma y sus estilos globales DEBEN vivir en la capa de arranque.
2. El formulario de contacto DEBE tener su propia unidad de código, con el schema de validación como fuente única y un punto de entrada público.
3. Cuando el endpoint de contacto valida una petición, DEBE usar el mismo schema que el formulario del cliente.
4. Un componente de otra unidad NO DEBE importar archivos internos de la unidad del formulario.
5. La guía de arquitectura del proyecto DEBE describir las capas que existen, las excepciones que impone el framework y el motivo de cada una.
6. La guía DEBE establecer que no se crean carpetas ni capas vacías, y que `shared/` se crea solo cuando exista un segundo consumidor real.
7. La guía DEBE indicar en qué caso, en este proyecto, la arquitectura hexagonal estaría justificada.
8. Las reglas de estructura DEBE quedar recogidas en `AGENTS.md`, que es lo que leen los agentes.

## Casos límite

- Mover los estilos globales cambia su ruta de importación: hay que actualizar el único punto que los carga.
- El test de la resolución de idioma cambia de carpeta: su import relativo se ajusta.
- `src/routes/` es a la vez la capa de páginas y el directorio de rutas del framework: cualquier reorganización interna de rutas cambia el routing y queda prohibida sin preguntar.
- El endpoint de contacto es una ruta del framework, no una unidad de negocio: puede consumir `features/`, pero no puede importar archivos internos.
- `ARCHITECTURE.md` es genérica hoy; al adaptarla hay que conservar su valor como guía (capas, signals, checklist) y quitar lo que no aplica a un portfolio.

## Criterios de finalización

- `pnpm lint`, `pnpm test` y `pnpm build.client` en verde.
- Portada verificada en español e inglés tras el movimiento de archivos.
- Ningún archivo importa rutas internas de otra unidad.