"use client";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ContactLinks } from "./shared-links";

export default function VinylPortfolio() {
	const reduceMotion = useReducedMotion();
	const [activeIndex, setActiveIndex] = useState(0);
	const tracks = projects.filter((p) => p.featured);
	const active = tracks[activeIndex];

	return (
		<div className="concept-vinyl min-h-screen bg-[#1a1208] pb-28 text-amber-50">
			<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
				<motion.header
					className="text-center"
					initial={reduceMotion ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-500">Side A — Marco Antolini</p>
					<h1 className="mt-3 font-display text-4xl font-bold">{profile.name}</h1>
					<p className="mt-2 text-amber-200/60">{profile.title}</p>
				</motion.header>

				<div className="mt-12 flex flex-col items-center gap-10 lg:flex-row lg:justify-center">
					<motion.div
						className="relative h-64 w-64 shrink-0"
						animate={reduceMotion ? undefined : { rotate: 360 }}
						transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
						key={activeIndex}
					>
						<div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl shadow-black/60" />
						<div className="absolute inset-4 rounded-full border border-zinc-700/50" />
						<div className="absolute inset-8 rounded-full border border-zinc-600/30" />
						<div className="absolute inset-16 rounded-full border border-zinc-500/20" />
						<div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600" />
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="font-display text-xs font-bold uppercase tracking-widest text-amber-200/40">
								{active.title.slice(0, 12)}
							</span>
						</div>
					</motion.div>

					<div className="max-w-md">
						<motion.h2
							key={active.slug}
							className="font-display text-2xl font-bold text-amber-100"
							initial={reduceMotion ? false : { opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
						>
							{active.title}
						</motion.h2>
						<p className="mt-3 text-sm leading-relaxed text-amber-200/70">
							{active.longDescription ?? active.description}
						</p>
						<p className="mt-3 font-mono text-xs text-amber-500">{active.tags.join(" · ")}</p>
						<a
							href={active.href}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-4 inline-block text-sm font-medium text-amber-400 underline hover:text-amber-200"
						>
							Open project →
						</a>

						<div className="mt-8 flex gap-2">
							{tracks.map((_, i) => (
								<button
									key={i}
									type="button"
									onClick={() => setActiveIndex(i)}
									className={`h-2 flex-1 rounded-full transition ${
										i === activeIndex ? "bg-amber-500" : "bg-amber-900/60 hover:bg-amber-800"
									}`}
									aria-label={`Track ${i + 1}`}
								/>
							))}
						</div>

						{/* Waveform */}
						<div className="mt-6 flex h-12 items-end justify-center gap-0.5">
							{Array.from({ length: 32 }).map((_, i) => (
								<motion.div
									key={i}
									className="w-1 rounded-full bg-amber-500/70"
									animate={
										reduceMotion
											? { height: 12 }
											: { height: [8, 12 + (i % 5) * 8, 8] }
									}
									transition={{ duration: 0.6 + (i % 4) * 0.1, repeat: Infinity, delay: i * 0.03 }}
								/>
							))}
						</div>
					</div>
				</div>

				<motion.footer
					className="mt-16 rounded-2xl border border-amber-900/50 bg-amber-950/30 p-8 text-center"
					initial={reduceMotion ? false : { opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<p className="text-sm text-amber-400">{profile.availability}</p>
					<ContactLinks className="mt-4 justify-center" linkClassName="text-sm text-amber-300 underline" />
				</motion.footer>
			</div>
		</div>
	);
}
