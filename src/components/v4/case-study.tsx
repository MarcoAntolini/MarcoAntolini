"use client";

import { BrowserFrame } from "@/components/v4/frame";
import { Reveal } from "@/components/v4/reveal";
import { Stagger, StaggerItem } from "@/components/portfolio/motion";
import { getCaseStudyBySlug, type CaseStudyTheme } from "@/content/case-studies";
import { getProjectBySlug } from "@/content/projects";
import { tidy } from "@/lib/v2-text";

const sectionLabels: Record<string, string> = {
	problem: "Problem",
	role: "Role",
	architecture: "Architecture",
	stack: "Stack",
	challenges: "Challenges",
	outcomes: "Outcomes",
};

type CaseStudyProps = {
	slug: string;
};

export default function V4CaseStudy({ slug }: CaseStudyProps) {
	const project = getProjectBySlug(slug);
	const caseStudy = getCaseStudyBySlug(slug);

	if (!project || !caseStudy) {
		return null;
	}

	const accent = accentForTheme(caseStudy.theme);
	const { highlights, sections, footer } = caseStudy;
	const isExternalSecondary = caseStudy.headerSecondaryCta?.href.startsWith("http");
	const banner = slug === "csshub" ? "/projects/banners/csshub.png" : project.banner;

	return (
		<article className="mx-auto max-w-[1180px] px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
			<Reveal>
				<a
					href="/v4#work"
					className="inline-flex min-h-11 items-center gap-2 font-space-mono text-[12px] uppercase tracking-[0.14em] text-brand-muted transition-colors hover:text-brand-emerald motion-reduce:transition-none"
				>
					<ArrowLeft />
					Back to portfolio
				</a>
			</Reveal>

			<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
				<Reveal>
					<p className="v4-label text-brand-emerald">Case study</p>
					<h1 className="mt-4 font-satoshi text-4xl font-bold tracking-tight text-brand-ivory sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
						{project.title}
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">{tidy(project.longDescription ?? project.description)}</p>
					<ul className="mt-6 flex flex-wrap gap-2">
						{project.tags.map((tag) => (
							<li
								key={tag}
								className="rounded-md border border-brand-border bg-brand-zinc/40 px-2.5 py-1 font-space-mono text-xs text-brand-muted"
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
							className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition motion-reduce:transition-none ${accent.button}`}
						>
							{caseStudy.primaryCtaLabel}
							<ExternalLink />
						</a>
						{caseStudy.headerSecondaryCta ? (
							<a
								href={caseStudy.headerSecondaryCta.href}
								target={isExternalSecondary ? "_blank" : undefined}
								rel={isExternalSecondary ? "noopener noreferrer" : undefined}
								className="v4-glass inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-brand-ivory transition hover:border-brand-emerald/40 motion-reduce:transition-none"
							>
								{caseStudy.headerSecondaryCta.label}
							</a>
						) : null}
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<BrowserFrame url={caseStudy.previewDomain ?? project.href}>
						<img
							src={banner}
							alt={`${project.title} preview`}
							width={800}
							height={500}
							loading="eager"
							className="aspect-[16/10] w-full bg-brand-obsidian object-cover"
						/>
					</BrowserFrame>
				</Reveal>
			</div>

			<Stagger className="mt-14 grid gap-4 sm:grid-cols-3">
				{highlights.map((item) => (
					<StaggerItem key={item.label} className="v4-surface-flat rounded-2xl px-5 py-4">
						<p className="v4-label !text-[10px]">{item.label}</p>
						<p className="mt-2 font-satoshi text-lg font-semibold text-brand-ivory">{tidy(item.value)}</p>
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-14 grid gap-5 md:grid-cols-2">
				{sections.map((section, index) => {
					const isOutcomes = section.id === "outcomes";
					const isWide = section.id === "problem" || section.id === "architecture" || isOutcomes;

					return (
						<Reveal key={section.id} delay={index * 0.04} className={isWide ? "md:col-span-2" : undefined}>
							<section
								className={`h-full rounded-2xl border p-6 sm:p-8 ${
									isOutcomes ? `${accent.outcomesBorder} ${accent.outcomesBg}` : "v4-surface-flat border-brand-border"
								}`}
								aria-labelledby={`${section.id}-heading`}
							>
								<p className="v4-label text-brand-emerald">{sectionLabels[section.id] ?? section.title}</p>
								<h2 id={`${section.id}-heading`} className="mt-3 font-satoshi text-xl font-semibold tracking-tight text-brand-ivory sm:text-2xl">
									{section.title}
								</h2>
								{section.body ? (
									<p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-muted">{section.body}</p>
								) : null}
								{section.items ? (
									<ul className={`mt-4 space-y-2.5 ${section.id === "stack" ? "flex flex-wrap gap-2 space-y-0" : ""}`}>
										{section.items.map((item) =>
											section.id === "stack" ? (
												<li
													key={item}
													className="rounded-md border border-brand-border bg-brand-obsidian/50 px-2.5 py-1 font-space-mono text-xs text-brand-muted"
												>
													{item}
												</li>
											) : (
												<li key={item} className="flex gap-2.5 text-sm leading-relaxed text-brand-muted sm:text-base">
													<span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isOutcomes ? accent.dot : "bg-brand-emerald/70"}`} aria-hidden />
													<span>{item}</span>
												</li>
											),
										)}
									</ul>
								) : null}
							</section>
						</Reveal>
					);
				})}
			</div>

			<Reveal className="mt-14">
				<div className="v4-frame flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8">
					<div>
						<p className="v4-label text-brand-emerald">{footer.eyebrow}</p>
						<p className="mt-2 font-satoshi text-2xl font-semibold text-brand-ivory">{footer.title}</p>
						<p className="mt-2 max-w-md text-sm text-brand-muted">{footer.description}</p>
					</div>
					<a
						href={project.href}
						target="_blank"
						rel="noopener noreferrer"
						className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition motion-reduce:transition-none ${accent.button}`}
					>
						{footer.ctaLabel}
						<ArrowUpRight />
					</a>
				</div>
			</Reveal>
		</article>
	);
}

function accentForTheme(theme: CaseStudyTheme) {
	if (theme === "yellow") {
		return {
			button: "bg-yellow-400 text-brand-obsidian hover:bg-yellow-300",
			outcomesBorder: "border-yellow-500/30",
			outcomesBg: "bg-gradient-to-br from-yellow-950/30 via-brand-zinc/50 to-brand-obsidian/80",
			dot: "bg-yellow-400",
		};
	}
	return {
		button: "bg-orange-600 text-brand-obsidian hover:bg-orange-500",
		outcomesBorder: "border-orange-500/30",
		outcomesBg: "bg-gradient-to-br from-orange-950/30 via-brand-zinc/50 to-brand-obsidian/80",
		dot: "bg-orange-400",
	};
}

function ArrowLeft() {
	return (
		<svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M12 8H4M7.5 4.5 4 8l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function ExternalLink() {
	return (
		<svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M6 4h6v6M12 4 4 12" strokeLinecap="round" />
		</svg>
	);
}

function ArrowUpRight() {
	return (
		<svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
			<path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
