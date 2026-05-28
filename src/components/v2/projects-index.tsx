"use client";

import { projects, type Project } from "@/content";
import { tidy } from "@/lib/v2-text";
import { motion, useReducedMotion } from "framer-motion";

const others = projects.filter((project) => !project.featured);

export default function V2ProjectsIndex() {
	const reduceMotion = useReducedMotion();

	return (
		<section aria-labelledby="projects-index-heading" className="py-12 sm:py-16">
			<motion.div
				initial={reduceMotion ? false : { opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
				className="flex items-end justify-between gap-4"
			>
				<div>
					<span className="v2-label">Also in the workshop</span>
					<h2 id="projects-index-heading" className="mt-3 font-satoshi text-2xl font-bold tracking-tight text-v2-ivory sm:text-3xl">
						Smaller builds and experiments
					</h2>
				</div>
			</motion.div>

			<div className="mt-10 grid gap-4 sm:grid-cols-2">
				{others.map((project, index) => (
					<ProjectCard key={project.slug} project={project} index={index} wide={index === others.length - 1} />
				))}
			</div>
		</section>
	);
}

function ProjectCard({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
	const reduceMotion = useReducedMotion();
	return (
		<motion.a
			href={project.href}
			target="_blank"
			rel="noopener noreferrer"
			initial={reduceMotion ? false : { opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
			className={`group v2-frame relative flex flex-col rounded-xl p-6 transition-colors duration-300 hover:border-v2-emerald/40 motion-reduce:transition-none ${
				wide ? "sm:col-span-2" : ""
			}`}
		>
			<div className="flex items-center justify-between">
				<span className="flex h-10 w-10 items-center justify-center rounded-lg border border-v2-border bg-v2-obsidian/60">
					<img src={project.icon} alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
				</span>
				<svg viewBox="0 0 16 16" className="h-4 w-4 text-v2-muted transition-colors group-hover:text-v2-emerald motion-reduce:transition-none" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
					<path d="M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M12 4L4 12" strokeLinecap="round" />
				</svg>
			</div>
			<h3 className="mt-5 font-satoshi text-lg font-semibold tracking-tight text-v2-ivory">{project.title}</h3>
			<p className="mt-2 max-w-prose text-sm leading-relaxed text-v2-muted">{tidy(project.description)}</p>
			<ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
				{project.tags.map((tag) => (
					<li key={tag} className="rounded-full border border-v2-border px-2.5 py-0.5 font-space-mono text-[10.5px] text-v2-muted">
						{tag}
					</li>
				))}
			</ul>
		</motion.a>
	);
}
