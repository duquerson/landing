import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { inlineTranslate } from "qwik-speak";
import { Navbar } from "~/components/navbar/navbar";
import { Footer } from "~/components/footer/footer";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const t = inlineTranslate();
  const skipLabel = t("a11y.skip");

  return (
    <>
			<a
				href="#main"
				class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-white focus:text-sm focus:font-semibold"
			>
				{skipLabel}
			</a>
      <Navbar />
      <main id="main" tabIndex={-1} class="flex-1">
        <Slot />
      </main>
      <Footer />
    </>
  );
});