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
	featured: boolean;
	flagship?: boolean;
	spotlight?: boolean;
};

export const projects: Project[] = [
	{
		slug: "dracania-archives",
		title: "Dracania Archives",
		description:
			"Production web app for Drakensang Online — item database, build tools, and community features used by active players.",
		longDescription:
			"Full-stack Next.js product with search, filtering, and tooling tailored to a live MMO community. My strongest proof of shipping real software beyond coursework.",
		tags: ["Next.js", "React", "TypeScript", "Tailwind"],
		icon: "/projects/icons/dracania-archives.png",
		banner: "/dracania-archives.png",
		href: "https://dracania-archives.com",
		github: "https://github.com/MarcoAntolini",
		featured: true,
		flagship: true,
	},
	{
		slug: "csshub",
		title: "CssHub",
		description:
			"Chrome extension that syncs CSSBattle submissions to your GitHub repo — no copy-paste, every pass becomes a commit.",
		longDescription:
			"Open-source Chrome extension with GitHub OAuth, content scripts on CSSBattle, and automatic commit sync — published on the Chrome Web Store. One of my biggest builds: privacy-first, no server-side battle storage, and every pass lands in a repo you own.",
		tags: ["Chrome extension", "TypeScript", "CSSBattle", "GitHub OAuth"],
		icon: "/projects/icons/csshub.png",
		banner: "/projects/banners/csshub.png",
		href: "https://chromewebstore.google.com/detail/CssHub/oakkijoinjkdhcgnpnmnpjkmpdekajid",
		github: "https://github.com/MarcoAntolini/CSSHub",
		featured: true,
		spotlight: true,
	},
	{
		slug: "flyaway",
		title: "Fly Away",
		description: "Travel agency demo site with Python, Flask, and SQL — full CRUD and templating.",
		tags: ["Python", "Flask", "SQL"],
		icon: "/projects/banners/flyaway.svg",
		banner: "/flyaway.png",
		href: "https://github.com/MarcoAntolini/FlyAway",
		github: "https://github.com/MarcoAntolini/FlyAway",
		featured: false,
	},
	{
		slug: "escape",
		title: "Escape from University",
		description: "Browser game built for a university project — puzzles, progression, and a playful campus escape.",
		tags: ["JavaScript", "HTML", "CSS"],
		icon: "/projects/banners/escape.svg",
		banner: "/escape-from-university.png",
		href: "https://github.com/MarcoAntolini/Escape-from-University",
		github: "https://github.com/MarcoAntolini/Escape-from-University",
		featured: false,
	},
	{
		slug: "memed",
		title: "Memed",
		description: "Meme generator and sharing app — upload, caption, and browse community posts.",
		tags: ["React", "Node.js"],
		icon: "/projects/banners/memed.svg",
		banner: "/projects/banners/memed.svg",
		href: "https://github.com/MarcoAntolini/Memed",
		github: "https://github.com/MarcoAntolini/Memed",
		featured: false,
	},
	{
		slug: "smart-bridge",
		title: "Smart Bridge IoT",
		description: "IoT bridge for sensor data — Arduino hardware talking to a web dashboard.",
		tags: ["IoT", "Arduino", "Sensors"],
		icon: "/projects/banners/smart-bridge.svg",
		banner: "/projects/banners/smart-bridge.svg",
		href: "https://github.com/MarcoAntolini/Smart-Bridge-IOT",
		github: "https://github.com/MarcoAntolini/Smart-Bridge-IOT",
		featured: false,
	},
	{
		slug: "ts-hover",
		title: "ts-hover-prettify",
		description: "VS Code extension that prettifies TypeScript types on hover for faster reading.",
		tags: ["TypeScript", "VS Code extension"],
		icon: "/projects/banners/ts-hover.svg",
		banner: "/projects/banners/ts-hover.svg",
		href: "https://github.com/MarcoAntolini/ts-hover-prettify",
		github: "https://github.com/MarcoAntolini/ts-hover-prettify",
		featured: false,
	},
];

export const flagshipProject = projects.find((p) => p.flagship)!;

export const spotlightProjects = projects.filter((p) => p.spotlight);

export const highlightProjects = projects.filter((p) => p.flagship || p.spotlight);

export function getProjectBySlug(slug: string) {
	return projects.find((p) => p.slug === slug);
}
