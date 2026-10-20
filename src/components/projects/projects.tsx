import { component$ } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

export const Projects = component$(() => {
  const t = inlineTranslate();

	const title = t("projects.title");
	const subtitle = t("projects.subtitle");
	const demoLabel = t("projects.demo");
	const repoLabel = t("projects.repo");
	const externalLinkLabel = t("a11y.external_link");

	const projects = [
		{
			key: "p1",
			title: t("projects.items.p1.title"),
			description: t("projects.items.p1.description"),
			tags: t("projects.items.p1.tags").split(","),
			image: "/img/projects/game-learning.png",
			imageAlt: t("projects.items.p1.preview_alt"),
			imageWidth: 1083,
			imageHeight: 1221,
			demo: "https://duquerson.github.io/game-learning/",
			repo: "https://github.com/duquerson/game-learning"
		},
		{
			key: "p2",
			title: t("projects.items.p2.title"),
			description: t("projects.items.p2.description"),
			tags: t("projects.items.p2.tags").split(","),
			image: "https://raw.githubusercontent.com/duquerson/country_api/master/design/desktop-design-home-light.jpg",
			imageAlt: t("projects.items.p2.preview_alt"),
			imageWidth: 1440,
			imageHeight: 900,
			demo: "https://country-api-eight-wheat.vercel.app/",
			repo: "https://github.com/duquerson/country_api"
		},
		{
			key: "p3",
			title: t("projects.items.p3.title"),
			description: t("projects.items.p3.description"),
			tags: t("projects.items.p3.tags").split(","),
			image: "https://raw.githubusercontent.com/duquerson/todoList/main/public/preview%20Vite%20React%20TS.png",
			imageAlt: t("projects.items.p3.preview_alt"),
			imageWidth: 1440,
			imageHeight: 900,
			demo: "https://full-todo-list.netlify.app/",
			repo: "https://github.com/duquerson/todoList"
		}
	];

	return (
		<section
			id="projects"
			class="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-border-subtle"
		>
			<div class="mb-12">
				<h2 class="text-2xl sm:text-3xl font-bold text-text-main mb-2 text-balance">{title}</h2>
				<p class="text-text-muted text-sm sm:text-base text-pretty">{subtitle}</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				{projects.map((project) => (
					<article
						key={project.key}
						class="bg-bg-card border border-border-subtle rounded-xl p-6 flex flex-col justify-between hover:border-border-strong transition-colors min-w-0"
					>
						<div>
							<img
								src={project.image}
								alt={project.imageAlt}
								width={project.imageWidth}
								height={project.imageHeight}
								loading="lazy"
								decoding="async"
								class="mb-6 aspect-video w-full rounded-lg border border-border-subtle bg-bg-primary object-contain"
							/>
							<h3 class="text-xl font-bold text-text-main mb-3 break-words">{project.title}</h3>
							<p class="text-text-muted text-sm leading-relaxed mb-6 break-words">
								{project.description}
							</p>
							<ul class="flex flex-wrap gap-2 mb-6 list-none p-0 m-0">
								{project.tags.map((tag) => (
									<li
										key={tag}
										translate="no"
										class="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-primary text-accent-light border border-border-subtle"
									>
										{tag}
									</li>
								))}
							</ul>
						</div>

						{(project.demo || project.repo) && (
							<div class="flex flex-wrap items-center gap-3">
								{project.demo && (
									<a
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										class="text-xs font-semibold px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors min-h-[44px] inline-flex items-center"
									>
										<span translate="no">{demoLabel}</span>
										<span class="sr-only"> ({externalLinkLabel})</span>
									</a>
								)}
								{project.repo && (
									<a
										href={project.repo}
										target="_blank"
										rel="noopener noreferrer"
										class="text-xs font-semibold px-4 py-2 bg-bg-card-hover hover:bg-border-subtle text-text-main border border-border-subtle rounded-lg transition-colors min-h-[44px] inline-flex items-center"
									>
										<span translate="no">{repoLabel}</span>
										<span class="sr-only"> ({externalLinkLabel})</span>
									</a>
								)}
							</div>
						)}
					</article>
				))}
			</div>
		</section>
	);
});
