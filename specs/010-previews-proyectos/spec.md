# Spec 010 — Previews visuales de proyectos destacados

**Estado: implementada y verificada**

## Por qué

Las tarjetas de proyectos solo muestran texto, tecnologías y enlaces. Una captura real de
cada aplicación ayudaría a reclutadores y clientes a reconocer rápidamente el resultado
visual de Game Learning, REST Countries y Todo App.

## Alcance

- Mostrar una imagen de preview en cada una de las tres tarjetas.
- Usar capturas reales de cada proyecto: la captura de Game Learning se almacena localmente y
  las capturas proporcionadas de REST Countries y Todo App se mantienen en sus URLs directas.
- Localizar el texto alternativo en español e inglés mediante Qwik Speak.
- Mantener enlaces, contenido, responsive y accesibilidad existentes.

## Fuera de alcance

- Cambiar las demos, repositorios, descripciones o tecnologías de los proyectos.
- Añadir iframes, dependencias, servicios de captura externos o lógica de carga dinámica.
- Crear capturas ficticias o imágenes genéricas que no representen los proyectos.

## Requisitos (EARS)

### Previews

1. Cuando se presente la sección de proyectos, el sistema DEBE mostrar una imagen de preview
   correspondiente a Game Learning, REST Countries y Todo App.
2. El sistema DEBE cargar cada imagen desde la fuente proporcionada por el usuario: recurso
   local para Game Learning y URL directa para REST Countries y Todo App.
3. Cada imagen DEBE conservar una relación visual uniforme, evitar el desplazamiento
   horizontal y adaptarse al ancho de su tarjeta.

### Accesibilidad e idioma

4. Cada imagen DEBE tener un texto alternativo descriptivo localizado en español e inglés
   mediante una clave literal de Qwik Speak.
5. Las imágenes DEBEN declarar dimensiones intrínsecas y carga diferida cuando no sean el
   contenido principal de la página.
6. La incorporación de imágenes NO DEBE eliminar el foco visible, el contraste ni los
   enlaces accesibles existentes.

## Casos límite

- Si una captura no está disponible, la implementación DEBE detenerse y solicitar el archivo
  real en lugar de sustituirlo por un placeholder engañoso.
- Si la imagen no puede cargarse, el texto alternativo debe seguir identificando el proyecto.
- En móvil, la preview no debe sobresalir de la tarjeta ni provocar scroll horizontal.

## Criterios de finalización

- Las tres tarjetas muestran previews reales de sus respectivos proyectos.
- Las imágenes son locales, tienen `alt` localizado, dimensiones y estilo responsive.
- `pnpm lint` y `pnpm test --test-isolation=none` pasan sin añadir dependencias.
- La memoria del proyecto registra las fuentes de las tres previews y que no se usan servicios
  de captura dinámicos.
