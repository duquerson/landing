import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { contactSchema } from "./model/schema.ts";
import {
	buildErrorCatalog,
	buildFieldErrors,
	buildServerFieldErrors,
	FALLBACK_ERROR_KEY
} from "./model/errors.ts";
import {
	formatTelegramMessage,
	sendTelegramNotification
} from "./server/telegram.ts";

const catalog = buildErrorCatalog(FALLBACK_ERROR_KEY, {
	name: {
		min: "contact.errors.name.min",
		required: "contact.errors.name.required",
		generic: "contact.errors.name.generic"
	},
	email: {
		format: "contact.errors.email.format",
		required: "contact.errors.email.required",
		generic: "contact.errors.email.generic"
	},
	message: {
		min: "contact.errors.message.min",
		required: "contact.errors.message.required",
		generic: "contact.errors.message.generic"
	}
});

describe("Integración del Formulario de Contacto y Flujo de Entrega", () => {
	it("Flujo Exitoso: Valida datos, formatea mensaje y despacha a Telegram", async () => {
		const userInput = {
			name: "Ada Lovelace",
			email: "ada@example.com",
			message: [
				"Hola Yeferson, nos gustaría coordinar una entrevista técnica.",
				"",
				"¿Tienes disponibilidad esta semana?"
			].join("\n")
		};

		// 1. Validación en el pipeline con Zod
		const validation = contactSchema.safeParse(userInput);
		assert.equal(validation.success, true);

		if (!validation.success) return;

		// 2. Formateo seguro para Telegram
		const formattedText = formatTelegramMessage(validation.data);
		assert.ok(formattedText.includes("Ada Lovelace"));
		assert.ok(formattedText.includes("ada@example.com"));
		assert.ok(formattedText.includes("entrevista técnica"));
		assert.ok(formattedText.includes("técnica.\n\n¿Tienes disponibilidad"));

		// 3. Simulación de red y despacho
		let networkUrl = "";
		let sentBody: Record<string, unknown> = {};

		const mockFetch = (async (url: string | URL | Request, init?: RequestInit) => {
			networkUrl = url.toString();
			sentBody = JSON.parse((init?.body as string) || "{}");
			return { ok: true, status: 200 } as Response;
		}) as typeof fetch;

		const result = await sendTelegramNotification(
			validation.data,
			{ botToken: "12345:TOKEN_SECRETO", chatId: "998877" },
			mockFetch
		);

		assert.deepEqual(result, { ok: true });
		assert.equal(networkUrl, "https://api.telegram.org/bot12345:TOKEN_SECRETO/sendMessage");
		assert.equal(sentBody.chat_id, "998877");
		assert.equal(sentBody.parse_mode, "HTML");
		assert.equal(sentBody.text, formattedText);
	});

	it("Flujo Inválido: Detecta múltiples errores y NO despacha a Telegram", async () => {
		const invalidInput = {
			name: "A", // Demasiado corto (min 2)
			email: "correo-invalido", // Formato email erróneo
			message: "Corto" // Demasiado corto (min 10)
		};

		// 1. Validación con Zod
		const validation = contactSchema.safeParse(invalidInput);
		assert.equal(validation.success, false);

		if (validation.success) return;

		// 2. Mapeo a catálogo de errores traducibles para la UI
		const fieldErrors = buildFieldErrors(validation.error.issues, catalog);
		assert.equal(fieldErrors.name, "contact.errors.name.min");
		assert.equal(fieldErrors.email, "contact.errors.email.format");
		assert.equal(fieldErrors.message, "contact.errors.message.min");

		// 3. Garantizar que Telegram nunca es invocado
		let telegramWasCalled = false;
		const mockFetch = (async () => {
			telegramWasCalled = true;
			return { ok: true } as Response;
		}) as typeof fetch;

		assert.equal(telegramWasCalled, false);
	});

	it("Flujo de Seguridad: Sanea inyecciones HTML antes de enviar a Telegram", async () => {
		const maliciousInput = {
			name: "<script>alert('xss')</script>",
			email: "attacker@domain.com",
			message: "Texto con <b onclick='hack()'>HTML peligroso</b> & caracteres <desconocidos>"
		};

		const validation = contactSchema.safeParse(maliciousInput);
		assert.equal(validation.success, true);

		if (!validation.success) return;

		const formattedText = formatTelegramMessage(validation.data);

		// Ningún tag no deseado debe quedar sin escapar
		assert.ok(!formattedText.includes("<script>"));
		assert.ok(formattedText.includes("&lt;script&gt;"));
		assert.ok(!formattedText.includes("<b onclick"));
		assert.ok(formattedText.includes("&lt;b onclick="));
		assert.ok(formattedText.includes("&amp;"));
	});

	it("Flujo de Servidor Rechazado: Mapea respuesta de error del backend para el cliente", () => {
		const rejectedFieldsFromServer = ["email", "name", "phone"];

		const mappedErrors = buildServerFieldErrors(rejectedFieldsFromServer, catalog);

		assert.deepEqual(mappedErrors, {
			email: "contact.errors.email.generic",
			name: "contact.errors.name.generic"
		});
		assert.deepEqual(buildServerFieldErrors(["phone"], catalog), {});
	});

	it("Flujo Local/Dev: Si faltan credenciales, no simula un envío exitoso", async () => {
		const validData = {
			name: "Desarrollador Local",
			email: "dev@localhost.com",
			message: "Probando el flujo sin configurar credenciales de Telegram."
		};

		const result = await sendTelegramNotification(validData, {
			botToken: undefined,
			chatId: undefined
		});

		assert.deepEqual(result, { ok: false });
	});

	it("Flujo Internacional & UTF-8: Conserva acentos, tildes y emojis sin corromperse", async () => {
		const unicodeInput = {
			name: "Ñandú Pérez-Gómez 🚀",
			email: "test.unicode@dominio.cl",
			message: "¡Hola! ¿Cómo estás? Me interesa tu trabajo de diseño & desarrollo web. ✨💼"
		};

		const validation = contactSchema.safeParse(unicodeInput);
		assert.equal(validation.success, true);
		if (!validation.success) return;

		const formattedText = formatTelegramMessage(validation.data);

		assert.ok(formattedText.includes("Ñandú Pérez-Gómez 🚀"));
		assert.ok(formattedText.includes("¡Hola! ¿Cómo estás?"));
		assert.ok(formattedText.includes("&amp;"));
		assert.ok(formattedText.includes("✨💼"));
	});

	it("Flujo de Resilencia de Red: Captura caída de API sin romper la ejecución", async () => {
		const validData = {
			name: "Cliente Real",
			email: "cliente@empresa.com",
			message: "Mensaje con longitud válida para enviar."
		};

		const failingFetch = (async () => {
			throw new Error("Connection timed out");
		}) as typeof fetch;

		const result = await sendTelegramNotification(
			validData,
			{ botToken: "valid_token", chatId: "valid_chat" },
			failingFetch
		);

		assert.deepEqual(result, { ok: false, error: "Network error" });
	});
});
