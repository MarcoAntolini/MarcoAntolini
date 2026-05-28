"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: "up" | "left" | "right";
};

export function Reveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
	const reduceMotion = useReducedMotion();
	const offset = direction === "left" ? { x: -28, y: 0 } : direction === "right" ? { x: 28, y: 0 } : { x: 0, y: 24 };

	if (reduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, ...offset }}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			viewport={{ once: true, amount: 0.01, margin: "0px 0px -1px 0px" }}
			transition={{ duration: 0.65, delay, ease: easing }}
		>
			{children}
		</motion.div>
	);
}

type TextRevealProps = {
	text: string;
	className?: string;
	delay?: number;
	as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function TextReveal({ text, className = "", delay = 0, as: Tag = "span" }: TextRevealProps) {
	const reduceMotion = useReducedMotion();
	const words = text.split(" ");

	if (reduceMotion) {
		return <Tag className={className}>{text}</Tag>;
	}

	return (
		<Tag className={className} aria-label={text}>
			{words.map((word, index) => (
				<motion.span
					key={`${word}-${index}`}
					className="inline-block"
					initial={{ opacity: 0, y: 14, rotate: 2 }}
					whileInView={{ opacity: 1, y: 0, rotate: 0 }}
					viewport={{ once: true, amount: 0.01, margin: "0px 0px -1px 0px" }}
					transition={{ duration: 0.5, delay: delay + index * 0.06, ease: easing }}
				>
					{word}
					{index < words.length - 1 ? "\u00A0" : ""}
				</motion.span>
			))}
		</Tag>
	);
}

type MagneticProps = {
	children: ReactNode;
	className?: string;
	strength?: number;
};

export function Magnetic({ children, className = "", strength = 0.22 }: MagneticProps) {
	const reduceMotion = useReducedMotion();

	if (reduceMotion) {
		return <span className={className}>{children}</span>;
	}

	return (
		<motion.span
			className={`inline-flex ${className}`}
			whileHover={{ scale: 1.03 }}
			whileTap={{ scale: 0.98 }}
			onMouseMove={(event) => {
				const rect = event.currentTarget.getBoundingClientRect();
				const offsetX = (event.clientX - rect.left - rect.width / 2) * strength;
				const offsetY = (event.clientY - rect.top - rect.height / 2) * strength;
				event.currentTarget.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
			}}
			onMouseLeave={(event) => {
				event.currentTarget.style.transform = "";
			}}
			transition={{ type: "spring", stiffness: 320, damping: 22 }}
		>
			{children}
		</motion.span>
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
			viewport={{ once: true, amount: 0.01, margin: "0px 0px -1px 0px" }}
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
