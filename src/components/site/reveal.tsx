import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;

type RevealProps = {
	children: ReactNode;
	delay?: number;
	className?: string;
	as?: "div" | "section" | "li" | "article" | "header" | "a";
	[key: string]: unknown;
};

export function Reveal({ children, delay = 0, className = "", as = "div", ...rest }: RevealProps) {
	const Tag = as as ElementType;
	const style: RevealStyle | undefined = delay ? { "--reveal-delay": `${delay}s` } : undefined;

	return (
		<Tag
			className={`site-reveal ${className}`.trim()}
			style={style}
			{...rest}
		>
			{children}
		</Tag>
	);
}
