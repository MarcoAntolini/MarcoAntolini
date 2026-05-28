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

export type CaseStudyTheme = "emerald" | "fuchsia";

export type CaseStudy = {
	slug: string;
	theme: CaseStudyTheme;
	previewDomain: string;
	primaryCtaLabel: string;
	headerSecondaryCta?: { label: string; href: string };
	footer: {
		eyebrow: string;
		title: string;
		description: string;
		ctaLabel: string;
	};
	highlights: CaseStudyHighlight[];
	sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
	{
		slug: "dracania-archives",
		theme: "emerald",
		previewDomain: "dracania-archives.com",
		primaryCtaLabel: "Visit live site",
		headerSecondaryCta: { label: "Get in touch", href: "/#contact" },
		footer: {
			eyebrow: "Next step",
			title: "Want to dig into the live product?",
			description: "Explore search, filters, and community tooling on the production deployment.",
			ctaLabel: "Open Dracania Archives",
		},
		highlights: [
			{ label: "Status", value: "Live in production" },
			{ label: "Ownership", value: "Solo — end to end" },
			{ label: "Audience", value: "Drakensang Online players" },
		],
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
		],
	},
	{
		slug: "csshub",
		theme: "fuchsia",
		previewDomain: "chromewebstore.google.com",
		primaryCtaLabel: "Add to Chrome",
		headerSecondaryCta: {
			label: "View on GitHub",
			href: "https://github.com/MarcoAntolini/CSSHub",
		},
		footer: {
			eyebrow: "Next step",
			title: "Want to sync your next pass?",
			description: "Install CssHub from the Chrome Web Store and push CSSBattle solutions to a repo you own.",
			ctaLabel: "Add to Chrome",
		},
		highlights: [
			{ label: "Status", value: "Published on Chrome Web Store" },
			{ label: "Ownership", value: "Solo — end to end" },
			{ label: "Scope", value: "CSSBattle + GitHub only" },
		],
		sections: [
			{
				id: "problem",
				title: "Problem",
				body: "CSSBattle players who wanted a GitHub history of their solutions had to copy CSS manually after every pass — slow, error-prone, and easy to skip once the streak broke.",
			},
			{
				id: "architecture",
				title: "Architecture",
				body: "A Manifest V3 extension scoped to CSSBattle play pages, with a popup for GitHub sign-in, repo/branch selection, and sync controls.",
				items: [
					"Content script reads solution state on cssbattle.dev",
					"Service worker coordinates GitHub API commits",
					"OAuth via a small helper — token kept in session storage on device",
					"Settings and activity log in local extension storage",
					"TypeScript throughout, open source on GitHub",
				],
			},
			{
				id: "challenges",
				title: "Challenges",
				items: [
					"GitHub OAuth inside an extension without exposing tokens",
					"Reliable DOM hooks as CSSBattle pages evolve",
					"Chrome Web Store review — permissions, privacy policy, and limited-use disclosure",
					"Shipping polished UX in a tiny popup surface",
				],
			},
			{
				id: "outcomes",
				title: "Outcomes",
				items: [
					"Published on the Chrome Web Store (v1.0.1)",
					"Privacy-first — no analytics, no CssHub-side battle storage",
					"Demonstrates extension architecture, API integration, and store submission",
				],
			},
		],
	},
];

export const caseStudySlugs = caseStudies.map((study) => study.slug);

export function getCaseStudyBySlug(slug: string) {
	return caseStudies.find((study) => study.slug === slug);
}

export function hasCaseStudy(slug: string) {
	return caseStudySlugs.includes(slug);
}
