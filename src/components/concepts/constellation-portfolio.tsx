"use client";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ContactLinks } from "./shared-links";

const STAR_POSITIONS = [
	{ x: 12, y: 18, group: 0 },
	{ x: 28, y: 35, group: 0 },
	{ x: 45, y: 22, group: 0 },
	{ x: 62, y: 40, group: 1 },
	{ x: 78, y: 25, group: 1 },
	{ x: 88, y: 45, group: 1 },
	{ x: 22, y: 62, group: 2 },
	{ x: 38, y: 75, group: 2 },
	{ x: 55, y: 68, group: 2 },
	{ x: 72, y: 78, group: 3 },
	{ x: 85, y: 65, group: 3 },
	{ x: 50, y: 50, group: -1 },
];

export default function ConstellationPortfolio() {
	const reduceMotion = useReducedMotion();
	const [activeGroup, setActiveGroup] = useState<number | null>(null);
	const featured = projects.filter((p) => p.featured);

	return (
		<div className="concept-constellation relative min-h-screen overflow-hidden bg-[#0f0720] pb-28 text-violet-50">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2e106b44_0%,_transparent_70%)]" />

			<div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6">
				<motion.header
					className="text-center"
					initial={reduceMotion ? false : { opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<h1 className="font-display text-4xl font-bold sm:text-5xl">{profile.name}</h1>
					<p className="mt-3 text-violet-300/80">{profile.heroLine}</p>
					<p className="mt-2 text-sm text-violet-400">Hover the stars to reveal skill constellations</p>
				</motion.header>

				<div className="relative mx-auto mt-12 aspect-[16/10] max-w-3xl rounded-3xl border border-violet-800/40 bg-violet-950/20">
					{STAR_POSITIONS.map((star, i) => (
						<motion.button
							key={i}
							type="button"
							className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-200 shadow-[0_0_12px_#c4b5fd]"
							style={{ left: `${star.x}%`, top: `${star.y}%` }}
							onMouseEnter={() => star.group >= 0 && setActiveGroup(star.group)}
							onMouseLeave={() => setActiveGroup(null)}
							animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
							transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.15 }}
							aria-label={star.group >= 0 ? skillGroups[star.group]?.name : "Center star"}
						/>
					))}
					{activeGroup !== null && (
						<motion.div
							className="absolute bottom-4 left-4 right-4 rounded-2xl border border-violet-500/30 bg-violet-950/90 p-4 backdrop-blur-md"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<p className="font-display font-semibold text-violet-200">{skillGroups[activeGroup].name}</p>
							<p className="mt-2 text-sm text-violet-300/80">{skillGroups[activeGroup].skills.join(" · ")}</p>
						</motion.div>
					)}
				</div>

				<section className="mt-16">
					<h2 className="font-display text-xl font-semibold text-violet-200">Nebulae — projects</h2>
					<div className="mt-6 grid gap-4 sm:grid-cols-2">
						{featured.map((project, i) => (
							<motion.a
								key={project.slug}
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-2xl border border-violet-800/50 bg-gradient-to-br from-violet-900/30 to-fuchsia-900/20 p-6 transition hover:border-violet-400/40"
								initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
							>
								<h3 className="font-display text-lg font-bold text-white">{project.title}</h3>
								<p className="mt-2 text-sm text-violet-200/70">{project.description}</p>
							</motion.a>
						))}
					</div>
				</section>

				<motion.footer
					className="mt-16 text-center"
					initial={reduceMotion ? false : { opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<p className="text-sm text-violet-400">{profile.availability}</p>
					<ContactLinks className="mt-4 justify-center" linkClassName="text-sm text-violet-300 underline" />
				</motion.footer>
			</div>
		</div>
	);
}
