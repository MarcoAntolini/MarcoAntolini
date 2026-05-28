"use client";

import { MarkMA } from "@/components/v2/mark";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
	{ href: "#work", label: "Work", id: "work" },
	{ href: "#experience", label: "Experience", id: "experience" },
	{ href: "#skills", label: "Skills", id: "skills" },
	{ href: "#contact", label: "Contact", id: "contact" },
];

export default function V2Header() {
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState<string | null>(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const reduceMotion = useReducedMotion();

	// Header background state — IntersectionObserver on a top sentinel, no scroll listener.
	useEffect(() => {
		const sentinel = document.getElementById("v2-top-sentinel");
		if (!sentinel) return;
		const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
			rootMargin: "-8px 0px 0px 0px",
		});
		io.observe(sentinel);
		return () => io.disconnect();
	}, []);

	// Active section — IntersectionObserver across section anchors.
	useEffect(() => {
		const sections = navItems
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => Boolean(el));
		if (sections.length === 0) return;

		const visible = new Map<string, number>();
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
				}
				let best: string | null = null;
				let bestRatio = 0;
				for (const [id, ratio] of visible) {
					if (ratio > bestRatio) {
						best = id;
						bestRatio = ratio;
					}
				}
				setActive(bestRatio > 0 ? best : null);
			},
			{ rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
		);
		sections.forEach((section) => io.observe(section));
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	return (
		<header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
			<motion.div
				initial={reduceMotion ? false : { y: -24, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				className={`mx-auto flex h-[60px] max-w-[1180px] items-center justify-between gap-4 rounded-xl border px-3 transition-colors duration-300 motion-reduce:transition-none sm:px-4 ${
					scrolled
						? "border-v2-border bg-v2-obsidian/80 backdrop-blur-xl"
						: "border-transparent bg-transparent"
				}`}
			>
				<a
					href="#top"
					aria-label="Marco Antolini, back to top"
					className="group inline-flex items-center gap-2 rounded-lg p-1 text-v2-ivory"
				>
					<MarkMA className="h-7 w-auto transition-colors duration-300 group-hover:text-v2-emerald motion-reduce:transition-none" />
					<span className="hidden font-satoshi text-sm font-medium tracking-tight sm:inline">
						Marco Antolini
					</span>
				</a>

				<nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
					{navItems.map((item) => {
						const isActive = active === item.id;
						return (
							<a
								key={item.href}
								href={item.href}
								className={`relative rounded-lg px-3 py-2 font-space-mono text-[12px] uppercase tracking-[0.12em] transition-colors duration-200 motion-reduce:transition-none ${
									isActive ? "text-v2-emerald" : "text-v2-muted hover:text-v2-ivory"
								}`}
							>
								{item.label}
								{isActive ? (
									<motion.span
										layoutId="v2-nav-active"
										className="absolute inset-x-3 -bottom-px h-px bg-v2-emerald"
										transition={{ type: "spring", stiffness: 380, damping: 32 }}
									/>
								) : null}
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-2">
					<VersionSwitch />
					<motion.a
						href="#contact"
						whileHover={reduceMotion ? undefined : { scale: 1.03 }}
						whileTap={reduceMotion ? undefined : { scale: 0.97 }}
						className="hidden rounded-lg bg-v2-emerald px-4 py-2 font-satoshi text-sm font-semibold text-v2-obsidian transition-colors hover:bg-emerald-300 motion-reduce:transition-none sm:inline-flex"
					>
						Get in touch
					</motion.a>
					<button
						type="button"
						aria-expanded={menuOpen}
						aria-controls="v2-mobile-nav"
						onClick={() => setMenuOpen((open) => !open)}
						className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-v2-border text-v2-ivory md:hidden"
					>
						<MenuGlyph open={menuOpen} />
						<span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
					</button>
				</div>
			</motion.div>

			{menuOpen ? (
				<motion.nav
					id="v2-mobile-nav"
					aria-label="Mobile"
					initial={reduceMotion ? false : { opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					className="mx-auto mt-2 max-w-[1180px] rounded-xl border border-v2-border bg-v2-obsidian/95 p-3 backdrop-blur-xl md:hidden"
				>
					<ul className="flex flex-col">
						{navItems.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									onClick={() => setMenuOpen(false)}
									className="block rounded-lg px-4 py-3 font-space-mono text-[13px] uppercase tracking-[0.12em] text-v2-muted hover:bg-v2-zinc hover:text-v2-ivory"
								>
									{item.label}
								</a>
							</li>
						))}
						<li className="mt-2 border-t border-v2-border pt-2">
							<a
								href="#contact"
								onClick={() => setMenuOpen(false)}
								className="block rounded-lg bg-v2-emerald px-4 py-3 text-center font-satoshi font-semibold text-v2-obsidian"
							>
								Get in touch
							</a>
						</li>
					</ul>
				</motion.nav>
			) : null}
		</header>
	);
}

function VersionSwitch() {
	return (
		<div
			className="inline-flex items-center rounded-lg border border-v2-border bg-v2-zinc/60 p-0.5 font-space-mono text-[11px]"
			role="group"
			aria-label="Portfolio version"
		>
			<a
				href="/v1"
				className="rounded-md px-2.5 py-1.5 text-v2-muted transition-colors hover:text-v2-ivory motion-reduce:transition-none"
			>
				v1
			</a>
			<span aria-current="page" className="rounded-md bg-v2-emerald/15 px-2.5 py-1.5 text-v2-emerald">
				v2
			</span>
			<a
				href="/v3"
				className="rounded-md px-2.5 py-1.5 text-v2-muted transition-colors hover:text-v2-ivory motion-reduce:transition-none"
			>
				v3
			</a>
		</div>
	);
}

function MenuGlyph({ open }: { open: boolean }) {
	return (
		<svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
			{open ? (
				<>
					<path d="M5 5l10 10" strokeLinecap="round" />
					<path d="M15 5L5 15" strokeLinecap="round" />
				</>
			) : (
				<>
					<path d="M3 6h14" strokeLinecap="round" />
					<path d="M3 12h14" strokeLinecap="round" />
				</>
			)}
		</svg>
	);
}
