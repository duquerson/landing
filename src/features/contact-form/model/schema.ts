import { z } from "zod";

/**
 * Fuente única de la validación del formulario: la usan el componente del cliente
 * y el endpoint. Solo reglas, sin texto: los mensajes salen de las traducciones.
 */
export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const contactFields = Object.keys(contactSchema.shape) as [
  "name",
  "email",
  "message"
];