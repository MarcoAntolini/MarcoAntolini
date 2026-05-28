"use client";

import { Reveal } from "@/components/v3/reveal";
import { experience } from "@/content/experience";
import { tidy, tidyRange } from "@/lib/v2-text";

export default function V3Experience() {
	return (
		<section id="experience" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28">
			<Reveal>
				<h2 className="max-w-xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.4rem] sm:leading-[1.08]">
					Education and product work.
				</h2>
			</Reveal>

			<ol className="mt-14 border-l border-brand-border pl-6 sm:pl-10">
				{experience.map((item, index) => (
					<Reveal as="li" key={item.title} delay={index * 0.06} className="relative pb-12 last:pb-0">
						{/* Timeline node */}
						<span
							className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-brand-emerald bg-brand-obsidian sm:-left-[2.65rem]"
							aria-hidden="true"
						/>
						<p className="font-space-mono text-[11px] uppercase tracking-[0.2em] text-brand-emerald">
							{tidyRange(item.period)}
						</p>
						<h3 className="mt-3 font-satoshi text-xl font-semibold tracking-tight text-brand-ivory">{item.title}</h3>
						<p className="mt-1 font-satoshi text-sm text-brand-muted">
							{item.organization} / {item.location}
						</p>
						<p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-muted">{tidy(item.description)}</p>
						{item.highlights?.length ? (
							<ul className="mt-4 grid gap-2 sm:grid-cols-2">
								{item.highlights.map((highlight) => (
									<li key={highlight} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-muted">
										<span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-emerald" aria-hidden="true" />
										{tidy(highlight)}
									</li>
								))}
							</ul>
						) : null}
					</Reveal>
				))}
			</ol>
		</section>
	);
}
