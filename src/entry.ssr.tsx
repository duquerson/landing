import { isDev } from "@builder.io/qwik/build";
import { renderToStream, type RenderOptions, type RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import { config } from "./app/i18n/speak-config";

/**
 * Cada idioma se sirve desde su propia carpeta de chunks.
 * El locale lo fija src/routes/plugin.ts y Qwik lo guarda en serverData.locale.
 */
function extractBase({ serverData }: RenderOptions): string {
  if (!isDev && serverData?.locale) {
    return `/build/${serverData.locale}`;
  }

  return "/build";
}

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    base: extractBase,
    containerAttributes: {
      lang: opts.serverData?.locale ?? config.defaultLocale.lang,
      ...opts.containerAttributes
    }
  });
}