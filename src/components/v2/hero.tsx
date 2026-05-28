"use client";

import { BrowserFrame } from "@/components/v2/frame";
import { profile } from "@/content/profile";
import { motion, useReducedMotion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1] as const;

export default function V2Hero() {
	const reduceMotion = useReducedMotion();

	const rise = (delay: number) =>
		reduceMotion
			? { initial: false as const, animate: { opacity: 1, y: 0 } }
			: {
					initial: { opacity: 0, y: 18 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.6, delay, ease: easing },
				};

	return (
		<section className="relative flex min-h-[100dvh] items-center pb-20 pt-28 sm:pt-32">
			<div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
				<div>
					<motion.span
						{...rise(0.05)}
						className="inline-flex items-center gap-2 rounded-full border border-v2-emerald/25 bg-v2-emerald/5 px-3.5 py-1.5 font-space-mono text-[11px] uppercase tracking-[0.16em] text-v2-emerald"
					>
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-v2-emerald opacity-60 motion-reduce:animate-none" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-v2-emerald" />
						</span>
						Open to engineering internships
					</motion.span>

					<motion.h1
						{...rise(0.12)}
						className="mt-7 font-satoshi text-[2.6rem] font-bold leading-[1.04] tracking-[-0.02em] text-v2-ivory sm:text-6xl lg:text-[4.1rem]"
					>
						I build interfaces that feel{" "}
						<span className="text-v2-emerald">fast and real</span>.
					</motion.h1>

					<motion.p {...rise(0.2)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-v2-muted">
						Frontend and mobile engineer crafting React, Next.js, and Flutter products with
						performance and accessibility in mind.
					</motion.p>

					<motion.div {...rise(0.28)} className="mt-9 flex flex-wrap items-center gap-3">
						<a
							href="#work"
							className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-v2-emerald px-6 text-sm font-semibold text-v2-obsidian transition-colors hover:bg-emerald-300 motion-reduce:transition-none"
						>
							View work
							<ArrowRight />
						</a>
						<a
							href="#contact"
							className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-v2-border bg-v2-zinc/40 px-6 text-sm font-medium text-v2-ivory transition-colors hover:border-v2-emerald/40 hover:text-v2-emerald motion-reduce:transition-none"
						>
							Get in touch
						</a>
					</motion.div>

					<motion.div
						{...rise(0.36)}
						className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 font-space-mono text-[12px] text-v2-muted"
					>
						<span>{profile.location}</span>
						<span className="hidden h-3 w-px bg-v2-border sm:block" aria-hidden="true" />
						<a
							href={profile.github}
							target="_blank"
							rel="noopener noreferrer"
							className="transition-colors hover:text-v2-emerald motion-reduce:transition-none"
						>
							GitHub
						</a>
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="transition-colors hover:text-v2-emerald motion-reduce:transition-none"
						>
							LinkedIn
						</a>
						<a
							href={profile.cvPath}
							download
							className="transition-colors hover:text-v2-emerald motion-reduce:transition-none"
						>
							CV
						</a>
					</motion.div>
				</div>

				<motion.div
					initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 14 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3, ease: easing }}
					className="relative"
				>
					<div className="pointer-events-none absolute -inset-8 rounded-full bg-v2-emerald/10 blur-3xl v2-animate-pulse motion-reduce:animate-none" aria-hidden="true" />
					<BrowserFrame
						url="dracania-archives.com"
						src="/dracania-archives.png"
						alt="Dracania Archives: production web app for the Drakensang Online community"
						status="Deployed"
						priority
						className="relative"
					/>
					<div className="mt-3 flex items-center justify-between font-space-mono text-[11px] text-v2-muted">
						<span>flagship · live product</span>
						<span className="text-v2-emerald">Next.js</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

function ArrowRight() {
	return (
		<svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
			<path d="M3 8h10" strokeLinecap="round" />
			<path d="M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
