export const profile = {
	name: "Marco Antolini",
	title: "Frontend & mobile engineer",
	heroLine:
		"Computer Science student at UNIBO. I ship web and mobile products with a focus on performance, accessibility, and polish.",
	rotatingFocus: ["web interfaces", "mobile apps", "Next.js products", "open-source tools"],
	signature: "marco@unibo · shipping from Cesena",
	interests: [
		{ label: "Game UX", detail: "Dracania Archives taught me community-first product design" },
		{ label: "Performance", detail: "Core Web Vitals and smooth 60fps motion on real devices" },
		{ label: "Open source", detail: "CssHub on the Chrome Web Store — GitHub OAuth, content scripts, shipped in public" },
	],
	availability: "Open to internships & freelance · frontend, mobile, or full-stack",
	availabilityStatus: {
		label: "Available",
		engagement: "Internships & freelance",
		roles: ["Frontend", "Mobile", "Full-stack"],
	},
	responseTime: {
		label: "Response time",
		detail: "Usually within a working day",
	},
	location: "Forlì-Cesena, Italy · University of Bologna (Cesena)",
	email: "marcoantolini.dev@gmail.com",
	linkedin: "https://www.linkedin.com/in/marcoantolinidev",
	github: "https://github.com/MarcoAntolini",
	githubUsername: "MarcoAntolini",
	about: [
		"Computer Science & Engineering student at the University of Bologna (Cesena campus), focused on shipping polished web and mobile interfaces.",
		"I work with a product-team mindset — clear thinking, high standards, and a bias toward shipping what matters. I care about the full picture: how something feels to use, how reliably it's built, and whether a teammate could pick it up without friction. That's what sets me apart — I don't treat projects as exercises; I treat them like work that already has my name on it.",
		"Open to internships and freelance work where I can contribute to real product work from day one.",
	],
	proofStrip: [
		{ label: "Flagship", value: "Dracania Archives — live product" },
		{ label: "Published", value: "CssHub — Chrome Web Store" },
		{ label: "Education", value: "UNIBO — Computer Science & Engineering" },
		{ label: "Focus", value: "Frontend · mobile · performance" },
	],
} as const;
