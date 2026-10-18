# Spec 009 — Proyectos destacados del portfolio

**Estado: implementada y verificada**

## Por qué

La sección actual muestra el portfolio Qwik y un proyecto de e-commerce que no representan
los proyectos destacados que el usuario quiere presentar. Debe mostrar tres proyectos
frontend con sus tecnologías, capacidades demostradas y enlaces reales a repositorios y
demos.

## Alcance

- Reemplazar los proyectos actuales por Game Learning, REST Countries — Where in the world?
  y Todo App.
- Localizar títulos, descripciones, tecnologías y etiquetas de enlaces en español e inglés.
- Mostrar los enlaces reales de GitHub y, cuando exista, la demo de cada proyecto.
- Mantener la estructura visual, accesibilidad y comportamiento responsive de la sección.

## Fuera de alcance

- Añadir dependencias o cambiar el sistema de rutas e idiomas.
- Inventar características, tecnologías o URLs que no estén en la información proporcionada.
- Cambiar estilos globales o la navegación del sitio.

## Requisitos (EARS)

### Contenido

1. Cuando se presente Proyectos destacados, el sistema DEBE mostrar Game Learning con la
   descripción de plataforma interactiva para aprender JavaScript, lecciones por niveles,
   ejercicios, evaluaciones, diseño adaptable, navegación por teclado y pruebas con Vitest y
   Playwright.
2. Cuando se presente Proyectos destacados, el sistema DEBE mostrar REST Countries — Where in
   the world? con exploración, búsqueda y filtrado de países, páginas de detalle, modo
   claro/oscuro, integración con API, validación, caché y pruebas.
3. Cuando se presente Proyectos destacados, el sistema DEBE mostrar Todo App con filtros,
   edición, eliminación, tema claro/oscuro y reordenamiento, desarrollada con React y
   TypeScript.
4. El sistema DEBE mostrar las tecnologías de cada proyecto como etiquetas separadas y no
   traducir los nombres propios de tecnologías o proyectos.

### Enlaces y accesibilidad

5. Game Learning DEBE enlazar al repositorio `https://github.com/duquerson/game-learning` y a
   la demo `https://duquerson.github.io/game-learning/`.
6. REST Countries DEBE enlazar al repositorio `https://github.com/duquerson/country_api` y a
   la demo `https://country-api-eight-wheat.vercel.app`.
7. Todo App DEBE enlazar al repositorio `https://github.com/duquerson/todoList` y a la demo
   `https://full-todo-list.netlify.app/`.
8. Cuando se presente cada enlace externo, el sistema DEBE conservar el anuncio accesible
   localizado de que se abre en una pestaña nueva.
9. Cuando se presente el sitio en español o inglés, todo el contenido visible DEBE salir de
   claves literales de Qwik Speak.

## Casos límite

- Las URLs con barra final o sin ella deben conservarse como destinos válidos.
- En pantallas estrechas, las descripciones y etiquetas no deben provocar desplazamiento
  horizontal.
- Si cambia el idioma, los nombres de acciones (“Ver en GitHub”, “Ver demo” y sus equivalentes)
  deben localizarse sin traducir URLs, tecnologías ni nombres propios.

## Criterios de finalización

- La sección muestra exactamente los tres proyectos indicados, en el orden proporcionado.
- Cada proyecto tiene sus etiquetas y destinos correctos.
- Las traducciones es/en están completas y no quedan los proyectos anteriores.
- `pnpm lint` y `pnpm test` pasan sin añadir dependencias.
