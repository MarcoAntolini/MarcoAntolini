"use client";

import { profile } from "@/content/profile";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";

export default function Hero() {
	const reduceMotion = useReducedMotion();

	return (
		<section className="relative flex min-h-[92vh] flex-col justify-center pt-28 pb-16 sm:pt-32">
			<div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
				<div>
					<motion.p
						className="font-mono text-sm text-emerald-400/90"
						initial={reduceMotion ? false : { opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
						{profile.availability}
					</motion.p>

					<motion.h1
						className="mt-6 overflow-visible font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<span className="block leading-[1.08] text-zinc-100">{profile.name}</span>
						<span className="mt-2 block text-gradient">{profile.title}</span>
					</motion.h1>

					<motion.p
						className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.35 }}
					>
						{profile.heroLine}
					</motion.p>

					<motion.div
						className="mt-10 flex flex-wrap items-center gap-3"
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.45 }}
					>
						<a
							href="#contact"
							className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:shadow-emerald-400/25 motion-reduce:transition-none"
						>
							Start a conversation
						</a>
						<a
							href={profile.cvPath}
							download
							className="glass-panel inline-flex min-h-12 items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500/40 hover:text-emerald-300 motion-reduce:transition-none"
						>
							<Download className="h-4 w-4" aria-hidden />
							Download CV
						</a>
						<a
							href={profile.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="glass-panel inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl text-zinc-300 transition hover:text-emerald-300 motion-reduce:transition-none"
						>
							<Linkedin className="h-5 w-5" />
						</a>
						<a
							href={profile.github}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							className="glass-panel inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl text-zinc-300 transition hover:text-emerald-300 motion-reduce:transition-none"
						>
							<Github className="h-5 w-5" />
						</a>
					</motion.div>

					<motion.p
						className="mt-8 font-mono text-xs text-zinc-500"
						initial={reduceMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						{profile.location}
					</motion.p>
				</div>

				<motion.div
					className="relative mx-auto lg:mx-0"
					initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
				>
					<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-transparent blur-2xl" />
					<div className="relative rounded-3xl border border-zinc-700/80 bg-zinc-900/50 p-2 shadow-2xl shadow-black/40 backdrop-blur-sm">
						<img
							src={`https://github.com/${profile.githubUsername}.png`}
							alt={`Portrait of ${profile.name}`}
							width={220}
							height={220}
							loading="eager"
							decoding="async"
							className="h-48 w-48 rounded-2xl object-cover sm:h-52 sm:w-52"
						/>
						<div className="absolute -bottom-3 -right-3 rounded-xl border border-emerald-500/40 bg-zinc-900 px-3 py-2 font-mono text-xs text-emerald-400 shadow-lg">
							Open to internships
						</div>
					</div>
				</motion.div>
			</div>

			<motion.a
				href="#work"
				className="mt-16 inline-flex items-center gap-2 self-start text-sm text-zinc-500 transition hover:text-emerald-400 motion-reduce:transition-none"
				initial={reduceMotion ? false : { opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				aria-label="Scroll to work section"
			>
				<span className="font-mono text-xs uppercase tracking-widest">Explore work</span>
				<ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" />
			</motion.a>
		</section>
	);
}
