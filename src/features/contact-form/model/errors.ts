/**
 * Une la traducción de los mensajes de validación con los errores de Zod.
 * El schema no lleva texto, así que este archivo es el único sitio donde se decide
 * qué clave traducible corresponde a qué campo.
 *
 * `buildErrorCatalog` recibe los mensajes ya traducidos y devuelve un objeto plano:
 * los manejadores `$()` solo capturan cadenas serializables, nunca el traductor.
 */
/** Catálogo de mensajes ya traducidos, indexado por clave. */
export type FieldErrorMessages = Readonly<Record<string, string>>;

/** Textos localizados del formulario, resueltos con claves estáticas de Qwik Speak. */
export type ContactErrorTranslations = {
  name: { min: string; required: string; generic: string };
  email: { format: string; required: string; generic: string };
  message: { min: string; required: string; generic: string };
};

/** Clave usada cuando no hay un mensaje específico para el campo. */
export const FALLBACK_ERROR_KEY = "contact.error";

/** Campos del formulario, en el orden en que se revisan. */
export const CONTACT_FIELDS = ["name", "email", "message"] as const;

/**
 * Construye el catálogo desde mensajes ya traducidos, fuera de cualquier manejador.
 */
export function buildErrorCatalog(
  fallback: string,
  translations: ContactErrorTranslations
): FieldErrorMessages {
  return {
    [FALLBACK_ERROR_KEY]: fallback,
    "contact.errors.name.min": translations.name.min,
    "contact.errors.name.required": translations.name.required,
    "contact.errors.name.generic": translations.name.generic,
    "contact.errors.email.format": translations.email.format,
    "contact.errors.email.required": translations.email.required,
    "contact.errors.email.generic": translations.email.generic,
    "contact.errors.message.min": translations.message.min,
    "contact.errors.message.required": translations.message.required,
    "contact.errors.message.generic": translations.message.generic
  };
}

function resolveMessage(
  messages: FieldErrorMessages,
  field: string,
  reason: string
): string | undefined {
  return (
    messages[`contact.errors.${field}.${reason}`] ??
    messages[`contact.errors.${field}.generic`] ??
    messages[FALLBACK_ERROR_KEY]
  );
}

/**
 * Devuelve los mensajes por campo ya traducidos.
 * Un campo con más de un problema muestra solo el primero: el usuario lo corrige y vuelve a ver el siguiente.
 */
export function buildFieldErrors(
  issues: readonly { path: readonly PropertyKey[]; code: string }[],
  messages: FieldErrorMessages
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    const field = String(issue.path[0] ?? "");

    if (!(CONTACT_FIELDS as readonly string[]).includes(field) || errors[field]) {
      continue;
    }

    const reason =
      issue.code === "too_small"
        ? "min"
        : issue.code === "invalid_string"
          ? "format"
          : issue.code === "invalid_type"
            ? "required"
            : "generic";

    const message = resolveMessage(messages, field, reason);

    if (message) {
      errors[field] = message;
    }
  }

  return errors;
}

/**
 * Traduce los campos fallidos que devuelve el endpoint, que no incluye texto.
 * Un campo desconocido se ignora en vez de romper la vista.
 */
export function buildServerFieldErrors(
  fields: readonly string[],
  messages: FieldErrorMessages
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    if (!(CONTACT_FIELDS as readonly string[]).includes(field) || field in errors) {
      continue;
    }

    const message = resolveMessage(messages, field, "generic");

    if (message) {
      errors[field] = message;
    }
  }

  return errors;
}
