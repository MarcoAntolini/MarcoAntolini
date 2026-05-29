/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_APP_ENV?: string;
	readonly PUBLIC_SITE_URL?: string;
	readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
	readonly CONTACT_DEV_MODE?: string;
	readonly RATE_LIMIT_ENABLED?: string;
	readonly RESEND_API_KEY?: string;
	readonly TURNSTILE_SECRET_KEY?: string;
	readonly UPSTASH_REDIS_REST_URL?: string;
	readonly UPSTASH_REDIS_REST_TOKEN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
