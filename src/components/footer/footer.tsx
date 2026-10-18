import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

// Se calcula una vez y no en cada render: evita el desajuste de hidratación de fin de año.
const currentYear = new Date().getFullYear();

export const Footer = component$(() => {
  const t = inlineTranslate();

  const rights = t("footer.rights");
  const builtWith = t("footer.built_with");

	return (
		<footer class="mt-auto py-8 border-t border-border-subtle bg-bg-primary text-center text-xs text-text-muted">
			<div class="max-w-6xl mx-auto px-4 space-y-2">
				<p>
					<span translate="no">© {currentYear} Yeferson Soto Duque (duquerson).</span> {rights}
				</p>
				<p class="text-text-muted">{builtWith}</p>
			</div>
		</footer>
	);
});