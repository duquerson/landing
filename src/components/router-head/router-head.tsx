import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title || "Yeferson Soto Duque (duquerson) | Full Stack Developer"}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="icon" type="image/svg+xml" href="/icon-duquerson.svg" />

			{head.meta.map((m) => (
				<meta key={m.key} {...m} />
			))}

			{head.links.map((l) => (
				<link key={l.key} {...l} />
			))}

			{head.styles.map((s) => {
				const { dangerouslySetInnerHTML, ...restProps } = s.props || {};
				return (
					<style
						key={s.key}
						{...restProps}
						dangerouslySetInnerHTML={s.style ?? dangerouslySetInnerHTML}
					/>
				);
			})}
    </>
  );
});
