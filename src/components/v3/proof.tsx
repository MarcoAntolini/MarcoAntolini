"use client";

import { Reveal } from "@/components/v3/reveal";
import { profile } from "@/content/profile";
import { tidy } from "@/lib/v2-text";

export default function V3Proof() {
	return (
		<Reveal as="section" aria-label="Proof points" className="py-8">
			<div className="v3-surface-flat grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-brand-border/60 md:grid-cols-4">
				{profile.proofStrip.map((item) => (
					<div key={item.label} className="bg-brand-obsidian px-5 py-6">
						<p className="v3-label">{item.label}</p>
						<p className="mt-2 font-satoshi text-[15px] font-medium leading-snug text-brand-ivory">
							{tidy(item.value)}
						</p>
					</div>
				))}
			</div>
		</Reveal>
	);
}
