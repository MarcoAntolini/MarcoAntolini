import { defaultLocale, type Locale } from "@/lib/i18n";

export type Project = {
	slug: string;
	title: string;
	description: string;
	longDescription?: string;
	tags: string[];
	/** Square mark — `/projects/icons/` (preferred) or banner fallback for older projects */
	icon: string;
	/** Wide preview — screenshots at `/` or artwork in `/projects/banners/` */
	banner: string;
	href: string;
	github?: string;
	vscode?: string;
	live?: boolean;
	featured: boolean;
	flagship?: boolean;
	spotlight?: boolean;
	/** Shown in the workshop slot below selected work */
	workshop?: boolean;
	/** Primary CTA label for workshop cards */
	workshopCta?: string;
};

export const projectsByLocale = {
	en: [
		{
			slug: "dracania-archives",
			title: "Dracania Archives",
			description:
				"Archived web app for Drakensang Online — item database, build tools, and community features used by active players.",
			longDescription:
				"Dracania Archives was a community web app for Drakensang Online that helped players search items, explore builds, and access useful game information in one place. It was designed around the way active players plan, compare, and improve their characters.",
			tags: ["Next.js", "TypeScript", "Convex", "Vercel", "Stripe"],
			icon: "/projects/icons/dracania-archives.webp",
			banner: "/projects/banners/dracania-archives.webp",
			href: "https://dracania-archives.com",
			github: "https://github.com/MarcoAntolini",
			live: false,
			featured: true,
			flagship: true,
		},
		{
			slug: "csshub",
			title: "CssHub",
			description:
				"Chrome extension that syncs CSSBattle submissions to your GitHub repo — no copy-paste, every pass becomes a commit.",
			longDescription:
				"CssHub is an open-source Chrome extension that automatically saves CSSBattle solutions directly to a GitHub repository you control. It removes the copy-paste step, keeps your progress backed up, and is available on the Chrome Web Store.",
			tags: ["Chrome Extension", "TypeScript", "GitHub API", "OAuth", "Manifest V3"],
			icon: "/projects/icons/csshub.webp",
			banner: "/projects/banners/csshub.webp",
			href: "https://chromewebstore.google.com/detail/CssHub/oakkijoinjkdhcgnpnmnpjkmpdekajid",
			github: "https://github.com/MarcoAntolini/CSSHub",
			featured: true,
			spotlight: true,
		},
		{
			slug: "fated-encounters",
			title: "Fated Encounters",
			description: "A Hades II mod that lets you influence which NPCs you run into.",
			longDescription:
				"A Hades II mod that gives you more control over NPC encounters — so you can shape who shows up during a run.",
			tags: ["Hades II mod", "Lua", "Thunderstore"],
			icon: "/projects/icons/fated-encounters.webp",
			banner: "/projects/banners/fated-encounters.png",
			href: "https://thunderstore.io/c/hades-ii/p/MarcoAntolini/FatedEncounters/",
			github: "https://github.com/MarcoAntolini/Fated-Encounters",
			featured: false,
			workshop: true,
			workshopCta: "Install on Thunderstore",
		},
		{
			slug: "ts-hover",
			title: "ts-hover-prettify",
			description: "VS Code extension that prettifies TypeScript types on hover for faster reading.",
			longDescription:
				"Open-source VS Code extension and npm package that formats dense TypeScript hover types into readable, indented blocks so you spend less time decoding signatures.",
			tags: ["TypeScript", "VS Code extension", "npm package"],
			icon: "/projects/icons/ts-hover-prettify.webp",
			banner: "/projects/banners/ts-hover.svg",
			href: "https://www.npmjs.com/package/ts-hover-prettify",
			github: "https://github.com/MarcoAntolini/ts-hover-prettify",
			vscode: "https://marketplace.visualstudio.com/items?itemName=marcoantolini.ts-hover-prettify-vscode",
			featured: false,
			workshop: true,
			workshopCta: "View on npm",
		},
	],
	it: [
		{
			slug: "dracania-archives",
			title: "Dracania Archives",
			description:
				"Web app archiviata per Drakensang Online: database oggetti, strumenti per build e funzionalità community usate da giocatori attivi.",
			longDescription:
				"Dracania Archives era una web app community per Drakensang Online che aiutava i giocatori a cercare oggetti, esplorare build e trovare informazioni utili in un unico posto. È stata progettata intorno al modo in cui i player attivi pianificano, confrontano e migliorano i propri personaggi.",
			tags: ["Next.js", "TypeScript", "Convex", "Vercel", "Stripe"],
			icon: "/projects/icons/dracania-archives.webp",
			banner: "/projects/banners/dracania-archives.webp",
			href: "https://dracania-archives.com",
			github: "https://github.com/MarcoAntolini",
			live: false,
			featured: true,
			flagship: true,
		},
		{
			slug: "csshub",
			title: "CssHub",
			description:
				"Estensione Chrome che sincronizza le submission CSSBattle su GitHub: niente copia-incolla, ogni pass diventa un commit.",
			longDescription:
				"CssHub è un'estensione Chrome open source che salva automaticamente le soluzioni CSSBattle direttamente in una repository GitHub sotto il tuo controllo. Elimina il copia-incolla, mantiene il progresso salvato ed è disponibile sul Chrome Web Store.",
			tags: ["Chrome Extension", "TypeScript", "GitHub API", "OAuth", "Manifest V3"],
			icon: "/projects/icons/csshub.webp",
			banner: "/projects/banners/csshub.webp",
			href: "https://chromewebstore.google.com/detail/CssHub/oakkijoinjkdhcgnpnmnpjkmpdekajid",
			github: "https://github.com/MarcoAntolini/CSSHub",
			featured: true,
			spotlight: true,
		},
		{
			slug: "fated-encounters",
			title: "Fated Encounters",
			description: "Una mod per Hades II che ti permette di influenzare quali NPC incontri.",
			longDescription:
				"Una mod per Hades II che dà più controllo sugli incontri con gli NPC, così puoi influenzare chi appare durante una run.",
			tags: ["Hades II mod", "Lua", "Thunderstore"],
			icon: "/projects/icons/fated-encounters.webp",
			banner: "/projects/banners/fated-encounters.png",
			href: "https://thunderstore.io/c/hades-ii/p/MarcoAntolini/FatedEncounters/",
			github: "https://github.com/MarcoAntolini/Fated-Encounters",
			featured: false,
			workshop: true,
			workshopCta: "Installa su Thunderstore",
		},
		{
			slug: "ts-hover",
			title: "ts-hover-prettify",
			description: "Estensione VS Code che rende più leggibili i tipi TypeScript mostrati in hover.",
			longDescription:
				"Estensione VS Code e pacchetto npm open source che formatta tipi TypeScript densi in blocchi indentati e leggibili, così passi meno tempo a decifrare le signature.",
			tags: ["TypeScript", "VS Code extension", "npm package"],
			icon: "/projects/icons/ts-hover-prettify.webp",
			banner: "/projects/banners/ts-hover.svg",
			href: "https://www.npmjs.com/package/ts-hover-prettify",
			github: "https://github.com/MarcoAntolini/ts-hover-prettify",
			vscode: "https://marketplace.visualstudio.com/items?itemName=marcoantolini.ts-hover-prettify-vscode",
			featured: false,
			workshop: true,
			workshopCta: "Vedi su npm",
		},
	],
} satisfies Record<Locale, Project[]>;

export const projects = projectsByLocale[defaultLocale];

export const flagshipProject = projects.find((p) => p.flagship)!;

export const spotlightProjects = projects.filter((p) => p.spotlight);

export const highlightProjects = projects.filter((p) => p.flagship || p.spotlight);

export const workshopProjects = projects.filter((p) => p.workshop);

export function getProjects(locale: Locale = defaultLocale) {
	return projectsByLocale[locale];
}

export function getFlagshipProject(locale: Locale = defaultLocale) {
	return getProjects(locale).find((p) => p.flagship)!;
}

export function getSpotlightProjects(locale: Locale = defaultLocale) {
	return getProjects(locale).filter((p) => p.spotlight);
}

export function getHighlightProjects(locale: Locale = defaultLocale) {
	return getProjects(locale).filter((p) => p.flagship || p.spotlight);
}

export function getWorkshopProjects(locale: Locale = defaultLocale) {
	return getProjects(locale).filter((p) => p.workshop);
}

export function getProjectBySlug(slug: string, locale: Locale = defaultLocale) {
	return getProjects(locale).find((p) => p.slug === slug);
}
