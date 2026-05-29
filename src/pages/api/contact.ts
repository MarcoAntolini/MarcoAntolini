import type { APIRoute } from "astro";
import ContactFormEmail from "@/email/contact-form-email";
import SuccessEmail from "@/email/success-email";
import {
	checkContentHeuristics,
	checkHoneypot,
	checkTimeGate,
	validateContactFields,
} from "@/lib/contact/spam-guard";
import { checkContactRateLimit } from "@/lib/contact/rate-limit";
import { verifyTurnstileToken } from "@/lib/contact/turnstile";
import { contactEmail, shouldLogContactInsteadOfSend } from "@/lib/contact/config";
import { getErrorMessage } from "@/lib/utils";
import React from "react";
import { Resend } from "resend";

export const prerender = false;

function getClientIp(request: Request, clientAddress?: string): string {
	return (
		clientAddress ??
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
		request.headers.get("x-real-ip") ??
		"anonymous"
	);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
	const formData = await request.formData();
	const senderEmail = String(formData.get("senderEmail") ?? "");
	const message = String(formData.get("message") ?? "");
	const website = formData.get("website");
	const company = formData.get("company");
	const formLoadedAt = formData.get("formLoadedAt");
	const turnstileToken = formData.get("cf-turnstile-response");

	const honeypot = checkHoneypot(
		typeof website === "string" ? website : null,
		typeof company === "string" ? company : null,
	);
	if (!honeypot.ok) {
		console.warn("[contact] blocked: honeypot");
		return Response.json({ error: honeypot.publicMessage }, { status: 400 });
	}

	const timing = checkTimeGate(typeof formLoadedAt === "string" ? formLoadedAt : null);
	if (!timing.ok) {
		console.warn("[contact] blocked: time gate");
		return Response.json({ error: timing.publicMessage }, { status: 400 });
	}

	const fields = validateContactFields(senderEmail, message);
	if (!fields.ok) {
		console.warn("[contact] blocked: validation");
		return Response.json({ error: fields.publicMessage }, { status: 400 });
	}

	const heuristics = checkContentHeuristics(message.trim());
	if (!heuristics.ok) {
		console.warn("[contact] blocked: content heuristics");
		return Response.json({ error: heuristics.publicMessage }, { status: 400 });
	}

	const token =
		typeof turnstileToken === "string" ? turnstileToken : String(formData.get("turnstileToken") ?? "");

	const ip = getClientIp(request, clientAddress);
	const turnstileOk = await verifyTurnstileToken(token, ip);
	if (!turnstileOk) {
		console.warn("[contact] blocked: turnstile");
		return Response.json({ error: "Could not send — try again or reach me on LinkedIn." }, { status: 400 });
	}

	const limit = await checkContactRateLimit(ip);
	if (!limit.allowed) {
		console.warn("[contact] blocked: rate limit", ip);
		return Response.json({ error: "Try again later." }, { status: 429 });
	}

	const trimmedEmail = senderEmail.trim();
	const trimmedMessage = message.trim();

	if (shouldLogContactInsteadOfSend) {
		console.info("[contact] dev log mode — submission:", {
			senderEmail: trimmedEmail,
			message: trimmedMessage,
			ip,
		});
		return Response.json({});
	}

	const apiKey = import.meta.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error("[contact] missing RESEND_API_KEY");
		return Response.json({ error: "Could not send — try again or reach me on LinkedIn." }, { status: 500 });
	}

	const resend = new Resend(apiKey);

	try {
		await resend.emails.send({
			from: "Contact Form <contact@marcoantolini.com>",
			to: contactEmail,
			subject: "Portfolio contact form",
			replyTo: trimmedEmail,
			react: React.createElement(ContactFormEmail, {
				message: trimmedMessage,
				senderEmail: trimmedEmail,
			}),
		});

		try {
			await resend.emails.send({
				from: "Marco Antolini <noreply@marcoantolini.com>",
				to: trimmedEmail,
				subject: `Message received — ${contactEmail}`,
				react: React.createElement(SuccessEmail, {
					message: trimmedMessage,
					receiverEmail: contactEmail,
				}),
			});
		} catch (error: unknown) {
			console.error("[contact] auto-reply failed:", getErrorMessage(error));
		}
	} catch (error: unknown) {
		console.error("[contact] send failed:", getErrorMessage(error));
		return Response.json({ error: "Could not send — try again or reach me on LinkedIn." }, { status: 500 });
	}

	return Response.json({});
};
