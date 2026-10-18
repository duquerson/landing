import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { useQwikSpeak } from "qwik-speak";
import { config } from "./app/i18n/speak-config";
import { translationFn } from "./app/i18n/speak-functions";
import { RouterHead } from "./components/router-head/router-head";
import "./app/styles/global.css";

export default component$(() => {
  /**
   * Idioma y traducciones disponibles en toda la aplicación.
   */
  useQwikSpeak({ config, translationFn });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#090d16" />
        <RouterHead />
      </head>
      <body class="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});