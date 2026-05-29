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

export const projects: Project[] = [
	{
		slug: "dracania-archives",
		title: "Dracania Archives",
		description:
			"Archived web app for Drakensang Online — item database, build tools, and community features used by active players.",
		longDescription:
			"Dracania Archives was a community web app for Drakensang Online that helped players search items, explore builds, and access useful game information in one place. It was designed around the way active players plan, compare, and improve their characters.",
		tags: ["Next.js", "TypeScript", "Convex", "Vercel", "Stripe"],
		icon: "/projects/icons/dracania-archives.png",
		banner: "/projects/banners/dracania-archives.png",
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
		icon: "/projects/icons/csshub.png",
		banner: "/projects/banners/csshub.png",
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
		icon: "/projects/icons/fated-encounters.png",
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
		icon: "/projects/icons/ts-hover-prettify.png",
		banner: "/projects/banners/ts-hover.svg",
		href: "https://www.npmjs.com/package/ts-hover-prettify",
		github: "https://github.com/MarcoAntolini/ts-hover-prettify",
		vscode: "https://marketplace.visualstudio.com/items?itemName=marcoantolini.ts-hover-prettify-vscode",
		featured: false,
		workshop: true,
		workshopCta: "View on npm",
	},
];

export const flagshipProject = projects.find((p) => p.flagship)!;

export const spotlightProjects = projects.filter((p) => p.spotlight);

export const highlightProjects = projects.filter((p) => p.flagship || p.spotlight);

export const workshopProjects = projects.filter((p) => p.workshop);

export function getProjectBySlug(slug: string) {
	return projects.find((p) => p.slug === slug);
}
