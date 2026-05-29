import { turnstileSecretKey } from "./config";

type TurnstileResponse = {
	success: boolean;
	"error-codes"?: string[];
};

export async function verifyTurnstileToken(
	token: string | null,
	remoteIp?: string,
): Promise<boolean> {
	if (!token?.trim()) {
		return false;
	}

	const body = new URLSearchParams({
		secret: turnstileSecretKey,
		response: token,
	});

	if (remoteIp) {
		body.set("remoteip", remoteIp);
	}

	const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body,
	});

	if (!response.ok) {
		return false;
	}

	const data = (await response.json()) as TurnstileResponse;
	return data.success === true;
}
