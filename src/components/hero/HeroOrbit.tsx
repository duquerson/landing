import { component$, useSignal } from "@builder.io/qwik";
import { spriteHref } from "@devicons-pack/sprite";
import { inlineTranslate } from "qwik-speak";

const spriteUrl = "/icons/devicon/original.svg";

const orbits = [
	{
		id: "inner",
		radius: "35cqw",
		duration: "24s",
		phase: 0,
		ringClass: "border-solid",
		technologies: [
			{ id: "hono", href: spriteHref(spriteUrl, "hono") },
			{ id: "javascript", href: spriteHref(spriteUrl, "javascript") },
			{ id: "css3", href: spriteHref(spriteUrl, "css3") },
			{ id: "tailwindcss", href: spriteHref(spriteUrl, "tailwindcss") },
			{ id: "nodejs", href: spriteHref(spriteUrl, "nodejs") },
			{ id: "html5", href: spriteHref(spriteUrl, "html5") },
		],
	},
	{
		id: "outer",
		radius: "42cqw",
		duration: "36s",
		phase: 30,
		ringClass: "border-dashed",
		technologies: [
			{ id: "qwik", href: spriteHref(spriteUrl, "qwik") },
			{ id: "astro", href: spriteHref(spriteUrl, "astro") },
			{ id: "vuejs", href: spriteHref(spriteUrl, "vuejs") },
			{ id: "nextjs", href: spriteHref(spriteUrl, "nextjs") },
			{ id: "nuxtjs", href: spriteHref(spriteUrl, "nuxtjs") },
			{ id: "react", href: spriteHref(spriteUrl, "react") },
		],
	},
] as const;

export const HeroOrbit = component$(() => {
	const t = inlineTranslate();
	const motionPaused = useSignal(false);
	const keyboardFocusPaused = useSignal(false);
	const logoRotationActive = useSignal(false);
	const avatarAlt = t("hero.avatar_alt");
	const sceneLabel = t("hero.scene_label");
	const pauseLabel = t("hero.pause_animation");
	const resumeLabel = t("hero.resume_animation");
	const animationPaused = motionPaused.value || keyboardFocusPaused.value;

	return (
		<div
			role="group"
			aria-label={sceneLabel}
			class="@container relative mx-auto grid aspect-square w-full max-w-[460px] place-items-center"
			onFocusIn$={(event) => {
				if (
					event.target instanceof HTMLElement &&
					event.target.matches(":focus-visible")
				) {
					keyboardFocusPaused.value = true;
				}
			}}
			onFocusOut$={(event) => {
				const nextTarget = event.relatedTarget;
				const scene = event.currentTarget;

				if (
					!(nextTarget instanceof HTMLElement) ||
					!(scene instanceof HTMLElement) ||
					!scene.contains(nextTarget) ||
					!nextTarget.matches(":focus-visible")
				) {
					keyboardFocusPaused.value = false;
				}
			}}
			onPointerLeave$={() => {
				logoRotationActive.value = false;
			}}
		>
			<div
				aria-hidden="true"
				class="hero-orbit-glow pointer-events-none absolute inset-[22%] z-0 rounded-full blur-[40px]"
			/>

			<div class="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
				{orbits.map((orbit) => (
					<div
						key={orbit.id}
						class={`absolute left-1/2 top-1/2 aspect-square -translate-1/2 rounded-full border border-border-subtle/80 ${orbit.ringClass} animate-orbit motion-reduce:animate-none`}
						style={`--r:${orbit.radius};--d:${orbit.duration};width:calc(var(--r) * 2);height:calc(var(--r) * 2);animation-play-state:${animationPaused ? "paused" : "running"};`}
					>
						{orbit.technologies.map((technology, index) => {
							const angle = (360 / orbit.technologies.length) * index + orbit.phase;

							return (
								<div
									key={technology.id}
									class="absolute left-1/2 top-1/2 grid size-12 -translate-1/2 place-items-center [transform:rotate(var(--a))_translateX(var(--r))_rotate(var(--a-reverse))]"
									style={`--a:${angle}deg;--a-reverse:${-angle}deg;`}
								>
									<div
										class="group/icon pointer-events-auto grid size-12 place-items-center rounded-full border border-border-subtle bg-text-main shadow-md transition-[transform,scale,background-color] duration-200 ease-out animate-orbit-reverse group-hover/icon:scale-105 group-hover/icon:bg-bg-primary motion-reduce:transition-none motion-reduce:group-hover/icon:scale-100 motion-reduce:animate-none"
										style={`--d:${orbit.duration};animation-play-state:${animationPaused ? "paused" : "running"};`}
									>
										<svg
											aria-hidden="true"
											focusable="false"
											class={`size-7 motion-reduce:animate-none ${logoRotationActive.value && !animationPaused ? "animate-spin" : ""}`}
										>
											<use href={technology.href} />
										</svg>
									</div>
								</div>
							);
						})}
					</div>
				))}
			</div>

			<div class="relative z-10 size-[44%] aspect-square">
				<img
					src="/Hero-img.png"
					alt={avatarAlt}
					width={1536}
					height={1024}
					fetchPriority="high"
					class="h-full w-full object-cover object-center [mask-image:radial-gradient(circle_at_center,#000_55%,transparent_75%)]"
					onPointerEnter$={() => {
						logoRotationActive.value = true;
					}}
				/>
			</div>

			<button
				type="button"
				aria-label={motionPaused.value ? resumeLabel : pauseLabel}
				class="absolute right-3 top-3 z-30 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-text-main shadow-lg transition-colors hover:bg-bg-card-hover motion-reduce:hidden"
				onClick$={() => {
					motionPaused.value = !motionPaused.value;
				}}
			>
				<svg
					aria-hidden="true"
					focusable="false"
					class="size-5"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					{motionPaused.value ? (
						<path d="M7 4.5v15l12-7.5L7 4.5Z" />
					) : (
						<path d="M6 4h4v16H6zM14 4h4v16h-4z" />
					)}
				</svg>
			</button>
		</div>
	);
});
