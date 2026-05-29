"use client";

import { Reveal, TextReveal } from "@/components/portfolio/motion";
import { motion, useReducedMotion } from "framer-motion";

type SectionHeadingProps = {
	id: string;
	eyebrow: string;
	title: string;
	description?: string;
};

export default function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
	const reduceMotion = useReducedMotion();

	return (
		<Reveal className="mb-12 max-w-2xl md:mb-16">
			<div className="flex items-center gap-3">
				<motion.span
					className="h-px w-8 bg-emerald-500/60"
					initial={reduceMotion ? false : { scaleX: 0 }}
					whileInView={{ scaleX: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					aria-hidden="true"
				/>
				<p
					id={`${id}-label`}
					className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/90"
				>
					{eyebrow}
				</p>
			</div>
			<h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
				<TextReveal as="span" text={title} delay={0.05} />
			</h2>
			{description ? (
				<p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-400">{description}</p>
			) : null}
		</Reveal>
	);
}
