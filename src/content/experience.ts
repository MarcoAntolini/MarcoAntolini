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
			"Team projects in Java, C#, embedded systems, web, and Swift",
			"Personal focus: frontend architecture, TypeScript, and user-facing quality",
		],
	},
	{
		title: "Project work",
		organization: "Freelance & open source",
		location: "Italy / EU remote",
		period: "2023 — present",
		description:
			"Shipped user-facing work in public—from a live Next.js community product (Dracania Archives) to CssHub on the Chrome Web Store, plus mobile and open-source tooling.",
		highlights: [
			"Open to internships and freelance where I can own real product work from day one",
			"Core strength: frontend and mobile; full-stack when the scope needs it",
		],
	},
];
