"use client";

import { TerminalFrame } from "@/components/v3/frame";
import { Reveal } from "@/components/v3/reveal";
import { profile } from "@/content/profile";
import { tidy } from "@/lib/v2-text";

export default function V3About() {
	return (
		<section id="about" className="scroll-mt-24 border-t border-brand-border/60 py-20 sm:py-28">
			<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
				{/* Statement + prose */}
				<Reveal>
					<h2 className="font-satoshi text-4xl font-bold leading-[1.04] tracking-tight text-brand-ivory sm:text-5xl">
						Build polished<span className="text-brand-emerald">.</span>
						<br />
						Ship real<span className="text-brand-emerald">.</span>
					</h2>

					<div className="mt-8 space-y-4">
						{profile.about.map((paragraph) => (
							<p key={paragraph} className="max-w-md text-base leading-relaxed text-brand-muted">
								{tidy(paragraph)}
							</p>
						))}
					</div>

					<dl className="mt-9 grid gap-5 sm:grid-cols-3">
						{profile.interests.map((interest) => (
							<div key={interest.label}>
								<dt className="font-space-mono text-[11px] uppercase tracking-[0.16em] text-brand-emerald">
									{interest.label}
								</dt>
								<dd className="mt-2 text-sm leading-relaxed text-brand-muted">{tidy(interest.detail)}</dd>
							</div>
						))}
					</dl>
				</Reveal>

				{/* Terminal identity surface */}
				<Reveal delay={0.1} className="lg:pt-2">
					<TerminalFrame title="marco@portfolio: ~">
						<p>
							<span className="text-brand-emerald">$</span> <span className="text-brand-ivory">whoami</span>
						</p>
						<p className="text-brand-muted">marco antolini / cesena, italy</p>

						<p className="mt-4">
							<span className="text-brand-emerald">$</span>{" "}
							<span className="text-brand-ivory">git log --oneline -3</span>
						</p>
						<p className="text-brand-muted">
							<span className="text-brand-amber">a3f0c1</span> shipped Dracania Archives (live)
						</p>
						<p className="text-brand-muted">
							<span className="text-brand-amber">9d24be</span> published CssHub to Chrome Web Store
						</p>
						<p className="text-brand-muted">
							<span className="text-brand-amber">1c77af</span> studying CS&amp;E at UNIBO Cesena
						</p>

						<p className="mt-4">
							<span className="text-brand-emerald">$</span> <span className="text-brand-ivory">status</span>
						</p>
						<p className="text-brand-emerald">
							open to internships <span className="v3-animate-blink">▍</span>
						</p>
					</TerminalFrame>
				</Reveal>
			</div>
		</section>
	);
}
