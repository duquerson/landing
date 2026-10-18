# Spec 010 — Convención Better Commits con Gitmoji

**Estado: borrador**

## Por qué

El proyecto no documenta una convención para mensajes de commit. Un formato consistente con Gitmoji y tipos de Conventional Commits facilita reconocer el propósito y el alcance de cada cambio en el historial.

## Alcance

- Documentar en `AGENTS.md` el formato de los mensajes de commit.
- Definir reglas breves para tipo, scope, asunto, cuerpo y cambios incompatibles.
- Incluir una tabla de tipos con Gitmoji y ejemplos.

## Fuera de alcance

- Instalar dependencias, CLI, hooks o validadores automáticos.
- Crear commits, inicializar el historial o cambiar la configuración de Git.
- Reescribir o modificar mensajes de commits existentes.

## Requisitos (EARS)

### Mensajes de commit

1. Cuando una persona documente un cambio en un commit, el sistema DEBE recomendar el formato `<gitmoji> <tipo>(<scope>): <asunto>`.
2. Cuando se cree un mensaje de commit, el sistema DEBE usar un Gitmoji coherente con el tipo de cambio.
3. Cuando el cambio tenga un alcance identificable, el mensaje de commit DEBE incluir un scope breve.
4. Cuando el asunto describa el cambio, el mensaje DEBE ser conciso, comenzar con minúscula y omitir el punto final.
5. Cuando el commit requiera contexto adicional o introduzca un cambio incompatible, el mensaje DEBE documentarlo en el cuerpo o pie correspondiente.

### Límites

6. Al documentar la convención, el sistema NO DEBE añadir herramientas, dependencias, hooks ni crear commits.

## Casos límite

- Si el cambio abarca áreas distintas sin un scope claro, se permite omitir el scope.
- Para revertir, usar el tipo `revert` y explicar el commit revertido.
- Para cambios incompatibles, indicar `!` en el encabezado y añadir un pie `BREAKING CHANGE:`.

## Criterios de finalización

- `AGENTS.md` contiene la convención, tipos/Gitmoji y ejemplos.
- No se agregan dependencias ni configuración automática de Git.
- No se crea ningún commit ni se alteran archivos existentes del área de staging.
