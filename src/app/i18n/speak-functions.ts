import { server$ } from "@builder.io/qwik-city";
import type { LoadTranslationFn, Translation, TranslationFn } from "qwik-speak";

/**
 * Los archivos de traducción viven en public/i18n/<lang>/<asset>.json.
 * El glob los resuelve en build y los divide en chunks por idioma.
 */
const translationData = import.meta.glob<Translation>("/public/i18n/**/*.json");

/**
 * Se ejecuta siempre en el servidor: los datos de traducción no viajan en el HTML,
 * llegan en los chunks que genera el plugin inline de Qwik Speak.
 */
const loadTranslation$: LoadTranslationFn = server$(async (lang: string, asset: string) => {
  const loader = translationData[`/public/i18n/${lang}/${asset}.json`];

  return loader ? await loader() : null;
});

export const translationFn: TranslationFn = {
  loadTranslation$: loadTranslation$
};