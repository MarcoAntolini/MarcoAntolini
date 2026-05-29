"use client";

import { Reveal } from "@/components/v4/reveal";
import { profile } from "@/content/profile";
import { tidy } from "@/lib/v2-text";
import { motion, useReducedMotion } from "framer-motion";

export default function V4About() {
	const reduceMotion = useReducedMotion();
	const rise = (delay = 0) =>
		reduceMotion
			? { initial: false as const, whileInView: { opacity: 1, y: 0 } }
			: {
					initial: { opacity: 0, y: 20 },
					whileInView: { opacity: 1, y: 0 },
					viewport: { once: true, amount: 0.25 },
					transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
				};

	return (
		<section id="about" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28">
			<div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
				<Reveal>
					<h2 className="max-w-xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.4rem] sm:leading-[1.08]">
						A student who would rather ship than theorize.
					</h2>
					<div className="mt-7 space-y-5">
						{profile.about.map((paragraph) => (
							<p key={paragraph} className="max-w-[60ch] text-base leading-relaxed text-brand-muted">
								{tidy(paragraph)}
							</p>
						))}
					</div>
				</Reveal>

				<motion.div {...rise(0.1)} className="space-y-4">
					{profile.interests.map((interest) => (
						<div key={interest.label} className="v4-frame rounded-xl p-5">
							<h3 className="font-satoshi text-sm font-semibold text-brand-ivory">{interest.label}</h3>
							<p className="mt-2 text-sm leading-relaxed text-brand-muted">{tidy(interest.detail)}</p>
						</div>
					))}

					<div className="v4-frame overflow-hidden rounded-xl">
						<div className="flex items-center gap-1.5 border-b border-brand-border bg-brand-zinc/70 px-4 py-2.5" aria-hidden="true">
							<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
							<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
							<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
						</div>
						<pre className="overflow-x-auto px-4 py-4 font-space-mono text-[12px] leading-relaxed text-brand-muted">
							<code>
								<span className="text-brand-emerald">marco@portfolio</span> ~ % git status{"\n"}
								On branch main{"\n"}
								nothing to commit, working tree clean{"\n"}
								<span className="text-brand-emerald">marco@portfolio</span> ~ %{" "}
								<span className="v4-animate-blink inline-block h-3.5 w-2 translate-y-0.5 bg-brand-ivory/80 motion-reduce:animate-none" />
							</code>
						</pre>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
