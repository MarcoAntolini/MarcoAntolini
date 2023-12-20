"use server";

import ContactFormEmail from "@/email/contact-form-email";
import SuccessEmail from "@/email/success-email";
import { getErrorMessage, validateString } from "@/lib/utils";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = "marcoantolini.dev@gmail.com";

export const sendEmail = async (formData: FormData) => {
	const senderEmail = formData.get("senderEmail");
	const message = formData.get("message");

	if (!validateString(senderEmail, 500)) {
		return {
			error: "Invalid sender email",
		};
	}
	if (!validateString(message, 5000)) {
		return {
			error: "Invalid message",
		};
	}

	try {
		await resend.emails
			.send({
				from: "Contact Form <onboarding@resend.dev>",
				to: myEmail,
				subject: "Message from contact form",
				reply_to: senderEmail,
				react: React.createElement(ContactFormEmail, {
					message: message,
					senderEmail: senderEmail,
				}),
			})
			.then(async () => {
				try {
					await resend.emails.send({
						from: "noreply@marcoantolini.com",
						to: senderEmail,
						subject: `Message successfully sent to Marco Antolini at ${myEmail}`,
						react: React.createElement(SuccessEmail, {
							message: message,
							receiverEmail: myEmail,
						}),
					});
				} catch (error: unknown) {
					return {
						error: getErrorMessage(error),
					};
				}
			});
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error),
		};
	}

	return {};
};
