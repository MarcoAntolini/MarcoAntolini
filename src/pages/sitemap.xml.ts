import type { APIRoute } from "astro";
import { getCaseStudySlugs } from "@/content/case-studies";
import { localizedPath, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

export const GET: APIRoute = () => {
	const routes = locales.flatMap((locale) => {
		const localizedRoutes = [
			{ path: localizedPath("/", locale), sourcePath: "/", changeFrequency: "weekly", priority: "1.0" },
			...getCaseStudySlugs(locale).map((slug) => ({
				path: localizedPath(`/work/${slug}`, locale),
				sourcePath: `/work/${slug}`,
				changeFrequency: "monthly" as const,
				priority: "0.8",
			})),
		];

		return localizedRoutes;
	});

	const lastModified = new Date().toISOString();
	const urls = routes
		.map(
			(route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
${locales.map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${absoluteUrl(localizedPath(route.sourcePath, locale))}" />`).join("\n")}
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
		)
		.join("\n");

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

	return new Response(body, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
};
