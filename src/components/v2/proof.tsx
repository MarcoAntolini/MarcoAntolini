"use client";

import { profile } from "@/content/profile";
import { tidy } from "@/lib/v2-text";
import { motion, useReducedMotion } from "framer-motion";

export default function V2Proof() {
	const reduceMotion = useReducedMotion();

	return (
		<section aria-label="At a glance" className="border-y border-v2-border/70">
			<div className="grid grid-cols-2 divide-x divide-y divide-v2-border/70 sm:grid-cols-4 sm:divide-y-0">
				{profile.proofStrip.map((item, index) => (
					<motion.div
						key={item.label}
						initial={reduceMotion ? false : { opacity: 0, y: 14 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
						className="px-5 py-7 sm:px-7 sm:py-9"
					>
						<span className="v2-label">{item.label}</span>
						<p className="mt-3 font-satoshi text-[15px] font-medium leading-snug text-v2-ivory sm:text-base">
							{tidy(item.value)}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}
