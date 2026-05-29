"use client";

import ProjectIcon from "@/components/portfolio/project-icon";
import { BrowserFrame, StatusDot } from "@/components/v4/frame";
import { Reveal } from "@/components/v4/reveal";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { highlightProjects } from "@/content/projects";
import { tidy } from "@/lib/v2-text";
export default function V4Work() {
	return (
		<section id="work" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28">
			<Reveal>
				<h2 className="max-w-2xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.6rem] sm:leading-[1.05]">
					Products shipped to real users.
				</h2>
			</Reveal>

			<div className="mt-14 flex flex-col gap-16 sm:gap-24">
				{highlightProjects.map((project, index) => (
					<FeaturedProject key={project.slug} slug={project.slug} flip={index % 2 === 1} />
				))}
			</div>
		</section>
	);
}

function FeaturedProject({ slug, flip }: { slug: string; flip: boolean }) {
	const project = highlightProjects.find((p) => p.slug === slug)!;
	const study = getCaseStudyBySlug(slug);
	const live = project.flagship;
	const banner = slug === "csshub" ? "/projects/banners/csshub.png" : (project.banner ?? `/projects/banners/${slug}.svg`);

	return (
		<Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
			<div className={flip ? "lg:order-2" : undefined}>
				<BrowserFrame
					url={study?.previewDomain ?? project.href}
					status={
						live ? (
							<span className="inline-flex items-center gap-1.5 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-2.5 py-1 font-space-mono text-[10px] uppercase tracking-[0.16em] text-brand-emerald">
								<StatusDot tone="emerald" /> Live
							</span>
						) : (
							<span className="inline-flex items-center gap-1.5 rounded-full border border-brand-amber/30 bg-brand-amber/10 px-2.5 py-1 font-space-mono text-[10px] uppercase tracking-[0.16em] text-brand-amber">
								<StatusDot tone="amber" /> Published
							</span>
						)
					}
				>
					<img
						src={banner}
						alt={`${project.title}. ${tidy(project.description)}`}
						width={800}
						height={500}
						loading="lazy"
						className="aspect-[16/10] w-full bg-brand-obsidian object-cover"
					/>
				</BrowserFrame>
			</div>

			<div className={flip ? "lg:order-1" : ""}>
				<div className="flex items-center gap-3">
					<ProjectIcon
						src={project.icon}
						alt=""
						size="sm"
						className="border-brand-border bg-brand-zinc/80 shadow-black/30"
					/>
					<h3 className="font-satoshi text-2xl font-bold tracking-tight text-brand-ivory sm:text-3xl">{project.title}</h3>
				</div>
				<p className="mt-4 max-w-md text-base leading-relaxed text-brand-muted">
					{tidy(project.longDescription ?? project.description)}
				</p>

				{study ? (
					<dl className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-brand-border bg-brand-border/60">
						{study.highlights.map((h) => (
							<div key={h.label} className="bg-brand-zinc/40 px-3 py-4">
								<dt className="v4-label !text-[10px]">{h.label}</dt>
								<dd className="mt-2 font-satoshi text-[13px] font-medium leading-snug text-brand-ivory">{tidy(h.value)}</dd>
							</div>
						))}
					</dl>
				) : null}

				<ul className="mt-6 flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<li
							key={tag}
							className="rounded-md border border-brand-border bg-brand-zinc/40 px-2.5 py-1 font-space-mono text-[11px] text-brand-muted"
						>
							{tag}
						</li>
					))}
				</ul>

				<div className="mt-8 flex flex-wrap items-center gap-3">
					<a
						href={`/work/${slug}`}
						className="group inline-flex items-center gap-2 rounded-full border border-brand-emerald/40 px-5 py-2.5 font-satoshi text-sm font-semibold text-brand-emerald transition-colors hover:bg-brand-emerald/10 motion-reduce:transition-none"
					>
						Read case study
						<ArrowRight />
					</a>
					<a
						href={project.href}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 font-space-mono text-[12px] uppercase tracking-[0.14em] text-brand-muted transition-colors hover:text-brand-ivory motion-reduce:transition-none"
					>
						{study?.primaryCtaLabel ?? "Visit"}
						<ArrowUpRight />
					</a>
				</div>
			</div>
		</Reveal>
	);
}

function ArrowRight() {
	return (
		<svg
			viewBox="0 0 16 16"
			className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			aria-hidden="true"
		>
			<path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function ArrowUpRight() {
	return (
		<svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
