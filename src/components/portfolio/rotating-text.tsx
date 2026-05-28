"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type RotatingTextProps = {
	items: readonly string[];
	intervalMs?: number;
	className?: string;
};

export default function RotatingText({ items, intervalMs = 2800, className = "" }: RotatingTextProps) {
	const reduceMotion = useReducedMotion();
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (reduceMotion || items.length <= 1) return;

		const timer = window.setInterval(() => {
			setIndex((current) => (current + 1) % items.length);
		}, intervalMs);

		return () => window.clearInterval(timer);
	}, [items.length, intervalMs, reduceMotion]);

	if (items.length === 0) return null;

	const current = items[index] ?? items[0];

	if (reduceMotion) {
		return <span className={className}>{current}</span>;
	}

	return (
		<span className={`relative inline-flex overflow-hidden ${className}`}>
			<AnimatePresence mode="wait">
				<motion.span
					key={current}
					initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
					transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
					className="inline-block"
				>
					{current}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
