"use client";

import { Reveal } from "@/components/site/reveal";
import { getSkillGroups } from "@/content/skills";
import { getSiteCopy } from "@/content/site-copy";
import type { Locale } from "@/lib/i18n";

type SkillsProps = {
	locale?: Locale;
};

export default function Skills({ locale = "en" }: SkillsProps) {
	const copy = getSiteCopy(locale);
	const skillGroups = getSkillGroups(locale);

	return (
		<section id="skills" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28" aria-labelledby="site-skills-heading">
			<Reveal>
				<h2 id="site-skills-heading" className="max-w-xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.4rem] sm:leading-[1.08]">
					{copy.skills.heading}
				</h2>
			</Reveal>

			<div className="mt-12 grid gap-5 sm:grid-cols-2">
				{skillGroups.map((group, index) => (
					<Reveal
						as="article"
						key={group.name}
						delay={index * 0.07}
						className="site-surface-flat rounded-2xl p-6 transition-colors duration-300 hover:border-brand-emerald/20 motion-reduce:transition-none"
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
