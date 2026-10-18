import type { RequestHandler } from "@builder.io/qwik-city";
import { setSpeakContext, validateLocale } from "qwik-speak";
import { config } from "../app/i18n/speak-config";
import { resolveLocaleFromHeader } from "../app/i18n/speak-locale";

/**
 * Se ejecuta en cada petición y solo fija el idioma: sin redirecciones ni errores.
 * El prefijo de la URL manda ("/es/", "/en/"); si no hay, se detecta del navegador.
 */
export const onRequest: RequestHandler = ({ request, params, locale }) => {
  setSpeakContext(config);

  const fromUrl = params.lang && validateLocale(params.lang) ? params.lang : undefined;

  const supported = fromUrl
    ? config.supportedLocales.find((value) => value.lang === fromUrl)?.lang
    : undefined;

  const lang = supported ?? resolveLocaleFromHeader(request.headers.get("accept-language"), config);

  locale(lang);
};