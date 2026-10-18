import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";
import { HeroOrbit } from "./HeroOrbit";

export const Hero = component$(() => {
  const t = inlineTranslate();

  const title = t("hero.title");
  const description = t("hero.description");
  const ctaProjects = t("hero.cta_projects");
  const ctaContact = t("hero.cta_contact");
  const badge = t("hero.badge");

	return (
		<section
			id="hero"
			class="scroll-mt-20 relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 md:grid-cols-2 md:py-36 lg:px-8"
		>
			<div class="w-full">
				<div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-subtle border border-accent/30 text-accent-light text-xs sm:text-sm font-medium mb-6">
					<span aria-hidden="true" class="w-2 h-2 rounded-full bg-accent-light animate-pulse motion-reduce:animate-none" />
					<span>{badge}</span>
				</div>

				<h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-main max-w-4xl leading-tight sm:leading-none mb-6 text-balance">
					{title}
				</h1>

				<p class="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mb-8 leading-relaxed text-pretty">
					{description}
				</p>

				<div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
					<a
						href="#projects"
						class="px-6 py-3 text-center text-sm font-semibold text-slate-950 bg-accent-light hover:bg-accent hover:text-white rounded-lg transition-colors min-h-[44px] flex items-center justify-center"
					>
						{ctaProjects}
					</a>
					<a
						href="#contact"
						class="px-6 py-3 text-center text-sm font-semibold text-text-main bg-bg-card border border-border-subtle hover:bg-bg-card-hover rounded-lg transition-colors min-h-[44px] flex items-center justify-center"
					>
						{ctaContact}
					</a>
				</div>
			</div>

			<HeroOrbit />
		</section>
	);
});
