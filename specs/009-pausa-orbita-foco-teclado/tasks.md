# Tareas 009 — Pausa automática de la órbita al navegar con teclado

## T1 — Pausar la órbita mientras tiene foco de teclado

**RF**: 1, 2, 3, 4, 5

Separar el estado de pausa automática por foco del estado de pausa manual. Pausar al entrar el foco, mantener la pausa durante movimientos de foco internos y liberar solo la pausa automática al salir de la escena. Conservar `prefers-reduced-motion` y no añadir controles visibles.

**Hecho cuando**: `pnpm lint` pasa y la comprobación de navegador confirma pausa por foco, reanudación al salir, persistencia de pausa manual y respeto por movimiento reducido.

## T2 — Registrar el comportamiento verificado

**RF**: 1, 2, 3, 4, 5

Actualizar la memoria del proyecto con el comportamiento final y las limitaciones de detección de lectores de pantalla.

**Hecho cuando**: `MEMORY.MD` refleja el comportamiento y el resultado de las verificaciones realizadas.
