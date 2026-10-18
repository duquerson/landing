import { component$ } from "@builder.io/qwik";
import { inlineTranslate, useFormatDate } from "qwik-speak";

// Los periodos se formatean con la API de fechas del idioma activo, nunca a mano.
const EXPERIENCE_DATE_OPTIONS = { year: "numeric", month: "long" } as const;
const EDUCATION_DATE_OPTIONS = { year: "numeric" } as const;

export const Experience = component$(() => {
  const t = inlineTranslate();
  const formatDate = useFormatDate();

  const title = t("experience.title");
  const subtitle = t("experience.subtitle");
  const present = t("experience.present");
  const educationTitle = t("education.title");

  const experiences = [
    {
      key: "e1",
      role: t("experience.items.e1.role"),
      company: t("experience.items.e1.company"),
      description: t("experience.items.e1.description"),
      start: t("experience.items.e1.start")
    }
  ];

  const education = [
    {
      key: "e1",
      title: t("education.items.e1.title"),
      institution: t("education.items.e1.institution"),
      description: t("education.items.e1.description"),
      start: t("education.items.e1.start"),
      end: t("education.items.e1.end")
    }
  ];

	return (
		<section
			id="experience"
			class="scroll-mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-border-subtle"
		>
			<div class="mb-12">
				<h2 class="text-2xl sm:text-3xl font-bold text-text-main mb-2 text-balance">{title}</h2>
				<p class="text-text-muted text-sm sm:text-base text-pretty">{subtitle}</p>
			</div>

			<ol class="space-y-8 relative list-none p-0 m-0 before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-border-subtle">
				{experiences.map((exp) => (
					<li key={exp.key} class="relative pl-8 sm:pl-10">
						<span
							aria-hidden="true"
							class="absolute left-1.5 sm:left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent border-4 border-bg-primary"
						/>
						<div class="bg-bg-card border border-border-subtle rounded-xl p-6 min-w-0">
							<span class="text-xs font-mono text-accent-light font-medium tabular-nums">
								{formatDate(new Date(exp.start), EXPERIENCE_DATE_OPTIONS)} – {present}
							</span>
							<h3 class="text-lg font-bold text-text-main mt-1 break-words">{exp.role}</h3>
							<p translate="no" class="text-sm font-medium text-text-muted mb-3 break-words">
								{exp.company}
							</p>
							<p class="text-text-muted text-sm leading-relaxed break-words">{exp.description}</p>
						</div>
					</li>
				))}
			</ol>

			<h3 class="mt-12 mb-6 text-xl sm:text-2xl font-bold text-text-main text-balance">{educationTitle}</h3>
			<ol class="space-y-8 relative list-none p-0 m-0 before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-border-subtle">
				{education.map((entry) => (
					<li key={entry.key} class="relative pl-8 sm:pl-10">
						<span
							aria-hidden="true"
							class="absolute left-1.5 sm:left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent border-4 border-bg-primary"
						/>
						<div class="bg-bg-card border border-border-subtle rounded-xl p-6 min-w-0">
							{entry.start && entry.end ? (
								<span class="text-xs font-mono text-accent-light font-medium tabular-nums">
									{formatDate(new Date(entry.start), EDUCATION_DATE_OPTIONS)} –{" "}
									{formatDate(new Date(entry.end), EDUCATION_DATE_OPTIONS)}
								</span>
							) : null}
							<h4 class="text-lg font-bold text-text-main mt-1 break-words">{entry.title}</h4>
							{entry.institution ? (
								<p translate="no" class="text-sm font-medium text-text-muted mb-3 break-words">
									{entry.institution}
								</p>
							) : null}
							<p class="text-text-muted text-sm leading-relaxed break-words">{entry.description}</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
});
