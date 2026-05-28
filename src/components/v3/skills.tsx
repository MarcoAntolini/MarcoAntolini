"use client";

import { Reveal } from "@/components/v3/reveal";
import { skillGroups } from "@/content/skills";

export default function V3Skills() {
	return (
		<section id="skills" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28">
			<Reveal>
				<h2 className="max-w-xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.4rem] sm:leading-[1.08]">
					The stack I reach for.
				</h2>
			</Reveal>

			<div className="mt-12 grid gap-5 md:grid-cols-2">
				{skillGroups.map((group, index) => (
					<Reveal as="article" key={group.name} delay={index * 0.06} className="v3-surface-flat rounded-2xl p-6 sm:p-7">
						<div className="flex items-center gap-2.5">
							<span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
							<h3 className="font-space-mono text-[12px] uppercase tracking-[0.18em] text-brand-muted">{group.name}</h3>
						</div>
						<ul className="mt-5 flex flex-wrap gap-2">
							{group.skills.map((skill) => (
								<li
									key={skill}
									className="rounded-lg border border-brand-border bg-brand-obsidian/50 px-3 py-1.5 font-satoshi text-sm text-brand-ivory"
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
