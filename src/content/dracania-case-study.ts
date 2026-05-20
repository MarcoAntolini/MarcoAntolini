export type CaseStudyHighlight = {
	label: string;
	value: string;
};

export type CaseStudySection = {
	id: string;
	title: string;
	body?: string;
	items?: string[];
};

export const dracaniaCaseStudy = {
	highlights: [
		{ label: "Status", value: "Live in production" },
		{ label: "Ownership", value: "Solo — end to end" },
		{ label: "Audience", value: "Drakensang Online players" },
	] satisfies CaseStudyHighlight[],
	sections: [
		{
			id: "problem",
			title: "Problem",
			body: "Drakensang Online players needed a fast, searchable item database and tooling beyond scattered wikis and spreadsheets. Community knowledge was hard to browse on mobile and slow to update.",
		},
		{
			id: "role",
			title: "Role",
			body: "Solo builder — product direction, frontend architecture, data modeling, deployment, and iterative UX based on player feedback.",
		},
		{
			id: "stack",
			title: "Stack",
			items: [
				"Next.js",
				"React",
				"TypeScript",
				"Tailwind CSS",
				"Vercel hosting",
				"Performance-focused React patterns",
			],
		},
		{
			id: "challenges",
			title: "Challenges",
			items: [
				"Large, evolving game dataset with search and filter expectations",
				"Balancing feature depth with fast loads on mid-tier devices",
				"Shipping while studying — tight feedback loops with real users",
			],
		},
		{
			id: "outcomes",
			title: "Outcomes",
			items: [
				"Live production app at dracania-archives.com used by active players",
				"Demonstrates end-to-end ownership: design, build, deploy, maintain",
				"Strongest portfolio proof for frontend internship applications",
			],
		},
	] satisfies CaseStudySection[],
};
