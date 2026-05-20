"use client";

import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ContactLinks, GitHubAvatar } from "./shared-links";

function Starfield() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			{Array.from({ length: 80 }).map((_, i) => (
				<motion.span
					key={i}
					className="absolute h-0.5 w-0.5 rounded-full bg-white"
					style={{
						left: `${(i * 17) % 100}%`,
						top: `${(i * 23) % 100}%`,
					}}
					animate={{ opacity: [0.2, 1, 0.2] }}
					transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.05 }}
				/>
			))}
		</div>
	);
}

export default function OrbitPortfolio() {
	const reduceMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: containerRef });
	const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
	const ringRotateReverse = useTransform(scrollYProgress, [0, 1], [360, 0]);
	const featured = projects.filter((p) => p.featured);

	return (
		<div ref={containerRef} className="concept-orbit relative min-h-screen bg-[#030712] pb-28 text-cyan-50">
			<Starfield />
			<div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">
				<motion.div
					className="pointer-events-none absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full border border-cyan-500/20"
					style={reduceMotion ? undefined : { rotate: ringRotate }}
				/>
				<motion.div
					className="pointer-events-none absolute left-1/2 top-44 h-48 w-48 -translate-x-1/2 rounded-full border border-cyan-400/30"
					style={reduceMotion ? undefined : { rotate: ringRotateReverse }}
				/>

				<motion.header
					className="relative text-center"
					initial={reduceMotion ? false : { opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">Mission briefing // MARCO-2026</p>
					<h1 className="mt-4 font-display text-4xl font-bold sm:text-6xl">{profile.name}</h1>
					<p className="mx-auto mt-4 max-w-xl text-cyan-100/70">{profile.heroLine}</p>
					<motion.div
						className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-5 py-2"
						animate={reduceMotion ? undefined : { boxShadow: ["0 0 0px #22d3ee", "0 0 24px #22d3ee44", "0 0 0px #22d3ee"] }}
						transition={{ duration: 3, repeat: Infinity }}
					>
						<span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
						<span className="font-mono text-sm text-cyan-300">{profile.availability}</span>
					</motion.div>
				</motion.header>

				<section className="relative mt-20 space-y-6">
					<h2 className="font-mono text-sm uppercase tracking-widest text-cyan-500">Flight log</h2>
					{experience.map((item, i) => (
						<motion.article
							key={item.title}
							className="rounded-2xl border border-cyan-900/60 bg-cyan-950/20 p-6 backdrop-blur-sm"
							initial={reduceMotion ? false : { opacity: 0, x: -40 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
						>
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
								<span className="font-mono text-xs text-cyan-500">{item.period}</span>
							</div>
							<p className="mt-1 text-sm text-cyan-200/60">
								{item.organization} · {item.location}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-cyan-100/80">{item.description}</p>
						</motion.article>
					))}
				</section>

				<section className="relative mt-20">
					<h2 className="font-mono text-sm uppercase tracking-widest text-cyan-500">Payload — deployed projects</h2>
					<div className="mt-6 grid gap-4 sm:grid-cols-2">
						{featured.map((project, i) => (
							<motion.a
								key={project.slug}
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group rounded-2xl border border-cyan-800/50 bg-gradient-to-br from-cyan-950/40 to-slate-950 p-6 transition hover:border-cyan-400/50"
								initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08 }}
								whileHover={reduceMotion ? undefined : { y: -4 }}
							>
								{project.flagship && (
									<span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">Flagship</span>
								)}
								<h3 className="mt-1 font-display text-xl font-bold text-white group-hover:text-cyan-300">
									{project.title}
								</h3>
								<p className="mt-2 text-sm text-cyan-100/60">{project.description}</p>
								<p className="mt-3 font-mono text-xs text-cyan-600">{project.tags.join(" · ")}</p>
							</motion.a>
						))}
					</div>
				</section>

				<motion.footer
					className="relative mt-20 flex flex-col items-center gap-6 rounded-3xl border border-cyan-500/20 bg-cyan-950/30 p-8 text-center"
					initial={reduceMotion ? false : { opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<GitHubAvatar className="h-20 w-20 rounded-full border-2 border-cyan-400/40" />
					<p className="font-mono text-sm text-cyan-400">Open comms channel</p>
					<ContactLinks linkClassName="text-sm text-cyan-200 underline hover:text-white" />
				</motion.footer>
			</div>
		</div>
	);
}
