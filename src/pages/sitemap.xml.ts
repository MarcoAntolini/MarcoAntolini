import type { APIRoute } from "astro";
import { absoluteUrl } from "@/lib/seo";

export const GET: APIRoute = () => {
	const routes = [
		{ path: "/", changeFrequency: "weekly", priority: "1.0" },
		{ path: "/work/dracania-archives", changeFrequency: "monthly", priority: "0.8" },
		{ path: "/resume", changeFrequency: "monthly", priority: "0.8" },
	];

	const lastModified = new Date().toISOString();
	const urls = routes
		.map(
			(route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
		)
		.join("\n");

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
};
