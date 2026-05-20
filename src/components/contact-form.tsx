"use client";

import { Reveal } from "@/components/portfolio/motion";
import { profile } from "@/content/profile";
import { turnstileSiteKey } from "@/lib/contact/client";
import { Turnstile } from "@marsidev/react-turnstile";
import { Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type ContactFormProps = {
	className?: string;
	variant?: "light" | "dark" | "craft";
};

export default function ContactForm({ className = "", variant = "craft" }: ContactFormProps) {
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
			{ rootMargin: "100px" },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const isCraft = variant === "craft" || variant === "dark";
	const isDark = isCraft;

	const inputClass = isCraft
		? "bg-zinc-950/60 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:outline-emerald-500"
		: "bg-white border-stone-300 text-stone-900 placeholder:text-stone-400";
	const labelClass = isCraft ? "text-zinc-300" : "text-stone-800";
	const mutedClass = isCraft ? "text-zinc-400" : "text-stone-600";
	const buttonClass = isCraft
		? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
		: "bg-stone-900 text-white hover:bg-stone-800";

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

		const success = "Message sent — I'll get back to you soon.";
		setStatusMessage(success);
		toast.success(success);
		(sectionRef.current?.querySelector("form") as HTMLFormElement | null)?.reset();
		setTurnstileToken("");
	}

	const content = (
		<>
			{variant === "craft" ? (
				<Reveal>
					<p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400/90">Contact</p>
					<h2
						id="contact-heading"
						className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
					>
						Let&apos;s build something together
					</h2>
					<p className={`mt-4 max-w-lg text-lg ${mutedClass}`}>
						{profile.availability} Drop a line or reach out on LinkedIn — I reply to every serious inquiry.
					</p>
				</Reveal>
			) : (
				<>
					<h2 id="contact-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
						Contact
					</h2>
					<p className={`mt-3 max-w-prose text-base ${mutedClass}`}>
						{profile.availability} Prefer LinkedIn?{" "}
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 underline underline-offset-4"
						>
							<Linkedin className="h-4 w-4" aria-hidden />
							Connect on LinkedIn
						</a>
					</p>
				</>
			)}

			<div className={variant === "craft" ? "mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16" : ""}>
				{variant === "craft" ? (
					<Reveal delay={0.1} className="space-y-4">
						<a
							href={`mailto:${profile.email}`}
							className="glass-panel flex items-center gap-3 rounded-xl px-5 py-4 text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300 motion-reduce:transition-none"
						>
							<Mail className="h-5 w-5 text-emerald-400" />
							<span className="text-sm">{profile.email}</span>
						</a>
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="glass-panel flex items-center gap-3 rounded-xl px-5 py-4 text-zinc-300 transition hover:border-emerald-500/40 hover:text-emerald-300 motion-reduce:transition-none"
						>
							<Linkedin className="h-5 w-5 text-emerald-400" />
							<span className="text-sm">LinkedIn profile</span>
						</a>
					</Reveal>
				) : null}

				<Reveal delay={variant === "craft" ? 0.15 : 0}>
					<form
						action={handleSubmit}
						className={`flex flex-col gap-4 ${variant === "craft" ? "glass-panel rounded-2xl p-6 sm:p-8" : "mt-8 max-w-xl"}`}
					>
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
							<label htmlFor="senderEmail" className={`mb-2 block text-sm font-medium ${labelClass}`}>
								Your email
							</label>
							<input
								id="senderEmail"
								name="senderEmail"
								type="email"
								required
								maxLength={254}
								autoComplete="email"
								className={`min-h-12 w-full rounded-xl border px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${inputClass}`}
							/>
						</div>

						<div>
							<label htmlFor="message" className={`mb-2 block text-sm font-medium ${labelClass}`}>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								required
								minLength={10}
								maxLength={5000}
								rows={6}
								className={`w-full resize-y rounded-xl border px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${inputClass}`}
							/>
						</div>

						{showTurnstile ? (
							<div className="flex justify-start">
								<Turnstile
									siteKey={turnstileSiteKey}
									onSuccess={setTurnstileToken}
									onExpire={() => setTurnstileToken("")}
									options={{ theme: isDark ? "dark" : "light", size: "flexible" }}
								/>
							</div>
						) : null}

						<button
							type="submit"
							disabled={isSubmitting || !turnstileToken}
							className={`min-h-12 min-w-[8rem] rounded-xl px-6 py-3 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none ${buttonClass}`}
						>
							{isSubmitting ? "Sending…" : "Send message"}
						</button>

						<p role="status" aria-live="polite" className={`text-sm ${mutedClass}`}>
							{statusMessage}
						</p>
					</form>
				</Reveal>
			</div>
		</>
	);

	return (
		<section
			ref={sectionRef}
			id="contact"
			className={`scroll-mt-28 ${className}`}
			aria-labelledby="contact-heading"
		>
			{content}
		</section>
	);
}
