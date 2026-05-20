"use client";

import { profile } from "@/content/profile";
import { Stagger, StaggerItem } from "@/components/portfolio/motion";

export default function ProofBar() {
	return (
		<section aria-label="Highlights" className="border-y border-zinc-800/80 bg-zinc-900/30 py-8 backdrop-blur-sm">
			<Stagger className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
				{profile.proofStrip.map((item) => (
					<StaggerItem
						key={item.label}
						className="group rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-5 py-4 transition hover:border-emerald-500/30 hover:bg-zinc-900/60 motion-reduce:transition-none"
					>
						<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-500/80">{item.label}</p>
						<p className="mt-2 text-sm font-medium leading-snug text-zinc-200 group-hover:text-zinc-50">
							{item.value}
						</p>
					</StaggerItem>
				))}
			</Stagger>
		</section>
	);
}
