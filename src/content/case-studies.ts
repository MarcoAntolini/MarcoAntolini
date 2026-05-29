import { defaultLocale, type Locale } from "@/lib/i18n";

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

export const caseStudiesByLocale = {
	en: [
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
	],
	it: [
		{
			slug: "dracania-archives",
			theme: "sand",
			previewDomain: "dracania-archives.com",
			primaryCtaLabel: "Visita il sito live",
			headerSecondaryCta: { label: "Scrivimi", href: "/#contact" },
			highlights: [
				{ label: "Stato", value: "Progetto archiviato" },
				{ label: "Ownership", value: "Solo, end to end" },
				{ label: "Pubblico", value: "Community di Drakensang Online" },
			],
			sections: [
				{
					id: "problem",
					title: "Problema",
					body: "I giocatori di Drakensang Online avevano bisogno di un database oggetti veloce e ricercabile, oltre a strumenti migliori rispetto a wiki sparse e fogli di calcolo. La conoscenza della community era difficile da consultare su mobile e lenta da aggiornare.",
				},
				{
					id: "solution",
					title: "Soluzione",
					body: "Dracania Archives ha portato dati sugli oggetti, ricerca, filtri e navigazione pensata per i player in una web app dedicata, tarata sul modo in cui la community confrontava equipaggiamento e build mentre il progetto era attivo.",
				},
				{
					id: "role",
					title: "Il mio ruolo",
					body: "Solo builder su direzione prodotto, architettura frontend, modellazione dati, deploy e iterazioni UX basate sui feedback dei giocatori.",
				},
				{
					id: "architecture",
					title: "Architettura",
					body: "Una web app basata su un dataset di gioco strutturato, con frontend progettato intorno a flussi di consultazione rapida e browsing con molti filtri invece di lunghe pagine in stile wiki.",
					items: [
						"Record oggetti tipizzati per ricerca, filtri e confronto",
						"Route frontend organizzate intorno all'intento di navigazione, non alle categorie grezze dei dati",
						"Hosting su Vercel con Convex per i dati persistenti",
						"Integrazione Stripe preparata per flussi premium o di supporto community",
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
					title: "Sfide",
					items: [
						"Dataset di gioco ampio e in evoluzione, con aspettative forti su ricerca e filtri",
						"Bilanciare profondità funzionale e caricamenti rapidi su dispositivi medi",
						"Spedire mentre studiavo, con feedback loop stretti da utenti reali",
					],
				},
				{
					id: "outcomes",
					title: "Risultati",
					items: [
						"Precedentemente live su dracania-archives.com e usato da giocatori attivi di Drakensang Online",
						"Dimostra ownership end-to-end: design, sviluppo, deploy e manutenzione",
						"Ha validato bisogni reali di ricerca, filtri e navigazione mobile tramite feedback dei player",
					],
				},
			],
		},
		{
			slug: "csshub",
			theme: "cyan",
			previewDomain: "chromewebstore.google.com",
			primaryCtaLabel: "Aggiungi a Chrome",
			headerSecondaryCta: {
				label: "Vedi su GitHub",
				href: "https://github.com/MarcoAntolini/CSSHub",
			},
			highlights: [
				{ label: "Stato", value: "Pubblicato sul Chrome Web Store" },
				{ label: "Ownership", value: "Solo, end to end" },
				{ label: "Pubblico", value: "Giocatori CSSBattle" },
			],
			sections: [
				{
					id: "problem",
					title: "Problema",
					body: "I giocatori CSSBattle che volevano uno storico GitHub delle soluzioni dovevano copiare il CSS manualmente dopo ogni pass. Il flusso era lento, facile da sbagliare e semplice da abbandonare appena si interrompeva la streak.",
				},
				{
					id: "solution",
					title: "Soluzione",
					body: "CSSHub rileva automaticamente le soluzioni CSSBattle inviate e le committa su GitHub, trasformando ogni challenge completata in cronologia versionata senza copia-incolla extra.",
				},
				{
					id: "role",
					title: "Il mio ruolo",
					body: "Solo builder su architettura dell'estensione, integrazione GitHub, UX del popup, listing dello store, privacy disclosure e release management.",
				},
				{
					id: "architecture",
					title: "Architettura",
					body: "Un'estensione Manifest V3 limitata alle pagine di gioco CSSBattle, affiancata da un backend Vercel per GitHub web OAuth così il client secret resta fuori dal dispositivo.",
					items: [
						"Content script che rileva le soluzioni inviate su cssbattle.dev",
						"Service worker che coordina commit automatici tramite GitHub API",
						"Backend per callback OAuth e scambio token del login GitHub",
						"OAuth tramite helper leggero, con token mantenuto in session storage sul dispositivo",
						"Impostazioni e activity log nello storage locale dell'estensione",
						"TypeScript ovunque, open source su GitHub",
					],
				},
				{
					id: "challenges",
					title: "Sfide",
					items: [
						"GitHub OAuth dentro un'estensione senza esporre token",
						"Hook DOM affidabili mentre le pagine CSSBattle evolvono",
						"Review del Chrome Web Store, incluse permission, privacy policy e limited-use disclosure",
						"Spedire una UX curata in una superficie piccola come un popup",
					],
				},
				{
					id: "stack",
					title: "Stack",
					items: ["Chrome Extension MV3", "React", "TypeScript", "Vite", "Zod", "GitHub API", "Vercel", "Upstash Redis"],
				},
				{
					id: "outcomes",
					title: "Risultati",
					items: [
						"Pubblicato sul Chrome Web Store (v1.0.1)",
						"Privacy-first, senza analytics e senza storage delle battle lato CssHub",
						"Dimostra architettura extension, integrazione API e submission allo store",
					],
				},
			],
		},
	],
} satisfies Record<Locale, CaseStudy[]>;

export const caseStudies = caseStudiesByLocale[defaultLocale];

export const caseStudySlugs = caseStudies.map((study) => study.slug);

export function getCaseStudies(locale: Locale = defaultLocale) {
	return caseStudiesByLocale[locale];
}

export function getCaseStudySlugs(locale: Locale = defaultLocale) {
	return getCaseStudies(locale).map((study) => study.slug);
}

export function getCaseStudyBySlug(slug: string, locale: Locale = defaultLocale) {
	return getCaseStudies(locale).find((study) => study.slug === slug);
}

export function hasCaseStudy(slug: string, locale: Locale = defaultLocale) {
	return getCaseStudySlugs(locale).includes(slug);
}
