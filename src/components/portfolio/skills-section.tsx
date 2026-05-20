"use client";

import SectionHeading from "@/components/portfolio/section-heading";
import { Stagger, StaggerItem } from "@/components/portfolio/motion";
import { skillGroups } from "@/content/skills";

export default function SkillsSection() {
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
						<StaggerItem
							key={group.name}
							className="glass-panel rounded-2xl p-6 transition hover:border-emerald-500/25 motion-reduce:transition-none"
						>
							<h3 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-emerald-400/90">
								{group.name}
							</h3>
							<ul className="mt-5 flex flex-wrap gap-2">
								{group.skills.map((skill) => (
									<li
										key={skill}
										className="rounded-lg border border-zinc-700/60 bg-zinc-950/50 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-emerald-500/40 hover:text-zinc-100 motion-reduce:transition-none"
									>
										{skill}
									</li>
								))}
							</ul>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
