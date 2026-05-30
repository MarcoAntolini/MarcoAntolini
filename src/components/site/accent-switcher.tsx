"use client";

import { Check, Palette } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";

const ACCENT_STORAGE_KEY = "accent-theme";

const accents = [
	{ id: "emerald", label: "Emerald", rgb: "52 211 153" },
	{ id: "cyan", label: "Cyan", rgb: "34 211 238" },
	{ id: "violet", label: "Violet", rgb: "167 139 250" },
	{ id: "coral", label: "Coral", rgb: "251 113 133" },
	{ id: "gold", label: "Gold", rgb: "245 158 11" },
] as const;

type AccentId = (typeof accents)[number]["id"];

function isAccentId(value: string | null): value is AccentId {
	return accents.some((accent) => accent.id === value);
}

function applyAccentTheme(theme: AccentId) {
	if (theme === "emerald") {
		delete document.documentElement.dataset.accentTheme;
	} else {
		document.documentElement.dataset.accentTheme = theme;
	}
}

export default function AccentSwitcher() {
	const [activeTheme, setActiveTheme] = useState<AccentId>("emerald");

	useEffect(() => {
		const savedTheme = window.localStorage.getItem(ACCENT_STORAGE_KEY);
		if (!isAccentId(savedTheme)) return;

		setActiveTheme(savedTheme);
		applyAccentTheme(savedTheme);
	}, []);

	function selectTheme(theme: AccentId) {
		setActiveTheme(theme);
		applyAccentTheme(theme);
		window.localStorage.setItem(ACCENT_STORAGE_KEY, theme);
	}

	return (
		<section
			className="fixed bottom-5 right-5 z-[60] hidden rounded-2xl border border-brand-border/80 bg-brand-obsidian/88 px-3 py-3 shadow-[0_24px_70px_-32px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:block"
			aria-label="Accent theme picker"
		>
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-2 text-brand-muted">
					<Palette className="h-4 w-4 text-brand-emerald" strokeWidth={1.8} aria-hidden="true" />
					<span className="font-space-mono text-[11px] uppercase leading-none tracking-[0.16em]">Accent</span>
				</div>
				<div className="flex items-center gap-1.5" role="radiogroup" aria-label="Choose accent theme">
					{accents.map((accent) => {
						const isActive = activeTheme === accent.id;

						return (
							<button
								key={accent.id}
								type="button"
								className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition motion-reduce:transition-none ${
									isActive ? "border-brand-ivory/70 bg-brand-zinc" : "border-brand-border hover:border-brand-ivory/40"
								}`}
								role="radio"
								aria-checked={isActive}
								aria-label={`${accent.label} accent`}
								title={`${accent.label} accent`}
								onClick={() => selectTheme(accent.id)}
							>
								<span
									className="h-4 w-4 rounded-full shadow-[0_0_18px_rgb(var(--swatch-color)/0.45)]"
									style={{ backgroundColor: `rgb(${accent.rgb})`, "--swatch-color": accent.rgb } as CSSProperties}
									aria-hidden="true"
								/>
								{isActive ? (
									<Check className="absolute right-1 top-1 h-3 w-3 text-brand-ivory" strokeWidth={2.2} aria-hidden="true" />
								) : null}
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}
