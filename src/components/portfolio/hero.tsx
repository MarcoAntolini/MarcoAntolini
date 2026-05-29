"use client";

import { profile } from "@/content/profile";
import AvailabilityStatus from "@/components/availability-status";
import { Magnetic, TextReveal } from "@/components/portfolio/motion";
import TiltCard from "@/components/portfolio/tilt-card";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Sparkles } from "lucide-react";

export default function Hero() {
	const reduceMotion = useReducedMotion();

	return (
		<section className="relative flex min-h-[92vh] flex-col justify-center pt-28 pb-16 sm:pt-32">
			<motion.div
				className="pointer-events-none absolute -left-6 top-24 hidden font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-700 lg:block"
				initial={reduceMotion ? false : { opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 0.8 }}
				aria-hidden="true"
			>
				<span className="block [writing-mode:vertical-lr]">{profile.signature}</span>
			</motion.div>

			<div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
				<div>
					<AvailabilityStatus variant="craft" />

					<motion.h1
						className="mt-8 overflow-visible font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
						initial={reduceMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4, delay: 0.15 }}
					>
						<TextReveal
							as="span"
							text={profile.name}
							className="block leading-[1.08] text-zinc-100"
							delay={0.2}
						/>
						<span className="mt-3 block text-2xl font-semibold text-emerald-300 sm:text-3xl lg:text-4xl">
							{profile.title}
						</span>
					</motion.h1>

					<motion.p
						className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.45 }}
					>
						{profile.heroLine}
					</motion.p>

					<motion.div
						className="mt-10 flex flex-wrap items-center gap-3"
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.55 }}
					>
						<Magnetic>
							<a
								href="#contact"
								className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 hover:shadow-emerald-400/30 motion-reduce:transition-none"
							>
								<Sparkles className="h-4 w-4 transition group-hover:rotate-12 motion-reduce:transition-none" aria-hidden />
								Start a conversation
							</a>
						</Magnetic>
						<Magnetic strength={0.14}>
							<a
								href={profile.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								className="glass-panel inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl text-zinc-300 transition hover:text-emerald-300 motion-reduce:transition-none"
							>
								<Linkedin className="h-5 w-5" />
							</a>
						</Magnetic>
						<Magnetic strength={0.14}>
							<a
								href={profile.github}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
								className="glass-panel inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl text-zinc-300 transition hover:text-emerald-300 motion-reduce:transition-none"
							>
								<Github className="h-5 w-5" />
							</a>
						</Magnetic>
					</motion.div>

					<motion.p
						className="mt-8 font-mono text-xs text-zinc-500"
						initial={reduceMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.7 }}
					>
						{profile.location}
					</motion.p>
				</div>

				<motion.div
					className="relative mx-auto lg:mx-0"
					initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
				>
					<div className="absolute -inset-6 rounded-full bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-transparent blur-2xl animate-pulse-glow motion-reduce:animate-none" />
					<TiltCard className="relative" intensity={10}>
						<div className="relative rounded-3xl border border-zinc-700/80 bg-zinc-900/50 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm">
							<div
								className="pointer-events-none absolute -inset-px rounded-3xl opacity-70 motion-reduce:animate-none animate-orbit-ring"
								aria-hidden="true"
							/>
							<img
								src={`https://github.com/${profile.githubUsername}.png`}
								alt={`Portrait of ${profile.name}`}
								width={220}
								height={220}
								loading="eager"
								decoding="async"
								className="relative h-48 w-48 rounded-2xl object-cover sm:h-52 sm:w-52"
							/>
						</div>
					</TiltCard>
				</motion.div>
			</div>

			<motion.a
				href="#work"
				className="group mt-16 inline-flex items-center gap-3 self-start text-sm text-zinc-500 transition hover:text-emerald-400 motion-reduce:transition-none"
				initial={reduceMotion ? false : { opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.9 }}
				aria-label="Scroll to work section"
			>
				<span className="font-mono text-xs uppercase tracking-widest">Explore work</span>
				<span className="flex h-8 w-5 items-start justify-center rounded-full border border-zinc-700 pt-1.5">
					<ArrowDown className="h-3 w-3 animate-scroll-cue motion-reduce:animate-none" />
				</span>
			</motion.a>
		</section>
	);
}
