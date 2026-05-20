export type ExperienceItem = {
	title: string;
	organization: string;
	location: string;
	period: string;
	description: string;
	highlights?: string[];
};

export const experience: ExperienceItem[] = [
	{
		title: "B.Sc. Computer Science & Engineering",
		organization: "University of Bologna",
		location: "Cesena, Italy",
		period: "2021 — present",
		description:
			"Coursework spanning algorithms, systems, databases, and software engineering with hands-on projects in web, mobile, and IoT.",
		highlights: [
			"Focus on frontend architecture, TypeScript, and user-facing quality",
			"Team projects across React, Flutter, and embedded systems",
		],
	},
	{
		title: "Independent product development",
		organization: "Dracania Archives",
		location: "Remote",
		period: "2023 — present",
		description:
			"Designed and shipped a production Next.js app serving the Drakensang Online community — search, data modeling, and iterative UX based on player feedback.",
		highlights: [
			"Owns frontend, API integration, and deployment",
			"Live at dracania-archives.com with ongoing maintenance",
		],
	},
	{
		title: "Seeking software engineering internship",
		organization: "Open roles",
		location: "Italy / EU remote",
		period: "2025 — 2026",
		description:
			"Looking for an internship where I can contribute to React/Next.js or Flutter product work alongside experienced engineers.",
		highlights: [
			"Comfortable across the stack when the team needs it",
			"Strongest fit: frontend & mobile with full-stack depth",
		],
	},
];
