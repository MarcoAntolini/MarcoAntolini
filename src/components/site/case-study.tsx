"use client";

import { BrowserFrame } from "@/components/site/frame";
import { Reveal } from "@/components/site/reveal";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { caseStudies, caseStudySectionOrder, getCaseStudyBySlug, type CaseStudySection, type CaseStudyTheme } from "@/content/case-studies";
import { getProjectBySlug } from "@/content/projects";
import { tidy } from "@/lib/text";

type CaseStudyProps = {
	slug: string;
};

export default function CaseStudy({ slug }: CaseStudyProps) {
	const project = getProjectBySlug(slug);
	const caseStudy = getCaseStudyBySlug(slug);

	if (!project || !caseStudy) {
		return null;
	}

	const accent = accentForTheme(caseStudy.theme);
	const { highlights } = caseStudy;
	const sections = [...caseStudy.sections].sort(
		(a, b) => caseStudySectionOrder.indexOf(a.id) - caseStudySectionOrder.indexOf(b.id),
	);
	const sectionById = new Map(sections.map((section) => [section.id, section]));
	const problem = sectionById.get("problem");
	const solution = sectionById.get("solution");
	const role = sectionById.get("role");
	const architecture = sectionById.get("architecture");
	const challenges = sectionById.get("challenges");
	const stack = sectionById.get("stack");
	const outcomes = sectionById.get("outcomes");
	const isLiveProject = project.live !== false;
	const isExternalSecondary = caseStudy.headerSecondaryCta?.href.startsWith("http");
	const banner = slug === "csshub" ? "/projects/banners/csshub.png" : project.banner;
	const currentIndex = caseStudies.findIndex((study) => study.slug === slug);
	const nextCaseStudy = caseStudies[(currentIndex + 1) % caseStudies.length];
	const nextProject = nextCaseStudy ? getProjectBySlug(nextCaseStudy.slug) : null;
	const nextAccent = nextCaseStudy ? accentForTheme(nextCaseStudy.theme) : accent;

	return (
		<article className="mx-auto max-w-[1180px] px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
			<Reveal>
				<a
					href="/#work"
					className="inline-flex min-h-11 items-center gap-2 font-space-mono text-[12px] uppercase tracking-[0.14em] text-brand-muted transition-colors hover:text-brand-emerald motion-reduce:transition-none"
				>
					<ArrowLeft />
					Back to portfolio
				</a>
			</Reveal>

			<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
				<Reveal>
					<p className="site-label text-brand-emerald">Case study</p>
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
						{isLiveProject ? (
							<a
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition motion-reduce:transition-none ${accent.button}`}
							>
								{caseStudy.primaryCtaLabel}
								<ExternalLink />
							</a>
						) : null}
						{caseStudy.headerSecondaryCta ? (
							<a
								href={caseStudy.headerSecondaryCta.href}
								target={isExternalSecondary ? "_blank" : undefined}
								rel={isExternalSecondary ? "noopener noreferrer" : undefined}
								className="site-glass inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-brand-ivory transition hover:border-brand-emerald/40 motion-reduce:transition-none"
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
					<StaggerItem key={item.label} className="site-surface-flat rounded-2xl px-5 py-4">
						<p className="site-label !text-[10px]">{item.label}</p>
						<p className="mt-2 font-satoshi text-lg font-semibold text-brand-ivory">{tidy(item.value)}</p>
					</StaggerItem>
				))}
			</Stagger>

			<div className="mt-16 space-y-6">
				{problem || solution ? (
					<Reveal>
						<div className="grid overflow-hidden rounded-3xl border border-brand-border bg-brand-zinc/35 lg:grid-cols-2">
							{problem ? <StorySection section={problem} tone="muted" /> : null}
							{solution ? <StorySection section={solution} tone="accent" accentDot={accent.dot} /> : null}
						</div>
					</Reveal>
				) : null}

				{role || stack ? (
					<div className="grid gap-5 lg:grid-cols-2">
						{role ? (
							<Reveal delay={0.04}>
								<section className="site-frame h-full rounded-2xl p-6 sm:p-8" aria-labelledby="role-heading">
									<h2 id="role-heading" className="font-satoshi text-2xl font-semibold tracking-tight text-brand-ivory">
										{role.title}
									</h2>
									{role.body ? <p className="mt-4 text-base leading-relaxed text-brand-muted">{tidy(role.body)}</p> : null}
								</section>
							</Reveal>
						) : null}

						{stack ? (
							<Reveal delay={0.08}>
								<section className="h-full rounded-2xl border border-brand-border bg-brand-obsidian/45 p-6 sm:p-8" aria-labelledby="stack-heading">
									<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
										<h2 id="stack-heading" className="font-satoshi text-2xl font-semibold tracking-tight text-brand-ivory">
											{stack.title}
										</h2>
										<p className="font-space-mono text-xs text-brand-muted">{stack.items?.length ?? 0} tools</p>
									</div>
									{stack.items ? <StackList items={stack.items} /> : null}
								</section>
							</Reveal>
						) : null}
					</div>
				) : null}

				{architecture ? (
					<Reveal delay={0.12}>
						<section className="site-surface rounded-3xl p-6 sm:p-8 lg:p-10" aria-labelledby="architecture-heading">
							<div className="w-full">
								<h2 id="architecture-heading" className="font-satoshi text-3xl font-semibold tracking-tight text-brand-ivory">
									{architecture.title}
								</h2>
								{architecture.body ? <p className="mt-4 text-base leading-relaxed text-brand-muted">{tidy(architecture.body)}</p> : null}
							</div>
							{architecture.items ? <ArchitectureList items={architecture.items} accentDot={accent.dot} /> : null}
						</section>
					</Reveal>
				) : null}

				{challenges ? (
					<Reveal delay={0.16}>
						<section className="rounded-3xl border border-brand-border bg-brand-zinc/25 p-6 sm:p-8" aria-labelledby="challenges-heading">
							<div className="grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:items-start">
								<div>
									<h2 id="challenges-heading" className="font-satoshi text-3xl font-semibold tracking-tight text-brand-ivory">
										{challenges.title}
									</h2>
									{challenges.body ? <p className="mt-4 text-base leading-relaxed text-brand-muted">{tidy(challenges.body)}</p> : null}
								</div>
								{challenges.items ? <ChallengeList items={challenges.items} accentDot={accent.dot} /> : null}
							</div>
						</section>
					</Reveal>
				) : null}

				{outcomes ? (
					<Reveal delay={0.2}>
						<section className={`rounded-3xl border p-6 sm:p-8 lg:p-10 ${accent.outcomesBorder} ${accent.outcomesBg}`} aria-labelledby="outcomes-heading">
							<div className="grid gap-6 lg:grid-cols-[0.5fr_1fr] lg:items-start">
								<div>
									<h2 id="outcomes-heading" className="font-satoshi text-3xl font-semibold tracking-tight text-brand-ivory">
										{outcomes.title}
									</h2>
									{outcomes.body ? <p className="mt-4 text-base leading-relaxed text-brand-muted">{tidy(outcomes.body)}</p> : null}
								</div>
								{outcomes.items ? <OutcomeList items={outcomes.items} accentDot={accent.dot} /> : null}
							</div>
						</section>
					</Reveal>
				) : null}
			</div>

			{nextProject ? (
				<Reveal className="mt-14">
					<div className="site-frame flex flex-col items-start justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8">
						<div>
							<p className="site-label text-brand-emerald">Next case study</p>
							<p className="mt-2 font-satoshi text-2xl font-semibold text-brand-ivory">{nextProject.title}</p>
							<p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-muted">{tidy(nextProject.description)}</p>
						</div>
						<a
							href={`/work/${nextProject.slug}`}
							className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition motion-reduce:transition-none ${nextAccent.button}`}
						>
							View case study
							<ArrowUpRight />
						</a>
					</div>
				</Reveal>
			) : null}
		</article>
	);
}

