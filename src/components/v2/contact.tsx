"use client";

import { profile } from "@/content/profile";
import { tidy } from "@/lib/v2-text";
import { turnstileSiteKey } from "@/lib/contact/client";
import { Turnstile } from "@marsidev/react-turnstile";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function V2Contact() {
	const [formLoadedAt, setFormLoadedAt] = useState("");
	const [turnstileToken, setTurnstileToken] = useState("");
	const [statusMessage, setStatusMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showTurnstile, setShowTurnstile] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const reduceMotion = useReducedMotion();

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
			{ rootMargin: "120px" },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	async function handleSubmit(formData: FormData) {
		setIsSubmitting(true);
		setStatusMessage("Sending your message...");
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

		const success = "Message sent. I will get back to you soon.";
		setStatusMessage(success);
		toast.success(success);
		(sectionRef.current?.querySelector("form") as HTMLFormElement | null)?.reset();
		setTurnstileToken("");
	}

	const rise = (delay = 0) =>
		reduceMotion
			? { initial: false as const, whileInView: { opacity: 1, y: 0 } }
			: {
					initial: { opacity: 0, y: 22 },
					whileInView: { opacity: 1, y: 0 },
					viewport: { once: true, amount: 0.2 },
					transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
				};

	const inputClass =
		"min-h-12 w-full rounded-lg border border-v2-border bg-v2-obsidian/60 px-4 py-3 text-base text-v2-ivory placeholder:text-v2-muted/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-v2-emerald";

	return (
		<section ref={sectionRef} id="contact" className="scroll-mt-24 py-24 sm:py-32" aria-labelledby="v2-contact-heading">
			<div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
				<motion.div {...rise()}>
					<span className="v2-label text-v2-emerald">Contact</span>
					<h2 id="v2-contact-heading" className="mt-3 font-satoshi text-3xl font-bold tracking-tight text-v2-ivory sm:text-4xl">
						Let us build something together
					</h2>
					<p className="mt-4 max-w-md text-base leading-relaxed text-v2-muted">
						{tidy(profile.availability)} Send a message here or reach me directly. I reply to every serious note.
					</p>

					<div className="mt-8 space-y-3">
						<a
							href={`mailto:${profile.email}`}
							className="group flex items-center gap-3 rounded-lg border border-v2-border bg-v2-zinc/40 px-5 py-4 transition-colors hover:border-v2-emerald/40 motion-reduce:transition-none"
						>
							<MailGlyph />
							<span className="font-space-mono text-[13px] text-v2-ivory group-hover:text-v2-emerald">{profile.email}</span>
						</a>
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-3 rounded-lg border border-v2-border bg-v2-zinc/40 px-5 py-4 transition-colors hover:border-v2-emerald/40 motion-reduce:transition-none"
						>
							<LinkedinGlyph />
							<span className="font-space-mono text-[13px] text-v2-ivory group-hover:text-v2-emerald">LinkedIn profile</span>
						</a>
					</div>
				</motion.div>

				<motion.form
					{...rise(0.1)}
					action={handleSubmit}
					className="v2-frame flex flex-col gap-4 rounded-xl p-6 sm:p-8"
				>
					<input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
					<input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
					<input type="hidden" name="formLoadedAt" value={formLoadedAt} />

					<div>
						<label htmlFor="v2-senderEmail" className="mb-2 block font-space-mono text-[12px] uppercase tracking-[0.12em] text-v2-muted">
							Your email
						</label>
						<input id="v2-senderEmail" name="senderEmail" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
					</div>

					<div>
						<label htmlFor="v2-message" className="mb-2 block font-space-mono text-[12px] uppercase tracking-[0.12em] text-v2-muted">
							Message
						</label>
						<textarea id="v2-message" name="message" required minLength={10} maxLength={5000} rows={6} className={`${inputClass} resize-y`} />
					</div>

					{showTurnstile ? (
						<div className="flex justify-start">
							<Turnstile siteKey={turnstileSiteKey} onSuccess={setTurnstileToken} onExpire={() => setTurnstileToken("")} options={{ theme: "dark", size: "flexible" }} />
						</div>
					) : null}

					<button
						type="submit"
						disabled={isSubmitting || !turnstileToken}
						className="min-h-12 min-w-[8rem] rounded-lg bg-v2-emerald px-6 py-3 font-satoshi text-base font-semibold text-v2-obsidian transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
					>
						{isSubmitting ? "Sending..." : "Send message"}
					</button>

					<p role="status" aria-live="polite" className="min-h-5 font-space-mono text-[12px] text-v2-muted">
						{statusMessage}
					</p>
				</motion.form>
			</div>
		</section>
	);
}

function MailGlyph() {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-v2-emerald" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
			<rect x="2.5" y="4.5" width="15" height="11" rx="2" />
			<path d="M3 6l7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function LinkedinGlyph() {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-v2-emerald" fill="currentColor" aria-hidden="true">
			<path d="M5.6 4.5a1.6 1.6 0 1 1-.01 3.21A1.6 1.6 0 0 1 5.6 4.5ZM4.2 8.9h2.8v7.6H4.2V8.9Zm4.6 0h2.68v1.04h.04c.37-.7 1.29-1.44 2.66-1.44 2.85 0 3.38 1.87 3.38 4.3v3.7h-2.8v-3.28c0-.78-.01-1.79-1.09-1.79-1.09 0-1.26.85-1.26 1.73v3.34H8.8V8.9Z" />
		</svg>
	);
}
