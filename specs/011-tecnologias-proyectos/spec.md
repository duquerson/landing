# Spec 011 — Tecnologías verificadas de proyectos destacados

**Estado: implementada y verificada**

## Por qué

Las etiquetas actuales de las tarjetas se heredaron de la descripción inicial y no reflejan
completamente las tecnologías declaradas por cada repositorio. Las tarjetas deben presentar
un stack verificable y diferente para cada proyecto.

## Alcance

- Revisar el README y `package.json` disponibles de Game Learning, REST Countries y Todo App.
- Reemplazar las etiquetas de cada tarjeta por tecnologías realmente usadas en ese repositorio.
- Mantener los nombres de proyectos, descripciones, previews, enlaces y orden actuales.
- Mantener las etiquetas como nombres propios sin traducción accidental, con catálogos es/en.

## Fuera de alcance

- Cambiar código de los repositorios externos o sus URLs.
- Añadir tecnologías inferidas que no aparezcan en la documentación o dependencias revisadas.
- Añadir dependencias al portfolio o cambiar el stack Qwik del portfolio.

## Requisitos (EARS)

1. Cuando se presente Game Learning, el sistema DEBE mostrar únicamente etiquetas respaldadas
   por su repositorio, incluyendo su framework, librería de componentes/estado, estilos,
   servicios y herramientas de pruebas relevantes.
2. Cuando se presente REST Countries, el sistema DEBE mostrar únicamente etiquetas respaldadas
   por su repositorio, incluyendo su framework, librería de componentes, estilos, validación,
   consumo de API y renderizado relevantes.
3. Cuando se presente Todo App, el sistema DEBE mostrar únicamente etiquetas respaldadas por
   su repositorio, incluyendo su librería de interfaz, build tool, estilos, validación y
   reordenamiento relevantes.
4. Cuando se presente el sitio en español o inglés, las etiquetas DEBEN salir de claves
   literales de Qwik Speak y conservar nombres propios de tecnologías.
5. El sistema DEBE conservar las previews, enlaces, descripciones y accesibilidad existentes.

## Casos límite

- Las tecnologías compartidas pueden aparecer en más de una tarjeta si están verificadas en
  cada repositorio.
- Herramientas de despliegue o pruebas solo se incluyen cuando están declaradas por el repo y
  aportan contexto útil al proyecto.
- El cambio de idioma no debe traducir marcas como Astro, Vue, Supabase, React o Vite.

## Criterios de finalización

- Cada tarjeta tiene un conjunto de etiquetas verificable y específico de su repositorio.
- Los catálogos es/en contienen las mismas tecnologías con localización solo de términos
  descriptivos cuando sea necesario.
- `pnpm lint` y `pnpm test --test-isolation=none` pasan sin añadir dependencias.
