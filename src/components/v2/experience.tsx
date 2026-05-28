"use client";

import { experience } from "@/content";
import { tidy, tidyRange } from "@/lib/v2-text";
import { motion, useReducedMotion } from "framer-motion";

export default function V2Experience() {
	const reduceMotion = useReducedMotion();

	return (
		<section id="experience" className="scroll-mt-24 py-24 sm:py-32">
			<motion.div
				initial={reduceMotion ? false : { opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			>
				<span className="v2-label">Trajectory</span>
				<h2 className="mt-3 max-w-2xl font-satoshi text-3xl font-bold tracking-tight text-v2-ivory sm:text-4xl">
					Studying, shipping, and looking for the next team.
				</h2>
			</motion.div>

			<ol className="mt-14 border-l border-v2-border">
				{experience.map((item, index) => (
					<motion.li
						key={`${item.organization}-${item.title}`}
						initial={reduceMotion ? false : { opacity: 0, x: 16 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
						className="relative pb-12 pl-8 last:pb-0"
					>
						<span className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border border-v2-emerald bg-v2-obsidian" aria-hidden="true">
							<span className="absolute inset-[3px] rounded-full bg-v2-emerald" />
						</span>
						<span className="font-space-mono text-[12px] uppercase tracking-[0.14em] text-v2-emerald">
							{tidyRange(item.period)}
						</span>
						<h3 className="mt-2 font-satoshi text-xl font-semibold tracking-tight text-v2-ivory">
							{item.title}
						</h3>
						<p className="mt-1 font-space-mono text-[12px] text-v2-muted">
							{item.organization} · {item.location}
						</p>
						<p className="mt-3 max-w-2xl text-base leading-relaxed text-v2-muted">{tidy(item.description)}</p>
						{item.highlights ? (
							<ul className="mt-4 space-y-2">
								{item.highlights.map((highlight) => (
									<li key={highlight} className="flex gap-3 text-sm leading-relaxed text-v2-muted">
										<span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-v2-emerald" aria-hidden="true" />
										{tidy(highlight)}
									</li>
								))}
							</ul>
						) : null}
					</motion.li>
				))}
			</ol>
		</section>
	);
}
