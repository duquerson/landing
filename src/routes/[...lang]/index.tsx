import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { useSpeakLocale } from "qwik-speak";
import { config } from "~/app/i18n/speak-config";
import { resolveLocale } from "~/app/i18n/speak-locale";
import { Hero } from "~/components/hero/hero";
import { About } from "~/components/about/about";
import { Projects } from "~/components/projects/projects";
import { Experience } from "~/components/experience/experience";
import { Skills } from "~/components/skills/skills";
import { ContactForm } from "~/features/contact-form";

/**
 * Deja la URL canónica: "/fr/" no es un idioma del sitio, así que va a "/en/".
 */
export const onGet: RequestHandler = ({ params, locale, redirect, url }) => {
  const resolved = locale() ?? "en";

  if (params.lang !== resolved) {
    throw redirect(302, `/${resolved}${url.pathname.replace(/^\/[^/]+/, "") || "/"}`);
  }
};

export default component$(() => {
  const locale = useSpeakLocale();

  // Red de seguridad del lado del navegador: si Accept-Language no llegó (o llegó mal),
  // se corrige la URL con lo que declara navigator.languages.
  useVisibleTask$(() => {
    const detected = resolveLocale(navigator.languages, config);

    if (detected === locale.lang) {
      return;
    }

    const path = window.location.pathname.replace(/^\/(es|en)(?=\/|$)/, "");

    window.location.replace(`/${detected}${path || "/"}`);
  });

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <ContactForm />
    </>
  );
});

export const head: DocumentHead = {
  title: "Yeferson Soto Duque (duquerson) | Desarrollador Full Stack",
  meta: [
    {
      name: "description",
      content:
        "Portfolio personal de Yeferson Soto Duque (duquerson.dev). Desarrollador Full Stack enfocado en accesibilidad WCAG 2.2 AA, Qwik y código limpio.",
    },
  ],
};