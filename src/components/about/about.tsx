import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

export const About = component$(() => {
  const t = inlineTranslate();

  const title = t("about.title");
  const p1 = t("about.p1");

	return (
		<section
			id="about"
			class="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-border-subtle"
		>
			<h2 class="text-2xl sm:text-3xl font-bold text-text-main mb-6 text-balance">{title}</h2>
			<p class="bg-bg-card/70 p-6 rounded-xl border border-border-subtle text-pretty text-text-muted leading-relaxed text-base sm:text-lg">
				{p1}
			</p>
		</section>
	);
});