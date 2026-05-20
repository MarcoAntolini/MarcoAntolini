"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
	const reduceMotion = useReducedMotion();

	if (reduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.65, delay, ease: easing }}
		>
			{children}
		</motion.div>
	);
}

type StaggerProps = {
	children: ReactNode;
	className?: string;
	stagger?: number;
};

export function Stagger({ children, className = "", stagger = 0.08 }: StaggerProps) {
	const reduceMotion = useReducedMotion();

	if (reduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-60px" }}
			variants={{
				hidden: {},
				visible: { transition: { staggerChildren: stagger } },
			}}
		>
			{children}
		</motion.div>
	);
}

export function StaggerItem({
	children,
	className = "",
	...props
}: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
	const reduceMotion = useReducedMotion();

	if (reduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
			}}
			{...props}
		>
			{children}
		</motion.div>
	);
}
