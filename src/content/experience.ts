import { defaultLocale, type Locale } from "@/lib/i18n";

export type ExperienceItem = {
	title: string;
	organization: string;
	location: string;
	period: string;
	description: string;
	highlights?: string[];
};

export const experienceByLocale = {
	en: [
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
	],
	it: [
		{
			title: "Laurea in Ingegneria e Scienze Informatiche",
			organization: "Università di Bologna",
			location: "Cesena, Italia",
			period: "2021 — presente",
			description:
				"Percorso su algoritmi, sistemi, database e ingegneria del software, con progetti pratici su web, mobile e IoT.",
			highlights: [
				"Progetti di gruppo in Java, C#, sistemi embedded, web e Swift",
				"Focus personale: architettura frontend, TypeScript e qualità percepita dall'utente",
			],
		},
		{
			title: "Lavoro autonomo",
			organization: "Freelance e open source",
			location: "Italia / remoto EU",
			period: "2023 — presente",
			description:
				"Ho pubblicato lavori user-facing in pubblico: da un prodotto community live in Next.js (Dracania Archives) a CssHub sul Chrome Web Store, più mobile e tooling open source.",
			highlights: [
				"Aperto a stage e freelance dove posso prendermi ownership di prodotto reale fin dal primo giorno",
				"Punto forte: frontend e mobile; full-stack quando lo scope lo richiede",
			],
		},
	],
} satisfies Record<Locale, ExperienceItem[]>;

export const experience = experienceByLocale[defaultLocale];

export function getExperience(locale: Locale = defaultLocale) {
	return experienceByLocale[locale];
}
