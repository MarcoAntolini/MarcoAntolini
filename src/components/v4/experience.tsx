"use client";

import { Stagger, StaggerItem } from "@/components/portfolio/motion";
import { Reveal } from "@/components/v4/reveal";
import { experience } from "@/content/experience";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function V4Experience() {
	const reduceMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 0.8", "end 0.4"],
	});
	const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

	return (
		<section id="experience" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28" aria-labelledby="v4-experience-heading">
			<Reveal>
				<h2 id="v4-experience-heading" className="max-w-xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.4rem] sm:leading-[1.08]">
					Where I&apos;ve been building
				</h2>
			</Reveal>

			<div ref={containerRef} className="relative mt-12">
				<div className="absolute bottom-0 left-[7px] top-2 w-px bg-brand-border sm:left-[11px]" aria-hidden />
				{reduceMotion ? null : (
					<motion.div
						className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-brand-emerald via-brand-emerald/60 to-transparent sm:left-[11px]"
						style={{ scaleY: lineScale }}
						aria-hidden
					/>
				)}
				<Stagger className="space-y-8">
					{experience.map((item, index) => (
						<StaggerItem key={`${item.title}-${item.period}`} className="relative pl-8 sm:pl-12">
							<motion.span
								className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-emerald bg-brand-obsidian sm:h-6 sm:w-6"
								initial={reduceMotion ? false : { scale: 0 }}
								whileInView={{ scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
								aria-hidden
							>
								<span className="h-1.5 w-1.5 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
							</motion.span>
							<motion.article
								className="v4-surface-flat rounded-2xl p-6 sm:p-8"
								whileHover={reduceMotion ? undefined : { x: 4 }}
								transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							>
								<div className="flex flex-wrap items-start justify-between gap-3">
									<div>
										<h3 className="font-satoshi text-xl font-semibold text-brand-ivory">{item.title}</h3>
										<p className="mt-1 text-brand-emerald">{item.organization}</p>
									</div>
									<p className="font-space-mono text-xs text-brand-muted">{item.period}</p>
								</div>
								<p className="mt-1 font-space-mono text-xs text-brand-muted/70">{item.location}</p>
								<p className="mt-4 leading-relaxed text-brand-muted">{item.description}</p>
								{item.highlights ? (
									<ul className="mt-4 space-y-2">
										{item.highlights.map((highlight) => (
											<li key={highlight} className="flex gap-2 text-sm text-brand-ivory/85">
												<span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-emerald" aria-hidden />
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
		</section>
	);
}
