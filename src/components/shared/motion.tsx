import type { CSSProperties, ReactNode } from "react";

type RevealStyle = CSSProperties & Partial<Record<"--reveal-delay" | "--reveal-stagger", string>>;

type RevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: "up" | "left" | "right";
};

export function Reveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
	const style: RevealStyle | undefined = delay ? { "--reveal-delay": `${delay}s` } : undefined;

	return (
		<div className={`site-reveal site-reveal-${direction} ${className}`.trim()} style={style}>
			{children}
		</div>
	);
}

type TextRevealProps = {
	text: string;
	className?: string;
	delay?: number;
	as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function TextReveal({ text, className = "", delay = 0, as: Tag = "span" }: TextRevealProps) {
	const words = text.split(" ");

	return (
		<Tag className={className} aria-label={text}>
			{words.map((word, index) => (
				<span
					key={`${word}-${index}`}
					className="site-word-reveal inline-block"
					style={{ "--reveal-delay": `${delay + index * 0.045}s` } as RevealStyle}
				>
					{word}
					{index < words.length - 1 ? "\u00A0" : ""}
				</span>
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
	return (
		<span
			className={`inline-flex transition-transform duration-200 motion-reduce:transition-none ${className}`}
			onMouseMove={(event) => {
				const rect = event.currentTarget.getBoundingClientRect();
				const offsetX = (event.clientX - rect.left - rect.width / 2) * strength;
				const offsetY = (event.clientY - rect.top - rect.height / 2) * strength;
				event.currentTarget.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
			}}
			onMouseLeave={(event) => {
				event.currentTarget.style.transform = "";
			}}
		>
			{children}
		</span>
	);
}

type StaggerProps = {
	children: ReactNode;
	className?: string;
	stagger?: number;
};

export function Stagger({ children, className = "", stagger = 0.08 }: StaggerProps) {
	const style: RevealStyle | undefined = stagger ? { "--reveal-stagger": `${stagger}s` } : undefined;

	return (
		<div className={`site-stagger ${className}`.trim()} style={style}>
			{children}
		</div>
	);
}

export function StaggerItem({
	children,
	className = "",
	...props
}: { children: ReactNode; className?: string }) {
	return (
		<div className={`site-reveal ${className}`.trim()} {...props}>
			{children}
		</div>
	);
}
