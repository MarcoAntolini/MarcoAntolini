"use client";

import SectionHeading from "@/components/portfolio/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/portfolio/motion";
import { profile } from "@/content/profile";
import { motion, useReducedMotion } from "framer-motion";

export default function AboutSection() {
	const reduceMotion = useReducedMotion();

	return (
		<section id="about" className="scroll-mt-28 py-20 sm:py-28" aria-labelledby="about-label">
			<div>
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					<SectionHeading
						id="about"
						eyebrow="About"
						title="Building interfaces that feel intentional"
						description="I'm a Computer Science student who'd rather ship polished UI than slide decks."
					/>

					<div className="space-y-8">
						<Reveal className="space-y-5 text-lg leading-relaxed text-zinc-400">
							{profile.about.map((paragraph) => (
								<p key={paragraph.slice(0, 40)}>{paragraph}</p>
							))}
						</Reveal>

						<Stagger className="grid gap-3 sm:grid-cols-3">
							{profile.interests.map((interest) => (
								<StaggerItem key={interest.label}>
									<motion.article
										className="group h-full rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-4 transition hover:border-emerald-500/30 hover:bg-zinc-900/60 motion-reduce:transition-none"
										whileHover={reduceMotion ? undefined : { y: -4 }}
										transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
									>
										<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400/90">
											{interest.label}
										</p>
										<p className="mt-2 text-sm leading-relaxed text-zinc-400 transition group-hover:text-zinc-300 motion-reduce:transition-none">
											{interest.detail}
										</p>
									</motion.article>
								</StaggerItem>
							))}
						</Stagger>

						<Reveal delay={0.1}>
							<div className="shimmer-border relative overflow-hidden rounded-2xl p-6">
								<div className="pointer-events-none absolute inset-0 bg-emerald-500/5" aria-hidden="true" />
								<p className="relative font-mono text-sm text-emerald-400/90">Currently</p>
								<p className="relative mt-2 font-medium text-zinc-200">{profile.availability}</p>
								<p className="relative mt-3 font-mono text-xs text-zinc-500">{profile.signature}</p>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
