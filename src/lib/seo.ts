import { profile } from "@/content/profile";

const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? "https://marcoantolini.com";

export function absoluteUrl(path: string) {
	return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteMetadata = {
	title: {
		default: `${profile.name} — Frontend & mobile engineer`,
		template: `%s | ${profile.name}`,
	},
	description: profile.heroLine,
	metadataBase: new URL(siteUrl),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: profile.name,
		title: `${profile.name} — Frontend & mobile engineer`,
		description: profile.heroLine,
	},
	twitter: {
		card: "summary_large_image" as const,
		title: `${profile.name} — Frontend & mobile engineer`,
		description: profile.heroLine,
	},
};

export function personJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: profile.name,
		url: siteUrl,
		jobTitle: "Frontend & mobile engineer",
		sameAs: [profile.github, profile.linkedin],
		email: `mailto:${profile.email}`,
	};
}
