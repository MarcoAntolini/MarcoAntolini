"use client";

import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ContactLinks } from "./shared-links";

const LETTERS = "MARCO".split("");

function KineticLetter({
	letter,
	index,
	scrollYProgress,
	reduceMotion,
}: {
	letter: string;
	index: number;
	scrollYProgress: MotionValue<number>;
	reduceMotion: boolean | null;
}) {
	const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, (index % 2 === 0 ? -120 : 120), (index - 2) * 40]);
	const rotate = useTransform(scrollYProgress, [0, 0.5], [0, (index - 2) * 15]);
	const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.4, 0.15]);

	return (
		<motion.span
			className="font-display text-[15vw] font-black leading-none sm:text-[12vw]"
			style={reduceMotion ? undefined : { y, rotate, opacity }}
		>
			{letter}
		</motion.span>
	);
}

export default function KineticPortfolio() {
	const reduceMotion = useReducedMotion();
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: containerRef });
	const subtitleOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
	const featured = projects.filter((p) => p.featured);

	return (
		<div ref={containerRef} className="concept-kinetic min-h-[200vh] bg-black pb-28 text-white">
			<div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
				<div className="flex gap-2 sm:gap-4">
					{LETTERS.map((letter, i) => (
						<KineticLetter
							key={letter + i}
							letter={letter}
							index={i}
							scrollYProgress={scrollYProgress}
							reduceMotion={reduceMotion}
						/>
					))}
				</div>

				<motion.p
					className="mt-8 max-w-md px-4 text-center text-lg text-zinc-400"
					style={reduceMotion ? undefined : { opacity: subtitleOpacity }}
				>
					{profile.name} — {profile.title}
				</motion.p>
			</div>

			<div className="relative mx-auto max-w-3xl px-4 sm:px-6">
				<motion.section
					className="py-20"
					initial={reduceMotion ? false : { opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<p className="text-4xl font-bold leading-tight sm:text-5xl">{profile.heroLine}</p>
				</motion.section>

				<section className="space-y-8 pb-20">
					{featured.map((project, i) => (
						<motion.a
							key={project.slug}
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							className="block border-t border-zinc-800 py-8"
							initial={reduceMotion ? false : { opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<p className="font-mono text-xs text-zinc-600">{String(i + 1).padStart(2, "0")}</p>
							<h2 className="mt-2 font-display text-3xl font-bold hover:text-zinc-300">{project.title}</h2>
							<p className="mt-3 text-zinc-500">{project.description}</p>
						</motion.a>
					))}
				</section>

				<motion.footer
					className="border-t border-zinc-800 py-16 text-center"
					initial={reduceMotion ? false : { opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					<p className="text-sm text-zinc-500">{profile.availability}</p>
					<ContactLinks className="mt-6 justify-center" linkClassName="text-sm text-white underline" />
				</motion.footer>
			</div>
		</div>
	);
}