function StorySection({ section, tone, accentDot }: { section: CaseStudySection; tone: "muted" | "accent"; accentDot?: string }) {
	const isAccent = tone === "accent";

	return (
		<section
			className={`relative min-h-full p-6 sm:p-8 lg:p-10 ${
				isAccent ? "border-t border-brand-border bg-brand-elevated/55 lg:border-l lg:border-t-0" : "bg-brand-obsidian/20"
			}`}
			aria-labelledby={`${section.id}-heading`}
		>
			{isAccent ? <span className={`absolute right-6 top-6 h-2 w-2 rounded-full ${accentDot ?? "bg-brand-emerald"}`} aria-hidden /> : null}
			<h2 id={`${section.id}-heading`} className="font-satoshi text-3xl font-semibold tracking-tight text-brand-ivory sm:text-4xl">
				{section.title}
			</h2>
			{section.body ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">{tidy(section.body)}</p> : null}
		</section>
	);
}

function StackList({ items }: { items: string[] }) {
	return (
		<ul className="mt-6 flex flex-wrap gap-2">
			{items.map((item) => (
				<li key={item} className="rounded-full border border-brand-border bg-brand-zinc/70 px-3 py-1.5 font-space-mono text-xs text-brand-muted">
					{item}
				</li>
			))}
		</ul>
	);
}

function ArchitectureList({ items, accentDot }: { items: string[]; accentDot: string }) {
	return (
		<ul className="mt-8 grid gap-3 md:grid-cols-2">
			{items.map((item) => (
				<li key={item} className="flex min-h-24 gap-4 rounded-2xl border border-brand-border bg-brand-obsidian/45 p-4">
					<span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${accentDot}`} aria-hidden />
					<span className="text-sm leading-relaxed text-brand-muted sm:text-base">{item}</span>
				</li>
			))}
		</ul>
	);
}

function ChallengeList({ items, accentDot }: { items: string[]; accentDot: string }) {
	return (
		<ul className="divide-y divide-brand-border/80 rounded-2xl border border-brand-border bg-brand-obsidian/35">
			{items.map((item) => (
				<li key={item} className="grid gap-3 p-4 sm:grid-cols-[auto_1fr] sm:p-5">
					<span className={`mt-2 h-1.5 w-8 rounded-full ${accentDot}`} aria-hidden />
					<span className="text-sm leading-relaxed text-brand-muted sm:text-base">{item}</span>
				</li>
			))}
		</ul>
	);
}

function OutcomeList({ items, accentDot }: { items: string[]; accentDot: string }) {
	return (
		<ul className="grid gap-3">
			{items.map((item) => (
				<li key={item} className="flex gap-3 rounded-2xl border border-brand-border/80 bg-brand-obsidian/35 p-4 text-sm leading-relaxed text-brand-muted sm:text-base">
					<span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${accentDot}`} aria-hidden />
					<span>{item}</span>
				</li>
			))}
		</ul>
	);
}

function accentForTheme(theme: CaseStudyTheme) {
	if (theme === "cyan") {
		return {
			button: "bg-sky-400 text-brand-obsidian hover:bg-sky-300",
			outcomesBorder: "border-sky-400/30",
			outcomesBg: "bg-gradient-to-br from-brand-zinc/95 via-brand-obsidian/90 to-[#020617]/80",
			dot: "bg-sky-400",
		};
	}
	return {
		button: "bg-[#ccb082] text-brand-obsidian hover:bg-[#ddc59c]",
		outcomesBorder: "border-[#ccb082]/30",
		outcomesBg: "bg-gradient-to-br from-brand-zinc/95 via-brand-obsidian/90 to-[#ccb082]/20",
		dot: "bg-[#ccb082]",
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
