"use client";

import ProjectIcon from "@/components/portfolio/project-icon";
import ProjectImage from "@/components/portfolio/project-image";
import { Reveal } from "@/components/v4/reveal";
import { getCaseStudyBySlug, hasCaseStudy } from "@/content/case-studies";
import { getProjectAccent } from "@/content/project-accents";
import { highlightProjects, type Project } from "@/content/projects";
import { tidy } from "@/lib/v2-text";

export default function V4Work() {
	return (
		<section id="work" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28">
			<Reveal>
				<h2 className="max-w-2xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.6rem] sm:leading-[1.05]">
					Products shipped to real users.
				</h2>
			</Reveal>

			<div className="mt-14 space-y-10 sm:space-y-12">
				{highlightProjects.map((project, index) => (
					<HighlightProjectCard key={project.slug} project={project} index={index} />
				))}
			</div>
		</section>
	);
}

function HighlightProjectCard({ project, index }: { project: Project; index: number }) {
	const accent = getProjectAccent(project.slug);
	const study = getCaseStudyBySlug(project.slug);

	return (
		<Reveal as="article" delay={index * 0.06}>
			<div
				className={`group relative overflow-hidden rounded-3xl border border-brand-border/80 bg-gradient-to-br ${accent.gradient} p-6 transition-colors duration-300 hover:border-brand-border sm:p-8 lg:p-10 motion-reduce:transition-none`}
			>
				<div
					className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full ${accent.glow} blur-3xl sm:h-64 sm:w-64`}
					aria-hidden="true"
				/>

				<div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
					<div>
						<div className="flex items-center gap-3">
							<ProjectIcon
								src={project.icon}
								alt=""
								size="sm"
								className="shrink-0 border-brand-border/80 bg-brand-zinc/80 shadow-black/30"
							/>
							<h3 className="font-satoshi text-2xl font-bold tracking-tight text-brand-ivory sm:text-3xl lg:text-[2rem] lg:leading-tight">
								{project.title}
							</h3>
						</div>
						<p className="mt-4 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg">
							{tidy(project.longDescription ?? project.description)}
						</p>

						<ul className="mt-6 flex flex-wrap gap-2">
							{project.tags.map((tag) => (
								<li
									key={tag}
									className={`rounded-md border px-2.5 py-1 font-space-mono text-[11px] transition-colors duration-200 ${accent.tag} ${accent.tagHover} motion-reduce:transition-none`}
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
								className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 font-satoshi text-sm font-semibold transition-colors duration-200 ${accent.primaryBtn} motion-reduce:transition-none`}
							>
								{study?.primaryCtaLabel ?? "Visit"}
								<ArrowUpRight />
							</a>
							{hasCaseStudy(project.slug) ? (
								<a
									href={`/work/${project.slug}`}
									className={`inline-flex min-h-11 items-center gap-2 rounded-full border bg-brand-obsidian/30 px-5 py-2.5 font-satoshi text-sm font-medium text-brand-ivory backdrop-blur-sm transition-colors duration-200 ${accent.caseStudyRing} motion-reduce:transition-none`}
								>
									Read case study
									<ArrowDiagonal />
								</a>
							) : project.github ? (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-border bg-brand-obsidian/30 px-5 py-2.5 font-satoshi text-sm font-medium text-brand-muted backdrop-blur-sm transition-colors duration-200 ${accent.ghostHover} motion-reduce:transition-none`}
								>
									GitHub
									<ArrowDiagonal />
								</a>
							) : null}
						</div>
					</div>

					<div className={`overflow-hidden rounded-2xl border ${accent.imageBorder} bg-brand-obsidian/60`}>
						<ProjectImage
							src={project.banner}
							alt={`${project.title} preview`}
							className="aspect-[16/10] w-full opacity-95"
							sizes="(max-width: 1024px) 100vw, 50vw"
							priority={project.flagship}
						/>
					</div>
				</div>
			</div>
		</Reveal>
	);
}

function ArrowUpRight() {
	return (
		<svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function ArrowDiagonal() {
	return (
		<svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M4 12 12 4M5 4h7v7" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
