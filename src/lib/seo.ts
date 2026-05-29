import { getProfile, profile } from "@/content/profile";
import { getSiteCopy } from "@/content/site-copy";
import type { Locale } from "@/lib/i18n";

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

export function personJsonLd(locale: Locale = "en") {
	const localizedProfile = getProfile(locale);
	const copy = getSiteCopy(locale);

	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: localizedProfile.name,
		url: siteUrl,
		jobTitle: copy.meta.title,
		sameAs: [localizedProfile.github, localizedProfile.linkedin],
		email: `mailto:${localizedProfile.email}`,
	};
}
