import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import { inlineTranslate } from "qwik-speak";

const navLinkClass =
	"block px-3 py-2 rounded-md text-text-muted hover:text-text-main hover:bg-bg-card-hover transition-colors";

export const Navbar = component$(() => {
	const t = inlineTranslate();
	const menuOpen = useSignal(false);

	// Las cadenas se resuelven aquí para que los cambios reactivos de señales
	// capturen valores serializables y no llamen a t() en el cliente.
	const ariaNavLabel = t("navbar.aria_label");
	const aboutLabel = t("navbar.about");
	const projectsLabel = t("navbar.projects");
	const experienceLabel = t("navbar.experience");
	const skillsLabel = t("navbar.skills");
	const contactLabel = t("navbar.contact");
	const ctaContactLabel = t("hero.cta_contact");
	const closeMenuLabel = t("a11y.close_menu");
	const openMenuLabel = t("a11y.menu");

	const closeMenu = $(() => {
		menuOpen.value = false;
	});

	// Escape cierra el menú móvil en cualquier momento.
	useOnDocument(
		"keydown",
		$((event) => {
			if (event.key === "Escape" && menuOpen.value) {
				menuOpen.value = false;
			}
		})
	);

	return (
		<header class="sticky top-0 z-50 w-full backdrop-blur-md bg-bg-primary/80 border-b border-border-subtle">
			<nav
				aria-label={ariaNavLabel}
				class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
			>
				<a
					href="#hero"
					class="text-xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent rounded"
				>
					Duquerson
				</a>

				<ul class="hidden md:flex items-center gap-1 text-sm font-medium list-none p-0 m-0">
					<li>
						<a href="#about" class={navLinkClass}>
							{aboutLabel}
						</a>
					</li>
					<li>
						<a href="#projects" class={navLinkClass}>
							{projectsLabel}
						</a>
					</li>
					<li>
						<a href="#experience" class={navLinkClass}>
							{experienceLabel}
						</a>
					</li>
					<li>
						<a href="#skills" class={navLinkClass}>
							{skillsLabel}
						</a>
					</li>
					<li>
						<a href="#contact" class={navLinkClass}>
							{contactLabel}
						</a>
					</li>
				</ul>

				<div class="hidden md:flex items-center gap-3">
					<a
						href="#contact"
						class="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-lg transition-colors"
					>
						{ctaContactLabel}
					</a>
				</div>

				<button
					type="button"
					aria-expanded={menuOpen.value}
					aria-controls="nav-menu"
					aria-label={menuOpen.value ? closeMenuLabel : openMenuLabel}
					onClick$={() => (menuOpen.value = !menuOpen.value)}
					class="md:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2 rounded-lg border border-border-subtle text-text-main hover:bg-bg-card-hover transition-colors"
				>
					<span aria-hidden="true" class="text-lg leading-none">
						{menuOpen.value ? "✕" : "☰"}
					</span>
				</button>
			</nav>

			{/* Panel de navegación en móvil. El contenedor siempre existe para que la región viva sea estable. */}
			<div
				id="nav-menu"
				hidden={!menuOpen.value}
				class="md:hidden border-t border-border-subtle bg-bg-primary/95"
			>
				<ul class="px-4 py-3 space-y-1 text-sm font-medium list-none p-0 m-0">
					<li>
						<a href="#about" onClick$={closeMenu} class={`${navLinkClass} min-h-[44px] flex items-center`}>
							{aboutLabel}
						</a>
					</li>
					<li>
						<a href="#projects" onClick$={closeMenu} class={`${navLinkClass} min-h-[44px] flex items-center`}>
							{projectsLabel}
						</a>
					</li>
					<li>
						<a href="#experience" onClick$={closeMenu} class={`${navLinkClass} min-h-[44px] flex items-center`}>
							{experienceLabel}
						</a>
					</li>
					<li>
						<a href="#skills" onClick$={closeMenu} class={`${navLinkClass} min-h-[44px] flex items-center`}>
							{skillsLabel}
						</a>
					</li>
					<li>
						<a href="#contact" onClick$={closeMenu} class={`${navLinkClass} min-h-[44px] flex items-center`}>
							{contactLabel}
						</a>
					</li>
					<li class="pt-2">
						<a
							href="#contact"
							onClick$={closeMenu}
							class="px-3 py-2.5 rounded-lg text-center font-semibold text-white bg-accent hover:bg-accent-hover transition-colors min-h-[44px] flex items-center justify-center"
						>
							{ctaContactLabel}
						</a>
					</li>
				</ul>
			</div>
		</header>
	);
});