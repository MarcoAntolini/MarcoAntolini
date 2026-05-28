type MarkProps = {
	className?: string;
	title?: string;
};

/**
 * MA monogram — MA brand kit (brandkit.png, panels 01/02):
 *   "M" built from interface-frame strokes,
 *   "A" carries a cursor in the negative space of its counter (emerald accent).
 * Letterforms use currentColor so the mark adapts to its context.
 */
export function MarkMA({ className = "", title = "Marco Antolini" }: MarkProps) {
	return (
		<svg viewBox="0 0 60 40" fill="none" role="img" aria-label={title} className={className}>
			<path
				d="M6 33 V7 L16 21 L26 7 V33"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="square"
				strokeLinejoin="miter"
			/>
			<path
				d="M33 33 L43 7 L53 33"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="square"
				strokeLinejoin="miter"
			/>
			<path d="M37.6 21 H48.4" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
			{/* Cursor living inside the A counter */}
			<path d="M41 13.5 L41 23 L43.1 20.9 L44.6 24 L46 23.4 L44.5 20.4 L47.4 20.4 Z" fill="rgb(52 211 153)" />
		</svg>
	);
}

export function WordmarkMA({ className = "" }: { className?: string }) {
	return (
		<span className={`inline-flex items-center gap-2.5 ${className}`}>
			<MarkMA className="h-6 w-auto text-brand-ivory" />
			<span className="font-satoshi text-[15px] font-medium tracking-tight text-brand-ivory">Marco Antolini</span>
		</span>
	);
}
