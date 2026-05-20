import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { rateLimitEnabled } from "./config";

let hourlyLimit: Ratelimit | null = null;
let dailyLimit: Ratelimit | null = null;

function getLimits() {
	if (!rateLimitEnabled) {
		return null;
	}

	const url = import.meta.env.UPSTASH_REDIS_REST_URL;
	const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

	if (!url || !token) {
		return null;
	}

	if (!hourlyLimit || !dailyLimit) {
		const redis = new Redis({ url, token });
		hourlyLimit = new Ratelimit({
			redis,
			limiter: Ratelimit.slidingWindow(3, "1 h"),
			prefix: "contact-hour",
		});
		dailyLimit = new Ratelimit({
			redis,
			limiter: Ratelimit.slidingWindow(10, "1 d"),
			prefix: "contact-day",
		});
	}

	return { hourlyLimit, dailyLimit };
}

export async function checkContactRateLimit(
	identifier: string,
): Promise<{ allowed: true } | { allowed: false }> {
	const limits = getLimits();
	if (!limits) {
		return { allowed: true };
	}

	const [hourly, daily] = await Promise.all([
		limits.hourlyLimit.limit(identifier),
		limits.dailyLimit.limit(identifier),
	]);

	if (!hourly.success || !daily.success) {
		return { allowed: false };
	}

	return { allowed: true };
}
