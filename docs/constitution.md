# Constitución — Portfolio duquerson

## Principios innegociables

1. **Stack mínimo**: Qwik v1 + Qwik Speak + Tailwind 4 + Zod + TypeScript + pnpm. Sin dependencias adicionales sin aprobación explícita.
2. **Spec primero**: Todo cambio >1 archivo requiere spec en `specs/`. El código debe cubrir 100% de los RF definidos.
3. **Lógica separada**: Lógica de negocio en funciones puras con parámetros explícitos. Sin efectos secundarios en componentes.
4. **Tests sin deps**: Tests con `node --test` nativo. Sin frameworks de testing que requieran instalación.
5. **Datos protegidos**: Claves, tokens y datos personales solo en servidor. Nunca en cliente ni en el repo.
6. **Idioma consistente**: Código en inglés, comentarios en español, todo texto visible vía Qwik Speak (es/en).

## Gobernanza operativa

Para detalles sobre stack, comandos, convenciones y flujo de trabajo, ver [`AGENTS.md`](../AGENTS.md).
