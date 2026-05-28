import type { ReactNode } from "react";

/*
 * Interface-frame primitives — the core brand device.
 * Radius lock for v2: frames = rounded-xl, inner media = rounded-lg,
 * buttons/inputs = rounded-lg, status pills = rounded-full.
 */

/** L-shaped corner brackets, echoing the brand-kit board cells. */
export function FrameCorners({ className = "" }: { className?: string }) {
	const base = "pointer-events-none absolute h-3 w-3 border-v2-emerald/50";
	return (
		<span aria-hidden="true" className={className}>
			<span className={`${base} left-2 top-2 border-l border-t`} />
			<span className={`${base} right-2 top-2 border-r border-t`} />
			<span className={`${base} bottom-2 left-2 border-b border-l`} />
			<span className={`${base} bottom-2 right-2 border-b border-r`} />
		</span>
	);
}

type InterfaceFrameProps = {
	children: ReactNode;
	label?: string;
	corners?: boolean;
	className?: string;
	bodyClassName?: string;
};

/** Generic machined-hardware panel with an optional mono caption and corners. */
export function InterfaceFrame({
	children,
	label,
	corners = false,
	className = "",
	bodyClassName = "",
}: InterfaceFrameProps) {
	return (
		<div className={`v2-frame relative rounded-xl ${className}`}>
			{corners ? <FrameCorners /> : null}
			{label ? (
				<div className="flex items-center justify-between border-b border-v2-border px-4 py-2.5">
					<span className="v2-label">{label}</span>
					<span className="h-1.5 w-1.5 rounded-full bg-v2-emerald/70" aria-hidden="true" />
				</div>
			) : null}
			<div className={bodyClassName}>{children}</div>
		</div>
	);
}

type BrowserFrameProps = {
	url: string;
	src: string;
	alt: string;
	priority?: boolean;
	status?: string;
	className?: string;
	aspectClassName?: string;
};

/**
 * Browser product surface: real window chrome (traffic lights + URL bar)
 * wrapping a real project screenshot. No fake product UI — the media is genuine.
 */
export function BrowserFrame({
	url,
	src,
	alt,
	priority = false,
	status,
	className = "",
	aspectClassName = "aspect-[16/10]",
}: BrowserFrameProps) {
	return (
		<div className={`v2-frame relative overflow-hidden rounded-xl ${className}`}>
			<div className="flex items-center gap-3 border-b border-v2-border bg-v2-zinc/70 px-4 py-3">
				<span className="flex gap-1.5" aria-hidden="true">
					<span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
					<span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
					<span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
				</span>
				<span className="flex flex-1 items-center gap-2 truncate rounded-md border border-v2-border bg-v2-obsidian/60 px-3 py-1.5">
					<LockGlyph />
					<span className="truncate font-space-mono text-[12px] text-v2-muted">{url}</span>
				</span>
			</div>
			<div className={`relative ${aspectClassName} bg-v2-obsidian`}>
				<img
					src={src}
					alt={alt}
					loading={priority ? "eager" : "lazy"}
					decoding="async"
					className="h-full w-full object-cover object-top"
				/>
				<span
					className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-v2-ivory/5"
					aria-hidden="true"
				/>
				{status ? (
					<span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-v2-amber/40 bg-v2-obsidian/85 px-3 py-1 font-space-mono text-[11px] text-v2-amber backdrop-blur">
						<span className="h-1.5 w-1.5 rounded-full bg-v2-amber" aria-hidden="true" />
						{status}
					</span>
				) : null}
			</div>
		</div>
	);
}

function LockGlyph() {
	return (
		<svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-v2-emerald/70" fill="none" aria-hidden="true">
			<rect x="3.5" y="7" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
			<path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.3" />
		</svg>
	);
}
