"use client";

import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { ContactLinks, GitHubAvatar } from "./shared-links";

export default function SplitPortfolio() {
	const reduceMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const [split, setSplit] = useState(50);
	const dragging = useRef(false);

	const onMove = useCallback((clientX: number) => {
		const el = containerRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const pct = ((clientX - rect.left) / rect.width) * 100;
		setSplit(Math.min(92, Math.max(8, pct)));
	}, []);

	const featured = projects.filter((p) => p.featured);

	return (
		<div className="concept-split min-h-screen bg-zinc-950 pb-28 text-zinc-100">
			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
				<motion.div
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-8 text-center"
				>
					<p className="text-sm font-medium text-orange-400">Drag the divider</p>
					<h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{profile.name}</h1>
					<p className="mt-2 text-zinc-500">Two sides of the same engineer — student & shipper</p>
				</motion.div>

				<div
					ref={containerRef}
					className="relative h-[520px] cursor-ew-resize select-none overflow-hidden rounded-3xl border border-zinc-800 sm:h-[600px]"
					onPointerDown={(e) => {
						dragging.current = true;
						onMove(e.clientX);
					}}
					onPointerMove={(e) => dragging.current && onMove(e.clientX)}
					onPointerUp={() => {
						dragging.current = false;
					}}
					onPointerLeave={() => {
						dragging.current = false;
					}}
				>
					{/* Student side (left) */}
					<div className="absolute inset-0 bg-gradient-to-br from-indigo-950 to-violet-950 p-6 sm:p-10">
						<p className="font-mono text-xs uppercase tracking-widest text-indigo-300">Student Marco</p>
						<h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
							Learning at UNIBO
						</h2>
						<p className="mt-4 max-w-md text-sm leading-relaxed text-indigo-200/80">{profile.about[0]}</p>
						<ul className="mt-6 space-y-2">
							{experience.slice(0, 2).map((item) => (
								<li key={item.title} className="text-sm text-indigo-200/70">
									<span className="font-mono text-xs text-indigo-400">{item.period.split("—")[0]?.trim()}</span>
									{" · "}
									{item.title}
								</li>
							))}
						</ul>
						<div className="mt-8">
							<p className="text-xs font-semibold uppercase text-indigo-400">Coursework stack</p>
							<div className="mt-3 flex flex-wrap gap-2">
								{skillGroups[0].skills.slice(0, 6).map((s) => (
									<span key={s} className="rounded-lg bg-indigo-900/60 px-2 py-1 text-xs text-indigo-200">
										{s}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Shipper side (right) — clipped */}
					<div
						className="absolute inset-0 bg-gradient-to-bl from-orange-950 to-amber-950 p-6 sm:p-10"
						style={{ clipPath: `inset(0 0 0 ${split}%)` }}
					>
						<p className="font-mono text-xs uppercase tracking-widest text-orange-300">Shipper Marco</p>
						<h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
							Production at scale
						</h2>
						<p className="mt-4 max-w-md text-sm leading-relaxed text-orange-200/80">{profile.about[1]}</p>
						<div className="mt-6 space-y-3">
							{featured.map((p) => (
								<a
									key={p.slug}
									href={p.href}
									target="_blank"
									rel="noopener noreferrer"
									className="block rounded-xl border border-orange-800/40 bg-orange-950/40 p-3 transition hover:border-orange-500/50"
								>
									<p className="font-semibold text-white">{p.title}</p>
									<p className="mt-1 text-xs text-orange-200/60 line-clamp-2">{p.description}</p>
								</a>
							))}
						</div>
						<p className="mt-6 text-sm font-medium text-amber-300">{profile.availability}</p>
					</div>

					{/* Divider handle */}
					<motion.div
						className="absolute top-0 z-10 flex h-full w-1 items-center justify-center bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
						style={{ left: `${split}%`, transform: "translateX(-50%)" }}
					>
						<div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-xs font-bold">
							↔
						</div>
					</motion.div>
				</div>

				<motion.footer
					className="mt-10 flex flex-col items-center gap-4 text-center"
					initial={reduceMotion ? false : { opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<GitHubAvatar />
					<ContactLinks linkClassName="text-sm text-orange-300 underline hover:text-white" />
				</motion.footer>
			</div>
		</div>
	);
}
