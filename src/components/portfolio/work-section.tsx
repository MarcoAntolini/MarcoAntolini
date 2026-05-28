"use client";

import SectionHeading from "@/components/portfolio/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/portfolio/motion";
import TiltCard from "@/components/portfolio/tilt-card";
import { hasCaseStudy } from "@/content/case-studies";
import { highlightProjects, projects, type Project } from "@/content/projects";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import ProjectIcon from "@/components/portfolio/project-icon";
import ProjectImage from "@/components/portfolio/project-image";

const otherProjects = projects.filter((p) => !p.flagship && !p.spotlight && p.featured);

type HighlightTheme = {
	badge: string;
	gradient: string;
	glow: string;
	glowHover: string;
	shimmer: string;
	tagHover: string;
	primaryLabel: string;
};

const highlightThemes: Record<"flagship" | "spotlight", HighlightTheme> = {
	flagship: {
		badge: "Flagship",
		gradient: "from-zinc-900/90 via-zinc-900/50 to-emerald-950/20",
		glow: "bg-emerald-500/10",
		glowHover: "group-hover:bg-emerald-500/25",
		shimmer: "via-emerald-400/5",
		tagHover: "hover:border-emerald-500/40 hover:text-emerald-200",
		primaryLabel: "Live site",
	},
	spotlight: {
		badge: "Chrome Web Store",
		gradient: "from-zinc-900/90 via-zinc-900/50 to-fuchsia-950/25",
		glow: "bg-fuchsia-500/10",
		glowHover: "group-hover:bg-fuchsia-500/25",
		shimmer: "via-fuchsia-400/5",
		tagHover: "hover:border-fuchsia-500/40 hover:text-fuchsia-200",
		primaryLabel: "Add to Chrome",
	},
};

function getHighlightTheme(project: Project): HighlightTheme {
	return project.flagship ? highlightThemes.flagship : highlightThemes.spotlight;
}

function HighlightProjectCard({ project }: { project: Project }) {
	const theme = getHighlightTheme(project);
	const reduceMotion = useReducedMotion();

	return (
		<Reveal>
			<TiltCard intensity={6}>
				<article
					className={`group relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br ${theme.gradient} p-6 sm:p-8 lg:p-10`}
				>
					<div
						className={`absolute -right-20 -top-20 h-64 w-64 rounded-full ${theme.glow} blur-3xl transition duration-700 ${theme.glowHover} motion-reduce:transition-none`}
					/>
					<div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 motion-reduce:transition-none">
						<div
							className={`absolute inset-0 animate-shimmer-slide bg-gradient-to-r from-transparent ${theme.shimmer} to-transparent motion-reduce:animate-none`}
						/>
					</div>
					<div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
						<div>
							<div className="flex items-center gap-3">
								<ProjectIcon src={project.icon} alt="" size="sm" />
								<p
									className={`font-mono text-xs uppercase tracking-widest ${project.flagship ? "text-emerald-400" : "text-fuchsia-400"}`}
								>
									{theme.badge}
								</p>
							</div>
							<h3 className="mt-3 font-display text-3xl font-semibold text-zinc-50 sm:text-4xl">{project.title}</h3>
							<p className="mt-4 text-lg leading-relaxed text-zinc-400">{project.longDescription ?? project.description}</p>
							<ul className="mt-6 flex flex-wrap gap-2">
								{project.tags.map((tag) => (
									<li
										key={tag}
										className={`rounded-md border border-zinc-700/80 bg-zinc-950/60 px-2.5 py-1 font-mono text-xs text-zinc-300 transition ${theme.tagHover} motion-reduce:transition-none`}
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
									className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition motion-reduce:transition-none ${
										project.flagship
											? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
											: "bg-fuchsia-500 text-zinc-950 hover:bg-fuchsia-400"
									}`}
								>
									{theme.primaryLabel} <ExternalLink className="h-4 w-4" />
								</a>
								{hasCaseStudy(project.slug) ? (
									<a
										href={`/work/${project.slug}`}
										className={`glass-panel inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-200 transition motion-reduce:transition-none ${
											project.flagship ? "hover:border-emerald-500/40" : "hover:border-fuchsia-500/40"
										}`}
									>
										Read case study <ArrowUpRight className="h-4 w-4" />
									</a>
								) : project.github ? (
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="glass-panel inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-fuchsia-500/40 motion-reduce:transition-none"
									>
										View on GitHub <Github className="h-4 w-4" />
									</a>
								) : null}
							</div>
						</div>
						<motion.div
							className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-700/80"
							whileHover={reduceMotion ? undefined : { scale: 1.01 }}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
						>
							<ProjectImage
								src={project.banner}
								alt={`${project.title} preview`}
								className="transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
								sizes="(max-width: 1024px) 100vw, 50vw"
								priority={project.flagship}
							/>
						</motion.div>
					</div>
				</article>
			</TiltCard>
		</Reveal>
	);
}

export default function WorkSection() {
	return (
		<section id="work" className="scroll-mt-28 py-20 sm:py-28" aria-labelledby="work-label">
			<div>
				<SectionHeading
					id="work"
					eyebrow="Selected work"
					title="Products I've shipped"
					description="From a live community web app to a published Chrome extension — each one shows how I think about UX, performance, and maintainable code."
				/>

				<div className="space-y-10">
					{highlightProjects.map((project) => (
						<HighlightProjectCard key={project.slug} project={project} />
					))}
				</div>

				{otherProjects.length > 0 ? (
					<Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
						{otherProjects.map((project) => (
							<StaggerItem key={project.slug}>
								<TiltCard
									intensity={8}
									className="glass-panel group flex h-full flex-col rounded-2xl p-6 transition hover:border-emerald-500/30 motion-reduce:transition-none"
								>
									<div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl border border-zinc-800">
										<ProjectImage
											src={project.banner}
											alt=""
											className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100 motion-reduce:transition-none"
											sizes="(max-width: 640px) 100vw, 50vw"
										/>
										<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 transition group-hover:opacity-40 motion-reduce:transition-none" />
									</div>
									<h3 className="font-display text-xl font-semibold text-zinc-100 transition group-hover:text-emerald-100 motion-reduce:transition-none">
										{project.title}
									</h3>
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
										className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-400 transition hover:gap-2 hover:text-emerald-300 motion-reduce:transition-none"
									>
										View project <ArrowUpRight className="h-4 w-4" />
									</a>
								</TiltCard>
							</StaggerItem>
						))}
					</Stagger>
				) : null}
			</div>
		</section>
	);
}
