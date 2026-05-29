/** Normalizes em/en dashes in prose and date ranges at render time. */

/** Prose: turn dash separators into commas (e.g. "CssHub — Chrome Web Store" -> "CssHub, Chrome Web Store"). */
export function tidy(input: string): string {
	return input
		.replace(/\s*[\u2014\u2013]\s*/g, ", ")
		.replace(/,\s*,/g, ",")
		.replace(/\s{2,}/g, " ")
		.trim();
}

/** Date ranges: turn dashes into hyphens (e.g. "2021 — present" -> "2021 - present"). */
export function tidyRange(input: string): string {
	return input.replace(/\s*[\u2014\u2013]\s*/g, " - ").trim();
}
