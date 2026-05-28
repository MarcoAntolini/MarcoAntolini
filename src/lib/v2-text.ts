/*
 * v2 surface text tidier.
 * Reuses the shared content verbatim but normalizes em/en dashes at render time
 * so the v2 design stays em-dash-free without mutating the data v1 depends on.
 */

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
