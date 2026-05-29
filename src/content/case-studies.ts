export type CaseStudyHighlight = {
	label: string;
	value: string;
};

export const caseStudySectionOrder = ["problem", "solution", "role", "architecture", "challenges", "stack", "outcomes"] as const;

export type CaseStudySectionId = (typeof caseStudySectionOrder)[number];

export type CaseStudySection = {
	id: CaseStudySectionId;
	title: string;
	body?: string;
	items?: string[];
};

export type CaseStudyTheme = "sand" | "cyan";

export type CaseStudy = {
	slug: string;
	theme: CaseStudyTheme;
	previewDomain: string;
	primaryCtaLabel: string;
	headerSecondaryCta?: { label: string; href: string };
	highlights: CaseStudyHighlight[];
	sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
	{
		slug: "dracania-archives",
		theme: "sand",
		previewDomain: "dracania-archives.com",
		primaryCtaLabel: "Visit live site",
		headerSecondaryCta: { label: "Get in touch", href: "/#contact" },
		highlights: [
			{ label: "Status", value: "Archived project" },
			{ label: "Ownership", value: "Solo, end to end" },
			{ label: "Audience", value: "Drakensang Online community" },
		],
		sections: [
			{
				id: "problem",
				title: "Problem",
				body: "Drakensang Online players needed a fast, searchable item database and tooling beyond scattered wikis and spreadsheets. Community knowledge was hard to browse on mobile and slow to update.",
			},
			{
				id: "solution",
				title: "Solution",
				body: "Dracania Archives brought item data, search, filtering, and player-focused browsing into one dedicated web app, tuned around how the community compared gear and builds while the project was active.",
			},
			{
				id: "role",
				title: "My role",
				body: "Solo builder across product direction, frontend architecture, data modeling, deployment, and iterative UX based on player feedback.",
			},
			{
				id: "architecture",
				title: "Architecture",
				body: "A web app backed by a structured game dataset, with the frontend shaped around quick lookup flows and filter-heavy browsing instead of long wiki-style pages.",
				items: [
					"Typed item records modeled for search, filtering, and comparison",
					"Frontend routes organized around browsing intent rather than raw data categories",
					"Hosted on Vercel with Convex handling persisted data",
					"Stripe integration prepared for premium/community-support flows",
				],
			},
			{
				id: "stack",
				title: "Stack",
				items: [
					"Next.js",
					"React",
					"TypeScript",
					"Tailwind CSS",
					"Shadcn/ui",
					"Vercel",
					"Convex",
					"Stripe",
				],
			},
			{
				id: "challenges",
				title: "Challenges",
				items: [
					"Large, evolving game dataset with search and filter expectations",
					"Balancing feature depth with fast loads on mid-tier devices",
					"Shipping while studying, with tight feedback loops from real users",
				],
			},
			{
				id: "outcomes",
				title: "Outcomes",
				items: [
					"Previously live at dracania-archives.com and used by active Drakensang Online players",
					"Demonstrates end-to-end ownership: design, build, deploy, maintain",
					"Validated search, filtering, and mobile browsing needs through feedback from real players",
				],
			},
		],
	},
	{
		slug: "csshub",
		theme: "cyan",
		previewDomain: "chromewebstore.google.com",
		primaryCtaLabel: "Add to Chrome",
		headerSecondaryCta: {
			label: "View on GitHub",
			href: "https://github.com/MarcoAntolini/CSSHub",
		},
		highlights: [
			{ label: "Status", value: "Published on Chrome Web Store" },
			{ label: "Ownership", value: "Solo, end to end" },
			{ label: "Audience", value: "CSSBattle players" },
		],
		sections: [
			{
				id: "problem",
				title: "Problem",
				body: "CSSBattle players who wanted a GitHub history of their solutions had to copy CSS manually after every pass. The flow was slow, error-prone, and easy to skip once the streak broke.",
			},
			{
				id: "solution",
				title: "Solution",
				body: "CSSHub automatically detects submitted CSSBattle solutions and commits them to GitHub, turning each completed challenge into versioned source history without extra copy-paste work.",
			},
			{
				id: "role",
				title: "My role",
				body: "Solo builder across extension architecture, GitHub integration, popup UX, store listing, privacy disclosures, and release management.",
			},
			{
				id: "architecture",
				title: "Architecture",
				body: "A Manifest V3 extension scoped to CSSBattle play pages, paired with a Vercel backend for GitHub web OAuth so the client secret stays off-device.",
				items: [
					"Content script detects submitted challenge solutions on cssbattle.dev",
					"Service worker coordinates automatic GitHub API commits",
					"Backend handles OAuth callbacks and token exchange for GitHub sign-in",
					"OAuth via a small helper, with the token kept in session storage on device",
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
					"Chrome Web Store review, including permissions, privacy policy, and limited-use disclosure",
					"Shipping polished UX in a tiny popup surface",
				],
			},
			{
				id: "stack",
				title: "Stack",
				items: ["Chrome Extension MV3", "React", "TypeScript", "Vite", "Zod", "GitHub API", "Vercel", "Upstash Redis"],
			},
			{
				id: "outcomes",
				title: "Outcomes",
				items: [
					"Published on the Chrome Web Store (v1.0.1)",
					"Privacy-first, with no analytics and no CssHub-side battle storage",
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
