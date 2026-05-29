"use client";

import ProjectPreviewFrame from "@/components/portfolio/project-preview-frame";
import { Reveal, Stagger, StaggerItem } from "@/components/portfolio/motion";
import { getCaseStudyBySlug, type CaseStudyTheme } from "@/content/case-studies";
import { getProjectBySlug } from "@/content/projects";
import {
	AlertTriangle,
	ArrowLeft,
	ArrowUpRight,
	CheckCircle2,
	ExternalLink,
	Github,
	Layers,
	Target,
	Wrench,
} from "lucide-react";

const sectionIcons: Record<string, typeof Target> = {
	problem: Target,
	role: Layers,
	architecture: Layers,
	stack: Wrench,
	challenges: AlertTriangle,
	outcomes: CheckCircle2,
};

const themeStyles: Record<
	CaseStudyTheme,
	{
		eyebrow: string;
		linkHover: string;
		button: string;
		buttonHover: string;
		outcomesBorder: string;
		outcomesGradient: string;
		outcomesIcon: string;
		outcomesDot: string;
		previewGradient: string;
		footerEyebrow: string;
	}
> = {
	ochre: {
		eyebrow: "text-orange-400/90",
		linkHover: "hover:text-orange-400",
		button: "bg-orange-600 text-zinc-950 hover:bg-orange-500",
		buttonHover: "hover:border-orange-500/40",
		outcomesBorder: "border-orange-500/30",
		outcomesGradient: "from-orange-950/30 via-zinc-900/50 to-zinc-950/80",
		outcomesIcon: "bg-orange-500/15 text-orange-400",
		outcomesDot: "bg-orange-400",
		previewGradient: "from-orange-950/40 via-zinc-950 to-zinc-950",
		footerEyebrow: "text-orange-400/90",
	},
	yellow: {
		eyebrow: "text-yellow-400/90",
		linkHover: "hover:text-yellow-400",
		button: "bg-yellow-400 text-zinc-950 hover:bg-yellow-300",
		buttonHover: "hover:border-yellow-500/40",
		outcomesBorder: "border-yellow-500/30",
		outcomesGradient: "from-yellow-950/30 via-zinc-900/50 to-zinc-950/80",
		outcomesIcon: "bg-yellow-500/15 text-yellow-400",
		outcomesDot: "bg-yellow-400",
		previewGradient: "from-yellow-950/40 via-zinc-950 to-zinc-950",
		footerEyebrow: "text-yellow-400/90",
	},
};

type CaseStudyProps = {
	slug: string;
};

export default function CaseStudy({ slug }: CaseStudyProps) {
	const project = getProjectBySlug(slug);
	const caseStudy = getCaseStudyBySlug(slug);

	if (!project || !caseStudy) {
		return null;
	}

	const theme = themeStyles[caseStudy.theme];
	const { highlights, sections, footer } = caseStudy;
	const isExternalSecondary = caseStudy.headerSecondaryCta?.href.startsWith("http");

	return (
		<article className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:pt-32">
			<Reveal>
				<a
					href="/#work"
					className={`inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 transition ${theme.linkHover} motion-reduce:transition-none`}
				>
					<ArrowLeft className="h-4 w-4" aria-hidden />
					Back to portfolio
				</a>
			</Reveal>

			<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
				<Reveal>
					<p className={`font-mono text-xs uppercase tracking-[0.2em] ${theme.eyebrow}`}>Case study</p>
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
							className={`inline-flex min-h-12 items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition motion-reduce:transition-none ${theme.button}`}
						>
							{caseStudy.primaryCtaLabel}
							<ExternalLink className="h-4 w-4" aria-hidden />
						</a>
						{caseStudy.headerSecondaryCta ? (
							<a
								href={caseStudy.headerSecondaryCta.href}
								target={isExternalSecondary ? "_blank" : undefined}
								rel={isExternalSecondary ? "noopener noreferrer" : undefined}
								className={`glass-panel inline-flex min-h-12 items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-zinc-200 transition ${theme.buttonHover} motion-reduce:transition-none`}
							>
								{caseStudy.headerSecondaryCta.label === "View on GitHub" ? (
									<Github className="h-4 w-4" aria-hidden />
								) : null}
								{caseStudy.headerSecondaryCta.label}
							</a>
						) : null}
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<ProjectPreviewFrame
						src={project.banner}
						alt={`${project.title} preview`}
						previewGradient={theme.previewGradient}
						priority
					/>
				</Reveal>
			</div>

			<Stagger className="mt-14 grid gap-4 sm:grid-cols-3">
				{highlights.map((item) => (
					<StaggerItem key={item.label} className="glass-panel rounded-2xl px-5 py-4">
						<p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{item.label}</p>
						<p className="mt-2 font-display text-lg font-semibold text-zinc-100">{item.value}</p>
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-14 grid gap-5 md:grid-cols-2">
				{sections.map((section, index) => {
					const Icon = sectionIcons[section.id] ?? Target;
					const isOutcomes = section.id === "outcomes";
					const isWide = section.id === "problem" || section.id === "architecture" || isOutcomes;

					return (
						<Reveal key={section.id} delay={index * 0.04} className={isWide ? "md:col-span-2" : undefined}>
							<section
								className={`h-full rounded-2xl border p-6 sm:p-8 ${
									isOutcomes
										? `${theme.outcomesBorder} bg-gradient-to-br ${theme.outcomesGradient}`
										: "glass-panel border-zinc-800/80"
								}`}
								aria-labelledby={`${section.id}-heading`}
							>
								<div className="flex items-start gap-3">
									<span
										className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
											isOutcomes ? theme.outcomesIcon : "bg-zinc-800/80 text-zinc-400"
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
																	isOutcomes ? theme.outcomesDot : "bg-zinc-600"
																}`}
																aria-hidden
															/>
															<span>{item}</span>
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
						<p className={`font-mono text-xs uppercase tracking-widest ${theme.footerEyebrow}`}>{footer.eyebrow}</p>
						<p className="mt-2 font-display text-2xl font-semibold text-zinc-50">{footer.title}</p>
						<p className="mt-2 max-w-md text-sm text-zinc-400">{footer.description}</p>
					</div>
					<a
						href={project.href}
						target="_blank"
						rel="noopener noreferrer"
						className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition motion-reduce:transition-none ${theme.button}`}
					>
						{footer.ctaLabel}
						<ArrowUpRight className="h-4 w-4" aria-hidden />
					</a>
				</div>
			</Reveal>
		</article>
	);
}
