"use client";

import ProjectPreviewFrame from "@/components/portfolio/project-preview-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/portfolio/motion";
import { dracaniaCaseStudy } from "@/content/dracania-case-study";
import { flagshipProject } from "@/content/projects";
import { AlertTriangle, ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Layers, Target, Wrench } from "lucide-react";

const sectionIcons: Record<string, typeof Target> = {
	problem: Target,
	role: Layers,
	stack: Wrench,
	challenges: AlertTriangle,
	outcomes: CheckCircle2,
};

export default function DracaniaCaseStudy() {
	const project = flagshipProject;
	const { highlights, sections } = dracaniaCaseStudy;

	return (
		<article className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:pt-32">
			<Reveal>
				<a
					href="/#work"
					className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 transition hover:text-emerald-400 motion-reduce:transition-none"
				>
					<ArrowLeft className="h-4 w-4" aria-hidden />
					Back to portfolio
				</a>
			</Reveal>

			<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
				<Reveal>
					<p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400/90">Case study</p>
					<h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
						{project.title}
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">{project.longDescription}</p>
					<ul className="mt-6 flex flex-wrap gap-2">
						{project.tags.map((tag) => (
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
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 motion-reduce:transition-none"
						>
							Visit live site
							<ExternalLink className="h-4 w-4" aria-hidden />
						</a>
						<a
							href="/#contact"
							className="glass-panel inline-flex min-h-12 items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-emerald-500/40 motion-reduce:transition-none"
						>
							Get in touch
						</a>
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<ProjectPreviewFrame
						src={project.image}
						alt={`${project.title} application preview`}
						domain="dracania-archives.com"
						priority
					/>
				</Reveal>
			</div>

			<Stagger className="mt-14 grid gap-4 sm:grid-cols-3">
				{highlights.map((item) => (
					<StaggerItem
						key={item.label}
						className="glass-panel rounded-2xl px-5 py-4"
					>
						<p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{item.label}</p>
						<p className="mt-2 font-display text-lg font-semibold text-zinc-100">{item.value}</p>
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-14 grid gap-5 md:grid-cols-2">
				{sections.map((section, index) => {
					const Icon = sectionIcons[section.id] ?? Target;
					const isOutcomes = section.id === "outcomes";
					const isWide = section.id === "problem" || isOutcomes;

					return (
						<Reveal
							key={section.id}
							delay={index * 0.04}
							className={isWide ? "md:col-span-2" : undefined}
						>
							<section
								className={`h-full rounded-2xl border p-6 sm:p-8 ${
									isOutcomes
										? "border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-zinc-900/50 to-zinc-950/80"
										: "glass-panel border-zinc-800/80"
								}`}
								aria-labelledby={`${section.id}-heading`}
							>
								<div className="flex items-start gap-3">
									<span
										className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
											isOutcomes ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-800/80 text-zinc-400"
										}`}
									>
										<Icon className="h-4 w-4" aria-hidden />
									</span>
									<div className="min-w-0 flex-1">
										<h2
											id={`${section.id}-heading`}
											className="font-display text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl"
										>
											{section.title}
										</h2>
										{section.body ? (
											<p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-400">{section.body}</p>
										) : null}
										{section.items ? (
											<ul className={`mt-4 space-y-2.5 ${section.id === "stack" ? "flex flex-wrap gap-2 space-y-0" : ""}`}>
												{section.items.map((item) =>
													section.id === "stack" ? (
														<li
															key={item}
															className="rounded-md border border-zinc-700/80 bg-zinc-950/60 px-2.5 py-1 font-mono text-xs text-zinc-300"
														>
															{item}
														</li>
													) : (
														<li key={item} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400 sm:text-base">
															<span
																className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
																	isOutcomes ? "bg-emerald-400" : "bg-zinc-600"
																}`}
																aria-hidden
															/>
															<span>
																{item.includes("dracania-archives.com") ? (
																	<>
																		Live production app at{" "}
																		<a
																			href={project.href}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="font-medium text-emerald-400 underline-offset-2 transition hover:text-emerald-300 hover:underline motion-reduce:transition-none"
																		>
																			dracania-archives.com
																		</a>{" "}
																		used by active players
																	</>
																) : (
																	item
																)}
															</span>
														</li>
													),
												)}
											</ul>
										) : null}
									</div>
								</div>
							</section>
						</Reveal>
					);
				})}
			</div>

			<Reveal className="mt-14">
				<div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:flex-row sm:items-center sm:p-8">
					<div>
						<p className="font-mono text-xs uppercase tracking-widest text-emerald-400/90">Next step</p>
						<p className="mt-2 font-display text-2xl font-semibold text-zinc-50">Want to dig into the live product?</p>
						<p className="mt-2 max-w-md text-sm text-zinc-400">
							Explore search, filters, and community tooling on the production deployment.
						</p>
					</div>
					<a
						href={project.href}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 motion-reduce:transition-none"
					>
						Open Dracania Archives
						<ArrowUpRight className="h-4 w-4" aria-hidden />
					</a>
				</div>
			</Reveal>
		</article>
	);
}
