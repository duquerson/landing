# Plan 009 — Pausa automática de la órbita al navegar con teclado

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Estado de foco y pausa efectiva de la escena | 1, 2, 4 |
| Conservación de movimiento reducido y ausencia de UI nueva | 3, 5 |

## Archivos

**Modificados**

- `src/components/hero/HeroOrbit.tsx` — pausar la animación mientras el foco está dentro de la escena y reanudarla al salir, sin perder una pausa manual.
- `MEMORY.MD` — registrar el comportamiento y la limitación de detección de lectores de pantalla.

## Decisiones

1. **Separar pausa por foco de pausa manual.** Al salir el foco, solo se libera la pausa automática; alternativa descartada: reutilizar una señal única, que podría cancelar una pausa manual.
2. **Usar eventos de foco en la escena y comprobar `relatedTarget` al salir.** Así el foco puede moverse entre descendientes sin reanudar prematuramente; alternativa descartada: reanudar en cada `focusout`.
3. **No cambiar los estilos `motion-reduce` ni agregar controles.** La preferencia del sistema sigue siendo la autoridad para movimiento reducido; alternativa descartada: forzar movimiento contra esa preferencia.

## Estrategia de tests

- `pnpm lint` para comprobar tipos.
- Verificar en Chromium con teclado que el foco de la escena pause el movimiento, que salir lo reanude, y que la pausa manual persista.
- Verificar que `prefers-reduced-motion` continúe dejando la animación desactivada.
- No añadir tests unitarios: el cambio consiste en estado/eventos de presentación de Qwik y se valida en navegador según la spec 007.

## Orden

1. Implementar la pausa automática por foco en `HeroOrbit.tsx` y mantener separada la pausa manual.
2. Ejecutar lint y verificación de interacción en Chromium.
3. Actualizar `MEMORY.MD` con el resultado verificado.
