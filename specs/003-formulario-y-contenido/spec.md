# Spec 003 — Afinar el formulario y el contenido del sitio

**Estado: implementada**

## Por qué

La revisión de interfaz dejó cuatro cosas sin cerrar: el formulario solo muestra un banner
de error (no dice qué campo falló ni lleva el foco ahí), los mensajes de validación están
escritos en español dentro del schema y en el endpoint, el contenido de proyectos,
experiencia y habilidades está hardcodeado en los componentes y sus periodos son cadenas
fijas ("2024 - Presente"), y quedan detalles de tipografía y de interacción que la guía de
interfaz marca. El idioma del sitio ya se resuelve solo, pero el contenido visible sigue
siendo en un solo idioma.

## Alcance

- Errores de validación junto al campo, con foco en el primero que falla.
- Mensajes de validación traducidos; el endpoint deja de devolver prosa y devuelve campos.
- Contenido de proyectos, experiencia y habilidades desde las traducciones.
- Periodos de experiencia formateados con `Intl` en vez de cadenas fijas.
- Marcas con `translate="no"`, encabezados con `text-wrap: balance`, puntos suspensivos
  correctos y texts largos que no rompen el diseño.
- Higiene de interacción en `global.css`: `touch-action`, realce de toque, sin scroll
  horizontal.
- El año del footer sin riesgo de desajuste de hidratación.

## Fuera de alcance

- Envío real de correo, rate limit y descarga de CV (requiere dependencias y secretos).
- Adaptador de despliegue para Netlify (requiere dependencia).
- Consolidar la paleta Tailwind hardcodeada en tokens: es una decisión visual y las dos
  fuentes actuales no coinciden (`--color-accent` es `#3b82f6` y el código usa `blue-400`,
  `#60a5fa`).
- Selector manual de idioma: el idioma se detecta solo.

## Requisitos (EARS)

1. Cuando una validación falle, el sistema DEBE mostrar el error junto al campo que falló y
   mover el foco al primer campo con error.
2. Los mensajes de validación DEBEN salir de las traducciones, y el schema NO DEBE
   contener texto visible.
3. Cuando el endpoint rechace una petición, DEBE indicar qué campos fallaron sin incluir
   prosa en un idioma concreto.
4. Los textos de proyectos, experiencia y habilidades DEBEN obtenerse de las traducciones,
   no estar escritos en los componentes.
5. Cuando se muestre un periodo, el sistema DEBE formatearlo con la API de fechas del
   idioma activo en vez de una cadena fija.
6. Los nombres propios y las marcas DEBEN llevar `translate="no"`.
7. Cuando un texto sea largo, el sistema DEBE evitar que desborde su contenedor.
8. Los encabezados DEBEN usar `text-wrap: balance` y los puntos suspensivos DEBEN escribirse
   como `…`.
9. El sitio DEBE declarar `touch-action: manipulation`, el realce de toque de forma
   intencionada y no DEBE producir scroll horizontal.
10. El año del footer NO DEBE calcularse dentro del render del componente.

## Casos límite

- Envío con los tres campos inválidos a la vez: los tres muestran error y el foco va al
  primero.
- Envío válido: los errores previos desaparecen.
- El servidor devuelve campos que el cliente no conoce: se ignoran sin romper la vista.
- Una traducción que falte para un idioma: el sitio sigue renderizando.
- Etiqueta larga de habilidad o título largo de proyecto: no debe empujar la retícula.
- Viewport estrecho con el menú móvil abierto: sin scroll horizontal.

## Criterios de finalización

- `pnpm lint`, `pnpm test` y `pnpm build` en verde.
- Formulario verificado en navegador: error por campo, foco, envío válido e inválido.
- `/es/` y `/en/` con todo el contenido visible traducido.
- Sin scroll horizontal a 360 px de ancho.