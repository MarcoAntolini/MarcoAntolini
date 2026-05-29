import { defaultLocale, type Locale } from "@/lib/i18n";

export const profiles = {
	en: {
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
		location: "Forlì-Cesena, Italy",
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
	},
	it: {
		name: "Marco Antolini",
		title: "Frontend & mobile engineer",
		heroLine:
			"Studente di Informatica presso l'Università di Bologna (Cesena). Realizzo prodotti web e mobile con attenzione a performance, accessibilità e cura dei dettagli.",
		rotatingFocus: ["interfacce web", "app mobile", "prodotti Next.js", "tool open source"],
		signature: "marco@unibo · shipping da Cesena",
		interests: [
			{ label: "Game UX", detail: "Dracania Archives mi ha insegnato il product design orientato alla community" },
			{ label: "Performance", detail: "Core Web Vitals e motion fluido a 60fps su dispositivi reali" },
			{ label: "Open source", detail: "CssHub sul Chrome Web Store — GitHub OAuth, content script, pubblicato in pubblico" },
		],
		availability: "Disponibile per stage e freelance · frontend, mobile o full-stack",
		availabilityStatus: {
			label: "Disponibile",
			engagement: "Stage e freelance",
			roles: ["Frontend", "Mobile", "Full-stack"],
		},
		responseTime: {
			label: "Tempo di risposta",
			detail: "Di solito entro un giorno lavorativo",
		},
		location: "Forlì-Cesena, Italia",
		email: "marcoantolini.dev@gmail.com",
		linkedin: "https://www.linkedin.com/in/marcoantolinidev",
		github: "https://github.com/MarcoAntolini",
		githubUsername: "MarcoAntolini",
		about: [
			"Studente di Ingegneria e Scienze Informatiche all'Università di Bologna (campus di Cesena), con focus su interfacce web e mobile curate e pronte per utenti reali.",
			"Lavoro con mentalità da product team: pensiero chiaro, standard alti e priorità a ciò che vale la pena spedire. Mi interessa il quadro completo: come un prodotto si usa, quanto è solido e quanto facilmente un'altra persona può prenderlo in mano senza difficoltà. È questo che mi distingue: non tratto i progetti come semplici esercizi, ma come lavoro che porta già il mio nome.",
			"Sono aperto a stage e lavori freelance dove posso contribuire a prodotti reali fin dal primo giorno.",
		],
		proofStrip: [
			{ label: "Flagship", value: "Dracania Archives — prodotto live" },
			{ label: "Pubblicato", value: "CssHub — Chrome Web Store" },
			{ label: "Formazione", value: "UNIBO — Computer Science & Engineering" },
			{ label: "Focus", value: "Frontend · mobile · performance" },
		],
	},
} as const;

export type Profile = (typeof profiles)[Locale];

export const profile = profiles[defaultLocale];

export function getProfile(locale: Locale = defaultLocale) {
	return profiles[locale];
}
