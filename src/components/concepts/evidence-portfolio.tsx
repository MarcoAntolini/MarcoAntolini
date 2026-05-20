"use client";

import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { motion, useReducedMotion } from "framer-motion";
import { ContactLinks } from "./shared-links";

const CONNECTIONS = [
	[0, 1],
	[1, 2],
	[0, 2],
];

export default function EvidencePortfolio() {
	const reduceMotion = useReducedMotion();
	const featured = projects.filter((p) => p.featured);
	const cards = [
		{ type: "profile", title: profile.name, subtitle: profile.title, body: profile.heroLine },
		...featured.map((p) => ({ type: "project", title: p.title, subtitle: p.tags.join(", "), body: p.description, href: p.href })),
		{ type: "status", title: "Status", subtitle: profile.availability, body: profile.location },
	];

	return (
		<div
			className="concept-evidence min-h-screen pb-28 text-stone-900"
			style={{
				backgroundColor: "#c4a574",
				backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a08050' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
			}}
		>
			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
				<motion.header
					className="text-center"
					initial={reduceMotion ? false : { opacity: 0, rotate: -2 }}
					animate={{ opacity: 1, rotate: 0 }}
				>
					<h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Case file: {profile.name}</h1>
					<p className="mt-2 font-mono text-sm text-stone-700">Investigation ongoing · hireability: confirmed</p>
				</motion.header>

				<div className="relative mt-12 min-h-[480px]">
					<svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
						{CONNECTIONS.map(([a, b], i) => (
							<motion.line
								key={i}
								x1={`${20 + a * 30}%`}
								y1={`${25 + (a % 2) * 35}%`}
								x2={`${20 + b * 30}%`}
								y2={`${25 + (b % 2) * 35}%`}
								stroke="#dc2626"
								strokeWidth="2"
								initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0, opacity: 0.5 }}
								whileInView={{ pathLength: 1, opacity: 0.7 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: i * 0.2 }}
							/>
						))}
					</svg>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{cards.map((card, i) => (
							<motion.article
								key={card.title}
								className="relative rotate-[-1deg] bg-stone-100 p-5 shadow-lg even:rotate-[1deg]"
								style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + i * 0.3)}deg)` }}
								initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.9 }}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								whileHover={reduceMotion ? undefined : { scale: 1.03, rotate: 0, zIndex: 10 }}
							>
								<motion.span
									className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-red-600 shadow-md"
									initial={reduceMotion ? false : { scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
								/>
								{"href" in card && card.href ? (
									<a href={card.href} target="_blank" rel="noopener noreferrer">
										<h3 className="font-display text-lg font-bold underline decoration-red-500/50">{card.title}</h3>
									</a>
								) : (
									<h3 className="font-display text-lg font-bold">{card.title}</h3>
								)}
								<p className="mt-1 font-mono text-xs text-stone-500">{card.subtitle}</p>
								<p className="mt-3 text-sm leading-relaxed text-stone-700">{card.body}</p>
							</motion.article>
						))}
					</div>
				</div>

				<section className="mt-12 rounded-lg bg-stone-100/80 p-6 shadow-inner">
					<h2 className="font-display text-lg font-semibold">Timeline evidence</h2>
					<ul className="mt-4 space-y-2">
						{experience.map((item) => (
							<li key={item.title} className="flex gap-3 text-sm">
								<span className="shrink-0 font-mono text-xs text-red-700">{item.period}</span>
								<span>
									<strong>{item.title}</strong> — {item.organization}
								</span>
							</li>
						))}
					</ul>
				</section>

				<footer className="mt-10 text-center">
					<p className="font-mono text-sm text-stone-700">Report findings to:</p>
					<ContactLinks className="mt-3 justify-center" linkClassName="text-sm font-medium text-red-800 underline" />
				</footer>
			</div>
		</div>
	);
}
