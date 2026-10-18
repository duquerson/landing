import type { SpeakConfig } from "qwik-speak";

export const config: SpeakConfig = {
  // Todo lo que no sea español se muestra en inglés, incluido un navegador sin datos.
  defaultLocale: { lang: "en", currency: "USD", timeZone: "America/New_York" },
  supportedLocales: [
    { lang: "es", currency: "CLP", timeZone: "America/Santiago" },
    { lang: "en", currency: "USD", timeZone: "America/New_York" }
  ],
  assets: ["app"]
};