import type { RequestHandler } from "@builder.io/qwik-city";
import { contactSchema, sendTelegramNotification } from "~/features/contact-form";

export const onPost: RequestHandler = async ({ request, json, env }) => {
	try {
		const body = await request.json();
		const result = contactSchema.safeParse(body);

		if (!result.success) {
			// Solo nombres de campos: el texto lo compone el cliente en su idioma.
			const fields = [...new Set(result.error.issues.map((issue) => String(issue.path[0] ?? "")))].filter(
				Boolean
			);

			json(400, { success: false, fields });
			return;
		}

		const botToken = env.get("TELEGRAM_BOT_TOKEN");
		const chatId = env.get("TELEGRAM_CHAT_ID");
		const credentialsMissing = !botToken?.trim() || !chatId?.trim();

		const telegramResult = await sendTelegramNotification(result.data, {
			botToken,
			chatId
		});

		if (!telegramResult.ok) {
			if (!credentialsMissing) {
				console.error(
					"[Contact] Telegram falló:",
					telegramResult.error,
					"| BOT_TOKEN definido:", !!botToken,
					"| CHAT_ID:", chatId
				);
			}
			json(500, { success: false });
			return;
		}

		json(200, { success: true });
	} catch {
		json(500, { success: false });
	}
};

export const onGet: RequestHandler = ({ redirect }) => {
	throw redirect(302, "/#contact");
};
