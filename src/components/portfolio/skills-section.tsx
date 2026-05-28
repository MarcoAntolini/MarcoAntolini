"use client";

import SectionHeading from "@/components/portfolio/section-heading";
import { Stagger, StaggerItem } from "@/components/portfolio/motion";
import { skillGroups } from "@/content/skills";
import { motion, useReducedMotion } from "framer-motion";

export default function SkillsSection() {
	const reduceMotion = useReducedMotion();

	return (
		<section id="skills" className="scroll-mt-28 py-20 sm:py-28" aria-labelledby="skills-label">
			<div>
				<SectionHeading
					id="skills"
					eyebrow="Toolkit"
					title="Skills & stack"
					description="Comfortable across the stack, strongest where users meet the product — React, Next.js, Flutter, and TypeScript."
				/>

				<Stagger className="grid gap-5 sm:grid-cols-2">
					{skillGroups.map((group) => (
						<StaggerItem key={group.name}>
							<motion.article
								className="glass-panel group rounded-2xl p-6 transition hover:border-emerald-500/25 motion-reduce:transition-none"
								whileHover={reduceMotion ? undefined : { y: -3 }}
								transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							>
								<h3 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-emerald-400/90">
									{group.name}
								</h3>
								<ul className="mt-5 flex flex-wrap gap-2">
									{group.skills.map((skill, index) => (
										<motion.li
											key={skill}
											className="rounded-lg border border-zinc-700/60 bg-zinc-950/50 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-100 motion-reduce:transition-none"
											whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
											initial={reduceMotion ? false : { opacity: 0, y: 8 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: index * 0.03, duration: 0.35 }}
										>
											{skill}
										</motion.li>
									))}
								</ul>
							</motion.article>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
