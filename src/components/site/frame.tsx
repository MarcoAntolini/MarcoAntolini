import type { ReactNode } from "react";

export function WindowDots() {
	return (
		<div className="flex items-center gap-1.5" aria-hidden="true">
			<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
			<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
			<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
		</div>
	);
}

type BrowserFrameProps = {
	url: string;
	children: ReactNode;
	className?: string;
	status?: ReactNode;
};

export function BrowserFrame({ url, children, className = "", status }: BrowserFrameProps) {
	return (
		<div className={`site-surface overflow-hidden rounded-2xl ${className}`}>
			<div className="flex items-center gap-3 border-b border-brand-border/80 px-4 py-3">
				<WindowDots />
				<div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-brand-border/70 bg-brand-obsidian/60 px-3 py-1.5">
					<svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-brand-muted" fill="none" aria-hidden="true">
						<rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
						<path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" />
					</svg>
					<span className="truncate font-space-mono text-[12px] text-brand-muted">{url}</span>
				</div>
				{status ? <div className="hidden shrink-0 sm:block">{status}</div> : null}
			</div>
			{children}
		</div>
	);
}

export function StatusDot({ tone = "emerald" }: { tone?: "emerald" | "amber" }) {
	const color = tone === "amber" ? "bg-brand-amber" : "bg-brand-emerald";
	return (
		<span className="relative inline-flex h-2 w-2" aria-hidden="true">
			<span className={`site-animate-pulse absolute inline-flex h-full w-full rounded-full ${color} opacity-60 motion-reduce:animate-none`} />
			<span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
		</span>
	);
}
