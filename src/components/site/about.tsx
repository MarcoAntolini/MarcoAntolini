"use client";

import { Reveal } from "@/components/site/reveal";
import { profile } from "@/content/profile";
import { tidy } from "@/lib/text";
import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

const building = [
	"shipping web & mobile interfaces",
	"open-source tooling & side projects",
] as const;

export default function About() {
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

	const prompt = (
		<>
			<span className="text-brand-emerald">marcoantolini/dev</span> ~ %
		</>
	);

	return (
		<section id="about" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28">
			<div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
				<Reveal>
					<h2 className="max-w-xl font-satoshi text-3xl font-bold tracking-tight text-brand-ivory sm:text-[2.4rem] sm:leading-[1.08]">
						I'd rather ship than theorize.
					</h2>
					<div className="mt-7 space-y-5">
						{profile.about.map((paragraph) => (
							<p key={paragraph} className="max-w-[62ch] text-base leading-relaxed text-brand-muted sm:text-[1.05rem]">
								{tidy(paragraph)}
							</p>
						))}
					</div>
				</Reveal>

				<motion.div {...rise(0.1)} aria-label="Current activity and availability">
					<div className="site-frame overflow-hidden rounded-xl">
						<div className="flex items-center gap-1.5 border-b border-brand-border bg-brand-zinc/70 px-4 py-2.5" aria-hidden="true">
							<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
							<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
							<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
							<span className="ml-2 font-space-mono text-[11px] text-brand-muted/80">marcoantolini/dev: ~</span>
						</div>
						<pre className="overflow-x-auto px-4 py-4 font-space-mono text-[12px] leading-[1.75] text-brand-muted sm:text-[13px]">
							<code>
								{prompt} activity{"\n"}
								{building.map((line) => (
									<Fragment key={line}>
										<span className="text-brand-ivory/90">→</span> {line}
										{"\n"}
									</Fragment>
								))}
								{"\n"}
								{prompt} status{"\n"}
								<span className="text-brand-emerald">● {profile.availabilityStatus.label.toLowerCase()}</span>
								{" — "}
								{profile.availabilityStatus.engagement.toLowerCase()}
								{"\n"}
								<span className="text-brand-muted/75">
									{"  "}
									{profile.availabilityStatus.roles.join(" · ").toLowerCase()}
								</span>
								{"\n\n"}
								{prompt}{" "}
								<span className="site-animate-blink inline-block h-3.5 w-2 translate-y-0.5 bg-brand-ivory/80 motion-reduce:animate-none" />
							</code>
						</pre>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
