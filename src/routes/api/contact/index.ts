import type { RequestHandler } from "@builder.io/qwik-city";

/**
 * @deprecated Utilizar la ruta unificada `/contact`.
 */
export const onPost: RequestHandler = ({ redirect }) => {
	throw redirect(307, "/contact");
};

export const onGet: RequestHandler = ({ redirect }) => {
	throw redirect(302, "/#contact");
};