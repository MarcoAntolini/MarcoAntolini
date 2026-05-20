import type { APIRoute } from "astro";
import { absoluteUrl } from "@/lib/seo";

export const GET: APIRoute = () => {
	const body = `User-agent: *
Allow: /
Disallow: /dev

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
