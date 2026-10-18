# Spec 007 — Órbita de tecnologías accesible para el hero

**Estado: aprobada, alcance visual actualizado por el usuario**

## Por qué

El hero actual presenta el contenido textual sin una representación visual de las tecnologías. Una órbita con la fotografía existente y los logotipos solicitados puede aportar ese contexto sin alterar el mensaje ni perjudicar la lectura en móvil. Como las órbitas se mueven de forma continua, la experiencia también debe permitir pausarlas y respetar la preferencia de movimiento reducido.

## Alcance

- Incorporar una composición visual de texto y órbita, manteniendo intactos los textos y enlaces actuales.
- Mostrar la fotografía del usuario como el sol central, con bordes difuminados, y doce logotipos a su alrededor en dos órbitas planetarias.
- Usar los logotipos oficiales en sus colores originales y alojar el sprite dentro del proyecto.
- Ajustar la composición para pantallas estrechas y anchas.
- Permitir pausar y reanudar la animación y respetar la preferencia de movimiento reducido.
- Proporcionar texto alternativo y etiquetas accesibles localizadas en español e inglés.

## Fuera de alcance

- Cambiar el contenido, las llamadas a la acción o los destinos actuales del hero.
- Añadir tecnologías distintas de Hono.js, JavaScript, CSS, Tailwind CSS, Node.js, HTML5, Qwik, Astro, Vue, Next.js, Nuxt.js y React.
- Cargar iconos o sprites desde un servicio remoto en tiempo de ejecución.
- Cambiar el sistema de rutas o agregar un selector de idioma.

## Requisitos (EARS)

### Composición y contenido

1. Cuando el hero se presente en una pantalla ancha, el sistema DEBE ubicar el contenido textual a la izquierda y la órbita a la derecha.
2. Cuando el hero se presente en una pantalla estrecha, el sistema DEBE ubicar la órbita debajo del contenido textual.
3. Cuando se incorpore la órbita, el sistema DEBE conservar sin cambios los textos, etiquetas y destinos de los enlaces actuales del hero.
4. Cuando se muestre la órbita, el sistema DEBE presentar la fotografía existente como núcleo central del sistema planetario, con un borde de transición difuminado.
5. Cuando se muestre la fotografía, el sistema DEBE proporcionar una descripción alternativa localizada en el idioma activo.

### Tecnologías y movimiento

6. Cuando se muestre la órbita interior, el sistema DEBE presentar los logotipos de Hono.js, JavaScript, CSS, Tailwind CSS, Node.js y HTML5.
7. Cuando se muestre la órbita exterior, el sistema DEBE presentar los logotipos de Qwik, Astro, Vue, Next.js, Nuxt.js y React.
8. Cuando se muestre cada logotipo, el sistema DEBE conservar sus colores originales y permitir ajustar su tamaño con clases Tailwind.
9. Mientras la animación esté activa, el sistema DEBE completar una rotación de la órbita interior cada 24 segundos y mantener su radio en 35cqw, con separación visible respecto de la imagen.
10. Mientras la animación esté activa, el sistema DEBE completar una rotación de la órbita exterior cada 36 segundos y mantener su radio en 42cqw.
11. Cuando el visitante active el control de pausa, el sistema DEBE detener ambas órbitas.
12. Cuando el visitante active el control de reanudación, el sistema DEBE reanudar ambas órbitas.
13. Mientras el sistema indique preferencia por movimiento reducido, el sistema DEBE mantener estáticas ambas órbitas y desactivar las animaciones de hover.

### Idioma y accesibilidad

14. Cuando el sitio se presente en español o inglés, el sistema DEBE localizar en ese idioma el nombre accesible del conjunto de tecnologías.
15. Cuando el control cambie entre pausa y reanudación, el sistema DEBE presentar su nombre accesible localizado según la acción disponible.
16. Cuando el visitante use teclado, el sistema DEBE permitir alcanzar y activar el control de movimiento.

### Interacción con puntero

17. Cuando el puntero entre en la fotografía central, el sistema DEBE iniciar la rotación sobre sí mismos de los logotipos y mantenerla hasta que el puntero salga de toda la escena orbital.
18. Cuando el puntero pase sobre un logotipo, el sistema DEBE aumentar la insignia un 5% y cambiar su fondo al token de fondo de la página mientras dure el hover.

## Casos límite

- En una pantalla estrecha de 320 px, el texto debe preceder a la órbita y no debe aparecer desplazamiento horizontal.
- Los seis iconos de cada órbita deben mantener separación suficiente para no tapar la foto central ni salirse del contenedor; el radio interior de 35cqw debe dejar más espacio visible entre los iconos y la imagen.
- La fotografía tiene una proporción horizontal; al ajustarla al centro de la órbita, su recorte no debe eliminar el retrato ni ocultar todo el contenido bajo la máscara.
- El cambio repetido entre pausa y reanudación debe afectar a ambas órbitas y actualizar el nombre accesible del control.
- Si se activa movimiento reducido antes de cargar el hero o mientras está abierto, ambas órbitas deben permanecer estáticas.
- Al cambiar entre español e inglés, deben cambiar la descripción alternativa, el nombre accesible del grupo y la etiqueta del control.
- Los logotipos deben conservar sus colores originales y un tamaño legible en móvil y escritorio.
- El foco del control debe seguir visible y poder operarse mediante teclado.
- Al pasar el puntero sobre la foto, los logotipos giran sobre sí mismos; continúan girando al mover el puntero por la escena y se detienen al salir de ella.
- Al pasar el puntero sobre un logotipo, su insignia crece un 5% y adopta el fondo de página sin desplazar su órbita.

## Criterios de finalización

- En escritorio se ve el texto a la izquierda y la órbita a la derecha; en móvil, la órbita queda debajo del texto sin desbordamiento horizontal.
- Los textos y destinos del hero original se mantienen intactos.
- La fotografía aparece centrada con máscara difuminada y texto alternativo en ambos idiomas.
- Las dos órbitas contienen los doce logotipos especificados en colores originales y usan, respectivamente, radios de 35cqw y 42cqw y duraciones de 24s y 36s.
- Un control accesible pausa y reanuda las dos órbitas; el control y las etiquetas accesibles están localizados en es/en.
- La preferencia de movimiento reducido desactiva la rotación continua y las animaciones de hover.
