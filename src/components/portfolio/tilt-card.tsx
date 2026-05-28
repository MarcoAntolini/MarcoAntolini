"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type TiltCardProps = {
	children: ReactNode;
	className?: string;
	intensity?: number;
};

export default function TiltCard({ children, className = "", intensity = 12 }: TiltCardProps) {
	const reduceMotion = useReducedMotion();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 260, damping: 24 });
	const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 260, damping: 24 });

	function handleMove(event: React.PointerEvent<HTMLDivElement>) {
		if (reduceMotion) return;

		const rect = event.currentTarget.getBoundingClientRect();
		x.set((event.clientX - rect.left) / rect.width - 0.5);
		y.set((event.clientY - rect.top) / rect.height - 0.5);
	}

	function handleLeave() {
		x.set(0);
		y.set(0);
	}

	if (reduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
			onPointerMove={handleMove}
			onPointerLeave={handleLeave}
		>
			{children}
		</motion.div>
	);
}
