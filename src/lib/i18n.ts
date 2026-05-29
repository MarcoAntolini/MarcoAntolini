export const locales = ["en", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
	return locales.some((locale) => locale === value);
}

export function localeFromPathname(pathname: string): Locale {
	return pathname === "/it" || pathname.startsWith("/it/") ? "it" : defaultLocale;
}

export function stripLocalePrefix(pathname: string) {
	if (pathname === "/it") return "/";
	if (pathname.startsWith("/it/")) return pathname.slice(3) || "/";
	return pathname || "/";
}

export function localizedPath(path: string, locale: Locale) {
	const hashIndex = path.indexOf("#");
	const pathname = hashIndex >= 0 ? path.slice(0, hashIndex) || "/" : path || "/";
	const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
	const cleanPath = stripLocalePrefix(pathname);

	if (locale === defaultLocale) {
		return `${cleanPath}${hash}`;
	}

	return cleanPath === "/" ? `/it${hash}` : `/it${cleanPath}${hash}`;
}

export function alternateLocale(locale: Locale): Locale {
	return locale === "en" ? "it" : "en";
}
