"use client";

import { Reveal } from "@/components/v3/reveal";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { tidy } from "@/lib/v2-text";

const more = projects.filter((p) => !p.flagship && !p.spotlight);

export default function V3Projects() {
	return (
		<section id="projects" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28">
			<Reveal className="flex flex-wrap items-end justify-between gap-6">
				<div>
					<h2 className="max-w-xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.4rem] sm:leading-[1.08]">
						More things I have built.
					</h2>
					<p className="mt-4 max-w-md text-base leading-relaxed text-brand-muted">
						Coursework, experiments, and small tools, from a Flask travel app to a VS Code extension.
					</p>
				</div>
				<a
					href={profile.github}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 rounded-full border border-brand-border px-5 py-2.5 font-space-mono text-[12px] uppercase tracking-[0.14em] text-brand-muted transition-colors hover:border-brand-emerald/50 hover:text-brand-emerald motion-reduce:transition-none"
				>
					All on GitHub
					<ArrowUpRight />
				</a>
			</Reveal>

			<ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{more.map((project, index) => (
					<Reveal as="li" key={project.slug} delay={index * 0.05}>
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-zinc/40 transition-colors duration-300 hover:border-brand-emerald/40 motion-reduce:transition-none"
						>
							<div className="overflow-hidden border-b border-brand-border/70">
								<img
									src={project.banner}
									alt={`${project.title} preview`}
									width={800}
									height={500}
									loading="lazy"
									className="aspect-[16/9] w-full bg-brand-obsidian object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
								/>
							</div>
							<div className="flex flex-1 flex-col p-5">
								<div className="flex items-center justify-between gap-3">
									<h3 className="font-satoshi text-base font-semibold text-brand-ivory">{project.title}</h3>
									<span className="text-brand-muted transition-colors group-hover:text-brand-emerald motion-reduce:transition-none">
										<ArrowUpRight />
									</span>
								</div>
								<p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{tidy(project.description)}</p>
								<ul className="mt-4 flex flex-wrap gap-1.5">
									{project.tags.slice(0, 3).map((tag) => (
										<li key={tag} className="font-space-mono text-[10.5px] uppercase tracking-[0.1em] text-brand-muted/80">
											{tag}
										</li>
									))}
								</ul>
							</div>
						</a>
					</Reveal>
				))}
			</ul>
		</section>
	);
}

function ArrowUpRight() {
	return (
		<svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
