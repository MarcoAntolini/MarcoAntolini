export type Project = {
	slug: string;
	title: string;
	description: string;
	longDescription?: string;
	tags: string[];
	image: string;
	href: string;
	github?: string;
	featured: boolean;
	flagship?: boolean;
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
		image: "/dracania-archives.png",
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
		tags: ["Chrome extension", "TypeScript", "CSSBattle"],
		image: "/projects/csshub.svg",
		href: "https://chromewebstore.google.com/detail/csshub/jafemcjfpjjdbcfjjfohjfglckbkjbbp",
		github: "https://github.com/MarcoAntolini/CSSHub",
		featured: true,
	},
	{
		slug: "flyaway",
		title: "Fly Away",
		description: "Travel agency demo site with Python, Flask, and SQL — full CRUD and templating.",
		tags: ["Python", "Flask", "SQL"],
		image: "/projects/flyaway.svg",
		href: "https://github.com/MarcoAntolini/FlyAway",
		github: "https://github.com/MarcoAntolini/FlyAway",
		featured: false,
	},
];

export const flagshipProject = projects.find((p) => p.flagship)!;

export function getProjectBySlug(slug: string) {
	return projects.find((p) => p.slug === slug);
}
