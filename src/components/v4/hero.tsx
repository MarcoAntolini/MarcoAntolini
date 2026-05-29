"use client";

import { TextReveal } from "@/components/portfolio/motion";
import RotatingText from "@/components/portfolio/rotating-text";
import { StatusDot } from "@/components/v4/frame";
import { profile } from "@/content/profile";
import { motion, useReducedMotion } from "framer-motion";

export default function V4Hero() {
	const reduceMotion = useReducedMotion();

	return (
		<section className="relative flex min-h-[100dvh] flex-col justify-center pt-24 pb-14 sm:pt-28">
			<div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
				<div>
					<motion.div
						className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/25 bg-brand-emerald/5 px-4 py-2 font-space-mono text-xs text-brand-emerald"
						initial={reduceMotion ? false : { opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<StatusDot tone="emerald" />
						{profile.availability}
					</motion.div>

					<motion.h1
						className="mt-7 overflow-visible font-satoshi text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
						initial={reduceMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4, delay: 0.15 }}
					>
						<TextReveal as="span" text={profile.name} className="block leading-[1.08] text-brand-ivory" delay={0.2} />
						<span className="mt-3 block text-2xl font-semibold text-brand-emerald sm:text-3xl lg:text-4xl">
							Building <RotatingText items={profile.rotatingFocus} className="text-brand-emerald" />
						</span>
					</motion.h1>

					<motion.p
						className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted sm:text-xl"
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.45 }}
					>
						{profile.heroLine}
					</motion.p>

					<div className="mt-10 flex flex-wrap items-center gap-3">
						<a
							href="#contact"
							className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold text-brand-obsidian transition-colors duration-200 hover:bg-emerald-300 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
						>
							Start a conversation
							<span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-obsidian/10">
								<ArrowIcon />
							</span>
						</a>
						<a
							href={profile.cvPath}
							download
							className="v4-glass inline-flex min-h-12 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-brand-ivory transition-colors duration-200 hover:border-brand-emerald/40 hover:text-brand-emerald active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
						>
							<DownloadIcon />
							Download CV
						</a>
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="v4-glass inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-brand-muted transition-colors duration-200 hover:border-brand-emerald/40 hover:text-brand-emerald active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
						>
							<LinkedInIcon />
						</a>
						<a
							href={profile.github}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							className="v4-glass inline-flex min-h-12 min-w-12 items-center justify-center rounded-full text-brand-muted transition-colors duration-200 hover:border-brand-emerald/40 hover:text-brand-emerald active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
						>
							<GitHubIcon />
						</a>
					</div>
					<motion.p
						className="mt-8 font-space-mono text-xs text-brand-muted/80"
						initial={reduceMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.7 }}
					>
						{profile.location}
					</motion.p>
				</div>

				<motion.div
					className="relative mx-auto lg:mx-0"
					initial={reduceMotion ? false : { opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
				>
					<div className="v4-frame rounded-[1.75rem] p-2 sm:p-2.5">
						<div className="v4-frame-inner v4-hairline overflow-hidden rounded-[1.35rem]">
							<div className="relative aspect-square w-44 sm:w-52">
								<img
									src={`https://github.com/${profile.githubUsername}.png`}
									alt={`Portrait of ${profile.name}`}
									width={208}
									height={208}
									loading="eager"
									decoding="async"
									className="h-full w-full object-cover"
								/>
								<div
									className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-obsidian/50 via-transparent to-brand-emerald/5"
									aria-hidden="true"
								/>
							</div>
						</div>
					</div>
					<div className="absolute -bottom-3 -right-2 sm:-right-4">
						<span className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-zinc/90 px-3 py-1.5 font-space-mono text-[10px] uppercase tracking-[0.16em] text-brand-emerald backdrop-blur-sm">
							<StatusDot tone="emerald" />
							Open to internships
						</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

function ArrowIcon() {
	return (
		<svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function DownloadIcon() {
	return (
		<svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
			<path d="M10 3v10M6 9l4 4 4-4M4 17h12" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
			<path d="M5.4 7.2H3V17h2.4V7.2ZM4.2 3a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8ZM17 17v-5.6c0-2.6-1.4-3.8-3.3-3.8-1.5 0-2.2.8-2.6 1.4V7.2H8.8V17h2.4v-5.3c0-1.1.7-1.7 1.5-1.7s1.4.5 1.4 1.7V17H17Z" />
		</svg>
	);
}

function GitHubIcon() {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
			<path
				fillRule="evenodd"
				d="M10 2a8 8 0 0 0-2.54 15.59c.4.07.55-.17.55-.38 0-.19-.01-.68-.01-1.34-2.24.49-2.71-1.08-2.71-1.08-.36-.92-.88-1.16-.88-1.16-.72-.49.06-.48.06-.48.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 10 2Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
