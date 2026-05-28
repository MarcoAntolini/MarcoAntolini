"use client";

import SectionHeading from "@/components/portfolio/section-heading";
import { Stagger, StaggerItem } from "@/components/portfolio/motion";
import { experience } from "@/content/experience";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ExperienceSection() {
	const reduceMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 0.8", "end 0.4"],
	});
	const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

	return (
		<section id="experience" className="scroll-mt-28 py-20 sm:py-28" aria-labelledby="experience-label">
			<div>
				<SectionHeading
					id="experience"
					eyebrow="Experience"
					title="Where I've been building"
					description="University foundations, independent product work, and what I'm looking for next."
				/>

				<div ref={containerRef} className="relative">
					<div
						className="absolute bottom-0 left-[7px] top-2 w-px bg-zinc-800 sm:left-[11px]"
						aria-hidden
					/>
					{reduceMotion ? null : (
						<motion.div
							className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-emerald-400 via-emerald-500/60 to-transparent sm:left-[11px]"
							style={{ scaleY: lineScale }}
							aria-hidden
						/>
					)}
					<Stagger className="space-y-8">
						{experience.map((item, index) => (
							<StaggerItem key={`${item.title}-${item.period}`} className="relative pl-8 sm:pl-12">
								<motion.span
									className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-emerald-500 bg-zinc-950 sm:h-6 sm:w-6"
									initial={reduceMotion ? false : { scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
									aria-hidden
								>
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
								</motion.span>
								<motion.article
									className="glass-panel rounded-2xl p-6 sm:p-8"
									whileHover={reduceMotion ? undefined : { x: 4 }}
									transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
								>
									<div className="flex flex-wrap items-start justify-between gap-3">
										<div>
											<h3 className="font-display text-xl font-semibold text-zinc-50">{item.title}</h3>
											<p className="mt-1 text-emerald-400/90">{item.organization}</p>
										</div>
										<p className="font-mono text-xs text-zinc-500">{item.period}</p>
									</div>
									<p className="mt-1 font-mono text-xs text-zinc-600">{item.location}</p>
									<p className="mt-4 leading-relaxed text-zinc-400">{item.description}</p>
									{item.highlights ? (
										<ul className="mt-4 space-y-2">
											{item.highlights.map((highlight) => (
												<li key={highlight} className="flex gap-2 text-sm text-zinc-300">
													<span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" aria-hidden />
													{highlight}
												</li>
											))}
										</ul>
									) : null}
								</motion.article>
							</StaggerItem>
						))}
					</Stagger>
				</div>
			</div>
		</section>
	);
}
