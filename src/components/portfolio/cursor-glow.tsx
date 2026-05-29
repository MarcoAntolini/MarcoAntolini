"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
	const reduceMotion = useReducedMotion();
	const x = useMotionValue(-200);
	const y = useMotionValue(-200);
	const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.4 });
	const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.4 });

	useEffect(() => {
		if (reduceMotion) return;

		const onMove = (event: PointerEvent) => {
			x.set(event.clientX);
			y.set(event.clientY);
		};

		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, [reduceMotion, x, y]);

	if (reduceMotion) return null;

	return (
		<div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
			<motion.div
				className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/12 blur-[90px]"
				style={{ left: springX, top: springY }}
			/>
			<motion.div
				className="absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/8 blur-[60px]"
				style={{ left: springX, top: springY }}
			/>
		</div>
	);
}
