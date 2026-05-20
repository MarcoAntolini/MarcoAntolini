"use client";

import SectionHeading from "@/components/portfolio/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/portfolio/motion";
import { flagshipProject, projects } from "@/content/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import ProjectImage from "@/components/portfolio/project-image";

const otherProjects = projects.filter((p) => !p.flagship && p.featured);

export default function WorkSection() {
	const flagship = flagshipProject;

	return (
		<section id="work" className="scroll-mt-28 py-20 sm:py-28" aria-labelledby="work-label">
			<div>
				<SectionHeading
					id="work"
					eyebrow="Selected work"
					title="Products I've shipped"
					description="From a live community tool used by players to coursework and side projects — each one shows how I think about UX, performance, and maintainable code."
				/>

				<Reveal>
					<article className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 via-zinc-900/50 to-emerald-950/20 p-6 sm:p-8 lg:p-10">
						<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl transition group-hover:bg-emerald-500/20 motion-reduce:transition-none" />
						<div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
							<div>
								<p className="font-mono text-xs uppercase tracking-widest text-emerald-400">Flagship</p>
								<h3 className="mt-3 font-display text-3xl font-semibold text-zinc-50 sm:text-4xl">{flagship.title}</h3>
								<p className="mt-4 text-lg leading-relaxed text-zinc-400">{flagship.longDescription}</p>
								<ul className="mt-6 flex flex-wrap gap-2">
									{flagship.tags.map((tag) => (
										<li
											key={tag}
											className="rounded-md border border-zinc-700/80 bg-zinc-950/60 px-2.5 py-1 font-mono text-xs text-zinc-300"
										>
											{tag}
										</li>
									))}
								</ul>
								<div className="mt-8 flex flex-wrap gap-3">
									<a
										href={flagship.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 motion-reduce:transition-none"
									>
										Live site <ExternalLink className="h-4 w-4" />
									</a>
									<a
										href="/work/dracania-archives"
										className="glass-panel inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-emerald-500/40 motion-reduce:transition-none"
									>
										Read case study <ArrowUpRight className="h-4 w-4" />
									</a>
								</div>
							</div>
							<div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-700/80">
								<ProjectImage
									src={flagship.image}
									alt={`${flagship.title} preview`}
									className="transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
									sizes="(max-width: 1024px) 100vw, 50vw"
									priority
								/>
							</div>
						</div>
					</article>
				</Reveal>

				<Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
					{otherProjects.map((project, index) => (
						<StaggerItem
							key={project.slug}
							className={`glass-panel group flex flex-col rounded-2xl p-6 transition hover:border-emerald-500/30 motion-reduce:transition-none ${
								index === 0 ? "sm:row-span-1" : ""
							}`}
						>
							<div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl border border-zinc-800">
								<ProjectImage
									src={project.image}
									alt=""
									className="object-cover opacity-90 transition group-hover:scale-105 motion-reduce:transition-none"
									sizes="(max-width: 640px) 100vw, 50vw"
								/>
							</div>
							<h3 className="font-display text-xl font-semibold text-zinc-100">{project.title}</h3>
							<p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{project.description}</p>
							<ul className="mt-4 flex flex-wrap gap-1.5">
								{project.tags.slice(0, 3).map((tag) => (
									<li key={tag} className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
										{tag}
									</li>
								))}
							</ul>
							<a
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-400 transition hover:text-emerald-300 motion-reduce:transition-none"
							>
								View project <ArrowUpRight className="h-4 w-4" />
							</a>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
