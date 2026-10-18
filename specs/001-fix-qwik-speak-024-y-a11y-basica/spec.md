# Spec 001 — Restaurar i18n (Qwik Speak 0.24) y bases de accesibilidad

**Estado: implementada y verificada**

## Por qué

El sitio está escrito contra una API de Qwik Speak que ya no existe en la versión instalada: hoy no se renderiza ninguna traducción (el usuario ve claves como `hero.title`) y el chequeo de tipos está en rojo. Además, la navegación desaparece por debajo de 768 px, no hay forma de saltar al contenido principal, las anclas quedan ocultas bajo la cabecera fija y los mensajes de resultado del formulario no se anuncian. Los dos bloques de esta spec son los que impiden usar el sitio y cumplir WCAG 2.2 AA; el resto de hallazgos de la revisión de interfaz quedan fuera de alcance.

## Alcance

- Hacer que las traducciones es/en se carguen y se muestren.
- Dejar el chequeo de tipos en verde.
- Navegación por teclado completa, también en móvil.
- Skip link al contenido principal.
- Anclas que no queden ocultas bajo la cabecera fija.
- Anuncio de los mensajes de éxito y error del formulario.

## Fuera de alcance

- Autocomplete, errores inline por campo, spinner y `aria-busy` del formulario.
- Traducir los datos de proyectos, experiencia y habilidades.
- Fechas con `Intl.DateTimeFormat`.
- Consolidar los tokens de color y tipografía (depende de `DESIGN.md`).
- Selector manual de idioma: el idioma se resuelve por `Accept-Language`.
- Rate limit, honeypot y envío real del correo.

## Requisitos (EARS)

### i18n

1. Cuando se renderiza la aplicación, el sistema DEBE proporcionar el contexto de traducción con la configuración de idiomas y la función de carga de traducciones.
2. El sistema DEBE obtener las traducciones del idioma activo desde los archivos de traducción del proyecto.
3. Todo componente que muestre texto traducible DEBE usar la función de traducción vigente de la librería.
4. Cuando se compila el proyecto, el sistema DEBE incluir las traducciones de cada idioma en los chunks que se envían al navegador.
5. Cuando llega una petición, el sistema DEBE resolver el idioma desde la cabecera `Accept-Language` del navegador, y DEBE usar el idioma por defecto cuando la cabecera no declare un idioma admitido.
6. Cuando se renderiza el documento en el servidor, el sistema DEBE declarar el idioma activo en el atributo `lang` del elemento raíz y DEBE servir los chunks desde la ruta base correspondiente a ese idioma.
7. Cuando se ejecuta el chequeo de tipos, el sistema NO DEBE emitir errores.
8. Cuando se carga la portada, todo el texto visible DEBE mostrarse en español o en inglés según el idioma resuelto, y NO DEBE mostrarse ninguna clave de traducción sin traducir.

### Accesibilidad

9. Cuando se carga cualquier página, el sistema DEBE ofrecer un enlace de salto traducible como primer elemento enfocable que lleve al contenido principal, y el contenido principal DEBE poder recibir foco programáticamente.
10. En viewports de menos de 768 px de ancho, la navegación DEBE seguir siendo alcanzable por teclado y por technology asistiva, y su control DEBE comunicar si está abierto o cerrado.
11. Cuando se navega a una sección por su ancla, el encabezado de la sección NO DEBE quedar oculto bajo la cabecera fija.
12. Cuando el formulario de contacto muestra un mensaje de éxito o de error, ese mensaje DEBE ser anunciado por los lectores de pantalla sin que el usuario tenga que buscarlo.
13. El documento DEBE declarar un color de tema coherente con el fondo de la página y el metadato `viewport` DEBE aparecer una sola vez.
14. Los textos nuevos introducidos por esta spec DEBE existir en los archivos de traducción de español e inglés.

## Casos límite

- Cabecera `Accept-Language` ausente, vacía, con región desconocida (`es-MX`), con varios idiomas o con coeficientes de calidad.
- Cambio de `Accept-Language` entre peticiones: no debe quedar estado en el cliente.
- Traducción ausente para una clave en el idioma no por defecto: se debe usar el idioma por defecto sin romper el render.
- Navegación móvil abierta y el usuario pulsa `Escape`, pulsa un enlace o cambia el tamaño de la ventana a escritorio.
- El mensaje de éxito y el de error pueden aparecer y desaparecer varias veces seguidas en el mismo envío.
- Anclas a la primera sección (`#hero`), que queda justo debajo de la cabecera.

## Criterios de finalización

- Chequeo de tipos sin errores.
- Tests en verde.
- Portada verificada en español e inglés, en escritorio y en móvil.
- Recorrido de teclado completo: skip link, navegación, formulario.