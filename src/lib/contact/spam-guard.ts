const SPAM_KEYWORDS = [
	"seo services",
	"buy followers",
	"crypto investment",
	"casino",
	"viagra",
	"click here to claim",
];

const DISPOSABLE_DOMAINS = new Set([
	"mailinator.com",
	"guerrillamail.com",
	"tempmail.com",
	"10minutemail.com",
	"yopmail.com",
	"throwaway.email",
]);

const MIN_SUBMIT_MS = 3000;
const MAX_SUBMIT_MS = 24 * 60 * 60 * 1000;

export type SpamGuardResult = { ok: true } | { ok: false; publicMessage: string };

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateContactFields(
	senderEmail: string,
	message: string,
): SpamGuardResult {
	const trimmedEmail = senderEmail.trim();
	const trimmedMessage = message.trim();

	if (!trimmedEmail || !trimmedMessage) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	if (!isValidEmail(trimmedEmail) || trimmedEmail.length > 254) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	const domain = trimmedEmail.split("@")[1]?.toLowerCase();
	if (domain && DISPOSABLE_DOMAINS.has(domain)) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	return { ok: true };
}

export function checkHoneypot(website: string | null, company: string | null): SpamGuardResult {
	if ((website && website.trim()) || (company && company.trim())) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}
	return { ok: true };
}

export function checkTimeGate(formLoadedAt: string | null): SpamGuardResult {
	if (!formLoadedAt) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	const loadedAt = Number(formLoadedAt);
	if (!Number.isFinite(loadedAt)) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	const elapsed = Date.now() - loadedAt;
	if (elapsed < MIN_SUBMIT_MS || elapsed > MAX_SUBMIT_MS) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	return { ok: true };
}

export function checkContentHeuristics(message: string): SpamGuardResult {
	const lower = message.toLowerCase();
	const urlMatches = message.match(/https?:\/\/|www\./gi);
	if (urlMatches && urlMatches.length > 3) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	if (/(.)\1{8,}/.test(message)) {
		return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
	}

	for (const keyword of SPAM_KEYWORDS) {
		if (lower.includes(keyword)) {
			return { ok: false, publicMessage: "Could not send — try again or reach me on LinkedIn." };
		}
	}

	return { ok: true };
}
