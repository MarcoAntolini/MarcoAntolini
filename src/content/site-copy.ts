import { defaultLocale, type Locale } from "@/lib/i18n";

export const siteCopy = {
	en: {
		meta: {
			title: "Frontend & mobile engineer",
			caseStudySuffix: "Case study",
		},
		skipToContent: "Skip to content",
		header: {
			nav: [
				{ href: "/#work", label: "Work", sectionId: "work" },
				{ href: "/#experience", label: "Experience", sectionId: "experience" },
				{ href: "/#skills", label: "Skills", sectionId: "skills" },
				{ href: "/#about", label: "About", sectionId: "about" },
				{ href: "/#contact", label: "Contact", sectionId: "contact" },
			],
			contactCta: "Contact me",
			mobileCta: "Get in touch",
			languageLabel: "Portfolio language",
			languageNames: {
				en: "English",
				it: "Italian",
			},
			logoHomeLabel: "Scroll to top",
			logoBackLabel: "Back to",
			openMenu: "Open menu",
			closeMenu: "Close menu",
		},
		hero: {
			primaryCta: "Start a conversation",
			portraitAlt: "Portrait of",
		},
		work: {
			heading: "Products shipped to real users.",
			visit: "Visit",
			readCaseStudy: "Read case study",
			viewProject: "View project",
			previewAlt: "preview",
		},
		workshop: {
			heading: "Smaller builds and side projects",
			stackLabel: "Stack",
			viewProject: "View project",
			vscode: "VS Code extension",
		},
		experience: {
			heading: "Where I've been building",
		},
		skills: {
			heading: "Skills and stack",
		},
		about: {
			heading: "I'd rather ship than theorize.",
			activityLabel: "Current activity and availability",
			activityCommand: "activity",
			statusCommand: "status",
			building: ["shipping web & mobile interfaces", "open-source tooling & side projects"],
		},
		contact: {
			heading: "Let's build something together.",
			introSuffix: "Send a message or reach out on LinkedIn. I reply to every serious inquiry.",
			linkedinLabel: "LinkedIn profile",
			emailLabel: "Your email",
			emailPlaceholder: "you@company.com",
			messageLabel: "Message",
			messagePlaceholder: "What are you building, and how can I help?",
			sendingStatus: "Sending your message...",
			success: "Message sent. I'll get back to you soon.",
			submit: "Send message",
			submitting: "Sending...",
		},
		caseStudy: {
			back: "Back to portfolio",
			label: "Case study",
			next: "Next case study",
			view: "View case study",
			tools: "tools",
		},
		footer: {
			location: "Forli-Cesena, Italy",
		},
	},
	it: {
		meta: {
			title: "Frontend & mobile engineer",
			caseStudySuffix: "Case study",
		},
		skipToContent: "Salta al contenuto",
		header: {
			nav: [
				{ href: "/#work", label: "Lavori", sectionId: "work" },
				{ href: "/#experience", label: "Percorso", sectionId: "experience" },
				{ href: "/#skills", label: "Competenze", sectionId: "skills" },
				{ href: "/#about", label: "Chi sono", sectionId: "about" },
				{ href: "/#contact", label: "Contatti", sectionId: "contact" },
			],
			contactCta: "Contattami",
			mobileCta: "Scrivimi",
			languageLabel: "Lingua del portfolio",
			languageNames: {
				en: "Inglese",
				it: "Italiano",
			},
			logoHomeLabel: "Torna all'inizio",
			logoBackLabel: "Torna a",
			openMenu: "Apri menu",
			closeMenu: "Chiudi menu",
		},
		hero: {
			primaryCta: "Iniziamo a parlare",
			portraitAlt: "Ritratto di",
		},
		work: {
			heading: "Prodotti pubblicati per utenti reali.",
			visit: "Visita",
			readCaseStudy: "Leggi il case study",
			viewProject: "Vedi progetto",
			previewAlt: "anteprima",
		},
		workshop: {
			heading: "Build più piccoli e side project",
			stackLabel: "Stack",
			viewProject: "Vedi progetto",
			vscode: "Estensione VS Code",
		},
		experience: {
			heading: "Dove ho costruito esperienza",
		},
		skills: {
			heading: "Competenze e stack",
		},
		about: {
			heading: "Preferisco realizzare che teorizzare.",
			activityLabel: "Attività corrente e disponibilità",
			activityCommand: "attivita",
			statusCommand: "stato",
			building: ["interfacce web e mobile", "tool open source e side project"],
		},
		contact: {
			heading: "Costruiamo qualcosa insieme.",
			introSuffix: "Mandami un messaggio o scrivimi su LinkedIn. Rispondo a ogni richiesta seria.",
			linkedinLabel: "Profilo LinkedIn",
			emailLabel: "La tua email",
			emailPlaceholder: "tu@azienda.com",
			messageLabel: "Messaggio",
			messagePlaceholder: "Cosa stai costruendo e come posso aiutarti?",
			sendingStatus: "Invio del messaggio in corso...",
			success: "Messaggio inviato. Ti risponderò presto.",
			submit: "Invia messaggio",
			submitting: "Invio...",
		},
		caseStudy: {
			back: "Torna al portfolio",
			label: "Case study",
			next: "Prossimo case study",
			view: "Vedi case study",
			tools: "strumenti",
		},
		footer: {
			location: "Forli-Cesena, Italia",
		},
	},
} as const;

export type SiteCopy = (typeof siteCopy)[Locale];

export function getSiteCopy(locale: Locale = defaultLocale) {
	return siteCopy[locale];
}
