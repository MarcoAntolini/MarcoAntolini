"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
	const reduceMotion = useReducedMotion();
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

	if (reduceMotion) return null;

	return (
		<motion.div
			className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand-emerald shadow-[0_0_12px_rgb(var(--brand-emerald)/0.6)]"
			style={{ scaleX }}
			aria-hidden="true"
		/>
	);
}
