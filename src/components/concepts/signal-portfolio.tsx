"use client";

import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ContactLinks } from "./shared-links";

const STATIONS = [
	{ freq: 88, label: "MARCO FM", section: "intro" as const },
	{ freq: 92, label: "ABOUT WAVE", section: "about" as const },
	{ freq: 96, label: "PROJECT NET", section: "projects" as const },
	{ freq: 100, label: "SKILL SCAN", section: "skills" as const },
	{ freq: 104, label: "CONTACT SIG", section: "contact" as const },
];

export default function SignalPortfolio() {
	const reduceMotion = useReducedMotion();
	const [tuning, setTuning] = useState(88);
	const featured = projects.filter((p) => p.featured);

	const activeStation = useMemo(() => {
		return STATIONS.reduce((closest, station) =>
			Math.abs(station.freq - tuning) < Math.abs(closest.freq - tuning) ? station : closest,
		);
	}, [tuning]);

	const staticOpacity = Math.min(1, Math.abs(tuning - activeStation.freq) * 0.4);

	return (
		<div className="concept-signal min-h-screen bg-[#1c1410] pb-28 text-amber-100">
			<div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
				<motion.div
					className="rounded-3xl border-4 border-amber-900/60 bg-gradient-to-b from-amber-950 to-stone-950 p-8 shadow-2xl"
					initial={reduceMotion ? false : { opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					{/* Radio dial */}
					<div className="relative mx-auto h-48 w-48 rounded-full border-8 border-amber-800 bg-amber-950 shadow-inner">
						<div className="absolute inset-4 rounded-full border border-amber-700/50" />
						{STATIONS.map((s) => (
							<span
								key={s.freq}
								className="absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[10px] text-amber-600"
								style={{ transform: `rotate(${(s.freq - 88) * 9 - 72}deg) translateY(0) rotate(${72 - (s.freq - 88) * 9}deg)` }}
							>
								{s.freq}
							</span>
						))}
						<motion.div
							className="absolute bottom-1/2 left-1/2 h-[45%] w-1 origin-bottom rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"
							style={{ rotate: `${(tuning - 88) * 9 - 90}deg`, x: "-50%" }}
						/>
						<div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600" />
					</div>

					<input
						type="range"
						min={88}
						max={104}
						step={0.5}
						value={tuning}
						onChange={(e) => setTuning(Number(e.target.value))}
						className="mt-8 w-full accent-amber-500"
						aria-label="Tune radio frequency"
					/>
					<p className="mt-2 text-center font-mono text-sm text-amber-500">{tuning.toFixed(1)} MHz</p>

					<motion.div
						className="relative mt-8 min-h-[200px] rounded-xl border border-amber-800/40 bg-black/40 p-6"
						animate={reduceMotion ? undefined : { opacity: 1 - staticOpacity * 0.7 }}
					>
						{staticOpacity > 0.1 && (
							<div
								className="pointer-events-none absolute inset-0 opacity-30"
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
								}}
							/>
						)}
						<p className="font-mono text-xs text-amber-600">▶ {activeStation.label}</p>

						{activeStation.section === "intro" && (
							<div className="mt-4">
								<h1 className="font-display text-2xl font-bold">{profile.name}</h1>
								<p className="mt-2 text-sm text-amber-200/70">{profile.heroLine}</p>
							</div>
						)}
						{activeStation.section === "about" && (
							<div className="mt-4 space-y-2">
								{profile.about.map((p, i) => (
									<p key={i} className="text-sm text-amber-200/70">
										{p}
									</p>
								))}
							</div>
						)}
						{activeStation.section === "projects" && (
							<div className="mt-4 space-y-3">
								{featured.map((p) => (
									<a key={p.slug} href={p.href} target="_blank" rel="noopener noreferrer" className="block text-sm">
										<span className="font-semibold text-amber-200">{p.title}</span>
										<span className="text-amber-400/60"> — {p.description.slice(0, 60)}…</span>
									</a>
								))}
							</div>
						)}
						{activeStation.section === "skills" && (
							<div className="mt-4">
								{skillGroups.map((g) => (
									<p key={g.name} className="mt-2 text-sm text-amber-200/70">
										<span className="text-amber-400">{g.name}:</span> {g.skills.join(", ")}
									</p>
								))}
							</div>
						)}
						{activeStation.section === "contact" && (
							<div className="mt-4">
								<p className="text-sm text-amber-300">{profile.availability}</p>
								<ContactLinks className="mt-4" linkClassName="text-sm text-amber-400 underline" />
								<ul className="mt-4 space-y-1 text-xs text-amber-600">
									{experience.map((e) => (
										<li key={e.title}>
											{e.period} — {e.title}
										</li>
									))}
								</ul>
							</div>
						)}
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
