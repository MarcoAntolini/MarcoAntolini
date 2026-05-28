"use client";

import { BrowserFrame } from "@/components/v2/frame";
import { caseStudies, flagshipProject, spotlightProjects, type CaseStudy, type Project } from "@/content";
import { tidy } from "@/lib/v2-text";
import { motion, useReducedMotion } from "framer-motion";

const easing = [0.22, 1, 0.36, 1] as const;

const csshub = spotlightProjects[0];
const dracaniaStudy = caseStudies.find((study) => study.slug === flagshipProject.slug);
const csshubStudy = caseStudies.find((study) => study.slug === csshub?.slug);

function useRise() {
	const reduceMotion = useReducedMotion();
	return (delay = 0) =>
		reduceMotion
			? { initial: false as const, whileInView: { opacity: 1, y: 0 } }
			: {
					initial: { opacity: 0, y: 24 },
					whileInView: { opacity: 1, y: 0 },
					viewport: { once: true, amount: 0.25 },
					transition: { duration: 0.6, delay, ease: easing },
				};
}

export default function V2Work() {
	const rise = useRise();

	return (
		<section id="work" className="scroll-mt-24 py-24 sm:py-32">
			<motion.div {...rise()} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<span className="v2-label">Selected work</span>
					<h2 className="mt-3 max-w-2xl font-satoshi text-3xl font-bold tracking-tight text-v2-ivory sm:text-4xl">
						Two products I shipped, owned, and keep maintaining.
					</h2>
				</div>
				<p className="max-w-xs text-sm leading-relaxed text-v2-muted">
					Not coursework. A live community app and a published extension, both built end to end.
				</p>
			</motion.div>

			<div className="mt-14 space-y-20 sm:space-y-28">
				<FlagshipFeature project={flagshipProject} study={dracaniaStudy} />
				{csshub ? <SpotlightFeature project={csshub} study={csshubStudy} /> : null}
			</div>
		</section>
	);
}

function FlagshipFeature({ project, study }: { project: Project; study?: CaseStudy }) {
	const rise = useRise();
	return (
		<article className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
			<motion.div {...rise()} className="order-2 lg:order-1">
				<div className="flex items-center gap-3">
					<span className="v2-label text-v2-emerald">Flagship</span>
					<span className="h-px flex-1 bg-v2-border" aria-hidden="true" />
				</div>
				<h3 className="mt-4 font-satoshi text-2xl font-bold tracking-tight text-v2-ivory sm:text-3xl">
					{project.title}
				</h3>
				<p className="mt-4 max-w-xl text-base leading-relaxed text-v2-muted">{tidy(project.longDescription ?? project.description)}</p>

				{study ? (
					<dl className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-v2-border bg-v2-border sm:grid-cols-3">
						{study.highlights.map((highlight) => (
							<div key={highlight.label} className="bg-v2-obsidian px-4 py-4">
								<dt className="v2-label">{highlight.label}</dt>
								<dd className="mt-2 font-satoshi text-sm font-medium text-v2-ivory">{tidy(highlight.value)}</dd>
							</div>
						))}
					</dl>
				) : null}

				<TagRow tags={project.tags} />
				<CtaRow
					primary={{ label: "Read case study", href: `/work/${project.slug}` }}
					secondary={{ label: "Visit live site", href: project.href, external: true }}
				/>
			</motion.div>

			<motion.div {...rise(0.1)} className="relative order-1 lg:order-2">
				<div className="pointer-events-none absolute -inset-6 rounded-full bg-v2-emerald/8 blur-3xl" aria-hidden="true" />
				<BrowserFrame
					url={study?.previewDomain ?? project.href}
					src={project.banner}
					alt={tidy(`${project.title}: ${project.description}`)}
					status="Deployed"
					className="relative"
				/>
			</motion.div>
		</article>
	);
}

function SpotlightFeature({ project, study }: { project: Project; study?: CaseStudy }) {
	const rise = useRise();
	return (
		<article className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
			<motion.div {...rise()} className="relative">
				<BrowserFrame
					url={study?.previewDomain ?? "chromewebstore.google.com"}
					src={project.banner}
					alt={tidy(`${project.title}: ${project.description}`)}
					status="Published"
				/>
			</motion.div>

			<motion.div {...rise(0.1)}>
				<div className="flex items-center gap-3">
					<span className="v2-label text-v2-emerald">Published · Chrome Web Store</span>
					<span className="h-px flex-1 bg-v2-border" aria-hidden="true" />
				</div>
				<h3 className="mt-4 font-satoshi text-2xl font-bold tracking-tight text-v2-ivory sm:text-3xl">
					{project.title}
				</h3>
				<p className="mt-4 max-w-xl text-base leading-relaxed text-v2-muted">{tidy(project.longDescription ?? project.description)}</p>
				<TagRow tags={project.tags} />
				<CtaRow
					primary={{ label: "Read case study", href: `/work/${project.slug}` }}
					secondary={{ label: "Add to Chrome", href: project.href, external: true }}
					tertiary={project.github ? { label: "GitHub", href: project.github, external: true } : undefined}
				/>
			</motion.div>
		</article>
	);
}

function TagRow({ tags }: { tags: string[] }) {
	return (
		<ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
			{tags.map((tag) => (
				<li
					key={tag}
					className="rounded-full border border-v2-border bg-v2-zinc/40 px-3 py-1 font-space-mono text-[11px] text-v2-muted"
				>
					{tag}
				</li>
			))}
		</ul>
	);
}

type Cta = { label: string; href: string; external?: boolean };

function CtaRow({ primary, secondary, tertiary }: { primary: Cta; secondary: Cta; tertiary?: Cta }) {
	return (
		<div className="mt-8 flex flex-wrap items-center gap-3">
			<a
				href={primary.href}
				className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-v2-emerald px-5 text-sm font-semibold text-v2-obsidian transition-colors hover:bg-emerald-300 motion-reduce:transition-none"
			>
				{primary.label}
				<svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
					<path d="M3 8h10" strokeLinecap="round" />
					<path d="M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</a>
			<ExternalCta cta={secondary} />
			{tertiary ? <ExternalCta cta={tertiary} /> : null}
		</div>
	);
}

function ExternalCta({ cta }: { cta: Cta }) {
	return (
		<a
			href={cta.href}
			{...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-v2-border bg-v2-zinc/40 px-5 text-sm font-medium text-v2-ivory transition-colors hover:border-v2-emerald/40 hover:text-v2-emerald motion-reduce:transition-none"
		>
			{cta.label}
			{cta.external ? (
				<svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
					<path d="M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M12 4L4 12" strokeLinecap="round" />
				</svg>
			) : null}
		</a>
	);
}
