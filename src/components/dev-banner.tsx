"use client";

import { useState } from "react";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/work/dracania-archives", label: "Case study" },
	{ href: "/#contact", label: "Contact" },
	{ href: "/dev", label: "Dev" },
];

export default function DevBanner() {
	const [dismissed, setDismissed] = useState(false);

	if (import.meta.env.PUBLIC_APP_ENV !== "development" || dismissed) {
		return null;
	}

	return (
		<div
			role="status"
			className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-300/30 bg-zinc-950/95 px-4 py-3 text-sm text-amber-100 shadow-lg backdrop-blur"
		>
			<div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
				<p>
					<strong className="text-amber-300">Development</strong> — emails are logged to the terminal, not sent
					to your inbox.
				</p>
				<nav className="flex flex-wrap gap-2" aria-label="Dev quick links">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs font-medium text-zinc-300 hover:border-emerald-500/50 hover:text-emerald-400"
						>
							{link.label}
						</a>
					))}
				</nav>
				<button
					type="button"
					onClick={() => setDismissed(true)}
					className="rounded-md border border-zinc-600 px-2 py-1 text-xs font-medium text-zinc-400"
				>
					Dismiss
				</button>
			</div>
		</div>
	);
}
