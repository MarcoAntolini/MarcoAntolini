"use client";

import { skillGroups } from "@/content";
import { motion, useReducedMotion } from "framer-motion";

export default function V2Skills() {
	const reduceMotion = useReducedMotion();

	return (
		<section id="skills" className="scroll-mt-24 py-24 sm:py-32">
			<motion.div
				initial={reduceMotion ? false : { opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
				className="max-w-2xl"
			>
				<span className="v2-label">Toolkit</span>
				<h2 className="mt-3 font-satoshi text-3xl font-bold tracking-tight text-v2-ivory sm:text-4xl">
					What I reach for
				</h2>
				<p className="mt-4 text-base leading-relaxed text-v2-muted">
					Strongest on the frontend and mobile, comfortable across the stack when a team needs it.
				</p>
			</motion.div>

			<div className="mt-12 grid gap-4 md:grid-cols-2">
				{skillGroups.map((group, index) => (
					<motion.div
						key={group.name}
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
						className="v2-frame rounded-xl p-6"
					>
						<div className="flex items-center gap-2.5">
							<span className="h-1.5 w-1.5 rounded-full bg-v2-emerald" aria-hidden="true" />
							<h3 className="v2-label text-v2-ivory">{group.name}</h3>
						</div>
						<ul className="mt-5 flex flex-wrap gap-2">
							{group.skills.map((skill) => (
								<li
									key={skill}
									className="rounded-lg border border-v2-border bg-v2-obsidian/50 px-3 py-1.5 font-space-mono text-[12px] text-v2-ivory/90"
								>
									{skill}
								</li>
							))}
						</ul>
					</motion.div>
				))}
			</div>
		</section>
	);
}
