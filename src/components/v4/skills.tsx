"use client";

import { Reveal } from "@/components/v4/reveal";
import { skillGroups } from "@/content/skills";

export default function V4Skills() {
	return (
		<section id="skills" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28" aria-labelledby="v4-skills-heading">
			<Reveal>
				<h2 id="v4-skills-heading" className="max-w-xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.4rem] sm:leading-[1.08]">
					Skills and stack
				</h2>
				<p className="mt-4 max-w-lg text-base leading-relaxed text-brand-muted">
					Strongest where users meet the product: React, Next.js, Flutter, and TypeScript.
				</p>
			</Reveal>

			<div className="mt-12 grid gap-5 sm:grid-cols-2">
				{skillGroups.map((group, index) => (
					<Reveal
						as="article"
						key={group.name}
						delay={index * 0.07}
						className="v4-surface-flat rounded-2xl p-6 transition-colors duration-300 hover:border-brand-emerald/20 motion-reduce:transition-none"
					>
						<h3 className="font-space-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-emerald">{group.name}</h3>
						<ul className="mt-5 flex flex-wrap gap-2">
							{group.skills.map((skill) => (
								<li
									key={skill}
									className="rounded-lg border border-brand-border bg-brand-obsidian/50 px-3 py-1.5 text-sm text-brand-ivory transition-colors duration-200 hover:border-brand-emerald/40 hover:bg-brand-emerald/10 hover:text-brand-emerald motion-reduce:transition-none"
								>
									{skill}
								</li>
							))}
						</ul>
					</Reveal>
				))}
			</div>
		</section>
	);
}
