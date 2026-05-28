"use client";

import ProjectIcon from "@/components/portfolio/project-icon";
import { Stagger, StaggerItem } from "@/components/portfolio/motion";
import { projects } from "@/content/projects";
import { motion, useReducedMotion } from "framer-motion";

const hiddenProjectSlugs = new Set(["flyaway", "escape", "memed", "smart-bridge"]);
const visibleProjects = projects.filter((project) => !hiddenProjectSlugs.has(project.slug));

export default function ProjectIconsStrip() {
	const reduceMotion = useReducedMotion();

	return (
		<section aria-label="Project icons" className="py-10 sm:py-12">
			<div className="mx-auto max-w-6xl px-4">
				<p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Projects I&apos;ve built</p>
				<Stagger className="mt-5 flex gap-3 overflow-x-auto overflow-y-visible pt-2 pb-2 sm:flex-wrap sm:overflow-visible">
					{visibleProjects.map((project) => (
						<StaggerItem key={project.slug}>
							<motion.a
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex w-[5rem] shrink-0 flex-col items-center gap-2"
								whileHover={reduceMotion ? undefined : { y: -4 }}
								transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
								title={project.title}
							>
								<div className="relative">
									<ProjectIcon
										src={project.icon}
										alt=""
										size="md"
										className="transition duration-300 group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10 motion-reduce:transition-none"
									/>
									{project.flagship ? (
										<span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
									) : project.spotlight ? (
										<span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
									) : null}
								</div>
								<span className="h-8 max-w-[7rem] overflow-hidden text-center font-mono text-[10px] leading-tight text-zinc-500 transition [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] group-hover:text-emerald-300 motion-reduce:transition-none">
									{project.title}
								</span>
							</motion.a>
						</StaggerItem>
					))}
				</Stagger>
			</div>
		</section>
	);
}
