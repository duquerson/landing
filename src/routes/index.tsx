import type { RequestHandler } from "@builder.io/qwik-city";

/**
 * La raíz no muestra nada: manda al idioma del visitante, "/es/" o "/en/".
 * El idioma ya viene resuelto en la petición, así que no hay Layout ni contenido que renderizar.
 */
export const onGet: RequestHandler = ({ locale, redirect }) => {
  throw redirect(302, `/${locale() ?? "en"}/`);
};

export default () => null;