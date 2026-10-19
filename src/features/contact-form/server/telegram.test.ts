import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	escapeHtml,
	formatTelegramMessage,
	sendTelegramNotification
} from "./telegram.ts";

describe("escapeHtml", () => {
	it("convierte caracteres HTML especiales en entidades seguras", () => {
		assert.equal(
			escapeHtml('Hola <script>alert("xss")</script> & saludos'),
			"Hola &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; saludos"
		);
	});

	it("mantiene intacto texto sin caracteres especiales", () => {
		assert.equal(escapeHtml("Hola mundo 123"), "Hola mundo 123");
	});
});

describe("formatTelegramMessage", () => {
	it("ordena el mensaje como un correo, escapa los campos y conserva sus párrafos", () => {
		const payload = {
			name: 'Ada "VIP" & <Team>',
			email: "ada@example.com",
			message: [
				"",
				"Quiero <b>contratarte</b> & hablar de un proyecto.",
				"",
				"¿Coordinamos una llamada?",
				""
			].join("\n")
		};

		const formatted = formatTelegramMessage(payload);

		assert.equal(
			formatted,
			[
				"<b>Asunto:</b> Nuevo mensaje de contacto — duquerson.dev",
				"",
				"Hola Yeferson,",
				"",
				"<b>De:</b> Ada &quot;VIP&quot; &amp; &lt;Team&gt; &lt;ada@example.com&gt;",
				"",
				"<b>Mensaje:</b>",
				"",
				"Quiero &lt;b&gt;contratarte&lt;/b&gt; &amp; hablar de un proyecto.",
				"",
				"¿Coordinamos una llamada?",
				"",
				"",
				"Saludos cordiales,",
				"Formulario de contacto",
				"",
				"<b>Origen:</b> duquerson.dev"
			].join("\n")
		);
	});
});

describe("sendTelegramNotification", () => {
	const validPayload = {
		name: "Alan Turing",
		email: "alan@example.com",
		message: "Mensaje de prueba con más de 10 caracteres."
	};

	it("devuelve fallo y registra un mensaje genérico si falta cualquier credencial", async () => {
		const loggedErrors: string[] = [];
		const originalConsoleError = console.error;
		console.error = (...args: Parameters<typeof console.error>) => {
			loggedErrors.push(args.map((argument) => String(argument)).join(" "));
		};

		try {
			const resultWithoutToken = await sendTelegramNotification(validPayload, {
				chatId: "12345"
			});
			assert.deepEqual(resultWithoutToken, { ok: false });

			const resultWithoutChat = await sendTelegramNotification(validPayload, {
				botToken: "token123"
			});
			assert.deepEqual(resultWithoutChat, { ok: false });

			const resultEmpty = await sendTelegramNotification(validPayload, {});
			assert.deepEqual(resultEmpty, { ok: false });

			const genericMessage =
				"[Telegram] No se pudo establecer la conexión para enviar la notificación.";
			assert.deepEqual(loggedErrors, [genericMessage, genericMessage, genericMessage]);
			assert.ok(
				loggedErrors.every(
					(message) => !message.includes("12345") && !message.includes("token123")
				)
			);
		} finally {
			console.error = originalConsoleError;
		}
	});

	it("realiza la petición a la API de Telegram cuando hay credenciales", async () => {
		let calledUrl = "";
		let calledBody = "";

		const mockFetch = (async (url: string | URL | Request, init?: RequestInit) => {
			calledUrl = url.toString();
			calledBody = (init?.body as string) || "";
			return {
				ok: true,
				status: 200
			} as Response;
		}) as typeof fetch;

		const result = await sendTelegramNotification(
			validPayload,
			{ botToken: "123456:ABC-DEF", chatId: "987654" },
			mockFetch
		);

		assert.deepEqual(result, { ok: true });
		assert.equal(calledUrl, "https://api.telegram.org/bot123456:ABC-DEF/sendMessage");
		const parsedBody = JSON.parse(calledBody);
		assert.equal(parsedBody.chat_id, "987654");
		assert.equal(parsedBody.parse_mode, "HTML");
		assert.equal(parsedBody.text, formatTelegramMessage(validPayload));
	});

	it("devuelve error si la API de Telegram responde con código no-ok", async () => {
		const mockFetch = (async () => {
			return {
				ok: false,
				status: 403
			} as Response;
		}) as typeof fetch;

		const result = await sendTelegramNotification(
			validPayload,
			{ botToken: "token", chatId: "chat" },
			mockFetch
		);

		assert.equal(result.ok, false);
		assert.equal(result.error, "HTTP 403");
	});

	it("captura errores de red y devuelve error controlado", async () => {
		const mockFetch = (async () => {
			throw new Error("DNS resolution failed");
		}) as typeof fetch;

		const result = await sendTelegramNotification(
			validPayload,
			{ botToken: "token", chatId: "chat" },
			mockFetch
		);

		assert.equal(result.ok, false);
		assert.equal(result.error, "Network error");
	});
});
