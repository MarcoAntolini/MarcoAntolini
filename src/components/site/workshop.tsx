"use client";

import ProjectIcon from "@/components/shared/project-icon";
import { Reveal } from "@/components/site/reveal";
import { getProjectAccent } from "@/content/project-accents";
import { getWorkshopProjects, type Project } from "@/content/projects";
import { getSiteCopy } from "@/content/site-copy";
import type { Locale } from "@/lib/i18n";
import { tidy } from "@/lib/text";

type WorkshopProps = {
	locale?: Locale;
};

export default function Workshop({ locale = "en" }: WorkshopProps) {
	const copy = getSiteCopy(locale);
	const workshopProjects = getWorkshopProjects(locale);

	if (workshopProjects.length === 0) return null;

	return (
		<section aria-labelledby="site-workshop-heading" className="py-12 sm:py-16">
			<Reveal>
				<h2 id="site-workshop-heading" className="font-satoshi text-2xl font-bold tracking-tight text-brand-ivory sm:text-3xl">
					{copy.workshop.heading}
				</h2>
			</Reveal>

			<div className="mt-10 grid gap-4 sm:grid-cols-2">
				{workshopProjects.map((project, index) => (
					<ProjectCard key={project.slug} project={project} index={index} locale={locale} />
				))}
			</div>
		</section>
	);
}

function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
	const accent = getProjectAccent(project.slug);
	const copy = getSiteCopy(locale);

	return (
		<Reveal as="article" delay={index * 0.05}>
			<div
				className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border/80 bg-gradient-to-br ${accent.gradient} p-6 transition-colors duration-300 hover:border-brand-border sm:p-7 motion-reduce:transition-none`}
			>
				<div
					className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full ${accent.glow} blur-3xl`}
					aria-hidden="true"
				/>

				<div className="relative flex flex-1 flex-col">
					<div className="flex items-center gap-3">
						<ProjectIcon
							src={project.icon}
							alt=""
							size="sm"
							className="shrink-0 border-brand-border/80 bg-brand-zinc/80 shadow-black/30"
						/>
						<h3 className="font-satoshi text-lg font-semibold tracking-tight text-brand-ivory sm:text-xl">
							{project.title}
						</h3>
					</div>

					<p className="mt-4 flex-1 text-sm leading-relaxed text-brand-muted sm:text-base">
						{tidy(project.longDescription ?? project.description)}
					</p>

					<ul className="mt-5 flex flex-wrap gap-2" aria-label={copy.workshop.stackLabel}>
						{project.tags.map((tag) => (
							<li
								key={tag}
								className={`rounded-full border px-2.5 py-0.5 font-space-mono text-[10.5px] transition-colors duration-200 ${accent.tag} ${accent.tagHover} motion-reduce:transition-none`}
							>
								{tag}
							</li>
						))}
					</ul>

					<div className="mt-6 flex flex-wrap items-center gap-3">
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className={`inline-flex min-h-10 items-center gap-2 rounded-full px-5 py-2 font-satoshi text-sm font-semibold transition-colors duration-200 ${accent.primaryBtn} motion-reduce:transition-none`}
						>
							{project.workshopCta ?? copy.workshop.viewProject}
							<ArrowUpRight />
						</a>
						{project.vscode && accent.secondaryBtn ? (
							<a
								href={project.vscode}
								target="_blank"
								rel="noopener noreferrer"
								className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 font-satoshi text-sm font-medium transition-colors duration-200 ${accent.secondaryBtn} motion-reduce:transition-none`}
							>
								{copy.workshop.vscode}
								<ArrowUpRight />
							</a>
						) : null}
						{project.github ? (
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								className={`inline-flex min-h-10 items-center gap-2 font-space-mono text-[12px] uppercase tracking-[0.14em] text-brand-muted transition-colors duration-200 ${accent.ghostHover} motion-reduce:transition-none`}
							>
								GitHub
								<ArrowUpRight />
							</a>
						) : null}
					</div>
				</div>
			</div>
		</Reveal>
	);
}

function ArrowUpRight() {
	return (
		<svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
