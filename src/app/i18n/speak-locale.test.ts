import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseAcceptLanguage, resolveLocale, resolveLocaleFromHeader } from "./speak-locale.ts";

const config = {
  defaultLocale: { lang: "en" },
  supportedLocales: [{ lang: "es" }, { lang: "en" }]
};

describe("parseAcceptLanguage", () => {
  it("ordena por coeficiente de calidad", () => {
    assert.deepEqual(parseAcceptLanguage("es;q=0.4,en;q=0.9"), ["en", "es"]);
    assert.deepEqual(parseAcceptLanguage("en-US;q=0.2,es;q=0.8"), ["es", "en-US"]);
  });

  it("conserva el orden cuando no hay coeficientes", () => {
    assert.deepEqual(parseAcceptLanguage("ja-JP,en-US,es"), ["ja-JP", "en-US", "es"]);
  });

  it("descarta entradas mal formadas", () => {
    assert.deepEqual(parseAcceptLanguage("  ,  ;q=0.5  ,en"), ["en"]);
  });
});

describe("resolveLocale", () => {
  it("carga español cuando el navegador está en español", () => {
    assert.equal(resolveLocale(["es-CL", "es", "en-US"], config), "es");
    assert.equal(resolveLocale(["es-MX"], config), "es");
    assert.equal(resolveLocale(["es"], config), "es");
  });

  it("carga inglés para el resto de idiomas", () => {
    assert.equal(resolveLocale(["en-GB"], config), "en");
    assert.equal(resolveLocale(["ja-JP", "fr-FR", "de"], config), "en");
    assert.equal(resolveLocale(["pt-BR"], config), "en");
  });

  it("usa el idioma por defecto cuando no hay nada que resolver", () => {
    assert.equal(resolveLocale([], config), "en");
    assert.equal(resolveLocale(["  "], config), "en");
  });

  it("no distingue mayúsculas y minúsculas", () => {
    assert.equal(resolveLocale(["ES-cl"], config), "es");
  });

  it("respeta el orden de preferencia", () => {
    assert.equal(resolveLocale(["ja-JP", "es-CL", "en"], config), "es");
    assert.equal(resolveLocale(["ja-JP", "en-GB", "es-CL"], config), "en");
  });
});

describe("resolveLocaleFromHeader", () => {
  it("usa la cabecera cuando existe", () => {
    assert.equal(resolveLocaleFromHeader("es-CL,es;q=0.9,en;q=0.8", config), "es");
    assert.equal(resolveLocaleFromHeader("ja-JP,ja;q=0.9", config), "en");
  });

  it("cae en inglés si no hay cabecera", () => {
    assert.equal(resolveLocaleFromHeader(undefined, config), "en");
    assert.equal(resolveLocaleFromHeader(null, config), "en");
    assert.equal(resolveLocaleFromHeader("", config), "en");
  });
});