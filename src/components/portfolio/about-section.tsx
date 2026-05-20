"use client";

import SectionHeading from "@/components/portfolio/section-heading";
import { Reveal } from "@/components/portfolio/motion";
import { profile } from "@/content/profile";

export default function AboutSection() {
	return (
		<section id="about" className="scroll-mt-28 py-20 sm:py-28" aria-labelledby="about-label">
			<div>
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
					<SectionHeading
						id="about"
						eyebrow="About"
						title="Building interfaces that feel intentional"
						description="I'm a Computer Science student who'd rather ship polished UI than slide decks."
					/>

					<Reveal className="space-y-5 text-lg leading-relaxed text-zinc-400">
						{profile.about.map((paragraph) => (
							<p key={paragraph.slice(0, 40)}>{paragraph}</p>
						))}
						<div className="glass-panel mt-8 rounded-2xl border-l-2 border-l-emerald-500 p-6">
							<p className="font-mono text-sm text-emerald-400/90">Currently</p>
							<p className="mt-2 font-medium text-zinc-200">{profile.availability}</p>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
