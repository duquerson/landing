import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

export const Skills = component$(() => {
  const t = inlineTranslate();

  const title = t("skills.title");
  const subtitle = t("skills.subtitle");

  const categories = [
    { key: "c1", name: t("skills.categories.c1.name"), skills: t("skills.categories.c1.skills") },
    {
      key: "c2",
      name: t("skills.categories.c2.name"),
      skills: t("skills.categories.c2.skills")
    },
    {
      key: "c3",
      name: t("skills.categories.c3.name"),
      skills: t("skills.categories.c3.skills")
    }
  ];

	return (
		<section
			id="skills"
			class="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-border-subtle"
		>
			<div class="mb-12">
				<h2 class="text-2xl sm:text-3xl font-bold text-text-main mb-2 text-balance">{title}</h2>
				<p class="text-text-muted text-sm sm:text-base text-pretty">{subtitle}</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{categories.map((category) => (
					<div
						key={category.key}
						class="bg-bg-card border border-border-subtle rounded-xl p-6 min-w-0"
					>
						<h3 class="text-lg font-bold text-accent-light mb-4 pb-2 border-b border-border-subtle break-words">
							{category.name}
						</h3>
						<ul class="space-y-2.5">
							{category.skills.split(",").map((skill) => (
								<li key={skill} translate="no" class="flex items-start text-sm text-text-muted">
									<span aria-hidden="true" class="w-1.5 h-1.5 mt-2 rounded-full bg-accent mr-2.5 shrink-0" />
									<span class="break-words">{skill}</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
});