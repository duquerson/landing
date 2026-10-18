import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildErrorCatalog,
  buildFieldErrors,
  buildServerFieldErrors,
  CONTACT_FIELDS,
  FALLBACK_ERROR_KEY
} from "./errors.ts";

const catalog = buildErrorCatalog(FALLBACK_ERROR_KEY, {
  name: {
    min: "contact.errors.name.min",
    required: "contact.errors.name.required",
    generic: "contact.errors.name.generic"
  },
  email: {
    format: "contact.errors.email.format",
    required: "contact.errors.email.required",
    generic: "contact.errors.email.generic"
  },
  message: {
    min: "contact.errors.message.min",
    required: "contact.errors.message.required",
    generic: "contact.errors.message.generic"
  }
});

describe("buildErrorCatalog", () => {
  it("devuelve un objeto plano, serializable por los manejadores $()", () => {
    assert.equal(typeof catalog, "object");
    for (const value of Object.values(catalog)) {
      assert.equal(typeof value, "string");
    }
  });

  it("resuelve el mensaje de respaldo", () => {
    assert.equal(catalog[FALLBACK_ERROR_KEY], FALLBACK_ERROR_KEY);
  });

  it("resuelve un mensaje por cada campo y motivo", () => {
    for (const field of CONTACT_FIELDS) {
      assert.ok(catalog[`contact.errors.${field}.generic`]);
    }
    assert.equal(catalog["contact.errors.name.min"], "contact.errors.name.min");
    assert.equal(catalog["contact.errors.email.format"], "contact.errors.email.format");
    assert.equal(catalog["contact.errors.message.min"], "contact.errors.message.min");
  });
});

describe("buildFieldErrors", () => {
  it("mapea cada código de Zod a su motivo traducible", () => {
    const errors = buildFieldErrors(
      [
        { path: ["name"], code: "too_small" },
        { path: ["email"], code: "invalid_string" },
        { path: ["message"], code: "invalid_type" }
      ],
      catalog
    );

    assert.deepEqual(errors, {
      name: "contact.errors.name.min",
      email: "contact.errors.email.format",
      message: "contact.errors.message.required"
    });
  });

  it("usa el motivo genérico para códigos desconocidos", () => {
    const errors = buildFieldErrors([{ path: ["email"], code: "custom" }], catalog);
    assert.deepEqual(errors, { email: "contact.errors.email.generic" });
  });

  it("conserva solo el primer problema de cada campo", () => {
    const errors = buildFieldErrors(
      [
        { path: ["message"], code: "too_small" },
        { path: ["message"], code: "invalid_type" }
      ],
      catalog
    );

    assert.deepEqual(errors, { message: "contact.errors.message.min" });
  });

  it("ignora issues sin campo", () => {
    assert.deepEqual(buildFieldErrors([{ path: [], code: "invalid_type" }], catalog), {});
  });

  it("usa el respaldo para un campo conocido e ignora campos desconocidos", () => {
    const messages = {
      [FALLBACK_ERROR_KEY]: "Error general"
    };
    const knownFieldErrors = buildFieldErrors([{ path: ["name"], code: "invalid_string" }], messages);
    const unknownFieldErrors = buildFieldErrors([{ path: ["phone"], code: "invalid_string" }], messages);

    assert.deepEqual(knownFieldErrors, { name: "Error general" });
    assert.deepEqual(unknownFieldErrors, {});
  });
});

describe("buildServerFieldErrors", () => {
  it("traduce los campos fallidos que devuelve el endpoint", () => {
    assert.deepEqual(buildServerFieldErrors(["email"], catalog), {
      email: "contact.errors.email.generic"
    });
  });

  it("ignora campos desconocidos sin romper la vista", () => {
    assert.deepEqual(buildServerFieldErrors(["phone", "name"], catalog), {
      name: "contact.errors.name.generic"
    });
    assert.deepEqual(buildServerFieldErrors(["phone"], catalog), {});
  });

  it("no repite un campo", () => {
    assert.deepEqual(Object.keys(buildServerFieldErrors(["name", "name"], catalog)), ["name"]);
  });
});
