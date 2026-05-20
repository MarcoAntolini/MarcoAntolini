"use client";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ContactLinks } from "./shared-links";

export default function ArcadePortfolio() {
	const reduceMotion = useReducedMotion();
	const [coins, setCoins] = useState(0);
	const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
	const levels = projects.filter((p) => p.featured);

	const insertCoin = () => setCoins((c) => Math.min(c + 1, 3));

	return (
		<div className="concept-arcade min-h-screen bg-[#0a0a0a] pb-28 text-lime-400" style={{ fontFamily: "'Press Start 2P', monospace" }}>
			<div className="mx-auto max-w-2xl px-4 py-10">
				{/* CRT frame */}
				<div className="rounded-lg border-4 border-zinc-700 bg-zinc-900 p-1 shadow-[0_0_60px_rgba(132,204,22,0.15)]">
					<div
						className="relative overflow-hidden rounded border-2 border-zinc-800 bg-black p-6 sm:p-8"
						style={{
							boxShadow: "inset 0 0 80px rgba(132,204,22,0.08)",
						}}
					>
						<div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)]" />

						<motion.p
							className="text-center text-[10px] leading-relaxed text-lime-500 sm:text-xs"
							animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							★ MARCO QUEST ★ INSERT COIN TO PLAY ★
						</motion.p>

						<h1 className="mt-4 text-center text-sm leading-loose text-lime-300 sm:text-base">{profile.name}</h1>
						<p className="mt-2 text-center text-[8px] leading-relaxed text-lime-600 sm:text-[10px]">
							{profile.title.toUpperCase()}
						</p>

						<div className="mt-8 flex justify-center gap-4">
							<button
								type="button"
								onClick={insertCoin}
								className="rounded border-2 border-lime-600 bg-lime-950 px-4 py-2 text-[8px] text-lime-400 transition hover:bg-lime-900 sm:text-[10px]"
							>
								INSERT COIN ({coins}/3)
							</button>
						</div>

						{coins >= 1 && (
							<motion.div
								className="mt-8"
								initial={reduceMotion ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								<p className="text-[8px] text-lime-600 sm:text-[10px]">SELECT LEVEL:</p>
								<div className="mt-4 space-y-3">
									{levels.map((level, i) => (
										<button
											key={level.slug}
											type="button"
											onClick={() => setSelectedLevel(i)}
											className={`block w-full border-2 p-3 text-left text-[8px] transition sm:text-[10px] ${
												selectedLevel === i
													? "border-lime-400 bg-lime-950/80 text-lime-300"
													: "border-lime-800 text-lime-600 hover:border-lime-600"
											}`}
										>
											LVL {i + 1}: {level.title}
										</button>
									))}
								</div>
							</motion.div>
						)}

						{coins >= 2 && selectedLevel !== null && (
							<motion.div
								className="mt-6 border-2 border-lime-700 p-4"
								initial={reduceMotion ? false : { opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
							>
								<p className="text-[8px] text-lime-500 sm:text-[10px]">{levels[selectedLevel].description}</p>
								<a
									href={levels[selectedLevel].href}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-3 inline-block text-[8px] text-lime-400 underline sm:text-[10px]"
								>
									▶ START GAME
								</a>
							</motion.div>
						)}

						{coins >= 3 && (
							<motion.div
								className="mt-6"
								initial={reduceMotion ? false : { opacity: 0 }}
								animate={{ opacity: 1 }}
							>
								<p className="text-[8px] text-lime-600 sm:text-[10px]">POWER-UPS:</p>
								<p className="mt-2 text-[8px] leading-loose text-lime-500 sm:text-[10px]">
									{skillGroups[0].skills.slice(0, 8).join(" · ").toUpperCase()}
								</p>
								<div className="mt-6 text-center">
									<ContactLinks linkClassName="text-[8px] text-lime-400 underline sm:text-[10px]" />
								</div>
							</motion.div>
						)}
					</div>
				</div>

				<p className="mt-6 text-center text-[8px] text-zinc-600">{profile.availability}</p>
			</div>
		</div>
	);
}
