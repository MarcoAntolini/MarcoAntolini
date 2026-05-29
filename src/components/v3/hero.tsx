"use client";

import { BrowserFrame, StatusDot } from "@/components/v3/frame";
import AvailabilityStatus from "@/components/availability-status";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

export default function V3Hero() {
	const reduce = useReducedMotion();

	const enter = (delay: number) =>
		reduce
			? { initial: false as const, animate: { opacity: 1, y: 0 } }
			: {
					initial: { opacity: 0, y: 22 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.7, delay, ease },
				};

	return (
		<section className="relative flex min-h-[100dvh] items-center pb-16 pt-28 sm:pt-32">
			<div className="grid w-full items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
				{/* Left — message */}
				<div className="max-w-xl">
					<AvailabilityStatus variant="v3" />

					<motion.h1
						{...enter(0.08)}
						className="mt-6 font-satoshi text-[2.4rem] font-bold leading-[1.05] tracking-tight text-brand-ivory sm:text-5xl lg:text-[3.25rem]"
					>
						I build interfaces that feel{" "}
						<span className="text-brand-emerald">fast and real.</span>
					</motion.h1>

					<motion.p {...enter(0.16)} className="mt-6 max-w-md text-lg leading-relaxed text-brand-muted">
						Frontend and mobile engineer crafting React, Next.js, and Flutter products with performance and
						accessibility in mind.
					</motion.p>

					<motion.div {...enter(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
						<a
							href="#work"
							className="group inline-flex items-center gap-2 rounded-full bg-brand-emerald py-3 pl-6 pr-3 font-satoshi text-sm font-semibold text-brand-obsidian transition-colors hover:bg-emerald-300 motion-reduce:transition-none"
						>
							View work
							<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-obsidian/15 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
								<ArrowDown />
							</span>
						</a>
						<a
							href="#contact"
							className="rounded-full border border-brand-border px-6 py-3 font-satoshi text-sm font-semibold text-brand-ivory transition-colors hover:border-brand-emerald/50 hover:text-brand-emerald motion-reduce:transition-none"
						>
							Get in touch
						</a>
					</motion.div>

					<motion.p {...enter(0.32)} className="mt-8 font-space-mono text-[12px] text-brand-muted/80">
						{profile.signature.replace(/\s*[\u2014\u2013·]\s*/g, " / ")}
					</motion.p>
				</div>

				{/* Right — live product surface */}
				<motion.div
					{...(reduce
						? { initial: false as const, animate: { opacity: 1 } }
						: { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.2, ease } })}
					className="relative"
				>
					<div>
						<BrowserFrame
							url="dracania-archives.com"
							status={
								<span className="inline-flex items-center gap-1.5 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-2.5 py-1 font-space-mono text-[10px] uppercase tracking-[0.16em] text-brand-emerald">
									<StatusDot tone="emerald" /> Live
								</span>
							}
						>
							<img
								src="/projects/banners/dracania-archives.svg"
								alt="Dracania Archives, a live Next.js item database and build tools for Drakensang Online players."
								width={800}
								height={500}
								loading="eager"
								className="aspect-[16/10] w-full object-cover"
							/>
						</BrowserFrame>
					</div>

					{/* Floating dev-craft chip — depth on large screens, stacks away on mobile */}
					<div className="pointer-events-none absolute -bottom-6 -left-6 hidden lg:block">
						<div className="v3-surface rounded-xl px-4 py-3 font-space-mono text-[12px] leading-relaxed">
							<span className="text-brand-emerald">$</span> <span className="text-brand-ivory">git status</span>
							<br />
							<span className="text-brand-muted">working tree clean</span>{" "}
							<span className="v3-animate-blink text-brand-emerald">▍</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

function ArrowDown() {
	return (
		<svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
