"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
	children: ReactNode;
	delay?: number;
	y?: number;
	className?: string;
	as?: "div" | "section" | "li" | "article" | "header";
	[key: string]: unknown;
};

/**
 * Scroll-reveal wrapper — gentle fade-up on viewport entry.
 * Honors reduced motion (renders static, no transform).
 * Uses Framer's whileInView (IntersectionObserver under the hood), never a scroll listener.
 */
export function Reveal({ children, delay = 0, y = 22, className = "", as = "div", ...rest }: RevealProps) {
	const reduce = useReducedMotion();
	const MotionTag = motion[as] as ElementType;

	if (reduce) {
		return (
			<MotionTag className={className} {...rest}>
				{children}
			</MotionTag>
		);
	}

	return (
		<MotionTag
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
			{...rest}
		>
			{children}
		</MotionTag>
	);
}
