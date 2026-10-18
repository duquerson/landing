import type { SpeakConfig } from "qwik-speak";

type LocaleConfig = Pick<SpeakConfig, "defaultLocale" | "supportedLocales">;

/**
 * Descompone una cabecera Accept-Language en las etiquetas de idioma, de mayor a menor
 * preferencia: "es-MX,es;q=0.9,en;q=0.5" -> ["es-MX", "es", "en"].
 */
export function parseAcceptLanguage(header: string): string[] {
  return header
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.split(";");

      const qualityParam = params
        .map((param) => param.trim())
        .find((param) => param.startsWith("q="));

      const quality = qualityParam ? Number.parseFloat(qualityParam.slice(2)) : 1;

      return { tag: rawTag?.trim() ?? "", quality };
    })
    .filter((entry) => entry.tag.length > 0 && !Number.isNaN(entry.quality))
    .sort((a, b) => b.quality - a.quality)
    .map((entry) => entry.tag);
}

/**
 * Resuelve el idioma a partir de una lista de etiquetas, la que entrega el navegador
 * en navigator.languages o la cabecera Accept-Language.
 *
 * Gana la primera etiqueta cuyo idioma base esté admitido, de modo que "es-MX" carga
 * "es" y "en-GB" carga "en". Si ninguna encaja se usa el idioma por defecto, que en este
 * proyecto es el inglés: todo lo que no sea español se muestra en inglés.
 *
 * Función pura: no lee `navigator` ni cabeceras por su cuenta.
 */
export function resolveLocale(tags: readonly string[], config: LocaleConfig): string {
  const supported = config.supportedLocales.map((locale) => ({
    normalized: locale.lang.toLowerCase(),
    lang: locale.lang
  }));

  for (const rawTag of tags) {
    const normalized = rawTag.trim().toLowerCase();
    if (normalized.length === 0) continue;

    const base = normalized.split("-")[0];

    const match = supported.find(
      (locale) => locale.normalized === normalized || locale.normalized.split("-")[0] === base
    );

    if (match) {
      return match.lang;
    }
  }

  return config.defaultLocale.lang;
}

/**
 * Atajo para el lado del servidor: resuelve el idioma desde la cabecera Accept-Language.
 */
export function resolveLocaleFromHeader(
  header: string | null | undefined,
  config: LocaleConfig
): string {
  return resolveLocale(header ? parseAcceptLanguage(header) : [], config);
}