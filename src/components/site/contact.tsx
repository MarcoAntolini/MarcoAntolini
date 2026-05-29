"use client";

import { ResponseTimeStatus } from "@/components/availability-status";
import { Reveal } from "@/components/site/reveal";
import { profile } from "@/content/profile";
import { turnstileSiteKey } from "@/lib/contact/client";
import { tidy } from "@/lib/text";
import { Turnstile } from "@marsidev/react-turnstile";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
	const [formLoadedAt, setFormLoadedAt] = useState("");
	const [turnstileToken, setTurnstileToken] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showTurnstile, setShowTurnstile] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setFormLoadedAt(String(Date.now()));
	}, []);

	useEffect(() => {
		const node = sectionRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setShowTurnstile(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "150px" },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	async function handleSubmit(formData: FormData) {
		setIsSubmitting(true);
		setStatusMessage("Sending your message…");
		formData.set("formLoadedAt", formLoadedAt);
		formData.set("turnstileToken", turnstileToken);

		const response = await fetch("/api/contact", { method: "POST", body: formData });
		const { error } = (await response.json()) as { error?: string };

		setIsSubmitting(false);

		if (error) {
			setStatusMessage(error);
			toast.error(error);
			return;
		}

		const success = "Message sent. I'll get back to you soon.";
		setStatusMessage(success);
		toast.success(success);
		(sectionRef.current?.querySelector("form") as HTMLFormElement | null)?.reset();
		setTurnstileToken("");
	}

	const inputClass =
		"min-h-12 w-full rounded-xl border border-brand-border bg-brand-obsidian/60 px-4 py-3 text-base text-brand-ivory placeholder:text-brand-muted/60 transition-colors focus-visible:border-brand-emerald/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald motion-reduce:transition-none";

	return (
		<section
			ref={sectionRef}
			id="contact"
			className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28"
			aria-labelledby="site-contact-heading"
		>
			<div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
				<Reveal>
					<h2
						id="site-contact-heading"
						className="font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.6rem] sm:leading-[1.05]"
					>
						Let&apos;s build something together.
					</h2>
					<p className="mt-5 max-w-md text-base leading-relaxed text-brand-muted">
						{tidy(profile.availability)} Send a message or reach out on LinkedIn. I reply to every serious inquiry.
					</p>

					<ResponseTimeStatus className="mt-8" />

					<div className="mt-8 space-y-3">
						<a
							href={`mailto:${profile.email}`}
							className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-zinc/40 px-5 py-4 text-brand-muted transition-colors hover:border-brand-emerald/40 hover:text-brand-emerald motion-reduce:transition-none"
						>
							<MailIcon />
							<span className="text-sm">{profile.email}</span>
						</a>
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-zinc/40 px-5 py-4 text-brand-muted transition-colors hover:border-brand-emerald/40 hover:text-brand-emerald motion-reduce:transition-none"
						>
							<LinkedInIcon />
							<span className="text-sm">LinkedIn profile</span>
						</a>
					</div>
				</Reveal>

				<Reveal delay={0.1}>
					<form action={handleSubmit} className="site-glass flex flex-col gap-5 rounded-2xl p-6 sm:p-8">
						<input
							type="text"
							name="website"
							tabIndex={-1}
							autoComplete="off"
							aria-hidden="true"
							className="absolute -left-[9999px] h-0 w-0 opacity-0"
						/>
						<input
							type="text"
							name="company"
							tabIndex={-1}
							autoComplete="off"
							aria-hidden="true"
							className="absolute -left-[9999px] h-0 w-0 opacity-0"
						/>
						<input type="hidden" name="formLoadedAt" value={formLoadedAt} />

						<div>
							<label htmlFor="site-senderEmail" className="mb-2 block font-satoshi text-sm font-medium text-brand-ivory">
								Your email
							</label>
							<input
								id="site-senderEmail"
								name="senderEmail"
								type="email"
								required
								maxLength={254}
								autoComplete="email"
								placeholder="you@company.com"
								className={inputClass}
							/>
						</div>

						<div>
							<label htmlFor="site-message" className="mb-2 block font-satoshi text-sm font-medium text-brand-ivory">
								Message
							</label>
							<textarea
								id="site-message"
								name="message"
								required
								minLength={10}
								maxLength={5000}
								rows={6}
								placeholder="What are you building, and how can I help?"
								className={`${inputClass} resize-y`}
							/>
						</div>

						{showTurnstile ? (
							<div className="flex justify-start">
								<Turnstile
									siteKey={turnstileSiteKey}
									onSuccess={setTurnstileToken}
									onExpire={() => setTurnstileToken("")}
									options={{ theme: "dark", size: "flexible" }}
								/>
							</div>
						) : null}

						<button
							type="submit"
							disabled={isSubmitting || !turnstileToken}
							className="min-h-12 rounded-xl bg-brand-emerald px-6 py-3 font-satoshi text-base font-semibold text-brand-obsidian shadow-lg shadow-brand-emerald/20 transition-colors hover:bg-brand-emerald/85 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
						>
							{isSubmitting ? "Sending…" : "Send message"}
						</button>

						<p role="status" aria-live="polite" className="text-sm text-brand-muted">
							{statusMessage}
						</p>
					</form>
				</Reveal>
			</div>
		</section>
	);
}

function MailIcon() {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-brand-emerald" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
			<rect x="2.5" y="4.5" width="15" height="11" rx="2" />
			<path d="m3 6 7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-brand-emerald" fill="currentColor" aria-hidden="true">
			<path d="M5.4 7.2H3V17h2.4V7.2ZM4.2 3a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM17 17v-5.6c0-2.6-1.4-3.8-3.3-3.8-1.5 0-2.2.8-2.6 1.4V7.2H8.8V17h2.4v-5.3c0-1.1.7-1.7 1.5-1.7s1.4.5 1.4 1.7V17H17Z" />
		</svg>
	);
}
