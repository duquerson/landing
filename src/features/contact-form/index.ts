/**
 * API pública de la unidad. Nadie importa archivos internos de aquí:
 * siempre se entra por `~/features/contact-form`.
 */
export { ContactForm } from "./ui/contact-form";
export { contactSchema, contactFields } from "./model/schema";
export type { ContactPayload } from "./model/schema";
export { buildFieldErrors, buildServerFieldErrors } from "./model/errors";
export { sendTelegramNotification } from "./server/telegram";
export type { TelegramConfig, TelegramResult } from "./server/telegram";