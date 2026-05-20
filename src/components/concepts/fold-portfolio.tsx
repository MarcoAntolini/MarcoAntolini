"use client";

import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ContactLinks } from "./shared-links";

const PANELS = [
	{ id: "intro", label: "Cover", content: null },
	{ id: "about", label: "About", content: null },
	{ id: "work", label: "Work", content: null },
	{ id: "path", label: "Path", content: null },
	{ id: "contact", label: "Contact", content: null },
];

export default function FoldPortfolio() {
	const reduceMotion = useReducedMotion();
	const [unfolded, setUnfolded] = useState(0);
	const featured = projects.filter((p) => p.featured);

	const unfoldNext = () => setUnfolded((u) => Math.min(u + 1, PANELS.length - 1));

	return (
		<div className="concept-fold min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 pb-28 text-stone-800">
			<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
				<motion.header className="text-center" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
					<h1 className="font-display text-4xl font-bold text-rose-950">{profile.name}</h1>
					<p className="mt-2 text-rose-700/70">Tap each fold to unfold the next chapter</p>
				</motion.header>

				<div className="perspective-[1200px] mt-12 space-y-2">
					<AnimatePresence>
						{PANELS.slice(0, unfolded + 1).map((panel, i) => (
							<motion.section
								key={panel.id}
								className="origin-top cursor-pointer rounded-2xl border border-rose-200/80 bg-white/90 p-6 shadow-lg shadow-rose-200/50 backdrop-blur-sm"
								initial={reduceMotion ? false : { rotateX: -90, opacity: 0, y: -20 }}
								animate={{ rotateX: 0, opacity: 1, y: 0 }}
								transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.05 }}
								onClick={i === unfolded && unfolded < PANELS.length - 1 ? unfoldNext : undefined}
								style={{ transformStyle: "preserve-3d" }}
							>
								<p className="font-mono text-xs uppercase tracking-widest text-rose-400">
									Fold {String(i + 1).padStart(2, "0")} — {panel.label}
								</p>

								{panel.id === "intro" && (
									<>
										<p className="mt-4 text-lg font-medium text-rose-950">{profile.title}</p>
										<p className="mt-2 text-sm leading-relaxed text-stone-600">{profile.heroLine}</p>
									</>
								)}
								{panel.id === "about" && (
									<div className="mt-4 space-y-3">
										{profile.about.map((para, j) => (
											<p key={j} className="text-sm leading-relaxed text-stone-600">
												{para}
											</p>
										))}
									</div>
								)}
								{panel.id === "work" && (
									<div className="mt-4 space-y-4">
										{featured.map((p) => (
											<a
												key={p.slug}
												href={p.href}
												target="_blank"
												rel="noopener noreferrer"
												className="block rounded-xl border border-rose-100 p-4 transition hover:border-rose-300"
											>
												<h3 className="font-semibold text-rose-950">{p.title}</h3>
												<p className="mt-1 text-sm text-stone-500">{p.description}</p>
											</a>
										))}
									</div>
								)}
								{panel.id === "path" && (
									<ul className="mt-4 space-y-3">
										{experience.map((item) => (
											<li key={item.title} className="text-sm">
												<span className="font-mono text-xs text-rose-400">{item.period}</span>
												<p className="font-medium text-rose-950">{item.title}</p>
												<p className="text-stone-500">{item.organization}</p>
											</li>
										))}
									</ul>
								)}
								{panel.id === "contact" && (
									<div className="mt-4 text-center">
										<p className="text-sm text-rose-700">{profile.availability}</p>
										<ContactLinks className="mt-4 justify-center" linkClassName="text-sm text-rose-600 underline" />
									</div>
								)}

								{i === unfolded && unfolded < PANELS.length - 1 && (
									<p className="mt-4 text-center text-xs text-rose-400">Click to unfold →</p>
								)}
							</motion.section>
						))}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
