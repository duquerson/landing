import type { ContactPayload } from "../model/schema";

export interface TelegramConfig {
	botToken?: string;
	chatId?: string;
}

export interface TelegramResult {
	ok: boolean;
	error?: string;
}

/**
 * Sanea caracteres especiales de HTML para evitar errores de parseo en Telegram.
 */
export function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/**
 * Genera una notificación con estructura de correo y marcado HTML para Telegram.
 */
export function formatTelegramMessage(payload: ContactPayload): string {
	const safeName = escapeHtml(payload.name.trim());
	const safeEmail = escapeHtml(payload.email.trim());
	const safeMessage = escapeHtml(payload.message);

	return [
		"<b>Asunto:</b> Nuevo mensaje de contacto — duquerson.dev",
		"",
		"Hola Yeferson,",
		"",
		`<b>De:</b> ${safeName} &lt;${safeEmail}&gt;`,
		"",
		"<b>Mensaje:</b>",
		safeMessage,
		"",
		"Saludos cordiales,",
		"Formulario de contacto",
		"",
		"<b>Origen:</b> duquerson.dev"
	].join("\n");
}

/**
 * Despacha la notificación a la API de Telegram o devuelve un fallo controlado si faltan credenciales.
 */
export async function sendTelegramNotification(
	payload: ContactPayload,
	config: TelegramConfig,
	fetchFn: typeof fetch = fetch
): Promise<TelegramResult> {
	const botToken = config.botToken?.trim();
	const chatId = config.chatId?.trim();

	if (!botToken || !chatId) {
		console.error("[Telegram] No se pudo establecer la conexión para enviar la notificación.");
		return { ok: false };
	}

	const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
	const messageText = formatTelegramMessage(payload);

	try {
		const response = await fetchFn(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: messageText,
				parse_mode: "HTML"
			})
		});

		if (response.ok) {
			return { ok: true };
		}

		console.error(`[Telegram] Error al enviar mensaje: HTTP ${response.status}`);
		return { ok: false, error: `HTTP ${response.status}` };
	} catch (err) {
		console.error("[Telegram] Error de red al conectar con Telegram API:", err);
		return { ok: false, error: "Network error" };
	}
}
