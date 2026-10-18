# Spec 012 — Corregir el stack de REST Countries

**Estado: implementada y verificada**

## Por qué

La tarjeta de REST Countries atribuye Vue y Astro al proyecto, pero el usuario confirma que
la implementación está hecha en Svelte. La ficha pública del repositorio también lo describe
como una aplicación con Svelte, mientras que el README conserva referencias contradictorias
a Astro/Vue.

## Alcance

- Corregir la tecnología de REST Countries en las descripciones es/en.
- Reemplazar las etiquetas Astro/Vue por Svelte y mantener las demás solo si están respaldadas
  por el repositorio o por la información confirmada del usuario.
- Conservar preview, enlaces, descripción funcional y accesibilidad.
- Mantener Todo App en React y Game Learning en Astro/Vue.

## Fuera de alcance

- Cambiar tecnologías de Game Learning, Todo App o la sección global de habilidades.
- Modificar los repositorios externos.
- Cambiar previews, rutas, dependencias o la arquitectura del portfolio.

## Requisitos (EARS)

1. Cuando se presente REST Countries, el sistema DEBE identificar Svelte como su framework de
   interfaz y NO DEBE atribuirle Vue ni Astro.
2. Cuando se presenten Game Learning y Todo App, el sistema DEBE conservar respectivamente
   Astro/Vue y React como sus tecnologías de interfaz.
3. Cuando se presente el sitio en español o inglés, las descripciones y etiquetas DEBEN estar
   localizadas en los catálogos es/en.
4. El sistema DEBE conservar las imágenes, destinos y textos alternativos de los proyectos.

## Casos límite

- Si el README y los metadatos del repositorio se contradicen, prevalece la confirmación del
  usuario para describir su proyecto y no se atribuye un framework adicional sin evidencia.
- No traducir Svelte, React, Astro, Vue ni TypeScript.

## Criterios de finalización

- La tarjeta REST Countries menciona Svelte y no menciona Vue/Astro.
- Game Learning conserva Astro/Vue y Todo App conserva React.
- Los catálogos es/en son JSON válidos y `pnpm lint` pasa.
