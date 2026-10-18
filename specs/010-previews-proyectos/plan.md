# Plan 010 — Previews visuales de proyectos destacados

## Qué RF cubre cada parte

| Parte | RF |
| --- | --- |
| Fuentes de capturas | 1–3 |
| Claves de alt bilingües | 4 |
| Componente de proyectos y accesibilidad | 1–6 |
| Verificación y memoria | 1–6 |

## Archivos

**Nuevos**

- `public/img/projects/game-learning.png` — captura real proporcionada de Game Learning.

**Modificados**

- `public/i18n/es/app.json` — textos alternativos localizados.
- `public/i18n/en/app.json` — textos alternativos localizados.
- `src/components/projects/projects.tsx` — datos de preview y render de imágenes responsive.
- `MEMORY.md` — registrar la captura local y las dos URLs directas proporcionadas.

No se añaden dependencias ni archivos en la raíz.

## Decisiones

1. **Respetar las fuentes entregadas por el usuario.** Game Learning se guarda en `public/`
   porque fue adjuntada como archivo; las otras dos conservan sus URLs directas para evitar
   alterar o recomprimir las capturas proporcionadas. Alternativa descartada: usar imágenes
   de Open Graph o capturas genéricas, porque no representan la interfaz real.
2. **Usar dimensiones explícitas y `loading="lazy"`.** Reserva el espacio de cada tarjeta y
   limita el salto de layout. Alternativa descartada: omitir dimensiones o usar un iframe,
   porque empeora el rendimiento y la accesibilidad.
3. **Mantener el arreglo de proyectos con claves literales.** Evita romper el seguimiento de
   Qwik Speak. Alternativa descartada: construir claves dinámicas para `alt`.

## Estrategia de tests

- Parsear ambos JSON y verificar las tres claves `preview_alt`.
- Ejecutar `pnpm lint`.
- Ejecutar `pnpm test --test-isolation=none`; la presentación visual se comprueba con
  Chromium cuando el transporte esté disponible.
- Confirmar que la captura local existe, que las dos URLs directas corresponden a los recursos
  proporcionados y que el componente no usa iframes ni servicios de captura.

## Orden

1. Guardar la captura adjunta de Game Learning en `public/img/projects/` y registrar las dos
   URLs directas proporcionadas.
2. Añadir las claves de alt en es/en.
3. Integrar las imágenes en `projects.tsx` con dimensiones, `alt` y estilos responsive.
4. Verificar lint, tests, recursos y accesibilidad; actualizar `MEMORY.md`.
