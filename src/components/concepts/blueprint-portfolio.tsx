"use client";

import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { motion, useReducedMotion } from "framer-motion";
import { ContactLinks } from "./shared-links";

function BlueprintLine({ d, delay = 0 }: { d: string; delay?: number }) {
	const reduceMotion = useReducedMotion();
	return (
		<motion.path
			d={d}
			fill="none"
			stroke="currentColor"
			strokeWidth="1"
			className="text-sky-400/60"
			initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
			whileInView={{ pathLength: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 1.2, delay, ease: "easeInOut" }}
		/>
	);
}

export default function BlueprintPortfolio() {
	const reduceMotion = useReducedMotion();
	const featured = projects.filter((p) => p.featured);

	return (
		<div
			className="concept-blueprint min-h-screen pb-28"
			style={{
				backgroundColor: "#0c1929",
				backgroundImage: `
					linear-gradient(rgba(56,189,248,0.07) 1px, transparent 1px),
					linear-gradient(90deg, rgba(56,189,248,0.07) 1px, transparent 1px)
				`,
				backgroundSize: "24px 24px",
			}}
		>
			<div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
				<motion.header
					className="border border-sky-500/30 p-8"
					initial={reduceMotion ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<p className="font-mono text-xs text-sky-400">DWG NO. MA-2026 · REV. A</p>
					<h1 className="mt-2 font-display text-4xl font-bold text-sky-100">{profile.name}</h1>
					<p className="mt-2 font-mono text-sm text-sky-300/70">{profile.title}</p>
					<div className="mt-4 flex gap-8 font-mono text-xs text-sky-500">
						<span>SCALE 1:1</span>
						<span>LOC: {profile.location}</span>
						<span>STATUS: HIREABLE</span>
					</div>
				</motion.header>

				<svg viewBox="0 0 800 120" className="mt-8 w-full text-sky-400">
					<BlueprintLine d="M 20 60 L 780 60" />
					<BlueprintLine d="M 400 20 L 400 100" delay={0.2} />
					<BlueprintLine d="M 20 20 L 780 100" delay={0.4} />
				</svg>

				<section className="mt-12 grid gap-8 lg:grid-cols-2">
					<motion.div
						className="border border-dashed border-sky-600/40 p-6"
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<p className="font-mono text-xs text-sky-500">§01 SPECIFICATION</p>
						<p className="mt-4 text-sm leading-relaxed text-sky-100/80">{profile.heroLine}</p>
						{profile.about.map((para, i) => (
							<p key={i} className="mt-3 text-sm text-sky-200/60">
								{para}
							</p>
						))}
					</motion.div>

					<motion.div
						className="border border-dashed border-sky-600/40 p-6"
						initial={reduceMotion ? false : { opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
					>
						<p className="font-mono text-xs text-sky-500">§02 COMPONENT LIST</p>
						<div className="mt-4 space-y-4">
							{skillGroups.map((group) => (
								<div key={group.name}>
									<p className="font-mono text-xs text-sky-400">{group.name}</p>
									<p className="mt-1 text-sm text-sky-100/70">{group.skills.join(" · ")}</p>
								</div>
							))}
						</div>
					</motion.div>
				</section>

				<section className="mt-12">
					<p className="font-mono text-xs text-sky-500">§03 ASSEMBLY — PROJECTS</p>
					<div className="mt-6 space-y-4">
						{featured.map((project, i) => (
							<motion.a
								key={project.slug}
								href={project.href}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-col gap-2 border border-sky-700/40 p-5 transition hover:border-sky-400/60 sm:flex-row sm:items-center sm:justify-between"
								initial={reduceMotion ? false : { opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.08 }}
							>
								<div>
									<p className="font-mono text-xs text-sky-500">REF-{String(i + 1).padStart(2, "0")}</p>
									<h3 className="font-display text-lg font-semibold text-sky-100">{project.title}</h3>
									<p className="mt-1 text-sm text-sky-200/60">{project.description}</p>
								</div>
								<p className="font-mono text-xs text-sky-400">{project.tags.join(" / ")}</p>
							</motion.a>
						))}
					</div>
				</section>

				<section className="mt-12 border border-sky-600/30 p-6">
					<p className="font-mono text-xs text-sky-500">§04 TIMELINE</p>
					<ul className="mt-4 space-y-3">
						{experience.map((item) => (
							<li key={item.title} className="flex gap-4 text-sm">
								<span className="shrink-0 font-mono text-xs text-sky-500">{item.period}</span>
								<span className="text-sky-100/80">
									{item.title} — {item.organization}
								</span>
							</li>
						))}
					</ul>
				</section>

				<footer className="mt-12 border-t border-sky-800/40 pt-8 text-center">
					<p className="font-mono text-xs text-sky-500">CONTACT INTERFACE</p>
					<ContactLinks className="mt-4 justify-center" linkClassName="text-sm text-sky-300 underline" />
				</footer>
			</div>
		</div>
	);
}
