"use client";

import { profile } from "@/content/profile";
import { Stagger, StaggerItem } from "@/components/portfolio/motion";
import { motion, useReducedMotion } from "framer-motion";

export default function ProofBar() {
	const reduceMotion = useReducedMotion();

	return (
		<section aria-label="Highlights" className="relative border-y border-zinc-800/80 bg-zinc-900/30 py-8 backdrop-blur-sm">
			<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.06),transparent_70%)]" />
			</div>
			<Stagger className="relative mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
				{profile.proofStrip.map((item) => (
					<StaggerItem key={item.label}>
						<motion.div
							className="group relative overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-5 py-4 transition hover:border-emerald-500/35 hover:bg-zinc-900/60 motion-reduce:transition-none"
							whileHover={reduceMotion ? undefined : { y: -3 }}
							transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
						>
							<div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 motion-reduce:transition-none">
								<div className="absolute inset-0 animate-shimmer-slide bg-gradient-to-r from-transparent via-emerald-400/8 to-transparent motion-reduce:animate-none" />
							</div>
							<p className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-500/80">
								{item.label}
							</p>
							<p className="relative mt-2 text-sm font-medium leading-snug text-zinc-200 transition group-hover:text-zinc-50 motion-reduce:transition-none">
								{item.value}
							</p>
						</motion.div>
					</StaggerItem>
				))}
			</Stagger>
		</section>
	);
}
