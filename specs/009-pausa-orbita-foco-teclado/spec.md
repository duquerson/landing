# Spec 009 — Pausa automática de la órbita al navegar con teclado

**Estado: implementada y verificada**

## Por qué

La órbita puede moverse mientras una persona navega con teclado. El navegador no ofrece una forma fiable de detectar si un lector de pantalla está leyendo, por lo que se usará el foco de teclado como señal observable para pausar el movimiento sin añadir controles visibles.

## Alcance

- Pausar automáticamente las animaciones de la escena orbital cuando el foco de teclado entra en ella.
- Reanudar la animación automática al salir el foco de teclado de la escena.
- Mantener la pausa manual existente y la preferencia del sistema por movimiento reducido.

## Fuera de alcance

- Detectar lectores de pantalla o inferir que están leyendo.
- Añadir controles visibles o cambiar las etiquetas del control de pausa existente.
- Anular `prefers-reduced-motion`.
- Cambiar las animaciones, textos o disposición visual del hero.

## Requisitos (EARS)

### Navegación y movimiento

1. Cuando la navegación por teclado lleve el foco a la escena orbital, el sistema DEBE pausar automáticamente sus animaciones.
2. Cuando la navegación por teclado saque el foco de la escena orbital, el sistema DEBE reanudar las animaciones que no estén pausadas manualmente.
3. Mientras el sistema indique preferencia por movimiento reducido, el sistema DEBE mantener desactivadas las animaciones, aunque el puntero pase sobre la escena.
4. Cuando el visitante pause manualmente las órbitas, el sistema DEBE mantenerlas pausadas después de que el foco de teclado salga de la escena.
5. Cuando la escena se pause automáticamente por foco de teclado, el sistema NO DEBE mostrar controles ni indicadores visuales nuevos.

## Casos límite

- Al mover el foco entre elementos dentro de la escena, la animación debe permanecer pausada.
- Si el visitante activa la pausa manual mientras la escena ya está pausada por foco, al salir el foco la animación debe seguir pausada.
- Al entrar o salir el foco mientras `prefers-reduced-motion: reduce` está activo, las animaciones deben permanecer desactivadas.
- El foco virtual de lectores de pantalla puede no generar foco DOM; no se afirmará ni intentará detectar esa modalidad.

## Criterios de finalización

- El teclado pausa la escena al llevar el foco a ella y permite reanudar el movimiento al salir, siempre que no exista pausa manual ni preferencia de movimiento reducido.
- El control manual existente conserva su comportamiento y la preferencia `prefers-reduced-motion` sigue desactivando órbitas y hover.
- No se añaden controles ni indicadores visuales.
