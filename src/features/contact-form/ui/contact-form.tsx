import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";
import { contactSchema } from "../model/schema";
import {
  buildErrorCatalog,
  buildFieldErrors,
  buildServerFieldErrors,
  CONTACT_FIELDS,
  FALLBACK_ERROR_KEY
} from "../model/errors";

type FieldErrors = Record<string, string>;

export const ContactForm = component$(() => {
  const t = inlineTranslate();

  const name = useSignal("");
  const email = useSignal("");
  const message = useSignal("");
  const status = useSignal<"idle" | "submitting" | "success" | "error">("idle");
  const errorMessage = useSignal("");
  const fieldErrors = useStore<FieldErrors>({});

  // La función de traducción no es serializable: todo el texto se resuelve aquí, antes de los
  // manejadores, y estos solo capturan cadenas y señales.
  const genericError = t("contact.error");
  const successText = t("contact.success");
  const title = t("contact.title");
  const subtitle = t("contact.subtitle");
  const nameLabel = t("contact.name");
  const emailLabel = t("contact.email");
  const messageLabel = t("contact.message");
  const sendLabel = t("contact.send");
  const sendingLabel = t("contact.sending");
  const namePlaceholder = t("contact.placeholders.name");
  const emailPlaceholder = t("contact.placeholders.email");
  const messagePlaceholder = t("contact.placeholders.message");
  const errorMessages = buildErrorCatalog(genericError, {
    name: {
      min: t("contact.errors.name.min"),
      required: t("contact.errors.name.required"),
      generic: t("contact.errors.name.generic")
    },
    email: {
      format: t("contact.errors.email.format"),
      required: t("contact.errors.email.required"),
      generic: t("contact.errors.email.generic")
    },
    message: {
      min: t("contact.errors.message.min"),
      required: t("contact.errors.message.required"),
      generic: t("contact.errors.message.generic")
    }
  });

  const clearErrors = $(() => {
    for (const field of Object.keys(fieldErrors)) {
      delete fieldErrors[field];
    }
  });

  const focusFirstError = $((fields: FieldErrors) => {
    for (const field of CONTACT_FIELDS) {
      if (fields[field]) {
        document.getElementById(field)?.focus();
        return;
      }
    }
  });

  const handleSubmit = $(async (e: SubmitEvent) => {
    e.preventDefault();
    status.value = "submitting";
    errorMessage.value = "";
    await clearErrors();

    const validation = contactSchema.safeParse({
      name: name.value,
      email: email.value,
      message: message.value
    });

    if (!validation.success) {
      const clientErrors = buildFieldErrors(validation.error.issues, errorMessages);

      if (Object.keys(clientErrors).length > 0) {
        Object.assign(fieldErrors, clientErrors);
        await focusFirstError(fieldErrors);
      } else {
        errorMessage.value = errorMessages[FALLBACK_ERROR_KEY];
      }

      status.value = "error";
      return;
    }

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data)
      });

      if (res.ok) {
        status.value = "success";
        name.value = "";
        email.value = "";
        message.value = "";
      } else {
        const body = (await res.json().catch(() => null)) as { fields?: unknown } | null;
        const serverFields = Array.isArray(body?.fields)
          ? body.fields.filter((field): field is string => typeof field === "string")
          : [];
        const serverErrors = buildServerFieldErrors(serverFields, errorMessages);

        if (Object.keys(serverErrors).length > 0) {
          Object.assign(fieldErrors, serverErrors);
          await focusFirstError(fieldErrors);
        } else {
          errorMessage.value = errorMessages[FALLBACK_ERROR_KEY];
        }

        status.value = "error";
      }
    } catch {
      errorMessage.value = errorMessages[FALLBACK_ERROR_KEY];
      status.value = "error";
    }
  });

  const fieldProps = (field: string) => ({
    "aria-invalid": fieldErrors[field] ? true : undefined,
    "aria-describedby": fieldErrors[field] ? `${field}-error` : undefined
  });

  const errorFor = (field: string) => fieldErrors[field];

	return (
		<section
			id="contact"
			class="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-border-subtle"
		>
			<div class="max-w-2xl mx-auto">
				<div class="text-center mb-10">
					<h2 class="text-2xl sm:text-3xl font-bold text-text-main mb-2 text-balance">{title}</h2>
					<p class="text-text-muted text-sm sm:text-base text-pretty">{subtitle}</p>
				</div>

				<form
					preventdefault:submit
					onSubmit$={handleSubmit}
					noValidate
					class="bg-bg-card border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6"
				>
					{/* Región viva permanente: si se montara y desmontara con el mensaje, algunos lectores de pantalla no lo anunciarían. */}
					<div aria-live="polite">
						{status.value === "success" && (
							<p class="p-4 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-sm">
								{successText}
							</p>
						)}

						{errorMessage.value && (
							<p class="p-4 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-sm">
								{errorMessage.value}
							</p>
						)}
					</div>

					<div>
						<label for="name" class="block text-sm font-medium text-text-muted mb-2">
							{nameLabel}
						</label>
						<input
							type="text"
							id="name"
							name="name"
							autocomplete="name"
							placeholder={namePlaceholder}
							required
							value={name.value}
							onInput$={(e) => {
								name.value = (e.target as HTMLInputElement).value;
								delete fieldErrors.name;
							}}
							{...fieldProps("name")}
							class="w-full px-4 py-2.5 min-h-[44px] bg-bg-primary border border-border-subtle rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors aria-invalid:border-rose-500"
						/>
						{errorFor("name") && (
							<p id="name-error" class="mt-2 text-sm text-rose-300">
								{errorFor("name")}
							</p>
						)}
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-text-muted mb-2">
							{emailLabel}
						</label>
						<input
							type="email"
							id="email"
							name="email"
							autocomplete="email"
							spellcheck={false}
							placeholder={emailPlaceholder}
							required
							value={email.value}
							onInput$={(e) => {
								email.value = (e.target as HTMLInputElement).value;
								delete fieldErrors.email;
							}}
							{...fieldProps("email")}
							class="w-full px-4 py-2.5 min-h-[44px] bg-bg-primary border border-border-subtle rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors aria-invalid:border-rose-500"
						/>
						{errorFor("email") && (
							<p id="email-error" class="mt-2 text-sm text-rose-300">
								{errorFor("email")}
							</p>
						)}
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-text-muted mb-2">
							{messageLabel}
						</label>
						<textarea
							id="message"
							name="message"
							rows={4}
							placeholder={messagePlaceholder}
							required
							value={message.value}
							onInput$={(e) => {
								message.value = (e.target as HTMLTextAreaElement).value;
								delete fieldErrors.message;
							}}
							{...fieldProps("message")}
							class="w-full px-4 py-2.5 bg-bg-primary border border-border-subtle rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none aria-invalid:border-rose-500"
						/>
						{errorFor("message") && (
							<p id="message-error" class="mt-2 text-sm text-rose-300">
								{errorFor("message")}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={status.value === "submitting"}
						aria-busy={status.value === "submitting"}
						class="w-full py-3 px-6 min-h-[44px] text-sm font-semibold text-slate-950 bg-accent-light hover:bg-accent hover:text-white disabled:opacity-70 disabled:cursor-progress rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent inline-flex items-center justify-center gap-2"
					>
						{status.value === "submitting" && (
							<span
								aria-hidden="true"
								class="inline-block w-3.5 h-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin motion-reduce:animate-none"
							/>
						)}
						{status.value === "submitting" ? sendingLabel : sendLabel}
					</button>
				</form>
			</div>
		</section>
	);
});
