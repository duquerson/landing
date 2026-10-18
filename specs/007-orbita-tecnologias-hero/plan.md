# Plan 007 — Órbita accesible de tecnologías para el hero

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Composición responsive y preservación del contenido del hero | 1–3 |
| Foto central, recursos locales y órbitas visuales | 4–10 |
| Control de movimiento, reducción de movimiento, idioma y accesibilidad | 11–16 |

## Archivos

**Nuevos**

- `src/components/hero/HeroOrbit.tsx` — Componente Qwik v1 para la foto central, las dos órbitas, las máscaras de logotipo y el control de movimiento.
- `public/icons/devicon/original.svg` — Subconjunto local de Devicon, más el símbolo Hono de Simple Icons, conservando colores de marca.
- `public/icons/devicon/LICENSES.md` — Atribución y licencias de Devicon, Simple Icons y sus recursos.

**Modificados**

- `src/components/hero/hero.tsx` — Conservar texto, etiquetas y enlaces tal como están; componer una grilla de texto a la izquierda y `HeroOrbit` a la derecha, con orden apilado en móvil.
- `src/app/styles/global.css` — Agregar a `@theme` los tokens semánticos de color de órbita y las animaciones de 24s y 36s, manteniendo la paleta derivada de los tokens existentes.
- `package.json` y `pnpm-lock.yaml` — Añadir la dependencia `@devicons-pack/sprite`, aprobada por el usuario, para tomar el sprite oficial.
- `public/i18n/es/app.json` — Añadir texto alternativo del retrato, nombre accesible del grupo y etiquetas localizadas para pausar/reanudar.
- `public/i18n/en/app.json` — Añadir las mismas claves accesibles en inglés.

No se modifican rutas ni se agregan archivos de pruebas.

## Decisiones

1. **Usar `public/Hero-img.png` como imagen central.** La imagen existe y es el retrato indicado; `public/img/avatar.webp` no existe y su uso produciría una ruta rota. Alternativa descartada: apuntar al recurso inexistente o reemplazar la foto aprobada.
2. **Usar `@devicons-pack/sprite` en su variante `original` y servir el sprite localmente; añadir el símbolo Hono desde Simple Icons porque Devicon 2.1.0 no lo incluye.** `<use>` conserva el color de marca y las clases Tailwind controlan tamaño y hover; no se realizan peticiones a CDN en producción ni se añade otra dependencia. Alternativa descartada: sustituir Hono por otro framework, recolorear una máscara monocroma o cargar recursos remotos.
3. **Separar la órbita en `HeroOrbit.tsx` y mantener el texto existente en el componente del hero.** Esto limita el cambio al área visual y evita reescribir contenido que el usuario quiere conservar. Alternativa descartada: mezclar toda la lógica y los logos dentro del contenido textual actual.
4. **Definir el resplandor y las velocidades como tokens del tema, y radios seguros con unidades de contenedor.** Las animaciones usan 24s/36s y radios 35cqw/42cqw para separar mejor los iconos interiores de la imagen; las utilidades `motion-reduce` desactivan el movimiento automático. Alternativa descartada: temporizadores JavaScript, otra librería de animación, radios que oculten la foto o colores repetidos en línea.
5. **Mantener un control único con nombre accesible que alterna pausa/reanudación y localizarlo junto con el alt del retrato en Qwik Speak.** El control es operable por teclado, tiene área táctil suficiente y se oculta si `prefers-reduced-motion` deja las órbitas estáticas, para no ofrecer una acción sin efecto. Alternativa descartada: movimiento indefinido sin control, etiquetas hardcodeadas o controles visibles que no puedan reanudar la animación.
6. **Respetar la ruta y capitalización exactas `src/components/hero/HeroOrbit.tsx` pedidas por el usuario.** Aunque la convención general del repositorio prefiere nombres de componente en minúsculas, esta decisión satisface el nombre explícito solicitado. Alternativa descartada: cambiarlo silenciosamente a `hero-orbit.tsx`.
7. **Activar el giro de los logotipos al entrar el puntero en la foto y conservarlo mientras permanezca dentro de la escena; al pasar sobre cada insignia, ampliarla un 5% y cambiar su fondo al token de fondo de página.** El estado se limpia al salir de la escena completa y respeta movimiento reducido. Alternativa descartada: detener el giro al abandonar el área de cada icono o dejar una animación de hover activa permanentemente.

## Estrategia de tests

- No se agregan tests `node --test`: este cambio es de presentación y no incorpora lógica de negocio pura independiente.
- Verificar estáticamente con `pnpm lint` y `pnpm build` durante la implementación; no se ejecutan comandos en esta fase de planificación.
- Revisar el resultado en navegador con DevTools en español e inglés, escritorio y móvil (incluidos 320 px), comprobando el orden de composición, los recursos SVG locales, la carga de `Hero-img.png`, el foco del control y los textos accesibles.
- Activar `prefers-reduced-motion` y comprobar que no hay animación de órbitas ni hover; con movimiento permitido, comprobar pausa/reanudación, giro activado desde la foto, persistencia hasta salir de la escena y crecimiento individual de logotipos.

## Orden

1. Instalar `@devicons-pack/sprite`, extraer a `public/icons/devicon/original.svg` un subconjunto con los doce símbolos, conservar su licencia, y preparar tokens de tema y claves es/en para alt, grupo y control.
2. Crear/ajustar `HeroOrbit.tsx` con la foto central como sol, los doce símbolos en dos órbitas, radios y duraciones indicados, colores originales y tamaños Tailwind.
3. Integrar `HeroOrbit` en `hero.tsx` con grilla responsive, conservando exactamente el contenido y los destinos actuales.
4. Verificar compilación, ambos idiomas, vista móvil/escritorio, teclado, pausa/reanudación y movimiento reducido.
