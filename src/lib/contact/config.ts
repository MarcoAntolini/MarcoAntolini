export type ContactDevMode = "log" | "send";

const appEnv = import.meta.env.PUBLIC_APP_ENV ?? "production";

export const isDevelopment = import.meta.env.DEV || appEnv === "development";

export const contactDevMode: ContactDevMode =
	(import.meta.env.CONTACT_DEV_MODE as ContactDevMode) ?? (isDevelopment ? "log" : "send");

export const rateLimitEnabled =
	import.meta.env.RATE_LIMIT_ENABLED === "true" ||
	(import.meta.env.RATE_LIMIT_ENABLED !== "false" && !isDevelopment);

export const contactEmail = "marcoantolini.dev@gmail.com";

export const turnstileSiteKey =
	import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

export const turnstileSecretKey =
	import.meta.env.TURNSTILE_SECRET_KEY ?? "1x0000000000000000000000000000000AA";

export const shouldLogContactInsteadOfSend =
	isDevelopment && contactDevMode === "log";
