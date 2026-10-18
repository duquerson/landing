# Spec 008 — Perfil profesional, experiencia y formación

**Estado: aprobada**

## Por qué

La sección actual presenta experiencia y estudios con datos que no corresponden a la
trayectoria proporcionada por el usuario. El portfolio debe describir el desarrollo desde
septiembre de 2025 como trabajo independiente basado en proyectos, no como empleo en una
empresa, y mostrar la formación indicada. La sección de habilidades debe ser coherente con
esa trayectoria y con las tecnologías verificables en el portfolio.

## Alcance

- Reemplazar las entradas de experiencia actuales por una experiencia independiente de
  frontend, iniciada en septiembre de 2025 y en curso.
- Añadir una subsección de Formación con el título de TSU en Informática, la institución y
  el periodo proporcionados.
- Omitir la entrada “Técnico en Computación” de la subsección de Formación.
- Actualizar las habilidades seleccionadas de la lista del usuario, respaldadas por su
  descripción de experiencia o por el stack y las prácticas verificables del portfolio.
- Localizar toda la interfaz y el contenido en español e inglés, manteniendo el formato de
  fechas según el idioma activo.

## Fuera de alcance

- Cambiar la navegación, las rutas o la estructura de idiomas.
- Añadir dependencias, frameworks de prueba o plataformas que no estén respaldados por el
  proyecto o la experiencia descrita.
- Mostrar “Técnico en Computación” como una entrada de Formación.
- Afirmar que la experiencia independiente corresponde a un puesto en una empresa.

## Requisitos (EARS)

### Experiencia

1. Cuando se presente la sección de trayectoria, el sistema DEBE describir el trabajo desde
   septiembre de 2025 como experiencia independiente y basada en proyectos personales.
2. Cuando se muestre esa experiencia, el sistema DEBE indicar que está en curso y mantener
   las tecnologías y proyectos indicados por el usuario: interfaces adaptables y
   aplicaciones con React, Astro, Vue, JavaScript y TypeScript; una plataforma interactiva
   para aprender JavaScript, un buscador de países conectado a una API y una aplicación de
   tareas; y trabajo en accesibilidad, pruebas y código mantenible.
3. Cuando se muestre el periodo de experiencia, el sistema DEBE formatear septiembre de
   2025 según el idioma activo mediante Qwik Speak y mostrar el indicador localizado de
   presente para la fecha final.

### Formación

4. Cuando se presente la formación, el sistema DEBE incluir “Técnico Superior Universitario
   en Informática”, “Instituto Universitario de la Frontera (IUFRONT)”, el periodo
   2008–2012 y la descripción de formación en tecnología informática y sistemas
   computacionales.
5. Cuando se presente la formación, el sistema DEBE omitir “Técnico en Computación” y su
   descripción de soporte técnico, hardware y mantenimiento.

### Habilidades e idioma

6. Cuando se muestre la sección de habilidades, el sistema DEBE incluir HTML5, CSS3,
   JavaScript, TypeScript, Qwik, React, Astro, Vue 3, Tailwind CSS, Flexbox, CSS Grid,
   enfoque mobile-first, HTML semántico, navegación por teclado, ARIA, movimiento reducido,
   APIs REST, SSR, Zod, separación por capas, mantenibilidad, reutilización de lógica,
   pruebas nativas `node:test` y Netlify.
7. El sistema DEBE omitir localStorage, Vitest, Playwright y Vercel porque su uso no está
   confirmado en la información recibida ni en el portfolio revisado.
8. Cuando el sitio se presente en español o inglés, el sistema DEBE traducir todos los
   títulos, descripciones y etiquetas visibles mediante Qwik Speak.

## Casos límite

- Si no se proporciona empresa, se debe identificar la experiencia como independiente y
  basada en proyectos, sin fabricar un empleador.
- La subsección de Formación debe contener únicamente el título universitario indicado y no
  conservar “Técnico en Computación”.
- Si cambia el idioma de la ruta, deben localizarse títulos, descripciones, habilidades y
  nombres de estado, y cambiar el formato del periodo fechado.
- En móvil, las entradas de experiencia y formación deben conservar texto legible sin
  desbordamiento horizontal.

## Criterios de finalización

- La experiencia antigua y sus fechas se sustituyen por la experiencia independiente desde
  septiembre de 2025.
- La formación muestra el TSU en Informática y omite Técnico en Computación.
- Las habilidades reflejan la lista acordada, con los elementos sin evidencia excluidos.
- Todas las nuevas cadenas visibles existen en es y en.
- `pnpm lint` y `pnpm test` pasan; no se añaden dependencias.
